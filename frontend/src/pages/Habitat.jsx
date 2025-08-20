import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import hbImg from '../assets/hb.png';

export default function Habitat(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl' : 'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title: 'Habitat',
    section1: 'CONDITIONS D’HABITATION DES MENAGES',
    sub1: 'REPARTITION DES MENAGES SELON L’ANCIENNETE DE LOGEMENT ET LE MILIEU',
    milieu: 'MILIEU',
    ageCols: ['MOINS DE 10 ANS','10 A 19 ANS','20 A 49 ANS','50 ANS ET PLUS'],
    ageRows: [
      { label:'URBAIN', values:['23,70','36,70','35,90','3,70'] },
      { label:'RURAL', values:['15,10','25','41,30','18,60'] },
      { label:'TOTAL', values:['19,80','31,40','38,40','10,40'] }
    ],
    sub2: 'STATUT D’OCCUPATION DES LOGEMENTS EN 2024',
    statCols: ['STATUT D’OCCUPATION','MILIEU','ENSEMBLE'],
    milieuCols:['Urbain','Rural'],
    statRows:[
      { label:'PROPRIETAIRE OU COPROPRIETAIRE', urb:'54,30', rur:'67,20', tot:'60,10' },
      { label:'ACCEDANT A LA PROPRIETE', urb:'1,1', rur:'0,9', tot:'1,0' },
      { label:'LOCATAIRE', urb:'29,50', rur:'2,70', tot:'17,40' },
      { label:'AUTRES', urb:'16,2', rur:'30,1', tot:'22,5' },
      { label:'TOTAL', urb:'100,0', rur:'100,0', tot:'100,0' }
    ],
    foot:'R.G.P.H 2024',
    p1:`En 2024, 60,1% des ménages de la province occupent leur logement en tant que propriétaires ou copropriétaires. Les ménages locataires quant à eux représentent 17,40%.`,
    p2:`Le taux d’occupation des logements dans la province est de l’ordre de 1,60 personnes pour 1 pièce d’habitation, en milieu urbain il est de 1,50 personnes par 1 pièce contre 1,70 en milieu rural.`,
  imgCaption: "Ville d'EL HAJEB",
  occupancy:{ label:'Taux d’occupation (pers / pièce)', total:'1,60', urb:'1,50', rur:'1,70' },
  ownershipLabel:'Propriétaires',
  tenantLabel:'Locataires'
  };

  const ar = {
    title: 'السكن',
    section1: 'أوضاع سكن الأسر',
    sub1: 'توزيع الأسر حسب قِدم السكن و الوسط',
    milieu: 'الوسط',
    ageCols: ['أقل من 10 سنوات','10 إلى 19 سنة','20 إلى 49 سنة','50 سنة فأكثر'],
    ageRows: [
      { label:'حضري', values:['23,70','36,70','35,90','3,70'] },
      { label:'قروي', values:['15,10','25','41,30','18,60'] },
      { label:'المجموع', values:['19,80','31,40','38,40','10,40'] }
    ],
    sub2: 'وضعية شغل المساكن سنة 2024',
    statCols: ['وضعية الشغل','الوسط','الإجمالي'],
    milieuCols:['حضري','قروي'],
    statRows:[
      { label:'مالك أو شريك في الملكية', urb:'54,30', rur:'67,20', tot:'60,10' },
      { label:'في طور التملك', urb:'1,1', rur:'0,9', tot:'1,0' },
      { label:'مكتري', urb:'29,50', rur:'2,70', tot:'17,40' },
      { label:'أخرى', urb:'16,2', rur:'30,1', tot:'22,5' },
      { label:'المجموع', urb:'100,0', rur:'100,0', tot:'100,0' }
    ],
    foot:'إحصاء 2024',
    p1:`سنة 2024 يشغل 60.1% من الأسر بالإقليم مساكنهم كمالكين أو شركاء في الملكية، بينما تمثل الأسر المكتَرية 17.40%.`,
    p2:`معدل الإشغال يبلغ حوالي 1.60 شخص لكل غرفة؛ في الوسط الحضري 1.50 شخص/غرفة مقابل 1.70 في الوسط القروي.`,
  imgCaption: 'مدينة الحاجب',
  occupancy:{ label:'معدل الإشغال (أشخاص / غرفة)', total:'1,60', urb:'1,50', rur:'1,70' },
  ownershipLabel:'المالكون',
  tenantLabel:'المستأجرون'
  };

  const t = isAr ? ar : fr;

  return (
    <div className="hb-shell" dir={dir}>
      <HBStyle dir={dir} />
      <div className="hb-inner">
        <header className="hb-header">
          <h1 className="hb-title">{t.title}</h1>
          <p className="hb-tag">{isAr? 'معطيات السكن و الإشغال':'Indicateurs de l’habitat & occupation'}</p>
        </header>

        <section className="hb-hero" aria-labelledby="hb-figure">
          <figure className="hb-fig" id="hb-figure">
            <div className="hb-img-frame"><img src={hbImg} alt={t.imgCaption} loading="lazy" /></div>
            <figcaption className="hb-cap">{t.imgCaption}</figcaption>
          </figure>
          <div className="hb-stats" role="list" aria-label={isAr? 'بطاقات المؤشرات':'Cartes indicateurs'}>
            <div className="hb-stat" role="listitem">
              <p className="st-label">{t.ownershipLabel}</p>
              <p className="st-val">{t.statRows[0].tot}<span className="unit">%</span></p>
            </div>
            <div className="hb-stat" role="listitem">
              <p className="st-label">{t.tenantLabel}</p>
              <p className="st-val">{t.statRows[2].tot}<span className="unit">%</span></p>
            </div>
            <div className="hb-stat split" role="listitem">
              <p className="st-label">{t.occupancy.label}</p>
              <div className="split-main">
                <span className="big">{t.occupancy.total}</span>
                <small>{isAr? 'إجمالي':'Global'}</small>
              </div>
              <div className="mini-pairs">
                <span>{t.occupancy.urb}<small>{t.milieuCols? t.milieuCols[0] : (isAr?'حضري':'Urbain')}</small></span>
                <span>{t.occupancy.rur}<small>{t.milieuCols? t.milieuCols[1] : (isAr?'قروي':'Rural')}</small></span>
              </div>
            </div>
          </div>
        </section>

        <main className="hb-main" id="conditions">
          <section className="hb-panel">
            <h2 className="hb-sec">{t.section1}</h2>
            <h3 className="hb-subsec">{t.sub1}</h3>
            <div className="table-wrap">
              <table className="hb-table" aria-label={t.sub1}>
                <thead>
                  <tr>
                    <th>{t.milieu}</th>
                    {t.ageCols.map(c=> <th key={c}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {t.ageRows.map(r=> (
                    <tr key={r.label}>
                      <th>{r.label}</th>
                      {r.values.map((v,i)=> <td key={i}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="hb-foot">{t.foot}</div>
            </div>
          </section>

          <section className="hb-panel">
            <h3 className="hb-subsec">{t.sub2}</h3>
            <div className="table-wrap">
              <table className="hb-table" aria-label={t.sub2}>
                <thead>
                  <tr>
                    <th>{t.statCols[0]}</th>
                    <th colSpan={2}>{t.statCols[1]}</th>
                    <th>{t.statCols[2]}</th>
                  </tr>
                  <tr className="subhead">
                    <th></th>
                    <th>{t.milieuCols[0]}</th>
                    <th>{t.milieuCols[1]}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {t.statRows.map(r=> (
                    <tr key={r.label}>
                      <th>{r.label}</th>
                      <td>{r.urb}</td>
                      <td>{r.rur}</td>
                      <td>{r.tot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="hb-foot">{t.foot}</div>
            </div>
          </section>

            <section className="hb-panel soft">
              <div className="hb-text">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
              </div>
            </section>
        </main>
      </div>
    </div>
  );
}

function HBStyle({dir}){return <style>{`
.hb-shell{--g1:#047857;--g2:#059669;--g3:#10b981;--panel:#ffffff;--border:#d1fae5;--text:#134e4a;--muted:#0f766e;--radius:1.4rem;--bg:#f6fefb;min-height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--text);background:
  radial-gradient(circle at 10% 18%,#d1fae580,transparent 62%),
  radial-gradient(circle at 88% 82%,#a7f3d04d,transparent 70%),
  linear-gradient(115deg,#ffffff,#f6fefb 55%,#eefcf6);}
.hb-inner{max-width:1400px;margin-inline:auto;padding:4.2rem clamp(1rem,3vw,3rem) 5rem;}
.hb-header{margin:0 0 2.4rem;text-align:center;padding:2.2rem 1rem 2rem;background:linear-gradient(90deg,#047857,#059669 38%,#10b981);border:1px solid #05966940;border-radius:2rem;position:relative;overflow:hidden;}
.hb-header:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 25%,rgba(255,255,255,.35),transparent 60%),radial-gradient(circle at 82% 68%,rgba(255,255,255,.25),transparent 65%);mix-blend-mode:overlay;}
.hb-title{margin:0;font-size:clamp(2.1rem,5vw,3.4rem);font-weight:800;line-height:1.05;letter-spacing:.02em;color:#ecfdf5;}
.hb-tag{margin:.9rem 0 0;font-size:clamp(.7rem,1.1vw,.95rem);letter-spacing:.15em;text-transform:uppercase;font-weight:600;color:#d1fae5;}

/* HERO */
.hb-hero{display:grid;gap:1.8rem;max-width:1100px;margin:0 auto 2.8rem;}
.hb-fig{margin:0;display:flex;flex-direction:column;align-items:center;}
.hb-img-frame{width:100%;max-width:880px;aspect-ratio:16/6.5;overflow:hidden;border-radius:1.6rem;position:relative;background:#f1f5f9;border:1px solid #e2e8f0;box-shadow:0 12px 32px -18px rgba(0,0,0,.15);}
.hb-img-frame img{width:100%;height:100%;object-fit:cover;display:block;}
.hb-cap{margin-top:.6rem;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:#0f766e;}
.hb-stats{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;}
.hb-stat{flex:1 1 160px;min-width:170px;max-width:230px;background:var(--panel);border:1px solid var(--border);border-radius:1rem;padding:.85rem .95rem 1rem;display:flex;flex-direction:column;gap:.4rem;box-shadow:0 6px 18px -10px rgba(0,0,0,.08);position:relative;}
.hb-stat:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(135deg,rgba(255,255,255,.65),transparent 60%);mix-blend-mode:overlay;}
.hb-stat .st-label{margin:0;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted);opacity:.95;}
.hb-stat .st-val{margin:0;font-size:clamp(1.3rem,3vw,2.2rem);font-weight:800;line-height:1;display:flex;align-items:flex-end;gap:.25rem;color:#065f46;}
.hb-stat .st-val .unit{font-size:.8rem;font-weight:700;opacity:.7;}
.hb-stat.split{padding-bottom:1.1rem;}
.hb-stat.split .split-main{display:flex;align-items:baseline;gap:.5rem;margin:.1rem 0 .4rem;font-weight:700;}
.hb-stat.split .split-main .big{font-size:clamp(1.1rem,2vw,1.55rem);color:#047857;font-weight:800;}
.hb-stat.split .split-main small{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#0f766e;}
.hb-stat.split .mini-pairs{display:flex;flex-direction:column;gap:.4rem;font-size:.85rem;font-weight:600;}
.hb-stat.split .mini-pairs span{display:flex;align-items:baseline;gap:.45rem;}
.hb-stat.split .mini-pairs small{font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:#0f766e;opacity:.8;}

/* PANELS */
.hb-main{display:grid;gap:2rem;}
.hb-panel{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);padding:1.6rem 1.4rem 1.9rem;box-shadow:0 10px 28px -16px rgba(0,0,0,.12);position:relative;overflow:hidden;}
.hb-panel.soft{background:linear-gradient(145deg,#ffffff,#f0fdfa);}
.hb-panel:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.7),transparent 65%);pointer-events:none;mix-blend-mode:overlay;}
.hb-sec{margin:0 0 1.1rem;font-size:clamp(1.1rem,2.2vw,1.7rem);font-weight:800;letter-spacing:.03em;color:#065f46;}
.hb-subsec{margin:0 0 1rem;font-size:clamp(.9rem,1.3vw,1.1rem);font-weight:700;color:#047857;position:relative;padding-${dir==='rtl'?'right':'left'}:1rem;}
.hb-subsec:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:0;top:.35rem;width:.5rem;height:.5rem;border-radius:6px;background:linear-gradient(135deg,#047857,#10b981);box-shadow:0 0 0 3px #ffffff;}
.hb-text{display:flex;flex-direction:column;gap:1rem;font-size:.97rem;line-height:1.7;font-weight:500;color:#155e56;}
.hb-text p{margin:0;}

/* TABLES */
.table-wrap{overflow-x:auto;margin-top:.4rem;}
.hb-table{width:100%;border-collapse:separate;border-spacing:0;min-width:560px;font-size:.8rem;table-layout:fixed;}
.hb-table th,.hb-table td{padding:.55rem .6rem;border:1px solid #cce9df;text-align:center;}
.hb-table thead th{background:linear-gradient(90deg,#047857,#059669 40%,#10b981);color:#ecfdf5;font-weight:700;letter-spacing:.04em;}
.hb-table thead tr.subhead th{background:#0f766e;}
.hb-table tbody th{background:#d1fae5;font-weight:700;color:#064e3b;}
.hb-table tbody tr:nth-child(even) td{background:#f0fdfa;}
.hb-table tbody tr:nth-child(odd) td{background:#ffffff;}
.hb-table tbody tr:hover td,.hb-table tbody tr:hover th{background:#ccfbf1;}
.hb-table.age tbody tr:last-child th{background:#a7f3d0;}
.hb-foot{text-align:center;font-size:.72rem;font-weight:600;margin-top:.6rem;letter-spacing:.05em;text-transform:uppercase;color:#0f766e;}

@media (max-width:900px){
  .hb-inner{padding:4.2rem 1rem 5rem;}
  .hb-img-frame{aspect-ratio:16/8;}
  .hb-stats{gap:.8rem;}
  .hb-stat{min-width:140px;}
  .hb-table{font-size:.76rem;min-width:520px;}
}
@media (max-width:620px){
  .hb-table{font-size:.72rem;min-width:480px;}
  .hb-stat .st-val{font-size:clamp(1.2rem,5vw,1.8rem);}
  .hb-panel{padding:1.3rem 1.05rem 1.55rem;}
}
@media (prefers-color-scheme: dark){
  .hb-shell{color:#e2f7f3;background:linear-gradient(120deg,#05332f,#083a35);} 
  .hb-header{background:linear-gradient(90deg,#065f46,#0d9488);border-color:#0d948830;}
  .hb-title{color:#ecfdf5;}
  .hb-tag{color:#a7f3d0;}
  .hb-panel{background:#0f3732;border-color:#115e54;box-shadow:0 12px 32px -18px #021412;}
  .hb-panel.soft{background:linear-gradient(140deg,#0f3732,#0d4a43);} 
  .hb-sec{color:#a7f3d0;}
  .hb-subsec{color:#6ee7b7;}
  .hb-text{color:#e0f9f4;}
  .hb-table th,.hb-table td{border-color:#115e54;}
  .hb-table thead th{background:linear-gradient(90deg,#065f46,#0d9488 50%,#10b981);color:#ecfdf5;}
  .hb-table thead tr.subhead th{background:#047857;}
  .hb-table tbody th{background:#065f46;color:#ecfdf5;}
  .hb-table tbody tr:nth-child(even) td{background:#0d3f39;}
  .hb-table tbody tr:nth-child(odd) td{background:#124941;}
  .hb-table tbody tr:hover td,.hb-table tbody tr:hover th{background:#047857;}
  .hb-table.age tbody tr:last-child th{background:#0d7d62;color:#ecfdf5;}
  .hb-foot{color:#6ee7b7;}
  .hb-stat{background:#0f3b35;border-color:#0d5e55;box-shadow:0 8px 18px -10px rgba(0,0,0,.55);} 
  .hb-stat .st-label{color:#6ee7b7;}
  .hb-stat .st-val{color:#ecfdf5;}
  .hb-stat.split .mini-pairs small{color:#6ee7b7;}
}
`}</style>;}
