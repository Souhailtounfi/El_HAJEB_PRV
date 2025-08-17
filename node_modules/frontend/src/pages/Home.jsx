import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "../services/api";
import daya from "../assets/daya.png";

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [bgLoaded, setBgLoaded] = useState(false);
  const [latest, setLatest] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = daya;
    img.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoadingNews(true);
        const r = await api.get("/news");
        const arr = (r.data || [])
          .slice(-9)
          .reverse()
          .slice(0, 3);
        setLatest(arr);
      } catch {
        setLatest([]);
      } finally {
        setLoadingNews(false);
      }
    })();
  }, []);

  const highlights = [
    {
      icon: "🌿",
      fr: "Un cadre naturel exceptionnel",
      ar: "بيئة طبيعية استثنائية",
      frTxt:
        "Forêts, sources, reliefs du Moyen Atlas et biodiversité remarquable.",
      arTxt: "غابات وينابيع وتنوع طبيعي في قلب الأطلس المتوسط.",
    },
    {
      icon: "🚧",
      fr: "Infrastructures en essor",
      ar: "بنية تحتية متطورة",
      frTxt:
        "Réseau routier, eau potable, énergie et équipements publics structurants.",
      arTxt: "شبكة طرق وماء صالح للشرب وطاقة ومرافق عمومية مهيكلة.",
    },
    {
      icon: "👥",
      fr: "Capital humain dynamique",
      ar: "رأس مال بشري نشِط",
      frTxt: "Population jeune, formation et potentiel d'innovation.",
      arTxt: "سكان شباب، تكوين وإمكانات للابتكار.",
    },
    {
      icon: "🌾",
      fr: "Économie productive",
      ar: "اقتصاد منتج",
      frTxt: "Agriculture, artisanat, tourisme rural & filières locales.",
      arTxt: "فلاحة وصناعة تقليدية وسياحة قروية وقطاعات محلية.",
    },
  ];

  const keyPoints = [
    lang === "ar" ? "موارد مائية وغابات" : "Ressources hydriques & forêts",
    lang === "ar" ? "تنوع اقتصادي محلي" : "Diversité économique locale",
    lang === "ar" ? "إمكانات سياحية مستدامة" : "Potentiel touristique durable",
    lang === "ar" ? "مجتمع متفاعل وفتِي" : "Communauté jeune & engagée",
  ];

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(lang === "ar" ? "ar-MA" : "fr-FR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <main dir={dir} className="relative font-sans text-gray-800 overflow-hidden">
      <style>
        {`
          .hero-bg{
            position:absolute;inset:0;
            background:
              linear-gradient(220deg,rgba(4,120,87,.80),rgba(16,185,129,.55),rgba(6,95,70,.85)),
              url(${daya});
            background-size:cover;
            background-position:center;
            background-attachment:fixed;
            filter:brightness(.95) contrast(1.05);
            transform:scale(1.08);
            opacity:${bgLoaded ? 1 : 0};
            transition:opacity 1.2s ease, transform 12s linear;
            animation:slowZoom 28s linear infinite alternate;
          }
          @keyframes slowZoom {
            0% { transform:scale(1.06) translateY(0); }
            50% { transform:scale(1.1) translateY(-1.2%); }
            100% { transform:scale(1.06) translateY(0); }
          }
          .hero-noise:after{
            content:"";
            position:absolute;inset:0;
            background:
              radial-gradient(circle at 15% 20%,rgba(255,255,255,.18),transparent 60%),
              radial-gradient(circle at 85% 75%,rgba(255,255,255,.12),transparent 65%);
            mix-blend-mode:overlay;
            pointer-events:none;
          }
          .title-grad{
            background:linear-gradient(90deg,#ecfdf5,#d1fae5,#a7f3d0);
            -webkit-background-clip:text;color:transparent;
          }
          .glass-tile{
            background:linear-gradient(145deg,rgba(255,255,255,0.75),rgba(255,255,255,0.55));
            backdrop-filter:blur(18px) saturate(180%);
            transition:.4s;
          }
          .glass-tile:hover{
            background:linear-gradient(145deg,rgba(255,255,255,0.82),rgba(255,255,255,0.65));
            transform:translateY(-4px);
          }
          .fade-section{ animation:fadeUp .85s ease both; }
          @keyframes fadeUp {
            0% { opacity:0; transform:translateY(24px); }
            100% { opacity:1; transform:translateY(0); }
          }
          .line-accent{
            background:linear-gradient(90deg,transparent,rgba(16,185,129,.55),transparent);
          }
          .news-card{
            background:linear-gradient(160deg,#ffffff, #f0fdf4 140%);
            transition:.45s;
          }
          .news-card:hover{
            transform:translateY(-5px);
          }
          .orbit-dot{
            position:absolute;
            width:10px;height:10px;border-radius:50%;
            background:linear-gradient(140deg,#10b981,#047857);
            box-shadow:0 0 0 4px rgba(16,185,129,.25),0 0 12px -2px #10b981;
            animation:orbit 18s linear infinite;
          }
          .orbit-dot:nth-child(2){ top:18%; left:12%; animation-duration:26s; }
            .orbit-dot:nth-child(3){ top:70%; left:82%; animation-duration:22s; }
          @keyframes orbit {
            0% { transform:translate(0,0) rotate(0deg); }
            50% { transform:translate(12px,-18px) rotate(180deg); }
            100% { transform:translate(0,0) rotate(360deg); }
          }
          .line-clamp-3{
            display:-webkit-box;
            -webkit-line-clamp:3;
            -webkit-box-orient:vertical;
            overflow:hidden;
          }
          .line-clamp-2{
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
          }
        `}
      </style>

      {/* HERO */}
      <section className="relative min-h-[78vh] flex items-center justify-center px-6 sm:px-10 lg:px-16">
        <div className="hero-bg" />
        <div className="absolute inset-0 hero-noise" />
        <div className="relative max-w-5xl mx-auto text-center flex flex-col gap-10 z-10">
          <div className="flex flex-col gap-6 fade-section">
            <p className="text-sm sm:text-base font-semibold tracking-[0.15em] text-green-100 uppercase">
              {lang === "ar" ? "رؤية للمستقبل" : "Vision pour l'avenir"}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] leading-tight font-extrabold title-grad drop-shadow">
              {lang === "ar"
                ? "الحاجب: تنمية مستدامة، إنسانية وذكية"
                : "El Hajeb: Durable, Humaine et Intelligente"}
            </h1>
            <p className="max-w-3xl mx-auto text-white/85 text-sm sm:text-lg leading-relaxed">
              {lang === "ar"
                ? "إقليم يجمع بين الطبيعة، الفرص الاقتصادية، والابتكار المحلي نحو مستقبل شامل."
                : "Un territoire où nature, opportunités économiques et innovation locale se rencontrent pour un futur inclusif."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 fade-section">
            <Link
              to="/presentation-generale"
              className="px-7 py-3 rounded-full text-sm font-semibold bg-white text-green-700 shadow hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              {lang === "ar" ? "اكتشف الإقليم" : "Découvrir la province"}
            </Link>
            <Link
              to="/news"
              className="px-7 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow hover:from-green-500 hover:to-emerald-400 hover:-translate-y-0.5 transition"
            >
              {lang === "ar" ? "آخر المستجدات" : "Dernières actualités"}
            </Link>
          </div>
        </div>
        <div className="orbit-dot" />
        <div className="orbit-dot" />
        <div className="orbit-dot" />
      </section>

      {/* INTRO */}
      <section className="relative px-6 sm:px-10 lg:px-16 py-20 bg-gradient-to-b from-white to-green-50/50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center fade-section">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 bg-clip-text text-transparent">
              {lang === "ar" ? "اكتشف الحاجب" : "Découvrez El Hajeb"}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {lang === "ar"
                ? "تقع في قلب الأطلس المتوسط، وتمتزج في الحاجب الطبيعة الغنية مع الرؤية التنموية المتجددة، في بيئة تعزز الاستدامة والابتكار والمشاركة المجتمعية."
                : "Située au cœur du Moyen Atlas, El Hajeb conjugue richesse naturelle et dynamique de développement durable, dans un cadre propice à l'innovation et à la participation citoyenne."}
            </p>
            <div className="line-accent h-[2px] w-40 rounded-full my-4" />
            <ul className="grid sm:grid-cols-2 gap-4 text-sm">
              {keyPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-white/70 rounded-2xl px-4 py-3 shadow-sm ring-1 ring-green-100"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 shadow" />
                  <span className="font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="glass-tile rounded-3xl p-6 flex flex-col gap-3 shadow-sm ring-1 ring-green-100/60 hover:ring-green-200 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{h.icon}</span>
                    <h3 className="font-bold text-green-800 text-sm sm:text-base leading-snug">
                      {lang === "ar" ? h.ar : h.fr}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {lang === "ar" ? h.arTxt : h.frTxt}
                  </p>
                  <div className="mt-auto pt-1">
                    <Link
                      to="/presentation-generale"
                      className="text-[11px] font-semibold tracking-wide text-green-600 group-hover:text-green-700 inline-flex items-center gap-1"
                    >
                      {lang === "ar" ? "المزيد" : "En savoir plus"}
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="relative px-6 sm:px-10 lg:px-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto fade-section">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-green-600 uppercase">
                {lang === "ar" ? "مستجدات" : "Actualités"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 bg-clip-text text-transparent mt-2">
                {lang === "ar" ? "آخر الأخبار والإعلانات" : "Dernières nouvelles & annonces"}
              </h2>
            </div>
            <Link
              to="/news"
              className="self-start md:self-end px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-semibold shadow hover:from-green-500 hover:to-emerald-400 transition"
            >
              {lang === "ar" ? "جميع الأخبار" : "Toutes les actualités"}
            </Link>
          </div>

          <div className="grid gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loadingNews &&
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-5 ring-1 ring-green-100/70 bg-white animate-pulse space-y-4"
                >
                  <div className="h-40 rounded-2xl bg-green-100/70" />
                  <div className="h-5 w-3/4 bg-green-100 rounded" />
                  <div className="h-4 w-full bg-green-50 rounded" />
                  <div className="h-4 w-11/12 bg-green-50 rounded" />
                  <div className="flex justify-between pt-2">
                    <div className="h-6 w-16 bg-green-100 rounded-full" />
                    <div className="h-6 w-14 bg-green-100 rounded-full" />
                  </div>
                </div>
              ))}

            {!loadingNews &&
              latest.map((n) => {
                const title = lang === "ar" ? n.title_ar : n.title_fr;
                const body = lang === "ar" ? n.content_ar : n.content_fr;
                return (
                  <div
                    key={n.id}
                    className="news-card rounded-3xl p-5 flex flex-col gap-4 shadow-sm ring-1 ring-green-100/70 hover:shadow-lg hover:ring-green-200 transition"
                  >
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-green-100/50 flex items-center justify-center text-green-700 text-sm font-semibold">
                      {n.image ? (
                        <img
                          src={`http://localhost:8000/storage/${n.image}`}
                          alt={title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <span>
                          {lang === "ar" ? "بدون صورة" : "Sans image"}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/85 text-[10px] font-semibold text-green-700 shadow">
                        {formatDate(n.created_at)}
                      </span>
                    </div>
                    <h3 className="font-bold text-green-800 text-base line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {body}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        {t("announcement") || (lang === "ar" ? "إعلان" : "Annonce")}
                      </span>
                      <Link
                        to={`/news/${n.id}`}
                        className="text-xs font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
                      >
                        {lang === "ar" ? "قراءة" : "Lire"}
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}

            {!loadingNews && latest.length === 0 && (
              <div className="col-span-full text-center py-14 rounded-3xl ring-1 ring-green-100 bg-green-50/40">
                <p className="text-sm font-medium text-green-700">
                  {lang === "ar"
                    ? "لا توجد أخبار متاحة حالياً."
                    : "Aucune actualité disponible pour le moment."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 sm:px-10 lg:px-16 py-20 bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_20%_30%,#34d399,transparent_60%),radial-gradient(circle_at_80%_70%,#10b981,transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto text-center space-y-8 fade-section">
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            {lang === "ar"
              ? "نحو تنمية متوازنة وابتكار مستدام"
              : "Vers un développement équilibré et une innovation durable"}
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-white/90 leading-relaxed">
            {lang === "ar"
              ? "الحاجب يستثمر في رأس ماله الطبيعي والبشري لدعم المبادرات المحلية وتحسين جودة العيش."
              : "El Hajeb valorise ses ressources naturelles et humaines tout en soutenant les initiatives locales et la qualité de vie."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/secteur-productif"
              className="px-7 py-3 rounded-full bg-white text-green-700 font-semibold text-sm shadow hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              {lang === "ar" ? "القطاعات الإنتاجية" : "Secteurs productifs"}
            </Link>
            <Link
              to="/secteurs-sociaux"
              className="px-7 py-3 rounded-full bg-green-900/40 ring-1 ring-white/30 font-semibold text-sm hover:bg-green-900/55 backdrop-blur transition"
            >
              {lang === "ar" ? "القطاعات الاجتماعية" : "Secteurs sociaux"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
