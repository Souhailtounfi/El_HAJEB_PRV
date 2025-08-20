import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cr1 from '../assets/cr1.png';
import cr2 from '../assets/cr2.png';

/*
  Secteur Privé & Champ Religieux (merged page)
  - Profession liberal table
  - Religious field statistics with images
  - Bilingual (FR / AR) + RTL support
  - Mobile responsive: table turns into cards
*/

export default function SecteurPriveChampReligieux(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    titlePrivate:'SECTEUR PRIVE',
    introPrivate:"La Province d'EL HAJEB compte un nombre considérable de professions libérales à savoir :",
    professions:[
      ['Architecte','01'],
      ['Topographe','01'],
      ['Pharmacien','59'],
      ['Médecin','23'],
      ['Vétérinaire','11'],
      ['Chirurgien-Dentiste','03'],
      ['Mécanicien Dentiste','35'],
      ['Kinésithérapeute','01'],
      ['Opticien','04'],
      ['Notaire','03'],
      ['Avocat','06'],
      ['Adoul','16'],
    ],
    footnote:'Division des Affaires Internes - Février 2015',
    titleRel:'CHAMP RELIGIEUX',
    captions:['Mosquée centrale à Aïn Taoujdate','Mausolée Sidi Tbahar'],
    stats:[
      "Nombre de mosquées : 364 dont 248 accueillant la prière du Vendredi",
      'Nombre de « Msallas » : 09',
      'Nombre des maisons coraniques : 01',
      'Nombre sanctuaires et mausolées : 09',
      'Nombre de Zaouïas : 05 dont une est fermée'
    ],
    col1:'PROFESSION', col2:'NOMBRE'
  };
  const ar = {
    titlePrivate:'القطاع الخاص',
    introPrivate:'يضم إقليم الحاجب عدداً معتبراً من المهن الحرة كما يلي:',
    professions:[
      ['مهندس معماري','01'],
      ['طبوغرافي','01'],
      ['صيدلي','59'],
      ['طبيب','23'],
      ['طبيب بيطري','11'],
      ['جراح أسنان','03'],
      ['تقني أسنان','35'],
      ['أخصائي العلاج الطبيعي','01'],
      ['بصري','04'],
      ['موثق','03'],
      ['محام','06'],
      ['عدل','16'],
    ],
    footnote:'قسم الشؤون الداخلية - فبراير 2015',
    titleRel:'الحقل الديني',
    captions:['المسجد المركزي بعين تاوجطات','ضريح سيدي طبهار'],
    stats:[
      'عدد المساجد: 364 منها 248 تقام فيها صلاة الجمعة',
      'عدد المصليات: 09',
      'عدد الدور القرآنية: 01',
      'عدد الأضرحة و المزارات: 09',
      'عدد الزوايا: 05 واحدة منها مغلقة'
    ],
    col1:'المهنة', col2:'العدد'
  };
  const t = isAr ? ar : fr;

  return (
    <div className="spr-wrap" dir={dir}>
      <SPRStyle dir={dir} />
      <section className="spr-section fade-in">
        <h1 className="spr-title">{t.titlePrivate}</h1>
        <p className="lead">{t.introPrivate}</p>
        <div className="table-scroller" role="region" aria-label={t.titlePrivate}>
          <table className="spr-table responsive-table">
            <thead>
              <tr>
                <th>{t.col1}</th>
                <th>{t.col2}</th>
              </tr>
            </thead>
            <tbody>
              {t.professions.map(([p,n])=> (
                <tr key={p}>
                  <td data-label={t.col1}>{p}</td>
                  <td className="num" data-label={t.col2}>{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">{t.footnote}</p>
      </section>
      <section className="spr-section rel-section fade-in delay-2">
        <h2 className="spr-subtitle">{t.titleRel}</h2>
        <div className="rel-grid">
          <figure className="rel-item">
            <img src={cr1} alt={t.captions[0]} loading="lazy" />
            <figcaption>{t.captions[0]}</figcaption>
          </figure>
          <figure className="rel-item">
            <img src={cr2} alt={t.captions[1]} loading="lazy" />
            <figcaption>{t.captions[1]}</figcaption>
          </figure>
        </div>
        <ul className="rel-stats">
          {t.stats.map(s=> <li key={s}>{s}</li>)}
        </ul>
      </section>
    </div>
  );
}

function SPRStyle({dir}){return <style>{`
.spr-wrap{--c1:#1d4ed8;--c2:#2563eb;--c3:#1e3a8a;--rad:1.4rem;max-width:1200px;margin-inline:auto;padding:clamp(1rem,2.3vw,2.6rem) clamp(1rem,3vw,3.2rem) 3.2rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1e293b;}
.spr-title{margin:0 0 1rem;font-size:clamp(1.55rem,3.7vw,2.9rem);font-weight:800;letter-spacing:.03em;background:linear-gradient(110deg,#1e40af,#2563eb 55%,#3b82f6);-webkit-background-clip:text;color:transparent;text-align:center;}
.spr-subtitle{margin:0 0 1.1rem;font-size:clamp(1.25rem,2.6vw,2.05rem);font-weight:800;letter-spacing:.05em;color:#1e40af;text-align:center;}
.lead{margin:.2rem auto 1.4rem;font-size:.9rem;line-height:1.65;font-weight:500;max-width:950px;color:#0f2f63;text-align:center;}
.spr-section{background:rgba(255,255,255,.72);border:1px solid #2563eb33;border-radius:var(--rad);padding:1.7rem 1.6rem 2.2rem;backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%);box-shadow:0 24px 52px -22px rgba(0,0,0,.32);position:relative;overflow:hidden;}
.spr-section + .spr-section{margin-top:2.4rem;}
.table-scroller{overflow-x:auto;margin-top:.4rem;}
.spr-table{width:100%;border-collapse:collapse;font-size:.7rem;min-width:480px;}
.spr-table th,.spr-table td{border:1px solid #2563eb33;padding:.6rem .8rem;text-align:${dir==='rtl'?'right':'left'};}
.spr-table th{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-weight:700;letter-spacing:.05em;font-size:.74rem;}
.spr-table td{background:#fff;font-weight:600;}
.spr-table tbody tr:nth-child(even) td{background:#eff6ff;}
.spr-table .num{text-align:center;font-variant-numeric:tabular-nums;}
.footnote{margin:.75rem 0 0;font-size:.7rem;font-style:italic;text-align:center;opacity:.8;}
.rel-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.4rem;margin:1rem 0 1.2rem;}
.rel-item{background:rgba(255,255,255,.62);border:1px solid #2563eb33;border-radius:1.3rem;padding:.75rem .75rem 1.05rem;box-shadow:0 18px 40px -18px rgba(0,0,0,.28);text-align:center;}
.rel-item img{width:100%;border-radius:1rem;display:block;box-shadow:0 14px 34px -14px rgba(0,0,0,.34);}
.rel-item figcaption{margin-top:.55rem;font-size:.72rem;font-weight:600;opacity:.85;}
.rel-stats{margin:0;padding-${dir==='rtl'?'right':'left'}:1.2rem;display:flex;flex-direction:column;gap:.55rem;font-size:.78rem;font-weight:600;}
.rel-stats li{line-height:1.5;}
/* Mobile card table */
@media (max-width:760px){
  .spr-section{padding:1.3rem 1rem 1.65rem;}
  .spr-table{font-size:.7rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.55rem;border:1px solid #2563eb33;background:#fff;border-radius:1rem;padding:.85rem .85rem;box-shadow:0 8px 22px -12px rgba(0,0,0,.18);margin-bottom:.85rem;}
  .responsive-table td{border:none!important;padding:.35rem .4rem;background:transparent!important;display:flex;flex-direction:column;gap:.15rem;}
  .responsive-table td:before{content:attr(data-label);font-size:.72rem;font-weight:700;color:#1e40af;}
  .rel-grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr));}
  .rel-stats{font-size:.74rem;}
  .lead{font-size:.82rem;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} .delay-2{animation-delay:.2s;} @keyframes fadeIn{to{opacity:1;transform:translateY(0);}}}
`}</style>;}
