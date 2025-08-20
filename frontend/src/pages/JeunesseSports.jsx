import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import js1 from '../assets/js1.png';
import js2 from '../assets/js2.png';
import js3 from '../assets/js3.png';

/*
  Jeunesse & Sports (FR / AR)
  - Matches modern glass card aesthetic of other added pages
  - 3 image gallery with captions
  - Facilities table (bilingual)
*/

export default function JeunesseSports(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'JEUNESSE ET SPORTS',
    intro1:"Après la création de la province d’EL HAJEB en 1991, le Ministère de la Jeunesse et des Sports a procédé à la création de la délégation provinciale pour coordonner les actions des différents établissements relevant de la délégation et diversifier les services et prestations rendus.",
    intro2:"Compte tenu de la jeunesse de la population de la Province ce volet revêt un caractère important puisqu’il permet ainsi à cette tranche de la population de s’organiser voire même de s’insérer dans la vie active.",
    intro3:"Plusieurs acteurs de la société civile et de la population ont bénéficié de ces équipements sportifs et notamment le camp de vacances, les maisons de jeunes, les foyers féminins et les installations sportives.",
    captions:['Camping d’EL HAJEB','Salle couverte d’EL HAJEB','Championnat national de l’athlétisme Mars 2015'],
    tableTitle:'La Province d’EL HAJEB dispose de :',
    col1:'ETABLISSEMENT', col2:'NOMBRE',
    rows:[
      ['MAISONS DES JEUNES','08'],
      ['SALLES COUVERTE','02'],
      ['FOYERS FÉMININ','04'],
      ['CENTRES SOCIO-SPORTIF','01'],
      ['CAMPING MUNICIPAL','01'],
      ['TERRAINS DE FOOT BALL','05'],
      ['TERRAINS DE PROXIMITÉ','13'],
    ]
  };

  const ar = {
    title:'الشباب والرياضة',
    intro1:'بعد إحداث إقليم الحاجب سنة 1991 قام قطاع الشباب والرياضة بإحداث المندوبية الإقليمية لتنسيق عمل مختلف المؤسسات التابعة له وتنويع الخدمات المقدمة.',
    intro2:'بالنظر إلى الفئة الشابة التي تطبع ساكنة الإقليم يكتسي هذا الجانب أهمية كبيرة لتمكين هذه الشريحة من التأطير و الإدماج في الحياة النشيطة.',
    intro3:'استفاد العديد من الفاعلين من المجتمع المدني والسكان من هذه التجهيزات الرياضية خاصة مخيم العطلة و دور الشباب و دور الفتاة والمنشآت الرياضية.',
    captions:['مخيم الحاجب','القاعة المغطاة بالحاجب','بطولة وطنية لألعاب القوى مارس 2015'],
    tableTitle:'يتوفر إقليم الحاجب على:',
    col1:'المؤسسة', col2:'العدد',
    rows:[
      ['دور الشباب','08'],
      ['قاعات مغطاة','02'],
      ['دور الفتاة','04'],
      ['مراكز سوسيو رياضية','01'],
      ['مخيم بلدي','01'],
      ['ملاعب كرة القدم','05'],
      ['ملاعب القرب','13'],
    ]
  };

  const t = isAr ? ar : fr;
  const images = [js1, js2, js3];

  return (
    <div className="js-wrap" dir={dir}>
      <JSStyle dir={dir} />
      <header className="js-hero">
        <h1 className="js-title">{t.title}</h1>
      </header>
      <div className="intro-grid fade-in delay-1">
        <div className="text-card">
          <p>{t.intro1}</p>
        </div>
      </div>
      <section className="js-gallery">
        {images.slice(0,2).map((src,i)=> (
          <figure key={i} className="gal-item fade-in" style={{animationDelay:`${0.15 + i*0.1}s`}}>
            <img src={src} alt={t.captions[i]} loading="lazy" />
            <figcaption>{t.captions[i]}</figcaption>
          </figure>
        ))}
      </section>
      <div className="intro-grid mt fade-in delay-3">
        <div className="text-card"><p>{t.intro2}</p></div>
        <div className="text-card alt"><p>{t.intro3}</p></div>
      </div>
      <figure className="single-fig fade-in delay-4 mt-lg">
        <img src={images[2]} alt={t.captions[2]} loading="lazy" />
        <figcaption>{t.captions[2]}</figcaption>
      </figure>
      <section className="js-section fade-in delay-5">
        <h2>{t.tableTitle}</h2>
        <div className="table-scroller" role="region" aria-label={t.tableTitle}>
          <table className="js-table responsive-table">
            <thead>
              <tr>
                <th>{t.col1}</th>
                <th>{t.col2}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map(([a,b])=> (
                <tr key={a}>
                  <td data-label={t.col1}>{a}</td>
                  <td className="num" data-label={t.col2}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function JSStyle({dir}){return <style>{`
.js-wrap{--c1:#065f46;--c2:#0d9488;--c3:#10b981;--rad:1.4rem;max-width:1250px;margin-inline:auto;padding:clamp(.9rem,2vw,2.3rem) clamp(.9rem,3vw,3rem) 3rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2937;}
.js-title{margin:0;font-size:clamp(1.8rem,4.1vw,3.15rem);font-weight:800;background:linear-gradient(115deg,#10b981,#0d9488 55%,#065f46);-webkit-background-clip:text;color:transparent;letter-spacing:.03em;text-align:center;}
.lead{font-size:.85rem;line-height:1.6;margin:.9rem auto 1.2rem;font-weight:500;color:#08372d;max-width:950px;}
.centered{text-align:center;}
.intro-grid{display:grid;grid-template-columns:1fr;gap:1.1rem;margin-top:1.4rem;}
@media (min-width:900px){.intro-grid{grid-template-columns:repeat(auto-fit,minmax(340px,1fr));}}
.text-card{background:rgba(255,255,255,.68);border:1px solid #10b98133;padding:1.1rem 1.15rem 1.2rem;border-radius:1.25rem;box-shadow:0 14px 36px -18px rgba(0,0,0,.25);position:relative;overflow:hidden;}
.text-card:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(140deg,rgba(255,255,255,.6),transparent 65%);pointer-events:none;mix-blend-mode:overlay;}
.text-card p{margin:0;font-size:.87rem;line-height:1.65;font-weight:500;color:#064e3b;}
@media (max-width:760px){.text-card p{font-size:.8rem;}}
.text-card.alt{background:rgba(240,253,244,.75);}
.js-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.3rem;margin-top:1.6rem;}
.gal-item{background:rgba(255,255,255,.6);border:1px solid #10b98133;border-radius:1.3rem;padding:.75rem .75rem 1.1rem;backdrop-filter:blur(16px) saturate(170%);-webkit-backdrop-filter:blur(16px) saturate(170%);box-shadow:0 18px 40px -18px rgba(0,0,0,.32);text-align:center;position:relative;}
.gal-item img{width:100%;border-radius:1rem;display:block;box-shadow:0 14px 34px -14px rgba(0,0,0,.35);}
.gal-item figcaption{margin-top:.55rem;font-size:.72rem;font-weight:600;opacity:.85;}
.mt{margin-top:1.8rem;}
.mt-lg{margin-top:2.2rem;}
.single-fig{margin:1.2rem auto 2rem;max-width:620px;text-align:center;}
.single-fig img{width:100%;border-radius:1.2rem;box-shadow:0 22px 46px -20px rgba(0,0,0,.4);} 
.single-fig figcaption{margin-top:.55rem;font-size:.72rem;font-weight:600;opacity:.8;}
.js-section{margin-top:3rem;background:rgba(255,255,255,.7);border:1px solid #10b98140;border-radius:var(--rad);padding:1.65rem 1.55rem 2.2rem;backdrop-filter:blur(20px) saturate(170%);-webkit-backdrop-filter:blur(20px) saturate(170%);box-shadow:0 24px 50px -22px rgba(0,0,0,.32);}
.js-section h2{margin:0 0 1.2rem;font-size:clamp(1.05rem,2.2vw,1.8rem);font-weight:800;letter-spacing:.05em;color:#065f46;text-align:center;}
.table-scroller{overflow-x:auto;}
.js-table{width:100%;border-collapse:collapse;font-size:.7rem;min-width:520px;}
.js-table th,.js-table td{border:1px solid #10b98133;padding:.6rem .75rem;text-align:${dir==='rtl'?'right':'left'};}
.js-table th{background:linear-gradient(135deg,#10b981,#0d9488);color:#fff;font-weight:700;letter-spacing:.05em;}
.js-table tbody td{background:#fff;font-weight:600;}
.js-table tbody tr:nth-child(even) td{background:#f0fdfa;}
.js-table .num{text-align:center;font-variant-numeric:tabular-nums;}
@media (max-width:760px){
  .gal-item{padding:.55rem .55rem .9rem;}
  .lead{font-size:.78rem;}
  .js-section{padding:1.25rem 1rem 1.7rem;}
  .js-table{font-size:.66rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.55rem;border:1px solid #10b98133;background:#fff;border-radius:1rem;padding:.8rem .85rem;box-shadow:0 8px 22px -12px rgba(0,0,0,.18);margin-bottom:.85rem;}
  .responsive-table td{border:none!important;padding:.3rem .35rem;background:transparent!important;display:flex;flex-direction:column;gap:.18rem;}
  .responsive-table td:before{content:attr(data-label);font-size:.72rem;font-weight:700;color:#065f46;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} .delay-1{animation-delay:.1s;} .delay-3{animation-delay:.3s;} .delay-4{animation-delay:.4s;} .delay-5{animation-delay:.5s;} .delay-6{animation-delay:.6s;} @keyframes fadeIn{to{opacity:1;transform:translateY(0);} }}
`}</style>;}
