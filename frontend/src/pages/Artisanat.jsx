import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import art1 from '../assets/art1.png';
import art2 from '../assets/art2.png';

/* Page Artisanat
*/

export default function Artisanat(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'ARTISANAT',
    p1:"L'artisanat a toujours conjugué progrès et développement et témoigne de l'évolution et de la créativité de l'homme. L'artisanat pourrait être un des facteurs de développement les plus importants dans la région. Le secteur artisanal à EL HAJEB se porte plus au moins bien et certaines branches tel l'artisanat de service sont en plein essor. Toutefois d'autres secteurs sont moins bien représentés tel celui du bois ou des métaux la terre. Néanmoins des spécificités féminines et masculines sont à distinguer.",
    p2:"En plus des travaux culinaires et l'élevage, la femme réalise des tissages aussi bien le tapis que les vêtements « HANBEL, HAYAK, DJELLABA ». L'artisanat lié à l'activité agricole à savoir le bissac pour le transport des céréales. L'artisanat féminin en général est destiné à la consommation familiale et subsidiairement à la commercialisation lors des fêtes et MOUSSEMS.",
    p3:"La répartition des artisans par branche d'activité fait apparaître que le textile occupe plus 789 artisans suivi des travaux de construction avec 741. La répartition reprise par le tableau ci-dessous souligne la faiblesse du travail du bois malgré la vocation forestière de Province. Cependant la province compte 2704 artisans, soit 9,55 % des effectifs de la région.",
    tableCols:['SECTEUR D\'ACTIVITÉ','NOMBRE D\'ARTISANS'],
    tableRows:[['Bois','287'],['Textile','789'],['Métaux','218'],['Cuir','72'],['Services','597'],['Travaux de construction','741']],
    tableTotal:['TOTAL','2704'],
    caption:"Division des affaires économiques et de la coordination de la Province d'EL HAJEB",
    p4:"N.B : un bâtiment en R+1 comprenant au R.D.C : 6 ateliers, salle d'exposition, café, crèche, espace de vente, bloc sanitaire et parking et à l'étage : 4 ateliers, salle d'exposition salle de formation, bureau, salle de réception salle des réunions, salle de prière, débarras et bloc sanitaire est en cours de construction à la ville d'El Hajeb (travaux de finitions) constituera un espace adéquat pour les artisans.",
  };

  const ar = {
    title:'الصناعة التقليدية',
    p1:'لطالما جمعت الصناعة التقليدية بين التقدم والتطور وهي شهادة على إبداع الإنسان. ويمكن أن تشكل عاملاً مهماً في تنمية الإقليم. يعرف القطاع التقليدي بالحاجب حيوية في بعض الفروع خاصة خدمات الصناعة التقليدية بينما تبقى فروع أخرى أقل تمثيلاً مثل الخشب والمعادن. هناك تمايز بين خصوصيات نسائية ورجالية.',
    p2:'إضافة إلى الأعمال المعيشية وتربية المواشي تنجز المرأة النسج سواء الزرابي أو الألبسة (حايك، جلباب، حنبل). وترتبط بعض الصناعات بالأنشطة الفلاحية مثل الأكياس لحمل الحبوب. ويخصص إنتاج المرأة غالباً للاستهلاك الأسري ثم للبيع خلال المواسم.',
    p3:'يبين توزيع الصناع حسب الفروع أن النسيج يحتل المقدمة بـ 789 صانعاً يليه البناء بـ 741. ويُظهر الجدول ضعف حرف الخشب رغم المؤهلات الغابوية. ويبلغ مجموع الصناع 2704 أي حوالي ‎9.55%‎ من مجموع الجهة.',
    tableCols:['الفرع','عدد الصناع'],
    tableRows:[['الخشب','287'],['النسيج','789'],['المعادن','218'],['الجلد','72'],['الخدمات','597'],['أشغال البناء','741']],
    tableTotal:['المجموع','2704'],
    caption:'مصلحة الشؤون الاقتصادية و التنسيق – إقليم الحاجب',
    p4:'ملاحظة: يتم تشييد مبنى (R+1) يضم بالطابق الأرضي 6 ورشات، قاعة عرض، مقهى، روض أطفال، فضاء بيع، مرافق صحية وموقف سيارات وبالطابق الأول 4 ورشات، قاعة عرض، قاعة تكوين، مكتب، قاعة استقبال و اجتماعات، قاعة صلاة، مخزن ومرافق صحية – في طور اللمسات النهائية – سيوفر فضاءً مناسباً للصناع.',
  };

  const t = isAr? ar: fr;

  const Table = ({cols, rows, total, caption}) => (
    <div className="art-table-wrap" role="region" aria-label={cols[0]}>
      <table className="art-table responsive-table">
        <thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r,i)=>(<tr key={i}>{r.map((c,j)=><td key={j} data-label={cols[j]}>{c}</td>)}</tr>))}</tbody>
        {total && <tfoot><tr>{total.map((c,i)=><th key={i}>{c}</th>)}</tr></tfoot>}
      </table>
  {caption && <p className="table-caption" title={caption}>{caption}</p>}
    </div>
  );

  return (
    <div className="art-wrap" dir={dir}>
      <ArtStyle dir={dir} />
      <header className="art-hero fade-in" aria-labelledby="art-title">
        <h1 id="art-title"><span className="orn left" aria-hidden="true"/> {t.title} <span className="orn right" aria-hidden="true"/></h1>
      </header>

      <section className="art-section intro fade-in">
        <p className="para">{t.p1}</p>
        <p className="para">{t.p2}</p>
      </section>

      <figure className="art-image wide fade-in">
        <img src={art1} alt={t.title} loading="lazy" />
        <figcaption>{t.title}</figcaption>
      </figure>

      <section className="art-section fade-in">
        <p className="para">{t.p3}</p>
        <Table cols={t.tableCols} rows={t.tableRows} total={t.tableTotal} caption={t.caption} />
      </section>

      <figure className="art-image mid fade-in">
        <img src={art2} alt={t.title} loading="lazy" />
        <figcaption>{t.title}</figcaption>
      </figure>

      <section className="art-section fade-in">
        <p className="para note">{t.p4}</p>
      </section>
    </div>
  );
}

function ArtStyle({dir}){return <style>{`
.art-wrap{--ink:#1b3a2f;--emerald:#0d8d62;--emerald-dark:#056044;--gold:#d4b483;--cream:#fbf9f4;--paper:#f6f3eb;max-width:1550px;margin-inline:auto;padding:clamp(1.1rem,2.6vw,3rem) clamp(1rem,3.2vw,3.3rem) 4rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;position:relative;}
.art-wrap:before{content:"";position:fixed;inset:0;z-index:-3;background:radial-gradient(circle at 20% 18%,#0f5134 0%,#033121 38%,#021a13 70%);}
.art-wrap:after{content:"";position:fixed;inset:0;z-index:-2;background:repeating-linear-gradient(45deg,rgba(255,255,255,.03) 0 2px,transparent 2px 4px),radial-gradient(circle at 70% 70%,rgba(255,255,255,.08),transparent 60%);mix-blend-mode:overlay;pointer-events:none;}
.art-hero{position:relative;margin:0 auto 2.5rem;background:linear-gradient(125deg,#065f46,#089470 55%,#0fb787);padding:1.9rem 1.4rem 2rem;border-radius:1.9rem;box-shadow:0 32px 70px -28px rgba(0,0,0,.6),0 0 0 1px #10b98155;overflow:hidden;}
.art-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 35%,rgba(255,255,255,.25),transparent 70%),radial-gradient(circle at 70% 60%,rgba(255,255,255,.18),transparent 75%);mix-blend-mode:overlay;}
.art-hero h1{margin:0;font-size:clamp(2.05rem,4.5vw,3.7rem);font-weight:800;letter-spacing:.06em;text-align:center;display:flex;align-items:center;justify-content:center;gap:.75rem;color:#fff;font-family: 'Times New Roman',serif;position:relative;}
.art-hero .orn{width:clamp(40px,8vw,120px);height:6px;background:linear-gradient(90deg,transparent,#fff,#fff,#fff,transparent);border-radius:4px;display:inline-block;position:relative;}
.art-hero .orn:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,#fff,transparent 70%);opacity:.35;}
.art-section{background:linear-gradient(140deg,rgba(255,255,255,.85),rgba(238,253,246,.82));border:1px solid #10b98133;border-radius:1.55rem;padding:1.9rem 1.6rem 2.2rem;margin:0 0 2.4rem;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);box-shadow:0 40px 70px -30px rgba(0,0,0,.45),0 4px 14px -6px rgba(0,0,0,.35);position:relative;overflow:hidden;}
.art-section:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.6),transparent 65%);mix-blend-mode:overlay;pointer-events:none;}
.para{margin:.65rem 0 1.25rem;font-size:clamp(1rem,1.15vw,1.18rem);line-height:1.75;font-weight:600;color:#042f22;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;}
.note{font-size:clamp(.85rem,1.02vw,.98rem);font-style:italic;background:linear-gradient(90deg,#ecfdf5 0,#ffffff 60%);padding:1rem 1.1rem;border-left:${dir==='rtl'?'none':'5px solid #10b981'};border-right:${dir==='rtl'?'5px solid #10b981':'none'};border-radius:.9rem;box-shadow:0 4px 18px -10px rgba(0,0,0,.2);}
.art-image{margin:2.6rem auto 2rem;max-width:1050px;display:flex;flex-direction:column;align-items:center;}
.art-image.wide{max-width:1100px;}
.art-image.mid{max-width:900px;}
.art-image img{width:100%;display:block;border-radius:1.2rem;box-shadow:0 28px 60px -25px rgba(0,0,0,.55),0 0 0 1px #10b98144;object-fit:cover;aspect-ratio:4/3;}
.art-image figcaption{margin:.9rem 0 0;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#065f46;text-align:center;}
.art-table-wrap{overflow-x:auto;margin:1.2rem 0 .3rem;}
.art-table{width:100%;border-collapse:collapse;min-width:580px;font-size:.8rem;}
.art-table th,.art-table td{border:1px solid #065f4622;padding:.65rem .75rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.art-table th{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:800;letter-spacing:.06em;font-family:'Times New Roman',serif;}
.art-table tbody td{background:#ffffffb3;font-weight:600;color:#042f22;}
.art-table tbody tr:nth-child(even) td{background:#ecfdf5cc;}
.art-table tfoot th{background:#065f46;color:#fff;}
.table-caption{margin:.55rem 0 0;font-size:.6rem;font-style:italic;text-align:center;opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;width:100%;}
/* Responsive table -> card */
@media (max-width:760px){
  .art-section{padding:1.5rem 1.05rem 1.9rem;}
  .para{font-size:.95rem;line-height:1.78;}
  .note{font-size:.92rem;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.6rem;border:1px solid #10b98133;background:#fff;margin-bottom:.95rem;padding:.85rem .9rem;border-radius:1.2rem;box-shadow:0 10px 26px -18px rgba(0,0,0,.3);} 
  .responsive-table td{border:none!important;padding:.45rem .55rem;background:transparent!important;display:flex;flex-direction:column;gap:.25rem;font-size:.85rem;line-height:1.35;}
  .responsive-table td:before{content:attr(data-label);font-size:.7rem;font-weight:700;color:#047857;letter-spacing:.03em;}
  .art-table{min-width:0;font-size:.78rem;}
}
/* Fade animation */
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .9s ease forwards;transform:translateY(14px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
