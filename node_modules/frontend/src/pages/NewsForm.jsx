import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function NewsForm() {
  const [fields, setFields] = useState({
    title_fr: "",
    title_ar: "",
    content_fr: "",
    content_ar: "",
    image: null,
    extra_images: [],
    category_id: ""
  });
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ fr: '', ar: '' });
  const [catError, setCatError] = useState("");
  const [catLoading, setCatLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [extraPreviews, setExtraPreviews] = useState([]); // [{file, url}]
  const [existingGallery, setExistingGallery] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const dropRef = useRef(null);
  // Fetch categories on mount
  useEffect(() => {
    api.get('/categories').then(res => {
      setCategories(res.data || []);
    });
  }, []);
  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Helper to ensure French fallback if translation key missing
  const tf = (key, fr) => {
    const val = t(key);
    return val === key ? fr : val;
  };

  const MAX_EXTRA = 8;
  const MAX_SIZE_MB = 8;

  useEffect(() => {
    if (id) {
      api.get(`/news/${id}`).then(res => {
        setFields(f => ({
          ...f,
          ...res.data,
          image: null,
          extra_images: []
        }));
        if (res.data.image_base64) setPreview(res.data.image_base64);
        // Try to extract existing gallery images (support multiple possible API fields)
        const gallerySrc = res.data.images || res.data.extra_images || res.data.gallery || [];
        const mapped = (gallerySrc || []).map((g, i) => ({
          id: g.id || i,
          url: g.image_base64 || g.base64 || g.url || g.src || null
        })).filter(g => !!g.url);
        setExistingGallery(mapped);
        setLoading(false);
      }).catch(()=>setLoading(false));
    }
  }, [id]);

  const setFilePreview = file => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const setExtraFilePreviews = fileList => {
    // merge with existing until limit
    const incoming = [...fileList];
    const current = extraPreviews.map(p=>p.file);
    const combined = [...current, ...incoming].slice(0, MAX_EXTRA);
    setExtraPreviews(combined.map(f => ({ file: f, url: URL.createObjectURL(f) })));
    setFields(f => ({ ...f, extra_images: combined }));
  };

  const removeExtraAt = idx => {
    setExtraPreviews(prev => {
      const next = prev.filter((_,i)=>i!==idx);
      setFields(f => ({ ...f, extra_images: next.map(p=>p.file) }));
      return next;
    });
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files?.[0];
      if (file && file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`${file.name} > ${MAX_SIZE_MB}MB`);
        return;
      }
      setFields(f => ({ ...f, image: file || null }));
      setFilePreview(file || null);
    } else if (name === "extra_images") {
      const valid = [...files].filter(f=>f.size <= MAX_SIZE_MB * 1024 * 1024);
      if (valid.length !== files.length) {
        alert(`Some files exceeded ${MAX_SIZE_MB}MB and were skipped.`);
      }
      setExtraFilePreviews(valid);
    } else if (name === "cat_fr" || name === "cat_ar") {
      setNewCat(n => ({ ...n, [name === "cat_fr" ? "fr" : "ar"]: value }));
    } else {
      setFields(f => ({ ...f, [name]: value }));
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (!files?.length) return;
    const main = files[0];
    setFields(f => ({ ...f, image: main }));
    setFilePreview(main);
  };
  const handleDragEnter = e => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = e => { e.preventDefault(); if (e.target === dropRef.current) setDragActive(false); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    let categoryId = fields.category_id;
    // If no category_id but newCat is filled, create the category first
    if (!categoryId && newCat.fr && newCat.ar) {
      try {
        const res = await api.post("/categories", {
          name_fr: newCat.fr,
          name_ar: newCat.ar
        });
        categoryId = res.data?.data?.id || res.data?.id;
        setCategories(prev => [...prev, res.data.data || res.data]);
        setFields(f => ({ ...f, category_id: categoryId }));
      } catch (err) {
        setSubmitting(false);
        setCatError(err?.response?.data?.message || err.message);
        alert((lang === 'ar' ? 'فشل إضافة الفئة: ' : 'Erreur catégorie: ') + (err?.response?.data?.message || err.message));
        return;
      }
    }
    const formData = new FormData();
    formData.append("title_fr", fields.title_fr);
    formData.append("title_ar", fields.title_ar);
    formData.append("content_fr", fields.content_fr);
    formData.append("content_ar", fields.content_ar);
    if (categoryId) formData.append("category_id", categoryId);
    if (fields.image) formData.append("image", fields.image);
    if (fields.extra_images?.length) {
      fields.extra_images.slice(0,MAX_EXTRA).forEach(f=>formData.append("extra_images[]", f));
    }
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (id) {
        await api.post(`/news/${id}?_method=PUT`, formData, config);
      } else {
        await api.post("/news", formData, config);
      }
      navigate("/news");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err.message;
      alert((lang === 'ar' ? 'فشل الحفظ: ' : 'Erreur: ') + msg);
      console.error('News submit error', err);
    } finally {
      setSubmitting(false);
    }
  };

  const len = v => v.length;
  const maxTitle = 150;
  const maxContent = 5000;
  const requiredFilled = [fields.title_fr, fields.title_ar, fields.content_fr, fields.content_ar].filter(v=>v && v.trim().length>0).length;
  const progressPct = Math.round(requiredFilled / 4 * 100);
  const dirty = requiredFilled > 0 || fields.image || extraPreviews.length>0;

  return (
    <div className="admin-form-shell" dir={dir}>
      <style>{professionalStyles}</style>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="card" aria-busy={submitting} data-dirty={dirty}>
        <div className="progress-bar" role="progressbar" aria-valuenow={progressPct} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-fill" style={{width: progressPct+"%"}} />
          <div className="progress-meta">
            <span>{progressPct}%</span>
            <small>{tf("completion", "Achèvement")}</small>
          </div>
        </div>
        <div className="card-head">
          <div className="titles">
            <h1>{id ? tf("edit_news", "Modifier une actualité") : tf("add_news", "Ajouter une actualité")}</h1>
            <p className="subtitle">
              {lang === 'ar'
                ? 'كل الحقول التي تحمل * إجبارية'
                : tf("all_fields_required", "Tous les champs marqués * sont obligatoires")}
            </p>
          </div>
          <div className="meta">
            {loading && <span className="badge neutral">{tf("loading", "Chargement")}</span>}
            {id && !loading && <span className="badge">ID #{id}</span>}
            {submitting && <span className="badge warn">{tf("saving", "Enregistrement…")}</span>}
            {!submitting && dirty && <span className="badge drift" title="Unsaved changes">{tf("draft", "Brouillon")}</span>}
          </div>
        </div>
        <section className="section">
          <header className="section-head">
            <h2>{tf("metadata", "Méta‑données")}</h2>
            <p>{tf("provide_bilingual_titles", "Fournissez les titres en deux langues")}</p>
          </header>
          <div className="grid two">
            {/* Only titles here, category moved below */}
            <div className="field">
              <label htmlFor="title_fr">{tf("title_fr", "Titre (FR)")} *</label>
              <div className="control">
                <input id="title_fr" name="title_fr" value={fields.title_fr} maxLength={maxTitle} onChange={handleChange} required style={{borderRadius:14}} />
                <span className="count" data-over={len(fields.title_fr) > maxTitle * .9}>{len(fields.title_fr)}/{maxTitle}</span>
              </div>
            </div>
            <div className="field" dir="rtl">
              <label htmlFor="title_ar">{tf("title_ar", "العنوان (AR)")} *</label>
              <div className="control">
                <input id="title_ar" name="title_ar" value={fields.title_ar} maxLength={maxTitle} onChange={handleChange} required style={{borderRadius:14}} />
                <span className="count" data-over={len(fields.title_ar) > maxTitle * .9}>{len(fields.title_ar)}/{maxTitle}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section" style={{marginTop:32, border:'2px solid #0d9488', borderRadius:18, background:'#f8fbfb'}}>
          <header className="section-head">
            <h2 style={{color:'#0d9488'}}>{lang === 'ar' ? 'الفئة' : 'Catégorie'}</h2>
            <span style={{fontSize:12, color:'#61737f'}}>{lang === 'ar' ? 'حدد أو أضف فئة للخبر' : 'Choisissez ou ajoutez une catégorie pour l\'article'}</span>
          </header>
          <div className="field">
            <label htmlFor="category_id" style={{fontWeight:700, fontSize:'1.1em', color:'#0d9488'}}>
              <span style={{marginRight:6, verticalAlign:'middle'}}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display:'inline',verticalAlign:'middle'}}><circle cx="10" cy="10" r="9" stroke="#0d9488" strokeWidth="2"/><path d="M10 6v8M6 10h8" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              {lang === 'ar' ? 'الفئة' : 'Catégorie'} *
            </label>
            <div className="flex gap-2 items-center" style={{marginBottom:12}}>
              <select
                id="category_id"
                name="category_id"
                className="control"
                value={fields.category_id}
                onChange={handleChange}
                required
                style={{ minWidth: 180, borderRadius:14, border:'2.5px solid #0d9488', background:'#fff', fontWeight:600, fontSize:'1.05em', color:'#0d9488', boxShadow:'0 2px 8px -2px #0d948822', paddingLeft: '1.2em', paddingRight: '1.2em', marginLeft: 2, marginRight: 2 }}
              >
                <option value="" style={{color:'#61737f',fontWeight:400, padding:'0.5em 1.2em', margin:'0.2em 0'}}>{lang === 'ar' ? 'اختر فئة موجودة أو أضف جديدة... / ' + tf('select_existing_or_add', 'Sélectionner une catégorie existante ou ajouter...') : tf('select_existing_or_add', 'Sélectionner une catégorie existante ou ajouter...') + ' / اختر فئة موجودة أو أضف جديدة...'}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} style={{borderRadius:10, padding:'0.5em 1.2em', margin:'0.2em 0'}}>
                    {lang === 'ar' ? (cat.name_ar || cat.name_fr) : (cat.name_fr || cat.name_ar)}
                  </option>
                ))}
              </select>
            </div>
            <div style={{background:'#e0f7fa', border:'2px dashed #0d9488', borderRadius:14, padding:'1.1rem 1.2rem', marginTop:10, marginBottom:10, boxShadow:'0 2px 12px -4px #0d948822'}}>
              <div style={{display:'flex',alignItems:'center',gap:'1.2rem',marginBottom:'.7rem'}}>
                <span style={{fontWeight:700, color:'#0d9488', fontSize:'1.05em'}}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><rect x="2" y="2" width="16" height="16" rx="4" stroke="#0d9488" strokeWidth="2"/><path d="M10 6v8M6 10h8" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/></svg>
                  {tf('add_new_category', (lang === 'ar' ? 'إضافة فئة جديدة' : 'Ajouter une nouvelle catégorie'))}
                </span>
              </div>
              <div className="mt-3 flex gap-3" style={{alignItems:'flex-end',marginBottom:'.7rem'}}>
                <div style={{display:'flex',flexDirection:'column',gap:'.3rem'}}>
                  <label style={{fontSize:'.7rem',fontWeight:600}} htmlFor="cat_fr">{tf('category_name_fr', (lang==='ar' ? 'الاسم بالفرنسية' : 'Nom (FR)'))}</label>
                  <input
                    id="cat_fr"
                    name="cat_fr"
                    type="text"
                    className="control"
                    style={{ minWidth: 140, borderRadius:12, border:'2px solid #0d9488', background:'#fff', padding:'0.85rem 1.1rem', fontWeight:600, color:'#0d9488' }}
                    placeholder={tf('category_name_fr_placeholder', lang === "ar" ? "الاسم بالفرنسية" : "Nom de la catégorie (FR)")}
                    value={newCat.fr || ''}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'.3rem'}}>
                  <label style={{fontSize:'.7rem',fontWeight:600}} htmlFor="cat_ar">{tf('category_name_ar', (lang==='ar' ? 'الاسم بالعربية' : 'Nom (AR)'))}</label>
                  <input
                    id="cat_ar"
                    name="cat_ar"
                    type="text"
                    className="control"
                    dir="rtl"
                    style={{ minWidth: 140, borderRadius:12, border:'2px solid #0d9488', background:'#fff', padding:'0.85rem 1.1rem', fontWeight:600, color:'#0d9488' }}
                    placeholder={tf('category_name_ar_placeholder', lang === "ar" ? "الاسم بالعربية" : "Nom de la catégorie (AR)")}
                    value={newCat.ar || ''}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="button"
                  className="btn primary small"
                  style={{
                    borderRadius:14,
                    fontWeight:700,
                    fontSize:'.92em',
                    padding:'0.7rem 1.1rem',
                    display:'flex',
                    alignItems:'center',
                    gap:8,
                    background:'linear-gradient(90deg,#0d9488,#10b981)',
                    color:'#fff',
                    border:'none',
                    marginLeft:10,
                    boxShadow:'0 2px 8px -2px #0d9488'
                  }}
                  disabled={catLoading || !newCat.fr || !newCat.ar}
                  onClick={async () => {
                    setCatError("");
                    if (!newCat.fr.trim() || !newCat.ar.trim()) {
                      setCatError(tf('category_both_names_required', 'Veuillez entrer les deux noms') + ' / ' + (lang === "ar" ? "يرجى إدخال الاسمين" : "Veuillez entrer les deux noms"));
                      return;
                    }
                    setCatLoading(true);
                    try {
                      const res = await api.post("/categories", {
                        name_fr: newCat.fr.trim(),
                        name_ar: newCat.ar.trim()
                      });
                      const newCategory = res.data?.data || res.data;
                      setCategories(prev => [...prev, newCategory]);
                      setFields(f => ({ ...f, category_id: newCategory.id }));
                      setNewCat({ fr: '', ar: '' });
                    } catch (err) {
                      setCatError((err?.response?.data?.message || err.message) + ' / ' + (lang === 'ar' ? 'فشل إضافة الفئة' : 'Erreur catégorie'));
                    } finally {
                      setCatLoading(false);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="2"/><path d="M10 6v8M6 10h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  {catLoading ? (tf('adding', 'Ajout...') + ' / ' + (lang === "ar" ? "جارٍ الإضافة..." : "Ajout...")) : (tf('add_category', (lang === "ar" ? "إضافة الفئة" : "Ajouter")))}
                </button>
              </div>
              {catError && <div className="text-red-600 text-xs font-semibold mt-1">{catError}</div>}
            </div>
          </div>
        </section>
        <section className="section">
          <header className="section-head">
            <h2>{tf("content", "Contenu")}</h2>
            <p>{tf("write_detailed_news", "Rédigez la dépêche de façon détaillée en deux langues")}</p>
          </header>
          <div className="grid two">
          <div className="field">
            <label htmlFor="content_fr">{tf("content_fr", "Texte (FR)")} *</label>
            <div className="control">
              <textarea id="content_fr" name="content_fr" rows={7} value={fields.content_fr} maxLength={maxContent} onChange={handleChange} required />
              <span className="count" data-over={len(fields.content_fr) > maxContent * .9}>{len(fields.content_fr)}/{maxContent}</span>
            </div>
          </div>
          <div className="field" dir="rtl">
            <label htmlFor="content_ar">{tf("content_ar", "النص (AR)")} *</label>
            <div className="control">
              <textarea id="content_ar" name="content_ar" rows={7} value={fields.content_ar} maxLength={maxContent} onChange={handleChange} required />
              <span className="count" data-over={len(fields.content_ar) > maxContent * .9}>{len(fields.content_ar)}/{maxContent}</span>
            </div>
          </div>
        </div>
        </section>
        <section className="section">
          <header className="section-head">
            <h2>{lang==='ar'? 'الوسائط' : tf("media", "Médias")}</h2>
            <p>{lang==='ar'? 'حمّل الصورة الرئيسية و صور المعرض (لتفادي التكرار تظهر الصور الحالية أسفل).' : tf("upload_main_gallery", "Téléversez l’image principale et la galerie (les images existantes sont affichées en dessous pour éviter les doublons)")}</p>
          </header>
          <div className="grid two stack-mobile">
          <div className="field">
            <label>{lang==='ar'? 'الصورة الرئيسية (اختياري)' : tf("main_image_optional", "Image principale (optionnel)")}</label>
            <div
              ref={dropRef}
              className={`drop ${preview ? 'has-image':''} ${dragActive ? 'drag':''}`}
              onDragOver={e=>e.preventDefault()}
              onDrop={handleDrop}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              <input ref={mainInputRef} type="file" name="image" accept="image/*" onChange={handleChange} />
              {preview ? (
                <div className="preview">
                  <img src={preview} alt="main" />
                  <button type="button" className="btn small" onClick={()=>{setFields(f=>({...f,image:null})); setPreview(null);}}>{tf("remove", "Retirer")}</button>
                </div>
              ) : (
                <div className="placeholder">
                  <span className="icon img-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" width="42" height="42" stroke="currentColor" fill="none" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                      <circle cx="9" cy="10" r="2.2" />
                      <path d="M3 16l4.5-4 5.5 5 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p>{lang==='ar'? 'إسحب و أفلت أو انقر' : tf("drag_or_click", "Glissez-Déposez ou cliquez")}</p>
                  <small>{`PNG • JPG • WEBP ≤ ${MAX_SIZE_MB}MB`}</small>
                </div>
              )}
            </div>
            <div className="add-btn-row">
              <button type="button" className="btn add-image" onClick={()=>mainInputRef.current?.click()}>{lang==='ar'? 'اختيار الصورة الرئيسية' : tf("select_main_image", "Choisir l’image principale")}</button>
              {preview && <button type="button" className="btn ghost" onClick={()=>{setFields(f=>({...f,image:null})); setPreview(null);}}>{lang==='ar'? 'مسح' : tf("clear_main_image", "Effacer")}</button>}
            </div>
          </div>
          <div className="field">
            <label>{lang==='ar'? 'صور المعرض (اختياري)' : tf("gallery_images_optional", "Images de galerie (optionnel)")}</label>
            <div className="gallery-box">
              <input ref={galleryInputRef} type="file" name="extra_images" multiple accept="image/*" onChange={handleChange} />
              <div className="add-btn-row">
                <button type="button" className="btn add-image" onClick={()=>galleryInputRef.current?.click()}>{lang==='ar'? 'إضافة صور' : tf("add_gallery_images", "Ajouter des images")}</button>
                {extraPreviews.length>0 && <button type="button" className="btn ghost" onClick={()=>{setExtraPreviews([]); setFields(f=>({...f,extra_images:[]}));}}>{lang==='ar'? 'تفريغ المعرض' : tf("clear_gallery", "Vider la galerie")}</button>}
              </div>
              {existingGallery.length>0 && (
                <div className="existing-gallery-block">
                  <p className="existing-title">{lang==='ar'? 'الصور الحالية':'Images déjà enregistrées'} <span className="count-eg">({existingGallery.length})</span></p>
                  <div className="thumbs existing">
                    {existingGallery.map(img => (
                      <div key={img.id} className="thumb existing-thumb" title={lang==='ar'? 'موجودة':'Existante'}>
                        <img src={img.url} alt="existing" />
                        <span className="flag" title={lang==='ar'? 'موجودة':'Déjà'}>★</span>
                      </div>
                    ))}
                  </div>
                  <small className="hint subtle">{lang==='ar'? 'لمنع التكرار تجنب إعادة رفع نفس الصور':'Pour éviter les doublons, ne ré-uploadez pas ces images.'}</small>
                </div>
              )}
              <div className="thumbs">
                {extraPreviews.length === 0 && (
                  <div className="empty-hint">{lang==='ar'? 'لا صور مضافة بعد' : tf("no_images_yet", "Aucune image pour l’instant")}</div>
                )}
                {extraPreviews.map((p,i)=>(
                  <div key={i} className="thumb">
                    <img src={p.url} alt={`extra-${i}`} />
                    <button type="button" className="x" onClick={()=>removeExtraAt(i)} aria-label="remove">×</button>
                  </div>
                ))}
                {extraPreviews.length < MAX_EXTRA && (
                  <div className="slot info">{extraPreviews.length}/{MAX_EXTRA}</div>
                )}
              </div>
              <small className="hint">{lang==='ar'? 'حتى':'Jusqu’à'} {MAX_EXTRA} • {`≤ ${MAX_SIZE_MB}MB`} {lang==='ar'? 'لكل صورة' : tf("each", "chacune")}</small>
            </div>
          </div>
        </div>
        </section>
        <div className="actions floating">
          <button type="button" className="btn ghost" onClick={()=>navigate('/news')} disabled={submitting}>{tf("cancel", "Annuler")}</button>
          <button type="submit" className="btn primary" disabled={submitting || loading}>
            {submitting ? tf("saving", "Enregistrement…") : id ? tf("edit", "Modifier") : tf("create", "Créer")}
          </button>
        </div>
      </form>
    </div>
  );
}

const professionalStyles = `
  :root{--accent:#0d9488;--accent-alt:#059669;--accent-fade:#0d948814;--focus:0 0 0 3px #0d94884d;--border:#d4e1e7;--border-soft:#e5eef2;--panel:#ffffff;--panel-alt:#f5faf9;--bg:#f2f6f8;--text:#102a33;--muted:#61737f;--danger:#dc2626;--warn:#b45309;--radius:18px;--radius-sm:10px;--gradient:linear-gradient(90deg,#0d9488,#10b981);}
  .admin-form-shell{max-width:1160px;margin:0 auto;padding:2.4rem 1.5rem 5rem;background:var(--bg);}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);padding:2.2rem 2rem 3rem;box-shadow:0 4px 18px -6px rgba(16,42,51,.08),0 1px 3px rgba(0,0,0,.05);position:relative;overflow:hidden;}
  .card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 12%,#0d94880d,transparent 55%),radial-gradient(circle at 82% 88%,#10b98111,transparent 60%);pointer-events:none;}
  .card[aria-busy="true"]{opacity:.55;pointer-events:none;}
  .card[data-dirty="true"]{border-color:#0d9488;}
  .progress-bar{position:relative;height:50px;margin:-2.2rem -2rem 1.8rem;display:flex;align-items:center;border-bottom:1px solid var(--border-soft);background:linear-gradient(90deg,#ffffff,#f9fbfc);}
  .progress-fill{position:absolute;left:0;top:0;bottom:0;background:var(--gradient);width:0;transition:width .55s cubic-bezier(.65,.05,.36,1);opacity:.18;}
  .progress-meta{position:relative;display:flex;flex-direction:column;align-items:flex-end;margin-left:auto;padding:0 1.6rem;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600;}
  .progress-meta span{font-size:1rem;font-weight:600;color:var(--text);letter-spacing:.05em;}
  .card-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:1.2rem;margin:0 0 1.6rem;}
  .card-head h1{font-size:1.6rem;font-weight:600;color:var(--text);margin:0;letter-spacing:.5px;}
  .card-head .subtitle{margin:.45rem 0 0;font-size:.78rem;color:var(--muted);font-weight:500;}
  .badge{display:inline-flex;align-items:center;gap:.35rem;background:var(--accent-fade);color:var(--accent);font-size:.62rem;font-weight:600;padding:.44rem .66rem;border-radius:10px;letter-spacing:.05em;text-transform:uppercase;border:1px solid #0d948831;backdrop-filter:saturate(1.2);}
  .badge.neutral{background:#e2e8f07a;color:#334155;border-color:#cbd5e1;}
  .badge.warn{background:#fff7ed;color:#b45309;border-color:#fed7aa;}
  .badge.drift{background:#f5f3ff;color:#6d28d9;border-color:#ddd6fe;}
  .meta{display:flex;gap:.55rem;align-items:center;}
  .section{margin:0 0 2.1rem;position:relative;padding:1.55rem 1.55rem 1.75rem;border:1px solid var(--border);border-radius:16px;background:linear-gradient(145deg,#ffffff,#f8fbfb);box-shadow:0 2px 6px -3px rgba(0,0,0,.05),0 1px 2px rgba(0,0,0,.04);}
  .section-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin:0 0 1.05rem;}
  .section-head h2{margin:0;font-size:.95rem;letter-spacing:.08em;font-weight:600;text-transform:uppercase;background:linear-gradient(90deg,#0d9488,#10b981);-webkit-background-clip:text;color:transparent;}
  .section-head p{margin:0;font-size:.62rem;letter-spacing:.05em;color:var(--muted);flex:1;}
  .grid.two{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.4rem 1.7rem;}
  .field{display:flex;flex-direction:column;gap:.55rem;position:relative;}
  .field label{font-size:.63rem;font-weight:700;letter-spacing:.15em;color:#4b6270;text-transform:uppercase;}
  .control{position:relative;}
  .control input,.control textarea{width:100%;border:1px solid var(--border);border-radius:14px;background:#ffffff;padding:.85rem .95rem .95rem;font-size:.84rem;font-family:inherit;line-height:1.5;color:var(--text);transition:border-color .25s,background .25s,box-shadow .25s;box-shadow:0 1px 2px rgba(0,0,0,.03);}
  .control input:hover,.control textarea:hover{border-color:#b9c9d0;}
  .control input:focus,.control textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),var(--focus);background:#f8fffe;}
  .control textarea{resize:vertical;min-height:170px;}
  .count{position:absolute;bottom:6px;right:12px;font-size:.55rem;color:#708794;letter-spacing:.08em;pointer-events:none;background:#ffffffd9;padding:2px 7px;border-radius:20px;border:1px solid var(--border);box-shadow:0 1px 2px rgba(0,0,0,.04);}
  .count[data-over="true"]{color:#b45309;font-weight:600;border-color:#fbbf24;}
  [dir="rtl"] .count{right:auto;left:12px;}
  .drop{position:relative;border:2px dashed #bcd7d3;border-radius:18px;min-height:200px;background:linear-gradient(145deg,#ffffff,#f3faf9);display:flex;align-items:center;justify-content:center;padding:1.25rem;overflow:hidden;transition:border-color .35s,background .35s;}
  .drop.drag{border-color:var(--accent);background:#ecfdf5;}
  .drop.has-image{border-style:solid;border-color:#c8d9d6;background:#ffffff;}
  .drop:hover{background:#f0f9f8;}
  .drop input{position:absolute;inset:0;opacity:0;cursor:pointer;}
  .placeholder{text-align:center;display:flex;flex-direction:column;gap:.55rem;font-size:.73rem;color:var(--muted);font-weight:500;}
  .placeholder .icon{font-size:1.6rem;}
  .placeholder small{font-size:.55rem;color:#78909a;letter-spacing:.09em;}
  .preview{position:relative;width:100%;height:100%;}
  .preview img{width:100%;height:100%;object-fit:cover;border-radius:14px;box-shadow:0 4px 18px -6px rgba(0,0,0,.18);}
  .preview .btn.small{position:absolute;top:10px;right:10px;background:#ffffffd9;color:#0f3734;}
  .gallery-box{position:relative;border:1px solid var(--border);border-radius:18px;background:linear-gradient(145deg,#ffffff,#f5fbfa);padding:1rem 1rem 1.25rem;display:flex;flex-direction:column;gap:.95rem;box-shadow:0 1px 3px rgba(0,0,0,.05);}
  .add-btn-row{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.75rem;}
  .btn.add-image{background:var(--gradient);color:#fff;border:none;box-shadow:0 3px 12px -4px rgba(13,148,136,.4);}
  .btn.add-image:hover{filter:brightness(1.05);}
  .gallery-box input{font-size:.62rem;color:#4b6270;}
  .thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(74px,1fr));gap:.7rem;}
  .thumbs.existing{margin-bottom:.75rem;}
  .thumb{position:relative;aspect-ratio:1/1;border-radius:12px;overflow:hidden;background:#f1f5f7;border:1px solid #d6e3e8;box-shadow:0 1px 2px rgba(0,0,0,.05) inset;}
  .thumb img{width:100%;height:100%;object-fit:cover;filter:saturate(1.05) contrast(1.04);}
  .thumb .x{position:absolute;top:4px;right:4px;width:22px;height:22px;border:none;border-radius:8px;background:#ffffffd9;color:#0f2530;font-size:.85rem;line-height:0;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 0 0 1px #d4e1e7,0 2px 4px -2px rgba(0,0,0,.25);transition:.25s;}
  .thumb .x:hover{background:#dc2626;color:#fff;}
  .existing-gallery-block{display:flex;flex-direction:column;gap:.6rem;margin-top:.4rem;padding:.8rem .75rem .9rem;border:1px dashed #b6d2cf;border-radius:14px;background:#f7fcfb;}
  .existing-title{margin:0;font-size:.6rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#0d5f58;display:flex;align-items:center;gap:.4rem;}
  .existing-title .count-eg{font-weight:600;color:#059669;}
  .existing-thumb{position:relative;}
  .existing-thumb .flag{position:absolute;bottom:4px;right:4px;background:#0d9488d9;color:#fff;font-size:.55rem;padding:2px 5px;border-radius:6px;box-shadow:0 2px 6px -2px rgba(0,0,0,.35);}
  .hint.subtle{opacity:.75;}
  .img-icon{color:#0d9488;}
  .slot.info{display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:600;color:#4b6270;background:#eef7f6;border:1px dashed #b6d2cf;border-radius:12px;}
  .empty-hint{grid-column:1/-1;font-size:.62rem;text-align:left;color:#6b828f;}
  .hint{font-size:.55rem;letter-spacing:.09em;color:#5d717d;text-transform:uppercase;font-weight:600;}
  .actions{margin-top:1.9rem;display:flex;gap:.9rem;justify-content:flex-end;}
  .actions.floating{position:sticky;bottom:0;padding:1rem 0 .3rem;margin-top:2.6rem;background:linear-gradient(180deg,transparent,#f2f6f8 60%);backdrop-filter:blur(2px);}
  .btn{border:1px solid var(--border);border-radius:14px;padding:.9rem 1.6rem;font-size:.7rem;font-weight:700;letter-spacing:.11em;cursor:pointer;display:inline-flex;align-items:center;gap:.55rem;transition:.3s;background:linear-gradient(160deg,#ffffff,#f3f9f8);color:var(--text);text-transform:uppercase;box-shadow:0 1px 2px rgba(0,0,0,.05);}
  .btn:hover{background:linear-gradient(160deg,#f6fffe,#ecfdf5);border-color:#0d94884d;}
  .btn.primary{background:linear-gradient(120deg,#0d9488,#10b981);border:none;box-shadow:0 4px 16px -6px rgba(13,148,136,.45);color:#fff;}
  .btn.primary:hover{filter:brightness(1.05);box-shadow:0 6px 20px -6px rgba(13,148,136,.55);}
  .btn.ghost{background:#ffffff;border-style:dashed;}
  .btn.ghost:hover{background:#f0f9f8;}
  .btn.small{padding:.5rem .85rem;font-size:.58rem;border-radius:10px;letter-spacing:.08em;}
  [data-dirty="true"] .btn.primary:after{content:"•";font-size:1.15rem;line-height:0;margin-left:2px;color:#fff;filter:drop-shadow(0 0 4px #0d9488);}
  @media (max-width:880px){
    .grid.two{grid-template-columns:1fr;}
    .card{padding:1.9rem 1.25rem 2.6rem;}
    .progress-bar{margin:-1.9rem -1.25rem 1.3rem;height:46px;}
    .section{padding:1.25rem 1.15rem 1.45rem;}
    .thumbs{grid-template-columns:repeat(auto-fill,minmax(64px,1fr));}
  }
`;
