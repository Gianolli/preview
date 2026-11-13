/* Local document retrieval. No external API, private files or conversation storage. */
(() => {
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const stop = new Set(('a au aux avec ce ces cet cette de des du dans en et est la le les leur leurs ou par pour que qui un une vos votre nous vous sur il elle ils elles on ne pas pouvez pouvezvous faire faites quels quelles quel quelle comment combien quand where what which when who how can could do does did is are be the an and or for with from of to our your you about have help please bonjour hello merci thanks equipement equipements equipment appareil appareils service services 3d tech').split(' '));
  const stem = word => word.length > 4 ? word.replace(/(?:ements|ement|ation|ions|ing|ers|es|s)$/, '') : word;
  ['medical','medicaux','biomedical','biomedicaux','date','year','annee','fait','faites','proposez','offrez','prendre','charge','besoin','besoins'].forEach(w=>stop.add(w));
  ['moi','me','mon','ma','mes','notre','nos','soit','serait','possible','pouvezvous','us','my','mine','some','it','would'].forEach(w=>stop.add(w));
  ['in','used','utilise','utilises','associes','lies','exemple','exemples','example','examples'].forEach(w=>stop.add(w));
  const aliases = [
    ['mainten','entretien','entretenir','entretenez','maintenance','maintain','maintenir'],
    ['repar','reparation','repair','reparer','reparez','repare','depannage','depanner','depannez','corrective','panne'],
    ['formation','training','train','former','formez','apprendre','utilisation'],
    ['achat','acheter','achetez','achetons','achete','purchase','purchasing','buy','buying','procurement','acquisition','acquerir','choisir','choix'],
    ['inventaire','inventory','stock','stockage','storage'],
    ['procedure','procedures','documentation','sop'],
    ['incubateur','incubator'],['microscope','microscopie','microscopy'],
    ['refrigerateur','refrigerator','fridge','frigo','cold','froid','freezer','congelateur'],
    ['naissance','fondation','fonde','fondee','founded','founding','histoire','history'],
    ['pays','haiti','province','port','prince','location','intervenez'],
    ['oxygene','oxygen'],['hematologie','haematology','hematology'],
    ['dentaire','dental','dentaires'],['temperature','logger','loggers','surveillance','monitoring'],
    ['support','assistance','remote','distance','technique'],
    ['neonatal','neonatologie'],['intensifs','intensive','reanimation'],
    ['hopital','hopitaux','hospital','hospitals','hospitalier','hospitaliers'],
    ['clinique','cliniques','clinic','clinics'],
    ['laboratoire','laboratoires','laboratory','laboratories','labo','labos'],
    ['biologie','biology'],['moleculaire','molecular','pcr'],
    ['biochimie','chimie','chemistry','biochemistry'],
    ['psm','bsc','biosafety','microbiologique'],
    ['inventorier','inventaire','inventory','recenser','recensement'],
  ];
  const canonical = new Map();
  const originalTerms = new Map();
  aliases.forEach((group, i) => group.forEach(word => canonical.set(stem(word), 'topic'+i)));
  aliases.forEach((group, i) => group.forEach(word => originalTerms.set(word, 'topic'+i)));
  // One-letter typo tolerance for longer known terms; never alter model numbers.
  function near(a,b){
    if(a===b)return true;
    if(Math.abs(a.length-b.length)>1)return false;
    if(a.length===b.length){
      const diff=[...a].map((c,i)=>c===b[i]?-1:i).filter(i=>i>=0);
      if(diff.length===2&&diff[1]===diff[0]+1&&a[diff[0]]===b[diff[1]]&&a[diff[1]]===b[diff[0]])return true;
    }
    let i=0,j=0,changes=0;
    while(i<a.length&&j<b.length){
      if(a[i]===b[j]){i++;j++;continue;}
      if(++changes>1)return false;
      if(a.length>=b.length)i++;
      if(b.length>=a.length)j++;
    }
    return changes+(i<a.length||j<b.length?1:0)<=1;
  }
  function canonicalToken(word){
    const value=stem(word);
    if(canonical.has(value))return canonical.get(value);
    if(value.length<6||/\d/.test(value))return value;
    const matches=new Set([...canonical].filter(([key])=>near(value,key)).map(([,topic])=>topic));
    [...originalTerms].filter(([key])=>near(word,key)).forEach(([,topic])=>matches.add(topic));
    return matches.size===1?[...matches][0]:value;
  }
  function tokens(value) {
    return [...new Set(normalize(value).split(' ').filter(w => w.length > 1 && !stop.has(w)).map(canonicalToken))];
  }
  function search(question, lang, domainsOnly=false) {
    const q = tokens(question);
    if (!q.length) return null;
    const docs = (window.assistantDocuments || []).filter(doc=>!domainsOnly||doc.category==='equipment-domain').map(doc => ({doc, title:tokens(doc[lang].title), body:tokens(doc[lang].text+' '+(doc[lang].keywords||''))}));
    const frequencies = new Map(q.map(t => [t, docs.filter(d => d.body.includes(t) || d.title.includes(t)).length]));
    const ranked = docs.map(d => {
      let score = 0, matches = 0;
      q.forEach(t => {
        if (!d.body.includes(t) && !d.title.includes(t)) return;
        matches++;
        const weight = Math.log(1 + docs.length / (1 + frequencies.get(t)));
        score += weight * (d.title.includes(t) ? 3 : 1);
      });
      const coverage = matches / q.length;
      return {...d, score:score * coverage, coverage};
    }).filter(d => d.score > 1 && d.coverage >= 0.5).sort((a,b) => b.score-a.score);
    if (!ranked.length) return null;
    // Equipment questions need a service excerpt when one also matches the request.
    const asksService = /maint|entreti|repar|repair|install|calibr|certif/.test(normalize(question));
    const specific = ranked.find(d => d.doc.category !== 'equipment' && d.coverage >= 0.75 && d.score >= ranked[0].score * 0.6);
    if (asksService && specific) ranked.unshift(specific);
    const selected = [];
    for (const d of ranked) {
      if (selected.some(x => x.doc[lang].text === d.doc[lang].text)) continue;
      if (selected.length && (d.score < ranked[0].score * 0.8 || d.doc.category === 'equipment')) continue;
      selected.push(d);
      if (selected.length === 2) break;
    }
    const texts = selected.map(({doc}) => {
      const content = doc[lang];
      if (doc.category === 'equipment') return lang === 'fr'
        ? `${content.title} : ce type figure parmi les équipements présentés par 3D Tech. Précisez le modèle et votre besoin dans une demande de service pour confirmer la prise en charge.`
        : `${content.title}: this type appears among the equipment presented by 3D Tech. Include the model and your needs in a service request to confirm support.`;
      return `${content.title}\n${content.text}`;
    });
    return {text:texts.join('\n\n'),sources:selected.map(({doc}) => ({label:doc[lang].title,url:doc.url}))};
  }
  window.documentAssistant = {search};
})();
