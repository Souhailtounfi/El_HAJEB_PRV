import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import indhImg from '../assets/indh.png';

/* INDH (Initiative Nationale pour le Développement Humain)
   Distinct layout:
   - Dark gradient hero + glass stats
   - Phase I & II program table
   - Sector distribution table (scrollable)
   - Phase III program cards (stack -> grid)
   - Footnotes timeline
   - Fully bilingual + RTL aware
*/

export default function Indh(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title: "L'INITIATIVE NATIONALE POUR LE DEVELOPPEMENT HUMAIN (INDH)",
    caption: "Centre de l’hémodialyse à EL HAJEB réalisé dans le cadre de l’INDH",
    phase12Title: "1 - Principales réalisations de l’INDH en phase I & II (2005-2018)",
    p12Cols: ['PROGRAMME','NOMBRE DE PROJETS','MONTANT GLOBAL (DHS)','CONTRIBUTION INDH (DHS)','CONTRIBUTION PARTENAIRES (DHS)','NOMBRE DE BENEFICIAIRES'],
    phase12Programs: [
      ['Programme de lutte contre la pauvreté en milieu rural',220,'108 178 079,02','80 077 200,80','28 100 879,22','42 545'],
      ['Programme de lutte contre l’exclusion sociale en milieu urbain',65,'51 628 741,00','38 867 297,00','12 761 444,00','22 300'],
      ['Programme de lutte contre la précarité',54,'102 083 833,00','33 879 035,00','68 204 798,00','7 686'],
      ['Programme transversal',338,'102 249 542,69','57 410 946,69','44 839 406,00','20 615'],
    ],
    phase12Totals: ['TOTAL',677,'364 410 195,71','210 234 029,49','153 906 166,22','93 146'],
    sectorsTitle: '2 - Répartition des projets INDH 2005-2015 par secteur d’activité',
    sectorsCols: ['SECTEURS','NOMBRE DE PROJETS','CONTRIBUTION INDH (DHS)','NOMBRE DE BENEFICIAIRES'],
    sectorsRows: [
      ['Education',89,'29 717 753,00','20 429'],
      ['Santé',24,'7 066 640,00','36 670'],
      ['Activités génératrices de revenus (AGR)',126,'19 107 063,00','6 659'],
      ['Infrastructures & équipements de base (Eau, Electricité, Assainissement, Routes, Pistes …)',162,'63 108 534,00','44 535'],
      ['Centre de formation et d’éducation',22,'3 561 653,00','3 400'],
      ['Jeunesse & Sport',43,'17 929 702,00','17 877'],
      ['Formation professionnelle',1,'1 123 600,00','140'],
      ['Centre d’accueil (Dar Taliba / Dar Talib)',18,'8 014 716,00','1 843'],
      ['Culture',13,'1 127 420,00','878'],
      ['Divers (Communication, logistique et suivi)',17,'5 972 757,00','4 000'],
    ],
    phase3Title: '3 - Principales réalisations INDH phase III (2019-2024)',
    phase3Top: { projects: '581 projets', actions: '29 actions', global: '192,81 MDH', indh: '185,66 MDH', labelGlobal:'Coût global INDH', labelIndh:'Part INDH' },
    p3Programs: [
      {
        label: 'Programme 1', amount: '49,02 MDH', projects: '88 projets / 0 action', bullets: [
          '1,8 km de routes & pistes',
          '13 établissements / projets AEP & énergie',
          '3295 ménages accès à l’eau potable',
          '28 500 bénéficiaires (santé)',
          '3 750 bénéficiaires (éducation)'
        ]
      },
      {
        label: 'Programme 2', amount: '36,20 MDH', projects: '53 projets / 09 actions', bullets: [
          '2 515 bénéficiaires',
          '34% du budget: femmes en grande précarité',
          '25% du budget: personnes en situation de handicap sans ressources',
          '44% du budget: amélioration qualité de service'
        ]
      },
      {
        label: 'Programme 3', amount: '21,80 MDH', projects: '283 projets / 10 actions', bullets: [
          '7 376 bénéficiaires',
          '1 plateforme de jeunes aménagée',
          '595 jeunes formés / 306 insérés',
          '234 entreprises créées',
          '20 projets d’amélioration du revenu'
        ]
      },
      {
        label: 'Programme 4', amount: '78,64 MDH', projects: '157 projets / 10 actions', bullets: [
          'Santé maternelle & infantile: 24 projets + 1 action (5,56 MDH)',
          'Préscolarité rurale: 79 unités (30,09 MDH) – taux 92% (2023/2024)',
          'Aboui scolaire: 54 projets + 9 actions (42,99 MDH) – 200 164 bénéficiaires'
        ]
      }
    ],
    footnotes: [
      'Programme 1 : Rattrapage des déficits en infrastructures & services de base',
      'Programme 2 : Accompagnement des personnes en situation de précarité',
      'Programme 3 : Amélioration du revenu & inclusion économique des jeunes',
      'Programme 4 : Impulsion du capital humain des générations montantes'
    ]
  };

  const ar = {
    title: 'المبادرة الوطنية للتنمية البشرية',
    caption: 'مركز تصفية الدم بالحاجب المنجز في إطار المبادرة',
    phase12Title: '1 - أهم منجزات المرحلتين 1 و 2 (2005-2018)',
    p12Cols: ['البرنامج','عدد المشاريع','الكلفة الإجمالية (درهم)','مساهمة المبادرة (درهم)','مساهمة الشركاء (درهم)','عدد المستفيدين'],
    phase12Programs: [
      ['محاربة الفقر بالوسط القروي',220,'108 178 079,02','80 077 200,80','28 100 879,22','42 545'],
      ['محاربة الإقصاء الاجتماعي بالوسط الحضري',65,'51 628 741,00','38 867 297,00','12 761 444,00','22 300'],
      ['محاربة الهشاشة',54,'102 083 833,00','33 879 035,00','68 204 798,00','7 686'],
      ['البرنامج الأفقي',338,'102 249 542,69','57 410 946,69','44 839 406,00','20 615'],
    ],
    phase12Totals: ['المجموع',677,'364 410 195,71','210 234 029,49','153 906 166,22','93 146'],
    sectorsTitle: '2 - توزيع مشاريع المبادرة 2005-2015 حسب قطاع النشاط',
    sectorsCols: ['القطاعات','عدد المشاريع','مساهمة المبادرة (درهم)','عدد المستفيدين'],
    sectorsRows: [
      ['التعليم',89,'29 717 753,00','20 429'],
      ['الصحة',24,'7 066 640,00','36 670'],
      ['أنشطة مدرة للدخل',126,'19 107 063,00','6 659'],
      ['البنيات و التجهيزات الأساسية (ماء، كهرباء، تطهير، طرق...)',162,'63 108 534,00','44 535'],
      ['مراكز التكوين و التربية',22,'3 561 653,00','3 400'],
      ['الشباب و الرياضة',43,'17 929 702,00','17 877'],
      ['التكوين المهني',1,'1 123 600,00','140'],
      ['دور الطالب و الطالبة',18,'8 014 716,00','1 843'],
      ['الثقافة',13,'1 127 420,00','878'],
      ['متفرقات (تواصل، لوجستيك و تتبع)',17,'5 972 757,00','4 000'],
    ],
    phase3Title: '3 - أهم منجزات المرحلة الثالثة (2019-2024)',
    phase3Top: { projects: '581 مشروع', actions: '29 عملية', global: '192,81 مليون درهم', indh: '185,66 مليون درهم', labelGlobal:'الكلفة الإجمالية', labelIndh:'حصة المبادرة' },
    p3Programs: [
      { label:'البرنامج 1', amount:'49,02 م.د', projects:'88 مشروع / 0 عملية', bullets:[ '1.8 كلم من الطرق و المسالك','13 مشروع ربط و طاقة','3295 أسرة استفادت من الماء','28500 مستفيد في الصحة','3750 مستفيد في التعليم' ] },
      { label:'البرنامج 2', amount:'36,20 م.د', projects:'53 مشروع / 09 عمليات', bullets:[ '2515 مستفيد','34% من الميزانية للنساء في وضعية هشة','25% للأشخاص في وضعية إعاقة دون موارد','44% لتحسين جودة الخدمات' ] },
      { label:'البرنامج 3', amount:'21,80 م.د', projects:'283 مشروع / 10 عمليات', bullets:[ '7376 مستفيد','منصة واحدة للشباب','595 شابًا مكونًا / 306 مدمج','234 مقاولة محدثة','20 مشروع لتحسين الدخل' ] },
      { label:'البرنامج 4', amount:'78,64 م.د', projects:'157 مشروع / 10 عمليات', bullets:[ 'صحة الأم و الطفل: 24 مشروع + عملية (5,56 م.د)','التعليم الأولي القروي: 79 وحدة (30,09 م.د) – نسبة 92% (2023/2024)','الدعم المدرسي: 54 مشروع + 9 عمليات (42,99 م.د) – 200 164 مستفيد' ] }
    ],
    footnotes: [
      'البرنامج 1: تقليص العجز في البنيات و الخدمات الأساسية',
      'البرنامج 2: مواكبة الأشخاص في وضعية هشاشة',
      'البرنامج 3: تحسين الدخل و الإدماج الاقتصادي للشباب',
      'البرنامج 4: تنمية الرأسمال البشري للأجيال الصاعدة'
    ]
  };

  const t = isAr ? ar : fr;

  return (
    <div className="indh-wrap" dir={dir}>
      <IndhStyle dir={dir} />
      <header className="indh-hero">
        <div className="hero-inner">
          <h1>{t.title}</h1>
          <div className="hero-img">
            {indhImg && <img src={indhImg} alt={t.caption} />}
            <p className="img-cap">{t.caption}</p>
          </div>
        </div>
      </header>

      {/* Phase I & II */}
      <section className="indh-section fade-in">
        <h2>{t.phase12Title}</h2>
        <div className="table-scroll" role="region" aria-label={t.phase12Title}>
          <table className="indh-table responsive-table">
            <thead>
              <tr>{t.p12Cols.map(c=> <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {t.phase12Programs.map(r=> (
                <tr key={r[0]}>
                  {r.map((c,i)=><td key={i} data-label={t.p12Cols[i]}>{c}</td>)}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>{t.phase12Totals.map((c,i)=><th key={i}>{c}</th>)}</tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Sector distribution */}
      <section className="indh-section fade-in delay-1">
        <h2>{t.sectorsTitle}</h2>
        <div className="table-scroll" role="region" aria-label={t.sectorsTitle}>
          <table className="indh-table narrow responsive-table">
            <thead>
              <tr>{t.sectorsCols.map(c=> <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {t.sectorsRows.map(r=> (
                <tr key={r[0]}>
                  {r.map((c,i)=><td key={i} data-label={t.sectorsCols[i]}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Phase III cards */}
      <section className="indh-section phase3 fade-in delay-2">
        <h2>{t.phase3Title}</h2>
        <div className="phase3-top">
          <div className="p3-stat"><strong>{t.phase3Top.projects}</strong></div>
          <div className="p3-stat"><strong>{t.phase3Top.actions}</strong></div>
          <div className="p3-stat big"><span>{t.phase3Top.labelGlobal}</span><strong>{t.phase3Top.global}</strong></div>
          <div className="p3-stat big accent"><span>{t.phase3Top.labelIndh}</span><strong>{t.phase3Top.indh}</strong></div>
        </div>
        <div className="p3-grid">
          {t.p3Programs.map(p=> (
            <div key={p.label} className="p3-card">
              <div className="p3-head">
                <span className="p3-label">{p.label}</span>
                <span className="p3-amt">{p.amount}</span>
              </div>
              <div className="p3-sub">{p.projects}</div>
              <ul className="p3-bullets">{p.bullets.map(b=> <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
        <ul className="footnotes">
          {t.footnotes.map(f=> <li key={f}>{f}</li>)}
        </ul>
      </section>
    </div>
  );
}

function IndhStyle({dir}){return <style>{`
.indh-wrap{--bg1:#0f172a;--bg2:#1e3a8a;--acc1:#10b981;--acc2:#6366f1;--rad:1.4rem;max-width:1600px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.8rem) clamp(1rem,3vw,3.2rem) 3.8rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1e293b;}
.indh-hero{background:linear-gradient(135deg,#1e3a8a,#0f172a);border:1px solid #334155;border-radius:var(--rad);padding:1.4rem 1.5rem 2.2rem;position:relative;overflow:hidden;box-shadow:0 25px 60px -22px rgba(0,0,0,.55);}
.indh-hero:before,.indh-hero:after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 25% 25%,rgba(99,102,241,.25),transparent 60%),radial-gradient(circle at 80% 60%,rgba(16,185,129,.25),transparent 65%);} 
.indh-hero h1{margin:0;font-size:clamp(1.7rem,3.6vw,2.9rem);font-weight:800;letter-spacing:.02em;line-height:1.15;background:linear-gradient(120deg,#fff,#d1fae5 55%,#bfdbfe);-webkit-background-clip:text;color:transparent;max-width:1100px;}
.hero-inner{display:flex;flex-direction:column;gap:1.6rem;align-items:center;}
.hero-img{background:rgba(255,255,255,.08);border:1px solid #ffffff22;border-radius:1.1rem;backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);padding:.9rem 1rem;text-align:center;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;}
.hero-img img{width:100%;border-radius:.9rem;box-shadow:0 14px 38px -18px rgba(0,0,0,.55);}
.hero-img .img-cap{margin:.55rem 0 0;font-size:.75rem;font-weight:600;letter-spacing:.04em;color:#e2e8f0;opacity:.9;}
.indh-section{margin-top:3rem;background:rgba(255,255,255,.7);border:1px solid #e2e8f0aa;border-radius:var(--rad);padding:1.6rem 1.55rem 2.2rem;box-shadow:0 20px 50px -22px rgba(0,0,0,.25);position:relative;overflow:hidden;}
.indh-section:before{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.indh-section h2{margin:0 0 1.5rem;font-size:clamp(1.15rem,2.2vw,2rem);font-weight:800;letter-spacing:.05em;color:#0f172a;text-transform:uppercase;}
.table-scroll{overflow:auto;max-width:100%;}
.indh-table{width:100%;border-collapse:collapse;font-size:.78rem;min-width:780px;}
.indh-table th,.indh-table td{border:1px solid #94a3b822;padding:.55rem .6rem;vertical-align:top;text-align:${dir==='rtl'?'right':'left'};}
.indh-table th{background:linear-gradient(135deg,#1e3a8a,#312e81);color:#fff;font-weight:700;letter-spacing:.05em;}
.indh-table tfoot th{background:#0f766e;color:#fff;font-weight:800;}
.indh-table tbody td{background:#ffffff;font-weight:600;line-height:1.35;}
.indh-table tbody tr:nth-child(even) td{background:#f1f5f9;}
.phase3 .phase3-top,.phase3-top{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.9rem;margin-bottom:1.6rem;}
.p3-stat{background:linear-gradient(135deg,#1e293b,#334155);color:#e2e8f0;padding:.95rem 1rem;border:1px solid #475569;border-radius:1rem;display:flex;align-items:center;justify-content:center;text-align:center;font-size:.8rem;font-weight:700;letter-spacing:.05em;box-shadow:0 8px 24px -12px rgba(0,0,0,.4);} 
.p3-stat.big{flex-direction:column;font-size:.7rem;}
.p3-stat.big strong{font-size:1.35rem;letter-spacing:.03em;}
.p3-stat.big span{display:block;margin-bottom:.4rem;font-weight:600;opacity:.8;}
.p3-stat.accent{background:linear-gradient(135deg,#10b981,#059669);border-color:#047857;}
.p3-grid{display:grid;gap:1.2rem;margin-top:.8rem;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));}
.p3-card{background:linear-gradient(135deg,#ffffff,#f1f5f9);border:1px solid #94a3b855;border-radius:1.2rem;padding:1rem .95rem 1.25rem;display:flex;flex-direction:column;gap:.6rem;position:relative;box-shadow:0 14px 40px -18px rgba(0,0,0,.25);} 
.p3-head{display:flex;align-items:center;justify-content:space-between;gap:.8rem;}
.p3-label{font-size:.82rem;font-weight:800;letter-spacing:.08em;color:#1e3a8a;text-transform:uppercase;}
.p3-amt{font-size:.85rem;font-weight:700;color:#065f46;background:#d1fae5;padding:.45rem .65rem;border-radius:.75rem;}
.p3-sub{font-size:.78rem;font-weight:600;color:#334155;}
.p3-bullets{margin:0;padding-${dir==='rtl'?'right':'left'}:1rem;display:flex;flex-direction:column;gap:.55rem;font-size:.78rem;font-weight:600;color:#0f172a;}
.p3-bullets li{position:relative;line-height:1.35;}
.p3-bullets li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-.65rem;top:.4rem;width:.45rem;height:.45rem;border-radius:50%;background:linear-gradient(135deg,#6366f1,#10b981);} 
.footnotes{margin:1.8rem 0 0;padding-${dir==='rtl'?'right':'left'}:1rem;display:flex;flex-direction:column;gap:.55rem;font-size:.74rem;font-weight:600;color:#334155;}
.footnotes li{position:relative;}
.footnotes li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-.7rem;top:.4rem;width:.4rem;height:.4rem;border-radius:50%;background:#10b981;} 
/* Responsive table -> card layout */
@media (max-width:860px){.indh-table{font-size:.72rem;}.p3-stat.big strong{font-size:1.15rem;} }
@media (max-width:620px){
  .indh-hero h1{font-size:clamp(1.4rem,6.4vw,2.2rem);} .p3-grid{grid-template-columns:1fr;}
  .responsive-table{min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.4rem;border:1px solid #e2e8f0;box-shadow:0 6px 18px -8px rgba(0,0,0,.15);background:#fff;margin-bottom:.95rem;padding:.7rem .75rem;border-radius:1rem;}
  .responsive-table td{border:none !important;padding:.3rem .4rem;display:flex;flex-direction:column;gap:.2rem;background:transparent!important;}
  .responsive-table td:before{content:attr(data-label);font-size:.72rem;font-weight:700;color:#1e3a8a;letter-spacing:.04em;}
  .indh-table tfoot{display:none;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .9s ease forwards;transform:translateY(12px);} .delay-1{animation-delay:.15s;} .delay-2{animation-delay:.3s;} @keyframes fadeIn{to{opacity:1;transform:none;} }}
`}</style>;}
