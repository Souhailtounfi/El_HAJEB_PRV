import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * Props:
 *  - lang: 'fr' | 'ar'
 *  - slug: current page slug
 *  - theme: 'light' | 'futuristic-dark' (auto fallback)
 */
export default function PageSidebar({ lang = "fr", slug = "", theme = "light" }) {
  return (
    <aside className="hidden xl:flex flex-col gap-7 w-[330px]" aria-label="Page auxiliary information">
      <SidebarStyle />
      <CityPulse lang={lang} theme={theme} />
      <WeatherBlock lang={lang} theme={theme} />
      <QuickNav lang={lang} slug={slug} theme={theme} />
      <FocusLinks lang={lang} theme={theme} />
      <ContactsCard lang={lang} theme={theme} />
    </aside>
  );
}

/* Shared card shell */
function Card({ title, children, theme, accent }) {
  return (
    <div className={`ps-card ${theme === "futuristic-dark" ? "ps-dark" : "ps-light"}`}>
      <div className="ps-card-head">
        <h3 className="ps-card-title">
          <span className={`ps-dot ${accent || ""}`} />
          {title}
        </h3>
      </div>
      <div className="ps-card-body">{children}</div>
    </div>
  );
}

/* Animated city metrics */
function CityPulse({ lang, theme }) {
  const data = [
    { k: lang === "ar" ? "السكان" : "Population", v: "130K", t: "pop" },
    { k: lang === "ar" ? "المساحة" : "Superficie", v: "2.2K km²", t: "area" },
    { k: lang === "ar" ? "الارتفاع" : "Altitude", v: "1050m", t: "alt" },
    { k: lang === "ar" ? "مؤشر نمو" : "Indice Croissance", v: "+4.2%", t: "growth" },
  ];
  return (
    <Card
      title={lang === "ar" ? "نبض المدينة" : "Pulse Urbaine"}
      theme={theme}
      accent="emerald"
    >
      <ul className="ps-pulse-list">
        {data.map(d => (
          <li key={d.t} className="ps-pulse-item">
            <span className="ps-pulse-key" dir={lang === "ar" ? "rtl" : "ltr"}>{d.k}</span>
            <span className={`ps-pulse-val tag-${d.t}`}>{d.v}</span>
          </li>
        ))}
      </ul>
      <p className="ps-footnote">
        {lang === "ar" ? "قيم تقريبية للعرض — قابلة للتحديث." : "Valeurs indicatives — à affiner."}
      </p>
    </Card>
  );
}

/* Weather with graceful abort + shimmer */
function WeatherBlock({ lang, theme }) {
  const [w, setW] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.69&longitude=-5.37&current_weather=true", { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setW(j.current_weather))
      .catch(e => {
        if (e.name !== "AbortError") setErr(true);
      });
    return () => ctrl.abort();
  }, []);
  return (
    <Card
      title={lang === "ar" ? "الطقس" : "Météo"}
      theme={theme}
      accent="cyan"
    >
      {!w && !err && <div className="ps-skel-line h-8 w-32" />}
      {err && <div className="ps-error">{lang === "ar" ? "تعذر التحميل" : "Indispo."}</div>}
      {w && (
        <div className="ps-weather">
          <div className="ps-temp">
            <span className="deg">{Math.round(w.temperature)}°C</span>
            <span className="ws">
              {lang === "ar" ? "رياح" : "Vent"} {Math.round(w.windspeed)} km/h
            </span>
          </div>
          <div className="ps-meta">
            {lang === "ar" ? "المصدر: Open‑Meteo" : "Source : Open‑Meteo"}
          </div>
        </div>
      )}
    </Card>
  );
}

/* Quick navigation anchors by slug */
function QuickNav({ lang, slug, theme }) {
  const map = {
    "situation-geographique": [
      { id: "map", fr: "Carte", ar: "الخريطة" },
      { id: "description", fr: "Texte", ar: "النص" },
    ],
    "apercu-historique": [
      { id: "description", fr: "Texte", ar: "النص" },
    ],
    "presentation-generale": [
      { id: "description", fr: "Contenu", ar: "المحتوى" },
    ],
  };
  const list = map[slug] || [];
  return (
    <Card
      title={lang === "ar" ? "تنقل" : "Navigation"}
      theme={theme}
      accent="violet"
    >
      {list.length === 0 && (
        <p className="ps-empty">{lang === "ar" ? "لا عناصر" : "Aucun lien"}</p>
      )}
      {list.length > 0 && (
        <ul className="ps-links">
          {list.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="ps-anchor">
                <span className="b" />
                <span>{lang === "ar" ? l.ar : l.fr}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="ps-back">
        <Link to="/presentation-generale" className="ps-back-link">
          {lang === "ar" ? "العودة للقسم" : "Retour section"}
        </Link>
      </div>
    </Card>
  );
}

/* Curated static + external placeholders */
function FocusLinks({ lang, theme }) {
  const items = [
    { fr: "Patrimoine & Sites", ar: "الموروث و المواقع", to: "#", tag: "pat" },
    { fr: "Cartes stratégiques", ar: "خرائط إستراتيجية", to: "#", tag: "map" },
    { fr: "Projets récents", ar: "مشاريع حديثة", to: "#", tag: "dev" },
  ];
  return (
    <Card
      title={lang === "ar" ? "محاور مميزة" : "Focus"}
      theme={theme}
      accent="amber"
    >
      <ul className="ps-focus">
        {items.map(i => (
          <li key={i.tag}>
            <a href={i.to} className={`ps-focus-chip chip-${i.tag}`} onClick={e => e.preventDefault()}>
              <span className="dot" />
              {lang === "ar" ? i.ar : i.fr}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* Useful contacts (accessible) */
function ContactsCard({ lang, theme }) {
  const contacts = [
    { fr: "Mairie", ar: "البلدية", tel: "05 xx xx xx xx" },
    { fr: "Protection Civile", ar: "الوقاية المدنية", tel: "15" },
    { fr: "Police", ar: "الشرطة", tel: "19" },
    { fr: "Urgences", ar: "الطوارئ", tel: "150" },
  ];
  return (
    <Card
      title={lang === "ar" ? "أرقام" : "Contacts"}
      theme={theme}
      accent="rose"
    >
      <ul className="ps-contacts">
        {contacts.map((c, i) => (
            <li key={i}>
              <span className="label" dir={lang === "ar" ? "rtl" : "ltr"}>
                {lang === "ar" ? c.ar : c.fr}
              </span>
              <a className="phone" href={`tel:${c.tel}`}>{c.tel}</a>
            </li>
        ))}
      </ul>
      <p className="ps-footnote">{lang === "ar" ? "قابلة للتحديث." : "À mettre à jour."}</p>
    </Card>
  );
}

/* Styles (scoped class names) */
function SidebarStyle() {
  return (
    <style>{`
      .ps-card{
        position:relative;
        overflow:hidden;
        border-radius:1.55rem;
        border:1px solid rgba(0,0,0,0.08);
      }
      .ps-dark{
        background:linear-gradient(155deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03));
        backdrop-filter:blur(20px) saturate(170%);
        border-color:rgba(255,255,255,0.12);
      }
      .ps-light{
        background:linear-gradient(145deg,#ffffffcc,#f6fdf8dd);
        backdrop-filter:blur(10px);
      }
      .ps-card:before{
        content:"";
        position:absolute;
        inset:0;
        background:
          radial-gradient(circle at 80% 10%,rgba(16,185,129,0.18),transparent 60%),
          radial-gradient(circle at 10% 85%,rgba(14,165,233,0.18),transparent 55%);
        opacity:.55;
        mix-blend-mode:overlay;
        pointer-events:none;
      }
      .ps-card-head{
        padding:.95rem 1.15rem .8rem;
      }
      .ps-card-title{
        margin:0;
        font-size:.68rem;
        letter-spacing:.18em;
        font-weight:800;
        text-transform:uppercase;
        display:flex;
        align-items:center;
        gap:.55rem;
        background:linear-gradient(90deg,#065f46,#0ea5e9,#6366f1);
        -webkit-background-clip:text;
        color:transparent;
        white-space:nowrap;
      }
      .ps-dot{
        width:.55rem;height:.55rem;
        border-radius:50%;
        background:linear-gradient(120deg,#10b981,#0ea5e9);
        box-shadow:0 0 0 4px #10b98133,0 0 8px #0ea5e955;
      }
      .ps-card-body{
        position:relative;
        padding:0 1.15rem 1.2rem;
        font-size:.72rem;
        line-height:1.55;
        font-weight:500;
      }

      /* Pulse list */
      .ps-pulse-list{
        list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.65rem;
      }
      .ps-pulse-item{
        display:flex;align-items:center;justify-content:space-between;gap:.75rem;
      }
      .ps-pulse-key{
        font-weight:600;
        font-size:.63rem;
        color:#2f4f46;
      }
      .ps-dark .ps-pulse-key{color:#d9f6ec;}
      .ps-pulse-val{
        font-size:.6rem;
        font-weight:700;
        letter-spacing:.05em;
        padding:.45rem .7rem;
        border-radius:1rem;
        position:relative;
        background:linear-gradient(120deg,#10b98133,#0ea5e933);
        color:#065f46;
        border:1px solid #10b98166;
      }
      .ps-dark .ps-pulse-val{color:#e3fdf5;}
      .ps-pulse-val:before{
        content:"";
        position:absolute;
        inset:0;
        border-radius:inherit;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
        opacity:.35;
      }
      .tag-growth{background:linear-gradient(120deg,#10b98155,#6ee7b755)!important;}
      .tag-alt{background:linear-gradient(120deg,#0ea5e955,#67e8f955)!important;}

      .ps-footnote{
        margin-top:.8rem;
        font-size:.55rem;
        letter-spacing:.04em;
        opacity:.7;
      }
      .ps-dark .ps-footnote{color:#bcefe2;}

      /* Weather */
      .ps-weather .ps-temp{
        display:flex;align-items:flex-end;gap:.65rem;
      }
      .ps-weather .deg{
        font-size:1.85rem;
        font-weight:700;
        background:linear-gradient(90deg,#10b981,#0ea5e9);
        -webkit-background-clip:text;
        color:transparent;
      }
      .ps-weather .ws{
        font-size:.6rem;
        font-weight:600;
        letter-spacing:.04em;
        opacity:.8;
      }
      .ps-weather .ps-meta{
        margin-top:.5rem;
        font-size:.52rem;
        letter-spacing:.05em;
        opacity:.65;
      }
      .ps-error{
        font-size:.6rem;
        font-weight:600;
        color:#b91c1c;
      }
      .ps-dark .ps-error{color:#fca5a5;}
      .ps-skel-line{
        background:linear-gradient(90deg,#d1fae5,#ecfdf5,#d1fae5);
        background-size:220% 100%;
        animation:ps-shimmer 2.2s ease-in-out infinite;
        border-radius:.6rem;
      }
      .ps-dark .ps-skel-line{
        background:linear-gradient(90deg,#064e3b,#0f766e,#064e3b);
      }
      @keyframes ps-shimmer{
        0%{background-position:0 0;}
        50%{background-position:120% 0;}
        100%{background-position:0 0;}
      }

      /* Quick nav */
      .ps-links{
        list-style:none;margin:.1rem 0 0;padding:0;display:flex;flex-direction:column;gap:.45rem;
      }
      .ps-links li{position:relative;}
      .ps-anchor{
        display:flex;align-items:center;gap:.6rem;
        text-decoration:none;
        font-size:.62rem;
        font-weight:600;
        letter-spacing:.04em;
        color:#065f46;
        padding:.45rem .65rem;
        border-radius:.9rem;
        background:linear-gradient(120deg,#f0fdf4,#ecfeff);
        transition:.3s;
        position:relative;
      }
      .ps-anchor .b{
        width:6px;height:6px;border-radius:50%;
        background:linear-gradient(90deg,#10b981,#0ea5e9);
        box-shadow:0 0 0 4px #10b98122,0 0 8px #0ea5e955;
      }
      .ps-anchor:hover{
        transform:translateX(4px);
        background:linear-gradient(120deg,#d1fae5,#cffafe);
      }
      .ps-dark .ps-anchor{
        background:linear-gradient(120deg,#083b33,#062f3a);
        color:#d5f7ef;
      }
      .ps-dark .ps-anchor:hover{
        background:linear-gradient(120deg,#0b5c4d,#0b4a55);
      }
      .ps-empty{
        font-size:.58rem;
        font-weight:600;
        opacity:.6;
        margin-top:.2rem;
      }
      .ps-back{
        margin-top:.9rem;
      }
      .ps-back-link{
        font-size:.55rem;
        font-weight:700;
        letter-spacing:.05em;
        text-decoration:none;
        color:#047857;
      }
      .ps-back-link:hover{text-decoration:underline;}
      .ps-dark .ps-back-link{color:#34d399;}

      /* Focus chips */
      .ps-focus{
        list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.55rem;
      }
      .ps-focus-chip{
        position:relative;
        display:inline-flex;
        align-items:center;
        gap:.45rem;
        padding:.55rem .8rem;
        font-size:.55rem;
        font-weight:700;
        letter-spacing:.05em;
        border-radius:1rem;
        text-decoration:none;
        cursor:default;
        background:linear-gradient(120deg,#ffffff,#f0fdf4);
        color:#065f46;
        border:1px solid #10b98133;
        transition:.35s;
        overflow:hidden;
      }
      .ps-focus-chip .dot{
        width:.45rem;height:.45rem;border-radius:50%;
        background:linear-gradient(90deg,#10b981,#0ea5e9);
        box-shadow:0 0 0 4px #10b98122;
      }
      .ps-focus-chip:after{
        content:"";
        position:absolute;
        inset:0;
        background:linear-gradient(120deg,rgba(255,255,255,.5),transparent 60%);
        opacity:0;
        transition:.5s;
      }
      .ps-focus-chip:hover:after{opacity:.55;}
      .ps-focus-chip:hover{
        transform:translateY(-3px);
        box-shadow:0 8px 22px -8px rgba(16,185,129,.35);
      }
      .ps-dark .ps-focus-chip{
        background:linear-gradient(160deg,#083a34,#052e33);
        color:#d8fef5;
        border-color:#0ea5e955;
      }

      .chip-map{background:linear-gradient(120deg,#bfdbfe,#d1fae5);}
      .chip-dev{background:linear-gradient(120deg,#fde68a,#a7f3d0);}
      .chip-pat{background:linear-gradient(120deg,#fbcfe8,#a5f3fc);}
      .ps-dark .chip-map{background:linear-gradient(120deg,#1e3a8a55,#064e3b66);}
      .ps-dark .chip-dev{background:linear-gradient(120deg,#713f1255,#065f4655);}
      .ps-dark .chip-pat{background:linear-gradient(120deg,#6d28d955,#0e749055);}

      /* Contacts */
      .ps-contacts{
        list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.55rem;
      }
      .ps-contacts li{
        display:flex;align-items:center;justify-content:space-between;gap:.65rem;
        padding:.45rem .55rem;
        border-radius:.85rem;
        background:linear-gradient(120deg,#f0fdf4,#f5fffc);
      }
      .ps-dark .ps-contacts li{
        background:linear-gradient(140deg,#093c34,#0b3a45);
      }
      .ps-contacts .label{
        font-size:.6rem;font-weight:600;letter-spacing:.04em;
      }
      .ps-contacts .phone{
        font-size:.55rem;font-weight:700;
        letter-spacing:.05em;
        padding:.4rem .65rem;
        border-radius:.7rem;
        text-decoration:none;
        color:#065f46;
        background:linear-gradient(120deg,#d1fae5,#a7f3d0);
        box-shadow:0 0 0 1px #10b98155 inset;
        transition:.35s;
      }
      .ps-dark .ps-contacts .phone{
        color:#e6fff8;
        background:linear-gradient(120deg,#0d5f50,#0a4d5a);
        box-shadow:0 0 0 1px #10b98166 inset;
      }
      .ps-contacts .phone:hover{
        transform:translateY(-2px);
        box-shadow:0 6px 16px -6px rgba(16,185,129,.4);
      }

    `}</style>
  );
}