import React, { useEffect, useState } from "react";

/**
 * Props:
 *  - lang: 'fr' | 'ar'
 *  - slug: current page slug
 *  - theme: 'light' | 'futuristic-dark' (auto fallback)
 */
export default function PageSidebar({ lang = "fr", theme = "light" }) {
  return (
    <aside className="hidden xl:flex flex-col gap-7 w-[330px]" aria-label={lang==='ar'? 'معلومات مساعدة':'Informations utiles'}>
      <SidebarStyle />
      <EmergencyNumbers lang={lang} theme={theme} />
  <WeatherBlock lang={lang} theme={theme} />
      <UsefulPhones lang={lang} theme={theme} />
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

/* Emergency Numbers Card */
function EmergencyNumbers({ lang, theme }) {
  const frRows = [
    ['PROVINCE D\'EL HAJEB','-','035-54-36-71/72/73'],
    ['SÛRETÉ NATIONALE','19','0535542760'],
    ['GENDARMERIE ROYALE','177','035-54-30-13'],
    ['PROTECTION CIVILE','150','0535543677'],
    ['HOPITAL D\'EL HAJEB','-','035-54-26-75'],
  ];
  // Arabic placeholders (can be translated later)
  const arRows = [
    ['عمالة الحاجب','-','035-54-36-71/72/73'],
    ['الأمن الوطني','19','0535542760'],
    ['الدرك الملكي','177','035-54-30-13'],
    ['الوقاية المدنية','150','0535543677'],
    ['مستشفى الحاجب','-','035-54-26-75'],
  ];
  const rows = lang==='ar'? arRows : frRows;
  return (
    <Card title={lang==='ar'? 'أرقام الطوارئ' : 'Numéros d\'urgence'} theme={theme} accent="rose">
      <ul className="ps-emerg-list">
        {rows.map(r=> (
          <li key={r[0]} className="em-row">
            <span className="em-admin" dir={lang==='ar'? 'rtl':'ltr'}>{r[0]}</span>
            <span className="em-nv">{r[1]}</span>
            <a href={`tel:${r[2]}`} className="em-phone">{r[2]}</a>
          </li>
        ))}
      </ul>
      <p className="ps-footnote">{lang==='ar'? 'مباشرة وسريعة':'Accès rapide'}</p>
    </Card>
  );
}

/* Useful Phones (long list) */
function UsefulPhones({ lang, theme }) {
  const listFR = [
    ['ITTISSALAT AL MAGHRIB','0535-54-11-84'],
    ['TRESORERIE PROVINCIALE','0535-54-23-75'],
    ['PERCEPTION D\'EL HAJEB','0535-54-22-24'],
    ['CAISSE REGIONALE DU CREDIT AGRICOLE','0535-54-34-14'],
    ['DELEGATION PROV. AGRICULTURE','0535-54-33-03'],
    ['DELEGATION PROV. SANTE','0535-54-31-59'],
    ['DELEGATION PROV. EDUCATION','0535-54-37-14'],
    ['DELEGATION JEUNESSE & SPORTS','0535-54-32-92'],
    ['ONEP EAU POTABLE','0535-54-21-73'],
    ['ONE ELECTRICITE','0535-54-28-78'],
    ['POSTE & TELECOM','0535-54-16-11 / 12-26'],
    ['SUBDIVISION EQUIPEMENT','06-79-82-47-09'],
    ['COMMUNE EL HAJEB','0535-54-17-28'],
    ['COMMUNE SEBAA AYOUne','0535-54-60-05'],
    ['COMMUNE AGOURAI','0535-43-00-08'],
    ['COMMUNE AIN TAOUJDATE','0535-44-15-13'],
    ['C.R AIT OUKHAFEN','0535-52-74-47'],
    ['C.R AIT YAAZEM','0535-51-74-01'],
    ['C.R SEBT JAHJOUH','0535-52-00-36'],
    ['C.R RAS IJJERRI','0535-52-44-77'],
    ['C.R TAMCHACHAT','0535-41-03-57'],
    ['C.R AIT BOURZOUINE','0535-43-64-85 / 86'],
    ['C.R AIT AAZMANE','0535-54-12-56'],
    ['C.R IQADDAR','0535-54-23-66'],
    ['C.R AIT BOUBIDMANE','0535-54-63-21'],
    ['C.R AIT HARZELLAH','0535-54-12-42'],
    ['C.R EL MASSIRA','0535-44-08-83'],
    ['C.R GUIABES','0535-44-04-06'],
  ];
  // Arabic placeholders (can translate later)
  const listAR = listFR.map(([n,p])=> [n, p]);
  const list = lang==='ar'? listAR : listFR;
  return (
    <Card title={lang==='ar'? 'هواتف مفيدة' : 'Téléphones utiles'} theme={theme} accent="emerald">
      <ul className="ps-phone-long">
        {list.map(([n,p]) => (
          <li key={n} className="ph-row">
            <span className="ph-name" dir={lang==='ar'? 'rtl':'ltr'}>{n}</span>
            <a href={`tel:${p}`} className="ph-number">{p}</a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* Weather (live via Open-Meteo) */
function WeatherBlock({ lang, theme }) {
  const [w, setW] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.69&longitude=-5.37&current_weather=true", { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setW(j.current_weather))
      .catch(e => { if(e.name !== 'AbortError') setErr(true); });
    return () => ctrl.abort();
  }, []);
  return (
    <Card title={lang==='ar'? 'الطقس' : 'Météo'} theme={theme} accent="cyan">
      {!w && !err && <div className="ps-skel-line h-8 w-32" />}
      {err && <div className="ps-error">{lang==='ar'? 'تعذر التحميل' : 'Indispo.'}</div>}
      {w && (
        <div className="ps-weather">
          <div className="ps-temp">
            <span className="deg">{Math.round(w.temperature)}°C</span>
            <span className="ws">{lang==='ar'? 'رياح' : 'Vent'} {Math.round(w.windspeed)} km/h</span>
          </div>
          <div className="ps-meta">{lang==='ar'? 'المصدر: Open‑Meteo' : 'Source : Open‑Meteo'}</div>
        </div>
      )}
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
  /* Emergency list */
  .ps-emerg-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.55rem;}
  .em-row{display:flex;flex-direction:column;gap:.25rem;padding:.55rem .7rem;border:1px solid #10b98133;border-radius:.9rem;background:linear-gradient(120deg,#f0fdf4,#ffffff);}
  .ps-dark .em-row{background:linear-gradient(140deg,#093c34,#0b3a45);}      
  .em-admin{font-size:.6rem;font-weight:700;letter-spacing:.04em;color:#065f46;}
  .ps-dark .em-admin{color:#d1fae5;}
  .em-nv{font-size:.55rem;font-weight:600;opacity:.75;}
  .em-phone{font-size:.58rem;font-weight:700;color:#065f46;text-decoration:none;align-self:flex-start;padding:.32rem .55rem;border-radius:.7rem;background:linear-gradient(120deg,#d1fae5,#a7f3d0);box-shadow:0 0 0 1px #10b98155 inset;transition:.3s;}
  .em-phone:hover{transform:translateY(-2px);box-shadow:0 6px 16px -6px rgba(16,185,129,.4);}      
  .ps-dark .em-phone{color:#e6fff8;background:linear-gradient(120deg,#0d5f50,#0a4d5a);} 

  /* Long phone list */
  .ps-phone-long{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.45rem;max-height:520px;overflow:auto;scrollbar-width:thin;}
  .ps-phone-long::-webkit-scrollbar{width:6px;}
  .ps-phone-long::-webkit-scrollbar-thumb{background:#10b98188;border-radius:3px;}
  .ph-row{display:flex;flex-direction:column;padding:.5rem .65rem;border:1px solid #10b98122;border-radius:.85rem;background:linear-gradient(120deg,#ffffff,#f0fdf4);} 
  .ps-dark .ph-row{background:linear-gradient(160deg,#083a34,#052e33);}     
  .ph-name{font-size:.58rem;font-weight:600;letter-spacing:.035em;color:#065f46;margin-bottom:.25rem;}
  .ps-dark .ph-name{color:#d1fae5;}
  .ph-number{font-size:.56rem;font-weight:700;letter-spacing:.05em;text-decoration:none;color:#047857;align-self:flex-start;padding:.34rem .55rem;border-radius:.65rem;background:linear-gradient(120deg,#d1fae5,#a7f3d0);box-shadow:0 0 0 1px #10b98155 inset;transition:.3s;}
  .ph-number:hover{transform:translateY(-2px);box-shadow:0 6px 16px -6px rgba(16,185,129,.4);}      
  .ps-dark .ph-number{color:#e6fff8;background:linear-gradient(120deg,#0d5f50,#0a4d5a);}    

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