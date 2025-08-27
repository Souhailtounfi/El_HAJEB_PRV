import React, { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function NewsList() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const search = (params.get("search") || "").trim();

  // Input change updates URL immediately (no extra state)
  const handleSearchChange = (v) => {
    const p = new URLSearchParams(location.search);
    if (v.trim()) p.set("search", v);
    else p.delete("search");
    navigate({ pathname: location.pathname, search: p.toString() }, { replace: true });
  };
  const setSearch = (v) => handleSearchChange(v);

  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [sort, setSort] = useState("newest");
  const [showAdminBoard, setShowAdminBoard] = useState(false); // toggle advanced admin table
  const [selected, setSelected] = useState([]); // selected ids in admin board
  const isLoggedIn = !!user;
  const [filterHasImage, setFilterHasImage] = useState(false); // admin filter
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch news and categories
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [newsRes, catRes] = await Promise.all([
          api.get("/news"),
          api.get("/categories")
        ]);
        if (mounted) {
          setNews(newsRes.data || []);
          setCategories(catRes.data || []);
        }
      } catch {
        if (mounted) {
          setNews([]);
          setCategories([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const plain = (html) =>
    (html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    let arr = news
      .filter(n => {
        if (!term) return true;
        const frTitle = (n.title_fr || "").toLowerCase();
        const arTitle = (n.title_ar || "").toLowerCase();
        const frContent = plain(n.content_fr || "").toLowerCase();
        const arContent = plain(n.content_ar || "").toLowerCase();
        return (
          frTitle.includes(term) ||
          arTitle.includes(term) ||
          frContent.includes(term) ||
          arContent.includes(term)
        );
      });
    if (categoryFilter) {
      arr = arr.filter(n => String(n.category_id) === String(categoryFilter));
    }
    if (filterHasImage) {
      arr = arr.filter(n => !!(n.image_base64 || n.image));
    }
    return arr.sort((a,b)=>{
        const da = new Date(a.created_at || a.id);
        const db = new Date(b.created_at || b.id);
        if (sort === "newest") return db - da;
        if (sort === "oldest") return da - db;
        return 0;
      });
  }, [news, search, sort, filterHasImage, categoryFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirm_delete"))) return;
    try {
      setDeletingId(id);
      await api.delete(`/news/${id}`);
      setNews((prev) => prev.filter((n) => n.id !== id));
      setSelected(sel => sel.filter(i=>i!==id));
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  };

  // Admin board helpers
  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i=>i!==id) : [...prev, id]);
  };
  const allFilteredIds = useMemo(()=>filtered.map(n=>n.id), [filtered]);
  const allSelected = selected.length && allFilteredIds.every(id=>selected.includes(id));
  const toggleSelectAll = () => {
    if (allSelected) setSelected(sel=>sel.filter(id=>!allFilteredIds.includes(id)));
    else setSelected(prev => Array.from(new Set([...prev, ...allFilteredIds])));
  };
  const handleBulkDelete = async () => {
    if (!selected.length) return;
    if (!window.confirm(t('confirm_delete')+` (x${selected.length})`)) return;
    for (const id of selected) {
      try { await api.delete(`/news/${id}`); } catch {/* ignore */}
    }
    setNews(prev => prev.filter(n=>!selected.includes(n.id)));
    setSelected([]);
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(lang === "ar" ? "ar-MA" : "fr-FR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/,"");
  const imgSrc = (p) => `${base}/storage/${p}`; // legacy fallback

  const SkeletonCard = () => (
    <div className="news-card-skel">
      <div className="img" />
      <div className="lines">
        <span className="l w40" />
        <span className="l w90" />
        <span className="l w80" />
        <span className="l w60" />
        <span className="btn" />
      </div>
    </div>
  );

  return (
    <div className="news-shell" dir={dir}>
      <NewsStyle />
      <div className="news-container">
        {/* Header */}
        <div className="news-head">
          <div className="txt">
            <h1>
              <span className="grad">{t("headline")}</span>
            </h1>
            <p className="lead">
              {lang === "ar"
                ? "أحدث المستجدات والإعلانات المحلية متاحة هنا."
                : "Les dernières actualités et annonces locales regroupées ici."}
            </p>
          </div>
          <div className="controls">
            <div className="search-wrap">
              <input
                value={search}
                onChange={(e)=>handleSearchChange(e.target.value)}
                placeholder={lang === "ar" ? "بحث" : "Recherche"}
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
            </div>
            <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="sort">
              <option value="">{lang === "ar" ? "كل الفئات" : "Toutes catégories"}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {lang === 'ar' ? (cat.name_ar || cat.name_fr) : (cat.name_fr || cat.name_ar)}
                </option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort">
              <option value="newest">{lang === "ar" ? "الأحدث" : "Plus récent"}</option>
              <option value="oldest">{lang === "ar" ? "الأقدم" : "Plus ancien"}</option>
            </select>
            {isLoggedIn && (
              <Link to="/news/new" className="add-btn">
                <span className="plus">＋</span>
                {lang === "ar" ? "إضافة مقال" : "Ajouter Article"}
              </Link>
            )}
          </div>
        </div>

        {isLoggedIn && (
          <div className="admin-toggle-wrap">
            <button
              type="button"
              className={`admin-toggle ${showAdminBoard?'open':''}`}
              onClick={()=>setShowAdminBoard(o=>!o)}
              aria-expanded={showAdminBoard}
              aria-controls="admin-board-panel"
              aria-label={showAdminBoard ? (lang==='ar'? 'إخفاء لوحة الإدارة':'Masquer le panneau administration') : (lang==='ar'? 'إظهار لوحة الإدارة':'Afficher le panneau administration')}
            >
              <span className="pulse" />
              <span className="ring" aria-hidden />
              <span className="halo" aria-hidden />
              <span className="flare" aria-hidden />
              <span className="ico" aria-hidden>
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.7">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M3 10h18M9 14h2.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="lbl">{showAdminBoard ? (
                lang==='ar'? 'إخفاء لوحة الإدارة' : 'Masquer Admin'
              ) : (
                lang==='ar'? 'لوحة الإدارة' : 'Panneau Admin'
              )}</span>
              <span className="arrow" aria-hidden>{showAdminBoard? '▴':'▾'}</span>
            </button>
          </div>
        )}

        {/* Admin Board */}
        {isLoggedIn && (
          <div className={`admin-board-collapsible ${showAdminBoard? 'open':''}`}>
            <div className="admin-board">
              <div className="admin-toolbar glassy">
                <div className="toolbar-main">
                  <h2 className="board-title">{lang==='ar'? 'إدارة الأخبار':'Gestion des actualités'}</h2>
                  <div className="toolbar-metrics">
                    <span className="chip stat">{filtered.length} {lang==='ar'? 'عنصر':'entrées'}</span>
                    {selected.length>0 && (
                      <span className="chip selected" title={lang==='ar'? 'محدد':'Sélectionnés'}>{selected.length} {lang==='ar'? 'محدد':'sélectionnés'}</span>
                    )}
                    {filterHasImage && (
                      <span className="chip filter" onClick={()=>setFilterHasImage(false)}>{lang==='ar'? 'مع صور':'Avec image'} ✕</span>
                    )}
                    {search && (
                      <span className="chip search-ind" title={lang==='ar'? 'بحث':'Recherche'}>“{search}”</span>
                    )}
                  </div>
                </div>
                <div className="toolbar-actions">
                  <div className="filters-inline">
                    <button type="button" className={`inline-filter ${filterHasImage?'on':''}`} onClick={()=>setFilterHasImage(v=>!v)}>{lang==='ar'? 'صور فقط':'Images'}</button>
                    <div className="divider" />
                    <select value={sort} onChange={(e)=>setSort(e.target.value)} className="sort slim alt">
                      <option value="newest">{lang==='ar'? 'الأحدث':'Plus récent'}</option>
                      <option value="oldest">{lang==='ar'? 'الأقدم':'Plus ancien'}</option>
                    </select>
                  </div>
                  <Link to="/news/new" className="btn-admin primary hi">{lang==='ar'? '+ إضافة':'＋ Ajouter'}</Link>
                  <button className="btn-admin danger" disabled={!selected.length} onClick={handleBulkDelete}>{lang==='ar'? 'حذف جماعي':'Suppr. sélection'} {selected.length?`(${selected.length})`:''}</button>
                </div>
              </div>
              <div className="meta-row">
                {search && <button className="link-clear" onClick={()=>setSearch('')}>{lang==='ar'? 'مسح البحث':'Effacer la recherche'}</button>}
                {!search && filtered.length===0 && <span className="metric ghost">{lang==='ar'? 'لا عناصر':'Aucun élément'}</span>}
              </div>
              <div className="table-wrap">
                {loading ? (
                  <div className="loading-bar" />
                ) : filtered.length === 0 ? (
                  <div className="empty-admin">{lang==='ar'? 'لا نتائج':'Aucun résultat'}</div>
                ) : (
                  <table className="news-table" dir={dir}>
                    <thead>
                      <tr>
                        <th className="sel"><input type="checkbox" checked={!!allFilteredIds.length && allSelected} onChange={toggleSelectAll} aria-label="select all" /></th>
                        <th>ID</th>
                        <th>{lang==='ar'? 'الفئة':'Catégorie'}</th>
                        <th>{lang==='ar'? 'العنوان (FR)':'Titre (FR)'}</th>
                        <th>{lang==='ar'? 'العنوان (AR)':'Titre (AR)'}</th>
                        <th>{lang==='ar'? 'طول النص':'Taille texte'}</th>
                        <th>{lang==='ar'? 'صورة':'Image'}</th>
                        <th>{lang==='ar'? 'تاريخ الإنشاء':'Créé le'}</th>
                        <th>{lang==='ar'? 'إجراءات':'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(item => {
                        const cat = categories.find(c=>c.id===item.category_id);
                        return (
                          <tr key={item.id}>
                            <td className="sel">
                              <input
                                type="checkbox"
                                checked={selected.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                                aria-label="select"
                              />
                            </td>
                            <td>{item.id}</td>
                            <td>{cat ? (lang === 'ar' ? (cat.name_ar || cat.name_fr) : (cat.name_fr || cat.name_ar)) : ''}</td>
                            <td>{item.title_fr}</td>
                            <td>{item.title_ar}</td>
                            <td>{plain(item.content_fr).length + plain(item.content_ar).length}</td>
                            <td>{item.image_base64 ? <img src={item.image_base64} alt="" style={{width:40,height:40,objectFit:'cover',borderRadius:8}} /> : ''}</td>
                            <td>{formatDate(item.created_at)}</td>
                            <td>
                              <div className="actions-cell">
                                <Link to={`/news/${item.id}/edit`} className="mini-btn edit">
                                  {t("edit")}
                                </Link>
                                <button
                                  className="mini-btn del"
                                  onClick={() => handleDelete(item.id)}
                                  disabled={deletingId === item.id}
                                >
                                  {deletingId === item.id
                                    ? lang === "ar"
                                      ? "جارٍ الحذف..."
                                      : "Supp..."
                                    : t("delete")}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* News List/Grid */}
        {loading ? (
          <div className="news-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empt-icon">
              <svg
                viewBox="0 0 24 24"
                className="w-11 h-11 text-emerald-400"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>{lang === "ar" ? "لا نتائج" : "Aucun résultat"}</h2>
            <p>
              {lang === "ar"
                ? "جرب تعديل كلمات البحث أو إعادة التصفية."
                : "Essayez de modifier votre recherche ou les filtres."}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="reset">
                {lang === "ar" ? "إعادة تعيين" : "Réinitialiser"}
              </button>
            )}
          </div>
        ) : (
          <div className="news-grid">
            {filtered.map((item) => {
              const title =
                (lang === "ar" ? (item.title_ar || item.title_fr) : item.title_fr) || "—";
              const rawContent =
                lang === "ar"
                  ? (item.content_ar || item.content_fr)
                  : (item.content_fr || item.content_ar);
              const snippet = plain(rawContent).slice(0, 240) + (plain(rawContent).length > 240 ? "…" : "");
              const cat = categories.find(c=>c.id===item.category_id);
              return (
                <div key={item.id} className="news-card group">
                  <div className="img-wrap">
          { (item.image_base64 || item.image) ? (
                      <img
            src={item.image_base64 || imgSrc(item.image)}
                        alt={title}
                        loading="lazy"
                        className="img"
                      />
                    ) : (
                      <div className="no-img">
                        {lang === "ar" ? "بدون صورة" : "Sans image"}
                      </div>
                    )}
                    <div className="overlay" />
                    <div className="top-tags">
                      <span className="tag kind">{cat ? (lang === 'ar' ? (cat.name_ar || cat.name_fr) : (cat.name_fr || cat.name_ar)) : (lang==="ar"?"عام":"Générale")}</span>
                      <span className="date">{formatDate(item.created_at)}</span>
                    </div>
                  </div>
                  <div className="body">
                    <h2 className="title" dir={dir}>{title}</h2>
                    <p className="snippet" dir={dir}>{snippet}</p>
                    <div className="actions">
                      <Link to={`/news/${item.id}`} className="read-btn">
                        <span className="lbl">{t("read_more")}</span>
                        <span className="arrow">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span className="shine" />
                      </Link>
                      {isLoggedIn && (
                        <div className="admin-btns">
                          <Link to={`/news/${item.id}/edit`} className="edit-btn">
                            {t("edit")}
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className={`del-btn ${deletingId === item.id ? "busy" : ""}`}
                          >
                            {deletingId === item.id
                              ? lang === "ar"
                                ? "جارٍ الحذف..."
                                : "Supp..."
                              : t("delete")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* Styles */
function NewsStyle() {
  return (
    <style>{`
      .news-shell{
        min-height:100vh;
        padding:4.5rem clamp(1rem,3vw,3rem) 6rem;
        background:
          radial-gradient(circle at 12% 18%,#ecfdf5,transparent 65%),
          radial-gradient(circle at 85% 82%,#d1fae5,transparent 70%),
          linear-gradient(125deg,#ffffff,#f0fdf4 55%,#e6fcf3);
      }
      .news-container{
        max-width:1500px;
        margin:0 auto;
      }
      .news-head{
        display:flex;
        flex-direction:column;
        gap:1.75rem;
        margin-bottom:1.5rem;
      }
      @media (min-width:900px){
        .news-head{flex-direction:row;justify-content:space-between;align-items:flex-end;}
      }
      .news-head h1{
        font-size:clamp(2.3rem,4.3vw,3.4rem);
        font-weight:800;
        line-height:1.05;
        margin:0;
      }
      .news-head .grad{
        background:linear-gradient(90deg,#065f46,#059669 35%,#0ea5e9 70%,#6366f1);
        -webkit-background-clip:text;
        color:transparent;
        filter:drop-shadow(0 6px 14px rgba(6,95,70,.25));
      }
      .lead{
        margin-top:.8rem;
        font-size:.95rem;
        max-width:48ch;
        color:#38554c;
        font-weight:500;
      }

      .controls{
        display:flex;
        flex-direction:column;
        gap:.75rem;
        width:100%;
      }
      @media (min-width:600px){
        .controls{flex-direction:row;align-items:stretch;}
      }
      .search-wrap{
        flex:1;
        position:relative;
        display:flex;
        align-items:center;
      }
      .search-wrap input{
        width:100%;
        border:1px solid #10b98133;
        background:linear-gradient(110deg,#ffffffcc,#f0fdf480);
        backdrop-filter:blur(10px);
        border-radius:1.4rem;
        padding:.85rem 2.9rem .85rem 1.2rem;
        font-size:.85rem;
        font-weight:500;
        color:#065f46;
        outline:none;
        transition:.35s;
      }
      .search-wrap input:focus{
        box-shadow:0 0 0 3px #10b98133;
        border-color:#10b98166;
      }
      .search-wrap .icon{
        position:absolute;
        right:.95rem;
        width:1.1rem;height:1.1rem;
        color:#10b981;
        opacity:.75;
      }
      [dir="rtl"] .search-wrap input{
        padding:.85rem 1.2rem .85rem 2.9rem;
      }
      [dir="rtl"] .search-wrap .icon{
        right:auto;left:.95rem;
      }
      .sort{
        border:1px solid #10b98133;
        background:linear-gradient(120deg,#ffffffcc,#ecfdf580);
        backdrop-filter:blur(8px);
        border-radius:1.4rem;
        padding:.85rem 1.1rem;
        font-size:.75rem;
        font-weight:600;
        color:#065f46;
        letter-spacing:.5px;
        cursor:pointer;
        outline:none;
        transition:.35s;
      }
      .sort:focus{box-shadow:0 0 0 3px #10b98133;border-color:#10b98166;}
      .add-btn{
        position:relative;
        display:inline-flex;
        align-items:center;
        gap:.6rem;
        background:linear-gradient(120deg,#10b981,#059669,#047857);
        color:#fff;
        font-size:.7rem;
        font-weight:700;
        padding:.85rem 1.4rem;
        border-radius:1.4rem;
        letter-spacing:.08em;
        text-decoration:none;
        box-shadow:0 10px 22px -10px rgba(6,95,70,.45);
        overflow:hidden;
        transition:.4s;
      }
      .add-btn:before{
        content:"";
        position:absolute;
        inset:0;
        background:linear-gradient(120deg,rgba(255,255,255,.35),transparent 55%);
        opacity:0;
        transition:.5s;
      }
      .add-btn:hover{
        transform:translateY(-3px);
      }
      .add-btn:hover:before{opacity:.9;}
      .add-btn .plus{font-size:1.15rem;line-height:0;}
      .stats-bar{
        display:flex;
        gap:1rem;
        align-items:center;
        margin:.5rem 0 1.3rem;
        flex-wrap:wrap;
      }
      .badge{
        background:linear-gradient(120deg,#d1fae5,#a7f3d0);
        padding:.55rem 1.1rem;
        border-radius:2rem;
        font-size:.65rem;
        font-weight:700;
        color:#065f46;
        letter-spacing:.05em;
      }
      .clear{
        font-size:.6rem;
        font-weight:600;
        color:#dc2626;
        background:#fee2e2;
        padding:.4rem .9rem;
        border-radius:2rem;
        border:none;
        cursor:pointer;
        transition:.35s;
      }
      .clear:hover{background:#fecaca;}

      .news-grid{
        display:grid;
        gap:2rem 1.7rem;
        grid-template-columns:1fr; /* default: 1 column */
      }
      @media (min-width:600px){
        .news-grid{
          grid-template-columns:repeat(2,1fr);
        }
      }
      @media (min-width:1020px){
        .news-grid{
          grid-template-columns:repeat(3,1fr);
        }
      }

      /* Card */
      .news-card{
        position:relative;
        display:flex;
        flex-direction:column;
        border-radius:2rem;
        background:linear-gradient(150deg,#ffffff,#f0fdf4);
        border:1px solid #10b98122;
        box-shadow:0 10px 26px -12px rgba(6,95,70,.25),0 3px 10px -3px rgba(6,95,70,.18);
        overflow:hidden;
        transform-style:preserve-3d;
        transition:transform .8s cubic-bezier(.16,.8,.26,.99), box-shadow .55s;
      }
      .news-card:before{
        content:"";
        position:absolute;inset:0;
        background:
          radial-gradient(circle at 18% 22%,rgba(16,185,129,.18),transparent 55%),
          radial-gradient(circle at 82% 78%,rgba(14,165,233,.18),transparent 55%);
        opacity:.55;
        mix-blend-mode:overlay;
        pointer-events:none;
        transition:.6s;
      }
      .news-card:hover{
        transform:translateY(-8px) rotateX(6deg) rotateY(-6deg);
        box-shadow:0 18px 38px -14px rgba(6,95,70,.45),0 10px 24px -10px rgba(14,165,233,.25);
      }
      .news-card:hover:before{opacity:.85;}
      .img-wrap{
        position:relative;
        height:200px;
        overflow:hidden;
        background:#ecfdf5;
      }
      .img{
        width:100%;height:100%;object-fit:cover;
        transition:transform 1s ease;
        transform:scale(1.05);
      }
      .news-card:hover .img{transform:scale(1.18);}
      .no-img{
        width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-size:.8rem;
        font-weight:600;
        color:#047857;
        background:repeating-linear-gradient(45deg,#d1fae5 0 8px,#ecfdf5 8px 16px);
      }
      .overlay{
        position:absolute;inset:0;
        background:linear-gradient(to top,rgba(0,0,0,.55),rgba(0,0,0,.15),transparent);
        pointer-events:none;
      }
      .top-tags{
        position:absolute;
        top:.85rem;
        left:.9rem;
        right:.9rem;
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:.6rem;
      }
      .tag{
        display:inline-flex;
        align-items:center;
        padding:.45rem .85rem;
        font-size:.55rem;
        font-weight:700;
        letter-spacing:.11em;
        border-radius:1rem;
        text-transform:uppercase;
        background:linear-gradient(120deg,#10b981,#047857);
        color:#fff;
        box-shadow:0 4px 12px -4px rgba(6,95,70,.6);
      }
      .date{
        font-size:.55rem;
        font-weight:600;
        background:rgba(255,255,255,.85);
        color:#065f46;
        padding:.4rem .7rem;
        border-radius:.75rem;
        backdrop-filter:blur(6px);
      }
      .body{
        padding:1.4rem 1.4rem 1.6rem;
        display:flex;
        flex-direction:column;
        flex:1;
        min-height:240px;
      }
      .title{
        margin:0 0 .6rem;
        font-size:1.05rem;
        line-height:1.25;
        font-weight:800;
        letter-spacing:.4px;
        background:linear-gradient(90deg,#064e3b,#047857,#10b981);
        -webkit-background-clip:text;
        color:transparent;
      }
      .snippet{
        font-size:.75rem;
        line-height:1.65;
        font-weight:500;
        color:#415e54;
        margin:0 0 1.15rem;
        display:-webkit-box;
        -webkit-line-clamp:4;
        -webkit-box-orient:vertical;
        overflow:hidden;
        min-height:4.4em;
      }
      .actions{
        margin-top:auto;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:1rem;
      }
      .read-btn{
        position:relative;
        display:inline-flex;
        align-items:center;
        gap:.8rem;
        font-size:.65rem;
        font-weight:700;
        padding:.85rem 1.35rem .85rem 1.2rem;
        letter-spacing:.12em;
        text-transform:uppercase;
        border-radius:1.5rem;
        text-decoration:none;
        background:linear-gradient(120deg,#10b981,#0ea5e9,#6366f1);
        background-size:180% 100%;
        color:#fff;
        overflow:hidden;
        box-shadow:0 8px 22px -10px rgba(14,165,233,.4);
        transition:.7s;
      }
      .read-btn .arrow{
        width:1.2rem;height:1.2rem;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        background:rgba(255,255,255,.15);
        border:1px solid rgba(255,255,255,.25);
        border-radius:50%;
        backdrop-filter:blur(6px) saturate(180%);
        position:relative;
        overflow:hidden;
      }
      .read-btn svg{
        width:.75rem;height:.75rem;
        transform:translateX(-2px);
        transition:.5s;
      }
      [dir="rtl"] .read-btn svg{transform:translateX(2px) scaleX(-1);}
      .read-btn .shine{
        position:absolute;
        inset:0;
        background:linear-gradient(120deg,rgba(255,255,255,.65),transparent 60%);
        mix-blend-mode:overlay;
        opacity:0;
        transition:.7s;
      }
      .read-btn:hover{
        background-position:100% 0;
        transform:translateY(-4px);
      }
      .read-btn:hover svg{
        transform:translateX(2px);
      }
      [dir="rtl"] .read-btn:hover svg{
        transform:translateX(-2px) scaleX(-1);
      }
      .read-btn:hover .shine{opacity:.65;}
      .admin-btns{
        display:flex;
        gap:.45rem;
      }
      .edit-btn,.del-btn{
        font-size:.55rem;
        font-weight:700;
        letter-spacing:.07em;
        padding:.65rem .9rem;
        border-radius:1rem;
        border:none;
        cursor:pointer;
        position:relative;
        text-decoration:none;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        background:#f59e0b;
        color:#fff;
        transition:.4s;
      }
      .edit-btn:hover{background:#fbbf24;}
      .del-btn{
        background:#dc2626;
      }
      .del-btn:hover{background:#ef4444;}
      .del-btn.busy{background:#f87171;cursor:wait;}

      /* Skeleton */
      .news-card-skel{
        position:relative;
        display:flex;
        flex-direction:column;
        border-radius:2rem;
        overflow:hidden;
        border:1px solid #10b98122;
        background:linear-gradient(135deg,#ffffff,#f0fdf4);
        min-height:400px;
      }
      .news-card-skel .img{
        height:200px;
        background:linear-gradient(90deg,#ecfdf5,#d1fae5,#ecfdf5);
        background-size:220% 100%;
        animation:shimmer 2.2s ease-in-out infinite;
      }
      .news-card-skel .lines{
        padding:1.4rem 1.4rem 1.5rem;
        display:grid;
        gap:.7rem;
      }
      .news-card-skel .l,
      .news-card-skel .btn{
        height:14px;
        border-radius:8px;
        background:linear-gradient(90deg,#e2f7ef,#d1fae5,#e2f7ef);
        background-size:200% 100%;
        animation:shimmer 2.2s ease-in-out infinite;
      }
      .news-card-skel .btn{
        height:38px;
        margin-top:.6rem;
        border-radius:1.2rem;
      }
      .news-card-skel .w40{width:40%;}
      .news-card-skel .w90{width:90%;}
      .news-card-skel .w80{width:80%;}
      .news-card-skel .w60{width:60%;}
      @keyframes shimmer{
        0%{background-position:0 0;}
        50%{background-position:120% 0;}
        100%{background-position:0 0;}
      }

      .empty{
        text-align:center;
        padding:6rem 1rem 5rem;
        max-width:620px;
        margin:0 auto;
      }
      .empt-icon{
        width:110px;height:110px;
        margin:0 auto 1.8rem;
        background:radial-gradient(circle at 38% 28%,#34d399,#10b981 70%);
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 12px 28px -8px rgba(16,185,129,.45);
      }
      .empty h2{
        font-size:1.9rem;
        font-weight:800;
        margin:0 0 .9rem;
        background:linear-gradient(90deg,#065f46,#059669,#10b981);
        -webkit-background-clip:text;
        color:transparent;
      }
      .empty p{
        font-size:.9rem;
        line-height:1.7;
        font-weight:500;
        color:#315349;
        margin:0 0 1.6rem;
      }
      .empty .reset{
        background:linear-gradient(120deg,#10b981,#047857);
        color:#fff;
        font-size:.65rem;
        font-weight:700;
        letter-spacing:.1em;
        border:none;
        padding:.95rem 1.7rem;
        border-radius:1.6rem;
        cursor:pointer;
        position:relative;
        overflow:hidden;
        transition:.45s;
      }
      .empty .reset:before{
        content:"";
        position:absolute;inset:0;
        background:linear-gradient(120deg,rgba(255,255,255,.5),transparent 65%);
        opacity:0;
        transition:.6s;
      }
      .empty .reset:hover{
        transform:translateY(-4px);
      }
  .empty .reset:hover:before{opacity:.9;}
  /* Admin board styles (collapsible) */
  .admin-toggle-wrap{margin:.2rem 0 1.4rem;position:relative;}
  .admin-toggle{position:relative;display:inline-flex;align-items:center;gap:.85rem;padding:1.15rem 2.25rem 1.15rem 1.85rem;border-radius:3rem;border:1px solid rgba(16,185,129,.55);background:linear-gradient(130deg,#065f46,#047857 18%,#0d9488 36%,#0ea5e9 58%,#6366f1 78%,#818cf8);background-size:400% 100%;color:#fff;font-size:.7rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;box-shadow:0 24px 48px -18px rgba(6,95,70,.55),0 10px 30px -14px rgba(14,165,233,.45),0 0 0 4px rgba(255,255,255,.08);overflow:hidden;animation:gradShift 9s linear infinite, glowPulse 3.2s ease-in-out infinite;isolation:isolate;line-height:1;backdrop-filter:blur(6px) saturate(140%);}
  .admin-toggle:hover{background-position:100% 0;}
  .admin-toggle:focus-visible{outline:none;box-shadow:0 0 0 3px #fff,0 0 0 6px rgba(16,185,129,.6),0 24px 50px -18px rgba(6,95,70,.6);}  
  .admin-toggle.open{animation:gradShift 16s linear infinite;filter:brightness(1.05);box-shadow:0 18px 38px -16px rgba(6,95,70,.55),0 8px 20px -10px rgba(14,165,233,.45),0 0 0 4px rgba(255,255,255,.09);}  
  .admin-toggle .pulse{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 22% 30%,rgba(255,255,255,.4),transparent 62%),radial-gradient(circle at 78% 70%,rgba(255,255,255,.25),transparent 60%);mix-blend-mode:overlay;opacity:.9;animation:pulseShimmer 5.2s linear infinite;}
  .admin-toggle .ring{position:absolute;inset:-4px;border-radius:inherit;background:conic-gradient(from 0deg,rgba(255,255,255,.0),rgba(255,255,255,.4),rgba(255,255,255,.0) 70%);animation:ringSpin 4.5s linear infinite;mix-blend-mode:overlay;pointer-events:none;}
  .admin-toggle.open .ring{animation:ringSpinFast 2.2s linear infinite;opacity:.6;}
  .admin-toggle .halo{position:absolute;inset:-18px;border-radius:inherit;background:radial-gradient(circle at 40% 35%,rgba(16,185,129,.55),rgba(14,165,233,.0) 60%),radial-gradient(circle at 70% 65%,rgba(99,102,241,.45),rgba(99,102,241,0) 65%);filter:blur(22px) saturate(140%);opacity:.55;animation:haloPulse 6s ease-in-out infinite;pointer-events:none;}
  .admin-toggle.open .halo{animation:haloPulseFast 3.3s ease-in-out infinite;opacity:.6;}
  .admin-toggle .flare{position:absolute;width:180%;height:260%;left:-40%;top:-80%;background:radial-gradient(circle at 30% 40%,rgba(255,255,255,.35),rgba(255,255,255,0) 60%);mix-blend-mode:overlay;animation:flareMove 9s linear infinite;pointer-events:none;}
  @keyframes ringSpin{to{transform:rotate(360deg);}}
  @keyframes ringSpinFast{to{transform:rotate(-360deg);}}
  @keyframes gradShift{0%{background-position:0 0;}100%{background-position:120% 0;}}
  @keyframes haloPulse{0%,100%{opacity:.4;transform:scale(.96);}50%{opacity:.7;transform:scale(1.04);}}
  @keyframes haloPulseFast{0%,100%{opacity:.5;transform:scale(.94);}50%{opacity:.8;transform:scale(1.06);}}
  @keyframes flareMove{0%{transform:rotate(0deg) translateY(0);}100%{transform:rotate(360deg) translateY(0);}}
  .admin-toggle .ico{width:1.35rem;height:1.35rem;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);border-radius:50%;backdrop-filter:blur(6px) saturate(160%);box-shadow:0 4px 10px -4px rgba(0,0,0,.4);}
  .admin-toggle .ico svg{width:.9rem;height:.9rem;}
  .admin-toggle .lbl{position:relative;z-index:2;}
  .admin-toggle .arrow{font-size:1.15rem;line-height:0;display:inline-flex;align-items:center;}
  /* Removed hint-badge; replaced with halo + flare for a more professional emphasis */
  @keyframes glowPulse{0%,100%{box-shadow:0 14px 30px -12px rgba(14,165,233,.5),0 6px 16px -8px rgba(6,95,70,.4);}50%{box-shadow:0 18px 40px -12px rgba(14,165,233,.65),0 10px 24px -10px rgba(6,95,70,.5);} }
  @keyframes pulseShimmer{0%{transform:translateX(-45%);}100%{transform:translateX(55%);} }
  .admin-board-collapsible{max-height:0;opacity:0;transform:translateY(-18px);transition:max-height .85s cubic-bezier(.16,.8,.26,.99),opacity .55s ease,transform .6s ease;overflow:hidden;}
  .admin-board-collapsible.open{max-height:1800px;opacity:1;transform:translateY(0);} 
  .admin-board{max-width:1500px;margin:0 auto 2.2rem;padding:.4rem .3rem 2.6rem;}
  .admin-toolbar{display:flex;flex-direction:column;gap:1rem;margin:0 0 1.3rem;padding:1.15rem 1.35rem 1.35rem;border:1px solid #d9efe6;border-radius:1.4rem;background:linear-gradient(145deg,#ffffff,#f1fbf6);box-shadow:0 6px 24px -10px rgba(6,95,70,.18),0 2px 6px -3px rgba(0,0,0,.06);position:relative;overflow:hidden;}
  .admin-toolbar.glassy:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(16,185,129,.12),transparent 60%),radial-gradient(circle at 82% 18%,rgba(14,165,233,.18),transparent 55%);opacity:.7;pointer-events:none;}
  .toolbar-main{display:flex;flex-wrap:wrap;gap:1.1rem;align-items:center;justify-content:space-between;}
  .board-title{margin:0;font-size:1.6rem;font-weight:700;letter-spacing:.5px;background:linear-gradient(90deg,#065f46,#0ea5e9);-webkit-background-clip:text;color:transparent;}
  .toolbar-metrics{display:flex;flex-wrap:wrap;gap:.55rem;align-items:center;}
  .chip{display:inline-flex;align-items:center;font-size:.58rem;font-weight:700;letter-spacing:.11em;padding:.5rem .8rem;border-radius:1rem;border:1px solid #cfe8df;background:#f0fdf4;color:#065f46;text-transform:uppercase;position:relative;}
  .chip.stat{background:#ecfdf5;}
  .chip.selected{background:#fef3c7;border-color:#fde68a;color:#92400e;}
  .chip.filter{background:#dbeafe;border-color:#bfdbfe;color:#1e3a8a;cursor:pointer;}
  .chip.search-ind{background:#e0f2fe;border-color:#bae6fd;color:#075985;}
  .toolbar-actions{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;justify-content:space-between;}
  .filters-inline{display:flex;align-items:center;gap:.6rem;}
  .inline-filter{border:1px solid #10b98140;background:#ffffff;color:#065f46;font-size:.58rem;font-weight:700;letter-spacing:.11em;padding:.55rem .9rem;border-radius:1rem;cursor:pointer;transition:.35s;}
  .inline-filter.on{background:#10b981;color:#fff;box-shadow:0 4px 14px -6px rgba(6,95,70,.4);}
  .inline-filter:hover{background:#f0fdf4;}
  .filters-inline .divider{width:1px;height:22px;background:#d9efe6;}
  .btn-admin{border:1px solid #10b98140;background:linear-gradient(120deg,#ffffff,#ecfdf5);color:#065f46;font-size:.63rem;font-weight:800;letter-spacing:.15em;padding:.78rem 1.25rem;border-radius:1rem;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.45rem;transition:.35s;text-transform:uppercase;}
  .btn-admin:hover{background:linear-gradient(120deg,#f0fdf4,#e6fcf3);box-shadow:0 3px 10px -4px rgba(6,95,70,.3);}
  .btn-admin.primary{background:linear-gradient(120deg,#10b981,#059669);color:#fff;border:none;box-shadow:0 8px 20px -10px rgba(6,95,70,.48);}
  .btn-admin.primary.hi{animation:pulseHi 4s ease-in-out infinite;}
  @keyframes pulseHi{0%,100%{box-shadow:0 8px 22px -10px rgba(6,95,70,.5);}50%{box-shadow:0 14px 28px -10px rgba(6,95,70,.65);} }
  .btn-admin.danger{background:linear-gradient(120deg,#dc2626,#b91c1c);color:#fff;border:none;}
  .btn-admin.danger:hover{filter:brightness(1.07);}
  .btn-admin:disabled{opacity:.35;cursor:not-allowed;box-shadow:none;filter:none;}
  .meta-row{display:flex;align-items:center;gap:1.2rem;margin:.4rem 0 1rem;padding:0 .2rem;flex-wrap:wrap;}
  .metric{font-size:.65rem;font-weight:700;letter-spacing:.08em;background:#d1fae5;padding:.45rem .95rem;border-radius:1rem;color:#065f46;}
  .metric.ghost{background:#f1f5f9;color:#64748b;}
  .link-clear{background:none;border:none;color:#dc2626;font-size:.65rem;font-weight:700;cursor:pointer;letter-spacing:.08em;text-decoration:underline;}
  .table-wrap{border:1px solid #d9efe6;border-radius:1.4rem;background:#ffffff;overflow:auto;box-shadow:0 1px 4px rgba(0,0,0,.04);}
  .news-table{width:100%;border-collapse:separate;border-spacing:0;min-width:860px;font-size:.78rem;}
  .news-table thead th{position:sticky;top:0;background:linear-gradient(120deg,#ecfdf5,#ffffff);font-weight:700;color:#064e3b;font-size:.7rem;letter-spacing:.11em;text-transform:uppercase;padding:.95rem 1rem;border-bottom:1px solid #d9efe6;z-index:2;}
  .news-table tbody td{padding:.85rem 1rem;vertical-align:middle;border-bottom:1px solid #eef6f2;max-width:300px;}
  .news-table tbody tr:last-child td{border-bottom:none;}
  .news-table tbody tr:hover{background:#f4fdf9;}
  .news-table tbody tr.row-selected{background:#ecfdf5;}
  .news-table th.sel, .news-table td.sel{width:34px;text-align:center;}
  .news-table input[type=checkbox]{width:14px;height:14px;cursor:pointer;}
  .ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px;}
  .pill{display:inline-flex;align-items:center;justify-content:center;padding:.25rem .55rem;border-radius:.85rem;background:#e2f7ef;font-size:.55rem;font-weight:600;color:#065f46;min-width:1.6rem;}
  .pill.ok{background:#10b981;color:#fff;}
  .pill.small{background:#fef3c7;color:#92400e;}
  .actions-cell{display:flex;align-items:center;gap:.3rem;}
  .mini-btn{border:none;border-radius:.6rem;padding:.45rem .6rem;cursor:pointer;font-size:.7rem;line-height:1;display:inline-flex;align-items:center;justify-content:center;background:#f1f5f9;color:#065f46;transition:.3s;box-shadow:0 1px 2px rgba(0,0,0,.08);}
  .mini-btn.view{background:#ecfdf5;}
  .mini-btn.edit{background:#fef3c7;color:#92400e;}
  .mini-btn.del{background:#fee2e2;color:#b91c1c;}
  .mini-btn:hover{transform:translateY(-2px);box-shadow:0 4px 10px -4px rgba(0,0,0,.2);}
  .mini-btn:disabled{opacity:.4;cursor:wait;}
  .loading-bar{height:4px;background:linear-gradient(90deg,#10b981,#0ea5e9,#10b981);background-size:200% 100%;animation:loadAnim 1.4s linear infinite;border-radius:4px;margin:1.2rem;}
  @keyframes loadAnim{0%{background-position:0 0;}100%{background-position:200% 0;}}
  .empty-admin{padding:3rem 1rem;text-align:center;font-size:.8rem;font-weight:600;color:#065f46;}
    `}</style>
  );
}
