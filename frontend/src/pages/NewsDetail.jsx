import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function NewsDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [imgDeleting, setImgDeleting] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/news/${id}`);
      setNews(res.data);
    } catch {
      setNews(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        lang === "ar" ? "هل تريد حذف هذا الخبر؟" : "Supprimer cette actualité ?"
      )
    )
      return;
    try {
      setDeleting(true);
      await api.delete(`/news/${id}`);
      navigate("/news");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm(lang === "ar" ? "حذف هذه الصورة ؟" : "Supprimer cette image ?")) return;
    try {
      setImgDeleting(imageId);
      await api.delete(`/news-images/${imageId}`);
      setNews((n) =>
        n
          ? {
              ...n,
              images: (n.images || []).filter((im) => im.id !== imageId),
            }
          : n
      );
    } catch {
      alert(lang === "ar" ? "فشل الحذف" : "Suppression échouée");
    } finally {
      setImgDeleting(null);
    }
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(lang === "ar" ? "ar-MA" : "fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const Skeleton = () => (
    <div className="animate-pulse space-y-8">
      <div className="h-96 w-full rounded-3xl bg-gradient-to-br from-green-200/50 to-green-100" />
      <div className="h-8 w-2/3 bg-green-100 rounded" />
      <div className="h-4 w-1/2 bg-green-100 rounded" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-green-50 rounded" />
        ))}
      </div>
    </div>
  );

  const title = news ? (lang === "ar" ? news.title_ar : news.title_fr) : "";
  const content = news ? (lang === "ar" ? news.content_ar : news.content_fr) : "";

  return (
    <div
      dir={dir}
      className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/60 px-4 md:px-8 pb-28"
    >
      <style>
        {`
        .glass-bar{
          background:linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.4));
          backdrop-filter:blur(14px) saturate(160%);
        }
        .heading-grad{
          background:linear-gradient(90deg,#065f46,#059669,#10b981,#059669);
          -webkit-background-clip:text;
          color:transparent;
        }
        .prose-rich p{margin-bottom:1em;}
        .prose-rich{line-height:1.75;font-size:1.05rem;}
        .prose-rich[dir="rtl"]{font-size:1.1rem;}
        .fade-edge:before{
          content:"";
          position:absolute;inset:0;
          background:
            radial-gradient(circle at 10% 15%,rgba(16,185,129,0.15),transparent 60%),
            radial-gradient(circle at 90% 85%,rgba(16,185,129,0.15),transparent 60%);
          pointer-events:none;
        }
        .admin-btn{
          position:relative;
          overflow:hidden;
        }
        .admin-btn:before{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(120deg,rgba(255,255,255,0.35),transparent 60%);
          opacity:0;
          transition:.4s;
        }
        .admin-btn:hover:before{opacity:1;}
        `}
      </style>

      <div className="max-w-6xl mx-auto pt-10 lg:pt-16 fade-edge relative">
        {/* Breadcrumb & Admin Actions */}
        <div className="glass-bar rounded-2xl px-4 sm:px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-sm ring-1 ring-green-200/60 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-green-700">
            <Link to="/" className="hover:underline">
              {lang === "ar" ? "الرئيسية" : "Accueil"}
            </Link>
            <span className="opacity-50">/</span>
            <Link to="/news" className="hover:underline">
              {lang === "ar" ? "الأخبار" : "Actualités"}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-green-900 line-clamp-1 max-w-[240px] sm:max-w-xs">
              {title || (lang === "ar" ? "..." : "...")}
            </span>
          </div>

          {user?.is_admin && news && (
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/news/${news.id}/edit`}
                className="admin-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold tracking-wide bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-white shadow-md hover:shadow-lg transition active:scale-[.97]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5h2m-7.586.586l10 10a2 2 0 01-2.828 2.828l-10-10A2 2 0 014.414 5.586zM16 3l5 5M3 21h6"
                  />
                </svg>
                {t("edit")}
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`admin-btn inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition active:scale-[.97] ${
                  deleting
                    ? "bg-red-300 text-white cursor-wait"
                    : "bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M9 6V4h6v2m1 0v12a2 2 0 01-2 2H10a2 2 0 01-2-2V6h10Z"
                  />
                </svg>
                {deleting
                  ? lang === "ar"
                    ? "جارٍ الحذف..."
                    : "Suppression..."
                  : t("delete")}
              </button>
            </div>
          )}
        </div>

        {loading && <Skeleton />}

        {!loading && !news && (
            <div className="mt-24 text-center space-y-6">
              <h2 className="text-2xl font-bold heading-grad">
                {lang === "ar" ? "غير موجود" : "Introuvable"}
              </h2>
              <p className="text-gray-600">
                {lang === "ar"
                  ? "لم يتم العثور على الخبر المطلوب."
                  : "La nouvelle demandée est introuvable."}
              </p>
              <Link
                to="/news"
                className="inline-block px-7 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-semibold transition shadow"
              >
                {lang === "ar" ? "رجوع للأخبار" : "Retour aux actualités"}
              </Link>
            </div>
          )}

        {!loading && news && (
          <>
            {/* HERO */}
            <div className="relative mb-10 rounded-3xl overflow-hidden shadow ring-1 ring-green-200/60">
              {news.image ? (
                <img
                  src={`http://localhost:8000/storage/${news.image}`}
                  alt={title}
                  className="w-full h-[420px] object-cover transition-transform duration-[2500ms] ease-out scale-[1.02]"
                />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 text-green-500 font-semibold text-lg">
                  {lang === "ar" ? "بدون صورة" : "Aucune image"}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9 flex flex-col gap-4" dir={dir}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg leading-snug">
                  {title}
                </h1>
                <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs font-semibold">
                  <span className="px-3 py-1 rounded-full bg-green-500/90 text-white shadow">
                    {t("announcement")}
                  </span>
                  {news.created_at && (
                    <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-green-800 shadow">
                      {formatDate(news.created_at)}
                    </span>
                  )}
                  {/* ID badge removed for security */}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-sm ring-1 ring-green-100/70 mb-14 overflow-hidden">
              <div className="pointer-events-none absolute -top-28 -left-28 w-72 h-72 rounded-full bg-gradient-to-br from-green-100 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-28 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-100 to-transparent blur-2xl" />

              <article className="relative prose-rich font-medium text-gray-700" dir={dir}>
                {content.split("\n").map((p, i) => (
                  <p key={i}>{p.trim()}</p>
                ))}
              </article>

              {/* Back only (share removed) */}
              <div className="relative mt-10">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {lang === "ar" ? "رجوع" : "Retour"}
                </Link>
              </div>
            </div>

            {/* GALLERY */}
            {news.images && news.images.length > 0 && (
              <div className="mb-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold heading-grad" dir={dir}>
                    {lang === "ar" ? "معرض الصور" : "Galerie de photos"}
                  </h2>
                  <div className="h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-green-300/60 to-transparent" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {news.images.map((img) => {
                    const src = `http://localhost:8000/storage/${img.image}`;
                    return (
                      <div
                        key={img.id}
                        className="relative group rounded-2xl overflow-hidden ring-1 ring-green-100/70 bg-green-50/40 shadow-sm hover:shadow-lg transition"
                      >
                        <button
                          type="button"
                          onClick={() => setLightbox(src)}
                          className="block w-full text-left"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-semibold text-green-700 shadow opacity-0 group-hover:opacity-100 transition">
                            {lang === "ar" ? "تكبير" : "Agrandir"}
                          </span>
                        </button>

                        {user?.is_admin && (
                          <button
                            type="button"
                            disabled={imgDeleting === img.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(img.id);
                            }}
                            title={lang === "ar" ? "حذف" : "Supprimer"}
                            className={`absolute top-2 right-2 p-2 rounded-full shadow text-white transition ${
                              imgDeleting === img.id
                                ? "bg-red-300 cursor-wait"
                                : "bg-red-600/90 hover:bg-red-700"
                            }`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 6h18M9 6V4h6v2m1 0v12a2 2 0 01-2 2H10a2 2 0 01-2-2V6h10Z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white text-2xl font-bold shadow-lg flex items-center justify-center transition"
              aria-label="Close"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/40">
              <img
                src={lightbox}
                alt="preview"
                className="w-full max-h-[82vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}