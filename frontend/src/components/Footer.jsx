import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "#", label: lang === "ar" ? "الرئيسية" : "Accueil" },
    { to: "#", label: lang === "ar" ? "من نحن" : "À propos" },
    { to: "#", label: lang === "ar" ? "الخدمات" : "Services" },
    { to: "#", label: lang === "ar" ? "الأخبار" : "Actualités" },
    { to: "#", label: lang === "ar" ? "اتصل بنا" : "Contact" }
  ];

  const sectors = [
    { to: "#", label: lang === "ar" ? "الفلاحة" : "Agriculture" },
    { to: "#", label: lang === "ar" ? "السياحة" : "Tourisme" },
    { to: "#", label: lang === "ar" ? "الصناعة التقليدية" : "Artisanat" },
    { to: "#", label: lang === "ar" ? "البيئة" : "Environnement" },
    { to: "#", label: lang === "ar" ? "البنية التحتية" : "Infrastructure" }
  ];

  return (
    <footer dir={dir} className="relative"> {/* plus de padding transparent */}
      <style>{`
        /* Anti‑gap global */
        footer, .site-footer { margin-top:0 !important; }

        .footer-bg {
          background:
            radial-gradient(circle at 18% 20%,rgba(16,185,129,0.25),transparent 60%),
            radial-gradient(circle at 82% 75%,rgba(5,150,105,0.22),transparent 55%),
            linear-gradient(135deg,#065f46,#047857,#059669);
        }
        /* Alignement anti-collapsing */
        .footer-bg { padding-top:5rem; } /* remplace l'ancien pt-20 */
        .footer-link-dot:before {
            content:"";
            width:6px;height:6px;
            border-radius:50%;
            background:linear-gradient(135deg,#34d399,#10b981);
            display:inline-block;
            margin-inline-end:.55rem;
            transform:scale(.9);
            transition:.3s;
        }
        a.footer-link:hover .footer-link-dot:before { transform:scale(1.15); }
        .gradient-divider {
            height:1px;
            background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent);
        }
      `}</style>
      <div className="footer-bg w-full">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 pt-14 pb-10">
          <div className="relative grid gap-12 xl:gap-10 md:grid-cols-2 lg:grid-cols-4 text-white">
            <div className="space-y-5">
              <h2 className="text-2xl font-extrabold tracking-wide">El Hajeb</h2>
              <p className="text-green-100 leading-relaxed text-sm">
                {lang === "ar"
                  ? "اكتشف الحاجب، مجال للفرص والثروات الطبيعية."
                  : "Découvrez El Hajeb, un territoire d'opportunités et de richesses naturelles."}
              </p>
              <p className="text-green-100 leading-relaxed text-sm">
                {lang === "ar"
                  ? "طبيعة، ثقافة، ديناميكية محلية في قلب المغرب الأصيل."
                  : "Nature, culture et dynamisme local au cœur du Maroc authentique."}
              </p>
              <form onSubmit={(e)=>e.preventDefault()} className="mt-4 space-y-2">
                <label className="text-xs uppercase tracking-wider text-green-200 font-semibold">
                  {lang === "ar" ? "النشرة البريدية" : "Newsletter"}
                </label>
                <div className="flex rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm ring-1 ring-white/15 focus-within:ring-green-300 transition">
                  <input
                    type="email"
                    required
                    placeholder={lang === "ar" ? "بريدك الإلكتروني" : "Votre email"}
                    className="flex-1 bg-transparent px-4 py-2 text-sm placeholder-green-200/60 focus:outline-none text-green-50"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-gradient-to-r from-green-400 to-emerald-500 text-sm font-semibold hover:from-green-300 hover:to-emerald-400 transition text-white"
                  >
                    {lang === "ar" ? "إرسال" : "OK"}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-5">
              <h3 className="font-semibold text-lg tracking-wide">
                {lang === "ar" ? "اتصل بنا" : t("contact_us")}
              </h3>
              <ul className="space-y-3 text-sm text-green-100">
                <li className="flex gap-3">
                  <span className="text-green-200">📞</span>
                  <span>+212 23 456 7890</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-200">✉️</span>
                  <span>contact@elhajeb.ma</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-200">📍</span>
                  <span>
                    {lang === "ar"
                      ? "الطابق الثالث، مكتب 45، عمالة الحاجب"
                      : "3ème étage, Bureau 45, Préfecture d'El Hajeb"}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-200">🕒</span>
                  <span>
                    {lang === "ar"
                      ? "الإثنين - الأحد / 9:00 - 17:00"
                      : "Lun - Dim / 9:00 - 17:00"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="font-semibold text-lg tracking-wide">
                {lang === "ar" ? "روابط سريعة" : "Liens rapides"}
              </h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map(l=>(
                  <li key={l.label}>
                    <a href={l.to} className="footer-link inline-flex items-center gap-2 text-green-100 hover:text-white transition">
                      <span className="footer-link-dot" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="font-semibold text-lg tracking-wide">
                {lang === "ar" ? "القطاعات" : "Secteurs"}
              </h3>
              <ul className="space-y-2 text-sm">
                {sectors.map(s=>(
                  <li key={s.label}>
                    <a
                      href={s.to}
                      className="group inline-flex items-center gap-2 text-green-100 hover:text-white transition"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-green-300 group-hover:text-white transition"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 mb-8 gradient-divider" />

          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between text-xs sm:text-sm text-green-100">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>
                © {year} {lang === "ar"
                  ? "عمالة إقليم الحاجب. جميع الحقوق محفوظة."
                  : "Préfecture Province d'El Hajeb. Tous droits réservés."}
              </span>
              <a href="#" className="hover:text-white transition underline-offset-2 hover:underline">
                {lang === "ar" ? "سياسة الخصوصية" : "Politique de confidentialité"}
              </a>
              <a href="#" className="hover:text-white transition underline-offset-2 hover:underline">
                {lang === "ar" ? "شروط الاستخدام" : "Conditions d'utilisation"}
              </a>
            </div>
            <div className="flex gap-4">
              {["Facebook","Twitter","Instagram"].map(n=>(
                <a key={n} href="#" aria-label={n} className="relative group">
                  <span className="absolute -inset-2 rounded-full bg-white/0 group-hover:bg-white/10 transition" />
                  <div className="h-6 w-6 rounded-full bg-white/15 flex items-center justify-center text-green-50 text-[11px] font-bold group-hover:bg-white/25 transition">
                    {n[0]}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;