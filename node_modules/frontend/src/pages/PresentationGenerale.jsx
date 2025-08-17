import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageSidebar from "../components/PageSidebar";

const SLUG = "presentation-generale"; // for sidebar quick nav only

export default function PresentationGenerale(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const dir = lang==='ar'?'rtl':'ltr'; const isAr = lang==='ar';
  useEffect(()=>{ const h=document.querySelector('.site-header, header, .main-nav'); if(h){document.documentElement.style.setProperty('--header-height',h.getBoundingClientRect().height+'px');}},[lang]);

  const fr={title:'Présentation générale',intro:`La province d'El Hajeb occupe une position charnière au cœur de la région Fès‑Meknès. Cette section propose un aperçu synthétique de son contexte historique et géographique.`};
  const ar={title:'عرض عام',intro:'يحتل إقليم الحاجب موقعاً محورياً في قلب جهة فاس ـ مكناس. يقدم هذا القسم لمحة موجزة عن سياقه التاريخي والجغرافي.'};
  const t=isAr?ar:fr;

  return (
    <div dir={dir} className="pg-shell pres-shell">
      <PresStyle />
      <div className="pres-container">
        <header className="pres-head"><h1>{t.title}</h1><div className="pres-sep"/></header>
        <div className="pres-layout">
          <div className="pres-main">
            <article className="pres-article" id="description" dir={dir}>
              <p className="pres-intro">{t.intro}</p>
              <div className="pres-cards">
                <Card to="/presentation-generale/apercu-historique" title={isAr?"لمحة تاريخية":"Aperçu Historique"} desc={isAr?"أصل التسمية وتحولات عبر الزمن":"Origine du nom et évolutions au fil du temps"} />
                <Card to="/presentation-generale/situation-geographique" title={isAr?"الموقع الجغرافي":"Situation Géographique"} desc={isAr?"الموقع، الحدود، والخريطة":"Localisation, limites et carte illustrative"} />
                <Card to="/presentation-generale/milieu-naturel" title={isAr?"الوسط الطبيعي":"Milieu Naturel"} desc={isAr?"التضاريس والمناخ والخصائص الطبيعية":"Morphologie, climat et caractéristiques naturelles"} />
                <Card to="/presentation-generale/superficie-population" title={isAr?"المساحة و الساكنة":"Superficie & Population"} desc={isAr?"المساحة، التوزيع الديموغرافي، الهرم العمري":"Superficie, distribution démographique, pyramide des âges"} />
              </div>
            </article>
          </div>
          <PageSidebar lang={lang} slug={SLUG} theme="light" />
        </div>
      </div>
    </div>
  );
}

function Card({to,title,desc}){return (<Link to={to} className="pres-card" ><h3>{title}</h3><p>{desc}</p></Link>);} 

function PresStyle(){return (<style>{`
  .pg-shell.pres-shell{min-height:100vh;padding:4.5rem clamp(1rem,3vw,3rem) 6rem;background:
    radial-gradient(circle at 15% 20%,#ecfdf5,transparent 60%),
    radial-gradient(circle at 85% 80%,#d1fae5,transparent 62%),
    linear-gradient(130deg,#ffffff,#f6fefb 55%,#eefcf6 85%);
  }
  .pres-container{max-width:1350px;margin:0 auto;}
  .pres-head h1{margin:0;font-size:clamp(2.2rem,4.2vw,3.4rem);font-weight:800;line-height:1.05;background:linear-gradient(90deg,#065f46,#059669 35%,#0ea5e9 70%,#6366f1);-webkit-background-clip:text;color:transparent;}
  .pres-sep{height:4px;width:100%;margin-top:1rem;background:linear-gradient(90deg,transparent,#34d399,#0ea5e9 70%,transparent);border-radius:2rem;}
  .pres-layout{display:grid;grid-template-columns:1fr;gap:3.2rem;margin-top:2.4rem;}
  @media (min-width:1280px){.pres-layout{grid-template-columns:minmax(0,1fr) 330px;}}
  .pres-article{background:rgba(255,255,255,0.9);border:1px solid #10b98121;border-radius:2.1rem;padding:clamp(1.5rem,2.4vw,2.7rem) clamp(1.5rem,2.4vw,2.9rem);box-shadow:0 6px 28px -10px rgba(0,0,0,.15);backdrop-filter:blur(8px) saturate(160%);}
  .pres-intro{font-size:1rem;line-height:1.7;font-weight:500;color:#064e3b;margin:0 0 2rem;}
  [dir='rtl'] .pres-intro{text-align:right;}
  .pres-cards{display:grid;gap:1.3rem;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));}
  .pres-card{display:block;text-decoration:none;background:#ffffffcc;border:1px solid #10b98122;padding:1.4rem 1.3rem;border-radius:1.5rem;box-shadow:0 4px 16px -8px rgba(0,0,0,.12);transition:.35s;}
  .pres-card:hover{transform:translateY(-4px);box-shadow:0 10px 26px -10px rgba(0,0,0,.18);}
  .pres-card h3{margin:0 0 .55rem;font-size:.95rem;font-weight:800;color:#065f46;letter-spacing:.5px;}
  .pres-card p{margin:0;font-size:.7rem;line-height:1.5;color:#38554c;font-weight:500;}
  @media (prefers-color-scheme:dark){.pg-shell.pres-shell{background:#10201a;} .pres-article{background:rgba(8,35,28,0.9);border-color:#10b98133;} .pres-intro,.pres-card p{color:#d1fae5;} .pres-card{background:#0f2c23cc;} .pres-card h3{color:#6ee7b7;} .pres-head h1{background:linear-gradient(95deg,#34d399,#6ee7b7);-webkit-background-clip:text;}}
  @media (max-width:900px){.pg-shell.pres-shell{padding:4.5rem 1rem 5rem;} .pres-article{padding:1.4rem 1.2rem 1.9rem;}}
`}</style>);} 