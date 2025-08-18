import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fallbackImg from '../assets/ens.png';

export default function Enseignement(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr?'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'Enseignement',
    heroTag:'Education & Formation 2024 / 2025',
    imgCaption:"Délégation de l'Éducation",
    natTitle:'Education nationale au titre de l’année 2024 / 2025',
    natIntro:[
      "Enseignement public au titre de l’année scolaire 2024 / 2025",
      "Total des élèves: 59 808 dont 28 804 filles"
    ],
    primary:{title:'Enseignement primaire', stats:['Nombre d’établissements: 75','Nombre d’élèves: 34 506 dont 16 586 filles']},
    college:{title:'Enseignement collégial', stats:["Nombre d’établissements: 18","Nombre d’élèves: 16 787 dont 7 738 filles"]},
    qualif:{title:'Enseignement qualifiant', stats:["Nombre d’établissements: 11","Nombre d’élèves: 8 515 dont 4 480 filles"]},
    bursaryTitle:'Bourses enseignement supérieur',
    bursaryHead:['Année Universitaire','Nbr de dossiers déposés','Nombre de bourses accordées'],
    bursaryRows:[['2023 / 2024','1607','1394 (86,74%)'],['2024 / 2025','1571','1460 (92,93%)']],
    boardingTitle:'Internats & Écoles communautaires',
    boardingHead:['Internats (12) CAPACITÉ','Internats (12) BÉNÉFICIAIRES','Écoles communautaires (03) CAPACITÉ','Écoles communautaires (03) BÉNÉFICIAIRES'],
    boardingRow:['1812','1597','240','240'],
    literacyTitle:"Programme de lutte contre l’analphabétisme (2024 / 2025)",
    literacyHead:['Programme','Nbr de bénéficiaires','Associations chargées'],
    literacyRows:[['Lutte contre l’analphabétisme','1042','06'],["Éducation non formelle","445","06"]],
    foot:'Sources: Délégation Provinciale (2024/2025)'
  };
  const ar = {
    title:'التعليم',
    heroTag:'التربية و التكوين 2025/2024',
    imgCaption:'مديرية التعليم',
    natTitle:'التربية الوطنية برسم الموسم 2025/2024',
    natIntro:['التعليم العمومي للموسم الدراسي 2025/2024','مجموع التلاميذ 59808 منهم 28804 فتاة'],
    primary:{title:'التعليم الابتدائي', stats:['عدد المؤسسات: 75','عدد التلاميذ: 34506 منهم 16586 فتاة']},
    college:{title:'التعليم الإعدادي', stats:['عدد المؤسسات: 18','عدد التلاميذ: 16787 منهم 7738 فتاة']},
    qualif:{title:'التعليم التأهيلي', stats:['عدد المؤسسات: 11','عدد التلاميذ: 8515 منهم 4480 فتاة']},
    bursaryTitle:'منح التعليم العالي',
    bursaryHead:['السنة الجامعية','عدد الملفات المودعة','عدد المنح الممنوحة'],
    bursaryRows:[['2024 / 2023','1607','1394 (86,74%)'],['2025 / 2024','1571','1460 (92,93%)']],
    boardingTitle:'الداخليات و المدارس الجماعاتية',
    boardingHead:['الداخليات (12) الطاقة','الداخليات (12) المستفيدون','المدارس الجماعاتية (03) الطاقة','المدارس الجماعاتية (03) المستفيدون'],
    boardingRow:['1812','1597','240','240'],
    literacyTitle:'برنامج محو الأمية (2025/2024)',
    literacyHead:['البرنامج','عدد المستفيدين','الجمعيات المشرفة'],
    literacyRows:[['محاربة الأمية','1042','06'],['التعليم غير النظامي','445','06']],
    foot:'المصدر: المديرية الإقليمية (2025/2024)'
  };
  const t = isAr? ar: fr;

  return (
    <div className="ens-wrap" dir={dir}>
      <EnsStyle dir={dir} />
      <header className="ens-hero">
        <div className="ens-text">
          <h1 className="ens-title">{t.title}</h1>
          <p className="ens-tag">{t.heroTag}</p>
        </div>
        <figure className="ens-figure">
          <img src={fallbackImg} alt={t.imgCaption} />
          <figcaption>{t.imgCaption}</figcaption>
        </figure>
        <div className="bg-orb a"/><div className="bg-orb b"/><div className="bg-orb c"/>
      </header>

      <main className="ens-main">
        <Section title={t.natTitle}>
          <ul className="lead-list">{t.natIntro.map(x=> <li key={x}>{x}</li>)}</ul>
          <div className="levels">
            {[t.primary,t.college,t.qualif].map(block=> (
              <div key={block.title} className="lvl-card">
                <h3>{block.title}</h3>
                <ul>{block.stats.map(s=> <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <DataPanel title={t.bursaryTitle} head={t.bursaryHead} rows={t.bursaryRows} />
        <DataPanel title={t.boardingTitle} head={t.boardingHead} rows={[t.boardingRow]} single />
        <DataPanel title={t.literacyTitle} head={t.literacyHead} rows={t.literacyRows} />

        <footer className="ens-foot">{t.foot}</footer>
      </main>
    </div>
  );
}

function Section({title, children}){return (
  <section className="ens-section">
    <h2 className="sec-title">{title}</h2>
    {children}
  </section>
);} 

function DataPanel({title, head, rows, single}){
  return (
    <section className="ens-panel">
      <h3 className="panel-head">{title}</h3>
      <div className={`table-shell ${single? 'single':''}`}> 
        <table className="ens-table">
          <thead>
            <tr>{head.map(h=> <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r,i)=> <tr key={i}>{r.map((c,j)=> j===0? <th key={j}>{c}</th>: <td key={j}>{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EnsStyle({dir}){return <style>{`
.ens-wrap{--c1:#0d47a1;--c2:#1976d2;--c3:#42a5f5;--c4:#10b981;--c5:#0d9488;--glass:linear-gradient(135deg,rgba(255,255,255,.92),rgba(236,253,245,.75));max-width:1500px;margin-inline:auto;padding:clamp(.9rem,2.2vw,2.6rem) clamp(1rem,3vw,3.4rem) 4rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f395e;position:relative;}
.ens-wrap:before{content:"";position:fixed;inset:0;background:radial-gradient(circle at 15% 25%,rgba(25,118,210,.25),transparent 60%),radial-gradient(circle at 85% 70%,rgba(13,148,136,.28),transparent 65%),linear-gradient(120deg,#0a2540,#042f2e);z-index:-3;}
.ens-wrap:after{content:"";position:fixed;inset:0;background:repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0 12px,transparent 12px 24px);mix-blend-mode:overlay;pointer-events:none;z-index:-2;}
.ens-hero{display:grid;gap:1.6rem;align-items:center;border:1px solid #ffffff55;border-radius:2rem;padding:clamp(1.4rem,2.6vw,2.8rem) clamp(1.2rem,2.6vw,2.9rem);margin:0 0 2.8rem;position:relative;overflow:hidden;background:linear-gradient(120deg,#0d47a1,#1976d2 40%,#42a5f5 60%,#0d9488);box-shadow:0 28px 65px -28px rgba(0,0,0,.55);color:#ecf6ff;}
@media (min-width:960px){.ens-hero{grid-template-columns:repeat(2,1fr);} }
.bg-orb{position:absolute;border-radius:50%;filter:blur(45px) brightness(1.1);opacity:.55;mix-blend-mode:screen;animation:float 14s linear infinite;}
.bg-orb.a{width:430px;height:430px;top:-160px;${dir==='rtl'?'left':'right'}:-130px;background:radial-gradient(circle at 30% 40%,#42a5f5,#1976d2 70%);} 
.bg-orb.b{width:310px;height:310px;bottom:-140px;${dir==='rtl'?'right':'left'}:-100px;background:radial-gradient(circle at 60% 60%,#10b981,#0d9488 70%);animation-direction:reverse;} 
.bg-orb.c{width:200px;height:200px;top:45%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle at 50% 50%,#ffffff,#e0f2fe 70%);animation-duration:18s;}
@keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-35px)}100%{transform:translateY(0)}}
.ens-title{margin:0;font-size:clamp(1.9rem,4.8vw,3.5rem);font-weight:800;letter-spacing:.05em;background:linear-gradient(100deg,#ffffff,#dbeafe 35%,#bae6fd);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 8px 20px rgba(0,0,0,.48));}
.ens-tag{margin:.85rem 0 0;font-size:clamp(.7rem,1.15vw,.95rem);font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:#e0f2fe;opacity:.9;}
.ens-figure{margin:0;max-width:640px;justify-self:center;}
.ens-figure img{width:100%;border-radius:1.2rem;object-fit:cover;box-shadow:0 25px 55px -25px rgba(0,0,0,.55);}
.ens-figure figcaption{text-align:center;margin-top:.55rem;font-size:.6rem;font-weight:600;letter-spacing:.05em;text-decoration:underline;}

/* MAIN */
.ens-main{display:grid;gap:2.4rem;}
.ens-section{background:var(--glass);backdrop-filter:blur(28px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);border:1px solid #ffffff80;border-radius:1.8rem;padding:1.9rem 1.7rem 2.1rem;position:relative;overflow:hidden;box-shadow:0 22px 55px -28px rgba(0,0,0,.45);} 
.ens-section:before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.7),transparent 60%);mix-blend-mode:overlay;pointer-events:none;}
.sec-title{margin:0 0 1.4rem;font-size:clamp(1.05rem,2.2vw,1.75rem);font-weight:800;letter-spacing:.05em;color:#0d47a1;text-shadow:0 2px 8px rgba(0,0,0,.25);} 
.lead-list{margin:0 0 1.4rem;padding-${dir==='rtl'?'right':'left'}:1.2rem;display:flex;flex-direction:column;gap:.55rem;font-size:.74rem;font-weight:500;}
.lead-list li{position:relative;}
.lead-list li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-1rem;top:.5rem;width:.55rem;height:.55rem;border-radius:50%;background:linear-gradient(145deg,#42a5f5,#1976d2,#0d9488);box-shadow:0 0 0 2px #fff inset,0 0 0 1px #0d948855;}
.levels{display:flex;flex-wrap:wrap;gap:1.1rem;}
.lvl-card{flex:1 1 240px;min-width:230px;position:relative;padding:1rem 1rem 1.1rem;border:1px solid #0d948833;border-radius:1.1rem;background:linear-gradient(150deg,#ffffffcc,#f0faff80 60%,#ecfdf5cc);box-shadow:0 12px 30px -18px rgba(0,0,0,.28);display:flex;flex-direction:column;gap:.65rem;}
.lvl-card h3{margin:0;font-size:.78rem;font-weight:800;letter-spacing:.05em;color:#0d47a1;}
.lvl-card ul{margin:0;padding-${dir==='rtl'?'right':'left'}:1.1rem;display:flex;flex-direction:column;gap:.4rem;font-size:.62rem;}
.lvl-card ul li{position:relative;}
.lvl-card ul li:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:-.85rem;top:.4rem;width:.45rem;height:.45rem;border-radius:50%;background:#0d9488;box-shadow:0 0 0 1px #fff inset;}

/* DATA PANELS */
.ens-panel{background:linear-gradient(135deg,#ffffffee,#eef9ffdd);border:1px solid #0d94882b;border-radius:1.7rem;padding:1.6rem 1.4rem 1.9rem;position:relative;overflow:hidden;box-shadow:0 18px 44px -24px rgba(0,0,0,.4);} 
.ens-panel+.ens-panel{margin-top:-.4rem;}
.panel-head{margin:0 0 1rem;font-size:clamp(.85rem,1.2vw,1.05rem);font-weight:800;letter-spacing:.06em;color:#0d9488;position:relative;padding-${dir==='rtl'?'right':'left'}:1rem;}
.panel-head:before{content:"";position:absolute;${dir==='rtl'?'right':'left'}:0;top:.35rem;width:.55rem;height:.55rem;border-radius:4px;background:linear-gradient(140deg,#0d9488,#10b981,#42a5f5);box-shadow:0 0 0 3px #fff;}
.table-shell{overflow:auto;border:1px solid #0d948828;border-radius:1.1rem;background:#ffffff;box-shadow:0 10px 34px -18px rgba(0,0,0,.25);} 
.table-shell.single{max-width:760px;margin-inline:auto;}
.ens-table{width:100%;border-collapse:separate;border-spacing:0;min-width:520px;font-size:.63rem;table-layout:fixed;}
.ens-table th,.ens-table td{padding:.6rem .7rem;border:1px solid #0d948822;text-align:center;}
.ens-table thead th{background:linear-gradient(120deg,#0d47a1,#1976d2);color:#fff;font-weight:700;letter-spacing:.05em;}
.ens-table tbody th{background:#e3f2fd;font-weight:700;}
.ens-table tbody tr:nth-child(even) td{background:#f1fbff;}
.ens-table tbody tr:hover td,.ens-table tbody tr:hover th{background:#ecfdf5;color:#0d47a1;}

.ens-foot{text-align:center;margin-top:1.6rem;font-size:.55rem;font-weight:600;letter-spacing:.05em;background:#ecfdf5;padding:.7rem 1rem;border:1px solid #0d948822;border-radius:1rem;color:#0d47a1;}

@media (max-width:860px){
  .ens-hero{grid-template-columns:1fr;padding:1.6rem 1.1rem 2.2rem;}
  .levels{flex-direction:column;}
  .lvl-card{min-width:unset;}
  .ens-title{font-size:clamp(1.7rem,7vw,2.7rem);}
  .ens-table{font-size:.6rem;min-width:480px;}
}
@media (prefers-color-scheme: dark){
  .ens-section{background:linear-gradient(135deg,#ffffffdd,#e1f5f9cc);} 
  .ens-panel{background:linear-gradient(135deg,#1b2832,#12302d);color:#f1f5f9;}
  .ens-table tbody th{background:#0d47a1;color:#fff;}
  .ens-table tbody tr:nth-child(even) td{background:#12302d;}
  .ens-table tbody tr:nth-child(odd) td{background:#162c34;}
  .ens-table tbody tr:hover td, .ens-table tbody tr:hover th{background:#0d9488;color:#ffffff;}
  .ens-foot{background:#102a29;color:#e0f2fe;}
}
`}</style>;}
