import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function NewsForm() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const dropRef = useRef(null);

  const [fields, setFields] = useState({
    title_fr: "",
    title_ar: "",
    content_fr: "",
    content_ar: "",
    image: null,
    extra_images: []
  });

  useEffect(() => {
    if (id) {
      api.get(`/news/${id}`).then(res => {
        setFields(f => ({
          ...f,
            ...res.data,
          image: null,
          extra_images: []
        }));
        setLoading(false);
      });
    }
  }, [id]);

  const setFilePreview = file => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const setExtraFilePreviews = fileList => {
    const arr = [...fileList].slice(0,8).map(f=>({ f, url: URL.createObjectURL(f) }));
    setExtraPreviews(arr);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFields(f => ({ ...f, image: files[0] }));
      setFilePreview(files[0]);
    } else if (name === "extra_images") {
      setFields(f => ({ ...f, extra_images: files }));
      setExtraFilePreviews(files);
    } else {
      setFields(f => ({ ...f, [name]: value }));
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files?.length) return;
    const main = files[0];
    setFields(f => ({ ...f, image: main }));
    setFilePreview(main);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(fields).forEach(([key, val]) => {
      if (key === "extra_images" && val.length) {
        [...val].slice(0,8).forEach(file => formData.append("extra_images[]", file));
      } else if (val) formData.append(key, val);
    });
    try {
      if (id) {
        await api.post(`/news/${id}?_method=PUT`, formData);
      } else {
        await api.post("/news", formData);
      }
      navigate("/news");
    } finally {
      setSubmitting(false);
    }
  };

  const len = v => v.length;
  const maxTitle = 150;
  const maxContent = 5000;

  return (
    <div className="nf-shell" dir={dir}>
      <NFStyle />
      <div className="nf-glow" />
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="nf-form">
        <header className="nf-head">
          <h1 className="nf-title">
            {id ? t("edit_news") : t("add_news")}
          </h1>
          <div className="nf-status">
            {loading && <span className="nf-badge">{t("loading") || "…"}</span>}
            {id && !loading && <span className="nf-badge alt">ID #{id}</span>}
          </div>
        </header>

        <section className="nf-grid">
          <div className="nf-field">
            <label>{t("title_fr")}</label>
            <div className="nf-input-wrap">
              <input
                name="title_fr"
                maxLength={maxTitle}
                value={fields.title_fr}
                onChange={handleChange}
                required
                placeholder={t("title_fr")}
              />
              <span className="nf-count">{len(fields.title_fr)}/{maxTitle}</span>
            </div>
          </div>
          <div className="nf-field">
            <label>{t("title_ar")}</label>
            <div className="nf-input-wrap" dir="rtl">
              <input
                name="title_ar"
                maxLength={maxTitle}
                value={fields.title_ar}
                onChange={handleChange}
                required
                placeholder={t("title_ar")}
              />
              <span className="nf-count">{len(fields.title_ar)}/{maxTitle}</span>
            </div>
          </div>

          <div className="nf-field nf-col-span">
            <label>{t("content_fr")}</label>
            <div className="nf-input-wrap">
              <textarea
                name="content_fr"
                maxLength={maxContent}
                rows={8}
                value={fields.content_fr}
                onChange={handleChange}
                required
                placeholder={t("content_fr")}
              />
              <span className="nf-count">{len(fields.content_fr)}/{maxContent}</span>
            </div>
          </div>
          <div className="nf-field nf-col-span">
            <label>{t("content_ar")}</label>
            <div className="nf-input-wrap" dir="rtl">
              <textarea
                name="content_ar"
                maxLength={maxContent}
                rows={8}
                value={fields.content_ar}
                onChange={handleChange}
                required
                placeholder={t("content_ar")}
              />
              <span className="nf-count">{len(fields.content_ar)}/{maxContent}</span>
            </div>
          </div>

          <div className="nf-field">
            <label>{t("Choose the main image (Optional)")}</label>
            <div
              ref={dropRef}
              onDragOver={e=>e.preventDefault()}
              onDrop={handleDrop}
              className="nf-drop"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {preview ? (
                <div className="nf-preview">
                  <img src={preview} alt="preview" />
                  <button
                    type="button"
                    onClick={() => { setFields(f=>({...f,image:null})); setPreview(null); }}
                  >✕</button>
                </div>
              ) : (
                <div className="nf-drop-hint">
                  <span>{t("Drag & Drop or Click")}</span>
                  <small>{t("PNG / JPG / WEBP")}</small>
                </div>
              )}
            </div>
          </div>

            <div className="nf-field">
              <label>{t("Choose the other images (Optional)")}</label>
              <div className="nf-extra">
                <input
                  type="file"
                  name="extra_images"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                />
                <div className="nf-extra-list">
                  {extraPreviews.map((p,i)=>(
                    <figure key={i}>
                      <img src={p.url} alt={"extra"+i} />
                    </figure>
                  ))}
                </div>
                <small className="nf-hint">
                  {t("Up to")} 8 {t("images")}
                </small>
              </div>
            </div>
        </section>

        <footer className="nf-actions">
          <button
            type="button"
            onClick={()=>navigate("/news")}
            className="nf-btn ghost"
            disabled={submitting}
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            className="nf-btn primary"
            type="submit"
            disabled={submitting || loading}
          >
            {submitting ? (t("saving") || "Saving…") : id ? t("edit") : t("create")}
          </button>
        </footer>
      </form>
    </div>
  );
}

function NFStyle() {
  return (
    <style>{`
      .nf-shell{
        position:relative;
        padding:clamp(1rem,2.2vw,2.5rem);
        max-width:1200px;
        margin-inline:auto;
      }
      .nf-glow{
        position:absolute;inset:0;
        background:
          radial-gradient(circle at 20% 15%,rgba(16,185,129,.20),transparent 60%),
          radial-gradient(circle at 80% 85%,rgba(5,150,105,.15),transparent 55%);
        filter:blur(40px);
        pointer-events:none;
        opacity:.9;
        z-index:-1;
      }
      .nf-form{
        position:relative;
        background:linear-gradient(135deg,#0f201b 0%,#112d24 32%,#12362a 60%,#0e2a21 100%);
        border:1px solid #1d4d41;
        border-radius:28px;
        padding:2rem clamp(1.25rem,2vw,2.4rem) 2.4rem;
        box-shadow:0 20px 40px -18px rgba(0,0,0,.55),0 0 0 1px #1a3d34 inset;
        overflow:hidden;
      }
      .nf-form:before{
        content:"";
        position:absolute;inset:0;
        background:
          linear-gradient(120deg,rgba(255,255,255,.06),transparent 60%);
        pointer-events:none;
        mix-blend-mode:overlay;
      }
      .nf-head{
        display:flex;
        flex-wrap:wrap;
        align-items:flex-end;
        gap:1rem;
        margin-bottom:1.5rem;
      }
      .nf-title{
        font-size:clamp(1.35rem,2.1vw,2.15rem);
        font-weight:800;
        letter-spacing:.5px;
        background:linear-gradient(90deg,#6ee7b7,#34d399,#10b981);
        -webkit-background-clip:text;
        color:transparent;
        margin:0;
      }
      .nf-status{display:flex;gap:.5rem;}
      .nf-badge{
        display:inline-flex;
        align-items:center;
        padding:.4rem .75rem;
        font-size:.65rem;
        font-weight:700;
        letter-spacing:.08em;
        border-radius:999px;
        text-transform:uppercase;
        background:#0f5132;
        color:#a7f3d0;
        border:1px solid #1e805b;
      }
      .nf-badge.alt{background:#133f33;color:#6ee7b7;}
      .nf-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
        gap:1.4rem 1.6rem;
      }
      .nf-field{display:flex;flex-direction:column;gap:.5rem;}
      .nf-field label{
        font-size:.68rem;
        letter-spacing:.15em;
        font-weight:700;
        text-transform:uppercase;
        color:#74f1c4;
        opacity:.9;
      }
      .nf-input-wrap{position:relative;}
      .nf-input-wrap input,
      .nf-input-wrap textarea{
        width:100%;
        background:rgba(255,255,255,.04);
        border:1px solid #1c4d3f;
        border-radius:16px;
        padding:0.85rem 1rem .95rem;
        font-size:.85rem;
        line-height:1.4;
        color:#e2fdf4;
        font-family:inherit;
        resize:vertical;
        outline:none;
        transition:.3s;
      }
      .nf-input-wrap textarea{min-height:160px;}
      .nf-input-wrap input:focus,
      .nf-input-wrap textarea:focus{
        border-color:#10b981;
        background:rgba(16,185,129,.10);
        box-shadow:0 0 0 3px #10b98133;
      }
      .nf-count{
        position:absolute;
        bottom:6px;
        right:14px;
        font-size:.55rem;
        letter-spacing:.08em;
        color:#6ee7b7;
        opacity:.75;
        pointer-events:none;
      }
      [dir="rtl"] .nf-count{right:auto;left:14px;}

      .nf-drop{
        position:relative;
        background:rgba(16,185,129,.06);
        border:1px dashed #1d5b49;
        border-radius:18px;
        min-height:170px;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:1rem;
        overflow:hidden;
        transition:.35s;
      }
      .nf-drop:hover{background:rgba(16,185,129,.12);}
      .nf-drop input{
        position:absolute;
        inset:0;
        opacity:0;
        cursor:pointer;
      }
      .nf-drop-hint{
        text-align:center;
        font-size:.75rem;
        font-weight:600;
        color:#c7fcec;
        display:flex;
        flex-direction:column;
        gap:.35rem;
        letter-spacing:.05em;
      }
      .nf-drop-hint small{
        font-weight:500;
        font-size:.6rem;
        opacity:.6;
        letter-spacing:.15em;
      }
      .nf-preview{
        position:relative;
        width:100%;
        height:100%;
        border-radius:12px;
        overflow:hidden;
      }
      .nf-preview img{
        width:100%;height:100%;object-fit:cover;
        filter:contrast(1.05) saturate(1.15);
      }
      .nf-preview button{
        position:absolute;
        top:6px;
        right:6px;
        background:#08251c;
        color:#6ee7b7;
        border:1px solid #14624d;
        width:30px;height:30px;
        display:flex;align-items:center;justify-content:center;
        border-radius:10px;
        font-size:.85rem;
        cursor:pointer;
        transition:.25s;
      }
      .nf-preview button:hover{background:#0f3a2d;color:#a7f3d0;}

      .nf-extra{
        position:relative;
        background:rgba(255,255,255,.04);
        border:1px solid #1c4d3f;
        border-radius:18px;
        padding:1rem 1rem 1.15rem;
        display:flex;
        flex-direction:column;
        gap:.75rem;
        transition:.3s;
      }
      .nf-extra:hover{border-color:#236a55;}
      .nf-extra input{
        font-size:.7rem;
        color:#a7f3d0;
      }
      .nf-extra-list{
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(60px,1fr));
        gap:.5rem;
      }
      .nf-extra-list figure{
        position:relative;
        aspect-ratio:1/1;
        border-radius:12px;
        overflow:hidden;
        background:#0c3a2d;
        border:1px solid #1d5b49;
      }
      .nf-extra-list img{
        width:100%;height:100%;object-fit:cover;
      }
      .nf-hint{
        font-size:.55rem;
        letter-spacing:.12em;
        color:#6ee7b7b8;
        text-transform:uppercase;
      }

      .nf-actions{
        margin-top:2.2rem;
        display:flex;
        flex-wrap:wrap;
        gap:1rem;
        justify-content:flex-end;
      }
      .nf-btn{
        position:relative;
        border:none;
        cursor:pointer;
        font-family:inherit;
        font-weight:700;
        letter-spacing:.08em;
        font-size:.7rem;
        padding:1rem 1.65rem;
        border-radius:18px;
        text-transform:uppercase;
        transition:.3s;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:.55rem;
      }
      .nf-btn.primary{
        background:linear-gradient(120deg,#10b981,#059669);
        color:#fff;
        box-shadow:0 8px 24px -10px rgba(16,185,129,.5);
      }
      .nf-btn.primary:hover:not(:disabled){
        filter:brightness(1.08);
        box-shadow:0 10px 30px -12px rgba(16,185,129,.6);
      }
      .nf-btn.ghost{
        background:rgba(255,255,255,.08);
        color:#d1fae5;
        border:1px solid #1e5e4c;
      }
      .nf-btn.ghost:hover{background:rgba(255,255,255,.14);}
      .nf-btn:disabled{opacity:.55;cursor:default;filter:none;box-shadow:none;}

      @media (max-width:780px){
        .nf-grid{grid-template-columns:1fr;}
        .nf-form{padding:2rem 1.5rem;}
        .nf-title{font-size:1.5rem;}
        .nf-field label{font-size:.6rem;}
        .nf-input-wrap input,
        .nf-input-wrap textarea{
          padding:0.75rem .85rem .85rem;
          font-size:.8rem;
        }
        .nf-count{right:10px;}
        [dir="rtl"] .nf-count{left:10px;}
        .nf-drop{min-height:150px;}
        .nf-preview button{width:28px;height:28px;font-size:.75rem;}
        .nf-extra-list{
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:.4rem;
        }
        .nf-extra-list figure{
          aspect-ratio:1/1;
        }
      }
    `}</style>
  );
}
