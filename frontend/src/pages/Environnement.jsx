import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Futuristic / smooth eco-themed Environment page (Assainissement & Déchets)
export default function Environnement(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl' : 'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  /* ----------------------------- FR CONTENT ----------------------------- */
  const fr = {
    title: 'Environnement',
    liquidTitle: '1. ASSAINISSEMENT LIQUIDE',
    liquidIntro: 'Des efforts conséquents ont été déployés pour relever :',
    liquidBullets: [
      'Les niveaux de raccordement au réseau d’assainissement',
      'Les niveaux de traitement des eaux usées'
    ],
    liquidConnexHead: 'ANNEE 2015',
    liquidConnexCols: ['URBAIN','RURAL'],
    liquidConnexData: ['90%','30%'],
    liquidConnexCaption: 'Division des programmes et de l’Equipement (année 2015)',
    cities: [
      { name: 'Ville d’EL HAJEB', text: 'dotée d’un réseau d’assainissement liquide de type unitaire (à l’exception du Lotissement AL OMRANE 1 qui est assaini en système séparatif) qui couvre 95% des zones d’habitats. Le linéaire total de ce réseau s’élève à 50 km. La ville dispose d’une STEP de type lit bactérien. Le débit des eaux usées épurées est 3036 m³/j.'},
      { name: 'Ville de SEBAA AYOUNE', text: 'est partiellement couvert par un réseau d’assainissement liquide de type unitaire (environ 50% de zones d’habitat), et ce à l’exception du lotissement AGDAL qui assaini en séparatif. Le linéaire total du réseau existant est de l’ordre de 27,8 km. Le lancement du marché des travaux d’assainissement (réseau et STEP) est en cours par la RADEEM dans le cadre du Programme Nationale de l’assainissement mutualisé (PNAM) dont le coût global est de l’ordre de 130 MDH.'},
      { name: 'Ville d’AGOURAI', text: 'elle est dotée d’un réseau d’assainissement liquide de type mixte en modeste état, avec un linéaire de 23 km. Le taux de raccordement est de 40%. Le reste de la population utilise des puits perdus. La préparation du dossier d’offres pour la réalisation de l’étude du schéma directeur d’assainissement liquide de la ville est en cours.'},
      { name: 'Ville d’AIN TAOUJDATE', text: 'il est de type mixte. Le linéaire du réseau a atteint presque 47 km. Le taux de raccordement au réseau d’assainissement est 92%. La ville a été dotée d’une station d’épuration de type lagunage naturel qui est en service depuis 2004. Elle est située à environ 3 km au nord de la ville et s’étend sur une superficie d’environ 10 Ha. Cette station permet de traiter un volume de 1500 m³/j d’eaux usées.'},
    ],
    ruralTitle: 'En milieu rural :',
    ruralPoints: [
      'Les 04 communes rurales d’Ait Yazem, Jahjouh, Ras Ijerri et Ait Boubidmane disposent d’un réseau qui couvre totalement ou partiellement le centre. L’utilisation de la fosse septique est la plus répandue, en cas de l’indisponibilité de ce réseau.',
      'Les 08 communes rurales restantes se caractérisent par des habitations dispersées ce qui ne favorise pas la réalisation d’un réseau d’assainissement, leurs populations rejettent les eaux usées dans des puits perdus.'
    ],
    solidTitle: '2. ASSAINISSEMENT SOLIDE',
    solidIntro: 'Dans le cadre de l’élaboration du plan directeur de gestion des déchets ménagers et assimilés pour la province d’El-Hajeb, l’autorité provinciale s’est engagée à améliorer sa stratégie en matière de gestion de l’environnement en visant les objectifs suivants :',
    solidObjectives: [
      'La mise en place d’une décharge contrôlée et de 03 centres de transfert répondant aux normes environnementales en vigueur.',
      'L’exploitation de décharge contrôlée et de 03 centres de transfert par le groupement intercommunal Al-Khadra.',
      'La réhabilitation des 04 décharges non contrôlées.',
      'L’intégration des chiffonniers dans la politique de formalisation du métier de récupérateur.'
    ],
    solidNote: 'De même et pour améliorer et organiser la gestion des déchets solides dans les centres urbains, les conseils communaux des 04 communes urbaines ont délégué la gestion des services de propreté et de nettoyage à la société Ozone dans le cadre d’un appel d’offre ouvert.',
    natureTitle: '3. NATURE DES DÉCHETS',
    natureIntro: 'Les déchets produits, et ramassés sont versés dans les 4 principales décharges et sont majoritairement constitués des ordures ménagères à concurrence de 94 %.',
    wasteHead: 'TYPE DE DÉCHETS',
    wasteHead2: 'TAUX',
    wasteRows: [
      ['ORDURES MÉNAGÈRES','94,00%'],
      ['DÉCHETS HOSPITALIERS','1,10%'],
      ['DÉCHETS DES MARCHÉS','2,20%'],
      ['DÉCHETS DES ABATTOIRS','0,55%'],
      ['DÉCHETS VERTS','1,10%'],
      ['DÉCHETS INDUSTRIELS','0,55%'],
    ],
    wasteCaption: 'Types des déchets reçus au niveau de la décharge d’EL HAJEB'
  };

  /* ----------------------------- AR CONTENT ----------------------------- */
  const ar = {
    title: 'البيئة',
    liquidTitle: '1. التطهير السائل',
    liquidIntro: 'تم بذل مجهودات هامة لرفع ما يلي:',
    liquidBullets: [ 'مستويات الربط بشبكة التطهير', 'مستويات معالجة المياه العادمة' ],
    liquidConnexHead: 'سنة 2015',
    liquidConnexCols: ['حضري','قروي'],
    liquidConnexData: ['90%','30%'],
    liquidConnexCaption: 'قسم البرامج والتجهيز (سنة 2015)',
    cities: [
      { name: 'مدينة الحاجب', text: 'تتوفر على شبكة تطهير سائل من النوع الموحد (باستثناء تجزئة العمران 1 التي تعتمد النظام المنفصل) وتغطي 95% من مناطق السكن. يبلغ طول الشبكة 50 كلم. تتوفر المدينة على محطة معالجة من نوع أحواض بكتيرية بطاقة 3036 م3/اليوم.'},
      { name: 'مدينة سبع عيون', text: 'مغطاة جزئيا بشبكة تطهير موحدة (حوالي 50% من مناطق السكن) باستثناء تجزئة أكدال التي تعتمد النظام المنفصل. الطول الإجمالي للشبكة الحالية حوالي 27.8 كلم. إطلاق صفقة أشغال التطهير جار من طرف الرادييم في إطار البرنامج الوطني للتطهير المدمج بتكلفة تقارب 130 مليون درهم.'},
      { name: 'مدينة أغوراي', text: 'تتوفر على شبكة تطهير مختلطة بحالة متواضعة بطول 23 كلم. نسبة الربط 40%. باقي السكان يستعملون الحفر الضائعة. يجري إعداد ملف طلب العروض لدراسة المخطط المديري للتطهير.'},
      { name: 'مدينة عين تاوجطات', text: 'شبكة مختلطة بطول يقارب 47 كلم. نسبة الربط 92%. تتوفر على محطة معالجة طبيعية منذ 2004 بمساحة 10 هكتارات تعالج 1500 م3/اليوم.'},
    ],
    ruralTitle: 'في الوسط القروي:',
    ruralPoints: [
      'الجماعات الأربع آيت يعزم، جحجوح، راس اجري، وآيت بوبيدمان تتوفر على شبكة تغطي كليا أو جزئيا المركز (الحفر الصحية تستعمل عند غياب الشبكة).',
      'الجماعات الثمان الباقية تتميز بتشتت السكن مما لا يشجع على إنجاز شبكة؛ يتم التخلص من المياه العادمة في حفر ضائعة.'
    ],
    solidTitle: '2. التطهير الصلب (تدبير النفايات)',
    solidIntro: 'في إطار إعداد المخطط المديري لتدبير النفايات المنزلية وشبه المنزلية بالإقليم، التزمت السلطة الإقليمية بتحسين استراتيجيتها مستهدفة الأهداف التالية:',
    solidObjectives: [ 'إحداث مطرح مراقب و3 مراكز تحويل وفق المعايير.', 'استغلال المطرح و3 مراكز التحويل من طرف مجموعة الجماعات الخضرة.', 'تأهيل 4 مطارح غير مراقبة.', 'إدماج جامعي النفايات في سياسة تقنين المهنة.' ],
    solidNote: 'لتنظيم وتحسين تدبير النفايات الصلبة بالمراكز الحضرية تم تفويض خدمات النظافة لشركة أوزون عبر طلب عروض مفتوح.',
    natureTitle: '3. طبيعة النفايات',
    natureIntro: 'النفايات المنتجة والمجمعة تُلقى في أربعة مطارح رئيسية وتشكل النفايات المنزلية 94% منها.',
    wasteHead: 'نوع النفايات',
    wasteHead2: 'النسبة',
    wasteRows: [ ['النفايات المنزلية','94,00%'], ['النفايات الاستشفائية','1,10%'], ['نفايات الأسواق','2,20%'], ['نفايات المجازر','0,55%'], ['النفايات الخضراء','1,10%'], ['النفايات الصناعية','0,55%'] ],
    wasteCaption: 'أنواع النفايات المتلقاة بمطرح الحاجب'
  };

  const t = isAr ? ar : fr;

  return (
    <div className="env-wrap" dir={dir}>
      <EnvStyle dir={dir} />
      <header className="env-hero">
        <h1 className="env-title">{t.title}</h1>

      </header>

      <section className="env-section" id="liquid">
        <h2>{t.liquidTitle}</h2>
        <p className="lead">{t.liquidIntro}</p>
        <ul className="bullet">{t.liquidBullets.map(b=> <li key={b}>{b}</li>)}</ul>
        {/* Connection (Urbain / Rural) table – replaced nano-grid with semantic table for better alignment */}
        <div className="connex-wrapper" aria-label={t.liquidConnexCaption}>
          <div className="connex-shell">
            <table className="connex" role="table">
              <thead>
                <tr>
                  {t.liquidConnexCols.map(c => <th key={c} scope="col">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {t.liquidConnexData.map((d,i)=> <td key={i}>{d}</td>)}
                </tr>
              </tbody>
              <caption>{t.liquidConnexCaption} – {t.liquidConnexHead}</caption>
            </table>
          </div>
        </div>
        <div className="city-cards">
          {t.cities.map(c=> (
            <article key={c.name} className="city-card">
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
        <div className="rural">
          <h3 className="rural-title">{t.ruralTitle}</h3>
          <ul className="bullet">{t.ruralPoints.map(p=> <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <section className="env-section" id="solid">
        <h2>{t.solidTitle}</h2>
        <p className="lead">{t.solidIntro}</p>
        <ul className="bullet">{t.solidObjectives.map(o=> <li key={o}>{o}</li>)}</ul>
        <p className="note">{t.solidNote}</p>
      </section>

      <section className="env-section" id="waste">
        <h2>{t.natureTitle}</h2>
        <p className="lead">{t.natureIntro}</p>
        <div className="waste-table">
          <div className="w-head">{t.wasteHead}</div>
          <div className="w-head">{t.wasteHead2}</div>
          {t.wasteRows.map((r,i)=> (
            <React.Fragment key={i}>
              <div className="w-cell type">{r[0]}</div>
              <div className="w-cell val">{r[1]}</div>
            </React.Fragment>
          ))}
        </div>
        <div className="w-cap">{t.wasteCaption}</div>
      </section>
    </div>
  );
}

function EnvStyle({dir}){return <style>{`
.env-wrap{--eco1:#0d9488;--eco2:#10b981;--eco3:#4ade80;--eco4:#84cc16;--ecoBg:#022c22;--glass:linear-gradient(135deg,rgba(255,255,255,.82),rgba(240,253,250,.65));padding:clamp(.9rem,2.4vw,3rem) clamp(1rem,3.2vw,3.6rem) 4rem;max-width:1500px;margin-inline:auto;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#064e3b;position:relative;}
.env-wrap:before{content:"";position:fixed;inset:0;background:radial-gradient(circle at 15% 25%,rgba(16,185,129,.18),transparent 60%),radial-gradient(circle at 85% 70%,rgba(132,204,22,.18),transparent 65%),linear-gradient(120deg,#022c22,#064e3b);z-index:-3;}
.env-wrap:after{content:"";position:fixed;inset:0;background:repeating-linear-gradient(45deg,rgba(255,255,255,.03) 0 10px,transparent 10px 20px);mix-blend-mode:overlay;pointer-events:none;z-index:-2;}
.env-hero{position:relative;text-align:center;padding:3.2rem 1rem 3.6rem;margin-bottom:2.4rem;overflow:hidden;border-radius:2rem;background:linear-gradient(140deg,#064e3b,#0d9488 40%,#10b981 65%,#4ade80);box-shadow:0 25px 60px -25px rgba(0,0,0,.55);}
.env-title{margin:0;font-size:clamp(1.9rem,4.5vw,3.4rem);font-weight:800;letter-spacing:.04em;background:linear-gradient(100deg,#ffffff,#d1fae5 40%,#bbf7d0);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 8px 20px rgba(0,0,0,.45));}
.env-tag{margin:.9rem 0 0;font-size:clamp(.65rem,1.15vw,.9rem);font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#ecfdf5;opacity:.9;}
.orb{position:absolute;border-radius:50%;filter:blur(40px) brightness(1.1);opacity:.55;mix-blend-mode:screen;animation:float 12s linear infinite;}
.orb-a{width:340px;height:340px;top:-120px;${dir==='rtl'?'left':'right'}:-90px;background:radial-gradient(circle at 30% 30%,#34d399,#0d9488 70%);} 
.orb-b{width:260px;height:260px;bottom:-80px;${dir==='rtl'?'right':'left'}:-60px;background:radial-gradient(circle at 70% 60%,#84cc16,#10b981 70%);} 
.orb-c{width:180px;height:180px;top:45%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle at 50% 50%,#ffffff,#a7f3d0 70%);animation-direction:reverse;}
@keyframes float{0%{transform:translateY(0) scale(1);}50%{transform:translateY(-40px) scale(1.05);}100%{transform:translateY(0) scale(1);} }
.env-section{margin-top:3rem;background:var(--glass);backdrop-filter:blur(28px) saturate(200%);-webkit-backdrop-filter:blur(28px) saturate(200%);border:1px solid #ffffff88;border-radius:1.8rem;padding:1.9rem 1.7rem 2.4rem;position:relative;overflow:hidden;box-shadow:0 20px 50px -22px rgba(0,0,0,.45);} 
.env-section:before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.7),transparent 60%);mix-blend-mode:overlay;pointer-events:none;}
.env-section h2{margin:0 0 1.3rem;font-size:clamp(1.1rem,2.3vw,1.85rem);font-weight:800;letter-spacing:.05em;color:#065f46;text-shadow:0 2px 8px rgba(0,0,0,.25);} 
.lead{font-size:.88rem;line-height:1.6;margin:0 0 1.15rem;font-weight:500;}
.bullet{margin:.55rem 0 1.6rem;padding-${dir==='rtl'?'right':'left'}:1.2rem;display:flex;flex-direction:column;gap:.6rem;font-size:.82rem;}
.bullet li{position:relative;}
.bullet li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-1.05rem;top:.48rem;width:.55rem;height:.55rem;border-radius:50%;background:linear-gradient(145deg,#4ade80,#10b981,#0d9488);box-shadow:0 0 0 2px #fff inset,0 0 0 1px #0d948855;}
.connex-wrapper{margin:1.8rem 0 2.2rem;}
.connex-shell{border-radius:1.2rem;box-shadow:0 10px 34px -18px rgba(0,0,0,.3);overflow:hidden;background:#ecfdf5;border:1px solid #0d948840;}
.connex{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;font-size:.88rem;}
.connex thead th{background:linear-gradient(135deg,#0d9488,#10b981);color:#fff;font-weight:700;letter-spacing:.06em;padding:.8rem .95rem;text-align:center;font-size:.86rem;}
.connex tbody td{padding:.75rem .85rem;text-align:center;font-weight:700;color:#0d9488;background:#ffffff;border-top:1px solid #0d948822;}
.connex tbody td+td{border-left:1px solid #0d948822;}
.connex caption{caption-side:bottom;padding:.7rem .95rem;font-size:.72rem;font-weight:600;color:#065f46;background:#f0fdfa;letter-spacing:.05em;}
.city-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:1.2rem;margin-top:2rem;max-width:1300px;margin-inline:auto;}
.city-card{position:relative;flex:0 1 280px;max-width:280px;padding:1.15rem 1.05rem 1.25rem;border:1px solid #0d948833;border-radius:1.1rem;background:linear-gradient(150deg,#ffffffcc,#f0fdf480 60%,#ecfdf5cc);box-shadow:0 10px 28px -16px rgba(0,0,0,.28);overflow:hidden;}
.city-card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 75% 15%,rgba(74,222,128,.35),transparent 65%);mix-blend-mode:overlay;pointer-events:none;}
.city-card h3{margin:0 0 .6rem;font-size:.88rem;font-weight:800;letter-spacing:.05em;color:#0d9488;}
.city-card p{margin:0;font-size:.78rem;line-height:1.65;font-weight:500;}
.rural{margin-top:2rem;}
.rural-title{margin:0 0 .75rem;font-size:.88rem;font-weight:800;letter-spacing:.05em;color:#0d9488;text-transform:uppercase;}
.note{font-size:.85rem;line-height:1.65;margin-top:1rem;font-weight:500;background:linear-gradient(120deg,#d1fae5,#ecfdf5);padding:1rem 1.1rem;border:1px solid #0d948833;border-radius:1rem;}
.waste-table{margin:1.5rem 0;border:1px solid #0d948840;border-radius:1.2rem;display:grid;grid-template-columns:1fr auto;overflow:hidden;background:#ecfdf5;font-size:.78rem;}
.w-head{background:linear-gradient(135deg,#0d9488,#10b981);color:#fff;font-weight:700;letter-spacing:.06em;padding:.7rem .85rem;text-align:${dir==='rtl'?'right':'left'};}
.w-cell{padding:.6rem .7rem;border-top:1px solid #0d948822;display:flex;align-items:center;}
.w-cell.type{font-weight:600;}
.w-cell.val{font-weight:800;color:#0d9488;justify-content:center;min-width:90px;}
.w-cap{text-align:center;font-size:.78rem;font-weight:600;letter-spacing:.04em;background:#f0fdfa;padding:.65rem .9rem;border:1px solid #0d948822;border-radius:.9rem;}
@media (max-width:820px){
  .env-section{padding:1.35rem 1.05rem 1.8rem;border-radius:1.3rem;}
  .city-cards{grid-template-columns:1fr;}
  .bullet{font-size:.75rem;}
  .lead{font-size:.8rem;}
  .city-card p{font-size:.7rem;}
  .connex{font-size:.8rem;}
  .connex thead th{font-size:.76rem;}
  .connex caption{font-size:.66rem;}
  .env-title{font-size:clamp(1.8rem,7vw,2.8rem);}
}
@media (prefers-color-scheme: dark){
  .env-wrap:before{background:radial-gradient(circle at 15% 25%,rgba(16,185,129,.25),transparent 60%),radial-gradient(circle at 85% 70%,rgba(132,204,22,.25),transparent 65%),linear-gradient(120deg,#022c22,#065f46);} 
  .env-section{background:linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,253,244,.78));}
}
`}</style>;}
