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
      <div ref={shellRef} className="nt-green-shell nt-loading">
        <TickerGreenStyle />
        <div className="nt-green-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="nt-green-skel" />
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) return null;

  const loop = items.concat(items);

  return (
    <div ref={shellRef} className="nt-green-shell">
      <TickerGreenStyle />
      <div className="nt-green-viewport" aria-label={lang === "ar" ? "شريط الأخبار" : "Fil d’actualités"}>
        <div className="nt-green-move">
          {loop.map((n, i) => (
            <Link
              key={n.id + "-" + i}
              to={`/news/${n.id}`}
              className="nt-green-item"
              title={n.t}
            >
              <span className="nt-green-date">
                {n.d
                  ? new Date(n.d).toLocaleDateString(
                      lang === "ar" ? "ar-MA" : "fr-FR",
                      { day: "2-digit", month: "2-digit" }
                    )
                  : "--"}
              </span>
              <span className="nt-green-title">{n.t}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function TickerGreenStyle() {
  return (
    <style>{`
      .nt-green-shell {
        position: relative;
        height: 44px;
        background: linear-gradient(90deg, #e8f7f1 0%, #e6f4ea 100%);
        border-bottom: 1px solid #b7e4c7;
        overflow: hidden;
        padding: 0 .65rem;
        font-family: inherit;
        box-shadow: 0 2px 8px 0 rgba(60,120,80,0.04);
        z-index: 40;
        display: flex;
        align-items: center;
      }
      .nt-green-loading { display: flex; align-items: center; }
      .nt-green-track { display: flex; gap: .55rem; }
      .nt-green-skel {
        width: 38px; height: 38px; border-radius: 12px;
        background: linear-gradient(90deg, #d2f4e3 0%, #b7e4c7 100%);
        background-size: 200% 100%;
        animation: ntGreenShimmer 2.1s ease-in-out infinite;
      }
      @keyframes ntGreenShimmer {
        0% { background-position: 0 0; }
        50% { background-position: 120% 0; }
        100% { background-position: 0 0; }
      }

      .nt-green-viewport {
        position: relative;
        width: 100%; height: 100%;
        mask: linear-gradient(90deg, transparent 0 2%, #000 10% 90%, transparent 98% 100%);
        -webkit-mask: linear-gradient(90deg, transparent 0 2%, #000 10% 90%, transparent 98% 100%);
      }
      .nt-green-move {
        position: absolute; top: 50%; left: 0;
        display: flex;
        gap: .65rem;
        transform: translateY(-50%);
        animation: ntGreenLoop 38s linear infinite;
        will-change: transform;
      }
      .nt-green-viewport:hover .nt-green-move { animation-play-state: paused; }
      @keyframes ntGreenLoop {
        0% { transform: translateX(0) translateY(-50%); }
        100% { transform: translateX(-50%) translateY(-50%); }
      }

      .nt-green-item {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        max-width: 220px;
        padding: .45rem .9rem;
        border-radius: 18px;
        text-decoration: none;
        background: rgba(255,255,255,0.85);
        border: 1px solid #b7e4c7;
        color: #247a4d;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .18px;
        line-height: 1.1;
        position: relative;
        box-shadow: 0 1px 4px 0 rgba(60,120,80,0.06);
        transition: background .35s, border-color .35s, transform .35s, color .35s;
      }
      .nt-green-item:before {
        content: "";
        position: absolute; inset: 0;
        background: linear-gradient(110deg,rgba(60,180,120,0.08),transparent 60%);
        opacity: 0;
        border-radius: inherit;
        transition: .5s;
        pointer-events: none;
      }
      .nt-green-item:hover {
        background: #d2f4e3;
        border-color: #95d5b2;
        color: #155c36;
        transform: translateY(-2px) scale(1.03);
      }
      .nt-green-item:hover:before { opacity: .35; }

      .nt-green-date {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: #40916c;
        background: #e9fbe5;
        padding: .28rem .5rem;
        border-radius: 10px;
        line-height: 1;
        margin-right: 2px;
      }
      .nt-green-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #247a4d;
        max-width: 140px;
        font-weight: 500;
      }

      @media (max-width:640px) {
        .nt-green-shell { height: 40px; padding: 0 .35rem; }
        .nt-green-item { max-width: 140px; padding: .4rem .7rem; font-size: 10.5px; }
        .nt-green-title { max-width: 80px; }
      }
    `}</style>
  );
}