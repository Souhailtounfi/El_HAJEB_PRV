import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import enaImg from '../assets/ena.png';

/*
  Entraide Nationale & Tissu Associatif (FR / AR)
  - Mirrors style of ProtectionCivile / EauElectricite pages (glass cards)
  - Tables kept in simple data arrays; bilingual labels
  - Responsive + RTL aware
*/

export default function EntraideAssociatif(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl' : 'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const tableRows = [
    { fr:'DAR TALEB EL HAJEB', ar:'دار الطالب الحاجب', cap:64, a:32, b:41 },
    { fr:'DAR TALEBA EL HAJEB', ar:'دار الطالبة الحاجب', cap:72, a:56, b:46 },
    { fr:'DAR TALEB AIN TAOUJDATE', ar:'دار الطالب عين تاوجدات', cap:256, a:74, b:107 },
    { fr:'DAR TALEBA AIN TAOUJDATE', ar:'دار الطالبة عين تاوجدات', cap:40, a:65, b:66 },
    { fr:'DAR TALEB SEBAA AIOUNE', ar:'دار الطالب سبع عيون', cap:60, a:36, b:33 },
    { fr:'DAR TALEBA AGOURAI', ar:'دار الطالبة أكوراي', cap:28, a:28, b:28 },
    { fr:'DAR TALEB AGOURAI', ar:'دار الطالب أكوراي', cap:20, a:20, b:20 },
    { fr:'DAR TALEB AIT HARZELLAH', ar:'دار الطالب آيت حرز الله', cap:64, a:25, b:20 },
    { fr:'DAR TALEB AIT BOUBIDMANE', ar:'دار الطالب آيت بوبدمان', cap:20, a:30, b:27 },
    { fr:'DAR TALEBA AIT YAAZEM', ar:'دار الطالبة آيت يعزم', cap:64, a:56, b:64 },
    { fr:'DAR TALEB ET TALEBA JAHJOUH', ar:'دار الطالب و الطالبة جحجوح', cap:50, a:19, b:23 },
    { fr:'DAR TALEBA RAS IJERRI', ar:'دار الطالبة رأس إجيري', cap:40, a:18, b:18 },
  ];
  const totalCap = tableRows.reduce((s,r)=>s+r.cap,0); // 826
  const totalA   = tableRows.reduce((s,r)=>s+r.a,0);   // 459
  const totalB   = tableRows.reduce((s,r)=>s+r.b,0);   // 493

  const fr = {
    title:'ENTRAIDE NATIONALE ET TISSU ASSOCIATIF',
    caption:'Complexe socio-culturel à EL HAJEB',
    section2:'ETABLISSEMENTS DE PROTECTION SOCIALES',
    estab:'ETABLISSEMENT', cap:'CAPACITÉ D’ACCUEIL', benef:'NOMBRE DE BÉNÉFICIAIRES', y1:'2023 / 2024', y2:'2024 / 2025',
    totalLabel:'TOTAL : 12',
    section3:'CENTRES D’ÉDUCATION ET DE FORMATION',
    centresCount:15, centresBenef:1007,
    centresCols:['NOMBRE DE CENTRES','BÉNÉFICIAIRES','ACTIVITÉS'],
    activities:['Coupe et couture','Coiffure et esthétique','Informatique','Pâtisserie','Cuisine','Broderie rbatie'],
  };

  const ar = {
    title:'التعاون الوطني و النسيج الجمعوي',
    caption:'المركب السوسيو-ثقافي بالحاجب',
    section2:'مؤسسات الرعاية الاجتماعية',
    estab:'المؤسسة', cap:'الطاقة الاستيعابية', benef:'عدد المستفيدين', y1:'2023 / 2024', y2:'2025 / 2024',
    totalLabel:'المجموع : 12',
    section3:'مراكز التربية و التكوين',
    centresCount:15, centresBenef:1007,
    centresCols:['عدد المراكز','المستفيدون','الأنشطة'],
    activities:['الخياطة و القص','الحلاقة و التجميل','الإعلاميات','صناعة الحلويات','الطبخ','الطرز الرباطي'],
  };

  const t = isAr ? ar : fr;

  return (
    <div className="ena-wrap" dir={dir}>
      <ENAStyle dir={dir} />
      <header className="ena-hero">
        <h1 className="ena-title">{t.title}</h1>
      </header>
      <section className="ena-section">
        <figure className="ena-fig">
          {enaImg && <img src={enaImg} alt={t.caption} loading="lazy" />}
          <figcaption>{t.caption}</figcaption>
        </figure>
      </section>

      <section className="ena-section">
        <h2>{t.section2}</h2>
        <div className="table-scroller" role="region" aria-label={t.section2}>
          <table className="ena-table responsive-table">
            <thead>
              <tr>
                <th>{t.estab}</th>
                <th>{t.cap}</th>
                <th colSpan={2}>{t.benef}</th>
              </tr>
              <tr className="subhead">
                <th aria-hidden />
                <th aria-hidden />
                <th>{t.y1}</th>
                <th>{t.y2}</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map(r=> (
                <tr key={r.fr}>
                  <td data-label={t.estab}>{isAr? r.ar : r.fr}</td>
                  <td className="num" data-label={t.cap}>{r.cap}</td>
                  <td className="num" data-label={t.y1}>{r.a}</td>
                  <td className="num" data-label={t.y2}>{r.b}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>{t.totalLabel}</th>
                <th className="num">{totalCap}</th>
                <th className="num">{totalA}</th>
                <th className="num">{totalB}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="ena-section">
        <h2>{t.section3}</h2>
        <div className="edu-grid">
          <div className="edu-metric">
            <strong>{t.centresCols[0]}</strong>
            <span>{t.centresCount}</span>
          </div>
          <div className="edu-metric">
            <strong>{t.centresCols[1]}</strong>
            <span>{t.centresBenef}</span>
          </div>
          <div className="edu-acts">
            <strong>{t.centresCols[2]}</strong>
            <ul className="acts-list">
              {t.activities.map(a=> <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function ENAStyle({dir}){return <style>{`
.ena-wrap{--c1:#0f766e;--c2:#059669;--c3:#10b981;--rad:1.35rem;padding:clamp(1rem,2.2vw,2.5rem) clamp(1rem,3vw,3.2rem) 3.2rem;max-width:1400px;margin-inline:auto;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2937;}
.ena-title{margin:0;font-size:clamp(1.7rem,4vw,3rem);font-weight:800;letter-spacing:.03em;background:linear-gradient(110deg,#10b981,#047857 55%,#065f46);-webkit-background-clip:text;color:transparent;text-align:center;}
.ena-section{margin-top:2.6rem;background:rgba(255,255,255,.58);backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%);border:1px solid #10b98133;border-radius:var(--rad);padding:1.5rem 1.4rem 2.1rem;position:relative;box-shadow:0 18px 42px -18px rgba(0,0,0,.3);} 
.ena-section:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(150deg,rgba(255,255,255,.55),transparent 70%);pointer-events:none;mix-blend-mode:overlay;}
.ena-section h2{margin:0 0 1.25rem;font-size:clamp(1.15rem,2.3vw,1.95rem);font-weight:800;letter-spacing:.05em;color:#065f46;text-transform:uppercase;}
.ena-fig{margin:0 auto;max-width:780px;text-align:center;}
.ena-fig img{width:100%;border-radius:1.4rem;box-shadow:0 22px 46px -18px rgba(0,0,0,.42);} 
.ena-fig figcaption{margin-top:.7rem;font-size:.74rem;font-weight:600;opacity:.85;}
/* Table */
.table-scroller{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:.4rem;}
.ena-table{width:100%;border-collapse:collapse;font-size:.74rem;min-width:600px;}
.ena-table th,.ena-table td{border:1px solid #10b98133;padding:.55rem .6rem;text-align:${dir==='rtl'?'right':'left'};}
.ena-table thead th{background:linear-gradient(135deg,#10b981,#047857);color:#fff;font-weight:700;letter-spacing:.05em;white-space:nowrap;}
.ena-table thead tr.subhead th{background:#ecfdf5;color:#065f46;font-size:.7rem;font-weight:700;}
.ena-table tbody td{background:#ffffff;font-weight:600;}
.ena-table tbody tr:nth-child(even) td{background:#f0fdfa;}
.ena-table tfoot th{background:#065f46;color:#fff;font-weight:700;}
.ena-table .num{text-align:center;font-variant-numeric:tabular-nums;}
/* Education grid */
.edu-grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));}
.edu-metric{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #10b98133;border-radius:1.1rem;padding:1rem .9rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;box-shadow:0 10px 28px -14px rgba(0,0,0,.25);} 
.edu-metric strong{font-size:.74rem;letter-spacing:.07em;color:#065f46;text-transform:uppercase;}
.edu-metric span{font-size:1.6rem;font-weight:800;line-height:1;background:linear-gradient(120deg,#10b981,#047857);-webkit-background-clip:text;color:transparent;}
.edu-acts{grid-column:1/-1;background:#ffffffdd;border:1px solid #10b98133;border-radius:1.1rem;padding:1rem .95rem;box-shadow:0 10px 30px -16px rgba(0,0,0,.25);} 
.edu-acts strong{font-size:.78rem;display:block;margin-bottom:.6rem;letter-spacing:.07em;font-weight:800;color:#065f46;text-transform:uppercase;}
.acts-list{margin:0;padding-${dir==='rtl'?'right':'left'}:1.05rem;display:flex;flex-direction:column;gap:.6rem;font-size:.78rem;font-weight:600;}
.acts-list li{position:relative;line-height:1.35;}
.acts-list li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-.8rem;top:.42rem;width:.48rem;height:.48rem;border-radius:50%;background:linear-gradient(135deg,#10b981,#047857);} 
/* Mobile card table */
@media (max-width:760px){
  .ena-section{padding:1.2rem 1rem 1.55rem;}
  .ena-table{font-size:.7rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.5rem;border:1px solid #10b98133;background:#fff;border-radius:1rem;padding:.75rem .8rem;box-shadow:0 8px 22px -12px rgba(0,0,0,.18);margin-bottom:.85rem;}
  .responsive-table td{border:none!important;padding:.25rem .35rem;background:transparent!important;display:flex;flex-direction:column;gap:.15rem;}
  .responsive-table td:before{content:attr(data-label);font-size:.72rem;font-weight:700;color:#047857;}
  .ena-table tfoot{display:none;}
}
`}</style>;}
