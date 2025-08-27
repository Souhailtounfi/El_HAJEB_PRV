import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/* Contacts Utiles Page*/

export default function ContactsUtiles(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'CONTACTS UTILES',
    emergency:'Numéros d\'urgence',
    useful:'Téléphones Utiles',
    emerCols:['ADMINISTRATION','N° VERT','TELEPHONE'],
    emerRows:[
      ['PROVINCE D\'EL HAJEB','-','035-54-36-71/72/73'],
      ['SÛRETÉ NATIONALE','19','0535542760'],
      ['GENDARMERIE ROYALE','177','035-54-30-13'],
      ['PROTECTION CIVILE','150','0535543677'],
      ['HOPITAL D\'EL HAJEB','-','035-54-26-75'],
    ],
    list:[
      ['ITTISSALAT AL MAGHRIB','0535-54-11-84'],
      ['TRESORERIE PROVINCIALE','0535-54-23-75'],
      ['PERCEPTION D\'EL HAJEB','0535-54-22-24'],
      ['CAISSE REGIONALE DU CREDIT AGRICOLE','0535-54-34-14'],
      ['DELEGATION PROVINCIALE DE L\'AGRICULTURE','0535-54-33-03'],
      ['DELEGATION PROVINCIALE DE LA SANTE','0535-54-31-59'],
      ['DELEGATION PROVINCIALE DE L\'EDUCATION NATIONALE','0535-54-37-14'],
      ['DELEGATION DE LA JEUNESSE ET DES SPORTS','0535-54-32-92'],
      ['OFFICE NATIONALE DE L\'EAU POTABLE','0535-54-21-73'],
      ['OFFICE NATIONALE DE L\'ELECTRICITE','0535-54-28-78'],
      ['POSTE ET TELECOMMUNICATION','0535-54-16-11 OU 0535-54-12-26'],
      ['SUBDIVISION DE L\'EQUIPEMENT','06-79-82-47-09'],
      ['COMMUNE URBAINE EL HAJEB','0535-54-17-28'],
      ['COMMUNE URBAINE SEBAA AYOUne','0535-54-60-05'],
      ['COMMUNE URBAINE AGOURAI','0535-43-00-08'],
      ['COMMUNE URBAINE AIN TAOUJDATE','0535-44-15-13'],
      ['COMMUNE RURALE AIT OUKHAFEN','0535-52-74-47'],
      ['C.R AIT YAAZEM','0535-51-74-01'],
      ['C.R SEBT JAHJOUH','0535-52-00-36'],
      ['C.R RAS IJJERRI','0535-52-44-77'],
      ['C.R TAMCHACHAT','0535-41-03-57'],
      ['C.R AIT BOURZOUINE','0535-43-64-85 / 86'],
      ['C.R AIT AAZMANE','0535-54-12-56'],
      ['C.R IQADDAR','0535-54-23-66'],
      ['C.R AIT BOUBIDMANE','0535-54-63-21'],
      ['C.R AIT HARZELLAH','0535-54-12-42'],
      ['C.R EL MASSIRA','0535-44-08-83'],
      ['C.R GUIABES','0535-44-04-06'],
    ]
  };

  const ar = {
    title:'جهات الاتصال المفيدة',
    emergency:'أرقام الطوارئ',
    useful:'هواتف مفيدة',
    emerCols:['الإدارة','الرقم الأخضر','الهاتف'],
    emerRows:[
      ['عمالة إقليم الحاجب','-','035-54-36-71/72/73'],
      ['الأمن الوطني','19','0535542760'],
      ['الدرك الملكي','177','035-54-30-13'],
      ['الوقاية المدنية','150','0535543677'],
      ['مستشفى الحاجب','-','035-54-26-75'],
    ],
    list:[
      ['اتصالات المغرب','0535-54-11-84'],
      ['الخزينة الإقليمية','0535-54-23-75'],
      ['قباضة الحاجب','0535-54-22-24'],
      ['القرض الفلاحي (الصندوق الجهوي)','0535-54-34-14'],
      ['المندوبية الإقليمية للفلاحة','0535-54-33-03'],
      ['المندوبية الإقليمية للصحة','0535-54-31-59'],
      ['المديرية الإقليمية للتعليم','0535-54-37-14'],
      ['المديرية الإقليمية للشباب والرياضة','0535-54-32-92'],
      ['المكتب الوطني للماء الصالح للشرب','0535-54-21-73'],
      ['المكتب الوطني للكهرباء','0535-54-28-78'],
      ['البريد والمواصلات','0535-54-16-11 / 0535-54-12-26'],
      ['مصلحة التجهيز','06-79-82-47-09'],
      ['الجماعة الحضرية الحاجب','0535-54-17-28'],
      ['الجماعة الحضرية سبع عيون','0535-54-60-05'],
      ['الجماعة الحضرية أكوراي','0535-43-00-08'],
      ['الجماعة الحضرية عين تاوجطات','0535-44-15-13'],
      ['ج.ق آيت وخفن','0535-52-74-47'],
      ['ج.ق آيت يعزم','0535-51-74-01'],
      ['ج.ق سبت جحجوح','0535-52-00-36'],
      ['ج.ق رأس اجيري','0535-52-44-77'],
      ['ج.ق تمشاشت','0535-41-03-57'],
      ['ج.ق آيت بورزوين','0535-43-64-85 / 86'],
      ['ج.ق آيت عزمان','0535-54-12-56'],
      ['ج.ق إقادار','0535-54-23-66'],
      ['ج.ق آيت بوبدمن','0535-54-63-21'],
      ['ج.ق آيت حرز الله','0535-54-12-42'],
      ['ج.ق المسيرة','0535-44-08-83'],
      ['ج.ق ڭيابس','0535-44-04-06'],
    ],
  };

  const t = isAr? ar: fr;

  const EmerTable = () => (
    <div className="cu-table-wrap"><table className="cu-table responsive-table"><thead><tr>{t.emerCols.map(c=> <th key={c}>{c}</th>)}</tr></thead><tbody>{t.emerRows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} data-label={t.emerCols[j]}>{c}</td>)}</tr>)}</tbody></table></div>
  );

  return (
    <div className="cu-wrap" dir={dir}>
      <ContactsStyle dir={dir} />
      <header className="cu-hero fade-in"><h1>{t.title}</h1></header>
      <section className="cu-section fade-in">
        <h2>{t.emergency}</h2>
        <EmerTable />
      </section>
      <section className="cu-section fade-in">
        <h2>{t.useful}</h2>
        <div className="cu-table-wrap"><table className="cu-table responsive-table cu-useful-table"><thead><tr><th>{isAr ? 'الجهة' : 'Organisme'}</th><th>{isAr ? 'الهاتف' : 'Téléphone'}</th></tr></thead><tbody>{t.list.map(([name,phone],i)=><tr key={i}><td data-label={isAr ? 'الجهة' : 'Organisme'}>{name}</td><td data-label={isAr ? 'الهاتف' : 'Téléphone'} className="p">{phone}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}

function ContactsStyle({dir}){return <style>{`
.cu-wrap{--c1:#065f46;--c2:#059669;--rad:1.35rem;max-width:1500px;margin-inline:auto;padding:clamp(1rem,2vw,2.4rem) clamp(1rem,2.6vw,2.8rem) 4rem;font-family:'Segoe UI',system-ui,sans-serif;color:#064e3b;}
.cu-hero{background:linear-gradient(135deg,#065f46,#089470);padding:1.8rem 1.6rem 2rem;border-radius:var(--rad);text-align:center;box-shadow:0 26px 58px -22px rgba(0,0,0,.44);}
.cu-hero h1{margin:0;font-size:clamp(1.9rem,3.6vw,3.15rem);font-weight:800;letter-spacing:.05em;background:linear-gradient(120deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;}
.cu-section{background:rgba(255,255,255,.78);border:1px solid #10b98133;border-radius:var(--rad);padding:1.6rem 1.5rem 2.1rem;margin-top:2.6rem;box-shadow:0 24px 52px -22px rgba(0,0,0,.26);position:relative;}
.cu-section h2{margin:0 0 1.2rem;font-size:clamp(1.15rem,2.15vw,1.95rem);font-weight:800;letter-spacing:.055em;color:#065f46;text-transform:uppercase;}
.cu-table{width:100%;border-collapse:collapse;font-size:.8rem;min-width:720px;}
.cu-table th,.cu-table td{border:1px solid #10b98133;padding:.6rem .75rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.cu-table th{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;letter-spacing:.05em;}
.cu-table tbody td{background:#fff;font-weight:600;color:#053826;}
.cu-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.cu-useful-table th{background:linear-gradient(135deg,#38b000,#059669);font-size:1.01em;}
.cu-useful-table td.p{font-family:monospace,Consolas,'Segoe UI',sans-serif;font-size:.98em;letter-spacing:.01em;}
.cu-useful-table tr:hover td{background:#e0f7ef!important;transition:background .18s;}
.cu-list{display:none;}
@media (max-width:780px){
  .cu-section{padding:1.3rem 1.05rem 1.8rem;}
  .cu-table{min-width:0;font-size:.86rem;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.55rem;border:1px solid #10b98133;background:#fff;margin-bottom:.85rem;padding:.75rem .8rem;border-radius:1.05rem;box-shadow:0 8px 22px -12px rgba(0,0,0,.22);} 
  .responsive-table td{border:none!important;padding:.38rem .45rem;background:transparent!important;display:flex;flex-direction:column;gap:.2rem;font-size:.82rem;line-height:1.35;}
  .responsive-table td:before{content:attr(data-label);font-size:.66rem;font-weight:700;color:#047857;letter-spacing:.02em;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
