import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function FormationProfessionnelle(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'Formation Professionnelle',
    tag:'Synthèse 2024 / 2025',
    intro:'Panorama synthétique des filières et effectifs des principaux établissements provinciaux.',
    bullets:[
      'Filières techniques, industrielles et de services',
      "Orientation insertion & adéquation territoriale",
      "Progression de la capacité d'accueil",
      'Féminisation différenciée selon les filières'
    ],
    istapTitle:"Institut Spécialisé de Technologie Appliquée – El Hajeb",
    istapHead:['Branche','1ère Année','2ème Année','Stage / S5','Total'],
    istapRows:[
      ['Technicien spécialisé gestion des entreprises','82','37','45','164'],
      ['Technicien assistant administratif','64','17','31','112'],
      ["Technicien réparation engin à moteur (option automobile)",'22','19','-','41'],
      ['Réparateur de véhicule automobiles','59','34','-','93'],
      ["Electricité d’entretien industriel",'53','18','-','71'],
      ["Electricité de bâtiment",'73','-','-','73'],
      ['Menuiserie aluminium','46','-','-','46'],
      ['Ouvrier spé. coupe & couture','19','-','-','19'],
      ['Total général','415','125','76','616']
    ],
    itaTitle:"Institut Technique Agricole de Bouderbala (2024 / 2025)",
    itaHead:['Niveau','Filière','1ère Année','2ème Année','Total'],
    itaRows:[
      ['Qualification','Polyculture – Élevage','31 dont 4 filles','=','31'],
      ['Technicien','Production & valorisation des produits arboricoles','32 dont 9 filles','dont 5 filles','59'],
      ['Total','','63 dont 13 filles','dont 5 filles','90 dont 18 filles']
    ],
    foot:'Source: Délégation Provinciale de la Formation Professionnelle (2024/2025)',
    stats:[
      {k:'Filières actives', v:'10'},
      {k:'Effectif total', v:'616'},
      {k:'Taux stage (S5)', v:'76'},
      {k:'Part F. (sélect.)', v:'~25%'}
    ]
  };
  const ar = {
    title:'التكوين المهني',
    tag:'ملخص 2025 / 2024',
    intro:'عرض موجز للفروع و الأعداد في أبرز مؤسسات الإقليم.',
    bullets:[
      'شعب تقنية وصناعية وخدماتية',
      'تركيز على الإدماج وملاءمة سوق الشغل',
      'ارتفاع القدرة الاستيعابية',
      'تباين نسبة الإناث حسب الشعب'
    ],
    istapTitle:'المعهد المتخصص للتكنولوجيا التطبيقية – الحاجب',
    istapHead:['الشعبة','السنة 1','السنة 2','تدريب / S5','المجموع'],
    istapRows:[
      ['تقني متخصص تدبير المقاولات','82','37','45','164'],
      ['تقني مساعد إداري','64','17','31','112'],
      ['تقني إصلاح محرك (خيار سيارات)','22','19','-','41'],
      ['مصلح مركبات السيارات','59','34','-','93'],
      ['كهرباء الصيانة الصناعية','53','18','-','71'],
      ['كهرباء البناء','73','-','-','73'],
      ['نجارة الألمنيوم','46','-','-','46'],
      ['عامل متخصص قص و خياطة','19','-','-','19'],
      ['المجموع العام','415','125','76','616']
    ],
    itaTitle:'المعهد التقني الفلاحي بودربالة (2025/2024)',
    itaHead:['المستوى','الشعبة','السنة 1','السنة 2','المجموع'],
    itaRows:[
      ['تأهيل','زراعة متعددة – تربية الماشية','31 منها 4 فتيات','=','31'],
      ['تقني','إنتاج وتثمين المنتجات الشجرية','32 منها 9 فتيات','منها 5 فتيات','59'],
      ['المجموع','','63 منها 13 فتاة','منها 5 فتيات','90 منها 18 فتاة']
    ],
    foot:'المصدر: المندوبية الإقليمية للتكوين المهني (2025/2024)',
    stats:[
      {k:'الشعب النشطة', v:'10'},
      {k:'الإجمالي', v:'616'},
      {k:'متدربو S5', v:'76'},
      {k:'نسبة إناث تقريبية', v:'~25%'}
    ]
  };
  const t = isAr ? ar : fr;

  return (
    <div className="fp-simple" dir={dir}>
      <FPStyle dir={dir}/>
      <header className="fp-head">
        <div className="fp-header-line">
          <h1>{t.title}</h1>
          <span className="fp-tag">{t.tag}</span>
        </div>
        <p className="fp-intro">{t.intro}</p>
        <div className="fp-stats" role="list">
          {t.stats.map(s=>(
            <div key={s.k} className="fp-stat" role="listitem">
              <span className="st-val">{s.v}</span>
              <span className="st-key">{s.k}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="fp-main">
        <section className="fp-box">
          <h2 className="fp-h2">{isAr?'النقاط الرئيسية':'Points clés'}</h2>
          <ul className="fp-bullets">
            {t.bullets.map(b=> <li key={b}>{b}</li>)}
          </ul>
        </section>

        <DataPanel title={t.istapTitle} head={t.istapHead} rows={t.istapRows}/>
        <DataPanel title={t.itaTitle} head={t.itaHead} rows={t.itaRows}/>

        <footer className="fp-foot">{t.foot}</footer>
      </main>
    </div>
  );
}

function DataPanel({title, head, rows}){
  return (
    <section className="fp-panel">
      <h3 className="fp-h3">{title}</h3>
      <div className="fp-table-wrap">
        <table className="fp-table">
          <thead>
          <tr>{head.map(h=> <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              {r.map((c,j)=> j===0
                ? <th key={j} scope="row">{c}</th>
                : <td key={j} data-label={head[j]}>{c}</td>)}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FPStyle({dir}){return <style>{`
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
`}</style>;}
