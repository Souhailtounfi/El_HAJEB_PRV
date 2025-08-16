import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/news");
    } catch (err) {
      setError(
        err?.response?.data?.message === "Invalid credentials"
          ? t("invalid_credentials") || (lang === "ar" ? "بيانات الدخول غير صحيحة" : "Identifiants invalides")
          : t("login_error") || (lang === "ar" ? "خطأ في تسجيل الدخول" : "Erreur de connexion")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={dir}
      className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 relative overflow-hidden"
    >
      <Style />

      <div className="auth-orb left-[-160px] top-[-160px]" />
      <div className="auth-orb" />

      <div className="relative w-full max-w-md">
        <div className="glass-panel rounded-3xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] ring-1 ring-emerald-200/50 px-8 py-10 md:px-10 md:py-12">
          <header className="mb-9 text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {t("login") || (lang === "ar" ? "تسجيل الدخول" : "Connexion")}
            </h1>
            <p className="text-sm text-gray-600">
              {lang === "ar"
                ? "دخول الإدارة لإدارة المحتوى."
                : "Accédez à l’espace d’administration."}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            <FieldShell>
              <label
                htmlFor="email"
                className={`float-label ${dir === "rtl" ? "right-4" : "left-4"}`}
              >
                {t("email") || (lang === "ar" ? "البريد الإلكتروني" : "Email")}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="f-input"
                placeholder=" "
              />
              <IconHint>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </IconHint>
            </FieldShell>

            <FieldShell>
              <label
                htmlFor="password"
                className={`float-label ${dir === "rtl" ? "right-4" : "left-4"}`}
              >
                {t("password") || (lang === "ar" ? "كلمة المرور" : "Mot de passe")}
              </label>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="f-input pr-12"
                placeholder=" "
              />
              <button
                type="button"
                aria-label={showPwd ? (lang === "ar" ? "إخفاء كلمة المرور" : "Masquer le mot de passe")
                                    : (lang === "ar" ? "إظهار كلمة المرور" : "Afficher le mot de passe")}
                onClick={() => setShowPwd((s) => !s)}
                className={`pwd-eye ${dir === "rtl" ? "left-3" : "right-3"}`}
              >
                {showPwd ? (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.5 0-8.485-2.943-10-7 .614-1.674 1.72-3.162 3.167-4.317M6.223 6.223A9.956 9.956 0 0112 5c4.5 0 8.485 2.943 10 7-.424 1.156-1.032 2.227-1.788 3.162M9.88 9.88a3 3 0 104.24 4.24" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </FieldShell>

            {error && (
              <div className="shake-error text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="submit-btn w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 text-white font-semibold tracking-wide px-6 py-3 text-sm shadow-md hover:shadow-lg transition relative overflow-hidden"
            >
              <span className="abs-shine" />
              {loading && (
                <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
              )}
              <span>
                {loading
                  ? t("loading") || (lang === "ar" ? "جارٍ التحميل..." : "Chargement...")
                  : t("login") || (lang === "ar" ? "دخول" : "Connexion")}
              </span>
            </button>
          </form>

          <div className="mt-9 text-center text-[12px] text-gray-500 space-y-2">
            <p>
              {lang === "ar"
                ? "هذا الوصول مخصص للإدارة."
                : "Accès réservé à l'administration."}
            </p>
            <Link
              to="/"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              {lang === "ar" ? "العودة إلى الموقع" : "Retour au site"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small presentational sub-components */
function FieldShell({ children }) {
  return <div className="field-wrap relative">{children}</div>;
}
function IconHint({ children, side = "right" }) {
  return (
    <span
      className={`absolute top-3 ${
        side === "right" ? "right-3" : "left-3"
      } text-emerald-500/70 w-5 h-5 pointer-events-none`}
    >
      {children}
    </span>
  );
}

function Style() {
  return (
    <style>{`
      .auth-orb {
        position:absolute;
        width:480px;
        height:480px;
        border-radius:50%;
        background:radial-gradient(circle at 30% 30%,rgba(16,185,129,0.35),transparent 65%);
        filter:blur(28px);
        animation:float 14s linear infinite;
        opacity:.55;
      }
      .auth-orb:nth-child(2){
        right:-160px;bottom:-160px;
        background:radial-gradient(circle at 60% 40%,rgba(14,165,233,0.30),transparent 60%);
        animation-delay:-6s;
      }
      @keyframes float {
        0% { transform:translateY(0) rotate(0deg); }
        50% { transform:translateY(-60px) rotate(160deg); }
        100% { transform:translateY(0) rotate(360deg); }
      }
      .glass-panel {
        background:linear-gradient(145deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55));
        backdrop-filter:blur(20px) saturate(180%);
      }
      .field-wrap:focus-within .float-label{
        transform:translateY(-16px) scale(.8);
        opacity:.9;
        background:linear-gradient(90deg,#047857,#059669,#10b981);
        -webkit-background-clip:text;
        color:transparent;
        font-weight:600;
      }
      .float-label {
        position:absolute;
        top:14px;
        font-size:13px;
        padding:0 2px;
        color:#647067;
        pointer-events:none;
        transition:.35s;
        font-weight:500;
        letter-spacing:.3px;
      }
      .f-input{
        width:100%;
        margin-top:2px;
        border:1px solid #a7f3d0;
        background:linear-gradient(120deg,#ffffffcc,#ecfdf580);
        backdrop-filter:blur(10px);
        border-radius:1.35rem;
        padding:1.15rem 1.05rem .55rem 1.05rem;
        font-size:.85rem;
        font-weight:500;
        color:#064e3b;
        outline:none;
        transition:.4s;
      }
      .f-input:focus{
        border-color:#10b981aa;
        box-shadow:0 0 0 3px #10b98133;
      }
      .pwd-eye{
        position:absolute;
        top:8px;
        background:linear-gradient(120deg,#ecfdf5,#ffffff);
        border:1px solid #10b98140;
        width:40px;
        height:40px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:50%;
        cursor:pointer;
        transition:.4s;
        color:#047857;
        box-shadow:0 4px 10px -4px rgba(6,95,70,.25);
      }
      .pwd-eye svg{width:20px;height:20px;stroke-width:2;}
      .pwd-eye:hover{
        background:linear-gradient(120deg,#d1fae5,#ffffff);
        transform:translateY(-2px);
        box-shadow:0 8px 18px -8px rgba(6,95,70,.35);
      }
      .submit-btn{
        position:relative;
      }
      .abs-shine{
        position:absolute;inset:0;
        background:linear-gradient(120deg,rgba(255,255,255,.4),transparent 60%);
        mix-blend-mode:overlay;
        opacity:0;
        transition:.6s;
      }
      .submit-btn:hover .abs-shine{opacity:.9;}
      .submit-btn:disabled{filter:saturate(.55) brightness(.92);cursor:not-allowed;}
      .shake-error{
        animation:shake .55s cubic-bezier(.36,.07,.19,.97) both;
      }
      @keyframes shake {
        10%,90% { transform:translateX(-1px); }
        20%,80% { transform:translateX(2px); }
        30%,50%,70% { transform:translateX(-4px); }
        40%,60% { transform:translateX(4px); }
      }
      .create-admin-btn{
        position:relative;
        display:inline-flex;
        justify-content:center;
        align-items:center;
        gap:.65rem;
        font-size:.7rem;
        font-weight:700;
        letter-spacing:.12em;
        text-transform:uppercase;
        text-decoration:none;
        padding:1rem 1.4rem;
        border-radius:1.5rem;
        background:linear-gradient(120deg,#6366f1,#0ea5e9,#10b981);
        background-size:180% 100%;
        color:#fff;
        box-shadow:0 10px 26px -12px rgba(14,165,233,.45);
        overflow:hidden;
        transition:.7s;
      }
      .create-admin-btn:hover{
        background-position:100% 0;
        transform:translateY(-4px);
        box-shadow:0 18px 38px -16px rgba(14,165,233,.5);
      }
      .create-admin-btn .spark{
        position:absolute;
        inset:0;
        background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.6),transparent 60%);
        opacity:0;
        mix-blend-mode:overlay;
        animation:create-spark .8s ease-out forwards;
      }
      @keyframes create-spark {
        0% {
          opacity:0;
          transform:translateY(0) scale(0);
        }
        70% {
          opacity:.7;
          transform:translateY(-10px) scale(1.1);
        }
        100% {
          opacity:0;
          transform:translateY(20px) scale(1);
        }
      }
    `}
    </style>
  );
}
