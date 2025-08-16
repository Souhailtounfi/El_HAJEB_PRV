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
  const mobileMenuRef = useRef(null);              // ADDED
  const hoverTimer = useRef(null);
  const leaveTimer = useRef(null);
  const [mobileHeight,setMobileHeight]=useState(0); // ADDED

  const buildGroups = useCallback(() => {
    const isAr = lang.startsWith("ar");
    const L = (fr, ar) => (isAr ? ar : fr);
    return [
      {
        key: "gen",
        to: "/presentation-generale/apercu-historique",
        label: L("PRESENTATION GENERALE DE LA PROVINCE", "العرض العام للإقليم"),
        items: [
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
          { to: "/infrastructures-base/eau-potable", label: L("L’Eau Potable", "ماء الشرب") },
          { to: "/infrastructures-base/electricite", label: L("L’Électricité", "الكهرباء") },
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
          { to: "/secteurs-sociaux/secteur-prive", label: L("Secteur Privé", "القطاع الخاص") },
          { to: "/secteurs-sociaux/champ-religieux", label: L("Champ Religieux", "الحقل الديني") },
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

  // Dynamic mobile menu height for smooth expand (instead of fixed 82vh)
  useEffect(()=>{
    if(mobileOpen){
      requestAnimationFrame(()=>{
        if(mobileMenuRef.current){
          setMobileHeight(mobileMenuRef.current.scrollHeight);
        }
      });
    } else {
      setMobileHeight(0);
    }
  },[mobileOpen, openGroup, lang]);

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

        /* MOBILE MENU REVISED */
        .mobile-menu-transition{
          overflow:hidden;
          transition:max-height .45s cubic-bezier(.4,0,.2,1), opacity .35s;
        }
        .mobile-menu-panel{
          background:#ffffffF2;
          backdrop-filter:blur(14px) saturate(160%);
          -webkit-backdrop-filter:blur(14px) saturate(160%);
          border:1px solid #10b98133;
          border-radius:1.4rem;
          box-shadow:0 8px 28px -10px rgba(0,0,0,.25);
        }
        @media (min-width:1024px){
          .mobile-menu-transition{display:none;}
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

              {/* Mobile toggle (shown only <1024px) */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="mobile-area nav-btn h-10 w-10 bg-white/90 text-green-700 hover:bg-white shadow ml-auto"
                aria-label="Menu"
                aria-expanded={mobileOpen}
                aria-controls="mobileNavPanel"                     // ADDED
              >
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile menu (REWRITTEN) */}
            <div
              className="mobile-menu-transition mobile-area mb-3"
              style={{maxHeight: mobileHeight, opacity: mobileOpen?1:0}}
            >
              <div
                id="mobileNavPanel"
                ref={mobileMenuRef}
                className="mobile-menu-panel p-4 grid gap-4"
                role="dialog"
                aria-modal="true"
              >
                {groups.map(g => {
                  const open = openGroup === g.key;
                  return (
                    <div key={g.key} className="rounded-2xl border border-green-200 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleGroupMobile(g.key)}   // CHANGED
                        className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide flex items-center justify-between ${
                          open ? "bg-green-600 text-white" : "text-green-800 bg-green-50"
                        }`}
                        aria-expanded={open}
                        aria-controls={`mob-group-${g.key}`}
                      >
                        <span>{g.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${open?"rotate-180":""}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        ><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <div
                        id={`mob-group-${g.key}`}
                        className="grid transition-all"
                        style={{gridTemplateRows: open?'1fr':'0fr', transition:'grid-template-rows .45s'}}
                      >
                        <ul className="overflow-hidden flex flex-col gap-1 pb-3 pt-2 px-3">
                          {g.items.map(i => (
                            <li key={i.to}>
                              <NavLink
                                to={i.to}
                                onClick={() => { setMobileOpen(false); setOpenGroup(null); }}
                                className={({ isActive }) =>
                                  `flex items-center gap-2 rounded-xl px-3 py-2 text-xs ${
                                    isActive ? "bg-green-600 text-white" : "text-green-700 hover:bg-green-100"
                                  }`
                                }
                              >
                                {i.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}

                {/* unchanged parts below except removed conditional mobileOpen wrapper */}
                {/* Singles / admin / logout */}
                <div className="flex flex-wrap gap-2">
                  {singles.map(s => (
                    <NavLink
                      key={s.to}
                      to={s.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex-1 min-w-[120px] text-center px-3 py-3 rounded-2xl text-sm font-semibold ${
                          isActive
                            ? "bg-green-600 text-white shadow"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`
                      }
                    >
                      {s.label}
                    </NavLink>
                  ))}
                  {user?.is_admin && (
                    <NavLink
                      to="/users"
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex-1 min-w-[120px] px-3 py-3 rounded-2xl text-sm font-semibold admin-create-btn ${
                          isActive ? "is-active" : ""
                        }`
                      }
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16"/>
                      </svg>
                      {lang.startsWith("ar") ? "إنشاء مدير" : "Créer Admin"}
                    </NavLink>
                  )}
                  {user && (
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex-1 min-w-[120px] px-3 py-3 rounded-2xl text-sm font-semibold logout-btn"
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

                {/* Mobile language switch */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={()=>handleLangSwitch('fr')}
                    className={`px-5 py-2 rounded-full text-sm font-bold ${
                      lang==='fr' ? 'bg-green-600 text-white shadow' : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    aria-pressed={lang==='fr'}
                  >FR</button>
                  <button
                    onClick={()=>handleLangSwitch('ar')}
                    className={`px-5 py-2 rounded-full text-sm font-bold ${
                      lang==='ar' ? 'bg-green-600 text-white shadow' : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    aria-pressed={lang==='ar'}
                  >AR</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ height: spacerH }} />
    </>
  );
}
