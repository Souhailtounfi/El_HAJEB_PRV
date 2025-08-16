import React, { useEffect, useState } from "react";
import { fetchPage } from "../services/pages";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import PageEditor from "../components/PageEditor";
import PageSidebar from "../components/PageSidebar";
import carteImg from "../assets/carte.png";

const SLUG = "situation-geographique";
const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33511.56630540291!2d-5.3717392!3d33.682252749999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda0353572c48e53%3A0x421b89bdd8f41877!2sEl%20Hajeb!5e1!3m2!1sen!2sma!4v1755372935139!5m2!1sen!2sma";

export default function SituationGeographique() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const { user } = useAuth();
  const [page,setPage]=useState(null);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState("");

  useEffect(()=>{
    let act=true;
    (async()=>{
      try{
        setLoading(true); setErr("");
        const p=await fetchPage(SLUG);
        if(act) setPage(p);
      }catch(e){
        if(act) setErr(e?.response?.status===404?"nf":"load");
      }finally{
        if(act) setLoading(false);
      }
    })();
    return ()=>{ act=false; };
  },[]);

  useEffect(()=>{
    const header = document.querySelector('.site-header, header, .main-nav, #mainNav');
    if(header){
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', h + 'px');
    } else {
      document.documentElement.style.setProperty('--header-height','0px');
    }
    const hero = document.querySelector('.hero, .hero-placeholder, .header-gap, .page-hero');
    if(hero){
      const hasMedia = hero.querySelector('img,video,canvas,iframe,picture,svg');
      const text = hero.textContent.replace(/\s+/g,'');
      if(!hasMedia && !text){
        hero.style.display='none';
        hero.style.height='0';
        hero.style.margin='0';
        hero.style.padding='0';
      }
    }
  },[lang, page]);

  const title = page
    ? (lang==="ar" ? (page.title_ar || page.title_fr) : page.title_fr)
    : (lang==="ar"?"الموقع الجغرافي":"Situation Géographique");

  const fr = {
    title: "Situation Géographique",
    intro1: "La Province d'El Hajeb a été créée par le Décret Royal n° 2.91.90 du 1er janvier 1991. Elle est l’une des neuf provinces et préfectures formant la région Fès-Meknès.",
    delim: "La province est délimitée par :",
    borders: [
      "La préfecture de Meknès au nord",
      "La province d'Ifrane et la province de Khénifra au sud",
      "La préfecture de Fès et la province de Sefrou à l'est",
      "La province de Khémisset à l'ouest"
    ],
    roleTitle: "Rôle et Importance",
    role1: "Compte tenu de son histoire et de sa géographie, la province d’El Hajeb a joué et continue de jouer un rôle important dans le processus de développement du Maroc moderne et dans sa marche vers le progrès.",
    role2: "Sa position stratégique au centre de la région Fès-Meknès place ce territoire au cœur des dynamiques de développement régional et national.",
    mapAlt: "Carte de localisation El Hajeb"
  };

  const ar = {
    title: "الموقع الجغرافي",
    intro1: "أُحدِث إقليم الحاجب بمرسوم ملكي رقم 2.91.90 بتاريخ 1 يناير 1991. وهو واحد من تسعة أقاليم وعمالات التي تُكوّن جهة فاس - مكناس.",
    delim: "يحد الإقليم:",
    borders: [
      "عمالة مكناس شمالاً",
      "إقليم إفران وإقليم خنيفرة جنوباً",
      "عمالة فاس وإقليم صفرو شرقاً",
      "إقليم الخميسات غرباً"
    ],
    roleTitle: "الدور والأهمية",
    role1: "نظراً لتاريخه وموقعه الجغرافي لعب إقليم الحاجب وما يزال دوراً مهماً في مسار التنمية بالمغرب الحديث وفي مسيرته نحو التقدم.",
    role2: "إن تموقعه الإستراتيجي بوسط جهة فاس - مكناس يجعل منه مجالاً محورياً في ديناميات التنمية الجهوية والوطنية.",
    mapAlt: "خريطة موقع الحاجب"
  };

  const t = isAr ? ar : fr;

  return (
    <div dir={dir} className="sg-shell">
      <Style />
      <section className="sg-map-wrap">
        <div className="sg-map-ratio">
          <iframe
            title={t.mapAlt}
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <main className="sg-main">
        <header className="sg-header">
          <h1 className="sg-title">{t.title}</h1>
          <div className="sg-line" />
        </header>

        <article className="sg-article">
          <p className="sg-p">{t.intro1}</p>
          <p className="sg-p sg-delim">{t.delim}</p>
          <ul className="sg-list">
            {t.borders.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

            <h2 className="sg-sub">{t.roleTitle}</h2>
          <p className="sg-p">{t.role1}</p>
          <p className="sg-p">{t.role2}</p>

          <figure className="sg-figure">
            <img src={carteImg} alt={t.mapAlt} className="sg-image" />
            <figcaption className="sg-cap">
              {isAr ? "خريطة تقريبية لموقع الإقليم" : "Carte illustrative de la localisation de la province"}
            </figcaption>
          </figure>
        </article>
      </main>
    </div>
  );
}

function BlockRenderer({ block, lang }) {
  const isAr = lang==="ar";
  if(block.type==="heading"){
    const txt = isAr ? block.text_ar || block.text_fr : block.text_fr;
    if(!txt) return null;
    return <h2 className="pg-h2" dir={isAr?"rtl":"ltr"}>{txt}</h2>;
  }
  if(block.type==="text"){
    const html = isAr ? block.text_ar || block.text_fr : block.text_fr;
    if(!html) return null;
    return <div className="pg-text" dir={isAr?"rtl":"ltr"} dangerouslySetInnerHTML={{__html:html}} />;
  }
  if(block.type==="image" && block.image_path){
    const base = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/api$/,'').replace(/\/+$/,'');
    const src = block.full_image_url
      ? block.full_image_url
      : (block.image_path.match(/^https?:/) ? block.image_path : `${base}/storage/${block.image_path.replace(/^storage\//,'')}`);
    const alt = isAr ? (block.alt_ar||block.alt_fr||"") : (block.alt_fr||"");
    return <div className="my-8"><img src={src} alt={alt} className="rounded-2xl shadow-md" /></div>;
  }
  if(block.type==="gallery" && (block.gallery?.length || block.gallery_urls?.length)){
    const base = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/api$/,'').replace(/\/+$/,'');
    const items = (block.gallery_urls && block.gallery_urls.length
      ? block.gallery_urls
      : block.gallery || []).map(p=> p.match(/^https?:/)?p:`${base}/storage/${p.replace(/^storage\//,'')}`);
    return (
      <div className="grid sm:grid-cols-3 gap-4 my-8">
        {items.map((p,i)=><img key={i} src={p} className="rounded-xl h-40 w-full object-cover" />)}
      </div>
    );
  }
  if(block.type==="map" && block.map_url){
    return (
      <div className="my-10 rounded-3xl overflow-hidden ring-1 ring-green-200">
        <iframe
          title="Map"
          src={block.map_url}
          className="w-full h-[520px] border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }
  return null;
}

function Header({ title }) {
  return (
    <div className="pg-header">
      <h1>{title}</h1>
      <div className="pg-sep" />
    </div>
  );
}

function Skeleton({ lines=8 }) {
  return (
    <div className="space-y-4 animate-pulse mb-10">
      <div className="h-7 w-1/2 bg-green-100 rounded" />
      {Array.from({length:lines}).map((_,i)=><div key={i} className="h-4 w-full bg-green-50 rounded" />)}
      <div className="h-64 bg-green-100/60 rounded-3xl mt-8" />
    </div>
  );
}

function Callout({ type, text }) {
  const base="px-6 py-5 rounded-2xl text-sm font-medium border";
  const styles = type==="error"
    ? "bg-red-50 border-red-200 text-red-700"
    : type==="pending" ? "bg-green-50 border-green-200 text-green-700"
    : "bg-gray-50 border-gray-200 text-gray-600";
  return <div className={`${base} ${styles}`}>{text}</div>;
}

function Style(){
  return (
    <style>{`
      .pg-shell{
        background:
          radial-gradient(circle at 12% 25%,#ecfdf5,transparent 70%),
          radial-gradient(circle at 88% 70%,#d1fae5,transparent 60%),
          linear-gradient(120deg,#ffffff,#f0fdf4);
        min-height:100vh;
      }
      @media (max-width:640px){
        .pg-header h1{font-size:2rem;}
      }
      .sg-shell{
        --accent:#059669;
        --radius-xl:2rem;
        background:
          radial-gradient(circle at 95% 10%,#ecfdf5 0%,transparent 60%),
          radial-gradient(circle at 5% 90%,#d1fae5 0%,transparent 55%),
          linear-gradient(135deg,#ffffff,#f8fefb);
        min-height:100vh;
        padding-bottom:4rem;
        font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
      }
      .sg-map-wrap{
        position:relative;
        max-width:1200px;
        margin:0 auto;
        padding:clamp(.75rem,2vw,1.75rem) clamp(.75rem,2.4vw,2rem) 0;
      }
      .sg-map-ratio{
        position:relative;
        width:100%;
        border-radius:var(--radius-xl);
        overflow:hidden;
        box-shadow:0 8px 28px -10px rgba(0,0,0,.2);
        background:#f0fdf4;
        aspect-ratio: 16 / 9;
      }
      .sg-map-ratio iframe{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        border:0;
      }
      .sg-main{
        max-width:1200px;
        margin:0 auto;
        padding:clamp(.5rem,2vw,1.75rem) clamp(.9rem,2.5vw,2.4rem);
      }
      .sg-header{
        margin-top:2.2rem;
        margin-bottom:1.6rem;
      }
      .sg-title{
        font-size:clamp(1.9rem,4.5vw,3.2rem);
        font-weight:800;
        line-height:1.05;
        letter-spacing:.5px;
        background:linear-gradient(95deg,#065f46,#10b981);
        -webkit-background-clip:text;
        color:transparent;
        margin:0 0 .6rem;
      }
      .sg-line{
        height:4px;
        width:140px;
        border-radius:4px;
        background:linear-gradient(90deg,#10b981,#6ee7b7);
      }
      .sg-article{
        background:#ffffffcc;
        backdrop-filter:blur(10px) saturate(160%);
        -webkit-backdrop-filter:blur(10px) saturate(160%);
        border:1px solid #10b98122;
        border-radius:var(--radius-xl);
        padding:clamp(1.3rem,2.2vw,2.4rem) clamp(1.4rem,2.6vw,2.8rem);
        box-shadow:0 6px 24px -8px rgba(0,0,0,.15);
      }
      .sg-p{
        font-size:clamp(.95rem,1.05rem,1.05rem);
        line-height:1.6;
        margin:0 0 1rem;
        color:#064e3b;
        font-weight:500;
      }
      .sg-delim{font-weight:600;color:#065f46;margin-top:.25rem;}
      .sg-list{
        margin:0 0 1.4rem;
        padding-inline-start:1.3rem;
        display:grid;
        gap:.5rem;
      }
      [dir="rtl"] .sg-list{padding-inline-start:0;padding-inline-end:1.3rem;}
      .sg-list li{
        position:relative;
        font-size:.95rem;
        color:#065f46;
        font-weight:500;
        line-height:1.5;
      }
      .sg-list li::marker{color:#10b981;}
      .sg-sub{
        font-size:clamp(1.35rem,2.2vw,1.9rem);
        font-weight:700;
        margin:2.2rem 0 1rem;
        color:#065f46;
        letter-spacing:.5px;
      }
      .sg-figure{
        margin:2.5rem 0 0;
        text-align:center;
      }
      .sg-image{
        max-width:100%;
        width: min(780px,100%);
        border-radius:1.6rem;
        box-shadow:0 8px 28px -10px rgba(0,0,0,.25);
        display:block;
        margin:0 auto;
      }
      .sg-cap{
        font-size:.72rem;
        text-transform:uppercase;
        letter-spacing:.15em;
        font-weight:600;
        margin-top:.9rem;
        color:#047857;
      }
      @media (max-width:680px){
        .sg-article{padding:1.4rem 1.25rem 1.9rem;}
        .sg-title{font-size:2.2rem;}
        .sg-map-ratio{border-radius:1.5rem;}
      }
      @media (prefers-color-scheme:dark){
        .sg-shell{
          background:
            radial-gradient(circle at 95% 10%,#064e3b 0%,transparent 60%),
            radial-gradient(circle at 5% 90%,#065f46 0%,transparent 55%),
            linear-gradient(135deg,#031f17,#052d21);
        }
        .sg-article{
          background:#052d21cc;
          border-color:#10b98133;
        }
        .sg-p,.sg-list li{color:#d1fae5;}
        .sg-title{background:linear-gradient(95deg,#34d399,#a7f3d0);-webkit-background-clip:text;}
        .sg-sub{color:#34d399;}
        .sg-cap{color:#6ee7b7;}
      }
    `}</style>
  );
}