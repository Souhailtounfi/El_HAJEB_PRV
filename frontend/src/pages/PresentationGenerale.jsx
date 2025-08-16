import React, { useEffect, useState } from "react";
import { fetchPage } from "../services/pages";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import PageEditor from "../components/PageEditor";
import { Link } from "react-router-dom";
import PageSidebar from "../components/PageSidebar";

const SLUG = "presentation-generale";

export default function PresentationGenerale(){
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang==="ar"?"rtl":"ltr";
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
      }finally{ if(act) setLoading(false); }
    })();
    return ()=>{act=false};
  },[]);

  const title = page ? (lang==="ar"? page.title_ar || page.title_fr : page.title_fr) :
    (lang==="ar"?"عرض عام":"Présentation générale");
  const content = page ? (lang==="ar"? page.content_ar || page.content_fr : page.content_fr) : "";

  return(
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 px-4 md:px-10 py-12">
      <Style/>
      <div className="max-w-6xl mx-auto">
        <h1 className="page-title mb-8">{loading?"...":title}</h1>

        {user?.is_admin && (
          <div className="mb-10">
            <PageEditor slug={SLUG} page={page} onSaved={setPage}/>
            {err==="nf" && <p className="mt-3 text-xs text-amber-600">
              {lang==="ar"?"لم تكن الصفحة موجودة، استخدم النموذج أعلاه لإنشائها.":"La page n’existait pas : utilisez le formulaire ci-dessus pour la créer."}
            </p>}
          </div>
        )}

        {!loading && !page && err==="nf" && !user && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-6 text-sm text-green-700">
            {lang==="ar"?"الصفحة ستتوفر قريباً.":"Page disponible prochainement."}
          </div>
        )}

        <div className="grid xl:grid-cols-[1fr_330px] xl:gap-12">
          <div>
            {loading && <Skeleton/>}
            {!loading && page && (
              <article className="prose-custom mb-12" id="description" dangerouslySetInnerHTML={{__html:content}}/>
            )}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card to="/presentation-generale/apercu-historique"
                    title={lang==="ar"?"لمحة تاريخية":"Aperçu Historique"}
                    desc={lang==="ar"?"أصل التسمية والتحولات التاريخية.":"Origine du nom et évolutions historiques."}/>
              <Card to="/presentation-generale/situation-geographique"
                    title={lang==="ar"?"الموقع الجغرافي":"Situation Géographique"}
                    desc={lang==="ar"?"الموقع، التضاريس، والخرائط.":"Localisation, relief et carte interactive."}/>
            </div>
          </div>
          <PageSidebar lang={lang} slug={SLUG} theme="light" />
        </div>
      </div>
    </div>
  );
}

function Card({to,title,desc}){
  return(
    <Link to={to} className="block rounded-3xl p-6 bg-white/80 ring-1 ring-green-200 hover:ring-green-300 shadow-sm hover:shadow transition">
      <h3 className="font-bold text-green-800 mb-2 text-sm sm:text-base">{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
    </Link>
  );
}

function Skeleton(){
  return <div className="animate-pulse space-y-4 mb-10">
    <div className="h-6 w-1/2 bg-green-100 rounded"/>
    {Array.from({length:6}).map((_,i)=><div key={i} className="h-4 w-full bg-green-50 rounded"/>)}
  </div>;
}

function Style(){
  return <style>{`
    .page-title{
      font-size:clamp(2rem,3vw,2.7rem);
      font-weight:800;
      background:linear-gradient(90deg,#065f46,#059669,#10b981);
      -webkit-background-clip:text;
      color:transparent;
    }
    .prose-custom{line-height:1.7;font-size:.95rem;color:#374151;font-weight:500;}
    .prose-custom p{margin-bottom:1em;}
    .prose-custom strong{color:#065f46;}
  `}</style>;
}