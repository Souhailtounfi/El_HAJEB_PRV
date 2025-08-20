import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import pcImg from '../assets/pc.png';

/*
  Protection Civile page (FR / AR)
  - Lightweight bilingual content object
  - Modern glass / gradient cards for sections
  - Responsive + RTL aware
*/

export default function ProtectionCivile(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl' : 'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title: 'PROTECTION CIVILE',
    intro: "L’unité de la protection civile d’EL HAJEB siège au sein des dépendances du complexe administratif de la Province avec 02 centres de secours l’un sur la ville d’El Hajeb et l’autre sur la ville d’Aïn Taoujdate.",
    caption: 'Intervention incendie de la protection civile',
    humanTitle: 'MOYENS HUMAINS',
    humanIntro: 'Le commandement provincial de la protection civile dispose de (janvier 2016) :',
    humans: ['03 officiers','01 médecin','60 sous-officiers'],
    ratioTitle: 'RATIO DE COUVERTURE',
    ratios: [
      '01 Camion incendie pour 216.388 habitants',
      '01 Ambulance pour 54.097 habitants',
      '01 Ambulance PC, santé et communes pour 12.021 habitants',
      '01 Pompier pour 10.819 habitants'
    ]
  };

  const ar = {
    title: 'الحماية المدنية',
    intro: 'تتخذ وحدة الحماية المدنية بإقليم الحاجب مقراً لها داخل ملحقات المجمع الإداري للإقليم، وتتوفر على مركزين للإغاثة أحدهما بمدينة الحاجب والآخر بمدينة عين تاوجدات.',
    caption: 'تدخل للحماية المدنية أثناء حريق',
    humanTitle: 'الوسائل البشرية',
    humanIntro: 'تتوفر القيادة الإقليمية للحماية المدنية (يناير 2016) على:',
    humans: ['3 ضباط','طبيب واحد','60 ضابط صف'],
    ratioTitle: 'نسبة التغطية',
    ratios: [
      'شاحنة إطفاء واحدة لكل 216.388 نسمة',
      'سيارة إسعاف واحدة لكل 54.097 نسمة',
      'سيارة إسعاف (حماية مدنية، صحة وجماعات) واحدة لكل 12.021 نسمة',
      'رجل إطفاء واحد لكل 10.819 نسمة'
    ]
  };

  const t = isAr ? ar : fr;

  return (
    <div className="pc-wrap" dir={dir}>
      <PCStyle dir={dir} />
      <header className="pc-hero">
        <h1 className="pc-title">{t.title}</h1>
        <p className="pc-intro fade-in">{t.intro}</p>
      </header>
      <figure className="pc-figure">
        {pcImg && <img src={pcImg} alt={t.caption} loading="lazy" />}
        <figcaption>{t.caption}</figcaption>
      </figure>
      <section className="pc-section">
        <h2>{t.humanTitle}</h2>
        <p className="lead">{t.humanIntro}</p>
        <ul className="bullet">
          {t.humans.map(item=> <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="pc-section">
        <h2>{t.ratioTitle}</h2>
        <ul className="bullet">
          {t.ratios.map(item=> <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  );
}

function PCStyle({dir}){return <style>{`
.pc-wrap{--g1:#047857;--g2:#10b981;--fg:#064e3b;--rad:1.4rem;padding:clamp(.9rem,2vw,2.2rem) clamp(.9rem,3vw,3rem) 3.2rem;max-width:1200px;margin-inline:auto;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2937;}
.pc-title{margin:0;font-size:clamp(1.8rem,4.2vw,3.2rem);font-weight:800;letter-spacing:.03em;background:linear-gradient(120deg,#10b981,#047857 55%,#065f46);-webkit-background-clip:text;color:transparent;text-align:center;}
.pc-intro{margin:.9rem auto 1.6rem;max-width:900px;font-size:.82rem;line-height:1.55;font-weight:500;color:#08372d;text-align:center;}
.pc-figure{margin:1.2rem auto 2.4rem;max-width:560px;text-align:center;}
.pc-figure img{width:100%;display:block;border-radius:1.3rem;box-shadow:0 20px 42px -18px rgba(0,0,0,.4);}
.pc-figure figcaption{margin-top:.6rem;font-size:.74rem;font-weight:600;opacity:.85;}
.pc-section{margin-top:2.4rem;background:rgba(255,255,255,.6);backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%);border:1px solid #10b98133;border-radius:var(--rad);padding:1.4rem 1.35rem 1.9rem;position:relative;box-shadow:0 18px 34px -16px rgba(0,0,0,.28);} 
.pc-section:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(150deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.pc-section h2{margin:0 0 1rem;font-size:clamp(1.05rem,2.2vw,1.75rem);font-weight:800;letter-spacing:.05em;color:#065f46;}
.lead{font-size:.8rem;line-height:1.6;margin:0 0 1rem;font-weight:500;}
.bullet{margin:.25rem 0 0;padding-${dir==='rtl'?'right':'left'}:1.2rem;display:flex;flex-direction:column;gap:.55rem;font-size:.78rem;font-weight:600;}
.bullet li{position:relative;line-height:1.4;}
.bullet li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-1rem;top:.45rem;width:.55rem;height:.55rem;border-radius:50%;background:linear-gradient(135deg,#10b981,#047857);} 
@media (max-width:760px){.pc-section{padding:1.15rem 1.05rem 1.55rem;}.pc-intro{font-size:.78rem;} .bullet{font-size:.74rem;}}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .9s ease .15s forwards;}@keyframes fadeIn{to{opacity:1;}}}
`}</style>;}
