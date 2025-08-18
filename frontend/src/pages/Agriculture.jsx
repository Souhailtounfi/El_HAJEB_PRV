import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import agr1 from '../assets/agr1.png';
import agr2 from '../assets/agr2.png';
import agr3 from '../assets/agr3.png';
import agr4 from '../assets/agr4.png';
import agr5 from '../assets/agr5.png';
import agr6 from '../assets/agr6.png';

/* Agriculture Page
   - Modern hero + key potential stats
   - Land distribution table
   - Several production tables (vegetale, légumineuses, fourragères, maraichères, arboriculture, unités de transformation)
   - Animal production tables
   - Opportunités (bulleted)
   - Bilingual + RTL + responsive tables -> cards on mobile
   - Images gallery segments contextually placed
*/

export default function Agriculture(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'AGRICULTURE',
    intro:[
      "La Province d'EL HAJEB dispose d'importantes potentialités agricoles qui en font une région agricole par excellence.",
      "Elle est constituée de grandes plaines fertiles, d'un climat favorable, d'un potentiel d'irrigation apprécié et d'une main d'œuvre qualifiée.",
      "Ces atouts restent partiellement valorisés par rapport à la demande croissante en produits agricoles dans la région et ses environs."
    ],
    landTitle:'Répartition du foncier',
    landCols:['STATUT JURIDIQUE','SUPERFICIE (HA)'],
    landRows:[['Melk','118.535'],['Collectif','32.418'],['Réforme agraire','23.675'],['Domaines de l’État','47.150'],['Habous','56']],
    landTotal:['TOTAL','221.834'],
    vegTitle:'Production végétale',
    vegBullets:["SAU: 150.000 ha (32.000 ha irrigués)","Parcours: 38.833 ha","Incultes: 5.500 ha","Forêts: 35.000 ha"],
    soilProdTitle:'Occupation du sol & production (Moyenne 4 dernières campagnes)',
    soilCols:['PRODUCTION VEGETALE','OCCUPATION (HA)','PRODUCTION (T)'],
    soilRows:[
      ['Culture oléagineuse','1000','717.5'],
      ['Maraîchage','12.000','346721'],
      ['Culture fourragère','10240','90790'],
      ['Légumineuses','8460','6806'],
      ['Céréales','70000','2450000'],
      ['Vignes (raisin de table)','12000','50000'],
      ['Amandier','2999','16604'],
      ['Pommier / Pêcher / Nectarine','2800','48627 (pommes)'],
      ['Olivier','11000','22000'],
      ['Autres','6948','78344']
    ],
    farmSizeTitle:'Taille des exploitations',
    farmCols:['TAILLE','AGRICULTEURS','%','SUPERFICIE (HA)','%'],
    farmRows:[['0-5 ha','6143','45','14.600','10'],['5-10 ha','3617','26.5','21.900','15'],['10-20 ha','2252','16.5','27.700','19'],['20-50 ha','1229','9','30.700','21'],['50-100 ha','273','2','14.600','10'],['> 100 ha','136','1','36.500','25']],
    legTitle:'Légumineuses',
    legCols:['CULTURES','SUPERFICIE (HA)','PRODUCTION MOY (QX)','RENDEMENT (QX/HA)'],
    legRows:[['Fèves','6500','65.000','10'],['Lentilles','1500','12.000','8'],['Pois-chiches','800','6.400','8'],['Autres','200','1.400','-']],
    fodderTitle:'Cultures fourragères',
    fodderCols:['CULTURES','SUPERFICIE (HA)','RENDEMENT (QX/HA)'],
    fodderRows:[['Avoine','5000','60'],['Orge fourrager','3200','80'],['Bersim','450','250'],['Luzerne','50','400'],['Maïs fourrager','200','260'],['Mélange fourrager','555','70'],['Autres','145','-']],
    maraichTitle:'Cultures maraîchères',
    maraichCols:['ESPÈCES','SUPERFICIE (HA)','RENDEMENT (QX/HA)'],
    maraichRows:[['Oignons','6000','600'],['Pomme de terre','5000','350'],['Carottes','250','300'],['Autres','1950','-']],
    arborTitle:'Arboriculture (superficie productive)',
    arborCols:['PLANTATIONS','SUPERFICIE (HA)'],
    arborRows:[['Olivier','6340'],['Vigne de table','1185'],['Vigne de vin','4864'],['Pommier','1800'],['Prunier','967'],['Amandier','2810'],['Poiriers','435'],['Pêcher/Nectarine','764'],['Autres','2835']],
    unitsTitle:'Unités de transformation principales (extraits)',
    unitsCols:['UNITE','LOCALISATION','CAPACITÉ','ETAT'],
    unitsRows:[['Olive - Pilier II','Coopérative Idrissia','200 Kg/h','Bon'],['Olive - FDA','CR Ait Harzellah','84 T/J','Bon'],['Prunier - FDA','CR Laqsir','Frigo 2970 m3','Bon'],['Aromatiques - FDA','CR Laqsir','2 T/H','Bon']],
    animalTitle:'Production animale',
    herdTitle:'Taille du cheptel (moyenne 5 dernières campagnes)',
    herdCols:['EFFECTIFS','NOMBRE'],
    herdRows:[['Ruches','1500'],['Camelins','0'],['Bovins','32000'],['Caprins','30000'],['Ovins','330.000'],['Équides','5571']],
    prodTitle:'Production (moyenne tonnes)',
    prodCols:['PRODUCTION','T'],
    prodRows:[['Miel','150'],['Laine','123.65'],['Viande rouge','803.64'],['Viande blanche','4304.80']],
    opportunitiesTitle:'Opportunités d\'investissement',
    opportunities:[
      "Unités d'engraissement ovins & caprins", 'Création de nouvelles huileries & conserveries','Valorisation oignon & pomme de terre (froid)','Production de plants (rosacées, vigne)','Unités apicoles modernes + valorisation des essaims','Valorisation sous-produit de la vinification (anthocyanes)','Unités de distillation PAM (plantes aromatiques & médicinales)','Création de pépinières (dindonneaux)','Valorisation production viticole (conditionnement & labels)'
    ]
  };
  const ar = {
    title:'الفلاحة',
    intro:[
      'يتوفر إقليم الحاجب على مؤهلات فلاحية مهمة تجعله منطقة فلاحية بامتياز.',
      'سهول واسعة خصبة، مناخ ملائم، إمكانيات ري معتبرة ويد عاملة مؤهلة.',
      'هذه المؤهلات لا تزال مستغلة جزئيا مقارنة بالطلب المتزايد على المنتجات الفلاحية.'
    ],
    landTitle:'توزيع الأراضي', landCols:['الوضعية القانونية','المساحة (هكتار)'], landRows:[['ملك','118.535'],['جماعي','32.418'],['إصلاح زراعي','23.675'],['أملاك الدولة','47.150'],['حبوس','56']], landTotal:['المجموع','221.834'],
    vegTitle:'الإنتاج النباتي', vegBullets:['المساحة الزراعية المستعملة 150000 هكتار (32000 مسقية)','مراعي 38833 هكتار','بور و أراضي غير مزروعة 5500 هكتار','غابات 35000 هكتار'],
    soilProdTitle:'استعمال الأرض و الإنتاج (متوسط 4 مواسم)', soilCols:['إنتاج نباتي','المساحة (هكتار)','الإنتاج (طن)'], soilRows:[['زيتيات','1000','717.5'],['خضروات','12000','346721'],['أعلاف','10240','90790'],['بقوليات','8460','6806'],['حبوبات','70000','2450000'],['كروم مائدة','12000','50000'],['لوز','2999','16604'],['تفاح/خوخ/نكتارين','2800','48627 (تفاح)'],['زيتون','11000','22000'],['أخرى','6948','78344']],
    farmSizeTitle:'حجم الاستغلاليات', farmCols:['الحجم','الفلاحون','%','المساحة (هكتار)','%'], farmRows:[['0-5 هكتار','6143','45','14600','10'],['5-10 هكتار','3617','26.5','21900','15'],['10-20 هكتار','2252','16.5','27700','19'],['20-50 هكتار','1229','9','30700','21'],['50-100 هكتار','273','2','14600','10'],['> 100 هكتار','136','1','36500','25']],
    legTitle:'البقوليات', legCols:['محاصيل','المساحة (هكتار)','الإنتاج (قنطار)','المردودية (قنطار/هكتار)'], legRows:[['فول','6500','65000','10'],['عدس','1500','12000','8'],['حمص','800','6400','8'],['أخرى','200','1400','-']],
    fodderTitle:'محاصيل علفية', fodderCols:['محاصيل','المساحة (هكتار)','المردودية (قنطار/هكتار)'], fodderRows:[['شوفان','5000','60'],['شعير علفي','3200','80'],['برسيم','450','250'],['برسيم (لوسيرن)','50','400'],['ذرة علفية','200','260'],['خليط علفي','555','70'],['أخرى','145','-']],
    maraichTitle:'الخضروات', maraichCols:['أصناف','المساحة (هكتار)','المردودية (قنطار/هكتار)'], maraichRows:[['بصل','6000','600'],['بطاطس','5000','350'],['جزر','250','300'],['أخرى','1950','-']],
    arborTitle:'الأشجار المثمرة (مساحة إنتاجية)', arborCols:['المغروسات','المساحة (هكتار)'], arborRows:[['زيتون','6340'],['عنب مائدة','1185'],['عنب نبيذ','4864'],['تفاح','1800'],['برقوق','967'],['لوز','2810'],['إجاص','435'],['خوخ/نكتارين','764'],['أخرى','2835']],
    unitsTitle:'وحدات التحويل الرئيسية (مختارة)', unitsCols:['الوحدة','الموقع','الطاقة','الحالة'], unitsRows:[['زيتون - ركيزة II','تعاونية الإدريسية','200 كلغ/س','جيد'],['زيتون - FDA','جماعة آيت حرزالله','84 طن/ي','جيد'],['برقوق - FDA','جماعة لقصير','تبريد 2970 م3','جيد'],['نباتات عطرية - FDA','جماعة لقصير','2 طن/س','جيد']],
    animalTitle:'الإنتاج الحيواني', herdTitle:'حجم القطيع (متوسط 5 مواسم)', herdCols:['النوع','العدد'], herdRows:[['خلايا نحل','1500'],['إبل','0'],['أبقار','32000'],['معز','30000'],['أغنام','330000'],['خيول','5571']], prodTitle:'الإنتاج (متوسط أطنان)', prodCols:['إنتاج','طن'], prodRows:[['عسل','150'],['صوف','123.65'],['لحوم حمراء','803.64'],['لحوم بيضاء','4304.80']], opportunitiesTitle:'فرص الاستثمار', opportunities:["تسمين الأغنام و الماعز","إنشاء معاصر و مصانع تعليب جديدة","تثمين البصل و البطاطس (تبريد)",'إنتاج مشاتل (عنب ، ورود)','وحدات حديثة لتربية النحل + تثمين الطرود','تثمين منتجات العنب (مركبات ملونة)','وحدات تقطير النباتات العطرية والطبية','مفاقس دواجن (ديك رومي)','تثمين الإنتاج الكرومي (تعبئة و ملصقات)']
  };

  const t = isAr? ar: fr;

  const Section = ({id, title, children}) => (
    <section id={id} className="agr-section fade-in">
      <h2>{title}</h2>
      {children}
    </section>
  );

  const Table = ({cols, rows, total, className=''}) => (
    <div className="table-wrap" role="region" aria-label={cols[0]}>
      <table className={`agr-table responsive-table ${className}`}>
        <thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r,ri)=> <tr key={ri}>{r.map((c,i)=><td key={i} data-label={cols[i]}>{c}</td>)}</tr>)}
        </tbody>
        {total && <tfoot><tr>{total.map((c,i)=><th key={i}>{c}</th>)}</tr></tfoot>}
      </table>
    </div>
  );

  return (
    <div className="agr-wrap" dir={dir}>
      <AgrStyle dir={dir} />
      <header className="agr-hero fade-in">
        <h1 className="agr-title">{t.title}</h1>
      </header>
      <section className="agr-intro fade-in delay-1" aria-label={t.title + ' intro'}>
        <div className="intro-text">
          <p className="lead main">{t.intro[0]}</p>
          <p className="lead subtle">{t.intro[1]}</p>
          <p className="lead subtle">{t.intro[2]}</p>
        </div>
        <div className="intro-gallery" role="group" aria-label={isAr? 'صور' : 'Images'}>
          {[agr1,agr2,agr3].map((img,i)=>(
            <figure key={i} className="hero-img"><img src={img} alt={isAr? 'فلاحة' : 'agriculture'} loading="lazy" /></figure>
          ))}
        </div>
      </section>

      <Section id="foncier" title={t.landTitle}>
        <Table cols={t.landCols} rows={t.landRows} total={t.landTotal} />
      </Section>

      <Section id="veg" title={t.vegTitle}>
        <ul className="bullets">{t.vegBullets.map(b=> <li key={b}>{b}</li>)}</ul>
        <div className="image-row">
          <img src={agr4} alt="irrigation" />
        </div>
        <h3 className="mini-title">{t.soilProdTitle}</h3>
        <Table cols={t.soilCols} rows={t.soilRows} />
      </Section>

      <Section id="farm-size" title={t.farmSizeTitle}>
        <Table cols={t.farmCols} rows={t.farmRows} />
      </Section>

      <Section id="legumineuses" title={t.legTitle}>
        <Table cols={t.legCols} rows={t.legRows} total={['TOTAL','9000','84.800','-']} />
      </Section>

      <Section id="fourrageres" title={t.fodderTitle}>
        <Table cols={t.fodderCols} rows={t.fodderRows} total={['TOTAL','10500','1120']} />
      </Section>

      <Section id="maraicheres" title={t.maraichTitle}>
        <div className="dual-images">
          <img src={agr5} alt="maraichage" />
          <img src={agr6} alt="maraichage" />
        </div>
        <Table cols={t.maraichCols} rows={t.maraichRows} total={['TOTAL','12200','1150']} />
      </Section>

      <Section id="arboriculture" title={t.arborTitle}>
        <Table cols={t.arborCols} rows={t.arborRows} total={['TOTAL','20000']} />
      </Section>

      <Section id="units" title={t.unitsTitle}>
        <Table cols={t.unitsCols} rows={t.unitsRows} />
      </Section>

      <Section id="animal" title={t.animalTitle}>
        <h3 className="mini-title">{t.herdTitle}</h3>
        <Table cols={t.herdCols} rows={t.herdRows} />
        <h3 className="mini-title space-top">{t.prodTitle}</h3>
        <Table cols={t.prodCols} rows={t.prodRows} />
      </Section>

      <Section id="opportunities" title={t.opportunitiesTitle}>
        <ul className="bullets cols">{t.opportunities.map(o=> <li key={o}>{o}</li>)}</ul>
      </Section>
    </div>
  );
}

function AgrStyle({dir}){return <style>{`
.agr-wrap{--c1:#059669;--c2:#10b981;--c3:#065f46;--rad:1.4rem;max-width:1650px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.7rem) clamp(1rem,3vw,3.3rem) 4rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#064e3b;}
.agr-hero{background:linear-gradient(135deg,#065f46,#089470);border:1px solid #0d9b7655;padding:1.9rem 1.7rem 2rem;border-radius:var(--rad);box-shadow:0 28px 60px -22px rgba(0,0,0,.45);position:relative;overflow:hidden;text-align:center;}
.agr-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 25%,rgba(255,255,255,.15),transparent 60%),radial-gradient(circle at 80% 70%,rgba(255,255,255,.12),transparent 65%);pointer-events:none;}
.agr-title{margin:0;font-size:clamp(1.75rem,3.6vw,3.1rem);font-weight:800;letter-spacing:.045em;background:linear-gradient(120deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;}
.agr-intro{margin-top:2.1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:1.8rem;align-items:start;}
.intro-text{background:rgba(255,255,255,.72);border:1px solid #10b98133;padding:1.4rem 1.3rem 1.55rem;border-radius:1.25rem;box-shadow:0 18px 42px -18px rgba(0,0,0,.28);}
.lead{margin:.15rem 0 .95rem;font-size:1rem;line-height:1.68;font-weight:600;color:#053826;max-width:1000px;}
.lead.subtle{opacity:.9;}
.intro-gallery{display:flex;flex-wrap:wrap;justify-content:center;align-content:flex-start;gap:1rem;background:rgba(255,255,255,.72);border:1px solid #10b98133;padding:1.2rem 1.1rem 1.4rem;border-radius:1.25rem;box-shadow:0 18px 42px -18px rgba(0,0,0,.28);}
.hero-img{flex:1 1 160px;max-width:200px;background:rgba(255,255,255,.18);border:1px solid #10b98133;border-radius:1rem;padding:.45rem;backdrop-filter:blur(10px) saturate(160%);-webkit-backdrop-filter:blur(10px) saturate(160%);box-shadow:0 10px 30px -14px rgba(0,0,0,.25);} 
.hero-img img{width:100%;border-radius:.7rem;display:block;aspect-ratio:4/3;object-fit:cover;}
@media (max-width:760px){.agr-intro{grid-template-columns:1fr;} .lead{font-size:.85rem;} }
.agr-section{margin-top:3rem;background:rgba(255,255,255,.72);border:1px solid #10b98133;border-radius:var(--rad);padding:1.7rem 1.6rem 2.2rem;box-shadow:0 24px 52px -22px rgba(0,0,0,.28);position:relative;overflow:hidden;}
.agr-section:before{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.agr-section h2{margin:0 0 1.3rem;font-size:clamp(1.25rem,2.4vw,2.15rem);font-weight:800;letter-spacing:.05em;color:#04432f;text-transform:uppercase;}
.mini-title{margin:1.4rem 0 .9rem;font-size:clamp(1.02rem,1.5vw,1.22rem);font-weight:700;color:#04432f;letter-spacing:.035em;}
.table-wrap{overflow-x:auto;margin-bottom:.4rem;}
.agr-table{width:100%;border-collapse:collapse;font-size:.74rem;min-width:560px;}
.agr-table th,.agr-table td{border:1px solid #10b98133;padding:.55rem .65rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.agr-table th{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;letter-spacing:.05em;}
.agr-table tbody td{background:#fff;font-weight:600;color:#053826;}
.agr-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.agr-table tfoot th{background:#047857;color:#fff;font-weight:800;}
.bullets{margin:0 0 1.1rem;padding-${dir==='rtl'?'right':'left'}:1.05rem;display:flex;flex-direction:column;gap:.6rem;font-size:.78rem;font-weight:600;color:#053826;}
.bullets.cols{flex-direction:row;flex-wrap:wrap;gap:.75rem;}
.bullets.cols li{flex:1 1 240px;}
.image-row{display:flex;justify-content:center;}
.image-row img{max-width:680px;width:100%;border-radius:1rem;box-shadow:0 18px 46px -18px rgba(0,0,0,.35);}
.dual-images{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-bottom:1.1rem;}
.dual-images img{width:100%;border-radius:1rem;box-shadow:0 14px 36px -16px rgba(0,0,0,.32);aspect-ratio:4/3;object-fit:cover;}
/* Responsive tables -> cards */
@media (max-width:760px){
  .agr-section{padding:1.35rem 1.05rem 1.75rem;}
  /* Increase table font size for mobile readability */
  .agr-table{font-size:.78rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.5rem;border:1px solid #10b98133;background:#fff;margin-bottom:.85rem;padding:.7rem .75rem;border-radius:1rem;box-shadow:0 8px 20px -12px rgba(0,0,0,.2);} 
  .responsive-table td{border:none!important;padding:.36rem .45rem;background:transparent!important;display:flex;flex-direction:column;gap:.18rem;font-size:.74rem;line-height:1.32;}
  .responsive-table td:before{content:attr(data-label);font-size:.64rem;font-weight:700;color:#047857;letter-spacing:.02em;}
  .agr-table tfoot{display:none;}
  .bullets{font-size:.8rem;line-height:1.45;}
  .lead{font-size:.95rem;line-height:1.6;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
