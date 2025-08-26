import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import tr1 from '../assets/tr1.png';
import tr2 from '../assets/tr2.png';
import tr3 from '../assets/tr3.png';
import tr4 from '../assets/tr4.png';
import tr5 from '../assets/tr5.png';
import tr6 from '../assets/tr6.png';

/* Tourisme Page
*/

export default function Tourisme(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'TOURISME',
    intro:[
      "La Province d'El Hajeb dispose de potentialités naturelles, historiques et socioculturelles conférant un rôle touristique de premier plan.",
      "Ces atouts permettent de développer un tourisme diversifié: montagne, écologique, culturel, agrotourisme, chasse, randonnées..."],
    potTitle:'POTENTIALITÉS TOURISTIQUES',
    histSitesTitle:"Sites d'intérêt touristiques : sites historiques",
    natSitesTitle:'Sites naturels',
    histSites:[
      ['Kasbah d\'Agourai','Commune rurale Agourai','Édifiée par Moulay Ismaïl'],
      ["Kasbah d'El Hajeb",'Commune d\'El Hajeb','Édifiée par Moulay el Hassan 1er'],
      ['Remparts ismaïliens','El Hajeb','Édifiés par Moulay Ismaïl'],
      ['Mausolée "Souk El Gour"','Souk El Gour – C.R. Aït Bourzroune','Monument funéraire (rive gauche Oued Idda)']
    ],
    natSites:[
      ['Source Assalama (Jirr)','Aït Ikou / Aït Yaazem','Source minérale thérapeutique'],
      ["Source Aïn Khadem",'Commune El Hajeb','Source naturelle'],
      ["Source Aïn Bitti",'Commune Bitti','Source naturelle'],
      ['Le Causse d\'El Hajeb','El Hajeb','Endroit approprié à l\'exercice du delta plane'],
      ['Source Aïn Bouticheaz','Commune El Hajeb','Source naturelle'],
      ['Source Aïn Madani','Commune El Hajeb','Source naturelle'],
    ],
    eventsPara:"Les cascades naturelles et artificielles, le folklore et les moussems religieux (Sidi Mhand Ben Amer – Aït Bourzroune, festival de l'oignon en août, festival Inachaddens en septembre, festival Talassa en mai) illustrent la richesse culturelle et le potentiel touristique de la province.",
    accomTitle:"ÉTABLISSEMENTS D'HÉBERGEMENT",
    classListTitle:'Liste des établissements touristiques classés',
    accomRows:[
      ['Paysage Hadda','El Hajeb','Hôtel une étoile'],
      ['Motel Chêne Vert','CR Iqaddar','Motel 2ème catégorie'],
      ['Auberge Berbère','Aït Ammar – Ouaïlal CR Bitti','Gîte 2ème catégorie'],
      ['Jasmin Berbère','Douar Rezzaga CR Bitti','Gîte 1ère catégorie'],
      ['Ranch Tijania Naim','Domaine Tijania – Coopérative Atlas Aït Naaman','Résidence hôtelière 3ème catégorie'],
      ['Hôtel Bennach','Hay Bassatine CU Ain Taoujdate','Non classé'],
      ["Camping d'El Hajeb",'Route d\'Azrou El Hajeb','Camping']
    ],
    projectsCurrentTitle:'Projets en cours de réalisation / étude',
    projectsCurrentRows:[['Unités en cours de réalisation','3','184','120 107 500,00'],['Projets en cours d\'étude','3','176','123 744 400,00']],
    projectsStoppedTitle:'Projets en arrêt',
    projectsStoppedRows:[['Rania Sapinière','Boulevard Mohamed V El-Hajeb','Hôtel','24','10 694 944,00'],['Platane','Parc du 20 Août El-Hajeb','Hôtel','160','50 944 900,00']],
    strategyTitle:'Projets retenus dans la stratégie touristique Vision 2020',
    strategyRows:[
      ['CR Aït Yaazem Aïn Salama','Niche à Forte Valeur ajoutée','Station thermale Aïn Salama','10','50,00'],
      ['CR Iqaddar','Eco / développement durable','Création d\'un ressort viticole','16','11,00'],
      ['CR Iqaddar CR Tamchachat CR Aït Bourzroune','Eco / développement durable','Circuit éco touristique (3 communes)','-','1,00'],
      ['CU El Hajeb','Eco / développement durable','Circuit agrotouristique (fermes à identifier)','-','0,55']
    ],
    sourcesNote:'(Délégation régionale du tourisme – 2015)'
  };

  const ar = {
    title:'السياحة',
    intro:['تزخر إقليم الحاجب بمؤهلات طبيعية وتاريخية واجتماعية وثقافية كبيرة تمنحها دورا سياحيا هاما.', 'تتيح هذه المؤهلات تطوير سياحة متنوعة: جبلية، إيكولوجية، ثقافية، فلاحية، الصيد، التنزه...'],
    potTitle:'المؤهلات السياحية',
    histSitesTitle:'مواقع ذات اهتمام سياحي : تاريخية',
    natSitesTitle:'مواقع طبيعية',
    histSites:[['قصبة أكوراي','الجماعة القروية أكوراي','شيدها المولى إسماعيل'],["قصبة الحاجب",'جماعة الحاجب','شيدها المولى الحسن الأول'],['الأسوار الإسماعيلية','الحاجب','شيدها المولى إسماعيل'],['ضريح سوق الكور','سوق الكور – جماعة آيت بورزورون','معلمة جنائزية']],
    natSites:[['عين السلامة (جر)','آيت أكر / آيت يعزم','عين معدنية علاجية'],["عين خادم",'جماعة الحاجب','عين طبيعية'],["عين بيتي",'جماعة بيتي','عين طبيعية'],['هضبة الحاجب','الحاجب','موقع مناسب للطيران الشراعي'],['عين بوتيشاز','جماعة الحاجب','عين طبيعية'],['عين مدني','جماعة الحاجب','عين طبيعية']],
    eventsPara:'الشلالات الطبيعية والاصطناعية والفلكلور والمواسم الدينية (سيدي امحند بن عامر – آيت بورزورون، مهرجان البصل، مهرجان إيناشادين، مهرجان تالاسا) تعكس الغنى الثقافي والمؤهلات السياحية.',
    accomTitle:'مؤسسات الإيواء السياحي',
    classListTitle:'لائحة المؤسسات السياحية المصنفة',
    accomRows:[['منظر حداء','الحاجب','فندق نجمة واحدة'],['موتيل البلوط الأخضر','ق اكدير','موتيل صنف ثاني'],['نزل بربري','آيت عمار –" أويلال" ق بتيت','ضيعة صنف ثاني'],['الياسمين بربري','دوار رزاقة ق بتيت','ضيعة صنف أول'],['ضيعة تيجانية نعيم','ضيعة تيجانية – تعاونية الأطلس آيت نعمان','إقامة فندقية صنف ثالث'],['فندق بن الناش','حي البساتين عين تاوجطات','غير مصنف'],['مخيم الحاجب','طريق آزرو الحاجب','تخييم']],
    projectsCurrentTitle:'مشاريع جارية / قيد الدراسة',
    projectsCurrentRows:[['وحدات جارية','3','184','120 107 500,00'],['مشاريع قيد الدراسة','3','176','123 744 400,00']],
    projectsStoppedTitle:'مشاريع متوقفة',
    projectsStoppedRows:[['رانيا صابينيير','شارع محمد الخامس الحاجب','فندق','24','10 694 944,00'],['بلاتان','منتزه 20 غشت الحاجب','فندق','160','50 944 900,00']],
    strategyTitle:'مشاريع رؤية 2020 السياحية',
    strategyRows:[['ق آيت يعزم عين سلامة','قيمة مضافة قوية','محطة حرارية عين سلامة','10','50,00'],['ق اكدير','ايكو / تنمية مستدامة','إحداث منتجع كرومي','16','11,00'],['ق اكدير ق تمشاشت ق آيت بورزورون','ايكو / تنمية مستدامة','مسار سياحي ايكولوجي (3 جماعات)','-','1,00'],['ج الحاجب','ايكو / تنمية مستدامة','مسار فلاحي سياحي (ضيعات)','-','0,55']],
    sourcesNote:'(مندوبية السياحة – 2015)'
  };

  const t = isAr? ar: fr;

  const Table = ({cols, rows, caption}) => (
    <div className="table-wrap" role="region" aria-label={cols[0]}> 
  <table className="tour-table responsive-table"><thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=>(<tr key={i}>{r.map((c,j)=><td key={j} data-label={cols[j]}>{c}</td>)}</tr>))}</tbody></table>{caption && <p className="table-caption" title={caption}>{caption}</p>}</div>
  );

  return <div className="tour-wrap" dir={dir}>
    <TourismeStyle dir={dir} />
    <header className="tour-hero fade-in"><h1>{t.title}</h1></header>

    <section className="tour-intro fade-in">
      {t.intro.map((p,i)=><p key={i} className="intro-para">{p}</p>)}
    </section>

    <section className="tour-gallery fade-in" aria-label="gallery">
      {[ 
        {src:tr1, cap:"Ecotourisme à la foret d’Ait bourzouine"},
        {src:tr2, cap:"Bassin d’Ain Dhiba à EL HAJEB"},
        {src:tr3, cap:"Kasbah d’AGOURAI"},
        {src:tr4, cap:"Kasbah MY EL HASSAN à ELHAJEB"},
        {src:tr5, cap:"Equipes de Fantasia à Ait Boubidmane"},
        {src:tr6, cap:"Equipes de Fantasia à Ait Boubidmane"},
      ].map((g,i)=>(
        <figure key={i} className="img-card">
          <img src={g.src} loading="lazy" alt={g.cap} />
          <figcaption>{g.cap}</figcaption>
        </figure>
      ))}
    </section>

    <section className="tour-section fade-in">
      <h2>{t.potTitle}</h2>
      <h3 className="mini-title">{t.histSitesTitle}</h3>
      <Table cols={[isAr?'الموقع':'NOM / ESPACE', isAr?'المحلية':'LOCALISATION', isAr?'مميزات':'CARACTÉRISTIQUES']} rows={t.histSites} />
      <h3 className="mini-title">{t.natSitesTitle}</h3>
      <Table cols={[isAr?'الموقع':'NOM / ESPACE', isAr?'المحلية':'LOCALISATION', isAr?'مميزات':'CARACTÉRISTIQUES']} rows={t.natSites} />
      <p className="para strong">{t.eventsPara}</p>
    </section>

    <section className="tour-section fade-in">
      <h2>{t.accomTitle}</h2>
      <h3 className="mini-title">{t.classListTitle}</h3>
      <Table cols={[isAr?'الإسم':'DÉNOMINATION', isAr?'العنوان':'ADRESSE', isAr?'التصنيف':'CLASSEMENT']} rows={t.accomRows} />
      <h3 className="mini-title">{t.projectsCurrentTitle}</h3>
      <Table cols={[isAr?'المشروع':'PROJET', isAr?'عدد':'NOMBRE', isAr?'عدد الأسرة':'NOMBRE DE LITS', isAr?'كلفة الاستثمار':'COÛT INVESTISSEMENT']} rows={t.projectsCurrentRows} caption={t.sourcesNote} />
      <h3 className="mini-title">{t.projectsStoppedTitle}</h3>
      <Table cols={[isAr?'المشروع':'PROJET', isAr?'الموقع':'LOCALISATION', isAr?'النوع':'TYPOLOGIE', isAr?'القدرة':''+'CAPACITÉ', isAr?'الكلفة':'COÛT ESTIMÉ']} rows={t.projectsStoppedRows} />
      <h3 className="mini-title">{t.strategyTitle}</h3>
      <Table cols={[isAr?'الموقع':'LOCALISATION', isAr?'البرنامج':'PROGRAMME', isAr?'المشروع':'PROJET', isAr?'الحاجة (هكتار)':'BESOIN (HA)', isAr?'الاستثمار (MDH)':'INVEST (MDH)']} rows={t.strategyRows} caption={t.sourcesNote} />
    </section>
  </div>;
}

function TourismeStyle({dir}){return <style>{`
.tour-wrap{--green:#047857;--accent:#10b981;max-width:1600px;margin-inline:auto;padding:clamp(1.2rem,2.3vw,2.8rem) clamp(1rem,3vw,3rem) 4rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#082d24;}
.tour-hero{background:linear-gradient(120deg,#065f46,#0d9465);border:1px solid #0d9b76a8;padding:2.1rem 1.4rem 2.2rem;border-radius:1.55rem;box-shadow:0 30px 60px -25px rgba(0,0,0,.48);text-align:center;margin-bottom:2.2rem;}
.tour-hero h1{margin:0;font-size:clamp(2rem,4vw,3.3rem);font-weight:800;letter-spacing:.055em;background:linear-gradient(110deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;}
.tour-intro{background:rgba(255,255,255,.78);border:1px solid #10b98133;padding:1.6rem 1.4rem 1.9rem;border-radius:1.4rem;box-shadow:0 26px 58px -20px rgba(0,0,0,.32);margin-bottom:2.6rem;}
.intro-para{margin:.6rem 0 1.15rem;font-size:clamp(1rem,1.18vw,1.15rem);line-height:1.7;font-weight:600;color:#042f22;}
.tour-gallery{--card-min:250px;display:grid;grid-template-columns:repeat(auto-fit,minmax(var(--card-min),1fr));gap:1.25rem;margin:0 auto 2.8rem;justify-items:center;max-width:1700px;padding:0 .4rem;}
.img-card{margin:0;width:100%;background:rgba(255,255,255,.75);border:1px solid #10b98133;padding:.75rem;border-radius:1.2rem;backdrop-filter:blur(12px) saturate(170%);-webkit-backdrop-filter:blur(12px) saturate(170%);box-shadow:0 20px 56px -22px rgba(0,0,0,.42),0 0 0 1px #10b98133;} 
.img-card img{display:block;width:100%;border-radius:1rem;aspect-ratio:16/10;object-fit:cover;}
.img-card figcaption{margin:.6rem 0 0;font-size:.76rem;font-weight:600;text-align:center;color:#045c43;letter-spacing:.045em;line-height:1.25;}
.tour-section{background:rgba(255,255,255,.78);border:1px solid #10b98133;padding:1.75rem 1.5rem 2.2rem;border-radius:1.5rem;box-shadow:0 26px 58px -20px rgba(0,0,0,.32);margin-bottom:2.4rem;}
.tour-section h2{margin:0 0 1.35rem;font-size:clamp(1.25rem,2.5vw,2.15rem);font-weight:800;letter-spacing:.055em;text-transform:uppercase;color:#065f46;}
.mini-title{margin:1.6rem 0 1rem;font-size:clamp(1rem,1.4vw,1.2rem);font-weight:700;letter-spacing:.04em;color:#065f46;}
.para.strong{font-size:clamp(1rem,1.08vw,1.1rem);line-height:1.68;font-weight:600;color:#042f22;margin:1.25rem 0 1.05rem;}
.table-wrap{overflow-x:auto;margin:.2rem 0 1rem;}
.tour-table{width:100%;border-collapse:collapse;font-size:clamp(.74rem,.92vw,.86rem);min-width:620px;}
.tour-table th,.tour-table td{border:1px solid #10b98133;padding:.6rem .7rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.tour-table th{background:linear-gradient(130deg,#10b981,#059669);color:#fff;font-weight:700;letter-spacing:.05em;}
.tour-table tbody td{background:#fff;font-weight:600;color:#042f22;}
.tour-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.table-caption{margin:.45rem 0 0;font-size:.7rem;font-style:italic;text-align:center;opacity:.78;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;width:100%;}
/* Remove any alphabetical markers from lists we might add later */
ol{list-style:none;padding:0;margin:0;}
.bullets{list-style:none;margin:.6rem 0 1.2rem;padding-${dir==='rtl'?'right':'left'}:0;display:flex;flex-direction:column;gap:.55rem;}
.bullets li{position:relative;padding-${dir==='rtl'?'right':'left'}:1.05rem;font-size:.85rem;font-weight:600;color:#073323;}
.bullets li:before{content:'▹';position:absolute;${dir==='rtl'?'right':'left'}:0;top:.05rem;color:#10b981;font-size:.85rem;}

@media (max-width:820px){
  .intro-para{font-size:.95rem;}
  .tour-table{font-size:.72rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.55rem;border:1px solid #10b98133;background:#fff;margin-bottom:.9rem;padding:.8rem .85rem;border-radius:1.1rem;box-shadow:0 10px 26px -18px rgba(0,0,0,.25);} 
  .responsive-table td{border:none!important;padding:.38rem .45rem;background:transparent!important;display:flex;flex-direction:column;gap:.22rem;font-size:.78rem;line-height:1.34;}
  .responsive-table td:before{content:attr(data-label);font-size:.74rem;font-weight:700;color:#047857;letter-spacing:.02em;}
  .tour-section h2{font-size:1.35rem;}
  .mini-title{font-size:1.02rem;}
  .para.strong{font-size:.95rem;}
}
/* Larger screens: progressively bigger cards */
@media (min-width:900px){
  .tour-gallery{--card-min:300px;gap:1.4rem;}
  .img-card img{aspect-ratio:16/9.8;}
}
@media (min-width:1200px){
  .tour-gallery{--card-min:340px;gap:1.55rem;}
  .img-card img{aspect-ratio:16/9.5;}
}
@media (min-width:1500px){
  .tour-gallery{--card-min:380px;gap:1.7rem;}
  .img-card img{aspect-ratio:16/9.2;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
