import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageSidebar from "../components/PageSidebar";

const SLUG = "organisation-administrative";

export default function OrganisationAdministrative() {
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
    title: "Organisation Administrative",
    list: [
      "03 Cercles : EL HAJEB - AGOURAI - AIN TAOUJDATE",
      "04 Pachalik(s) : EL HAJEB - AIN TAOUJDATE - SEBAA AIOUNE - AGOURAI",
      "07 Caïdats : DIR – BNI METIR – LAQSIR – AIT BOUBIDMANE – SEBT JAHJOUH – AIT YAAZEM – BTITT",
      "06 Annexes administratives : AIN SIHAND – AIN KHADEM – AKACHMIR – OUED EDDAHAB – AIT IDIR – AL BASSATIN – AL QODS",
      "16 Communes : (Dont le Conseil Provincial & le Groupement Vert des Collectivités Territoriales)",
    ],
    repTitle: "La représentativité au niveau des instances institutionnelles",
    table: [
      ["Députés parlementaires", "02"],
      ["Membres de la Chambre des Conseillers", "00"],
      ["Conseillers régionaux", "05"],
      ["Membres de l'Assemblée Provinciale", "15"],
      ["Conseillers communaux", "360"],
      ["Membres de la Chambre d'Agriculture", "09"],
      ["Membres de la Chambre du Commerce d'Industrie et de Services", "05"],
      ["Membres de la Chambre d'Artisanat", "03"],
    ],
  };

  const ar = {
    title: "التنظيم الإداري",
    list: [
      "03 دوائر: الحاجب - أگوراي - عين تاوجطات",
      "04 باشويات: الحاجب - عين تاوجطات - سبع عيون - أگوراي",
      "07 قيادات: دير – بني متير – لقسير – آيت بوبيدمان – سبت جحجوح – آيت يعزم – بطيط",
      "06 ملحقات إدارية: عين سيهند – عين خادم – اكاشمير – واد الذهب – آيت إدير – البساتين – القدس",
      "16 جماعات: إضافة إلى المجلس الإقليمي و التجمع الأخضر للجماعات الترابية",
    ],
    repTitle: "التمثيلية على مستوى الهيئات والمؤسسات",
    table: [
      ["النواب البرلمانيون", "02"],
      ["أعضاء مجلس المستشارين", "00"],
      ["المستشارون الجهويون", "05"],
      ["أعضاء الجمعية الإقليمية", "15"],
      ["المستشارون الجماعيون", "360"],
      ["أعضاء غرفة الفلاحة", "09"],
      ["أعضاء غرفة التجارة والصناعة والخدمات", "05"],
      ["أعضاء غرفة الصناعة التقليدية", "03"],
    ],
  };

  const t = isAr ? ar : fr;

  return (
    <div className="pg-shell geo-static-shell" dir={dir}>
      <OrgStyle />
      <div className="geo-layout">
        <main className="geo-main">
          <header className="geo-head">
            <h1 className="geo-title">{t.title}</h1>
            <div className="geo-sep" />
          </header>
          <article
            className="geo-article"
            dir={dir}
            id="organisation-administrative"
          >
            <ul className="org-list">
              {t.list.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
            <h2 className="geo-sub org-sub">{t.repTitle}</h2>
            <div className="org-table-wrapper">
              <table className="org-table" dir={dir}>
                <caption className="sr-only">
                  {isAr
                    ? "جدول يمثل أعداد الفئات في الهيئات والمؤسسات"
                    : "Table showing counts for each institutional representation category"}
                </caption>
                <thead>
                  <tr>
                    <th>{isAr ? "الفئة" : "Catégorie"}</th>
                    <th>{isAr ? "العدد" : "Nombre"}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.table.map((r, i) => (
                    <tr key={i}>
                      <td data-label={isAr?"الفئة":"Catégorie"}>{r[0]}</td>
                      <td className="num" data-label={isAr?"العدد":"Nombre"}>{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </main>
        <aside className="geo-side">
          <PageSidebar lang={lang} slug={SLUG} theme="light" />
        </aside>
      </div>
    </div>
  );
}

function OrgStyle() {
  return (
    <style>{`
  .pg-shell.geo-static-shell {
    min-height: 100vh;
    padding: 4.5rem clamp(1rem,3vw,3rem) 6rem;
    background: 
        radial-gradient(circle at 12% 18%,#ecfdf5,transparent 65%),
      radial-gradient(circle at 85% 82%,#d1fae5,transparent 70%),
      linear-gradient(125deg,#ffffff,#f0fdf4 55%,#e6fcf3);
  }
  .geo-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3.2rem;
    max-width: 1350px;
    margin: 0 auto;
  }
  @media (min-width:1280px) {
    .geo-layout {
      grid-template-columns: minmax(0,1fr) 330px;
    }
  }
  .geo-head {
    margin: 0 0 1.6rem;
  }
  .geo-title {
    margin: 0;
    font-size: clamp(2.2rem,4.5vw,3.25rem);
    font-weight: 800;
    line-height: 1.05;
    background: linear-gradient(90deg,#047857,#059669 35%,#10b981 70%);
    -webkit-background-clip: text;
    color: transparent;
  }
  .geo-sep {
    height: 4px;
    width: 100%;
    margin-top: .9rem;
    background: linear-gradient(90deg,transparent,#10b981,#34d399 70%,transparent);
    border-radius: 2rem;
  }
  .geo-article {
    position: relative;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 2rem;
    padding: clamp(1.5rem,2.4vw,2.7rem);
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  }
  .org-list {
    margin: 0 0 2.2rem;
    padding-inline-start: 1.2rem;
    display: grid;
    gap: .65rem;
    font-size: 1rem;
    line-height: 1.58;
    font-weight: 500;
    color: #1f2937;
  }
  [dir='rtl'] .org-list {
    padding-inline-start: 0;
    padding-inline-end: 1.2rem;
  }
  .org-list li::marker {
    color: #10b981;
    font-weight: 700;
  }
  .geo-sub.org-sub {
    margin: 0 0 1.4rem;
    font-size: clamp(1.45rem,2.2vw,2.05rem);
    font-weight: 800;
    background: linear-gradient(90deg,#065f46,#10b981);
    -webkit-background-clip: text;
    color: transparent;
  }
  .org-table-wrapper {overflow-x:auto;position:relative;border-radius:1.25rem;background:#ffffff;border:1px solid #e5e7eb;box-shadow:0 4px 12px -4px rgba(0,0,0,.08);} 
  .org-table{width:100%;border-collapse:collapse;min-width:520px;font-size:.82rem;}
  .org-table thead th{background:#06604a;color:#ffffff;text-align:start;padding:.85rem 1rem;font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;border-bottom:2px solid #059669;}
  [dir='rtl'] .org-table thead th {
    text-align: right;
  }
  .org-table tbody td{padding:.75rem 1rem;font-weight:600;color:#1f2937;border-bottom:1px solid #f1f5f9;background:#ffffff;transition:background .15s ease,color .15s ease;}
  .org-table tbody tr:nth-child(odd) td{background:#f9fafb;}
  .org-table tbody tr:hover td{background:#ecfdf5;}
  .org-table td.num{text-align:center;font-weight:700;color:#047857;min-width:70px;}
  .org-table thead th:first-child {border-top-left-radius:1rem;}
  .org-table thead th:last-child {border-top-right-radius:1rem;}
  [dir='rtl'] .org-table thead th:first-child {border-top-right-radius:1rem;border-top-left-radius:0;}
  [dir='rtl'] .org-table thead th:last-child {border-top-left-radius:1rem;border-top-right-radius:0;}
  .org-table tbody tr:last-child td:first-child {border-bottom-left-radius:1rem;}
  .org-table tbody tr:last-child td:last-child {border-bottom-right-radius:1rem;}
  .org-table td[data-label]::before{display:none;} /* remove mobile label overlay for desktop */
  /* Mobile: simple stacked labels */
  @media (max-width:640px){
    .org-table{min-width:0;font-size:.78rem;}
    .org-table thead{display:none;}
    .org-table,.org-table tbody,.org-table tr,.org-table td{display:block;width:100%;}
    .org-table tr{background:#ffffff;margin:0 0 .9rem;border:1px solid #e2e8f0;border-radius:1rem;padding:.65rem .85rem;box-shadow:0 2px 4px -2px rgba(0,0,0,.08);}    
    .org-table td{background:transparent !important;border:none;padding:.35rem 0 !important;display:flex;justify-content:space-between;align-items:center;}
    .org-table td::before{content:attr(data-label);font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;font-weight:700;color:#065f46;opacity:.75;margin-inline-end:.75rem;}
    [dir='rtl'] .org-table td{flex-direction:row-reverse;}
    .org-table td.num{justify-content:space-between;text-align:start;}
  }
  @media (max-width:900px){.pg-shell.geo-static-shell{padding:4.5rem 1rem 5rem;} .geo-article{padding:1.4rem 1.2rem 1.9rem;} .org-table{font-size:.75rem;min-width:560px;}}
  @media (prefers-color-scheme:dark){
    .org-table-wrapper{background:#0f2220;border-color:#1e3a35;box-shadow:0 4px 18px -6px rgba(0,0,0,.55);} 
    .org-table thead th{background:#065f46;border-bottom-color:#047857;color:#ecfdf5;}
    .org-table tbody td{background:#0f2d28;color:#d1fae5;border-bottom-color:#134e44;}
    .org-table tbody tr:nth-child(odd) td{background:#0d2622;}
    .org-table tbody tr:hover td{background:#134e44;}
    .org-table td.num{color:#34d399;}
  }
  `}</style>
  );
}
