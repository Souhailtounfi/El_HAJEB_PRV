import React, { useEffect, useState } from "react";
import { fetchPage } from "../services/pages";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import PageEditor from "../components/PageEditor";
import PageSidebar from "../components/PageSidebar";

const SLUG = "apercu-historique";

export default function ApercuHistorique() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { user } = useAuth();
  const [page,setPage]=useState(null);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState("");

  useEffect(()=>{
    let act=true;
    (async()=>{
      try{
        setLoading(true); setErr("");
        const p = await fetchPage(SLUG);
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
    // Measure header (adjust selector to your actual header/nav class/id)
    const header = document.querySelector('.site-header, header, .main-nav, #mainNav');
    if(header){
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', h + 'px');
    } else {
      document.documentElement.style.setProperty('--header-height','0px');
    }

    // Collapse an empty hero placeholder if it has no media & no text
    const hero = document.querySelector('.hero, .hero-placeholder, .header-gap, .page-hero');
    if(hero){
      const hasMedia = hero.querySelector('img,video,canvas,iframe,picture,svg');
      const text = hero.textContent.replace(/\s+/g,'');
      if(!hasMedia && !text){
        hero.classList.add('force-collapsed');
        hero.style.display='none';
        hero.style.height='0px';
        hero.style.margin='0';
        hero.style.padding='0';
      }
    }
  },[lang, page]);

  const title = page
    ? (lang==="ar" ? (page.title_ar || page.title_fr) : page.title_fr)
    : (lang==="ar"?"لمحة تاريخية":"Aperçu Historique");

  return (
    <div dir={dir} className="pg-shell">
      <Style />
      <div className="pg-container">
        <Header title={loading ? "..." : title} />

        {user?.is_admin && (
          <div className="mb-14">
            <PageEditor slug={SLUG} page={page} onSaved={setPage}/>
            {err==="nf" && (
              <p className="hint-warn">
                {lang==="ar"?"الصفحة غير موجودة بعد.":"Page inexistante (création)."}
              </p>
            )}
          </div>
        )}

        <div className="xl:grid xl:grid-cols-[1fr_340px] xl:gap-12">
          <div>
            {loading && <Skeleton lines={10} />}
            {!loading && err==="load" && <Callout type="error" text={lang==="ar"?"خطأ في التحميل":"Erreur de chargement"} />}
            {!loading && err==="nf" && !user && <Callout type="pending" text={lang==="ar"?"متاحة قريباً":"Disponible prochainement"} />}
            {!loading && !err && page && (
              <article className="pg-article mb-12">
                {page.blocks.map(b=> <BlockRenderer key={b.id} block={b} lang={lang} />)}
              </article>
            )}
          </div>
          <PageSidebar lang={lang} slug={SLUG} theme="light"/>
        </div>
      </div>
    </div>
  );
}

function BlockRenderer({ block, lang }) {
  const isAr = lang==="ar";
  if(block.type==="heading"){
    const txt = isAr ? (block.text_ar||block.text_fr) : block.text_fr;
    if(!txt) return null;
    return <h2 className="pg-h2" dir={isAr?"rtl":"ltr"}>{txt}</h2>;
  }
  if(block.type==="text"){
    const html = isAr ? (block.text_ar||block.text_fr) : block.text_fr;
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
      <div className="my-8 rounded-2xl overflow-hidden ring-1 ring-green-200">
        <iframe title="Map" src={block.map_url} className="w-full h-[420px] border-0" loading="lazy" allowFullScreen />
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
      {Array.from({length:lines}).map((_,i)=> <div key={i} className="h-4 w-full bg-green-50 rounded" />)}
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
        /* Remove old fixed top padding so new dynamic one (from css file) takes effect */
        background:
          radial-gradient(circle at 12% 25%,#ecfdf5,transparent 70%),
          radial-gradient(circle at 88% 70%,#d1fae5,transparent 60%),
          linear-gradient(120deg,#ffffff,#f0fdf4);
        min-height:100vh;
      }
      @media (max-width:640px){
        .pg-header h1{font-size:2rem;}
      }
      .pg-container{ max-width:1020px;margin:0 auto; }
      .pg-header h1{
        font-size:clamp(2.1rem,4vw,3rem);font-weight:800;line-height:1.1;letter-spacing:.5px;
        background:linear-gradient(90deg,#065f46,#047857,#10b981);
        -webkit-background-clip:text;color:transparent;
      }
      .pg-sep{margin-top:1rem;height:3px;width:100%;background:linear-gradient(90deg,transparent,#34d399,transparent);border-radius:999px;}
      .pg-article{font-size:1.05rem;line-height:1.85;font-weight:500;color:#1f2937;}
      .pg-article p{margin-bottom:1.15em;}
      .pg-h2{
        font-size:1.55rem;font-weight:800;
        background:linear-gradient(90deg,#065f46,#10b981);
        -webkit-background-clip:text;color:transparent;
        margin:2.2rem 0 1rem;
      }
      .pg-text{margin-bottom:1.2rem;}
      .hint-warn{margin-top:.75rem;font-size:11px;font-weight:600;color:#b45309;}
    `}</style>
  );
}