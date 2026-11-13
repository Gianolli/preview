const pageMetadata={"index": ["Accueil", "Home", "Services biom\u00e9dicaux : conseil, installation, maintenance, r\u00e9paration et accompagnement des \u00e9quipements.", "Biomedical services: consulting, installation, maintenance, repair and equipment support."], "about": ["\u00c0 propos", "About", "D\u00e9couvrez 3D Tech et notre engagement pour les \u00e9quipements des h\u00f4pitaux, cliniques et laboratoires.", "Discover 3D Tech and our commitment to hospital, clinic and laboratory equipment."], "services": ["Services", "Services", "Conseil, installation, maintenance, r\u00e9paration, inventaire et formation pour vos \u00e9quipements biom\u00e9dicaux.", "Consulting, installation, maintenance, repair, inventory and training for your biomedical equipment."], "industries": ["Secteurs desservis", "Industries served", "Des services biom\u00e9dicaux adapt\u00e9s aux h\u00f4pitaux, cliniques et laboratoires.", "Biomedical equipment services for hospitals, clinics and laboratories."], "contact": ["Contact", "Contact", "Contactez 3D Tech pour vos besoins en services et \u00e9quipements biom\u00e9dicaux.", "Contact 3D Tech about your biomedical equipment and service needs."], "appointment": ["Rendez-vous", "Appointment", "Demandez un rendez-vous avec 3D Tech pour discuter de vos besoins biom\u00e9dicaux.", "Request an appointment with 3D Tech to discuss your biomedical equipment needs."], "request-service": ["Demander un service", "Request service", "D\u00e9crivez votre \u00e9quipement et votre besoin pour demander un service \u00e0 3D Tech.", "Describe your equipment and needs to request a service from 3D Tech."], "assistant": ["Assistant 3D Tech", "Ask 3D Tech", "Des r\u00e9ponses \u00e0 vos questions sur nos services et nos \u00e9quipements biom\u00e9dicaux.", "Answers to your questions about our services and the biomedical equipment we support."], "privacy": ["Confidentialit\u00e9", "Privacy policy", "Informations sur la confidentialit\u00e9 et les formulaires du site 3D Tech.", "Information about privacy and forms on the 3D Tech website."], "terms": ["Conditions d\u2019utilisation", "Terms of use", "Conditions d\u2019utilisation du site 3D Tech.", "Terms for using the 3D Tech website."], "404": ["Page introuvable", "Page not found", "La page demand\u00e9e est introuvable. Retrouvez les services de 3D Tech.", "The requested page could not be found. Explore 3D Tech services."]};

const $=(s,root=document)=>root.querySelector(s);const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const translations={
  en:{enlarge_photo:'Enlarge photo',close_photo:'Close photo',field_photo_dialog:'Our team in action photo',company_snapshot:'3D Tech at a glance',main_navigation:'Main navigation',open_menu:'Open menu',close_assistant:'Close assistant',hero_image:'Illustration: biomedical technician servicing a patient monitor',country_code:'Country code',assistant_question:'Ask a question about 3D Tech services',nav_home:'Home',nav_about:'About',nav_services:'Services',nav_industries:'Industries',nav_projects:'Projects',nav_team:'Team',nav_feedback:'Feedback',nav_assistant:'Ask 3D Tech',nav_contact:'Contact',request:'Request Service',lang:'FR',top_email:'info@3dtechbiomed.com',top_tag:'Biomedical services for healthcare and laboratory equipment',footer_about:'Biomedical equipment services for healthcare organizations and laboratories.',quick:'Quick Links',contact:'Contact',legal:'Legal',privacy:'Privacy Policy',terms:'Terms of Use',rights:'All rights reserved.',assistant_title:'Ask 3D Tech',assistant_intro:"I answer basic questions about 3D Tech services, supported equipment and sectors served, using approved information. I do not provide medical, legal or emergency advice. Do not share confidential information.",assistant_placeholder:'Ask about 3D Tech services...',assistant_fallback:"I answer basic questions about 3D Tech services, supported equipment and sectors served, using approved information. I do not have enough information to answer this question precisely. Please consult the Services page or contact our team directly at info@3dtechbiomed.com for details.",send:'Send',form_success:'Thank you! Your message has been sent.',form_error:'Something went wrong. Please try again or email info@3dtechbiomed.com directly.',equipment_placeholder:'Incubator, monitor, analyzer...',message_placeholder:'Minimum 10 characters',organization_placeholder:'Minimum 2 characters'},
  fr:{enlarge_photo:'Agrandir la photo',close_photo:'Fermer la photo',field_photo_dialog:'Photo de notre équipe en action',company_snapshot:'3D Tech en bref',main_navigation:'Navigation principale',open_menu:'Ouvrir le menu',close_assistant:'Fermer l\u2019assistant',hero_image:'Illustration : technicien biom?dical intervenant sur un moniteur patient',country_code:'Indicatif pays',assistant_question:'Posez une question sur les services 3D Tech',nav_home:'Accueil',nav_about:'À propos',nav_services:'Services',nav_industries:'Secteurs',nav_projects:'Projets',nav_team:'Équipe',nav_feedback:'Témoignages',nav_assistant:'Assistant 3D Tech',nav_contact:'Contact',request:'Demander un service',lang:'EN',top_email:'info@3dtechbiomed.com',top_tag:'Services biomédicaux pour équipements hospitaliers et de laboratoire',footer_about:'Services biomédicaux pour établissements de santé et laboratoires.',quick:'Liens rapides',contact:'Contact',legal:'Légal',privacy:'Politique de confidentialité',terms:'Conditions d’utilisation',rights:'Tous droits réservés.',assistant_title:'Assistant 3D Tech',assistant_intro:"Je réponds aux questions de base sur les services proposés par 3D Tech, les équipements pris en charge et les secteurs desservis, à partir des informations approuvées. Je ne fournis pas de conseils médicaux, juridiques ou d’urgence. Ne partagez pas d’informations confidentielles.",assistant_placeholder:'Posez une question sur les services 3D Tech...',assistant_fallback:"Je réponds aux questions de base liées aux services fournis par 3D Tech, aux équipements pris en charge et aux secteurs desservis, à partir des informations approuvées. Je ne dispose pas d’assez d’informations pour répondre précisément à cette question. Consultez la page Services ou contactez directement notre équipe à info@3dtechbiomed.com pour plus de détails.",send:'Envoyer',form_success:'Merci! Votre message a été envoyé.',form_error:'Une erreur est survenue. Veuillez réessayer ou écrire directement à info@3dtechbiomed.com.',equipment_placeholder:'Incubateur, moniteur, analyseur...',message_placeholder:'Minimum 10 caractères',organization_placeholder:'Minimum 2 caractères'}};
function getLang(){return localStorage.getItem('lang')||'fr'}
function setLang(l){localStorage.setItem('lang',l);applyLang()}
function applyLang(){const l=getLang();document.documentElement.lang=l;const page=(location.pathname.split('/').pop()||'index.html').replace('.html','');const meta=pageMetadata[page];if(meta){document.title=meta[l==='fr'?0:1]+' | 3D Tech';document.querySelector('meta[name="description"]')?.setAttribute('content',meta[l==='fr'?2:3])}$$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[l][k])el.textContent=translations[l][k]});$$('[data-i18n-placeholder]').forEach(el=>{const k=el.dataset.i18nPlaceholder;if(translations[l][k])el.placeholder=translations[l][k]});$$('[data-i18n-aria-label]').forEach(el=>{const k=el.dataset.i18nAriaLabel;if(translations[l][k])el.setAttribute('aria-label',translations[l][k])});$$('[data-i18n-alt]').forEach(el=>{const k=el.dataset.i18nAlt;if(translations[l][k])el.alt=translations[l][k]});$$('[data-lang]').forEach(el=>{el.classList.toggle('hidden',el.dataset.lang!==l)});$$('option[data-fr]').forEach(o=>{o.textContent=o.dataset[l]});$$('.lang').forEach(b=>b.textContent=translations[l].lang)}
function initReveal(){
  const els=$$('.reveal');
  if(!els.length) return;
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target);}
    });
  },{threshold:.1});
  els.forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight&&r.bottom>0){el.classList.add('in-view');}
    else{io.observe(el);}
  });
}

function initMinLength(){
  $$('input[minlength],textarea[minlength]').forEach(el=>{
    const min=parseInt(el.getAttribute('minlength'),10);
    const check=()=>{
      const trimmed=el.value.trim();
      if(el.value.length>0&&trimmed.length<min){
        el.setCustomValidity(getLang()==='fr'?`Minimum ${min} caractères (les espaces ne comptent pas).`:`Minimum ${min} characters (spaces don't count).`);
      }else{
        el.setCustomValidity('');
      }
    };
    el.addEventListener('input',check);
    el.addEventListener('blur',check);
  });
}
function initDateMin(){
  const now=new Date();
  const today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  $$('input[type="date"]').forEach(inp=>{inp.min=today;});
}
function initPhoneMask(){
  $$('input[name="phone_number"]').forEach(inp=>{
    inp.addEventListener('input',()=>{inp.value=inp.value.replace(/[^\d\s-]/g,'');});
  });
}
function initForms(){
  $$('form.form').forEach(form=>{
    const status=form.querySelector('.form-status');
    const btn=form.querySelector('button[type="submit"]');
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();
      if(btn)btn.disabled=true;
      if(status){status.classList.add('hidden');status.classList.remove('success','error');}
      try{
        const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        if(res.ok){
          form.reset();
          if(status){status.textContent=translations[getLang()].form_success;status.classList.remove('hidden');status.classList.add('success');}
        }else{
          if(status){status.textContent=translations[getLang()].form_error;status.classList.remove('hidden');status.classList.add('error');}
        }
      }catch(err){
        if(status){status.textContent=translations[getLang()].form_error;status.classList.remove('hidden');status.classList.add('error');}
      }finally{
        if(btn)btn.disabled=false;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded',()=>{applyLang();$('.mobile-toggle')?.addEventListener('click',()=>{const open=$('.menu')?.classList.toggle('open');$('.mobile-toggle').setAttribute('aria-expanded',String(!!open))});$$('.lang').forEach(b=>b.addEventListener('click',()=>setLang(getLang()==='fr'?'en':'fr')));initAssistant();initReveal();initForms();initPhoneMask();initDateMin();initMinLength();});

function initAssistant(){
  const fab=$('.assistant-fab'),panel=$('.assistant-panel'),close=$('.assistant-panel .close');
  fab?.addEventListener('click',()=>{const open=panel.classList.toggle('open');fab.setAttribute('aria-expanded',String(open));if(open){$('#assistantForm')?.dispatchEvent(new Event('assistant:reopen'));$('#assistantInput')?.focus()}});
  close?.addEventListener('click',()=>{panel.classList.remove('open');fab?.setAttribute('aria-expanded','false');fab?.focus()});
  attachAssistantForm('#assistantForm','#assistantInput','#assistantBody');
  attachAssistantForm('#assistantPageForm','#assistantPageInput','#assistantPageBody');
  $$('.assistant-chip').forEach(chip=>chip.addEventListener('click',()=>{
    const target=chip.closest('.assistant-live')?.querySelector('input') || $('#assistantInput');
    const form=chip.closest('.assistant-live')?.querySelector('form') || $('#assistantForm');
    if(target&&form){target.value=chip.textContent.trim();form.dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));}
  }));
}
function attachAssistantForm(formSel,inputSel,bodySel){
  const form=$(formSel),input=$(inputSel),body=$(bodySel);
  if(!form||!input||!body)return;

  const CHAT_TIMEOUT = 2 * 60 * 1000;
  const WARNING_DELAY = 105 * 1000;
  let inactivityTimer=null;
  let warningTimer=null;
  let ended=false;
  let previousQuestion='';
  const submitButton=form.querySelector('button[type="submit"]');
  function renderButton(){
    if(!submitButton)return;
    submitButton.disabled=false;
    submitButton.textContent=ended
      ? (getLang()==='fr'?'Discussion terminée':'Chat ended')
      : translations[getLang()].send;
    if(ended)submitButton.removeAttribute('data-i18n');
    else submitButton.setAttribute('data-i18n','send');
  }
  function resetChat(){
    if(!ended)return;
    ended=false;
    input.disabled=false;
    input.value='';
    body.replaceChildren();
    previousQuestion='';
    addAssistantMsg(body,translations[getLang()].assistant_intro,'bot');
    renderButton();
  }
  function closeEndedChat(){
    const panel=form.closest('.assistant-panel');
    if(panel)panel.querySelector('.close')?.click();
    else{resetChat();input.focus();}
  }
  submitButton?.addEventListener('click',event=>{
    if(!ended)return;
    event.preventDefault();
    closeEndedChat();
  });
  form.addEventListener('assistant:reopen',resetChat);
  new MutationObserver(renderButton).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  function clearChatTimers(){
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);
  }

  function restartChatTimers(){
    if(ended)return;
    clearChatTimers();

    warningTimer=setTimeout(()=>{
      addAssistantMsg(
        body,
        getLang()==='fr'
          ? "Cette discussion se terminera après 2 minutes d’inactivité. Vous pourrez fermer la fenêtre puis ouvrir une nouvelle discussion."
          : "This chat will end after 2 minutes of inactivity. You can close the window and open a new chat.",
        'bot'
      );
    }, WARNING_DELAY);

    inactivityTimer=setTimeout(()=>{
      clearChatTimers();
      ended=true;
      input.disabled=true;
      renderButton();
      addAssistantMsg(
        body,
        getLang()==='fr'
          ? "Cette discussion est inactive depuis 2 minutes. Elle est maintenant terminée. Cliquez sur « Discussion terminée » pour fermer la fenêtre, puis rouvrez l’assistant pour commencer une nouvelle discussion."
          : "This chat has ended after 2 minutes of inactivity. Click “Chat ended” to close the window, then reopen the assistant to start a new chat.",
        'bot'
      );
    }, CHAT_TIMEOUT);
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(ended){closeEndedChat();return;}

    const q=input.value.trim();
    if(!q)return;

    addAssistantMsg(body,q,'user');
    input.value='';
    addAssistantMsg(body,getLang()==='fr'?'Recherche dans les documents approuvés...':'Searching approved documents...','bot');

    setTimeout(()=>{
      const messages=body.querySelectorAll('.msg.bot');
      const lastBot=messages[messages.length-1];
      if(lastBot && (
        lastBot.textContent.includes('Recherche dans les documents') ||
        lastBot.textContent.includes('Searching approved documents')
      )){
        lastBot.remove();
      }

      addAssistantMsg(body,answer(q,previousQuestion),'bot');
      previousQuestion=q;
      restartChatTimers();
    }, 400);
  });

  input.addEventListener('input',restartChatTimers);
  input.addEventListener('keydown',restartChatTimers);
}
function addAssistantMsg(body,t,type){
  const d=document.createElement('div');
  d.className='msg '+type;
  d.textContent=typeof t==='string'?t:t.text;
  body.appendChild(d);
  body.scrollTop=body.scrollHeight;
}
function normalizeText(t){return (t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function matchesKeyword(text,keyword){
  const escaped=normalizeText(keyword).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}s?(?=$|[^a-z0-9])`).test(text);
}
function answer(q,previousQuestion=''){
  const l=window.assistantPolicy?.language(q,getLang())||getLang();
  const original=q.trim();
  const s=normalizeText(original);
  const scoped=window.assistantPolicy?.answer(original,l,previousQuestion);
  if(scoped)return scoped;
  const dangerWords=['patient name','medical record','diagnosis','traitement patient','dossier patient','nom du patient','diagnostic patient','mot de passe','password','urgence vitale','life support emergency'];
  if(dangerWords.some(w=>s.includes(normalizeText(w)))){
    return l==='fr'
      ? 'Je ne peux pas traiter les informations patients, mots de passe, dossiers médicaux ou situations d’urgence. Pour une urgence liée à un équipement critique, contactez immédiatement votre équipe biomédicale interne ou le fabricant, puis contactez 3D Tech pour une évaluation de service.'
      : 'I cannot process patient information, passwords, medical records, or emergency situations. For a critical equipment emergency, contact your internal biomedical team or the manufacturer immediately, then contact 3D Tech for service assessment.';
  }
  const greetingWords=['bonjour','bonsoir','salut','allo','allô','coucou','hello','hi','hey'];
  if(greetingWords.some(w=>s.replace(/[\s!?.]+$/g,'')===normalizeText(w))){
    return l==='fr'
      ? 'Bonjour! Je peux répondre à vos questions sur les services 3D Tech, les équipements biomédicaux, la formation, les procédures et les demandes de service. Que souhaitez-vous savoir?'
      : 'Hello! I can answer your questions about 3D Tech services, biomedical equipment, training, procedures, and service requests. What would you like to know?';
  }
  const household=['mixeur','blender','microwave','micro-ondes','television','cuisine','kitchen'];
  if(household.some(w=>matchesKeyword(s,w))){
    return l==='fr' ? '3D Tech intervient sur les équipements biomédicaux. Les appareils domestiques ne font pas partie des services proposés.' : '3D Tech supports biomedical equipment. Household appliances are outside the services offered.';
  }
  const maintenanceTopic=/entreti|mainten/.test(s);
  const coverageTopic=/annuel|annual|contrat|contract|formule|plan|piece|parts|coverage/.test(s);
  if((maintenanceTopic && coverageTopic) || /(?:avec|sans)\s+(?:les\s+)?pieces|(?:with|without)\s+parts/.test(s)){
    const scope=window.assistantDocuments?.find(doc=>doc.id==='annual-maintenance-scope');
    if(scope)return {text:scope[l].text,sources:[{label:scope[l].title,url:scope.url}]};
  }
  if(/prix|tarif|cout|price|cost|warranty|garantie|delai|turnaround/.test(s)){
    return {text:l==='fr' ? 'Les documents disponibles ne précisent pas de tarif, de délai ou de garantie pour votre demande. Transmettez le type d’équipement, le modèle et votre besoin à 3D Tech pour obtenir une confirmation.' : 'The available documents do not specify a price, timeframe or warranty for your request. Send 3D Tech the equipment type, model and your needs for confirmation.',sources:[{label:l==='fr'?'Demander un service':'Request service',url:'request-service.html'}]};
  }
  if(/courriel|email|contact|rendez|appointment/.test(s)){
    return {text:l==='fr' ? 'Vous pouvez écrire à info@3dtechbiomed.com ou transmettre votre demande à l’aide des formulaires du site.' : 'Email info@3dtechbiomed.com or submit your request through the website forms.',sources:[{label:l==='fr'?'Contact':'Contact',url:'contact.html'},{label:l==='fr'?'Rendez-vous':'Appointment',url:'appointment.html'}]};
  }
  const brandTerms=['marque','brand','fabricant','manufacturer','partenariat','partnership','partner','ge','philips','siemens','mindray','multimarque','agrément','agree','authorized','autorise'];
  if(brandTerms.some(term=>matchesKeyword(s,term))){
    const scope=window.assistantDocuments?.find(doc=>doc.id==='manufacturer-scope');
    if(scope)return {text:scope[l].text,sources:[{label:scope[l].title,url:scope.url}]};
  }
  const found=window.documentAssistant?.search(original,l);
  if(found)return found;
  return {text:translations[l].assistant_fallback,sources:[{label:l==='fr'?'Contacter 3D Tech':'Contact 3D Tech',url:'contact.html'}]};
}

document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const panel=document.querySelector('.assistant-panel.open');
  if(panel){panel.querySelector('.close')?.click();return;}
  const menu=document.querySelector('.menu.open');
  if(menu){menu.classList.remove('open');const toggle=document.querySelector('.mobile-toggle');toggle?.setAttribute('aria-expanded','false');toggle?.focus();}
});
