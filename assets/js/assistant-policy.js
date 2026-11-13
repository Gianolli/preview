/* Deterministic scope and safety routing; no remote access or clinical advice. */
(() => {
  const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ');
  const messages={
    sensitive:[
      'Ne partagez pas de renseignements personnels de patients ni de mots de passe dans cette discussion. Je ne peux pas traiter un dossier médical. Si un équipement pose un problème pendant des soins, contactez immédiatement votre équipe clinique et biomédicale interne, selon les procédures de votre établissement.',
      'Do not share patient personal information or passwords in this chat. I cannot process medical records. If equipment malfunctions during care, contact your clinical and internal biomedical teams immediately, following your facility’s procedures.'
    ],
    dose:[
      'Je ne peux pas recommander une dose ni un réglage de perfusion. Demandez immédiatement au professionnel de santé responsable et appliquez les prescriptions et protocoles de votre établissement. 3D Tech fournit des services sur les équipements, pas des soins médicaux.',
      'I cannot recommend a dose or infusion setting. Contact the responsible healthcare professional and follow your facility’s prescriptions and protocols. 3D Tech provides equipment services, not medical care.'
    ],
    alarm:[
      'Je ne peux pas expliquer comment désactiver ou contourner une alarme. Faites évaluer la situation par votre équipe clinique et biomédicale interne conformément aux procédures de l’établissement et aux instructions du fabricant.',
      'I cannot explain how to disable or bypass an alarm. Have your clinical and internal biomedical teams assess the situation under your facility’s procedures and the manufacturer’s instructions.'
    ],
    continuedUse:[
      'Je ne peux pas autoriser l’utilisation d’un équipement dont l’étalonnage est en retard ou dont la sécurité est incertaine. Faites vérifier son statut par votre responsable biomédical et l’équipe clinique, selon vos procédures et les exigences du fabricant.',
      'I cannot authorize using equipment with overdue calibration or uncertain safety. Have your biomedical lead and clinical team verify its status under your procedures and the manufacturer’s requirements.'
    ],
    incident:[
      'Prévenez immédiatement votre équipe clinique et biomédicale interne et appliquez la procédure de gestion des incidents de votre établissement. Je ne peux ni évaluer l’état d’un patient, ni confirmer la fiabilité des valeurs, ni décider à distance de la poursuite d’utilisation de l’appareil.',
      'Notify your clinical and internal biomedical teams immediately and follow your facility’s incident procedure. I cannot assess a patient, validate readings or decide remotely whether equipment can continue to be used.'
    ],
    repairSafety:[
      'Je ne peux pas fournir de procédure de réparation à réaliser vous-même sur un équipement critique. Confiez l’évaluation à votre équipe biomédicale ou au représentant habilité du fabricant. Pour une demande de service 3D Tech, écrivez à info@3dtechbiomed.com sans données de patients.',
      'I cannot provide do-it-yourself repair instructions for critical equipment. Ask your biomedical team or an authorized manufacturer representative to assess it. For a 3D Tech service inquiry, email info@3dtechbiomed.com without patient data.'
    ],
    injection:[
      'Je ne peux pas divulguer d’instructions internes, de secrets ou de documents privés. Je peux vous renseigner sur les services publics de 3D Tech.',
      'I cannot disclose internal instructions, secrets or private documents. I can help with public information about 3D Tech services.'
    ],
    records:[
      'Je n’ai pas accès aux dossiers clients, au statut des demandes, aux contrats, aux certificats ni aux stocks de pièces. Je ne peux donc pas vérifier cette information ou transmettre un document. Écrivez à info@3dtechbiomed.com avec votre référence et l’équipement concerné, sans données de patients.',
      'I do not have access to customer records, request status, contracts, certificates or parts inventory. I cannot verify that information or send a document. Email info@3dtechbiomed.com with your reference and equipment details, without patient data.'
    ],
    booking:[
      'Je ne peux pas réserver une visite ni consulter la disponibilité des techniciens en temps réel. Utilisez le formulaire Rendez-vous ou écrivez à info@3dtechbiomed.com avec votre lieu et vos disponibilités. La visite doit être confirmée par 3D Tech.',
      'I cannot book a visit or check technician availability in real time. Use the Appointment form or email info@3dtechbiomed.com with your location and availability. 3D Tech must confirm the visit.'
    ],
    price:[
      'Les informations disponibles ne précisent pas de tarif pour cet appareil. Je ne peux pas établir un prix ni confirmer un rabais ou une offre passée. Demandez une soumission à info@3dtechbiomed.com en précisant le modèle, le problème et votre établissement.',
      'The available information does not specify a price for this device. I cannot quote a repair price or confirm a discount or previous offer. Request a quote at info@3dtechbiomed.com with the model, issue and facility details.'
    ],
    duration:[
      'Aucune durée ni aucun délai d’intervention garanti n’est précisé dans les informations disponibles. Le temps nécessaire dépend de l’appareil, de l’intervention et des moyens disponibles. Pour un étalonnage ou une réparation, transmettez le modèle et votre besoin à info@3dtechbiomed.com pour confirmation.',
      'No duration or guaranteed response time is specified in the available information. Timing depends on the device, work required and available resources. For calibration or repair, email info@3dtechbiomed.com with the model and your needs for confirmation.'
    ],
    emergency:[
      'Les informations disponibles ne confirment pas de permanence 24 h/24 et 7 j/7 ni de délai d’urgence garanti. En cas de risque immédiat lié à un équipement, contactez votre équipe clinique et biomédicale interne ou le représentant du fabricant. Pour la disponibilité de 3D Tech, écrivez à info@3dtechbiomed.com.',
      'The available information does not confirm 24/7 coverage or a guaranteed emergency response time. For an immediate equipment-related risk, contact your clinical and internal biomedical teams or the manufacturer’s representative. Email info@3dtechbiomed.com to ask about 3D Tech availability.'
    ],
    credentials:[
      "3D Tech dispose de personnel certifié pour les postes de sécurité microbiologique (PSM). L’organisme certificateur et le périmètre précis ne sont pas indiqués dans les informations disponibles. Cette certification ne confirme pas une accréditation ISO 17025, une conformité ISO 13485 ou CEI 62353, ni une traçabilité métrologique particulière. Contactez info@3dtechbiomed.com pour les justificatifs adaptés à votre besoin.",
      "3D Tech has personnel certified for biological safety cabinets (BSCs). The certifying body and exact scope are not specified in the available information. This certification does not confirm ISO 17025 accreditation, ISO 13485 or IEC 62353 compliance, or particular metrological traceability. Contact info@3dtechbiomed.com for documentation relevant to your needs."
    ],
    electrical:[
      "3D Tech propose le conseil à l’acquisition, l’installation, la mise en service, la maintenance préventive, la réparation corrective, l’inventaire technique, le support sur place ou à distance, la formation et l’aide à la documentation. Consultez la page Services pour découvrir nos prestations et contactez info@3dtechbiomed.com pour préciser votre besoin.",
      "3D Tech offers acquisition advice, installation, commissioning, preventive maintenance, corrective repair, technical inventory, on-site or remote support, training and documentation support. Please consult the Services page for our services and email info@3dtechbiomed.com to discuss your needs."
    ],
    audit:[
      '3D Tech accompagne la création de documentation : procédures d’utilisation et d’entretien, fiches techniques et inventaire. Les informations disponibles ne confirment pas que ces documents satisfont à un audit ou à un agrément particulier, notamment Agrément Canada. Précisez les exigences de votre audit à info@3dtechbiomed.com.',
      '3D Tech supports documentation such as operating and maintenance procedures, technical records and inventories. The available information does not confirm that these documents meet a particular audit or accreditation requirement. Send your audit requirements to info@3dtechbiomed.com.'
    ],
    warranty:[
      'Le maintien de la garantie dépend des conditions du fabricant, de l’équipement et de l’intervention prévue. Je ne peux pas affirmer qu’un entretien par un tiers l’annule ou la conserve systématiquement. Vérifiez les conditions applicables auprès du fabricant et faites confirmer le périmètre par 3D Tech avant l’intervention.',
      'Warranty coverage depends on the manufacturer’s terms, the equipment and the proposed work. I cannot say that third-party maintenance always voids or preserves it. Check the applicable terms with the manufacturer and confirm the work with 3D Tech before proceeding.'
    ],
    commercial:[
      "Je réponds aux questions de base liées aux services fournis par 3D Tech, aux équipements pris en charge et aux secteurs desservis, à partir des informations approuvées. Je ne dispose pas d’assez d’informations pour répondre précisément à cette question. Consultez la page Services ou contactez directement notre équipe à info@3dtechbiomed.com pour plus de détails.",
      "I answer basic questions about 3D Tech services, supported equipment and sectors served, using approved information. I do not have enough information to answer this question precisely. Please consult the Services page or contact our team directly at info@3dtechbiomed.com for details."
    ],
    calibration:[
      "3D Tech propose le conseil à l’acquisition, l’installation, la mise en service, la maintenance préventive, la réparation corrective, l’inventaire technique, le support sur place ou à distance, la formation et l’aide à la documentation. Consultez la page Services pour découvrir nos prestations et contactez info@3dtechbiomed.com pour préciser votre besoin.",
      "3D Tech offers acquisition advice, installation, commissioning, preventive maintenance, corrective repair, technical inventory, on-site or remote support, training and documentation support. Please consult the Services page for our services and email info@3dtechbiomed.com to discuss your needs."
    ],
    equipment:[
      'Les respirateurs, pompes à perfusion, moniteurs patients et échographes figurent parmi les équipements présentés par 3D Tech. La prise en charge d’un défibrillateur ou d’un modèle précis reste à confirmer ; une catégorie générale ne confirme pas chaque appareil. L’entretien ne doit pas être réservé aux représentants du fabricant. Précisez le modèle et le problème à info@3dtechbiomed.com.',
      'Ventilators, infusion pumps, patient monitors and ultrasound machines appear among the equipment presented by 3D Tech. Support for a defibrillator or a specific model must be confirmed; a general category does not confirm every device. Maintenance must not be restricted to manufacturer representatives. Email info@3dtechbiomed.com with the model and issue.'
    ],
    ultrasound:[
      'Les échographes figurent parmi les équipements présentés par 3D Tech. Précisez le modèle et la panne pour confirmer la réparation et vérifier les restrictions du fabricant à info@3dtechbiomed.com.',
      'Ultrasound machines appear among the equipment presented by 3D Tech. Email info@3dtechbiomed.com with the model and fault to confirm repair support and check manufacturer restrictions.'
    ],
    installation:[
      'Oui. Les services documentés comprennent l’installation et la mise en service de nouveaux équipements, ainsi que l’entretien préventif et la réparation corrective des appareils existants. La prise en charge précise dépend de l’équipement et de l’intervention souhaitée.',
      'Yes. Documented services include installation and commissioning of new equipment, as well as preventive maintenance and corrective repair of existing devices. Exact support depends on the equipment and work requested.'
    ],
    maintenance:[
      '3D Tech propose les deux : la maintenance préventive pour l’entretien planifié et les vérifications, et la maintenance corrective pour le diagnostic et la réparation des pannes. La prise en charge est à confirmer selon le modèle et les restrictions du fabricant.',
      '3D Tech offers both: preventive maintenance for planned upkeep and checks, and corrective maintenance for fault diagnosis and repair. Support must be confirmed for the model and manufacturer restrictions.'
    ],
    services:[
      'Les services documentés comprennent le conseil à l’acquisition, l’installation, la mise en service, la maintenance préventive, la réparation corrective, l’inventaire technique, le support sur place ou à distance, la formation des utilisateurs et l’aide à la documentation. Un plan annuel de maintenance peut être préparé selon vos besoins.',
      'Documented services include acquisition advice, installation, commissioning, preventive maintenance, corrective repair, technical inventory, on-site or remote support, user training and documentation support. An annual maintenance plan can be prepared for your needs.'
    ],
    training:[
      'Oui. 3D Tech propose la formation des utilisateurs à l’utilisation sécuritaire des équipements, aux bonnes habitudes quotidiennes et aux tâches simples d’entretien. Le contenu de la formation doit être adapté aux appareils et aux besoins de votre équipe.',
      'Yes. 3D Tech provides user training in safe equipment use, daily care habits and simple maintenance tasks. Training content must be adapted to the equipment and your team’s needs.'
    ],
    regions:[
      "3D Tech intervient uniquement en Haïti, à Port-au-Prince et dans les villes de province. Le support technique peut être réalisé sur place ou à distance, selon le besoin. Pour organiser une intervention, contactez info@3dtechbiomed.com. Les interventions à Laval ou ailleurs hors d’Haïti ne font pas partie de la zone desservie.",
      "3D Tech operates only in Haiti, in Port-au-Prince and provincial cities. Technical support may be provided on site or remotely, depending on your needs. Contact info@3dtechbiomed.com to arrange service. Laval and other locations outside Haiti are outside the service area."
    ],
    shipping:[
      "3D Tech reçoit certains appareils dans son atelier, sous certaines conditions, et propose également le support sur place ou à distance. Contactez notre équipe à info@3dtechbiomed.com pour connaître les modalités de réception ou d’expédition applicables à votre appareil. N’envoyez pas d’équipement sans accord préalable.",
      "3D Tech accepts certain devices at its workshop subject to conditions, and also offers on-site or remote support. Contact our team at info@3dtechbiomed.com for the receiving or shipping arrangements applicable to your device. Do not send equipment without prior agreement."
    ],
    request:[
      'Utilisez le formulaire « Demander un service » ou écrivez à info@3dtechbiomed.com. Pour une demande de réparation ou une soumission, précisez votre établissement, votre lieu, le type d’équipement, la marque, le modèle, le problème observé, le degré d’urgence et vos disponibilités. Ne joignez pas de données de patients. La demande ne confirme pas automatiquement une intervention ni un devis.',
      'Use the Request Service form or email info@3dtechbiomed.com. For a repair request or quote, include your facility, location, equipment type, brand, model, observed issue, urgency and availability. Do not include patient data. Submitting a request does not automatically confirm a visit or a quote.'
    ],
    unknownModel:[
      'Ce modèle précis n’est pas confirmé dans les informations approuvées. Je ne peux pas affirmer sa prise en charge. Envoyez la désignation exacte, le fabricant et le besoin à info@3dtechbiomed.com pour vérification, notamment des restrictions d’entretien.',
      'This exact model is not confirmed in the approved information. I cannot affirm support. Email info@3dtechbiomed.com with its exact designation, manufacturer and your needs to check support and maintenance restrictions.'
    ],
    address:[
      'Aucune adresse de bureau n’est publiée dans les informations disponibles. La zone de service en Haïti ne confirme pas l’existence d’un bureau dans chaque ville. Contactez info@3dtechbiomed.com pour organiser un échange.',
      'No office address is published in the available information. Service coverage in Haiti does not establish an office in each city. Contact info@3dtechbiomed.com to arrange a discussion.'
    ],
    press:[
      'Je ne dispose pas de communiqué de presse approuvé ni d’une déclaration du PDG pour cette période. Je ne peux pas inventer une citation. Demandez confirmation à info@3dtechbiomed.com.',
      'I do not have an approved press release or CEO statement for that period. I cannot invent a quote. Ask info@3dtechbiomed.com for confirmation.'
    ],
    vague:[
      'Quel est le type d’équipement, sa marque, son modèle et le problème observé ? Précisez aussi votre établissement et votre lieu, sans données de patients. Pour une demande de service, écrivez à info@3dtechbiomed.com.',
      'What are the equipment type, brand, model and observed issue? Include your facility and location, without patient data. Email info@3dtechbiomed.com for a service request.'
    ],
    comparison:[
      'Je ne dispose pas d’éléments vérifiés pour comparer 3D Tech à un concurrent ou affirmer sa supériorité. Comparez les offres sur leur périmètre, les qualifications documentées et les conditions proposées. Vous pouvez demander les informations de 3D Tech à info@3dtechbiomed.com.',
      'I do not have verified evidence to compare 3D Tech with a competitor or claim superiority. Compare documented scope, qualifications and offer terms. Ask info@3dtechbiomed.com for 3D Tech information.'
    ],
    clients:[
      'Les noms des établissements clients ne sont pas autorisés à la publication dans les informations disponibles. Je peux évoquer les interventions décrites pour des hôpitaux, laboratoires, cliniques et ONG, sans identifier les clients. Pour une référence autorisée, contactez info@3dtechbiomed.com.',
      'Client facility names are not authorized for publication in the available information. I can describe published interventions for hospitals, laboratories, clinics and NGOs without identifying clients. Contact info@3dtechbiomed.com to request an authorized reference.'
    ],
    complaint:[
      'Nous sommes désolés pour cette situation. Veuillez contacter directement notre équipe à info@3dtechbiomed.com avec la référence de votre demande, la date prévue et vos coordonnées pour que 3D Tech examine la situation. Je ne peux pas promettre un nouveau créneau ou un remboursement.',
      'We are sorry about this situation. Please contact our team directly at info@3dtechbiomed.com with your request reference, planned date and contact details so 3D Tech can investigate. I cannot promise a new appointment or refund.'
    ],
    offTopic:[
      'Je peux vous aider sur les services et les équipements de 3D Tech, mais pas sur la météo, les poèmes ou les sujets sans lien avec ces services. Pour joindre 3D Tech : info@3dtechbiomed.com.',
      'I can help with 3D Tech services and equipment, but not weather, poems or unrelated topics. Contact 3D Tech at info@3dtechbiomed.com.'
    ],
    imaging:[
      'Les équipements d’imagerie médicale figurent dans les catégories présentées par 3D Tech, mais cela ne confirme pas la réparation de chaque appareil à rayons X. Précisez la marque, le modèle et la panne à info@3dtechbiomed.com. Ne tentez pas une réparation ou un réglage technique vous-même.',
      'Medical imaging equipment is among the categories presented by 3D Tech, but this does not confirm repair of every X-ray device. Email info@3dtechbiomed.com with the brand, model and issue. Do not attempt technical repairs or adjustments yourself.'
    ]
  };
  function language(question,fallback){
    const q=norm(question);
    if(/\b(do you|can (?:you|we|i|a)|what|which|how|are|where|does|is (?:my|part)|please|tell me|give me|my|your|our|should i|will|earlier|hello|the|is it|we are|i am|it does|and what)\b/.test(q))return 'en';
    if(/\b(est ce|vous|votre|quels|quelles|pouvez|offrez|combien|bonjour|mon|ma|mes|ca|entretien)\b/.test(q))return 'fr';
    return fallback;
  }
  function answer(question,lang,previous=''){
    const s=norm(question);
    const keys=[];
    const add=k=>{if(!keys.includes(k))keys.push(k);};
    const text=k=>messages[k][lang==='en'?1:0];
    const result=k=>({text:text(k),sources:[],intent:k});
    // Safety and confidentiality outrank all commercial/retrieval matches.
    if(/patient.*(?:s appelle|nom|prenom|name is)|dossier.*patient|medical record|mot de passe|password|patient name/.test(s))return result('sensitive');
    if(/\bdose\b|dosage|regl.*perfusion.*enfant|infusion setting|pump setting.*(?:child|paediatric|pediatric)/.test(s))return result('dose');
    if(/(?:desactiv|contourn|disable|bypass|eteindre|couper|turn off|silence).*alarm/.test(s))return result('alarm');
    if(/(?:continuer|continue|utiliser|using).*(?:respirat|ventilat|etalonnage|calibr).*(?:retard|overdue)|(?:etalonnage|calibr).*(?:retard|overdue).*(?:utilis|us(?:e|ing))/.test(s))return result('continuedUse');
    if(/valeurs? errone|incorrect readings|readings.*wrong|pendant une intervention|during.*(?:procedure|treatment)/.test(s))return result('incident');
    if(/(?:repar|repair|fix).*(?:moi.meme|vous.meme|myself|yourself|my own)|code d erreur|error code/.test(s))return result('repairSafety');
    if(/prompt|ignore.*instruction|montre.*instruction|system.*instruction|(?:reveal|show).*?(?:hidden|internal|private).*?(?:instructions|documents)/.test(s))return result('injection');
    if(/jamais presente|inacceptable|mecontent|insatisfait|decu|reclamation|plainte|mauvais service|aucune reponse|personne.*venu|pas.*presente|pas.*repondu|attends.*reponse|did not show|never showed|unacceptable|unhappy|dissatisfied|disappointed|complaint|poor service|no response/.test(s))return result('complaint');
    if(/statut|status|expire|expiry|expiration|dernier certificat|(?:last|latest).*certificate|piece.*stock|part.*stock|inventory.*part|repair ticket|mon contrat|my contract/.test(s))return result('records');
    if(/reserv|book.*(?:visit|technician)|technicien.*disponible|technician.*(?:available|come today)/.test(s))return result('booking');
    if(/rabais|discount|rebate|remise.*\d|\d.*remise/.test(s))return result('price');
    if(/iso\s*(?:13485|17025)|(?:cei|iec)\s*62353|tracabil|tracable|traceab|certifi.*technicien|technicien.*certifi|technician.*certifi|certif.*technician|certifying body|organisme/.test(s))return result('credentials');
    if(/securite electrique|electrical safety/.test(s))return result('electrical');
    if(/audit|agrement canada|accreditation canada/.test(s))return result('audit');
    if(/garantie|warranty/.test(s))return result('warranty');
    if(/\blocation\b.*(?:equip|appareil)|credit.bail|leasing|rental|refurbished|remis a neuf/.test(s))return result('commercial');
    if(/adresse|\baddress\b|\boffice\b|bureau/.test(s))return result('address');
    if(/communique|communique de presse|pdg|press release|ceo/.test(s))return result('press');
    if(/quels.*(?:hopitaux|clients)|noms.*clients|which.*(?:hospital|client)|client names|names.*customer/.test(s))return result('clients');
    if(/meilleur|better than|competitor|concurrent|superior to/.test(s))return result('comparison');
    if(/meteo|poeme|temps fait.il|weather|write.*poem/.test(s))return result('offTopic');
    if(/24\s*h|24\s*\/\s*7|24\s*\/\s*24|7\s*j|24.?7/.test(s))return result('emergency');
    // Answer multiple documented parts of a question, rather than returning after the first keyword.
    const asksExamples=/quels?\s+(?:sont\s+les\s+)?(?:appareils|equipements)|exemples?|types?\s+d[ ’']*(?:appareils|equipements)|what.*equipment|which.*devices|equipment.*(?:for|used in)/.test(s);
    if(asksExamples&&!/prix|cout|delai|duree|etalonn|calibr|repar|install|mainten/.test(s)){
      const examples=window.documentAssistant?.search(question,lang,true);
      if(examples)return examples;
    }
    const duration=/combien de temps|delai|duree|how long|how quickly|turnaround|response time|duration|timeframe/.test(s);
    const calibration=/etalonn|calibr/.test(s);
    const region=/region|desser|territoire|province|sur place|on.site|laval|haiti|ha[iï]ti/.test(s);
    const ultrasound=/echograph|ultrasound/.test(s);
    const models=/\b[a-z]*[0-9]{3,}[a-z0-9]*\b/.test(s);
    if(/respirateur|ventilator|pompe.*perfusion|infusion pump|moniteur.*patient|patient monitor|defibrillateur|defibrillator/.test(s))add('equipment');
    else if(ultrasound)add('ultrasound');
    if(/rayon.?x|x.?ray/.test(s))add('imaging');
    if(duration)add('duration');
    if(region)add('regions');
    if(/envoyer.*equipement|send.*equipment|technicien.*viendra|\bship(?:ping)?\b|\bworkshop\b|expedition/.test(s))add('shipping');
    if(/cout|prix|tarif|price|cost/.test(s))add('price');
    if(calibration&&!duration)add('calibration');
    if(models&&!keys.length)add('unknownModel');
    if(/soumission|devis|quote|estimate|renseignements|informations.*preparer|information.*prepare|details.*(?:need|inquiry)|demande.*repar|request.*repair|repair request|contacter/.test(s))add('request');
    if(/formation|former|training|train.*(?:staff|users)/.test(s))add('training');
    if(/install/.test(s))add('installation');
    if(/preventi|correcti/.test(s))add('maintenance');
    if(/quels services|services.*offrez|what.*services|available services/.test(s))add('services');
    if(keys.length){
      const context=duration && /etalonn|calibr/.test(norm(previous))
        ? (lang==='fr'?'Pour l’étalonnage évoqué :\n':'For the calibration discussed:\n') : '';
      return {text:context+keys.map(text).join('\n\n'),sources:[],intent:keys.join(',')};
    }
    if(/ca marche pas|ne fonctionne pas|doesn.t work|does not work|not working|isn.t working/.test(s))return result('vague');
    return null;
  }
  window.assistantPolicy={answer,language};
})();
