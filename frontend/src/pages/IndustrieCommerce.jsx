import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/* Industrie & Commerce Page
   - Sections: Industrie (intro + grands indicateurs + répartition sectorielle + unités + répartition productive)
               Commerce (appareil, infrastructures, projets, ventes farines, souks, approvisionnement)
   - Responsive tables -> cards (data-label)
   - Slightly larger clear fonts (esp. mobile)
   - Bilingual FR / AR with RTL support
   NOTE: Données issues des captures fournies (certaines valeurs susceptibles d'ajustement). */

export default function IndustrieCommerce(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'INDUSTRIE & COMMERCE',
    indTitle:'1. INDUSTRIE',
    indIntro:"Considérée comme prolongement de la vocation agricole de la Province, l'agro‑industrie constitue le principal pôle de développement. L'existence d'une main d'œuvre qualifiée, la diversité de la matière première agricole & forestière, un vaste marché de consommation et une position géographique privilégiée sont autant d'atouts pour la réussite des projets agro‑industriels.",
    grandTitle:'Part des grandeurs économiques (Région Fès–Meknès) – Millions DHS',
    grandCols:['INDICATEUR','PROVINCE','RÉGION','% PROV/RÉG'],
    grands:[
      ['Nombre d\'établissements','14','997','1%'],
      ['Effectif','441','47467','1%'],
      ['Production','527','23119','2%'],
      ['Chiffre d\'affaires','527','26219','2%'],
      ['Investissement','0','543','0%'],
      ['Valeur ajoutée','68','5347','1%'],
    ],
    grandSource:'Enquête annuelle industries de transformation (2013)',
    repTitle:'Répartition par secteur (millions DHS)',
    repCols:['GRAND SECTEUR','ENTREPRISES','CH. AFFAIRES','INVEST. TOTAL','PRODUCTION','EFFECTIF','VALEUR AJOUTÉE'],
    repRows:[
      ['Ind. Agro‑alimentaires','4','419','0','419','182','45'],
      ['Ind. Chimiques & para‑chimiques','8','104','0','104','243','23'],
      ['Ind. Métalliques & mécaniques','2','4','0','4','14','0.5'],
    ],
    repTotal:['TOTAL','14','527','0','527','810','68.5'],
    unitsTitle:"b) Unités industrielles (extraits)",
    unitsCols:['ÉTABLISSEMENT','ADRESSE','COMMUNE','ACTIVITÉ','GRAND SECTEUR'],
    unitsRows:[
      ['Ste Massera Brahim Zniber','Aït Hazzallah Haj Kaddour','El Hajeb','Fabrication huiles d\'olives','Agro‑alimentaire'],
      ['Boulangerie du Rif El Hajeb','Bd El Fida 110','El Hajeb','Boulangerie & pâtisserie','Agro‑alimentaire'],
      ['Conserverie Nora','Sebaa Ayoune (par Meknès BP7)','Sabaa Ayoune','Transformation fruits','Agro‑alimentaire'],
      ['Holding Traitement Olive','4e Prop … RN n°13 BP 198','El Hajeb','Huiles d\'olives','Agro‑alimentaire'],
      ['Les Huileries Ain Taoujdate','Centre Ain Taoujdate','Ain Taoujdate','Huiles d\'olives','Agro‑alimentaire'],
      ['Scierie Bouras','Route d\'Azrou','Agourai','Sciage de bois','Chimique & para chimique'],
      ['Ste Sopraho','Sebaa Ayoune','Sabaa Ayoune','Béton construction','Chimique & para chimique'],
      ['Basaltes Marocains','Rue Okba Ben Nafaa','Agourai','Travail de la pierre','Chimique & para chimique'],
    ],
    unitsCaption:'Délégation régionale Commerce & Industrie (2015)',
    prodTitle:'c) Répartition établissements productifs (extraits)',
    prodCols:['COMMUNE','UNITÉ','ACTIVITÉ'],
    prodRows:[
      ['C.U El Hajeb','Société E.Lbir','Industrie métallique'],
      ['C.U El Hajeb','Scierie Abdoun','Industrie de bois'],
      ['C.U & Cercle Taoujdate','Conserves de Sais','Industrie agro‑alimentaire'],
      ['C.U & Cercle Taoujdate','Station frigorifique','Industrie'],
      ['C.U Agourai','Unité de Tannerie','Industrie du cuir'],
      ['C.U Sabaa Ayoune','Comp. Rég. Terres cuites C.R.T.C','Matériaux construction'],
    ],
    commTitle:'2. COMMERCE',
    commIntro:'Le secteur du Commerce occupe une place centrale dans l\'économie provinciale grâce à la vocation agricole, le réseau de souks et la situation géographique de carrefour.',
    appareilTitle:'a) Appareil commercial',
    appareilBullets:['Grossistes : 49 commerçants','Détaillants : 1059 commerçants'],
    infraTitle:'b) Infrastructure commerciale',
    infraCols:['DÉSIGNATION','NOMBRE'],
    infraRows:[['Abattoirs','4'],['Entrepôts frigorifiques','19'],['Marchés municipaux','01'],['Souks hebdomadaires','08'],['Centres commerciaux','02']],
    projetsTitle:'c) Grands projets commerciaux',
    projetsCols:['PROJET','NOMBRE','ÉTAT D\'AVANCEMENT'],
    projetsRows:[["Centre commercial 'ACIMA'","01","Opérationnel"]],
    ventesTitle:'d) Ventes de farines (quintaux)',
    ventesCols:['PRODUITS','FNBET','F LUXE','FRS','FRCR'],
    ventesRows:[["El Hajeb","38727","22791","501","1410"]],
    souksTitle:'e) Les souks',
    souksCols:['COMMUNE','JOURNÉE DU SOUK'],
    souksRows:[['Municipalité El Hajeb','Lundi'],['Municipalité Ain Taoujdate','Jeudi'],['Municipalité Sebaa Ayoune','Dimanche'],['Municipalité Agourai','Jeudi'],['Commune Aït Boubidmane','Mardi'],['Commune Aït Yaaezem','Dimanche'],['Commune Jahjouh','Samedi'],['Commune Ras Ijjerri','Mardi']],
    approTitle:'f) Approvisionnement',
    approPara:"L'approvisionnement des marchés en 2014‑2015 a été assuré dans de bonnes conditions pour produits alimentaires et manufacturés.",
  };

  const ar = {
    title:'الصناعة و التجارة',
    indTitle:'1. الصناعة',
    indIntro:'تعد الصناعة الغذائية امتدادا للطابع الفلاحي للإقليم وتشكل قطب التطور الرئيسي بفضل اليد العاملة المؤهلة وتنوع المواد الأولية وموقعه الجغرافي.',
    grandTitle:'حصة المؤشرات الاقتصادية (جهة فاس مكناس) – مليون درهم',
    grandCols:['المؤشر','الإقليم','الجهة','%'],
    grands:[['عدد الوحدات','14','997','1%'],['اليد العاملة','441','47467','1%'],['الإنتاج','527','23119','2%'],['رقم المعاملات','527','26219','2%'],['الاستثمار','0','543','0%'],['القيمة المضافة','68','5347','1%']],
    grandSource:'بحث سنوي للصناعات التحويلية (2013)',
    repTitle:'التوزيع حسب القطاع (مليون درهم)',
    repCols:['القطاع الكبير','المقاولات','رقم المعاملات','الاستثمار','الإنتاج','اليد العاملة','القيمة المضافة'],
    repRows:[['الصناعات الغذائية','4','419','0','419','182','45'],['الصناعات الكيماوية و الشبه','8','104','0','104','243','23'],['الصناعات المعدنية و الميكانيكية','2','4','0','4','14','0.5']],
    repTotal:['المجموع','14','527','0','527','810','68.5'],
    unitsTitle:'ب) وحدات صناعية (مقتطف)',
    unitsCols:['المؤسسة','العنوان','الجماعة','النشاط','القطاع'],
    unitsRows:[['ماسيرا إبراهيم زنيبر','آيت حزازلة حاج قدور','الحاجب','صناعة زيت الزيتون','غذائية'],['مخبزة الريف الحاجب','شارع الفداء','الحاجب','مخبزة وحلويات','غذائية'],['كونسرف نورة','سبعا عيون','سبعا عيون','تحويل فواكه','غذائية'],['معالجة الزيتون','الطريق...','الحاجب','زيت الزيتون','غذائية'],['معاصر عين تاوجدات','المركز','عين تاوجدات','زيت الزيتون','غذائية'],['مخزن بورو','طريق آزرو','أغوراي','نشر الخشب','كيماوية'],['سوبراهُو','سبعا عيون','سبعا عيون','خرسانة البناء','كيماوية'],['بازلتات المغرب','شارع عقبة بن نافع','أغوراي','حجر','كيماوية']],
    unitsCaption:'مندوبية التجارة و الصناعة (2015)',
    prodTitle:'ج) توزيع وحدات إنتاجية (مقتطف)',
    prodCols:['الجماعة','الوحدة','النشاط'],
    prodRows:[['الحاجب','شركة البلير','صناعة معدنية'],['الحاجب','منشرة عبدون','خشب'],['الحاجب و تاوجطات','محافظ ساس','صناعة غذائية'],['الحاجب و تاوجطات','محطة تبريد','صناعة'],['أغوراي','وحدة الدباغة','جلود'],['سبعا عيون','وحدة طين','مواد بناء']],
    commTitle:'2. التجارة',
    commIntro:'يلعب قطاع التجارة دورا محوريا بفضل الطابع الفلاحي و شبكة الأسواق الأسبوعية و الموقع الجغرافي.',
    appareilTitle:'أ) الجهاز التجاري',
    appareilBullets:['تجار جملة: 49','تجار تقسيط: 1059'],
    infraTitle:'ب) البنية التجارية',
    infraCols:['التعيين','العدد'],
    infraRows:[['مجازر','4'],['مستودعات تبريد','19'],['أسواق بلدية','01'],['أسواق أسبوعية','08'],['مراكز تجارية','02']],
    projetsTitle:'ج) مشاريع تجارية كبرى',
    projetsCols:['المشروع','العدد','وضعية التقدم'],
    projetsRows:[['مركز تجاري أكسيما','01','يشتغل']],
    ventesTitle:'د) مبيعات الدقيق (قنطار)',
    ventesCols:['منتوج','FNBET','F LUXE','FRS','FRCR'],
    ventesRows:[['الحاجب','38727','22791','501','1410']],
    souksTitle:'هـ) الأسواق الأسبوعية',
    souksCols:['الجماعة','يوم السوق'],
    souksRows:[['الحاجب','الإثنين'],['عين تاوجدات','الخميس'],['سبعا عيون','الأحد'],['أغوراي','الخميس'],['آيت بوبيدمان','الثلاثاء'],['آيت يعازم','الأحد'],['جحجوح','السبت'],['راس اجيري','الثلاثاء']],
    approTitle:'و) التزويد',
    approPara:'تم تزويد الأسواق سنة 2014-2015 في ظروف جيدة بالمواد الغذائية و المصنعة.',
  };

  const t = isAr? ar: fr;

  const Section = ({id,title,children}) => <section id={id} className="ic-section fade-in"><h2>{title}</h2>{children}</section>;
  const Table = ({cols,rows,total,caption}) => (
    <div className="table-wrap" role="region" aria-label={cols[0]}>
  <table className="ic-table responsive-table"><thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} data-label={cols[j]}>{c}</td>)}</tr>)}</tbody>{total && <tfoot><tr>{total.map((c,i)=><th key={i}>{c}</th>)}</tr></tfoot>}</table>{caption && <p className="table-caption" title={caption}>{caption}</p>}</div>
  );

  return (
    <div className="ic-wrap" dir={dir}>
      <IcStyle dir={dir} />
      <header className="ic-hero fade-in">
        <h1>{t.title}</h1>
      </header>

      <Section id="industrie" title={t.indTitle}>
        <p className="para lead">{t.indIntro}</p>
        <h3 className="mini-title">{t.grandTitle}</h3>
        <Table cols={t.grandCols} rows={t.grands} caption={t.grandSource} />
        <h3 className="mini-title space-top">{t.repTitle}</h3>
        <Table cols={t.repCols} rows={t.repRows} total={t.repTotal} />
        <h3 className="mini-title space-top">{t.unitsTitle}</h3>
        <Table cols={t.unitsCols} rows={t.unitsRows} caption={t.unitsCaption} />
        <h3 className="mini-title space-top">{t.prodTitle}</h3>
        <Table cols={t.prodCols} rows={t.prodRows} />
      </Section>

      <Section id="commerce" title={t.commTitle}>
        <p className="para lead">{t.commIntro}</p>
        <h3 className="mini-title">{t.appareilTitle}</h3>
        <ul className="bullets">{t.appareilBullets.map(b=> <li key={b}>{b}</li>)}</ul>
        <h3 className="mini-title space-top">{t.infraTitle}</h3>
        <Table cols={t.infraCols} rows={t.infraRows} />
        <h3 className="mini-title space-top">{t.projetsTitle}</h3>
        <Table cols={t.projetsCols} rows={t.projetsRows} />
        <h3 className="mini-title space-top">{t.ventesTitle}</h3>
        <Table cols={t.ventesCols} rows={t.ventesRows} />
        <h3 className="mini-title space-top">{t.souksTitle}</h3>
        <Table cols={t.souksCols} rows={t.souksRows} />
        <h3 className="mini-title space-top">{t.approTitle}</h3>
        <p className="para small">{t.approPara}</p>
      </Section>
    </div>
  );
}

function IcStyle({dir}){return <style>{`
.ic-wrap{--c1:#166534;--c2:#10b981;--c3:#065f46;--rad:1.35rem;max-width:1650px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.7rem) clamp(1rem,3vw,3.3rem) 4rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#064e3b;}
.ic-hero{background:linear-gradient(135deg,#065f46,#089470);border:1px solid #0d9b7655;padding:1.9rem 1.7rem 2rem;border-radius:var(--rad);box-shadow:0 28px 60px -22px rgba(0,0,0,.45);text-align:center;}
.ic-hero h1{margin:0;font-size:clamp(1.75rem,3.6vw,3.1rem);font-weight:800;letter-spacing:.045em;background:linear-gradient(120deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;}
.ic-section{margin-top:3rem;background:rgba(255,255,255,.72);border:1px solid #10b98133;border-radius:var(--rad);padding:1.7rem 1.6rem 2.25rem;box-shadow:0 24px 52px -22px rgba(0,0,0,.28);position:relative;overflow:hidden;}
.ic-section:before{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.ic-section h2{margin:0 0 1.3rem;font-size:clamp(1.15rem,2.3vw,2rem);font-weight:800;letter-spacing:.05em;color:#065f46;text-transform:uppercase;}
.mini-title{margin:1.4rem 0 .9rem;font-size:clamp(.98rem,1.5vw,1.18rem);font-weight:700;color:#065f46;letter-spacing:.035em;}
.space-top{margin-top:2rem;}
.para{margin:.55rem 0 1.05rem;font-size:.85rem;line-height:1.65;font-weight:600;color:#053826;}
.para.lead{font-size:.95rem;}
.para.small{font-size:.76rem;opacity:.95;}
.table-wrap{overflow-x:auto;margin-bottom:.4rem;}
.ic-table{width:100%;border-collapse:collapse;font-size:.75rem;min-width:600px;}
.ic-table th,.ic-table td{border:1px solid #10b98133;padding:.6rem .7rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.ic-table th{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;letter-spacing:.05em;}
.ic-table tbody td{background:#fff;font-weight:600;color:#053826;}
.ic-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.ic-table tfoot th{background:#047857;color:#fff;font-weight:800;}
.table-caption{margin:.55rem 0 0;font-size:.7rem;font-style:italic;text-align:center;opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;width:100%;}
.bullets{margin:.2rem 0 1.1rem;padding-${dir==='rtl'?'right':'left'}:1.05rem;display:flex;flex-direction:column;gap:.6rem;font-size:.8rem;font-weight:600;color:#053826;}
/* Responsive tables -> cards */
@media (max-width:760px){
  .ic-section{padding:1.35rem 1.05rem 1.8rem;}
  .ic-table{font-size:.8rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.55rem;border:1px solid #10b98133;background:#fff;margin-bottom:.85rem;padding:.75rem .8rem;border-radius:1.05rem;box-shadow:0 8px 22px -12px rgba(0,0,0,.22);} 
  .responsive-table td{border:none!important;padding:.38rem .45rem;background:transparent!important;display:flex;flex-direction:column;gap:.18rem;font-size:.78rem;line-height:1.35;}
  .responsive-table td:before{content:attr(data-label);font-size:.72rem;font-weight:700;color:#047857;letter-spacing:.02em;}
  .ic-table tfoot{display:none;}
  .para{font-size:.92rem;}
  .para.lead{font-size:.98rem;}
  .para.small{font-size:.8rem;}
  .bullets{font-size:.84rem;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
