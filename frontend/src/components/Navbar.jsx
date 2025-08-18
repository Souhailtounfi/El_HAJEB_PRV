import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import NavNewsTicker from "./NavNewsTicker";

export default function FuturisticNavbar() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dir  = i18n.dir(lang);

  // INIT language from localStorage (runs once)
  useEffect(()=>{
    const saved = localStorage.getItem("lang");
    if(saved && saved !== i18n.language){
      i18n.changeLanguage(saved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Sync document direction whenever language changes
  useEffect(()=>{
    document.documentElement.lang = lang;
    document.documentElement.dir  = dir;
  },[lang, dir]);

  // Language switch handler (desktop + mobile)
  const handleLangSwitch = useCallback((next)=>{
    if(next === i18n.language) return;
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
    document.documentElement.dir = i18n.dir(next);
    setMobileOpen(false);          // close mobile menu after switch
    setOpenGroup(null);
  },[i18n]);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [spacerH, setSpacerH] = useState(0);

  const fixedWrapRef = useRef(null);
  const desktopNavRef = useRef(null);
  const mobileMenuRef = useRef(null);              // mobile side panel ref
  const hoverTimer = useRef(null); // desktop hover open delay
  const leaveTimer = useRef(null); // desktop hover close delay
  // removed old expanding height logic (side panel now fixed)

  const buildGroups = useCallback(() => {
    const isAr = lang.startsWith("ar");
    const L = (fr, ar) => (isAr ? ar : fr);
    return [
      {
        key: "gen",
        to: "/presentation-generale/apercu-historique",
        label: L("PRESENTATION GENERALE DE LA PROVINCE", "العرض العام للإقليم"),
  items: [ // UPDATED list includes Milieu Naturel & Superficie & Population
          { to: "/presentation-generale/apercu-historique", label: L("Aperçu Historique", "لمحة تاريخية") },
          { to: "/presentation-generale/situation-geographique", label: L("Situation Géographique", "الموقع الجغرافي") },
          { to: "/presentation-generale/organisation-administrative", label: L("Organisation Administrative", "التنظيم الإداري") },
          { to: "/presentation-generale/milieu-naturel", label: L("Milieu Naturel", "الوسط الطبيعي") },
          { to: "/presentation-generale/superficie-population", label: L("Superficie & Population", "المساحة و الساكنة") },
        ],
      },
      {
        key: "infra",
        to: "/infrastructures-base/reseau-routier",
        label: L("SECTEURS D’INFRASTRUCTURES DE BASE", "قطاعات البنية التحتية الأساسية"),
        items: [
          { to: "/infrastructures-base/reseau-routier", label: L("Réseau Routier", "الشبكة الطرقية") },
          { to: "/infrastructures-base/eau-electricite", label: L("Eau & Électricité", "الماء و الكهرباء") },
          { to: "/infrastructures-base/habitat", label: L("Habitat", "السكن") },
          { to: "/infrastructures-base/environnement", label: L("Environnement", "البيئة") },
        ],
      },
      {
        key: "soc",
        to: "/secteurs-sociaux/enseignement",
        label: L("SECTEURS SOCIAUX", "القطاعات الاجتماعية"),
        items: [
          { to: "/secteurs-sociaux/enseignement", label: L("Enseignement", "التعليم") },
          { to: "/secteurs-sociaux/formation-professionnelle", label: L("Formation Professionnelle", "التكوين المهني") },
          { to: "/secteurs-sociaux/sante", label: L("La Santé", "الصحة") },
          { to: "/secteurs-sociaux/protection-civile", label: L("Protection Civile", "الحماية المدنية") },
          { to: "/secteurs-sociaux/entraide-associatif", label: L("Entraide Nationale & Tissu Associatif", "التعاون الوطني والنسيج الجمعوي") },
          { to: "/secteurs-sociaux/jeunesse-sports", label: L("Jeunesse & Sports", "الشباب والرياضة") },
          { to: "/secteurs-sociaux/indh", label: L("INDH", "المبادرة الوطنية للتنمية البشرية") },
          { to: "/secteurs-sociaux/secteur-prive-champ-religieux", label: L("Secteur Privé & Champ Religieux", "القطاع الخاص و الحقل الديني") },
        ],
      },
      {
        key: "prod",
        to: "/secteurs-productifs/agriculture",
        label: L("SECTEURS PRODUCTIFS", "القطاعات الإنتاجية"),
        items: [
          { to: "/secteurs-productifs/agriculture", label: L("Agriculture", "الفلاحة") },
          { to: "/secteurs-productifs/carrieres", label: L("Carrières", "المقالع") },
          { to: "/secteurs-productifs/eaux-forets", label: L("Eaux & Forêts", "المياه والغابات") },
          { to: "/secteurs-productifs/industrie-commerce", label: L("Industrie & Commerce", "الصناعة و التجارة") },
          { to: "/secteurs-productifs/tourisme", label: L("Tourisme", "السياحة") },
          { to: "/secteurs-productifs/artisanat", label: L("Artisanat", "الصناعة التقليدية") },
          { to: "/secteurs-productifs/banque-donnees-investissements", label: L("Banque de Données des Investissements", "بنك معطيات الاستثمارات") },
          { to: "/secteurs-productifs/contacts-utiles", label: L("Contacts Utiles", "جهات مفيدة") },
        ],
      },
    ];
  }, [lang]);

  const groups = buildGroups();
  const singles = [
    { to: "/news", label: lang.startsWith("ar") ? "الأخبار" : "Actualités" },
    ...(user?.is_admin ? [{ to: "/news/new", label: lang.startsWith("ar") ? "إضافة خبر" : t("add_news") }] : []),
    ...(!user ? [{ to: "/login", label: lang.startsWith("ar") ? "تسجيل الدخول" : t("login") }] : []),
  ];

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== lang) i18n.changeLanguage(saved);
  }, [i18n, lang]);

  useEffect(() => { document.documentElement.dir = dir; }, [dir]);
  useEffect(() => { setMobileOpen(false); setOpenGroup(null); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const recalcSpacer = useCallback(() => {
    if (fixedWrapRef.current) setSpacerH(fixedWrapRef.current.offsetHeight);
  }, []);
  useEffect(() => { recalcSpacer(); }, [lang, recalcSpacer]);
  useEffect(() => {
    const h = () => recalcSpacer();
    window.addEventListener("navTickerResize", h);
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("navTickerResize", h);
      window.removeEventListener("resize", h);
    };
  }, [recalcSpacer]);

  // FIX: clickOutside only for desktop (was closing mobile accordions accidentally)
  useEffect(() => {
    const clickOutside = e => {
      if (window.innerWidth < 1024) return; // ADDED GUARD
      if (!desktopNavRef.current) return;
      if (!desktopNavRef.current.contains(e.target)) setOpenGroup(null);
    };
    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("touchstart", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("touchstart", clickOutside);
    };
  }, []);

  // BODY SCROLL LOCK when mobile menu open
  useEffect(()=>{
    if(mobileOpen){
      const prev = document.body.style.overflow;
      document.body.style.overflow='hidden';
      return ()=>{ document.body.style.overflow=prev; };
    }
  },[mobileOpen]);

  // ESC close + focus management for side panel
  useEffect(()=>{
    if(!mobileOpen) return;
    const onKey = (e)=>{ if(e.key==='Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    // focus panel for accessibility
    requestAnimationFrame(()=>{ mobileMenuRef.current?.focus(); });
    return ()=> document.removeEventListener('keydown', onKey);
  },[mobileOpen]);

  // Normalize accordion toggle (prevent rapid double-close)
  const toggleGroupMobile = (key)=>{
    setOpenGroup(g=> g===key ? null : key);
  };

  useEffect(() => {
    // Keep input synced only when landing / refreshing on /news
    if (location.pathname.startsWith("/news")) {
      const p = new URLSearchParams(location.search);
      setSearchTerm(p.get("search") || "");
    }
  }, [location.pathname, location.search]);

  const submitSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    const params = new URLSearchParams();
    if (term) params.set("search", term);
    const qs = params.toString();
    // Navigate only on Enter / submit
    navigate({ pathname: "/news", search: qs });
    setOpenGroup(null);
  };

  const compact = !!user?.is_admin;

  // Desktop hover handlers (light delay to avoid flicker)
  const handleEnter = useCallback((key)=>{
    if(window.innerWidth < 1024) return;
    clearTimeout(leaveTimer.current);
    hoverTimer.current = setTimeout(()=> setOpenGroup(key), 120);
  },[]);
  const handleLeave = useCallback((key)=>{
    if(window.innerWidth < 1024) return;
    clearTimeout(hoverTimer.current);
    leaveTimer.current = setTimeout(()=>{
      setOpenGroup(g=> g===key ? null : g);
    },160);
  },[]);

  return (
    <>
      <style>{`
        .nav-root[data-compact="false"]{--gp-width:190px;--gp-height:44px;--gp-font:.6rem;}
        .nav-root[data-compact="true"]{--gp-width:165px;--gp-height:40px;--gp-font:.53rem;}
        @media (max-width:1350px){
          .nav-root[data-compact="false"]{--gp-width:180px;}
          .nav-root[data-compact="true"]{--gp-width:155px;}
        }
        @media (max-width:1180px){
          .nav-root[data-compact="false"]{--gp-width:170px;}
          .nav-root[data-compact="true"]{--gp-width:145px;}
        }
        .nav-outer-padding{padding-inline:.75rem;}
        @media (min-width:640px){.nav-outer-padding{padding-inline:1.1rem;}}
        @media (min-width:1280px){.nav-outer-padding{padding-inline:1.4rem;}}
        .layout-bar{display:flex;align-items:center;gap:1rem;}
        .brand-wrapper{display:flex;align-items:center;gap:.45rem;margin-left:-4px;}
        .brand-wrapper img{height:44px;width:auto;}
        .brand-name{font-size:clamp(.9rem,1.05vw,1.15rem);font-weight:800;color:#fff;white-space:nowrap;}
        .center-nav-wrapper{flex:1;display:flex;justify-content:center;}
        .center-nav-inner{display:flex;flex-wrap:nowrap;gap:.55rem;position:relative;overflow:visible;}
        .center-nav-inner::-webkit-scrollbar{display:none;}
        .group-wrapper{position:relative;flex:0 0 auto;}
        .group-pill{
          width:var(--gp-width);height:var(--gp-height);padding:0 .75rem;border-radius:1rem;
          display:flex;align-items:center;justify-content:center;font-size:var(--gp-font);font-weight:700;letter-spacing:.05em;
          text-transform:uppercase;color:#fff;background:rgba(255,255,255,.14);backdrop-filter:blur(10px) saturate(160%);
          -webkit-backdrop-filter:blur(10px) saturate(160%);border:1px solid rgba(255,255,255,.32);cursor:pointer;
          transition:background .28s, box-shadow .28s, border-color .28s, color .28s;
        }
        .group-pill:hover{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.55);box-shadow:0 4px 14px -6px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.15);}
        .group-pill.active,.group-pill.open{
          background:linear-gradient(135deg,rgba(16,185,129,.55),rgba(5,150,105,.55)),rgba(255,255,255,.18);
          border-color:rgba(255,255,255,.65);box-shadow:0 0 0 1px rgba(255,255,255,.35),0 6px 22px -10px rgba(0,0,0,.55);
        }
        .group-pill .gp-icon{width:12px;height:12px;margin-inline-start:.4rem;transition:.35s;opacity:.95;}
        .group-pill.open .gp-icon{transform:rotate(180deg);}
        .group-menu{
          position:absolute;top:100%;${dir==="rtl"?"right:0;":"left:0;"}margin-top:.45rem;width:280px;padding:.55rem .6rem .7rem;
          background:rgba(255,255,255,.6);backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%);
          border:1px solid rgba(16,185,129,.35);border-radius:.95rem;box-shadow:0 18px 38px -16px rgba(0,0,0,.28);
          animation:ddIn .18s ease;z-index:4000;
        }
        @keyframes ddIn{0%{opacity:0;transform:translateY(6px) scale(.97);}100%{opacity:1;transform:translateY(0) scale(1);}}
        .group-menu a{display:block;font-size:.72rem;font-weight:500;padding:.48rem .55rem;border-radius:.6rem;color:#1f2937;text-decoration:none;transition:.18s;}
        .group-menu a:hover{background:#ecfdf5;color:#065f46;}
        .group-menu a.active{background:#10b981;color:#fff;font-weight:600;box-shadow:0 3px 10px -5px rgba(4,120,87,.45);}
        .nav-btn{
          height:var(--gp-height);padding:0 .9rem;border-radius:1rem;display:inline-flex;align-items:center;justify-content:center;
          font-size:calc(var(--gp-font) + .06rem);font-weight:600;color:#ffffffcc;text-decoration:none;white-space:nowrap;transition:.22s;
          background:rgba(255,255,255,.12);backdrop-filter:blur(8px) saturate(140%);border:1px solid rgba(255,255,255,.25);
        }
        .nav-btn:hover{background:rgba(255,255,255,.22);color:#fff;}
        .nav-btn-active{background:#fff;color:#065f46!important;box-shadow:0 4px 14px -8px rgba(0,0,0,.25);}
        /* Login / Connexion special color */
        .nav-btn.login-btn{
          background:linear-gradient(135deg,#f59e0b,#d97706 55%,#b45309);
          color:#fff;
          border:1px solid rgba(255,255,255,.4);
          position:relative;
          overflow:hidden;
        }
        .nav-btn.login-btn:before{
          content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.35),transparent 70%);
          opacity:.35;mix-blend-mode:overlay;pointer-events:none;
        }
        .nav-btn.login-btn:hover{filter:brightness(1.08);}
        .nav-btn.login-btn.nav-btn-active{
          background:linear-gradient(135deg,#fbbf24,#f59e0b 55%,#d97706);
          color:#fff!important;
          box-shadow:0 4px 16px -6px rgba(245,158,11,.55);
        }
        /* Language switch smoother animation */
        .lang-switch-wrapper{display:flex;align-items:center;justify-content:flex-end;min-width:150px;}
        .lang-switch{
          position:relative;
          display:flex;align-items:center;gap:.4rem;padding:.35rem .45rem;
          background:rgba(255,255,255,.18);
          border:1px solid rgba(255,255,255,.35);
          border-radius:2rem;
          backdrop-filter:blur(10px) saturate(160%);
          -webkit-backdrop-filter:blur(10px) saturate(160%);
          transition:background .4s,border-color .4s, box-shadow .5s;
          overflow:hidden;
        }
        .lang-switch:before{
          content:"";position:absolute;inset:0;
          background:linear-gradient(120deg,rgba(255,255,255,.25),rgba(255,255,255,0) 60%);
          opacity:0;transition:opacity .6s;
        }
        .lang-switch:hover:before{opacity:1;}
        .lang-switch button{
          position:relative;
          font-size:calc(var(--gp-font) - .04rem);
          font-weight:700;letter-spacing:.07em;
          padding:.45rem .85rem;
          line-height:1;border-radius:999px;
          color:#fff;
          background:transparent;
          transition:background .45s, color .45s, transform .45s, box-shadow .5s;
        }
        .lang-switch button:not(.active):hover{background:rgba(255,255,255,.15);transform:translateY(-2px);}
        .lang-switch button.active{
          background:#ffffff;
          color:#065f46;
          box-shadow:0 4px 14px -6px rgba(0,0,0,.35),0 0 0 1px #fff;
          transform:translateY(-1px);
        }
        .lang-switch button:focus-visible{outline:2px solid #fff;outline-offset:2px;}
        /* Animated sliding highlight */
        .lang-switch .slider{
          position:absolute;top:4px;bottom:4px;
          width:calc(50% - .5rem);
          background:linear-gradient(135deg,#ffffff,#d1fae5);
          border-radius:999px;
          z-index:0;
          transition:transform .5s cubic-bezier(.65,.05,.36,1), opacity .4s;
          box-shadow:0 4px 14px -6px rgba(0,0,0,.3);
          opacity:.18;
        }
        .lang-switch[data-active="fr"] .slider{transform:translateX(${dir==="rtl"?"100%":"0%"});}
        .lang-switch[data-active="ar"] .slider{transform:translateX(${dir==="rtl"?"0%":"100%"});}
        .lang-switch button{z-index:1;}
        @media (max-width:1250px){.center-nav-wrapper{justify-content:flex-start;}}
        @media (max-width:1023px){
          .center-nav-wrapper{display:none;}
          .lang-switch-wrapper{display:none;}
        }
        @media (min-width:1024px){.mobile-area{display:none;}}
        .search-wrapper{
          display:flex;
          align-items:center;
          background:rgba(255,255,255,.18);
          border:1px solid rgba(255,255,255,.35);
          padding:.28rem .55rem .28rem .7rem;
          gap:.45rem;
          border-radius:2rem;
          backdrop-filter:blur(10px) saturate(160%);
          -webkit-backdrop-filter:blur(10px) saturate(160%);
          min-width:220px;
          transition:background .3s,border-color .3s, box-shadow .35s;
        }
        .search-wrapper:focus-within{
          background:rgba(255,255,255,.28);
          border-color:rgba(255,255,255,.6);
          box-shadow:0 4px 18px -8px rgba(0,0,0,.4);
        }
        .search-wrapper input{
          background:transparent;
          border:none;
          outline:none;
          font-size:.7rem;
          color:#fff;
          width:100%;
        }
        .search-wrapper input::placeholder{color:rgba(255,255,255,.65);}
        .search-btn{
          display:inline-flex;
          align-items:center;
          gap:.35rem;
          background:#10b981;
          color:#fff;
          font-size:.6rem;
          font-weight:700;
          letter-spacing:.05em;
          border:none;
          cursor:pointer;
          padding:.48rem .85rem;
          border-radius:1.4rem;
          transition:filter .25s, transform .25s;
        }
        .search-btn:hover{filter:brightness(1.08);transform:translateY(-2px);}
        .search-btn svg{width:14px;height:14px;}
        @media (max-width:1180px){
          .search-wrapper{min-width:180px;}
          .search-wrapper input{font-size:.65rem;}
          .search-btn{padding:.42rem .7rem;}
        }
        @media (max-width:1023px){
          .search-wrapper{display:none;}
        }

        /* REPLACED old .search-wrapper with news-list style variant */
        .nav-search{
          position:relative;
          display:flex;
          align-items:center;
          width:250px;
        }
        .nav-search input{
          width:100%;
          border:1px solid #10b98133;
          background:linear-gradient(110deg,#ffffffcc,#f0fdf480);
          backdrop-filter:blur(10px);
          border-radius:1.4rem;
          padding:.70rem 2.6rem .70rem 1.05rem;
          font-size:.7rem;
          font-weight:500;
          color:#065f46;
          outline:none;
          transition:.35s;
        }
        .nav-search input:focus{
          box-shadow:0 0 0 3px #10b98133;
          border-color:#10b98166;
        }
        .nav-search .icon{
          position:absolute;
          right:.85rem;
          width:1rem;height:1rem;
          color:#10b981;
          opacity:.8;
          pointer-events:none;
        }
        [dir="rtl"] .nav-search input{
          padding:.70rem 1.05rem .70rem 2.6rem;
        }
        [dir="rtl"] .nav-search .icon{
          right:auto;left:.85rem;
        }
        @media (max-width:1180px){
          .nav-search{width:210px;}
          .nav-search input{font-size:.65rem;}
        }
        @media (max-width:1023px){
          .nav-search{display:none;}
        }

        /* Updated admin (create) button: solid blue */
        .admin-create-btn{
          height:var(--gp-height);
          padding:0 1.1rem;
          border-radius:1rem;
          font-size:calc(var(--gp-font) - .02rem);
          font-weight:700;
          letter-spacing:.07em;
          background:#2563eb; /* blue */
          color:#fff;
          border:1px solid rgba(255,255,255,.35);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:.45rem;
          transition:.3s;
          box-shadow:0 4px 14px -6px rgba(37,99,235,.45);
        }
        .admin-create-btn:hover{
          background:#1d4ed8;
          box-shadow:0 6px 18px -6px rgba(29,78,216,.55);
        }
        .admin-create-btn.is-active{
          box-shadow:0 0 0 2px rgba(255,255,255,.45),0 6px 20px -8px rgba(29,78,216,.65);
        }

        /* Logout (déconnexion) red button with icon */
        .logout-btn{
          background:#dc2626 !important;
          border:1px solid rgba(255,255,255,.35);
          color:#fff !important;
          display:inline-flex;
          align-items:center;
          gap:.45rem;
          font-weight:600;
          padding:0 1rem;
          position:relative;
          overflow:hidden;
        }
        .logout-btn:hover{
          background:#b91c1c !important;
        }
        .logout-btn svg{
          width:15px;
          height:15px;
          stroke:currentColor;
        }

        /* Mobile variants reuse same classes */
        @media (max-width:1023px){
          .admin-create-btn,.logout-btn{
            height:40px;
            padding:0 .9rem;
            border-radius:1rem;
            font-size:.55rem;
            font-weight:600;
            letter-spacing:.05em;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:.35rem;
            transition:.3s;
          }
          .admin-create-btn{
            background:#2563eb;
            color:#fff;
            border:1px solid rgba(255,255,255,.35);
            box-shadow:0 4px 14px -6px rgba(37,99,235,.45);
          }
          .admin-create-btn:hover{
            background:#1d4ed8;
            box-shadow:0 6px 18px -6px rgba(29,78,216,.55);
          }
          .admin-create-btn.is-active{
            box-shadow:0 0 0 2px rgba(255,255,255,.45),0 6px 20px -8px rgba(29,78,216,.65);
          }
          .logout-btn{
            background:#dc2626;
            color:#fff;
            border:1px solid rgba(255,255,255,.35);
          }
          .logout-btn:hover{
            background:#b91c1c;
          }
        }

        /* NEW FLOATING FAB + SIDE PANEL (FUTURISTIC) */
        @media (max-width:1023px){
          .mob-fab{
            position:relative;z-index:10; /* sits within navbar row */
            width:46px;height:46px;border-radius:50%;
            background:linear-gradient(145deg,#10b981,#059669 55%,#047857);
            box-shadow:0 6px 18px -6px rgba(4,120,87,.55),0 0 0 1px #34d399 inset,0 0 0 2px rgba(16,185,129,.25);
            color:#fff;display:flex;align-items:center;justify-content:center;
            border:none;cursor:pointer;transition:transform .55s cubic-bezier(.68,-0.01,.25,1), box-shadow .5s, background .6s;
            overflow:hidden;backdrop-filter:blur(4px) saturate(160%);
          }
          .mob-fab:active{transform:scale(.9);} 
          .mob-fab:hover{box-shadow:0 14px 34px -6px rgba(6,95,70,.6),0 0 0 1px #6ee7b7 inset,0 0 0 3px rgba(16,185,129,.35);}
          .mob-fab svg{width:30px;height:30px;transition:transform .55s cubic-bezier(.68,-0.01,.25,1);} 
          .mob-fab[data-open="true"] svg.hamb{transform:scale(0) rotate(90deg);}
          .mob-fab svg.close{position:absolute;opacity:0;transform:scale(.4) rotate(-90deg);}
          .mob-fab[data-open="true"] svg.close{opacity:1;transform:scale(1) rotate(0deg);transition:opacity .45s .1s, transform .6s .05s cubic-bezier(.68,-0.01,.3,1);} 
          .mob-fab:focus-visible{outline:3px solid #6ee7b7;outline-offset:3px;}
          /* overlay */
          .mob-overlay{position:fixed;inset:0;background:linear-gradient(115deg,rgba(2,44,34,.85),rgba(6,95,70,.85));backdrop-filter:blur(10px) saturate(160%);-webkit-backdrop-filter:blur(10px) saturate(160%);z-index:6000;opacity:0;pointer-events:none;transition:opacity .45s;}
          .mob-overlay.open{opacity:1;pointer-events:auto;}
          /* panel */
          .mob-panel{position:fixed;top:0;bottom:0;${dir==="rtl"?"right":"left"}:0;width:78%;max-width:360px;z-index:6030;display:flex;flex-direction:column;outline:none;border:none;padding:1.15rem .95rem 1.75rem;overflow-y:auto;scrollbar-width:none;}
          .mob-panel::-webkit-scrollbar{display:none;}
          .mob-panel-outer{position:fixed;inset:0;pointer-events:none;z-index:6030;}
          .mob-panel-shell{position:absolute;top:0;bottom:0;${dir==="rtl"?"right":"left"}:0;width:78%;max-width:360px;pointer-events:auto;}
          .mob-panel-glass{position:absolute;inset:0;border-radius:0 1.4rem 1.4rem 0;${dir==="rtl"?"border-radius:1.4rem 0 0 1.4rem;":""}background:linear-gradient(140deg,rgba(255,255,255,.72),rgba(240,253,244,.55) 55%,rgba(209,250,229,.6));backdrop-filter:blur(22px) saturate(190%);-webkit-backdrop-filter:blur(22px) saturate(190%);border:1px solid #10b98144;box-shadow:0 18px 48px -16px rgba(0,0,0,.35),0 0 0 1px rgba(16,185,129,.35);}
          .mob-panel-anim{position:absolute;inset:0;transform:translateX(${dir==="rtl"?"100%":"-100%"});opacity:0;transition:transform .65s cubic-bezier(.68,-0.01,.22,1), opacity .5s .05s;} 
          .mob-panel-anim.open{transform:translateX(0);opacity:1;}
          .mob-section{position:relative;padding-top:.25rem;}
          .mob-accord{border:1px solid #10b98133;border-radius:1.1rem;overflow:hidden;margin-bottom:.9rem;background:#f0fdf4;box-shadow:0 4px 14px -8px rgba(0,0,0,.18);} 
          .mob-accord-btn{width:100%;display:flex;align-items:center;justify-content:space-between;font-size:.66rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;padding:.9rem 1rem;cursor:pointer;background:linear-gradient(120deg,#059669,#10b981);color:#fff;transition:filter .35s;}
          .mob-accord-btn.collapsed{background:linear-gradient(120deg,#d1fae5,#ecfdf5);color:#065f46;}
          .mob-accord-btn:hover{filter:brightness(1.05);} 
          .mob-accord-body{max-height:0;overflow:hidden;opacity:0;transition:max-height .5s cubic-bezier(.68,-0.01,.22,1),opacity .35s;}
          .mob-accord-body.open{max-height:1000px;opacity:1;} /* large cap to accommodate content */
          .mob-accord-list{padding:.55rem .65rem .9rem;display:flex;flex-direction:column;gap:.4rem;}
          .mob-accord-list a{padding:.55rem .8rem;border-radius:.8rem;font-size:.66rem;font-weight:600;text-decoration:none;color:#065f46;background:rgba(16,185,129,.08);transition:.35s;} 
          .mob-accord-list a:hover{background:#10b98122;} 
          .mob-accord-list a.active{background:#10b981;color:#fff;box-shadow:0 4px 14px -8px rgba(0,0,0,.35);} 
          .mob-divider{height:1px;background:linear-gradient(90deg,transparent,#10b98155,transparent);margin:1rem 0;} 
          .mob-grid-actions{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:.65rem;margin-top:.4rem;} 
          .mob-grid-actions a,.mob-grid-actions button{font-size:.66rem;font-weight:700;letter-spacing:.05em;padding:.75rem .8rem;border-radius:1rem;text-align:center;background:#ecfdf5;color:#065f46;box-shadow:0 4px 14px -8px rgba(0,0,0,.15);transition:.35s;border:1px solid #10b98122;} 
          .mob-grid-actions a:hover,.mob-grid-actions button:hover{background:#10b981;color:#fff;} 
          .mob-grid-actions a.active{background:#10b981;color:#fff;}
          .mob-lang{display:flex;align-items:center;justify-content:center;gap:.9rem;margin-top:.6rem;}
          .mob-lang button{flex:1;padding:.75rem 0;border-radius:2rem;font-size:.7rem;font-weight:800;letter-spacing:.08em;background:#ecfdf5;color:#065f46;transition:.35s;border:1px solid #10b98133;}
          .mob-lang button.active{background:#10b981;color:#fff;box-shadow:0 4px 14px -8px rgba(0,0,0,.35);} 
          .mob-lang button:hover:not(.active){background:#d1fae5;}
          .mob-close-btn{position:absolute;top:.55rem;${dir==="rtl"?"left":"right"}:.55rem;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(16,185,129,.15);border:1px solid #10b98155;color:#065f46;cursor:pointer;backdrop-filter:blur(6px) saturate(160%);-webkit-backdrop-filter:blur(6px) saturate(160%);transition:.35s;}
          .mob-close-btn:hover{background:#10b981;color:#fff;}
          .mob-close-btn svg{width:20px;height:20px;}
        }
        @media (min-width:1024px){
          .mob-fab,.mob-overlay,.mob-panel-outer{display:none;}
        }
      `}</style>

      <div ref={fixedWrapRef} className="fixed top-0 inset-x-0 z-50" dir={dir}>
        <NavNewsTicker lang={lang} />
        <nav
          className={`w-full nav-root transition-colors duration-300 ${
            scrolled
              ? "bg-gradient-to-r from-green-800 via-green-700 to-green-800 shadow-lg"
              : "bg-gradient-to-r from-green-700 via-green-600 to-green-500"
          }`}
          data-compact={compact ? "true" : "false"}
        >
          <div className="mx-auto max-w-[1750px] nav-outer-padding">
            {/* Desktop bar layout: left brand / center titles / right language */}
            <div className="layout-bar py-1">
              {/* Left */}
              <Link to="/" className="brand-wrapper shrink-0 group pr-4 border-r border-white/15">
                <img src={logo} alt="Logo" className="transition-transform group-hover:scale-110" />
                <span className="brand-name">
                  {lang.startsWith("ar") ? "إقليم الحاجب" : "Province El Hajeb"}
                </span>
              </Link>

              {/* Center navigation */}
              <div className="center-nav-wrapper">
                <div ref={desktopNavRef} className="center-nav-inner">
                  {groups.map(g => {
                    const isOpen = openGroup === g.key;
                    const activeChild = g.items.some(i => location.pathname.startsWith(i.to));
                    const active = activeChild || location.pathname.startsWith(g.to);
                    return (
                      <div
                        key={g.key}
                        className="group-wrapper"
                        onMouseEnter={() => handleEnter(g.key)}
                        onMouseLeave={() => handleLeave(g.key)}
                      >
                        <button
                          type="button"
                          className={`group-pill ${active ? "active" : ""} ${isOpen ? "open" : ""}`}
                          onClick={() => setOpenGroup(isOpen ? null : g.key)}
                          aria-haspopup="true"
                          aria-expanded={isOpen}
                        >
                          <span className="gp-label">{g.label}</span>
                          <svg className="gp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="group-menu" style={dir === "rtl" ? { right: 0 } : { left: 0 }}>
                            <ul>
                              {g.items.map(i => (
                                <li key={i.to}>
                                  <NavLink
                                    to={i.to}
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                    onClick={() => setOpenGroup(null)}
                                  >
                                    {i.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {singles.map(s => (
                    <NavLink
                      key={s.to}
                      to={s.to}
                      className={({ isActive }) =>
                        `nav-btn ${s.to==="/login"?"login-btn":""} ${
                          s.to==="/login" && isActive ? "login-btn-active" : isActive ? "nav-btn-active" : ""
                        }`
                      }
                    >
                      {s.label}
                    </NavLink>
                  ))}

                  {user?.is_admin && (
                    <NavLink
                      to="/users"
                      className={({ isActive }) => `admin-create-btn ${isActive ? "is-active" : ""}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16"/>
                      </svg>
                      {lang.startsWith("ar") ? "إنشاء مدير" : "Créer Admin"}
                    </NavLink>
                  )}

                  {user && (
                    <button
                      onClick={logout}
                      className="nav-btn logout-btn"
                    >
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 8l-4 4 4 4"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 4v16"/>
                      </svg>
                      {lang.startsWith("ar") ? "تسجيل الخروج" : t("logout")}
                    </button>
                  )}
                </div>
              </div>

              {/* Search bar (desktop) - SUBMIT ONLY */}
              <form onSubmit={submitSearch} className="nav-search">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={e=>{
                    if(e.key==="Escape"){
                      setSearchTerm("");
                      // Optional: if already on news clear results immediately
                      if (location.pathname.startsWith("/news")) {
                        navigate("/news", { replace:true });
                      }
                    }
                  }}
                  placeholder={lang.startsWith("ar") ? "بحث في العناوين والمحتوى..." : "Rechercher titres & contenu..."}
                  aria-label={lang.startsWith("ar") ? "بحث" : "Search news"}
                />
                <svg
                  viewBox="0 0 24 24"
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </form>

              {/* Desktop language switch */}
              <div className="hidden lg:flex items-center gap-2 ms-auto pe-2">
                <button
                  type="button"
                  onClick={()=>handleLangSwitch('fr')}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                    lang==='fr'
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                  aria-pressed={lang==='fr'}
                >FR</button>
                <button
                  type="button"
                  onClick={()=>handleLangSwitch('ar')}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                    lang==='ar'
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                  aria-pressed={lang==='ar'}
                >AR</button>
              </div>

              {/* Mobile menu button inside navbar row */}
              <div className="flex lg:hidden ms-auto">
                <button
                  type="button"
                  aria-label={mobileOpen ? (lang.startsWith('ar')? 'إغلاق القائمة':'Fermer le menu') : (lang.startsWith('ar')? 'فتح القائمة':'Ouvrir le menu')}
                  className="mob-fab"
                  data-open={mobileOpen? 'true':'false'}
                  onClick={()=> setMobileOpen(o=>!o)}
                >
                  <svg className="hamb" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
                  </svg>
                  <svg className="close" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Mobile side panel system (button now inside navbar) */}
        <div className={`mob-overlay ${mobileOpen? 'open':''}`} onClick={()=> setMobileOpen(false)} />
        <div className="mob-panel-outer" aria-hidden={!mobileOpen}>
          <div className="mob-panel-shell">
            <div className={`mob-panel-anim ${mobileOpen? 'open':''}`}>
              <div className="mob-panel" ref={mobileMenuRef} role="dialog" aria-modal="true" tabIndex="-1" aria-label={lang.startsWith('ar')? 'القائمة الرئيسية':'Menu Principal'}>
                <button className="mob-close-btn" onClick={()=> setMobileOpen(false)} aria-label={lang.startsWith('ar')? 'إغلاق':'Fermer'}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
                </button>
                <div className="mob-section">
                  {groups.map(g=>{
                    const open = openGroup===g.key;
                    return (
                      <div className="mob-accord" key={g.key}>
                        <button
                          type="button"
                          className={`mob-accord-btn ${open? '':'collapsed'}`}
                          aria-expanded={open}
                          aria-controls={`acc-${g.key}`}
                          onClick={()=> toggleGroupMobile(g.key)}
                        >
                          <span>{g.label}</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 transition-transform ${open? 'rotate-180':''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div id={`acc-${g.key}`} className={`mob-accord-body ${open? 'open':''}`}>
                          <div className="mob-accord-list">
                            {g.items.map(i=> (
                              <NavLink
                                key={i.to}
                                to={i.to}
                                className={({isActive})=> isActive? 'active' : ''}
                                onClick={()=> { setMobileOpen(false); setOpenGroup(null); }}
                              >{i.label}</NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mob-divider" />
                <div className="mob-grid-actions">
                  {singles.map(s=> (
                    <NavLink key={s.to} to={s.to} className={({isActive})=> isActive? 'active':''} onClick={()=> setMobileOpen(false)}>{s.label}</NavLink>
                  ))}
                  {user?.is_admin && (
                    <NavLink to="/users" className={({isActive})=> isActive? 'active':''} onClick={()=> setMobileOpen(false)}>
                      {lang.startsWith('ar')? 'إنشاء مدير':'Créer Admin'}
                    </NavLink>
                  )}
                  {user && (
                    <button onClick={()=> { logout(); setMobileOpen(false); }}>
                      {lang.startsWith('ar')? 'تسجيل الخروج': t('logout')}
                    </button>
                  )}
                </div>
                <div className="mob-lang">
                  <button
                    type="button"
                    onClick={()=> handleLangSwitch('fr')}
                    className={lang==='fr'? 'active':''}
                    aria-pressed={lang==='fr'}
                  >FR</button>
                  <button
                    type="button"
                    onClick={()=> handleLangSwitch('ar')}
                    className={lang==='ar'? 'active':''}
                    aria-pressed={lang==='ar'}
                  >AR</button>
                </div>
              </div>
              <div className="mob-panel-glass mob-panel-anim" aria-hidden />
            </div>
          </div>
  </div>
      <div style={{ height: spacerH }} />
    </>
  );
}
