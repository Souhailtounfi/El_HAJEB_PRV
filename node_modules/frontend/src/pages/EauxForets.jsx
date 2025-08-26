import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import eef1 from '../assets/eef1.png';
import eef2 from '../assets/eef2.png';
import eef3 from '../assets/eef3.png';
import eef4 from '../assets/eef4.png';

/* Page Eaux & Forêts */

export default function EauxForets(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'EAUX & FORÊTS',
    intro:[
      "Le domaine forestier de la Province d'El Hajeb couvre environ 32 565 ha répartis en plusieurs forêts majeures.",
      "Ces forêts jouent un rôle écologique et socio‑économique important (lutte contre l'érosion, biodiversité, loisirs, bois, pastoralisme).",
    ],
    forestsTitle:'Superficie (principales forêts)',
    forestsCols:['FORÊT','SUPERFICIE (HA)','STATUT'],
    forestsRows:[
      ['Achemache','15 829','Aménagée & immatriculée'],
      ['Aït Bourzoune','9 560','Aménagée & immatriculée'],
      ['Bouachouch','544','Aménagée & immatriculée'],
      ['Jaaba (partie)','5 652','Aménagée (immatric. en cours)'],
      ['Jbel Aoua Nord','980','Aménagée (immatric. en cours)'],
    ],
    speciesTitle:'Peuplement dominant',
    speciesPara:"Les essences dominantes sont le chêne vert et le thuya, accompagnés de chêne liège, lentisque, oléastre, caroubier et autres espèces secondaires. Des reboisements en eucalyptus et pins complètent les zones claires du plateau central.",
    nurseryTitle:'Production moyenne de plants (pépinière)',
    nurseryCols:['DESTINATION','PRODUCTION (PLANTS)','ESPÈCE PRINCIPALE'],
    nurseryRows:[
      ['Reboisement','300 000','Pin d\'Alep'],
      ['Régénération','110 000','Chêne vert'],
      ['Subvention','140 000','Eucalyptus'],
      ['Subvention','30 000','Acacia cyano'],
      ['Subvention','40 000','Caroubier'],
      ['Régénération','100 000','Thuya'],
      ['Subvention','20 000','Cyprès'],
      ['Subvention','30 000','Acacia eburnea'],
      ['Subvention','30 000','Casuarina'],
    ],
    nurseryTotal:['TOTAL','800 000',''],
    nurseryCaption:"Arrondissement des Eaux et Forêts d'El Hajeb (2015)",
    nurseryPara:"La pépinière Haj Kaddour (5 ha) possède une capacité théorique de 2 millions de plants, mais la production effective annuelle avoisine 1 million. Environ 20% est distribuée aux agriculteurs et établissements publics/semi‑publics sous forme de subvention." ,
    equipTitle:'Équipements forestiers',
    equipPara:"Les équipements de gestion reflètent l'importance du domaine forestier.",
    equipCols:['ÉQUIPEMENTS','IMPORTANCE','LOCALISATION (extraits)'],
    equipRows:[
      ['Maisons forestières (techniciens)','8','Agourai, Aït Lkser, Ras Ktib, Boulbal, Aït Harzallah, Haj Kaddour…'],
      ['Maisons forestières (cavaliers)','5','Aïn Lkser, Ras Ktib, Boulbal, Aït Harzallah, Jaaba…'],
      ['Pistes forestières','202 km','Divers massifs'],
      ['Tranchées pare‑feu','27 km','Achemache / Jaaba'],
      ['Postes de vigie','4','Ktane, Sidi Addi, Haytane, Bouklafa'],
    ],
    staffTitle:'Moyens humains',
    staffPara:"La gestion est assurée par une équipe composée notamment de 5 ingénieurs, 13 techniciens et 11 agents ou cadres administratifs.",
    huntingTitle:'Chasse',
    huntingPara:"Le territoire offre un potentiel cynégétique diversifié: perdrix, lièvre, lapin, pigeon, caille, tourterelle, sanglier et gibier d'eau de passage (notamment canard). L'aménagement vise la protection, la régénération et la valorisation durable.",
    reservesTitle:'Réserves triennales (actives)',
    reservesList:['Oued Elkherfane : 13 041 ha','Ras Laktib : 38 519 ha','Iqaddar : 10 593 ha'],
    amodTitle:'Amodiations (extraits)',
    amodCols:["ASSOCIATION","SUPERFICIE (HA)","COMMUNE","DATE"],
    amodRows:[
      ['Lot de la Wilaya','5775','Aït Bourzoune','1990'],
      ['Lot Prov El Hajeb','6025','Aït Bourzoune','1994'],
      ['Ait Bouhafra','1000','Aït Bourzoune','2011'],
      ['Atlas Moutawassit','3000','Aït Bourzoune','2011'],
      ['Tassekourt 1','2939','Tamchachat','1989'],
      ['Tassekourt 2','2161','Tamchachat','2006'],
      ['El Ouahda','454','Aïn Naaman','2003'],
      ['Ennassr','1600','Tamchachat','2006'],
      ['Moughaz','600','Tamchachat','2001'],
    ],
    amodCaption:'DPEFLCD Meknès El Hajeb (2015)'
  };

  const ar = {
    title:'المياه و الغابات',
    intro:[
      'يمتد المجال الغابوي لإقليم الحاجب على حوالي 32565 هكتارا موزعة على عدة غابات رئيسية.',
      'تلعب هذه الغابات دورا بيئيا و اجتماعيا و اقتصاديا هاما (مكافحة التعرية، التنوع البيولوجي، الترفيه، الخشب، الرعي).'
    ],
    forestsTitle:'المساحة (غابات رئيسية)',
    forestsCols:['الغابة','المساحة (هكتار)','الوضع'],
    forestsRows:[
      ['أشماش','15829','مهيأة و محفظة'],
      ['آيت بورزون','9560','مهيأة و محفظة'],
      ['بواشوش','544','مهيأة و محفظة'],
      ['جعبة (جزء)','5652','مهيأة (قيد التحفيظ)'],
      ['جبل عوى الشمالي','980','مهيأة (قيد التحفيظ)'],
    ],
    speciesTitle:'التغطية الغابوية',
    speciesPara:'الأصناف الغالبة: السنديان الأخضر و الثويا مع السنديان الفليني، المستكة، الزيتون البري، الخروب و أصناف ثانوية أخرى. كما تكمل التشجيرات بالإكاليبتوس و الصنوبر الفراغات.',
    nurseryTitle:'الإنتاج المتوسط للشتلات',
    nurseryCols:['الوجهة','الإنتاج (شتلة)','الصنف'],
    nurseryRows:[
      ['تشجير','300000','صنوبر حلب'],
      ['تجديد','110000','سنديان أخضر'],
      ['دعم','140000','أوكاليبتوس'],
      ['دعم','30000','أكاسيا'],
      ['دعم','40000','خروب'],
      ['تجديد','100000','ثويا'],
      ['دعم','20000','سرو'],
      ['دعم','30000','أكاسيا إبورنيا'],
      ['دعم','30000','كازوارينا'],
    ],
    nurseryTotal:['المجموع','800000',''],
    nurseryCaption:'مقاطعة المياه و الغابات الحاجب (2015)',
    nurseryPara:'تبلغ الطاقة النظرية لمشتل حاج قدور (5 هكتارات) مليوني شتلة بينما الإنتاج الفعلي يقارب مليون شتلة توزع نسبة 20% منها كدعم.',
    equipTitle:'التجهيزات الغابوية',
    equipPara:'تعكس التجهيزات أهمية المجال الغابوي.',
    equipCols:['تجهيز','الأهمية','الموقع (مختصر)'],
    equipRows:[
      ['منازل الغابات (تقنيون)','8','أكوراي، آيت القصر، راس اكتيب، بولبال...'],
      ['منازل الغابات (فرسان)','5','آيت القصر، راس اكتيب، بولبال...'],
      ['مسالك غابوية','202 كم','عدة كتل'],
      ['خنادق وقاية','27 كم','أشماش / جعبة'],
      ['أبراج مراقبة','4','كتانة، سيدي عدي، هيتان، بوكلافة'],
    ],
    staffTitle:'الموارد البشرية',
    staffPara:'تتكون الفرق من 5 مهندسين و 13 تقنيا و 11 عاملا أو إطارا إداريا.',
    huntingTitle:'الصيد',
    huntingPara:'تزخر الغابات بثراء في الطرائد: الحجل، الأرنب البري، الأرنب، الحمام، السمان، اليمام، الخنزير البري و طيور الماء العابرة.',
    reservesTitle:'المحميات الثلاثية (نشطة)',
    reservesList:['وادي الخرفان : 13041 هكتار','راس لكتيب : 38519 هكتار','إيقادار : 10593 هكتار'],
    amodTitle:'التأجيرات (مختصر)',
    amodCols:['الجمعية','المساحة','الجماعة','التاريخ'],
    amodRows:[
      ['حصة الولاية','5775','آيت بورزون','1990'],
      ['حصة الإقليم','6025','آيت بورزون','1994'],
      ['آيت بوحفرة','1000','آيت بورزون','2011'],
      ['أطلس متوسط','3000','آيت بورزون','2011'],
      ['تاسكورت 1','2939','تامشاشت','1989'],
      ['تاسكورت 2','2161','تامشاشت','2006'],
      ['الوحدة','454','عين نعمان','2003'],
      ['النصر','1600','تامشاشت','2006'],
      ['موغاز','600','تامشاشت','2001'],
    ],
    amodCaption:'(2015) المديرية الإقليمية',
  };

  const t = isAr? ar: fr;

  const Section = ({id, title, children}) => (
    <section id={id} className="eef-section fade-in">
      <h2>{title}</h2>
      {children}
    </section>
  );

  const Table = ({cols, rows, total, caption}) => (
    <div className="table-wrap" role="region" aria-label={cols[0]}>
      <table className="eef-table responsive-table">
        <thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r,i)=>(<tr key={i}>{r.map((c,j)=><td key={j} data-label={cols[j]}>{c}</td>)}</tr>))}</tbody>
        {total && <tfoot><tr>{total.map((c,i)=><th key={i}>{c}</th>)}</tr></tfoot>}
      </table>
  {caption && <p className="table-caption" title={caption}>{caption}</p>}
    </div>
  );

  return (
    <div className="eef-wrap" dir={dir}>
      <EefStyle dir={dir} />
      <header className="eef-hero fade-in">
        <h1>{t.title}</h1>
        <p className="lead hero-lead">{t.intro[0]}</p>
        <p className="lead subtle">{t.intro[1]}</p>
      </header>

      <Section id="superficie" title={t.forestsTitle}>
        <div className="gallery one">
          <figure className="img-card"><img src={eef1} alt={t.title} loading="lazy" /><figcaption>Achemache</figcaption></figure>
          <figure className="img-card"><img src={eef2} alt={t.title} loading="lazy" /><figcaption>Carte forestière</figcaption></figure>
        </div>
        <Table cols={t.forestsCols} rows={t.forestsRows} />
      </Section>

      <Section id="peuplement" title={t.speciesTitle}>
        <p className="para">{t.speciesPara}</p>
        <Table cols={t.nurseryCols} rows={t.nurseryRows} total={t.nurseryTotal} caption={t.nurseryCaption} />
        <div className="single-img">
          <figure className="img-card"><img src={eef3} alt={t.title} loading="lazy" /><figcaption>Pépinière Haj Kaddour</figcaption></figure>
        </div>
        <p className="para small">{t.nurseryPara}</p>
      </Section>

      <Section id="equipements" title={t.equipTitle}>
        <p className="para">{t.equipPara}</p>
        <Table cols={t.equipCols} rows={t.equipRows} />
        <div className="single-img">
          <figure className="img-card"><img src={eef4} alt={t.title} loading="lazy" /><figcaption>Massif</figcaption></figure>
        </div>
      </Section>

      <Section id="staff" title={t.staffTitle}>
        <p className="para">{t.staffPara}</p>
      </Section>

      <Section id="chasse" title={t.huntingTitle}>
        <p className="para">{t.huntingPara}</p>
        <h3 className="mini-title">{t.reservesTitle}</h3>
        <ul className="bullets">{t.reservesList.map(r=> <li key={r}>{r}</li>)}</ul>
      </Section>

      <Section id="amodiations" title={t.amodTitle}>
        <Table cols={t.amodCols} rows={t.amodRows} caption={t.amodCaption} />
      </Section>
    </div>
  );
}

function EefStyle({dir}){return <style>{`
.eef-wrap{--c1:#0d7d3f;--c2:#10b981;--c3:#065f46;--rad:1.35rem;max-width:1600px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.6rem) clamp(1rem,3vw,3.2rem) 3.8rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#053a2a;}
.eef-hero{background:linear-gradient(135deg,#065f46,#089470);border:1px solid #0d9b7650;padding:1.9rem 1.7rem 2.1rem;border-radius:var(--rad);box-shadow:0 28px 60px -22px rgba(0,0,0,.45);text-align:center;}
.eef-hero h1{margin:0 0 1rem;font-size:clamp(1.7rem,3.4vw,3rem);font-weight:800;letter-spacing:.05em;background:linear-gradient(115deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;}
.lead{margin:.2rem 0 .95rem;font-size:.92rem;line-height:1.6;font-weight:500;}
/* Hero paragraph (first) fully white for readability */
.hero-lead{color:#ffffff;text-shadow:0 2px 4px rgba(0,0,0,.35);} 
/* Second hero paragraph slightly softer white */
.eef-hero .lead.subtle{color:#f1fdf7;opacity:.92;text-shadow:0 1px 3px rgba(0,0,0,.3);} 
.eef-section{margin-top:2.9rem;background:rgba(255,255,255,.72);border:1px solid #10b98133;border-radius:var(--rad);padding:1.65rem 1.55rem 2.2rem;box-shadow:0 24px 52px -22px rgba(0,0,0,.28);position:relative;overflow:hidden;}
.eef-section:before{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.eef-section h2{margin:0 0 1.3rem;font-size:clamp(1.15rem,2.3vw,2rem);font-weight:800;letter-spacing:.05em;color:#065f46;text-transform:uppercase;}
.mini-title{margin:1.4rem 0 .9rem;font-size:clamp(.95rem,1.4vw,1.15rem);font-weight:700;color:#065f46;letter-spacing:.03em;}
.para{margin:.5rem 0 1.1rem;font-size:.82rem;line-height:1.62;font-weight:600;color:#042f22;} /* Darker text larger */
.para.small{font-size:.8rem;opacity:.98;color:#073723;}
.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin:0 0 1.2rem;}
.single-img{display:flex;justify-content:center;margin:0 0 1.2rem;}
.img-card{margin:0;background:rgba(255,255,255,.72);border:1px solid #10b98133;padding:.6rem;border-radius:1.1rem;backdrop-filter:blur(10px) saturate(160%);-webkit-backdrop-filter:blur(10px) saturate(160%);box-shadow:0 14px 40px -18px rgba(0,0,0,.32);}
.img-card img{display:block;max-width:100%;width:100%;border-radius:.8rem;aspect-ratio:4/3;object-fit:cover;}
.img-card figcaption{margin:.55rem 0 0;font-size:.74rem;font-weight:600;letter-spacing:.05em;text-align:center;color:#065f46;}
.table-wrap{overflow-x:auto;margin-bottom:.4rem;}
.eef-table{width:100%;border-collapse:collapse;font-size:.82rem;min-width:580px;}
.eef-table th,.eef-table td{border:1px solid #10b98133;padding:.55rem .65rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.eef-table th{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;letter-spacing:.05em;}
.eef-table tbody td{background:#fff;font-weight:600;color:#042f22;}
.eef-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.eef-table tfoot th{background:#047857;color:#fff;font-weight:800;}
.table-caption{margin:.6rem 0 0;font-size:.72rem;font-style:italic;text-align:center;opacity:.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;width:100%;}
.bullets{margin:.4rem 0 1.1rem;padding-${dir==='rtl'?'right':'left'}:1.05rem;display:flex;flex-direction:column;gap:.65rem;font-size:.88rem;font-weight:600;color:#042f22;}
/* Responsive: tables -> cards */
@media (max-width:760px){
  .eef-section{padding:1.3rem 1rem 1.7rem;}
  .eef-table{font-size:.85rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.5rem;border:1px solid #10b98133;background:#fff;margin-bottom:.85rem;padding:.7rem .75rem;border-radius:1rem;box-shadow:0 8px 20px -12px rgba(0,0,0,.2);} 
  .responsive-table td{border:none!important;padding:.4rem .5rem;background:transparent!important;display:flex;flex-direction:column;gap:.22rem;font-size:.8rem;line-height:1.35;}
  .responsive-table td:before{content:attr(data-label);font-size:.7rem;font-weight:700;color:#047857;letter-spacing:.02em;}
  .eef-table tfoot{display:none;}
  .para{font-size:.95rem;line-height:1.68;}
  .para.small{font-size:.82rem;}
  .bullets{font-size:.9rem;line-height:1.5;}
  .img-card figcaption{font-size:.72rem;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
