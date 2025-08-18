import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import elecImgSrc from '../assets/eel1.png'; // if missing, bundler will show error (preferred explicit)

export default function EauElectricite(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith('ar');
  const dir = isAr ? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title: "L'Eau & Électricité",
    waterTitle: "L’EAU POTABLE",
    waterIntro: "Les efforts de l’État en matière d’adduction en eau potable aux différents centres relevant de cette province peuvent être résumés comme suit :",
    waterBullets: [
      "Taux de branchement en Eau Potable en milieu Urbain : 95%.",
      "Taux de desserte en Eau Potable en milieu rural : 85%."
    ],
    waterState: "État d’approvisionnement en eau potable des populations rurales de la province",
    waterTableHead: "TAUX DE BRANCHEMENT PAR TYPE DE DESSERTE",
    waterTableCols: [
      "Branchement Particulier","Borne Fontaine","Source Aménagée","Source non Aménagée","Puits Individuel","Puits Collectif","Cours d’Eau","Autres"
    ],
    waterTableData: ["77%","13%","2.5%","1%","1%","4%","0.5%","1%"],
    elecTitle: "L’ELECTRICITÉ",
    elecAccess: "Accès à l’électricité :",
    elecBullets: [
      "Taux de branchement au réseau électrique : 100% en milieu Urbain.",
      "Taux d’électrification en milieu rural : 98%."
    ],
    elecCaption: "Poste source Boufekrane"
  };

  const ar = {
    title: "الماء و الكهرباء",
    waterTitle: "الماء الصالح للشرب",
    waterIntro: "يمكن تلخيص مجهودات الدولة في تزويد مختلف المراكز التابعة للإقليم بالماء الصالح للشرب كما يلي:",
    waterBullets: [
      "نسبة الربط بالماء الصالح للشرب في الوسط الحضري: 95%.",
      "نسبة التغطية بالماء الصالح للشرب في الوسط القروي: 85%."
    ],
    waterState: "وضعية تزويد الساكنة القروية بالماء الصالح للشرب بالإقليم",
    waterTableHead: "نسب الربط حسب نوع الخدمة",
    waterTableCols: [
      "الربط الفردي","صنبور عمومي","منبع مهيأ","منبع غير مهيأ","بئر فردي","بئر جماعي","مجاري مائية","أخرى"
    ],
    waterTableData: ["77%","13%","2.5%","1%","1%","4%","0.5%","1%"],
    elecTitle: "الكهرباء",
    elecAccess: "الولوج إلى الكهرباء:",
    elecBullets: [
      "نسبة الربط بالشبكة الكهربائية في الوسط الحضري: 100%.",
      "نسبة الكهربة في الوسط القروي: 98%."
    ],
    elecCaption: "محطة مصدر بوفكران"
  };

  const t = isAr ? ar : fr;

  return (
    <div className="ee-wrap" dir={dir}>
      <EEStyle dir={dir} />
      <header className="ee-hero">
        <h1 className="ee-title">{t.title}</h1>
      </header>

      <section className="ee-section" id="water">
        <h2>{t.waterTitle}</h2>
        <p className="lead">{t.waterIntro}</p>
        <ul className="bullet">
          {t.waterBullets.map(b=> <li key={b}>{b}</li>)}
        </ul>
        <h3 className="sub-head">{t.waterState}</h3>
    <div className="table-card">
          <div className="table-head">{t.waterTableHead}</div>
          <div className="table-grid">
      {t.waterTableCols.map(c=> <div key={c} className="th">{c}</div>)}
            {t.waterTableData.map((v,i)=> <div key={i} className="td">{v}</div>)}
          </div>
        </div>
      </section>

      <section className="ee-section" id="elec">
        <h2>{t.elecTitle}</h2>
    {elecImgSrc && (
          <figure className="media">
      <img src={elecImgSrc} alt={t.elecCaption} />
            <figcaption>{t.elecCaption}</figcaption>
          </figure>
        )}
        <h3 className="sub-head mt">{t.elecAccess}</h3>
        <ul className="bullet">
          {t.elecBullets.map(b=> <li key={b}>{b}</li>)}
        </ul>
      </section>
    </div>
  );
}

function EEStyle({dir}){return <style>{`
.ee-wrap{--c1:#0e7490;--c2:#10b981;--bg:linear-gradient(140deg,#0e7490 0%,#047857 55%,#065f46 100%);padding:clamp(.8rem,2vw,2.4rem) clamp(.8rem,3vw,3.2rem) 3rem;max-width:1400px;margin-inline:auto;color:#1f2937;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}
.ee-title{margin:0;font-size:clamp(1.7rem,4vw,3.1rem);font-weight:800;background:linear-gradient(120deg,#0d9488,#047857 55%,#065f46);-webkit-background-clip:text;color:transparent;letter-spacing:.02em;text-align:center;}
.ee-section{margin-top:3rem;background:rgba(255,255,255,.55);backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%);border:1px solid #ffffff66;border-radius:1.4rem;padding:1.6rem 1.5rem 2.2rem;position:relative;box-shadow:0 18px 40px -18px rgba(0,0,0,.35);} 
.ee-section:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.ee-section h2{margin:0 0 1.1rem;font-size:clamp(1.1rem,2.4vw,1.9rem);font-weight:800;letter-spacing:.05em;color:#064e3b;}
.lead{font-size:.8rem;line-height:1.55;margin:0 0 1rem;font-weight:500;}
.bullet{margin:.25rem 0 1.5rem;padding-${dir==='rtl'?'right':'left'}:1.2rem;display:flex;flex-direction:column;gap:.45rem;font-size:.7rem;}
.bullet li{position:relative;}
.bullet li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-1.05rem;top:.45rem;width:.55rem;height:.55rem;border-radius:50%;background:linear-gradient(135deg,#10b981,#0e7490);} 
.sub-head{margin:1.4rem 0 .9rem;font-size:.8rem;font-weight:800;color:#065f46;letter-spacing:.05em;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px;}
.table-card{border:1px solid #0e749055;border-radius:1.1rem;overflow:hidden;background:#f0fdfa;box-shadow:0 10px 30px -16px rgba(0,0,0,.25);} 
.table-head{background:linear-gradient(135deg,#0e7490,#047857);color:#fff;font-weight:700;letter-spacing:.05em;text-align:center;padding:.7rem .9rem;font-size:.66rem;}
.table-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));font-size:.63rem;font-weight:600;}
.table-grid .th{background:#ecfeff;padding:.55rem .6rem;border:1px solid #0e749022;}
.table-grid .td{background:#ffffff;padding:.6rem .55rem;border:1px solid #0e749022;font-weight:700;color:#047857;}
@media (min-width:1100px){.table-grid{grid-template-columns:repeat(8,1fr);} }
.media{margin:1rem auto 1.5rem;max-width:620px;text-align:center;}
.media img{width:100%;border-radius:1.2rem;box-shadow:0 18px 40px -18px rgba(0,0,0,.38);}
.media figcaption{margin-top:.5rem;font-size:.6rem;font-weight:600;opacity:.75;}
.mt{margin-top:2rem;}
@media (max-width:720px){.ee-section{padding:1.25rem 1.05rem 1.7rem;}.bullet{font-size:.68rem;} .table-grid{font-size:.58rem;} }
`}</style>;}
