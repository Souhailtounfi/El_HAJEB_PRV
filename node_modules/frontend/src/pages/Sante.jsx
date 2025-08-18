import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Sante(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'La Santé',
    tag:'Réseau & Indicateurs 2024',
    intro:'Résumé du réseau de soins primaires (public & privé) et principaux ratios de desserte.',
    bullets:[
      'Couverture mixte urbain / rural en ESSP',
      "Offre privée limitée (spécialités manquantes)",
      'Amélioration nécessaire des ratios lit & médecin',
      'Ressources humaines pluri-catégorielles mobilisées'
    ],
    cards:[
      {k:'Hab / lit', v:'6243'},
      {k:'Hab / médecin', v:'4682'},
      {k:'Hab / infirmier', v:'1110'},
      {k:'Total RH', v:'403'}
    ],
    resspTitle:'Réseau des ESSP',
    resspHead:["","CSU1","CSU2","Total Urbain","DR","CSR1","CSR2","Total Rural","Total"],
    resspRows:[['Nombre','3','3','6','7 (dont 1 fermé)','12','1','20','26']],
    listTitle:'Structures (extrait)',
    listHead:['Circonscription','Milieu','Nom F/S','Type','Commune / Arr.'],
    listRows:[
      ['El Hajeb','URBAIN','El hajeb 2','CSU 1','El Hajeb'],
      ['Ain Taoujdate','URBAIN','Ain Taoujdate','CSU 2','Ain Taoujdate'],
      ['Sbaayoune Aouaïl','URBAIN','Sbaayoune Aouaïl','CSU 2','Sbaayoune Aouaïl'],
      ['Bni Mtir','RURAL','Abdalkrim el khattabi','CSR1','Ait Naaman'],
      ['Ait Boulalouze','RURAL','Ait Boulalouze (fermé)','DR','Ait Boulalouze'],
      ['Laasir','RURAL','Laasir','CSR1','Laasir'],
      ['Ait Boudibamae','RURAL','Bouderbala','CSR1','Ait Boudibamae']
    ],
    privTitle:'Infrastructure sanitaire privée',
    privHead:['Etablissement','Nombre'],
    privRows:[
      ['Cabinet médecine générale','38'],
      ['Cabinet pédiatrique','1'],
      ['Chirurgie dentaire','13'],
      ['Pharmacie','70'],
      ["Laboratoire analyses médicales",'2'],
      ['Kinésithérapie','8'],
      ['Orthophoniste','1'],
      ['Centre hémodialyse','1']
    ],
    notePriv:"Faible contribution de l'offre privée: absence de radiologie, cliniques privées et plusieurs spécialités.",
    indicTitle:'Indicateurs de desserte (2023)',
    indicHead:['Indicateurs','Provincial','Régional','National'],
    indicRows:[
      ['Habitant / lit hospitalier','6243','2059','1364'],
      ['Habitant / ESSP','10805','10833','12300'],
      ['Hab / médecin','4682','2247','2588'],
      ['Hab / infirmier','1110','903','969'],
      ['Naissances attendues / SF','77','88','106']
    ],
    rhTitle:'Ressources humaines',
    rhHead:['Personnel Médical','Med Spécialiste','Med Généraliste','Chirurgien-dentiste','Pharmacien','Infirmier (toutes cat.)','Admin / Tech / Serv','Total'],
    rhRows:[['Effectifs','17','37','3','3','253','90','403']],
    foot:'Source: Délégation Provinciale de la Santé (2024)'
  };

  const ar = {
    title:'الصحة',
    tag:'الشبكة و المؤشرات 2024',
    intro:'عرض موجز لشبكة الرعاية الصحية الأولية (العمومية والخاصة) وأهم نسب التغطية.',
    bullets:[
      'تغطية حضرية وقروية للمؤسسات',
      'عرض خاص محدود (تخصصات غير متوفرة)',
      'حاجة لتحسين نسب السرير والطبيب',
      'تعبئة موارد بشرية متعددة الأصناف'
    ],
    cards:[
      {k:'ساكن / سرير', v:'6243'},
      {k:'ساكن / طبيب', v:'4682'},
      {k:'ساكن / ممرض', v:'1110'},
      {k:'إجمالي الموارد', v:'403'}
    ],
    resspTitle:'شبكة مؤسسات الرعاية الأولية',
    resspHead:['','م.ح 1','م.ح 2','مجموع حضري','مندوبيات','م.ق 1','م.ق 2','مجموع قروي','الإجمالي'],
    resspRows:[['عدد','3','3','6','7 (1 مغلق)','12','1','20','26']],
    listTitle:'بنيات (مقتطف)',
    listHead:['الدائرة','الوسط','اسم المؤسسة','النوع','الجماعة'],
    listRows:[
      ['الحاجب','حضري','الحاجب 2','م.ص.ح 1','الحاجب'],
      ['عين تاوجدات','حضري','عين تاوجدات','م.ص.ح 2','عين تاوجدات'],
      ['سبع عيون أوعيل','حضري','سبع عيون أوعيل','م.ص.ح 2','سبع عيون أوعيل'],
      ['بني مطير','قروي','عبد الكريم الخطابي','م.ص.ر 1','آيت نعمان'],
      ['آيت بواللوز','قروي','آيت بواللوز (مغلق)','مصلحة','آيت بواللوز'],
      ['لعصير','قروي','لعصير','م.ص.ر 1','لعصير'],
      ['آيت بوديبام','قروي','بودربالة','م.ص.ر 1','آيت بوديبام']
    ],
    privTitle:'البنية الصحية الخاصة',
    privHead:['المؤسسة','العدد'],
    privRows:[
      ['عيادة طب عام','38'],
      ['عيادة أطفال','1'],
      ['جراحة أسنان','13'],
      ['صيدلية','70'],
      ['مختبر تحاليل طبية','2'],
      ['ترويض حركي','8'],
      ['أخصائي نطق','1'],
      ['مركز تصفية الدم','1']
    ],
    notePriv:'عرض خاص محدود: غياب الأشعة والعيادات الخاصة وعدة تخصصات.',
    indicTitle:'مؤشرات التغطية (2023)',
    indicHead:['المؤشر','إقليمي','جهوي','وطني'],
    indicRows:[
      ['ساكن لكل سرير','6243','2059','1364'],
      ['ساكن لكل مؤسسة','10805','10833','12300'],
      ['ساكن لكل طبيب','4682','2247','2588'],
      ['ساكن لكل ممرض','1110','903','969'],
      ['ولادات / قابلة','77','88','106']
    ],
    rhTitle:'الموارد البشرية',
    rhHead:['الموارد الطبية','اختصاصيون','أطباء عامون','جراح أسنان','صيدلي','تمريض','إداري / تقني / خدمات','المجموع'],
    rhRows:[['الأعداد','17','37','3','3','253','90','403']],
    foot:'المصدر: المندوبية الإقليمية للصحة (2024)'
  };

  const t = isAr ? ar : fr;

  return (
    <div className="st-simple" dir={dir}>
      <STStyle dir={dir}/>
      <header className="st-head">
        <div className="st-line">
          <h1>{t.title}</h1>
          <span className="st-tag">{t.tag}</span>
        </div>
        <p className="st-intro">{t.intro}</p>
        <div className="st-cards" role="list">
          {t.cards.map(c=>(
            <div key={c.k} className="st-card" role="listitem">
              <span className="c-val">{c.v}</span>
              <span className="c-key">{c.k}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="st-main">
        <section className="st-box">
          <h2 className="st-h2">{isAr?'محاور رئيسية':'Axes clés'}</h2>
          <ul className="st-bullets">
            {t.bullets.map(b=> <li key={b}>{b}</li>)}
          </ul>
        </section>

        <DataPanel title={t.resspTitle} head={t.resspHead} rows={t.resspRows}/>
        <DataPanel title={t.listTitle} head={t.listHead} rows={t.listRows}/>
        <DataPanel title={t.privTitle} head={t.privHead} rows={t.privRows} note={t.notePriv}/>
        <DataPanel title={t.indicTitle} head={t.indicHead} rows={t.indicRows}/>
        <DataPanel title={t.rhTitle} head={t.rhHead} rows={t.rhRows}/>

        <footer className="st-foot">{t.foot}</footer>
      </main>
    </div>
  );
}

function DataPanel({title, head, rows, note}){
  return (
    <section className="st-panel">
      <h3 className="st-h3">{title}</h3>
      <div className="st-table-wrap">
        <table className="st-table">
          <thead><tr>{head.map(h=> <th key={h}>{h}</th>)}</tr></thead>
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
      {note && <p className="st-note">{note}</p>}
    </section>
  );
}

function STStyle({dir}){return <style>{`
.st-simple{--accent:#2563eb;--accent2:#0d9488;--bg:#f7fafc;--radius:1.25rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#123043;
  background:#ffffff;min-height:100vh;padding:4.2rem clamp(1rem,3vw,3rem) 4rem;max-width:1500px;margin:0 auto;}
.st-head{background:#fff;border:1px solid #dce5ea;border-radius:1.8rem;padding:1.9rem 1.6rem 2.2rem;box-shadow:0 4px 14px -6px rgba(0,0,0,.07);margin-bottom:2rem;}
.st-line{display:flex;flex-wrap:wrap;gap:.85rem;align-items:baseline;}
.st-head h1{margin:0;font-size:clamp(1.9rem,4.2vw,3rem);font-weight:800;line-height:1.05;background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;color:transparent;}
.st-tag{font-size:.72rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--accent2);background:#e6faf7;padding:.35rem .6rem;border-radius:2rem;}
.st-intro{margin:.85rem 0 1.35rem;font-size:1.03rem;line-height:1.55;font-weight:500;color:#163a45;}
.st-cards{display:flex;flex-wrap:wrap;gap:.85rem;}
.st-card{flex:1 1 140px;min-width:120px;max-width:180px;background:linear-gradient(145deg,var(--accent),var(--accent2));color:#fff;border-radius:1rem;
  padding:.8rem .85rem .9rem;display:flex;flex-direction:column;gap:.35rem;}
.c-val{font-size:1.3rem;font-weight:700;}
.c-key{font-size:.58rem;font-weight:600;letter-spacing:.09em;opacity:.9;text-transform:uppercase;}
.st-main{display:grid;gap:2rem;}
.st-box,.st-panel{background:#fff;border:1px solid #dce5ea;border-radius:var(--radius);padding:1.4rem 1.2rem 1.8rem;box-shadow:0 4px 14px -6px rgba(0,0,0,.05);}
.st-h2{margin:0 0 1rem;font-size:1.25rem;font-weight:700;color:var(--accent2);}
.st-bullets{margin:0;padding-${dir==='rtl'?'right':'left'}:1.1rem;display:flex;flex-direction:column;gap:.55rem;font-size:.95rem;line-height:1.5;font-weight:500;color:#1d4a55;}
.st-bullets li::marker{color:var(--accent);}
.st-h3{margin:0 0 .9rem;font-size:1.05rem;font-weight:700;color:var(--accent);}
.st-table-wrap{overflow-x:auto;border:1px solid #dce5ea;border-radius:1rem;background:#fdfefe;}
.st-table{width:100%;border-collapse:collapse;min-width:680px;font-size:.9rem;}
.st-table th,.st-table td{border:1px solid #e1e8ec;padding:.55rem .7rem;text-align:center;}
.st-table thead th{background:var(--accent);color:#fff;font-weight:600;font-size:.75rem;letter-spacing:.05em;}
.st-table tbody th{background:#eef5ff;font-weight:600;text-align:start;color:#1e3a8a;}
.st-table tbody tr:nth-child(even) td{background:#f6f9ff;}
.st-table tbody tr:hover td,.st-table tbody tr:hover th{background:#e0f7f4;}
.st-note{margin:.7rem 0 0;font-size:.75rem;line-height:1.45;font-weight:500;color:#0d4e5a;}
.st-foot{text-align:center;font-size:.62rem;font-weight:600;letter-spacing:.04em;color:var(--accent2);background:#e6faf7;padding:.6rem 1rem;border:1px solid #dce5ea;border-radius:1rem;margin-top:.3rem;}
/* Responsive tables */
@media (max-width:640px){
  .st-table{min-width:0;border:0;}
  .st-table thead{display:none;}
  .st-table tbody tr{display:grid;margin-bottom:.9rem;border:1px solid #dce5ea;border-radius:.9rem;padding:.6rem .75rem;background:#fff;}
  .st-table tbody th,.st-table tbody td{border:0 !important;padding:.35rem 0;text-align:start;}
  .st-table tbody td{display:flex;gap:.6rem;font-size:.85rem;}
  .st-table tbody td::before{content:attr(data-label);flex:0 0 48%;font-weight:600;color:var(--accent);}
}
@media (max-width:900px){
  .st-simple{padding:4.2rem 1rem 4rem;}
  .st-head{padding:1.6rem 1.2rem 1.9rem;}
}
`}</style>;}
