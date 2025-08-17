import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreateUser() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    setLoading(true);
    try {
      await api.post("/users", { ...fields, is_admin: true });
      setOk(true);
      setTimeout(() => navigate("/news"), 900);
    } catch {
      setError(t("error_create_admin") || "Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={dir}
      className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden"
    >
      <style>
        {`
          .admin-orb{
            position:absolute;
            width:520px;
            height:520px;
            border-radius:50%;
            background:radial-gradient(circle at 35% 30%,rgba(16,185,129,0.35),transparent 65%);
            filter:blur(30px);
            animation:orbit 18s linear infinite;
            opacity:.55;
          }
          .admin-orb:nth-child(2){
            width:400px;height:400px;
            right:-140px;bottom:-140px;
            background:radial-gradient(circle at 60% 40%,rgba(5,150,105,0.30),transparent 60%);
            animation-delay:-8s;
          }
          @keyframes orbit {
            0% { transform:rotate(0deg) translateY(0); }
            50% { transform:rotate(180deg) translateY(-40px); }
            100% { transform:rotate(360deg) translateY(0); }
          }
          .glass-admin {
            background:linear-gradient(145deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55));
            backdrop-filter:blur(18px) saturate(180%);
          }
          .field-wrap:focus-within .float-label{
            transform:translateY(-14px) scale(.82);
            opacity:.85;
            background:linear-gradient(90deg,#047857,#059669,#10b981);
            -webkit-background-clip:text;
            color:transparent;
            font-weight:600;
          }
          .float-label { transition:.35s; }

          .success-badge {
            animation:pop .45s cubic-bezier(.4,0,.2,1);
          }
          @keyframes pop {
            0% { transform:scale(.6); opacity:0; }
            100% { transform:scale(1); opacity:1; }
          }
        `}
      </style>

      <div className="admin-orb left-[-180px] top-[-180px]" />
      <div className="admin-orb" />

      <div className="relative w-full max-w-xl">
        <div className="glass-admin rounded-3xl shadow-[0_14px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-green-200/50 px-8 py-10 md:px-12 md:py-14">
          <div className="mb-10 space-y-4 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 bg-clip-text text-transparent">
              {t("add_admin") || (lang === "ar" ? "إضافة مدير" : "Créer un administrateur")}
            </h1>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {lang === "ar"
                ? "إنشاء حساب مدير جديد للوصول إلى لوحة التحكم والإدارة."
                : "Créez un nouvel administrateur avec accès à la gestion du contenu."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="field-wrap relative">
                <label
                  className={`float-label absolute ${
                    dir === "rtl" ? "right-4" : "left-4"
                  } top-3 px-1 text-[13px] text-gray-500 pointer-events-none`}
                >
                  {t("name") || (lang === "ar" ? "الاسم" : "Nom")}
                </label>
                <input
                  name="name"
                  required
                  value={fields.name}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-2xl border border-green-200 bg-white/70 px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition"
                  placeholder=" "
                />
              </div>

              <div className="field-wrap relative">
                <label
                  className={`float-label absolute ${
                    dir === "rtl" ? "right-4" : "left-4"
                  } top-3 px-1 text-[13px] text-gray-500 pointer-events-none`}
                >
                  {t("email") || (lang === "ar" ? "البريد الإلكتروني" : "Email")}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={fields.email}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-2xl border border-green-200 bg-white/70 px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition"
                  placeholder=" "
                />
              </div>

              <div className="field-wrap relative md:col-span-2">
                <label
                  className={`float-label absolute ${
                    dir === "rtl" ? "right-4" : "left-4"
                  } top-3 px-1 text-[13px] text-gray-500 pointer-events-none`}
                >
                  {t("password") || (lang === "ar" ? "كلمة المرور" : "Mot de passe")}
                </label>
                <input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  required
                  value={fields.password}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-2xl border border-green-200 bg-white/70 px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition"
                  placeholder=" "
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className={`absolute top-2.5 ${
                    dir === "rtl" ? "left-3" : "right-3"
                  } px-3 py-1 text-[11px] font-semibold rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition`}
                >
                  {showPwd
                    ? lang === "ar"
                      ? "إخفاء"
                      : "Masquer"
                    : lang === "ar"
                    ? "إظهار"
                    : "Afficher"}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                {error}
              </div>
            )}

            {ok && (
              <div className="success-badge text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                {lang === "ar"
                  ? "تم إنشاء المسؤول بنجاح"
                  : "Administrateur créé avec succès"}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 hover:from-green-500 hover:via-emerald-400 hover:to-green-500 text-white font-semibold tracking-wide px-8 py-3 text-sm shadow-md hover:shadow-lg transition relative overflow-hidden"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                )}
                <span>
                  {loading
                    ? t("loading") ||
                      (lang === "ar" ? "جارٍ الإنشاء..." : "Création...")
                    : t("create") || (lang === "ar" ? "إنشاء" : "Créer")}
                </span>
              </button>

              <Link
                to="/news"
                className="text-sm font-semibold text-green-700 hover:text-green-800 underline underline-offset-4"
              >
                {lang === "ar" ? "رجوع للأخبار" : "Retour aux nouvelles"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
