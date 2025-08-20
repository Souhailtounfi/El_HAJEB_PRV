import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import rr1 from '../assets/rr1.png';
import rr2 from '../assets/rr2.png';
import rr3 from '../assets/rr3.png';
import rr4 from '../assets/rr4.png';
import rr5 from '../assets/rr5.png';

/*
  Responsive, bilingual (FR / AR) page for "Réseau Routier" & Transport.
  Design goals:
  - Distinct modern style (glass cards + earthy road / rail accent gradients)
  - Mobile-first stacked cards, desktop split + media gallery
  - Smooth subtle animations (fade / slide) without heavy libs
  - Data kept in structured objects for easy maintenance / translation
*/

export default function ReseauRoutier(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';

  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    titleMain: 'RÉSEAU ROUTIER',
    intro1: `Les routes dans la province jouent un rôle stratégique dans le désenclavement et l’accès aux services sociaux, ainsi que la promotion et l’amélioration des activités économiques et des indicateurs de développement humain.`,
    intro2: `Les routes régionales et nationales sont totalement revêtues alors que celles provinciales atteignent 326 km.`,
    intro3: `Cependant si l’on s’en tient au taux de couverture, la Province d’EL HAJEB figure parmi les premières de la région malgré les handicaps de la superficie et celui du faible taux de couverture en route nationale.`,
    intro4: `Outre le réseau routier, la Province dispose de deux gares ferroviaires une à AIN TAOUJDATE et l’autre à SEBAA AIYOUNE.`,
    tableTitle: 'ANNÉE 2024',
    networkRows: [
      { type: 'AUTOROUTE', km: '34 km' },
      { type: 'ROUTE RÉGIONALE', km: '146 km' },
      { type: 'ROUTE PROVINCIALE', km: '326 km' },
      { type: 'ROUTE NATIONALE', km: '51 km' },
      { type: 'PISTES', km: '540 km' },
    ],
    captions: [
      'Voie ferrée à Aïn Taoujdate',
      'Route Nationale N°13 double-voies (EL HAJEB – BOUFKRANE)',
      'Autoroute traversant le territoire de la province à LAGSSIR',
      'Assainissement du centre de BOUDERBALA',
      'Travaux de revêtement sur axe provincial'
    ],
    sectionTransport: 'TRANSPORT',
    transportVoyageurs: 'TRANSPORT VOYAGEURS',
    voyageurs: [
      ['Nombre d’Autocars basés', '08'],
      ['Nombre d’Autobus (citybus)', '20'],
      ['Nombre d’Autocars transitant', '88'],
      ['Nombre d’Autocars mixtes', '10'],
    ],
    transportMixte: 'TRANSPORT MIXTE',
    mixte: [['Autorisations exploitées', '10']],
    taxis: 'TAXIS',
    taxisStats: [ ['1ère catégorie', '236'], ['2ème catégorie', '47'] ],
    ferroTitle: 'TRANSPORT FERROVIAIRE',
    ferroStats: [
      ['Gares principales', '2'],
      ['Longueur de la ligne', '35 km'],
      ['Trains voyageurs / jour', '20'],
      ['Trains marchandises / jour', '08'],
      ['Volume annuel marchandises', '17 600 MT'],
    ],
    centres: 'CENTRES DE VISITE TECHNIQUE',
    centresList: [ 'EL HAJEB : 1', 'AIN TAOUJDATE : 1', 'AIT BOUBIDMANE : 1' ]
  };

  const ar = {
    titleMain: 'الشبكة الطرقية',
    intro1: 'تلعب الطرق في الإقليم دورًا استراتيجيًا في فك العزلة والوصول إلى الخدمات الاجتماعية وكذا في تعزيز وتحسين الأنشطة الاقتصادية ومؤشرات التنمية البشرية.',
    intro2: 'الطرق الجهوية والوطنية مغطاة كليًا بينما الطرق الإقليمية تبلغ 326 كلم.',
    intro3: 'رغم محدودية المساحة وضعف نسبة التغطية بالطرق الوطنية، يحتل إقليم الحاجب مراتب متقدمة على صعيد الجهة من حيث نسبة التغطية.',
    intro4: 'إضافة إلى الشبكة الطرقية يتوفر الإقليم على محطتين سككيتين واحدة بعين تاوجدات والأخرى بسبع عيون.',
    tableTitle: 'سنة 2024',
    networkRows: [
      { type: 'الطريق السيار', km: '34 كلم' },
      { type: 'طريق جهوي', km: '146 كلم' },
      { type: 'طريق إقليمي', km: '326 كلم' },
      { type: 'طريق وطني', km: '51 كلم' },
      { type: 'مسالك', km: '540 كلم' },
    ],
    captions: [
      'سكة حديدية بعين تاوجدات',
      'الطريق الوطنية رقم 13 مزدوجة (الحاجب – بوفكران)',
      'الطريق السيار يمر بتراب الإقليم بلقصر',
      'تهيئة مركز بودربالة',
      'أشغال التبليط بمحور إقليمي'
    ],
    sectionTransport: 'النقل',
    transportVoyageurs: 'نقل المسافرين',
    voyageurs: [
      ['عدد الحافلات المستقرة', '08'],
      ['عدد الحافلات (حضرية)', '20'],
      ['عدد الحافلات العابرة', '88'],
      ['عدد الحافلات المختلطة', '10'],
    ],
    transportMixte: 'النقل المختلط',
    mixte: [['الرخص المستغلة', '10']],
    taxis: 'سيارات الأجرة',
    taxisStats: [ ['الصنف الأول', '236'], ['الصنف الثاني', '47'] ],
    ferroTitle: 'النقل السككي',
    ferroStats: [
      ['عدد المحطات', '2'],
      ['طول الخط', '35 كلم'],
      ['قطارات المسافرين / يوم', '20'],
      ['قطارات البضائع / يوم', '08'],
      ['الحجم السنوي للبضائع', '17 600 طن']
    ],
    centres: 'مراكز الزيارة التقنية',
    centresList: [ 'الحاجب : 1', 'عين تاوجدات : 1', 'آيت بوبدمان : 1' ]
  };

  const t = isAr ? ar : fr;
  const imgs = [rr1, rr2, rr3, rr4, rr5];

  return (
    <div className="rr-wrapper" dir={dir}>
      <RRStyle dir={dir} />

      {/* HEADER */}
      <section className="rr-hero">
        <div className="rr-hero-inner">
          <h1 className="rr-title">{t.titleMain}</h1>
          <p className="rr-intro fade-in delay-1">{t.intro1}</p>
          <p className="rr-intro fade-in delay-2">{t.intro2}</p>
          <p className="rr-intro fade-in delay-3">{t.intro3}</p>
          <p className="rr-intro fade-in delay-4">{t.intro4}</p>
        </div>
        <div className="rr-hero-media">
          <figure className="rr-main-photo">
            <img src={imgs[0]} alt={t.captions[0]} />
            <figcaption>{t.captions[0]}</figcaption>
          </figure>
        </div>
      </section>

      {/* NETWORK STATS */}
      <section className="rr-grid-section">
        <div className="rr-stats-card">
          <h2 className="card-head">{t.titleMain}</h2>
          <div className="stats-table">
            <div className="thead">
              <span>{t.tableTitle}</span>
            </div>
            <ul className="tbody">
              {t.networkRows.map(r=> (
                <li key={r.type}>
                  <span className="lbl">{r.type}</span>
                  <span className="val">{r.km}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rr-gallery">
          {[1,2].map(i=> (
            <figure key={i} className="gal-item">
              <img src={imgs[i]} alt={t.captions[i]} loading="lazy" />
              <figcaption>{t.captions[i]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WORKS / PHOTOS */}
      <section className="rr-works">
        {[3,4].map(i=> (
          <figure key={i} className="work-item">
            <img src={imgs[i]} alt={t.captions[i]} loading="lazy" />
            <figcaption>{t.captions[i]}</figcaption>
          </figure>
        ))}
      </section>

      {/* TRANSPORT SECTION */}
      <section className="rr-transport">
        <div className="tp-col">
          <h2>{t.sectionTransport}</h2>
          <div className="tp-block">
            <h3>{t.transportVoyageurs}</h3>
            <ul className="pairs">
              {t.voyageurs.map(([k,v])=> <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
            </ul>
          </div>
          <div className="tp-block">
            <h3>{t.transportMixte}</h3>
            <ul className="pairs">
              {t.mixte.map(([k,v])=> <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
            </ul>
          </div>
          <div className="tp-block">
            <h3>{t.taxis}</h3>
            <ul className="pairs">
              {t.taxisStats.map(([k,v])=> <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
            </ul>
          </div>
        </div>
        <div className="tp-col">
          <div className="tp-block">
            <h3>{t.ferroTitle}</h3>
            <ul className="pairs">
              {t.ferroStats.map(([k,v])=> <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
            </ul>
          </div>
          <div className="tp-block">
            <h3>{t.centres}</h3>
            <ul className="bullet-list">
              {t.centresList.map(c=> <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function RRStyle({dir}){
  return (
    <style>{`
      .rr-wrapper{--road:#7f1d1d;--road2:#b91c1c;--glass:rgba(255,255,255,.55);--rad:1.2rem;--grad:linear-gradient(135deg,#7f1d1d,#b91c1c);padding:clamp(0.5rem,1.8vw,2.4rem) clamp(.6rem,2vw,3.2rem) 3.5rem;max-width:1500px;margin-inline:auto;color:#222;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}
      .rr-wrapper h1,.rr-wrapper h2,.rr-wrapper h3{font-weight:800;letter-spacing:.03em;}
      .rr-hero{display:grid;gap:2rem;align-items:start;}
      @media (min-width:1050px){.rr-hero{grid-template-columns:1.1fr .9fr;}}
      .rr-title{background:var(--grad);-webkit-background-clip:text;color:transparent;font-size:clamp(1.6rem,4.2vw,3.2rem);margin:0 0 .9rem;}
  .rr-hero-inner p{margin:0 0 .95rem;font-size:clamp(.9rem,1.15vw,1.08rem);line-height:1.6;}
      .rr-hero-inner p:nth-child(n+3){opacity:.9;}
      .rr-main-photo{position:relative;margin:0;}
      .rr-main-photo img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--rad);box-shadow:0 18px 40px -18px rgba(0,0,0,.4);}
  .rr-main-photo figcaption{margin-top:.6rem;font-size:.85rem;font-weight:600;text-align:center;opacity:.95;}
      /* stats + gallery */
      .rr-grid-section{display:grid;gap:2rem;margin-top:2.8rem;}
      @media (min-width:980px){.rr-grid-section{grid-template-columns:430px 1fr;align-items:start;}}
      .rr-stats-card{background:var(--glass);backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);border:1px solid #7f1d1d33;padding:1.4rem 1.3rem 1.6rem;border-radius:var(--rad);position:relative;overflow:hidden;}
      .rr-stats-card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 15%,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
      .card-head{margin:0 0 1.1rem;font-size:clamp(1rem,2.2vw,1.6rem);color:#581616;text-align:${dir==='rtl'?'right':'left'};}
  .stats-table{border:1px solid #7f1d1d55;border-radius:1rem;overflow:hidden;font-size:.9rem;}
      .stats-table .thead{background:var(--grad);color:#fff;padding:.6rem .9rem;font-weight:700;text-align:center;letter-spacing:.05em;}
      .stats-table ul{list-style:none;margin:0;padding:0;}
      .stats-table li{display:flex;justify-content:space-between;gap:1rem;padding:.55rem .85rem;background:#fff;}
      .stats-table li:nth-child(even){background:#fef2f2;}
      .stats-table li .lbl{font-weight:600;}
      .stats-table li .val{font-weight:700;color:#7f1d1d;}
      .rr-gallery{display:grid;gap:1.4rem;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));}
      .gal-item{margin:0;}
      .gal-item img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:1rem;box-shadow:0 10px 26px -14px rgba(0,0,0,.4);transition:transform .6s;}
      .gal-item:hover img{transform:scale(1.04);} 
  .gal-item figcaption{font-size:.82rem;font-weight:600;margin-top:.55rem;text-align:center;opacity:.95;}
      /* works gallery */
      .rr-works{margin-top:2.5rem;display:grid;gap:1.8rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));}
      .work-item{margin:0;}
      .work-item img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:1rem;box-shadow:0 12px 30px -14px rgba(0,0,0,.38);}
  .work-item figcaption{text-align:center;margin-top:.55rem;font-size:.85rem;font-weight:600;opacity:.95;}
      /* transport */
      .rr-transport{margin-top:3.5rem;display:grid;gap:2rem;}
      @media (min-width:950px){.rr-transport{grid-template-columns:1fr 1fr;}}
      .tp-col h2{margin:0 0 1.2rem;font-size:clamp(1.1rem,2.4vw,1.9rem);background:var(--grad);-webkit-background-clip:text;color:transparent;}
      .tp-block{background:#fff;border:1px solid #7f1d1d33;border-radius:1rem;padding:1rem 1.1rem 1.1rem;box-shadow:0 8px 24px -14px rgba(0,0,0,.2);position:relative;}
      .tp-block + .tp-block{margin-top:1rem;}
  .tp-block h3{margin:0 0 .85rem;font-size:.9rem;letter-spacing:.05em;color:#7f1d1d;font-weight:800;}
  .pairs{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem;font-size:.85rem;}
      .pairs li{display:flex;justify-content:space-between;border-bottom:1px dashed #7f1d1d33;padding:.25rem 0;}
      .pairs li:last-child{border-bottom:none;}
      .pairs span{font-weight:600;}
      .pairs strong{font-weight:800;color:#7f1d1d;}
  .bullet-list{margin:0;padding:0 1rem;font-size:.85rem;display:flex;flex-direction:column;gap:.55rem;}
      .bullet-list li{position:relative;}
      .bullet-list li:before{content:"•";position:absolute;${dir==='rtl'?'right':'left'}:-.8rem;color:#b91c1c;font-weight:700;}
      /* subtle animations */
      .fade-in{opacity:0;animation:fadeIn .9s forwards;}
      .delay-1{animation-delay:.1s}.delay-2{animation-delay:.25s}.delay-3{animation-delay:.4s}.delay-4{animation-delay:.55s}
      @keyframes fadeIn{to{opacity:1;}}
    `}</style>
  );
}
