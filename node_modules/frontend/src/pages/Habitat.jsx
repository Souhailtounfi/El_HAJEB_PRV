
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import hbImg from '../assets/hb.png';

export default function Habitat() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl' : 'ltr';
  useEffect(() => { document.documentElement.dir = dir; }, [dir]);

  const fr = {
    title: 'Habitat',
    tag: 'Indicateurs 2024',
    intro: `Indicateurs synthétiques sur l’habitat, l’occupation et la propriété des logements dans la province.`,
    stats: [
      { k: 'Propriétaires', v: '60,1%' },
      { k: 'Locataires', v: '17,4%' },
      { k: 'Taux occupation', v: '1,60 pers/pièce' }
    ],
    section1: 'CONDITIONS D’HABITATION DES MENAGES',
    sub1: 'Répartition des ménages selon l’ancienneté de logement et le milieu',
    ageHead: ['Milieu', 'Moins de 10 ans', '10 à 19 ans', '20 à 49 ans', '50 ans et plus'],
    ageRows: [
      ['Urbain', '23,70', '36,70', '35,90', '3,70'],
      ['Rural', '15,10', '25', '41,30', '18,60'],
      ['Total', '19,80', '31,40', '38,40', '10,40']
    ],
    section2: 'Statut d’occupation des logements en 2024',
    statHead: ['Statut', 'Urbain', 'Rural', 'Ensemble'],
    statRows: [
      ['Propriétaire ou copropriétaire', '54,30', '67,20', '60,10'],
      ['Accédant à la propriété', '1,1', '0,9', '1,0'],
      ['Locataire', '29,50', '2,70', '17,40'],
      ['Autres', '16,2', '30,1', '22,5'],
      ['Total', '100,0', '100,0', '100,0']
    ],
    foot: 'R.G.P.H 2024',
    p1: `En 2024, 60,1% des ménages de la province occupent leur logement en tant que propriétaires ou copropriétaires. Les ménages locataires quant à eux représentent 17,40%.`,
    p2: `Le taux d’occupation des logements dans la province est de l’ordre de 1,60 personnes pour 1 pièce d’habitation, en milieu urbain il est de 1,50 personnes par 1 pièce contre 1,70 en milieu rural.`
  };
  const ar = {
    title: 'السكن',
    tag: 'مؤشرات 2024',
    intro: 'مؤشرات موجزة حول السكن و الإشغال و الملكية في الإقليم.',
    stats: [
      { k: 'المالكون', v: '60,1%' },
      { k: 'المستأجرون', v: '17,4%' },
      { k: 'معدل الإشغال', v: '1,60 شخص/غرفة' }
    ],
    section1: 'أوضاع سكن الأسر',
    sub1: 'توزيع الأسر حسب قِدم السكن و الوسط',
    ageHead: ['الوسط', 'أقل من 10 سنوات', '10 إلى 19 سنة', '20 إلى 49 سنة', '50 سنة فأكثر'],
    ageRows: [
      ['حضري', '23,70', '36,70', '35,90', '3,70'],
      ['قروي', '15,10', '25', '41,30', '18,60'],
      ['المجموع', '19,80', '31,40', '38,40', '10,40']
    ],
    section2: 'وضعية شغل المساكن سنة 2024',
    statHead: ['الوضعية', 'حضري', 'قروي', 'الإجمالي'],
    statRows: [
      ['مالك أو شريك في الملكية', '54,30', '67,20', '60,10'],
      ['في طور التملك', '1,1', '0,9', '1,0'],
      ['مكتري', '29,50', '2,70', '17,40'],
      ['أخرى', '16,2', '30,1', '22,5'],
      ['المجموع', '100,0', '100,0', '100,0']
    ],
    foot: 'إحصاء 2024',
    p1: `سنة 2024 يشغل 60.1% من الأسر بالإقليم مساكنهم كمالكين أو شركاء في الملكية، بينما تمثل الأسر المكتَرية 17.40%.`,
    p2: `معدل الإشغال يبلغ حوالي 1.60 شخص لكل غرفة؛ في الوسط الحضري 1.50 شخص/غرفة مقابل 1.70 في الوسط القروي.`
  };
  const t = isAr ? ar : fr;

  return (
    <div className="fp-simple" dir={dir}>
      <FPStyle dir={dir} />
      <header className="fp-head" style={{textAlign:'center'}}>
        <div className="fp-header-line" style={{justifyContent:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h1 style={{fontSize:'clamp(2.7rem,7vw,4.8rem)', fontWeight:900, margin:'0 0 .5rem', letterSpacing:'.04em', background:'linear-gradient(90deg,#0d6e61,#0b7285)', WebkitBackgroundClip:'text', color:'transparent', textAlign:'center'}}>{t.title}</h1>
          <span className="fp-tag">{t.tag}</span>
        </div>
        <p className="fp-intro">{t.intro}</p>
        <div className="fp-stats" role="list" style={{justifyContent:'center',display:'flex',gap:'1.2rem',margin:'1.2rem 0'}}>
          {t.stats.map(s => (
            <div key={s.k} className="fp-stat" role="listitem" style={{margin:'0'}}>
              <span className="st-val">{s.v}</span>
              <span className="st-key">{s.k}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="fp-main">
        <div className="fp-box" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#f8fafc',flexDirection:'column',padding:'2.5rem 1.2rem'}}>
          <div style={{width:'100%',maxWidth:'900px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{background:'#f1f5f9',borderRadius:'2.2rem',overflow:'hidden',boxShadow:'0 8px 32px -12px rgba(0,0,0,.10)',marginBottom:'.7rem',width:'100%',maxWidth:'900px'}}>
              <img src={hbImg} alt={isAr ? 'مدينة الحاجب' : "Ville d'EL HAJEB"} style={{width:'100%',height:'auto',objectFit:'cover',borderRadius:'2.2rem',display:'block',aspectRatio:'16/5',minHeight:260,maxHeight:480,margin:'0 auto'}} loading="lazy" />
            </div>
            <div style={{fontSize:'1.15rem',color:'#1976d2',fontWeight:700,marginTop:'.5rem',textAlign:'center'}}>{isAr ? 'مدينة الحاجب' : "Ville d'EL HAJEB"}</div>
          </div>
        </div>


        <section className="fp-box">
          <h2 className="fp-h2">{t.section1}</h2>
          <h3 className="fp-h3">{t.sub1}</h3>
          <div className="fp-table-wrap">
            <table className="fp-table">
              <thead>
                <tr>{t.ageHead.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {t.ageRows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => j === 0
                      ? <th key={j} scope="row">{c}</th>
                      : <td key={j} data-label={t.ageHead[j]}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="fp-box">
          <h2 className="fp-h2">{t.section2}</h2>
          <div className="fp-table-wrap">
            <table className="fp-table">
              <thead>
                <tr>{t.statHead.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {t.statRows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => j === 0
                      ? <th key={j} scope="row">{c}</th>
                      : <td key={j} data-label={t.statHead[j]}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="fp-box">
          <div className="fp-bullets" style={{marginBottom:0}}>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
        </section>

        <footer className="fp-foot">{t.foot}</footer>
      </main>
    </div>
  );
}

function FPStyle({dir}) {
  return <style>{`
  .fp-simple{--accent:#0d6e61;--accent2:#0b7285;--bg:#f6f9fa;--radius:1.25rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#12303a;
    background:#ffffff;min-height:100vh;padding:4.2rem clamp(1rem,3vw,3rem) 4rem;max-width:1400px;margin:0 auto;}
  .fp-head{background:#fff;border:1px solid #d9e3e7;border-radius:1.8rem;padding:1.9rem 1.6rem 2.1rem;box-shadow:0 4px 14px -6px rgba(0,0,0,.08);margin-bottom:2rem;}
  .fp-header-line{display:flex;flex-wrap:wrap;gap:.8rem;align-items:baseline;}
  .fp-head h1{margin:0;font-size:clamp(1.9rem,4.2vw,2.9rem);font-weight:800;line-height:1.05;
    background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;color:transparent;}
  .fp-tag{font-size:.73rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--accent2);background:#e6f3f4;
    padding:.35rem .65rem;border-radius:2rem;}
  .fp-intro{margin:.9rem 0 1.4rem;font-size:1.02rem;line-height:1.55;font-weight:500;color:#163c47;}
  .fp-stats{display:flex;flex-wrap:wrap;gap:.9rem;}
  .fp-stat{flex:1 1 140px;min-width:120px;max-width:170px;background:#0d6e61;
    background:linear-gradient(145deg,#0d6e61,#0b7285);color:#fff;border-radius:1rem;padding:.85rem .9rem;display:flex;flex-direction:column;gap:.3rem;}
  .st-val{font-size:1.25rem;font-weight:700;line-height:1;}
  .st-key{font-size:.6rem;font-weight:600;letter-spacing:.08em;opacity:.85;text-transform:uppercase;}
  .fp-main{display:grid;gap:2rem;}
  .fp-box,.fp-panel{background:#fff;border:1px solid #d9e3e7;border-radius:var(--radius);padding:1.4rem 1.2rem 1.8rem;box-shadow:0 4px 14px -6px rgba(0,0,0,.05);}
  .fp-h2{margin:0 0 1rem;font-size:1.25rem;font-weight:700;color:var(--accent);}
  .fp-bullets{margin:0;padding-${dir==='rtl'?'right':'left'}:1.1rem;display:flex;flex-direction:column;gap:.55rem;font-size:.95rem;line-height:1.5;font-weight:500;color:#1d4a55;}
  .fp-bullets li::marker{color:var(--accent2);}
  .fp-h3{margin:0 0 .9rem;font-size:1.05rem;font-weight:700;color:var(--accent);}
  .fp-table-wrap{overflow-x:auto;border:1px solid #dbe3e7;border-radius:1rem;background:#fdfefe;}
  .fp-table{width:100%;border-collapse:collapse;min-width:640px;font-size:.9rem;}
  .fp-table th,.fp-table td{border:1px solid #e1e8ec;padding:.55rem .7rem;text-align:center;}
  .fp-table thead th{background:var(--accent);color:#fff;font-weight:600;font-size:.75rem;letter-spacing:.05em;}
  .fp-table tbody th{background:#eef7f7;font-weight:600;text-align:start;}
  .fp-table tbody tr:nth-child(even) td{background:#f6fbfb;}
  .fp-table tbody tr:hover td,.fp-table tbody tr:hover th{background:#e0f7f4;}
  .fp-foot{text-align:center;font-size:.62rem;font-weight:600;letter-spacing:.04em;color:var(--accent2);background:#eef7f7;padding:.6rem 1rem;border:1px solid #d9e3e7;border-radius:1rem;}
  /* Responsive table */
  @media (max-width:640px){
    .fp-table{min-width:0;border:0;}
    .fp-table thead{display:none;}
    .fp-table tbody tr{display:grid;margin-bottom:.9rem;border:1px solid #d9e3e7;border-radius:.9rem;padding:.6rem .75rem;background:#fff;}
    .fp-table tbody th,.fp-table tbody td{border:0 !important;padding:.35rem 0;text-align:start;}
    .fp-table tbody td{display:flex;gap:.6rem;font-size:.85rem;}
    .fp-table tbody td::before{content:attr(data-label);flex:0 0 48%;font-weight:600;color:var(--accent);}
  }
  @media (max-width:900px){
    .fp-simple{padding:4.2rem 1rem 4rem;}
    .fp-head{padding:1.6rem 1.2rem 1.9rem;}
  }
  `}</style>;
}
