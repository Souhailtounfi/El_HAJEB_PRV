import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import carImg from '../assets/car.png';

/* Carrières (Quarries) Page
   - Hero with image
   - Grouped table (cercle / pachalik with sub communes + counts)
   - Legal status distribution + exploited product types
   - Bilingual (FR / AR) + RTL
   - Responsive: table -> cards on small screens
*/

export default function Carrieres(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'CARRIERES',
    title1:'Carrière à iqqaddar',
    intro:"La Province présente une activité d'exploitation de carrières structurée autour de plusieurs cercles et pachaliks.",
    tableCols:['CERCLE / PACHALIK','COMMUNE','NOMBRE DE CARRIÈRES'],
    groups:[
      { g:'PACHALIK EL HAJEB', rows:[['El Hajeb','02']] },
      { g:'PACHALIK AGOURAI', rows:[['Agourai','02']] },
      { g:'CERCLE EL HAJEB', rows:[['Iqaddar','07'],['Aït Bourzoune','05'],['Aïn Naaman','02']] },
      { g:'CERCLE AIN TAOUJDATE', rows:[['Aït Boubidmane','01'],['Aït Harzallah','02'],['Bitit','07']] },
      { g:'CERCLE AGOURAI', rows:[['Aït Yaaezem','02']] },
    ],
    legalTitle:'Situation juridique (foncier des carrières)',
    legalPoints:[ 'Terres collectives : 17 carrières (57%)', 'Terres privées : 12 carrières (40%)', 'Terres domaniales : 1 carrière (3%)' ],
    prodTitle:'Produits exploités',
    prodPoints:['02 carrières de sables','01 schiste','01 basalte','26 graviers'],
    source:'Division de l\'Urbanisme & de l\'Environnement (Décembre 2015)'
  };
  const ar = {
    title:'المقالع',
    title1:'مقلع إيقادار',
    intro:'يعرف الإقليم نشاط استغلال المقالع موزعا على عدة دوائر وبشويات.',
    tableCols:['الدائرة / الباشوية','الجماعة','عدد المقالع'],
    groups:[
      { g:'باشوية الحاجب', rows:[['الحاجب','02']] },
      { g:'باشوية أغبالو (أغوراي)', rows:[['أغوراي','02']] },
      { g:'دائرة الحاجب', rows:[['إيقادار','07'],['آيت بورزون','05'],['عين نعمان','02']] },
      { g:'دائرة عين تاوجطات', rows:[['آيت بوبدمان','01'],['آيت حرز الله','02'],['بيطيت','07']] },
      { g:'دائرة أغوراي', rows:[['آيت يعازم','02']] },
    ],
    legalTitle:'الوضعية القانونية',
    legalPoints:['أراضٍ جماعية: 17 مقلع (57%)','أراضٍ خاصة: 12 مقلع (40%)','أملاك الدولة: مقلع واحد (3%)'],
    prodTitle:'المواد المستغلة',
    prodPoints:['مقلعان للرمال','مقلع واحد للسليت','مقلع واحد للبازلت','26 للحصى'],
    source:'مصلحة التعمير و البيئة (دجنبر 2015)'
  };

  const t = isAr? ar: fr;

  // Flatten table rows for display
  const tableRows = t.groups.flatMap(gr => [ {group:gr.g}, ...gr.rows.map(r=>({commune:r[0], count:r[1]})) ]);

  return (
    <div className="car-wrap" dir={dir}>
      <CarStyle dir={dir} />
      <header className="car-hero fade-in">
        <div className="hero-inner">
          <h1>{t.title}</h1>
          <p className="lead">{t.intro}</p>
          <figure className="hero-fig">
            <img src={carImg} alt={t.title} loading="lazy" />
            <figcaption>{t.title1}</figcaption>
          </figure>
        </div>
      </header>

      <section className="car-section fade-in delay-1">
        <h2>{t.title}</h2>
        <div className="table-scroll" role="region" aria-label={t.title}>
          <table className="car-table responsive-table">
            <thead>
              <tr>{t.tableCols.map(c=> <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {tableRows.map((r,i)=> r.group ? (
                <tr key={i} className="grp"><td colSpan={3}>{r.group}</td></tr>
              ) : (
                <tr key={i}>
                  <td data-label={t.tableCols[0]} className="sub">{''}</td>
                  <td data-label={t.tableCols[1]}>{r.commune}</td>
                  <td data-label={t.tableCols[2]} className="num">{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="source">{t.source}</p>
      </section>

      <section className="car-section fade-in delay-2">
        <div className="split-grid">
          <div>
            <h3 className="mini-title">{t.legalTitle}</h3>
            <ul className="bullets">{t.legalPoints.map(p=> <li key={p}>{p}</li>)}</ul>
          </div>
          <div>
            <h3 className="mini-title">{t.prodTitle}</h3>
            <ul className="bullets">{t.prodPoints.map(p=> <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function CarStyle({dir}){return <style>{`
.car-wrap{--c1:#166534;--c2:#15803d;--c3:#0f5132;--rad:1.35rem;max-width:1500px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.6rem) clamp(1rem,3vw,3.1rem) 3.6rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1e293b;}
.car-hero{background:linear-gradient(135deg,#15803d,#065f46);border:1px solid #0a795933;border-radius:var(--rad);padding:1.6rem 1.5rem 2rem;box-shadow:0 26px 60px -22px rgba(0,0,0,.45);}
.car-hero h1{margin:0 0 .9rem;font-size:clamp(1.7rem,3.5vw,3rem);font-weight:800;background:linear-gradient(115deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;letter-spacing:.04em;text-align:center;}
.lead{margin:.2rem auto 1.1rem;font-size:1rem;line-height:1.65;font-weight:600;color:#ffffff;max-width:1000px;text-align:center;}
.hero-inner{display:flex;flex-direction:column;align-items:center;}
.hero-fig{margin:0;max-width:760px;width:100%;background:rgba(255,255,255,.1);border:1px solid #ffffff22;padding:.8rem;border-radius:1.1rem;backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);box-shadow:0 18px 46px -20px rgba(0,0,0,.5);} 
.hero-fig img{width:100%;display:block;border-radius:.9rem;box-shadow:0 16px 42px -18px rgba(0,0,0,.55);}
.hero-fig figcaption{margin:.55rem 0 0;font-size:.65rem;font-weight:600;letter-spacing:.05em;opacity:.85;color:#f0fdf4;text-align:center;}
.car-section{margin-top:2.8rem;background:rgba(255,255,255,.72);border:1px solid #10b98133;border-radius:var(--rad);padding:1.65rem 1.55rem 2.1rem;box-shadow:0 22px 52px -22px rgba(0,0,0,.28);position:relative;overflow:hidden;}
.car-section:before{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.car-section h2{margin:0 0 1.3rem;font-size:clamp(1.25rem,2.4vw,2.15rem);font-weight:800;letter-spacing:.05em;color:#04432f;text-transform:uppercase;text-align:center;}
.mini-title{margin:0 0 .8rem;font-size:clamp(1.02rem,1.5vw,1.22rem);font-weight:700;color:#04432f;letter-spacing:.045em;}
.table-scroll{overflow:auto;}
.car-table{width:100%;border-collapse:collapse;font-size:.75rem;min-width:640px;}
.car-table th,.car-table td{border:1px solid #0ea87d33;padding:.55rem .65rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.car-table th{background:linear-gradient(135deg,#0f766e,#0d9488);color:#fff;font-weight:700;letter-spacing:.05em;}
.car-table tbody td{background:#fff;font-weight:600;color:#053826;}
.car-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.car-table tr.grp td{background:linear-gradient(90deg,#ecfdf5,#d1fae5);font-weight:800;color:#065f46;font-size:.7rem;letter-spacing:.04em;}
.car-table td.sub{background:#f0fdfa;font-style:italic;}
.car-table .num{text-align:center;font-variant-numeric:tabular-nums;}
.source{margin:.8rem 0 0;font-size:.55rem;font-style:italic;text-align:center;opacity:.7;}
.split-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.4rem;}
.bullets{margin:0;padding-${dir==='rtl'?'right':'left'}:1.05rem;display:flex;flex-direction:column;gap:.6rem;font-size:.78rem;font-weight:600;color:#053826;}
/* Responsive table -> cards */
@media (max-width:760px){
  .car-section{padding:1.3rem 1.05rem 1.7rem;}
  /* Increased base table font-size for better legibility on small screens */
  .car-table{font-size:.78rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr.grp{display:block;border:1px solid #10b98133;margin-top:.75rem;border-radius:.85rem;padding:.55rem .65rem;background:linear-gradient(135deg,#ecfdf5,#d1fae5);} 
  .responsive-table tbody tr:not(.grp){display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.45rem;border:1px solid #10b98133;background:#fff;margin-bottom:.75rem;padding:.65rem .7rem;border-radius:.9rem;box-shadow:0 6px 18px -10px rgba(0,0,0,.18);} 
  .responsive-table td{border:none!important;padding:.3rem .4rem;background:transparent!important;display:flex;flex-direction:column;gap:.14rem;font-size:.74rem;line-height:1.3;}
  .responsive-table td:before{content:attr(data-label);font-size:.62rem;font-weight:700;color:#047857;letter-spacing:.02em;}
  /* Slightly larger bullets for mobile */
  .bullets{font-size:.82rem;line-height:1.45;}
  .lead{font-size:.95rem;line-height:1.55;}
  .source{font-size:.6rem;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} .delay-1{animation-delay:.15s;} .delay-2{animation-delay:.3s;} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
