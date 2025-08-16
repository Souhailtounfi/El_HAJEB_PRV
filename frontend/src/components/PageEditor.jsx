import React, { useState, useEffect, useRef } from "react";
import { savePage, uploadBlockImage } from "../services/pages";
import { useTranslation } from "react-i18next";

const BLOCK_TYPES = [
  { key:"heading", label:"Heading" },
  { key:"text", label:"Text" },
  { key:"image", label:"Image" },
  { key:"gallery", label:"Gallery" },
  { key:"map", label:"Map" }
];

export default function PageEditor({ slug, page, onSaved }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [titleFr,setTitleFr]=useState("");
  const [titleAr,setTitleAr]=useState("");
  const [blocks,setBlocks]=useState([]);
  const [saving,setSaving]=useState(false);
  const [status,setStatus]=useState(""); // "", success, error
  const [dirty,setDirty]=useState(false);
  const [errorDetail,setErrorDetail]=useState("");

  useEffect(()=>{
    if(page){
      setTitleFr(page.title_fr||"");
      setTitleAr(page.title_ar||"");
      setBlocks(page.blocks?.map(stripRuntime) || []);
      setDirty(false);
    }
  },[page]);

  function stripRuntime(b){
    return {
      id:b.id,
      type:b.type,
      text_fr:b.text_fr||"",
      text_ar:b.text_ar||"",
      image_path:b.image_path||"",
      alt_fr:b.alt_fr||"",
      alt_ar:b.alt_ar||"",
      gallery:b.gallery||[],
      map_url:b.map_url||"",
      meta:b.meta||{}
    };
  }

  const markDirty = ()=> setDirty(true);

  const addBlock = (type)=>{
    markDirty();
    setBlocks(bs=>[...bs,{
      _temp:Date.now()+Math.random(),
      type,
      text_fr:"",
      text_ar:"",
      image_path:"",
      alt_fr:"",
      alt_ar:"",
      gallery:[],
      map_url:"",
      meta:{}
    }]);
  };

  const updateBlock = (i,p)=>{
    markDirty();
    setBlocks(bs=> bs.map((b,idx)=> idx===i ? {...b,...p}:b));
  };
  const removeBlock = i =>{
    if(!window.confirm(lang==="ar"?"حذف هذا الجزء؟":"Delete this block?")) return;
    markDirty();
    setBlocks(bs=> bs.filter((_,idx)=>idx!==i));
  };
  const move = (i,d)=>{
    markDirty();
    setBlocks(bs=>{
      const arr=[...bs];
      const ni=i+d;
      if(ni<0||ni>=arr.length) return arr;
      [arr[i],arr[ni]]=[arr[ni],arr[i]];
      return arr;
    });
  };
  const duplicate = i =>{
    markDirty();
    setBlocks(bs=>{
      const copy = JSON.parse(JSON.stringify(bs[i]));
      delete copy.id;
      copy._temp=Date.now()+Math.random();
      return [...bs.slice(0,i+1), copy, ...bs.slice(i+1)];
    });
  };

  const handleSingleUpload = async (file,i)=>{
    if(!file) return;
    markDirty();
    try{
      const path = await uploadBlockImage(file); // uploadBlockImage retournera path ET url -> adapter service
      updateBlock(i,{ image_path:path });
    }catch{ setStatus("error"); }
  };

  const handleGalleryUpload = async (files,i)=>{
    if(!files?.length) return;
    markDirty();
    try{
      for(const f of files){
        const path = await uploadBlockImage(f);
        updateBlock(i,{ gallery:[...blocks[i].gallery, path] });
      }
    }catch{ setStatus("error"); }
  };

  const normalizeMapUrl = (val) => {
    if(!val) return "";
    if(/<iframe/i.test(val)){
      const m = val.match(/src=["']([^"']+)["']/i);
      if(m) return m[1];
    }
    // remove trailing attributes if pasted full tag attributes only
    return val.split(/\swidth=|\sheight=|\sstyle=|\sallowfullscreen=|\sloading=|\sreferrerpolicy=/i)[0].trim();
  };

  const save = async ()=>{
    setSaving(true); setStatus("");
    try{
      const payload = {
        title_fr:titleFr,
        title_ar:titleAr,
        blocks: blocks.map(b=>{
          let map_url = b.map_url;
            if(b.type==="map") map_url = normalizeMapUrl(map_url);
          return {
            type:b.type,
            text_fr:b.text_fr,
            text_ar:b.text_ar,
            image_path:b.image_path,
            alt_fr:b.alt_fr,
            alt_ar:b.alt_ar,
            gallery:b.gallery,
            map_url,
            meta:b.meta
          };
        })
      };
      const saved = await savePage(slug, payload);
      onSaved && onSaved(saved);
      setStatus("success");
      setDirty(false);
    }catch(e){
      console.error("Save page error", e);
      setStatus("error");
      setErrorDetail(e?.response?.data?.error || "");
    }finally{
      setSaving(false);
      setTimeout(()=>setStatus(""), 4000);
    }
  };

  return (
    <div className="pg-editor">
      <EditorStyle />
      <div className="toolbar">
        <div className="flex gap-2 flex-wrap">
          {BLOCK_TYPES.map(bt=>(
            <button key={bt.key} type="button" onClick={()=>addBlock(bt.key)} className="tb-add">
              + {lang==="ar"? translateType(bt.key,"ar"): bt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {dirty && <span className="unsaved-dot">
            {lang==="ar"?"غير محفوظ":"Unsaved"}
          </span>}
          <button disabled={saving} onClick={save} type="button" className="save-btn">
            {saving ? (lang==="ar"?"جارٍ الحفظ...":"Enregistrement...") : (lang==="ar"?"حفظ":"Enregistrer")}
          </button>
        </div>
      </div>

      <div className="title-wrap">
        <input
          value={titleFr}
          onChange={e=>{setTitleFr(e.target.value); markDirty();}}
          placeholder="Titre FR"
          className="title-input"
        />
        <input
          dir="rtl"
          value={titleAr}
          onChange={e=>{setTitleAr(e.target.value); markDirty();}}
          placeholder="العنوان AR"
          className="title-input"
        />
      </div>

      <div className="blocks">
        {blocks.map((b,i)=>(
          <div key={b.id || b._temp} className="block">
            <div className="block-head">
              <span className="bh-type">{translateType(b.type, lang)}</span>
              <div className="flex gap-1 ml-auto">
                <Btn onClick={()=>move(i,-1)}>↑</Btn>
                <Btn onClick={()=>move(i,1)}>↓</Btn>
                <Btn onClick={()=>duplicate(i)}>⧉</Btn>
                <Btn danger onClick={()=>removeBlock(i)}>✕</Btn>
              </div>
            </div>

            {b.type==="heading" && (
              <div className="grid md:grid-cols-2 gap-4">
                <input value={b.text_fr} onChange={e=>updateBlock(i,{text_fr:e.target.value})} className="inp" placeholder="Heading FR" />
                <input dir="rtl" value={b.text_ar} onChange={e=>updateBlock(i,{text_ar:e.target.value})} className="inp" placeholder="العنوان" />
              </div>
            )}

            {b.type==="text" && (
              <div className="grid md:grid-cols-2 gap-4">
                <textarea rows={8} value={b.text_fr} onChange={e=>updateBlock(i,{text_fr:e.target.value})} className="ta" placeholder="Paragraphe / HTML FR" />
                <textarea dir="rtl" rows={8} value={b.text_ar} onChange={e=>updateBlock(i,{text_ar:e.target.value})} className="ta" placeholder="فقرة / HTML AR" />
              </div>
            )}

            {b.type==="image" && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-5 items-center">
                  <HiddenFilePicker
                    label={b.image_path ? (lang==="ar"?"تغيير الصورة":"Change Image") : (lang==="ar"?"اختر صورة":"Choose Image")}
                    onFile={file=>handleSingleUpload(file,i)}
                  />
                  {b.image_path && (
                    <img
                      src={resolveImg(b.image_path, b)}
                      alt=""
                      className="h-32 rounded-xl object-cover ring-1 ring-green-200 shadow-sm"
                    />
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input value={b.alt_fr} onChange={e=>updateBlock(i,{alt_fr:e.target.value})} placeholder="Alt FR" className="inp" />
                  <input dir="rtl" value={b.alt_ar} onChange={e=>updateBlock(i,{alt_ar:e.target.value})} placeholder="وصف الصورة" className="inp" />
                </div>
              </div>
            )}

            {b.type==="gallery" && (
              <div className="space-y-4">
                <HiddenFilePicker
                  multiple
                  label={lang==="ar"?"إضافة صور":"Add Images"}
                  onFiles={files=>handleGalleryUpload(files,i)}
                />
                {b.gallery.length===0 && <p className="text-[11px] text-gray-500">{lang==="ar"?"لا صور بعد":"Aucune image"}</p>}
                {b.gallery.length>0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {b.gallery.map((p,gi)=>(
                      <div key={gi} className="relative group">
                        <img src={resolveImg(p)} alt="" className="h-24 w-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={()=>{
                            markDirty();
                            updateBlock(i,{ gallery: b.gallery.filter((_,x)=>x!==gi) });
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {b.type==="map" && (
              <div className="space-y-3">
                <input
                  value={b.map_url}
                  onChange={e=>updateBlock(i,{map_url: normalizeMapUrl(e.target.value)})
                  }
                  placeholder="Google Maps Embed URL (src)"
                  className="inp"
                />
                {b.map_url && (
                  <div className="rounded-xl overflow-hidden ring-1 ring-green-200">
                    <iframe title="Map" src={b.map_url} className="w-full h-64 border-0" loading="lazy" allowFullScreen />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {blocks.length===0 && (
          <p className="text-xs text-gray-500">
            {lang==="ar"?"أضف كتلة للبدء":"Ajoutez un bloc pour commencer."}
          </p>
        )}
      </div>

      {status==="success" && <div className="mt-5 text-xs font-semibold text-green-700">{lang==="ar"?"تم الحفظ":"Enregistré"}</div>}
      {status==="error" && <div className="mt-5 text-xs font-semibold text-red-600">{lang==="ar"?"خطأ أثناء الحفظ":"Erreur d’enregistrement"}</div>}
      {status==="error" && errorDetail && (
        <div className="mt-1 text-[10px] text-red-500">{errorDetail}</div>
      )}
    </div>
  );
}

function HiddenFilePicker({ label, onFile, onFiles, multiple=false }) {
  const inputRef = useRef(null);
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        multiple={multiple}
        onChange={e=>{
          const files = Array.from(e.target.files||[]);
          if(multiple){
            onFiles && onFiles(files);
          } else {
            onFile && onFile(files[0]);
          }
          // reset to allow same file re-select
          e.target.value="";
        }}
      />
      <button
        type="button"
        onClick={()=>inputRef.current?.click()}
        className="choose-btn"
      >
        {label}
      </button>
    </div>
  );
}

function Btn({children,onClick,danger}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-7 w-7 rounded-md text-xs font-bold ${
        danger ? "bg-red-600 text-white hover:bg-red-500"
               : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
    >{children}</button>
  );
}

function translateType(type, lang){
  const map = {
    heading:{ fr:"Titre", ar:"عنوان" },
    text:{ fr:"Texte", ar:"نص" },
    image:{ fr:"Image", ar:"صورة" },
    gallery:{ fr:"Galerie", ar:"معرض" },
    map:{ fr:"Carte", ar:"خريطة" }
  };
  return map[type]?.[lang.startsWith("ar")?"ar":"fr"] || type;
}

function resolveImg(p, block){
  if(block?.full_image_url) return block.full_image_url;
  if(!p) return "";
  if(/^https?:/i.test(p)) return p;
  const base = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/api$/,'').replace(/\/+$/,'');
  return `${base}/storage/${p.replace(/^storage\//,'')}`;
}

function EditorStyle(){
  return (
    <style>{`
      .pg-editor{
        background:#ffffffcc;
        backdrop-filter:blur(10px);
        border:1px solid #10b98133;
        padding:1.7rem 1.4rem 2.1rem;
        border-radius:1.5rem;
        position:relative;
      }
      .toolbar{display:flex;gap:1rem;align-items:center;margin-bottom:1.2rem;flex-wrap:wrap;}
      .tb-add{
        background:#ecfdf5;
        border:1px solid #10b98133;
        color:#047857;
        font-size:.65rem;
        font-weight:600;
        padding:.55rem .9rem;
        border-radius:1rem;
        transition:.25s;
      }
      .tb-add:hover{background:#d1fae5;}
      .save-btn{
        background:linear-gradient(90deg,#059669,#10b981);
        color:#fff;font-size:.65rem;font-weight:700;
        padding:.7rem 1.4rem;border-radius:1rem;
        box-shadow:0 4px 14px -6px rgba(16,185,129,.4);
      }
      .save-btn:disabled{opacity:.6;}
      .unsaved-dot{
        background:#fef3c7;
        color:#92400e;
        font-size:.55rem;
        font-weight:700;
        padding:.4rem .7rem;
        border-radius:1rem;
        letter-spacing:.06em;
        box-shadow:0 0 0 1px #fcd34d inset;
      }
      .title-wrap{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-bottom:1.2rem;}
      .title-input{
        border:1px solid #10b98133;
        background:#f8fffc;
        border-radius:1rem;
        padding:.7rem 1rem;
        font-size:.8rem;
        font-weight:600;
      }
      .blocks{display:flex;flex-direction:column;gap:1rem;}
      .block{
        background:#fff;
        border:1px solid #10b98126;
        border-radius:1.25rem;
        padding:1rem 1rem 1.4rem;
        box-shadow:0 4px 14px -8px rgba(0,0,0,.07);
      }
      .block-head{display:flex;align-items:center;margin-bottom:.8rem;}
      .bh-type{
        font-size:.55rem;
        font-weight:700;
        letter-spacing:.07em;
        background:#065f46;
        color:#fff;
        padding:.35rem .6rem;
        border-radius:.7rem;
      }
      .inp{
        width:100%;
        border:1px solid #10b98133;
        background:#f8fffc;
        border-radius:1rem;
        padding:.65rem .9rem;
        font-size:.75rem;
      }
      .ta{
        width:100%;border:1px solid #10b98133;background:#f8fffc;
        border-radius:1rem;padding:.75rem .9rem;font-size:.75rem;
        line-height:1.5;resize:vertical;
      }
      .inp:focus,.ta:focus{outline:none;box-shadow:0 0 0 2px #10b98133;}
      .choose-btn{
        background:#10b981;
        color:#fff;
        font-size:.6rem;
        font-weight:700;
        padding:.6rem 1.05rem;
        border-radius:1rem;
        letter-spacing:.05em;
        box-shadow:0 4px 14px -6px rgba(0,0,0,.25);
        transition:.25s;
      }
      .choose-btn:hover{filter:brightness(1.07);}
    `}</style>
  );
}