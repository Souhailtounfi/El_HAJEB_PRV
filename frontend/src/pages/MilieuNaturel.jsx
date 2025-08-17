import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageSidebar from "../components/PageSidebar";
import mn1 from "../assets/mn1.png";
import mn2 from "../assets/mn2.png";
import mn3 from "../assets/mn3.png";
import mn4 from "../assets/mn4.png";
import mn5 from "../assets/mn5.png";
import mn6 from "../assets/mn6.png";
import mn7 from "../assets/mn7.png";
import mn8 from "../assets/mn8.png";

const SLUG = "milieu-naturel";

export default function MilieuNaturel() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  useEffect(() => {
    const h = document.querySelector(
      ".site-header, header, .main-nav, #mainNav"
    );
    if (h) {
      document.documentElement.style.setProperty(
        "--header-height",
        h.getBoundingClientRect().height + "px"
      );
    }
  }, [lang]);

  const fr = {
    title: "Milieu Naturel",
    section1: "Unités Morphologiques",
    intro1:
      "L'appellation du causse d'EL HAJEB doit son nom à sa structure faite de couches (ondulée ou feuilletée) avec une succession de plateaux diversement étagés. L'altitude oscille entre 1100 et 1500 mètres.",
    intro2:
      "Bien que l'impression de montagne soit forte, la Province d'EL HAJEB est formée en partie par la plaine de SAÏS, qui en constitue la partie la plus fertile.",
    intro3:
      "Sa partie sud, sud-ouest et sud-est est constituée par les premiers contreforts du MOYEN ATLAS.",
    section2: "Climat",
    climateIntro:
      "Le climat est l'un des facteurs déterminants de la physionomie de l'économie locale. Il est de type modéré, semi-continental type méditerranéen.",
    climateListTitle: "Principales caractéristiques :",
    climate: [
      "Moyenne des précipitations sur 10 ans : 520 mm",
      "Moyenne des températures minimales : 16°C",
      "Moyenne des températures maximales : 34°C",
      "L'altitude oscille entre 800 et 1450 mètres",
      "La moyenne des jours de brouillard ne dépasse guère les 10 jours"
    ],
    climateExtra1:
      "L'insolation réalise de bonnes performances atteignant des maximums pour les mois de juillet et d'août.",
    climateExtra2:
      "La province connaît également de fréquentes chutes de neige surtout pendant les mois de janvier et février (entre 5 et 10 cm).",
    climateExtra3:
      "Les vents de l'ouest sont les plus fréquents notamment en hiver; des vents chauds de type chergui soufflent au début de l'été.",
    sectionWater: "Ressources en Eau",
    surfaceWaterTitle: "Ressources en Eau Superficielle",
    surfaceWaterTableHead: [
      "Eaux superficielles",
      "Capacité / Nombre / Profondeur",
      "Débit"
    ],
    surfaceWaterRows: [
      { k: "Barrage colliniaire", c: "300 000 m³", d: "-" },
      { k: "Sources en eau", c: "17", d: "5 m³/s" },
      { k: "Oueds", c: "4", d: "2 m³/s" },
      { k: "Stations de pompage", c: "5000 U", d: "-" },
      { k: "Puits non équipés", c: "1350 U", d: "-" },
      { k: "Profondeur de la nappe", c: "70 m", d: "-" }
    ],
    mainOueds:
      "Quatre principaux oueds : DFAI, EL WAARE, AFERRANE, BOUA JIR, ils forment en plus de l'oued BOUFERRANE, des affluents de l'oued BEHT, d'un débit moyen de 2 m³/s.",
    sourcesListTitle: "Sources",
    sourcesTableHead: ["Sources", "Quantité moyenne (L/s)",],
    sourcesRows: [
      { s: "BITITT", q: "1700" },
      { s: "AIN BLOUSE", q: "400" },
      { s: "RIBAA AMONT", q: "680" },
      { s: "RIBAA AVAL", q: "380" },
      { s: "AIN ATROUS", q: "100" }
    ],
    sourcesNote:
      "Les années récentes, marquées par un déficit pluviométrique, ont entraîné une baisse significative des débits de ces sources, qui se sont considérablement réduits.",
    hydroTitle: "Cadre Hydrogéologie",
    hydroIntro:
      "Deux domaines sont à considérer : le causse d'AGOURAI, le causse d'EL HAJEB et le bassin de Meknès.",
    hydroBullets: [
      "Causse d'AGOURAI : La profondeur du niveau d'eau de la nappe est extrêmement variable. Elle peut passer facilement de quelques mètres à plus de 100 m.",
      "Causse d'EL HAJEB : Ce réservoir considéré comme nappe libre, est alimenté par les précipitations. La nappe circule du sud vers le nord à travers les fissures et les karsts donnant naissance à de nombreuses sources qui se déversent dans le bassin de Saïs.",
      "Bassin de MEKNÈS : On distingue deux importants aquifères : la nappe phréatique des formations plio-quaternaires et la nappe profonde des calcaires et dolomie du bas.",
      "Nappe phréatique : Alimentée par des infiltrations des eaux de pluie et d'irrigations issues des sources des causses, cette nappe circule principalement dans les sables, les conglomérats et localement dans les calcaires lacustres; le niveau hydrodynamique de la nappe est variable, elle peut rester aux environs de 30 m dans la région de AIN TAOUJDATE et en bordure du causse; le drainage des cours d'eau, les sources et les prélèvements constituent les principaux exutoires de la nappe. L'utilisation des eaux de cet aquifère est destinée à l'irrigation et à l'alimentation en eau potable dans la plaine.",
      "Nappe profonde : Alimentée par les précipitations qui s'infiltrent sur les causses moyens atlasiques, les calcaires et les dolomies du bas constituent d'abord un aquifère à nappe libre sur les causses et en bordure, puis captifs sous les formations imperméables du tertiaire au niveau de la plaine."
    ],
    img1Cap: "Plaine à EL HAJEB",
    img2Cap: "Plaine à Tamchachat"
  };

  const ar = {
    title: "المحيط الطبيعي",
    section1: "الوحدات المورفولوجية",
    intro1:
      "تستمد تسمية هضبة الحاجب من بنيتها المكوّنة من طبقات متموجة أو صفائحية مع تعاقب لعدد من الهضاب المتدرجة. يتراوح الارتفاع بين 1100 و1500 متر.",
    intro2:
      "رغم الانطباع الجبلي القوي، يتكون إقليم الحاجب جزئيا من سهل سايس الذي يشكل الجزء الأكثر خصوبة.",
    intro3:
      "يشكل الجزء الجنوبي والجنوبي الغربي والجنوبي الشرقي بدايات السفوح الأولى للأطلس المتوسط.",
    section2: "المناخ",
    climateIntro:
      "يعد المناخ من العوامل المحددة لملامح الاقتصاد المحلي. فهو معتدل شبه قاري من النمط المتوسطي.",
    climateListTitle: "الخصائص الرئيسية:",
    climate: [
      "معدل التساقطات خلال 10 سنوات: 520 ملم",
      "متوسط درجات الحرارة الصغرى: 16°م",
      "متوسط درجات الحرارة الكبرى: 34°م",
      "يتراوح الارتفاع بين 800 و1450 متراً",
      "متوسط أيام الضباب لا يتجاوز 10 أيام"
    ],
    climateExtra1:
      "تحقق الإشعاع الشمسي مستويات مرتفعة خاصة في شهري يوليوز وغشت.",
    climateExtra2:
      "تعرف الإقليم تساقطات ثلجية متكررة خصوصاً في شهري يناير وفبراير (بين 5 و 10 سم).",
    climateExtra3:
      "الرياح الغربية هي الأكثر تكراراً خصوصاً في الشتاء؛ بينما تهب رياح الشركي الحارة في بداية الصيف.",
    sectionWater: "الموارد المائية",
    surfaceWaterTitle: "الموارد السطحية",
    surfaceWaterTableHead: [
      "المياه السطحية",
      "القدرة / العدد / العمق",
      "الصبيب"
    ],
    surfaceWaterRows: [
      { k: "السد التلي", c: "300 000 م³", d: "-" },
      { k: "الينابيع", c: "17", d: "5 م³/ث" },
      { k: "الأودية", c: "4", d: "2 م³/ث" },
      { k: "محطات الضخ", c: "5000 وحدة", d: "-" },
      { k: "الآبار غير المجهزة", c: "1350 وحدة", d: "-" },
      { k: "عمق الطبقة", c: "70 م", d: "-" }
    ],
    mainOueds:
      "أربعة أودية رئيسية: دفال، الواعر، أفران، بواجير إضافة إلى وادي بوفيرران، وهي روافد لوادي بهت بمتوسط صبيب 2 م³/ث.",
    sourcesListTitle: "العيون",
    sourcesTableHead: ["العيون", "الصبيب المتوسط (ل/ث)",],
    sourcesRows: [
      { s: "بيتيت", q: "1700" },
      { s: "عين بلوس", q: "400" },
      { s: "ريبا أعلى", q: "680" },
      { s: "ريبا أسفل", q: "380" },
      { s: "عين عطروس", q: "100" }
    ],
    sourcesNote:
      "الأعوام الأخيرة التي تميزت بعجز مطري أدت إلى انخفاض ملحوظ في صبيب هذه العيون وتقليصها بشكل كبير.",
    hydroTitle: "الإطار الهيدروجيولوجي",
    hydroIntro:
      "مجالان أساسيان: حافة أغوراي، حافة الحاجب وحوض مكناس.",
    hydroBullets: [
      "حافة أغوراي: عمق مستوى المياه الجوفية متغير جداً ويمكن أن يتراوح من بضعة أمتار إلى أكثر من 100 م.",
      "حافة الحاجب: خزان مائي حر تغذيه التساقطات، تتحرك مياهه من الجنوب نحو الشمال عبر الشقوق والكهوف الكارستية مولدةً ينابيع عديدة تصب في حوض سايس.",
      "حوض مكناس: يضم مَخزونين هامين: الطبقة السطحية لتكوينات البليو-الرباعية والطبقة العميقة من الكلس والدولوميت السفلي.",
      "الطبقة السطحية: تُغذى بتسرب مياه الأمطار والري، وتجري في الرمال والحصى وأحياناً في الكلسيات البحيرية؛ المنسوب الهيدروديناميكي متغير وقد يبقى في حدود 30 م بمنطقة عين تاوجدات وحواف الحافة؛ تصريف الأودية والينابيع والاستغلالات تشكل منافذها الرئيسية وتستعمل مياهها للسقي والشرب.",
      "الطبقة العميقة: تُغذى بتساقطات تتسرب عبر الحافات الكلسية للأطلس المتوسط وتشكل الكلسيات والدولوميات خزاناً حراً على الحافات ثم أسيراً تحت التكوينات غير المنفذة في السهل." 
    ],
    img1Cap: "سهل بالحاجب",
    img2Cap: "سهل تمشاشت"
  };

  const t = isAr ? ar : fr;

  return (
    <div className="pg-shell geo-static-shell" dir={dir}>
      <MNStyle />
      <div className="geo-layout">
        <main className="geo-main">
          <header className="geo-head">
            <h1 className="geo-title">{t.title}</h1>
            <div className="geo-sep" />
          </header>
          <article className="geo-article" dir={dir} id="milieu-naturel">
            <section className="mn-section">
              <h2 className="mn-sec-title">{t.section1}</h2>
              <p className="mn-p">{t.intro1}</p>
              <p className="mn-p">{t.intro2}</p>
              <p className="mn-p">{t.intro3}</p>
            </section>
            <section className="mn-section">
              <h2 className="mn-sec-title">{t.section2}</h2>
              <p className="mn-p">{t.climateIntro}</p>
              <p className="mn-list-title">{t.climateListTitle}</p>
              <ul className="mn-list">
                {t.climate.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <p className="mn-p">{t.climateExtra1}</p>
              <p className="mn-p">{t.climateExtra2}</p>
              <p className="mn-p">{t.climateExtra3}</p>
            </section>
            <div className="mn-gallery">
              <figure className="mn-fig"><div className="mn-media"><img src={mn1} alt={t.img1Cap} loading="lazy" /></div><figcaption className="mn-cap">{t.img1Cap}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn2} alt={t.img2Cap} loading="lazy" /></div><figcaption className="mn-cap">{t.img2Cap}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn3} alt="Water resource 1" loading="lazy" /></div><figcaption className="mn-cap">{isAr ? "مورد مائي" : "Ressource en eau"}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn4} alt="Water resource 2" loading="lazy" /></div><figcaption className="mn-cap">{isAr ? "منظر طبيعي" : "Paysage naturel"}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn5} alt="Water resource 3" loading="lazy" /></div><figcaption className="mn-cap">{isAr ? "مورد مائي" : "Ressource en eau"}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn6} alt="Natural landscape 2" loading="lazy" /></div><figcaption className="mn-cap">{isAr ? "منظر طبيعي" : "Paysage naturel"}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn7} alt="Source d'eau" loading="lazy" /></div><figcaption className="mn-cap">{isAr ? "عين مائية" : "Source d'eau"}</figcaption></figure>
              <figure className="mn-fig"><div className="mn-media"><img src={mn8} alt="Cours d'eau" loading="lazy" /></div><figcaption className="mn-cap">{isAr ? "مجرى مائي" : "Cours d'eau"}</figcaption></figure>
            </div>

            <section className="mn-section">
              <h2 className="mn-sec-title">{t.sectionWater}</h2>
              <h3 className="mn-sub-title">{t.surfaceWaterTitle}</h3>
              <div className="mn-table-wrapper">
                <table className="mn-table" aria-label={t.surfaceWaterTitle}>
                  <thead>
                    <tr>
                      {t.surfaceWaterTableHead.map((h,i)=>(<th key={i}>{h}</th>))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.surfaceWaterRows.map((r,i)=>(
                      <tr key={i}>
                        <td data-label={t.surfaceWaterTableHead[0]}>{r.k}</td>
                        <td data-label={t.surfaceWaterTableHead[1]}>{r.c}</td>
                        <td data-label={t.surfaceWaterTableHead[2]}>{r.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mn-p">{t.mainOueds}</p>
              <p className="mn-list-title">{t.sourcesListTitle}</p>
              <div className="mn-table-wrapper">
                <table className="mn-table" aria-label={t.sourcesListTitle}>
                  <thead>
                    <tr>
                      {t.sourcesTableHead.map((h,i)=>(<th key={i}>{h}</th>))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.sourcesRows.map((r,i)=>(
                      <tr key={i}>
                        <td data-label={t.sourcesTableHead[0]}>{r.s}</td>
                        <td data-label={t.sourcesTableHead[1]}>{r.q}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mn-p">{t.sourcesNote}</p>
            </section>
            <section className="mn-section">
              <h2 className="mn-sec-title">{t.hydroTitle}</h2>
              <p className="mn-p">{t.hydroIntro}</p>
              <ul className="mn-list mn-hydro">
                {t.hydroBullets.map((b,i)=>(<li key={i}>{b}</li>))}
              </ul>
            </section>
          </article>
        </main>
        <aside className="geo-side">
          <PageSidebar lang={lang} slug={SLUG} theme="light" />
        </aside>
      </div>
    </div>
  );
}

function MNStyle(){
  return (
    <style>{`
    .pg-shell.geo-static-shell {min-height:100vh;padding:4.5rem clamp(1rem,3vw,3rem) 6rem;background:
      radial-gradient(circle at 12% 18%,#ecfdf5,transparent 65%),
      radial-gradient(circle at 85% 82%,#d1fae5,transparent 70%),
      linear-gradient(125deg,#ffffff,#f0fdf4 55%,#e6fcf3);}
    .geo-layout{display:grid;grid-template-columns:1fr;gap:3.2rem;max-width:1350px;margin:0 auto;}
    @media (min-width:1280px){.geo-layout{grid-template-columns:minmax(0,1fr) 330px;}}
    .geo-head{margin:0 0 1.6rem;}
    .geo-title{margin:0;font-size:clamp(2.2rem,4.5vw,3.25rem);font-weight:800;line-height:1.05;background:linear-gradient(90deg,#047857,#059669 35%,#10b981 70%);-webkit-background-clip:text;color:transparent;}
    .geo-sep{height:4px;width:100%;margin-top:.9rem;background:linear-gradient(90deg,transparent,#10b981,#34d399 70%,transparent);border-radius:2rem;}
    .geo-article{position:relative;background:#fff;border:1px solid #e5e7eb;border-radius:2rem;padding:clamp(1.5rem,2.4vw,2.7rem);box-shadow:0 6px 18px rgba(0,0,0,0.08);}
    .mn-section + .mn-section{margin-top:2.9rem;}
    .mn-sec-title{margin:0 0 1rem;font-size:clamp(1.45rem,2.2vw,2.05rem);font-weight:800;background:linear-gradient(90deg,#065f46,#10b981);-webkit-background-clip:text;color:transparent;}
    .mn-sub-title{margin:0 0 .9rem;font-size:clamp(1.05rem,1.8vw,1.35rem);font-weight:700;color:#047857;}
    .mn-p{font-size:1rem;line-height:1.65;color:#1f2937;font-weight:500;margin:0 0 1rem;}
    .mn-list-title{margin:1.2rem 0 .4rem;font-weight:700;color:#065f46;font-size:.95rem;}
    .mn-list{margin:0 0 1.6rem;padding-inline-start:1.3rem;display:grid;gap:.55rem;color:#065f46;font-weight:500;}
    [dir='rtl'] .mn-list{padding-inline-start:0;padding-inline-end:1.3rem;}
    .mn-list li::marker{color:#10b981;}
    .mn-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin:2.8rem 0 0;}
    .mn-fig{margin:0;display:flex;flex-direction:column;gap:.5rem;}
    .mn-media{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:1.15rem;box-shadow:0 6px 20px -8px rgba(0,0,0,.18);background:#f1f5f9;}
    .mn-media img{width:100%;height:100%;object-fit:cover;display:block;}
    .mn-cap{font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:#065f46;text-align:center;}
    /* Tables */
    .mn-table-wrapper{width:100%;overflow-x:auto;background:linear-gradient(135deg,#ffffff 0%,#f0fdf4 70%);border:1px solid #e2e8f0;border-radius:1.1rem;padding:1rem;margin:0 0 1.4rem;box-shadow:0 4px 14px -4px rgba(0,0,0,.08);}
    .mn-table{width:100%;border-collapse:collapse;font-size:.85rem;min-width:520px;}
    .mn-table th,.mn-table td{border:1px solid #d1d5db;padding:.6rem .75rem;text-align:start;}
    [dir='rtl'] .mn-table th,[dir='rtl'] .mn-table td{text-align:right;}
    .mn-table th{background:#065f46;color:#ecfdf5;font-weight:700;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;}
    .mn-table tbody tr:nth-child(even){background:#f9fafb;}
    .mn-table tbody tr:hover{background:#ecfdf5;}
    @media (max-width:640px){
      .mn-table{min-width:0;border:0;}
      .mn-table thead{display:none;}
      .mn-table tbody tr{display:grid;border:1px solid #d1d5db;border-radius:.9rem;padding:.4rem .7rem;margin-bottom:.9rem;background:#fff;box-shadow:0 2px 6px -2px rgba(0,0,0,.08);}
      .mn-table tbody tr:last-child{margin-bottom:0;}
      .mn-table td{border:0 !important;padding:.4rem 0;display:flex;gap:.5rem;font-size:.82rem;}
      .mn-table td::before{content:attr(data-label);flex:0 0 48%;font-weight:600;color:#065f46;}
    }
    .mn-hydro{margin-top:.8rem;}
    @media (max-width:900px){.pg-shell.geo-static-shell{padding:4.5rem 1rem 5rem;} .geo-article{padding:1.4rem 1.2rem 1.9rem;} .mn-gallery{gap:1rem;margin-top:2rem;} .mn-media{border-radius:1rem;}}
    `}</style>
  )
}
