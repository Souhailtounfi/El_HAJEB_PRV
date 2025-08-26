
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

//Environment page
export default function Environnement() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl' : 'ltr';
  useEffect(() => { document.documentElement.dir = dir; }, [dir]);

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
    liquidConnexCols: ['URBAIN', 'RURAL'],
    liquidConnexData: ['90%', '30%'],
    liquidConnexCaption: 'Division des programmes et de l’Equipement (année 2015)',
    cities: [
      { name: 'Ville d’EL HAJEB', text: 'dotée d’un réseau d’assainissement liquide de type unitaire (à l’exception du Lotissement AL OMRANE 1 qui est assaini en système séparatif) qui couvre 95% des zones d’habitats. Le linéaire total de ce réseau s’élève à 50 km. La ville dispose d’une STEP de type lit bactérien. Le débit des eaux usées épurées est 3036 m³/j.' },
      { name: 'Ville de SEBAA AYOUNE', text: 'est partiellement couvert par un réseau d’assainissement liquide de type unitaire (environ 50% de zones d’habitat), et ce à l’exception du lotissement AGDAL qui assaini en séparatif. Le linéaire total du réseau existant est de l’ordre de 27,8 km. Le lancement du marché des travaux d’assainissement (réseau et STEP) est en cours par la RADEEM dans le cadre du Programme Nationale de l’assainissement mutualisé (PNAM) dont le coût global est de l’ordre de 130 MDH.' },
      { name: 'Ville d’AGOURAI', text: 'elle est dotée d’un réseau d’assainissement liquide de type mixte en modeste état, avec un linéaire de 23 km. Le taux de raccordement est de 40%. Le reste de la population utilise des puits perdus. La préparation du dossier d’offres pour la réalisation de l’étude du schéma directeur d’assainissement liquide de la ville est en cours.' },
      { name: 'Ville d’AIN TAOUJDATE', text: 'il est de type mixte. Le linéaire du réseau a atteint presque 47 km. Le taux de raccordement au réseau d’assainissement est 92%. La ville a été dotée d’une station d’épuration de type lagunage naturel qui est en service depuis 2004. Elle est située à environ 3 km au nord de la ville et s’étend sur une superficie d’environ 10 Ha. Cette station permet de traiter un volume de 1500 m³/j d’eaux usées.' },
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
      ['ORDURES MÉNAGÈRES', '94,00%'],
      ['DÉCHETS HOSPITALIERS', '1,10%'],
      ['DÉCHETS DES MARCHÉS', '2,20%'],
      ['DÉCHETS DES ABATTOIRS', '0,55%'],
      ['DÉCHETS VERTS', '1,10%'],
      ['DÉCHETS INDUSTRIELS', '0,55%'],
    ],
    wasteCaption: 'Types des déchets reçus au niveau de la décharge d’EL HAJEB'
  };

  /* ----------------------------- AR CONTENT ----------------------------- */
  const ar = {
    title: 'البيئة',
    liquidTitle: '1. التطهير السائل',
    liquidIntro: 'تم بذل مجهودات هامة لرفع ما يلي:',
    liquidBullets: ['مستويات الربط بشبكة التطهير', 'مستويات معالجة المياه العادمة'],
    liquidConnexHead: 'سنة 2015',
    liquidConnexCols: ['حضري', 'قروي'],
    liquidConnexData: ['90%', '30%'],
    liquidConnexCaption: 'قسم البرامج والتجهيز (سنة 2015)',
    cities: [
      { name: 'مدينة الحاجب', text: 'تتوفر على شبكة تطهير سائل من النوع الموحد (باستثناء تجزئة العمران 1 التي تعتمد النظام المنفصل) وتغطي 95% من مناطق السكن. يبلغ طول الشبكة 50 كلم. تتوفر المدينة على محطة معالجة من نوع أحواض بكتيرية بطاقة 3036 م3/اليوم.' },
      { name: 'مدينة سبع عيون', text: 'مغطاة جزئيا بشبكة تطهير موحدة (حوالي 50% من مناطق السكن) باستثناء تجزئة أكدال التي تعتمد النظام المنفصل. الطول الإجمالي للشبكة الحالية حوالي 27.8 كلم. إطلاق صفقة أشغال التطهير جار من طرف الرادييم في إطار البرنامج الوطني للتطهير المدمج بتكلفة تقارب 130 مليون درهم.' },
      { name: 'مدينة أغوراي', text: 'تتوفر على شبكة تطهير مختلطة بحالة متواضعة بطول 23 كلم. نسبة الربط 40%. باقي السكان يستعملون الحفر الضائعة. يجري إعداد ملف طلب العروض لدراسة المخطط المديري للتطهير.' },
      { name: 'مدينة عين تاوجطات', text: 'شبكة مختلطة بطول يقارب 47 كلم. نسبة الربط 92%. تتوفر على محطة معالجة طبيعية منذ 2004 بمساحة 10 هكتارات تعالج 1500 م3/اليوم.' },
    ],
    ruralTitle: 'في الوسط القروي:',
    ruralPoints: [
      'الجماعات الأربع آيت يعزم، جحجوح، راس اجري، وآيت بوبيدمان تتوفر على شبكة تغطي كليا أو جزئيا المركز (الحفر الصحية تستعمل عند غياب الشبكة).',
      'الجماعات الثمان الباقية تتميز بتشتت السكن مما لا يشجع على إنجاز شبكة؛ يتم التخلص من المياه العادمة في حفر ضائعة.'
    ],
    solidTitle: '2. التطهير الصلب (تدبير النفايات)',
    solidIntro: 'في إطار إعداد المخطط المديري لتدبير النفايات المنزلية وشبه المنزلية بالإقليم، التزمت السلطة الإقليمية بتحسين استراتيجيتها مستهدفة الأهداف التالية:',
    solidObjectives: ['إحداث مطرح مراقب و3 مراكز تحويل وفق المعايير.', 'استغلال المطرح و3 مراكز التحويل من طرف مجموعة الجماعات الخضرة.', 'تأهيل 4 مطارح غير مراقبة.', 'إدماج جامعي النفايات في سياسة تقنين المهنة.'],
    solidNote: 'لتنظيم وتحسين تدبير النفايات الصلبة بالمراكز الحضرية تم تفويض خدمات النظافة لشركة أوزون عبر طلب عروض مفتوح.',
    natureTitle: '3. طبيعة النفايات',
    natureIntro: 'النفايات المنتجة والمجمعة تُلقى في أربعة مطارح رئيسية وتشكل النفايات المنزلية 94% منها.',
    wasteHead: 'نوع النفايات',
    wasteHead2: 'النسبة',
    wasteRows: [
      ['النفايات المنزلية', '94,00%'],
      ['النفايات الاستشفائية', '1,10%'],
      ['نفايات الأسواق', '2,20%'],
      ['نفايات المجازر', '0,55%'],
      ['النفايات الخضراء', '1,10%'],
      ['النفايات الصناعية', '0,55%']
    ],
    wasteCaption: 'أنواع النفايات المتلقاة بمطرح الحاجب'
  };

  const t = isAr ? ar : fr;

  return (
    <div className="env-wrap" dir={dir}>
      <EnvWhiteStyle dir={dir} />
      <header className="env-hero">
        <h1 className="env-title">{t.title}</h1>
      </header>

      <section className="env-section" id="liquid">
        <h2>{t.liquidTitle}</h2>
        <p className="lead">{t.liquidIntro}</p>
        <ul className="bullet">{t.liquidBullets.map(b => <li key={b}>{b}</li>)}</ul>
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
                  {t.liquidConnexData.map((d, i) => <td key={i}>{d}</td>)}
                </tr>
              </tbody>
              <caption>{t.liquidConnexCaption} – {t.liquidConnexHead}</caption>
            </table>
          </div>
        </div>
        <div className="city-cards">
          {t.cities.map(c => (
            <article key={c.name} className="city-card">
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
        <div className="rural">
          <h3 className="rural-title">{t.ruralTitle}</h3>
          <ul className="bullet">{t.ruralPoints.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <section className="env-section" id="solid">
        <h2>{t.solidTitle}</h2>
        <p className="lead">{t.solidIntro}</p>
        <ul className="bullet">{t.solidObjectives.map(o => <li key={o}>{o}</li>)}</ul>
        <p className="note">{t.solidNote}</p>
      </section>

      <section className="env-section" id="waste">
        <h2>{t.natureTitle}</h2>
        <p className="lead">{t.natureIntro}</p>
        <div className="waste-table">
          <div className="w-head">{t.wasteHead}</div>
          <div className="w-head">{t.wasteHead2}</div>
          {t.wasteRows.map((r, i) => (
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

// White, clean, card-based style for Environnement page
function EnvWhiteStyle({ dir }) {
  return <style>{`
  .env-wrap {
    background: #f7f7fa;
    padding: clamp(1.2rem, 3vw, 3.5rem) clamp(1.2rem, 4vw, 4rem) 4rem;
    max-width: 1500px;
    margin-inline: auto;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    color: #222;
    min-height: 100vh;
  }
  .env-hero {
    background: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px -12px rgba(0,0,0,0.10);
    text-align: center;
    padding: 2.5rem 1rem 2.5rem;
    margin-bottom: 2.2rem;
  }
  .env-title {
    margin: 0;
    font-size: clamp(2.1rem, 5vw, 3.2rem);
    font-weight: 800;
    letter-spacing: .04em;
    color: #1e293b;
    text-shadow: 0 2px 8px rgba(0,0,0,.07);
  }
  .env-section {
    margin-top: 2.2rem;
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 4px 24px -8px rgba(0,0,0,0.08);
    padding: 1.7rem 1.3rem 2.1rem;
    position: relative;
    overflow: hidden;
  }
  .env-section h2 {
    margin: 0 0 1.1rem;
    font-size: clamp(1.1rem, 2.3vw, 1.7rem);
    font-weight: 800;
    color: #2563eb;
    letter-spacing: .04em;
  }
  .lead {
    font-size: .97rem;
    line-height: 1.6;
    margin: 0 0 1.1rem;
    font-weight: 500;
    color: #334155;
  }
  .bullet {
    margin: .5rem 0 1.3rem;
    padding-${dir === 'rtl' ? 'right' : 'left'}: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    font-size: .92rem;
    color: #222;
  }
  .bullet li {
    position: relative;
  }
  .bullet li:before {
    content: "";
    position: absolute;
    ${dir === 'rtl' ? 'right' : 'left'}: -0.9rem;
    top: .55rem;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: #2563eb;
    box-shadow: 0 0 0 2px #fff inset, 0 0 0 1px #2563eb33;
  }
  .connex-wrapper {
    margin: 1.3rem 0 1.7rem;
  }
  .connex-shell {
    border-radius: 1rem;
    box-shadow: 0 4px 18px -8px rgba(0,0,0,.07);
    overflow: hidden;
    background: #f3f6fa;
    border: 1px solid #e0e7ef;
  }
  .connex {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    font-size: .95rem;
  }
  .connex thead th {
    background: #2563eb;
    color: #fff;
    font-weight: 700;
    letter-spacing: .06em;
    padding: .7rem .9rem;
    text-align: center;
    font-size: .93rem;
  }
  .connex tbody td {
    padding: .7rem .8rem;
    text-align: center;
    font-weight: 700;
    color: #2563eb;
    background: #fff;
    border-top: 1px solid #e0e7ef;
  }
  .connex tbody td+td {
    border-left: 1px solid #e0e7ef;
  }
  .connex caption {
    caption-side: bottom;
    padding: .6rem .9rem;
    font-size: .78rem;
    font-weight: 600;
    color: #64748b;
    background: #f3f6fa;
    letter-spacing: .04em;
  }
  .city-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.1rem;
    margin-top: 1.5rem;
    max-width: 1300px;
    margin-inline: auto;
  }
  .city-card {
    position: relative;
    flex: 0 1 270px;
    max-width: 270px;
    padding: 1.1rem 1rem 1.2rem;
    border: 1px solid #e0e7ef;
    border-radius: 1rem;
    background: #f9fafb;
    box-shadow: 0 2px 10px -4px rgba(0,0,0,.06);
    overflow: hidden;
  }
  .city-card h3 {
    margin: 0 0 .5rem;
    font-size: .97rem;
    font-weight: 800;
    color: #2563eb;
    letter-spacing: .04em;
  }
  .city-card p {
    margin: 0;
    font-size: .87rem;
    line-height: 1.6;
    font-weight: 500;
    color: #222;
  }
  .rural {
    margin-top: 1.5rem;
  }
  .rural-title {
    margin: 0 0 .6rem;
    font-size: .97rem;
    font-weight: 800;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .note {
    font-size: .93rem;
    line-height: 1.6;
    margin-top: 1rem;
    font-weight: 500;
    background: #f3f6fa;
    padding: 1rem 1.1rem;
    border: 1px solid #e0e7ef;
    border-radius: 1rem;
    color: #222;
  }
  .waste-table {
    margin: 1.2rem 0;
    border: 1px solid #e0e7ef;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 1fr auto;
    overflow: hidden;
    background: #f9fafb;
    font-size: .87rem;
  }
  .w-head {
    background: #2563eb;
    color: #fff;
    font-weight: 700;
    letter-spacing: .06em;
    padding: .7rem .8rem;
    text-align: ${dir === 'rtl' ? 'right' : 'left'};
  }
  .w-cell {
    padding: .6rem .7rem;
    border-top: 1px solid #e0e7ef;
    display: flex;
    align-items: center;
    color: #222;
  }
  .w-cell.type {
    font-weight: 600;
  }
  .w-cell.val {
    font-weight: 800;
    color: #2563eb;
    justify-content: center;
    min-width: 90px;
  }
  .w-cap {
    text-align: center;
    font-size: .87rem;
    font-weight: 600;
    letter-spacing: .04em;
    background: #f3f6fa;
    padding: .6rem .9rem;
    border: 1px solid #e0e7ef;
    border-radius: .9rem;
    color: #64748b;
    margin-top: 1rem;
  }
  @media (max-width: 820px) {
    .env-section {
      padding: 1.1rem .7rem 1.3rem;
      border-radius: .9rem;
    }
    .city-cards {
      flex-direction: column;
      align-items: center;
    }
    .bullet {
      font-size: .85rem;
    }
    .lead {
      font-size: .89rem;
    }
    .city-card p {
      font-size: .8rem;
    }
    .connex {
      font-size: .87rem;
    }
    .connex thead th {
      font-size: .85rem;
    }
    .connex caption {
      font-size: .7rem;
    }
    .env-title {
      font-size: clamp(1.7rem, 7vw, 2.3rem);
    }
  }
  `}</style>;
}
