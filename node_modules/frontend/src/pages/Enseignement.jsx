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
.ens-wrap {
  background: #fff;
  color: #181818;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  max-width: 1500px;
  margin-inline: auto;
  padding: 1.2rem 1.2rem 3rem;
  position: relative;
}
.ens-hero {
  display: grid;
  gap: 1.6rem;
  align-items: center;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 8px 32px -12px rgba(0,0,0,.08);
  padding: 2.2rem 1.5rem 1.5rem;
  margin: 0 0 2.8rem;
  position: relative;
  overflow: hidden;
  color: #0d47a1;
}
@media (min-width:960px){.ens-hero{grid-template-columns:repeat(2,1fr);} }
.ens-title {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: .05em;
  color: #0d47a1;
  filter: none;
}
.ens-tag {
  margin: .85rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: .11em;
  text-transform: uppercase;
  color: #1976d2;
  opacity: .95;
}
.ens-figure {
  margin: 0;
  max-width: 640px;
  justify-self: center;
}
.ens-figure img {
  width: 100%;
  border-radius: 1.2rem;
  object-fit: cover;
  box-shadow: 0 8px 32px -12px rgba(0,0,0,.10);
}
.ens-figure figcaption {
  text-align: center;
  margin-top: .6rem;
  font-size: .82rem;
  font-weight: 600;
  letter-spacing: .05em;
  text-decoration: underline;
  opacity: .9;
  color: #1976d2;
}
.bg-orb { display: none; }

/* MAIN */
.ens-main { display: grid; gap: 2.4rem; }
.ens-section {
  background: #fff;
  border-radius: 1.8rem;
  padding: 1.9rem 1.7rem 2.1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 18px -8px rgba(0,0,0,.07);
  color: #181818;
}
.sec-title {
  margin: 0 0 1.4rem;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: .05em;
  color: #0d47a1;
  text-shadow: none;
}
.lead-list {
  margin: 0 0 1.4rem;
  padding-${dir==='rtl'?'right':'left'}: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: .6rem;
  font-size: .98rem;
  font-weight: 500;
  color: #1976d2;
}
.lead-list li { position: relative; }
.lead-list li:before {
  content: "";
  position: absolute;
  ${dir==='rtl'?'right':'left'}: -1rem;
  top: .5rem;
  width: .55rem;
  height: .55rem;
  border-radius: 50%;
  background: linear-gradient(145deg,#42a5f5,#1976d2,#0d9488);
  box-shadow: 0 0 0 2px #fff inset,0 0 0 1px #0d948855;
}
.levels { display: flex; flex-wrap: wrap; gap: 1.1rem; }
.lvl-card {
  flex: 1 1 240px;
  min-width: 230px;
  position: relative;
  padding: 1rem 1rem 1.1rem;
  border: 1px solid #0d948833;
  border-radius: 1.1rem;
  background: #f8fafc;
  box-shadow: 0 4px 18px -8px rgba(0,0,0,.07);
  display: flex;
  flex-direction: column;
  gap: .65rem;
  color: #0d47a1;
}
.lvl-card h3 {
  margin: 0;
  font-size: .98rem;
  font-weight: 800;
  letter-spacing: .05em;
  color: #1976d2;
}
.lvl-card ul {
  margin: 0;
  padding-${dir==='rtl'?'right':'left'}: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: .45rem;
  font-size: .92rem;
}
.lvl-card ul li { position: relative; }
.lvl-card ul li:before {
  content: "";
  position: absolute;
  ${dir==='rtl'?'right':'left'}: -.85rem;
  top: .4rem;
  width: .45rem;
  height: .45rem;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 0 1px #fff inset;
}

/* DATA PANELS */
.ens-panel {
  background: #fff;
  border: 1px solid #0d94882b;
  border-radius: 1.7rem;
  padding: 1.6rem 1.4rem 1.9rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 18px -8px rgba(0,0,0,.07);
  color: #181818;
}
.ens-panel+.ens-panel { margin-top: -.4rem; }
.panel-head {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: .06em;
  color: #0d9488;
  position: relative;
  padding-${dir==='rtl'?'right':'left'}: 1rem;
}
.panel-head:before {
  content: "";
  position: absolute;
  ${dir==='rtl'?'right':'left'}: 0;
  top: .35rem;
  width: .55rem;
  height: .55rem;
  border-radius: 4px;
  background: linear-gradient(140deg,#0d9488,#10b981,#42a5f5);
  box-shadow: 0 0 0 3px #fff;
}
.table-shell {
  overflow: auto;
  border: 1px solid #0d948828;
  border-radius: 1.1rem;
  background: #fff;
  box-shadow: 0 2px 8px -4px rgba(0,0,0,.06);
}
.table-shell.single { max-width: 760px; margin-inline: auto; }
.ens-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 520px;
  font-size: .95rem;
  table-layout: fixed;
  color: #181818;
}
.ens-table th, .ens-table td {
  padding: .6rem .7rem;
  border: 1px solid #0d948822;
  text-align: center;
}
.ens-table thead th {
  background: #e3f2fd;
  color: #0d47a1;
  font-weight: 700;
  letter-spacing: .05em;
}
.ens-table tbody th {
  background: #f8fafc;
  color: #1976d2;
  font-weight: 700;
}
.ens-table tbody tr:nth-child(even) td { background: #f8fafc; }
.ens-table tbody tr:hover td, .ens-table tbody tr:hover th {
  background: #ecfdf5;
  color: #0d47a1;
}
.ens-foot {
  text-align: center;
  margin-top: 1.6rem;
  font-size: .8rem;
  font-weight: 600;
  letter-spacing: .06em;
  background: #ecfdf5;
  padding: .75rem 1.05rem;
  border: 1px solid #0d948822;
  border-radius: 1rem;
  color: #0d47a1;
}
@media (max-width:860px){
  .ens-hero{grid-template-columns:1fr;padding:1.6rem 1.1rem 2.2rem;}
  .levels{flex-direction:column;}
  .lvl-card{min-width:unset;}
  .ens-title{font-size:1.7rem;}
  .ens-table{font-size:.7rem;min-width:480px;}
}
`}</style>;}
