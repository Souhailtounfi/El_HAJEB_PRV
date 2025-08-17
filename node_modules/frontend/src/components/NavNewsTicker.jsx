import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

/**
 * Subtle important news ticker (muted blue→red emphasis).
 */
export default function NavNewsTicker({ lang = "fr" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const shellRef = useRef(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const r = await api.get("/news");
        if (!active) return;
        const latest = (r.data || [])
          .slice(-20)
          .reverse()
          .map(n => ({
            id: n.id,
            t: lang === "ar" ? (n.title_ar || n.title_fr) : n.title_fr,
            d: n.created_at
          }));
        setItems(latest);
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) {
          setLoading(false);
          setTimeout(
            () => window.dispatchEvent(new CustomEvent("navTickerResize")),
            30
          );
        }
      }
    })();
    return () => { active = false; };
  }, [lang]);

  if (loading) {
    return (
      <div ref={shellRef} className="nt-shell nt-loading">
        <TickerStyle />
        <div className="nt-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="nt-skel" />
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) return null;

  const loop = items.concat(items);

  return (
    <div ref={shellRef} className="nt-shell">
      <TickerStyle />
      <div className="nt-viewport" aria-label={lang === "ar" ? "شريط الأخبار" : "Fil d’actualités"}>
        <div className="nt-move">
          {loop.map((n, i) => (
            <Link
              key={n.id + "-" + i}
              to={`/news/${n.id}`}
              className="nt-item"
              title={n.t}
            >
              <span className="nt-date">
                {n.d
                  ? new Date(n.d).toLocaleDateString(
                      lang === "ar" ? "ar-MA" : "fr-FR",
                      { day: "2-digit", month: "2-digit" }
                    )
                  : "--"}
              </span>
              <span className="nt-title">{n.t}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function TickerStyle() {
  return (
    <style>{`
      /* Shell: muted deep navy to muted oxblood with a soft overlay */
      .nt-shell{
        position:relative;
        height:46px;
        background:
          linear-gradient(90deg,#1d2935,#25354a 45%,#402a2e 70%,#4a2a2e);
        backdrop-filter:blur(8px) saturate(140%);
        border-bottom:1px solid rgba(255,255,255,0.04);
        overflow:hidden;
        padding:0 .65rem;
        font-family:inherit;
      }
      .nt-loading{display:flex;align-items:center;}
      .nt-track{display:flex;gap:.55rem;}
      .nt-skel{
        width:40px;height:40px;border-radius:14px;
        background:linear-gradient(90deg,#293944,#324653,#293944);
        background-size:200% 100%;
        animation:ntShimmer 2.1s ease-in-out infinite;
      }
      @keyframes ntShimmer{
        0%{background-position:0 0;}
        50%{background-position:120% 0;}
        100%{background-position:0 0;}
      }

      .nt-viewport{
        position:relative;
        width:100%;height:100%;
        mask:linear-gradient(90deg,transparent 0 2%,#000 10% 90%,transparent 98% 100%);
        -webkit-mask:linear-gradient(90deg,transparent 0 2%,#000 10% 90%,transparent 98% 100%);
      }
      .nt-move{
        position:absolute;top:50%;left:0;
        display:flex;
        gap:.65rem;
        transform:translateY(-50%);
        animation:ntLoop 44s linear infinite;
        will-change:transform;
      }
      .nt-viewport:hover .nt-move{animation-play-state:paused;}
      @keyframes ntLoop{
        0%{transform:translateX(0) translateY(-50%);}
        100%{transform:translateX(-50%) translateY(-50%);}
      }

      /* Item: subtle pill with soft gradient blue->red, low contrast borders */
      .nt-item{
        flex:0 0 auto;
        display:inline-flex;
        align-items:center;
        gap:.55rem;
        max-width:230px;
        padding:.48rem .85rem;
        border-radius:20px;
        text-decoration:none;
        background:linear-gradient(120deg,#2c4254 0%,#334c60 38%,#4a3940 72%,#543e41 100%);
        border:1px solid rgba(255,255,255,0.08);
        color:#f1f5f4;
        font-size:11px;
        font-weight:600;
        letter-spacing:.25px;
        line-height:1.05;
        position:relative;
        backdrop-filter:blur(3px);
        transition:background .45s,border-color .45s,transform .45s;
      }
      .nt-item:before{
        content:"";
        position:absolute;inset:0;
        background:linear-gradient(110deg,rgba(255,255,255,0.22),transparent 60%);
        opacity:0;
        border-radius:inherit;
        transition:.5s;
        pointer-events:none;
      }
      .nt-item:hover{
        background:linear-gradient(120deg,#36576b 0%,#3f5f73 40%,#61484c 75%,#684d50 100%);
        border-color:rgba(255,255,255,0.14);
        transform:translateY(-2px);
      }
      .nt-item:hover:before{opacity:.55;}

      .nt-date{
        font-size:9px;
        font-weight:700;
        letter-spacing:.15em;
        text-transform:uppercase;
        color:#b3e4d3;
        background:rgba(255,255,255,0.05);
        padding:.3rem .55rem;
        border-radius:12px;
        line-height:1;
      }
      .nt-title{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        color:#e8f7f1;
        max-width:150px;
        font-weight:500;
      }

      @media (max-width:640px){
        .nt-shell{height:42px;padding:0 .45rem;}
        .nt-item{max-width:200px;padding:.5rem .8rem;font-size:10px;}
        .nt-title{max-width:120px;}
      }
    `}</style>
  );
}