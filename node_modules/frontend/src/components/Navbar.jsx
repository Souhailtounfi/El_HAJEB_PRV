import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import NavNewsTicker from "./NavNewsTicker";

export default function FuturisticNavbar() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dir = i18n.dir(lang);

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
  const isAdmin = !!user?.is_admin;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const dropdownTimer = useRef(null);
  const desktopNavRef = useRef(null);
  const mobileMenuRef = useRef(null); // mobile side panel ref
  // removed old expanding height logic (side panel now fixed)

  const isAr = lang.startsWith("ar");
  const L = (fr, ar) => (isAr ? ar : fr);
  const groups = [
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
        { to: "/secteurs-productifs/tourisme", label: L("Tourisme", "السياحة") },
        { to: "/secteurs-productifs/artisanat", label: L("Artisanat", "الصناعة التقليدية") },
        { to: "/secteurs-productifs/investissements", label: L("Banque de Données des Investissements", "بنك معطيات الاستثمارات") },
        { to: "/secteurs-productifs/contacts-utiles", label: L("Contacts Utiles", "جهات مفيدة") },
      ],
    },
  ];
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

  // Removed unused scroll effect

  // ...existing code...

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

  // ...existing code...

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

  // ...existing code...


  return (
    <>
      {/* --- WordPress-inspired, modern, smooth, responsive navbar --- */}
  <header className={`w-full shadow-md bg-white/90 backdrop-blur sticky top-0 z-50 border-b border-green-100${isAdmin ? ' admin-navbar' : ''}`}>
    <nav className={`max-w-[1750px] mx-auto flex items-center px-2 sm:px-6 lg:px-4 py-1 ${isAdmin ? 'gap-0' : 'gap-2'}`} style={isAdmin ? {minHeight:48} : {}}>
          {/* Logo/brand left - moved more left with extra margin, even more for admin */}
          <Link to="/" className={`flex items-center gap-2 shrink-0 group ${isAdmin ? 'ml-[-32px] sm:ml-[-40px] me-1' : 'ml-[-10px] sm:ml-[-18px] me-2'}`} style={isAdmin ? {minWidth:120} : {}}>
            <img src={logo} alt="Logo" className={isAdmin ? "h-7 w-auto transition-transform group-hover:scale-105" : "h-9 w-auto transition-transform group-hover:scale-105"} />
            <span className={isAdmin ? "font-semibold text-green-800 text-[13px] tracking-tight whitespace-nowrap font-sans" : "font-semibold text-green-800 text-[15px] tracking-tight whitespace-nowrap font-sans"} style={{fontFamily:'Inter, Segoe UI, Arial, sans-serif', letterSpacing:'.01em'}}>
              {lang.startsWith("ar") ? "إقليم الحاجب" : "Province El Hajeb"}
            </span>
          </Link>

          {/* Main nav (center, hidden on mobile) */}
          <div className={`hidden lg:flex flex-1 justify-center items-center ${isAdmin ? 'gap-0.5' : 'gap-0.5'}`} style={isAdmin ? {fontSize:'11px', paddingLeft:0, paddingRight:0, minWidth:0} : {}}>
            {groups.map(g => {
              const isOpen = openGroup === g.key;
              const activeChild = g.items.some(i => location.pathname.startsWith(i.to));
              const active = activeChild || location.pathname.startsWith(g.to);
              return (
                <div
                  key={g.key}
                  className="relative group/nav"
                  onMouseEnter={() => {
                    clearTimeout(dropdownTimer.current);
                    setOpenGroup(g.key);
                  }}
                  onMouseLeave={() => {
                    dropdownTimer.current = setTimeout(() => {
                      setOpenGroup(null);
                    }, 320);
                  }}
                >
                  <button
                    type="button"
                    className={`px-${isAdmin ? '2' : '3'} py-${isAdmin ? '1' : '1.5'} rounded font-medium text-green-900 hover:bg-green-50 focus:bg-green-100 transition border-b-2 ${active ? "border-green-600 bg-green-50" : "border-transparent"} ${isAdmin ? 'text-[11px]' : 'text-[12.5px]'} font-sans tracking-tight flex items-center justify-between min-w-[0]`}
                    onClick={() => setOpenGroup(isOpen ? null : g.key)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    style={isAdmin ? {fontFamily:'Inter, Segoe UI, Arial, sans-serif', paddingLeft:8, paddingRight:8, minWidth:0} : {fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}
                  >
                    <span className="truncate flex-1 text-left">{g.label}</span>
                    <svg className="ml-1 w-4 h-4 text-green-700 flex-shrink-0" style={{verticalAlign:'middle', display:'inline-block'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div
                    className={`absolute left-0 mt-2 min-w-[200px] bg-white border border-green-100 rounded shadow-lg py-2 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}
                    style={isAdmin ? {fontFamily:'Inter, Segoe UI, Arial, sans-serif', fontSize:'11px', fontWeight:500, letterSpacing:'.01em'} : {fontFamily:'Inter, Segoe UI, Arial, sans-serif', fontSize:'12px', fontWeight:500, letterSpacing:'.01em'}}
                    onMouseEnter={() => {
                      clearTimeout(dropdownTimer.current);
                      setOpenGroup(g.key);
                    }}
                    onMouseLeave={() => {
                      dropdownTimer.current = setTimeout(() => {
                        setOpenGroup(null);
                      }, 320);
                    }}
                  >
                    {g.items.map(i => (
                      <NavLink
                        key={i.to}
                        to={i.to}
                        className={({ isActive }) => `block px-3 py-2 text-green-900 hover:bg-green-50 rounded transition ${isAdmin ? 'text-[10.5px]' : 'text-[12px]'} ${isActive ? "bg-green-100 font-semibold" : ""}`}
                        onClick={() => setOpenGroup(null)}
                        style={isAdmin ? {fontFamily:'Inter, Segoe UI, Arial, sans-serif', fontSize:'11px'} : {fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}
                      >
                        {i.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            })}
            {singles.map(s => (
              <NavLink
                key={s.to}
                to={s.to}
                className={({ isActive }) => `${isAdmin ? 'px-2 py-1 text-[11px]' : 'px-4 py-2 text-[13px]'} font-bold rounded-none text-green-900 hover:bg-green-50 focus:bg-green-100 border-b-2 transition ${isActive ? "border-green-600 bg-green-50" : "border-transparent"}`}
                style={isAdmin ? {minWidth:0, fontSize:'11px'} : {}}
              >
                {s.label}
              </NavLink>
            ))}
            {user?.is_admin && (
              <NavLink to="/users" className={({ isActive }) => `${isAdmin ? 'px-2 py-1 text-[11px]' : 'px-4 py-2 text-[13px]'} font-bold rounded-none text-blue-800 hover:bg-blue-50 border-b-2 transition ${isActive ? "border-blue-600 bg-blue-50" : "border-transparent"}`}>{lang.startsWith("ar") ? "إنشاء مدير" : "Créer Admin"}</NavLink>
            )}
            {user && (
              <button onClick={logout} className={`${isAdmin ? 'px-2 py-1 text-[11px]' : 'px-4 py-2 text-[13px]'} font-bold rounded-none text-red-700 hover:bg-red-50 border-b-2 border-transparent transition`}>{lang.startsWith("ar") ? "تسجيل الخروج" : t("logout")}</button>
            )}
          </div>

          {/* Search bar (center/right, hidden on mobile) */}
          <form onSubmit={submitSearch} className="hidden lg:flex items-center ms-4 me-4 w-[180px] bg-green-50 rounded-full px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-green-300 transition animated-search-bar-glow" style={{position:'relative', zIndex:1, marginRight:'1.25rem', marginLeft:'0.5rem'}}>
      {/* Animated glowing border for search bar edges only */}
      <style>{`
        .animated-search-bar-glow {
          border-radius: 9999px;
          box-shadow: none;
        }
        .animated-search-bar-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          padding: 0;
          z-index: 2;
          pointer-events: none;
          border: 2.5px solid transparent;
          background: linear-gradient(90deg,#38b000,#0081a7,#ffd60a,#38b000) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: searchBarGlowAnim 3.5s linear infinite;
        }
        @keyframes searchBarGlowAnim {
          0% { background: linear-gradient(90deg,#38b000,#0081a7,#ffd60a,#38b000) border-box; box-shadow: 0 0 8px 2px #38b00044; }
          25% { background: linear-gradient(90deg,#0081a7,#ffd60a,#38b000,#0081a7) border-box; box-shadow: 0 0 8px 2px #0081a744; }
          50% { background: linear-gradient(90deg,#ffd60a,#38b000,#0081a7,#ffd60a) border-box; box-shadow: 0 0 8px 2px #ffd60a44; }
          75% { background: linear-gradient(90deg,#38b000,#ffd60a,#0081a7,#38b000) border-box; box-shadow: 0 0 8px 2px #38b00044; }
          100% { background: linear-gradient(90deg,#38b000,#0081a7,#ffd60a,#38b000) border-box; box-shadow: 0 0 8px 2px #38b00044; }
        }
        .search-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #38b000;
          opacity: 0.85;
          pointer-events: none;
        }
        .search-input-with-icon {
          padding-left: 2.2rem !important;
        }
      `}</style>
            <span className="search-input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e=>{
                if(e.key==="Escape"){
                  setSearchTerm("");
                  if (location.pathname.startsWith("/news")) {
                    navigate("/news", { replace:true });
                  }
                }
              }}
              placeholder={lang.startsWith("ar") ? "بحث..." : "Rechercher..."}
              aria-label={lang.startsWith("ar") ? "بحث" : "Search news"}
              className="flex-1 bg-transparent border-none outline-none text-green-900 placeholder:text-green-400 text-[14px] px-2 search-input-with-icon"
              style={{fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded-full p-1.5 transition flex items-center justify-center" style={{marginLeft: '0.25rem'}} />
          </form>

          {/* Language switch (right, hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-0.5 ms-2">
            {/* Language Switcher - Simple FR/AR text buttons */}
            <div className="relative flex bg-green-100 rounded-full p-1 shadow-inner border border-green-200" style={{minWidth:90, width:100, height:38}}>
              <button
                type="button"
                onClick={()=>handleLangSwitch('fr')}
                className={`flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition z-10 relative focus:outline-none ${lang==='fr' ? 'bg-green-600 text-white shadow' : 'text-green-800 hover:bg-green-200'}`}
                aria-pressed={lang==='fr'}
                style={{fontFamily:'Inter, Segoe UI, Arial, sans-serif', zIndex:2, minWidth:44}}
              >
                FR
              </button>
              <button
                type="button"
                onClick={()=>handleLangSwitch('ar')}
                className={`flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition z-10 relative focus:outline-none ${lang==='ar' ? 'bg-green-600 text-white shadow' : 'text-green-800 hover:bg-green-200'}`}
                aria-pressed={lang==='ar'}
                style={{fontFamily:'Inter, Segoe UI, Arial, sans-serif', zIndex:2, minWidth:44}}
              >
                AR
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden ms-auto">
            <button
              type="button"
              aria-label={mobileOpen ? (lang.startsWith('ar')? 'إغلاق القائمة':'Fermer le menu') : (lang.startsWith('ar')? 'فتح القائمة':'Ouvrir le menu')}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition"
              onClick={()=> setMobileOpen(o=>!o)}
            >
              <svg className={`w-7 h-7 transition-transform ${mobileOpen ? 'scale-0' : 'scale-100'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" /></svg>
              <svg className={`w-7 h-7 absolute transition-transform ${mobileOpen ? 'scale-100' : 'scale-0'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
            </button>
          </div>
        </nav>
      </header>
      {/* News ticker now appears below navbar */}
      <NavNewsTicker lang={lang} />

      {/* Mobile slide-in menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-white shadow-xl h-full flex flex-col p-4 animate-slideInLeft relative">
            <button className="absolute top-3 right-3 text-green-700 hover:text-green-900" onClick={()=> setMobileOpen(false)} aria-label={lang.startsWith('ar')? 'إغلاق':'Fermer'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
            </button>
            <div className="flex flex-col gap-2 mt-8">
              {groups.map(g => {
                const open = openGroup === g.key;
                return (
                  <div key={g.key} className="mb-1">
                    <button
                      type="button"
                      className={`w-full flex justify-between items-center px-3 py-2 font-bold text-green-900 rounded hover:bg-green-50 focus:bg-green-100 border-b-2 ${open ? 'border-green-600 bg-green-50' : 'border-transparent'}`}
                      onClick={() => setOpenGroup(open ? null : g.key)}
                      aria-expanded={open}
                      aria-controls={`mob-acc-${g.key}`}
                    >
                      <span>{g.label}</span>
                      <svg className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {open && (
                      <div id={`mob-acc-${g.key}`} className="pl-3 py-1 flex flex-col gap-1 animate-fadeIn">
                        {g.items.map(i => (
                          <NavLink
                            key={i.to}
                            to={i.to}
                            className={({ isActive }) => `block px-3 py-1 text-green-900 rounded hover:bg-green-50 transition ${isActive ? 'bg-green-100 font-bold' : ''}`}
                            onClick={() => { setMobileOpen(false); setOpenGroup(null); }}
                          >
                            {i.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="border-t border-green-100 my-2" />
              {singles.map(s => (
                <NavLink
                  key={s.to}
                  to={s.to}
                  className={({ isActive }) => `block px-3 py-2 font-bold text-green-900 rounded hover:bg-green-50 transition ${isActive ? 'bg-green-100 font-bold' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
                </NavLink>
              ))}
              {user?.is_admin && (
                <NavLink to="/users" className={({ isActive }) => `block px-3 py-2 font-bold text-blue-800 rounded hover:bg-blue-50 transition ${isActive ? 'bg-blue-100 font-bold' : ''}`} onClick={() => setMobileOpen(false)}>{lang.startsWith("ar") ? "إنشاء مدير" : "Créer Admin"}</NavLink>
              )}
              {user && (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 font-bold text-red-700 rounded hover:bg-red-50 transition">{lang.startsWith("ar") ? "تسجيل الخروج" : t("logout")}</button>
              )}
              <form onSubmit={submitSearch} className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder={lang.startsWith("ar") ? "بحث..." : "Rechercher..."}
                  className="flex-1 px-3 py-2 rounded border border-green-200 bg-green-50 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                />
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition"><svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              </form>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={()=>handleLangSwitch('fr')}
                  className={`flex-1 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition ${lang==='fr' ? 'bg-green-600 text-white shadow' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  aria-pressed={lang==='fr'}
                >FR</button>
                <button
                  type="button"
                  onClick={()=>handleLangSwitch('ar')}
                  className={`flex-1 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition ${lang==='ar' ? 'bg-green-600 text-white shadow' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  aria-pressed={lang==='ar'}
                >AR</button>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={()=> setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
