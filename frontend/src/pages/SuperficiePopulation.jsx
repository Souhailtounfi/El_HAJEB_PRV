import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageSidebar from '../components/PageSidebar';

const SLUG = 'superficie-population';

export default function SuperficiePopulation(){
	const { i18n } = useTranslation();
	const lang = i18n.language; const isAr = lang === 'ar'; const dir = isAr? 'rtl':'ltr';

	useEffect(()=>{const h=document.querySelector('.site-header, header, .main-nav');if(h){document.documentElement.style.setProperty('--header-h',h.getBoundingClientRect().height+'px');}},[lang]);

	// Texts
	const fr={
		title:'Superficie & Population',
		intro:"La province d'El Hajeb couvre 2 193,41 km². La population légale 2024 est estimée à 267 156 habitants (267 098 marocains / 58 étrangers). Par rapport à 2014 : +20 140 habitants, soit ~0,8%/an (1,4% entre 2004-2014).",
		growth:"Tendances : El Hajeb, Aïn Taoujdate, Sebaa Ayoune ~+1,6% ; Agourai +1,4% ; certains territoires enregistrent un ralentissement ou des baisses (Ait Oukhlafen, Tamchachte…).",
		communesTitle:'Communes (2024) – superficie, population, densité',
		evoTitle:'Évolution par milieu de résidence (1994–2024)',
		pyramidTitle:'Pyramide des âges (indicative)',
		structureTitle:'Grandes tranches d’âge (%)',
		active:'Population active estimée 106 000 (~39,7% taux d’activité).',
		disclaimer:'Valeurs pour illustration – à valider avec les données officielles.'
	};
	const ar={
		title:'المساحة و الساكنة',
		intro:'تغطي عمالة الحاجب 2193,41 كلم². يقدر عدد السكان لسنة 2024 بـ 267.156 نسمة (267.098 مغاربة / 58 أجنبي). مقارنة مع 2014: زيادة 20.140 نسمة (~%0,8 سنوياً).',
		growth:'اتجاهات: الحاجب، عين تاوجدات، سبع عيون ~%1,6؛ أڭوراي %1,4؛ بعض الجماعات تسجل تباطؤاً أو انخفاضاً (آيت وخلفان، تامشاشت...).',
		communesTitle:'الجماعات (2024) – المساحة، الساكنة، الكثافة',
		evoTitle:'تطور الساكنة حسب الوسط (1994–2024)',
		pyramidTitle:'هرم الأعمار (تقريبي)',
		structureTitle:'الفئات العمرية الرئيسية %',
		active:'السكان النشيطون ~106.000 (%39,7 معدل النشاط).',
		disclaimer:'أرقام توضيحية يجب تأكيدها رسميا.'
	};
	const t=isAr?ar:fr;

	// Data
	const communeGroups=[
		{g:isAr?'الباشويات':'PACHALIKS',rows:[
			{c:isAr?'الحاجب':'EL HAJEB',s:20.73,p:41359,d:1995},
			{c:isAr?'عين تاوجدات':'AIN TAOUJDATE',s:16.44,p:33055,d:2011},
			{c:isAr?'سبع عيون':'SEBAA AYOUne'.toUpperCase(),s:41.42,p:28736,d:694},
			{c:isAr?'أڭوراي':'AGOURAI',s:22.16,p:19158,d:845},
		]},
		{g:isAr?'دائرة الحاجب':'CERCLE EL HAJEB',rows:[
			{c:isAr?'إقدار':'IQADDAR',s:244.65,p:8774,d:36},
			{c:isAr?'آيت بورزوين':'AIT BOURZOUINE',s:280.96,p:7906,d:28},
			{c:isAr?'آيت نعمان':'AIT NAAMANE',s:161.44,p:5857,d:36},
		]},
		{g:isAr?'دائرة عين تاوجدات':'CERCLE AIN TAOUJDATE',rows:[
			{c:isAr?'آيت بوبدماَن':'AIT BOUBIDMANE',s:103.84,p:22780,d:219},
			{c:isAr?'بيتـيت':'BITITT',s:116.30,p:15241,d:131},
			{c:isAr?'لقصير':'LAQSIR',s:182.55,p:32377,d:177},
			{c:isAr?'آيت هرز الله':'AIT HARZELLAH',s:157.08,p:13604,d:87},
			{c:isAr?'آيت يعزام':'AIT YAAZAM',s:153,p:16912,d:111},
		]},
		{g:isAr?'دائرة أڭوراي':'CERCLE AGOURAI',rows:[
			{c:isAr?'تامشاشت':'TAMCHACHTE',s:245.84,p:3562,d:14},
			{c:isAr?'آيت وخلفان':'AIT OUKHELFEN',s:127,p:3261,d:26},
			{c:isAr?'راس جري':'RASS JERRI',s:155,p:6707,d:43},
			{c:isAr?'جحجوح':'JAHJOUH',s:165,p:7867,d:48},
		]}
	];
	const totals={s:2193.41,p:267156,d:122};

	const evolutionYears=['1994','2004','2014','2024'];
	const evolutionRows=[
		{k:isAr?'الحاجب':'EL HAJEB',vals:[
			{u:65047,r:115447,t:180494},
			{u:92344,r:124044,t:216388},
			{u:106498,r:140158,t:247016},
			{u:122308,r:144848,t:267156},
		]},
		{k:isAr?'الجهة':'REGION',vals:[
			{u:965682,r:884982,t:1850664},
			{u:1199415,r:887526,t:2086941},
			{u:1442606,r:874259,t:2316865},
			{u:2855366,r:1615245,t:4467911},
		]},
		{k:isAr?'الإقليم/الجهة %':'PROV/REGL (%)',percent:true,vals:[
			{u:6.7,r:12.3,t:9.5},
			{u:7.7,r:13.2,t:10.1},
			{u:7.8,r:15.2,t:10.6},
			{u:4.3,r:8.9,t:6},
		]},
	];

	const agePyramid=[
		{b:'75+',m:-2.1,f:2.3},{b:'70-74',m:-2.4,f:2.5},{b:'65-69',m:-2.6,f:2.7},{b:'60-64',m:-3.2,f:3.1},
		{b:'55-59',m:-3.4,f:3.3},{b:'50-54',m:-3.8,f:3.6},{b:'45-49',m:-4.0,f:3.9},{b:'40-44',m:-4.2,f:4.1},
		{b:'35-39',m:-4.1,f:4.0},{b:'30-34',m:-4.3,f:4.2},{b:'25-29',m:-4.5,f:4.3},{b:'20-24',m:-5.1,f:5.0},
		{b:'15-19',m:-5.6,f:5.4},{b:'10-14',m:-6.9,f:6.7},{b:'5-9',m:-5.2,f:5.0},{b:'0-4',m:-4.8,f:4.6},
	];
	const ageStructure=[
		{y:'2004',u:30,w:61.9,o:7.9},
		{y:'2014',u:28.2,w:63,o:8.8},
		{y:'2024',u:27,w:59.4,o:13.5},
	];

	return <div className="sp-responsive" dir={dir}>
		<StyleBlock />
		{/* Mobile Version */}
		<div className="sp-shell sp-mobile" aria-label="mobile layout">
			<header className="sp-header"><h1 className="sp-title">{t.title}</h1></header>
			<main className="sp-main" id="main-content-mobile">
				<section id="intro-m" className="sp-card"><p className="lead" style={{marginTop:0}}>{t.intro}</p><p className="meta">{t.growth}</p></section>
				<section id="communes-m" className="sp-card">
					<h2 className="sec-title">{t.communesTitle}</h2>
					<div className="communes-mobile">{communeGroups.map((g,i)=> <div key={i} className="cg"><div className="cg-head">{g.g}</div>{g.rows.map((r,ri)=> <div className="c-row" key={ri}><div className="c-name">{r.c}</div><div className="c-metrics"><span><b>{isAr?'المساحة':'Km²'}:</b> {fmt(r.s,2)}</span><span><b>{isAr?'السكان':'Population'}:</b> {num(r.p)}</span><span><b>{isAr?'الكثافة':'Densité'}:</b> {r.d}</span></div></div>)}</div>)}<div className="cg total"><div className="c-name total-name">{isAr?'المجموع':'TOTAL'}</div><div className="c-metrics total-metrics"><span><b>{isAr?'المساحة':'Km²'}:</b> {fmt(totals.s,2)}</span><span><b>{isAr?'السكان':'Population'}:</b> {num(totals.p)}</span><span><b>{isAr?'الكثافة':'Densité'}:</b> {totals.d}</span></div></div></div>
				</section>
				<section id="evo-m" className="sp-card"><h2 className="sec-title">{t.evoTitle}</h2><div className="evo-mobile">{evolutionRows.map((row,i)=> <div key={i} className={"erow"+(row.percent?' percent':'')}><div className="erow-head">{row.k}</div><div className="evo-year-grid">{evolutionYears.map((y,yi)=> {const v=row.vals[yi];return <div className="ey" key={yi}><div className="ey-year">{y}</div><div className="ey-values"><span><b>{isAr?'حضري':'URBAIN'}:</b> {cell(v.u,row.percent)}</span><span><b>{isAr?'قروي':'RURAL'}:</b> {cell(v.r,row.percent)}</span><span><b>{isAr?'مجموع':'TOTAL'}:</b> {cell(v.t,row.percent)}</span></div></div>;})}</div></div>)}</div></section>
				<section id="pyramide-m" className="sp-card"><h2 className="sec-title">{t.pyramidTitle}</h2><div className="pyr" role="img" aria-label={isAr?'تمثيل تقريبي للهيكل العمري حسب الجنس':'Représentation indicative de la structure par âge et sexe'}>{agePyramid.map(r=> <div className="pyr-line" key={r.b}><div className="bar male" style={{'--v':Math.abs(r.m)}} title={`M ${Math.abs(r.m)}%`}></div><div className="age-label">{r.b}</div><div className="bar female" style={{'--v':r.f}} title={`F ${r.f}%`}></div></div>)}<div className="pyr-legend"><span className="m">{isAr?'ذكور':'Masculin'}</span><span className="f">{isAr?'إناث':'Féminin'}</span></div><p className="meta tiny" style={{textAlign:'center'}}>{isAr?'قيم تقريبية':'Valeurs indicatives'}</p></div></section>
				<section id="structure-m" className="sp-card"><h2 className="sec-title">{t.structureTitle}</h2><div className="as-grid">{ageStructure.map(a=> <div className="as-item" key={a.y}><div className="stack" aria-label={a.y}><span className="seg old" style={{'--p':a.o}} title={`60+ ${a.o}%`}></span><span className="seg work" style={{'--p':a.w}} title={`15-59 ${a.w}%`}></span><span className="seg young" style={{'--p':a.u}} title={`<15 ${a.u}%`}></span></div><div className="as-year">{a.y}</div></div>)}</div><p className="meta" style={{marginTop:'0.75rem'}}>{t.active}</p></section>
				<p className="disclaimer">{t.disclaimer}</p>
			</main>
			<aside className="sp-sidebar" aria-label="sidebar"><PageSidebar lang={lang} slug={SLUG} theme="light" /></aside>
		</div>
		{/* Desktop Version */}
		<div className="sp-desktop" aria-label="desktop layout">
			<div className="geo-layout">
				<main className="geo-main">
					<header className="geo-head"><h1 className="geo-title">{t.title}</h1><div className="geo-sep"/></header>
					<article className="geo-article" dir={dir}>
						<section className="spd-section" id="intro"><p className="sp-intro">{t.intro}</p><p className="sp-note">{t.growth}</p></section>
						<section className="spd-section" id="table-communes"><h2 className="sp-sec-title">{t.communesTitle}</h2><div className="sp-table-wrapper"><table className="sp-table" aria-label={t.communesTitle}><thead><tr><th>{isAr?'الجماعة':'Commune'}</th><th>{isAr?'المساحة (كلم²)':'Superficie (km²)'}</th><th>{isAr?'السكان':'Population'}</th><th>{isAr?'الكثافة':'Densité (Hab/km²)'}</th></tr></thead><tbody>{communeGroups.map((g,gi)=> <React.Fragment key={gi}><tr className="sp-group"><td colSpan={4}>{g.g}</td></tr>{g.rows.map((r,ri)=><tr key={ri}><td data-label="Commune">{r.c}</td><td data-label="Superficie">{fmt(r.s,2)}</td><td data-label="Population">{num(r.p)}</td><td data-label="Densité">{r.d}</td></tr>)}</React.Fragment>)}<tr className="sp-total"><td>{isAr?'المجموع':'TOTAL'}</td><td>{fmt(totals.s,2)}</td><td>{num(totals.p)}</td><td>{totals.d}</td></tr></tbody></table></div></section>
						<section className="spd-section" id="evolution"><h2 className="sp-sec-title">{t.evoTitle}</h2><div className="sp-table-wrapper"><table className="sp-table evo-table" aria-label={t.evoTitle}><thead><tr><th rowSpan={2}>{isAr?'الوسط':'Milieu'}</th>{evolutionYears.map(y=> <th key={y} colSpan={3}>{y}</th>)}</tr><tr className="sub-head">{evolutionYears.map(y=> [<th key={y+'u'}>{isAr?'حضري':'Urbain'}</th>,<th key={y+'r'}>{isAr?'قروي':'Rural'}</th>,<th key={y+'t'}>{isAr?'المجموع':'Total'}</th>])}</tr></thead><tbody>{evolutionRows.map((row,ri)=> <tr key={ri} className={row.percent?'is-percent':''}><td>{row.k}</td>{row.vals.map((v,i)=> [<td key={ri+'u'+i}>{cell(v.u,row.percent)}</td>,<td key={ri+'r'+i}>{cell(v.r,row.percent)}</td>,<td key={ri+'t'+i}>{cell(v.t,row.percent)}</td>])}</tr>)}</tbody></table></div></section>
						<section className="spd-section" id="pyramide-age"><h2 className="sp-sec-title">{t.pyramidTitle}</h2><div className="pyramid"><div className="pyr-chart">{agePyramid.map(g=> <div className="pyr-row" key={g.b}><div className="pyr-bar male" style={{'--v':Math.abs(g.m)}} title={`M ${Math.abs(g.m)}%`} /><div className="pyr-age">{g.b}</div><div className="pyr-bar female" style={{'--v':g.f}} title={`F ${g.f}%`} /></div>)}</div><div className="pyr-legend"><span className="male-l">{isAr?'ذكور':'Masculin'}</span><span className="female-l">{isAr?'إناث':'Féminin'}</span></div><p className="sp-note">{isAr?'قيم تقريبية للعرض — تحدد بدقة لاحقاً.':'Valeurs indicatives — préciser avec les données officielles.'}</p></div></section>
						<section className="spd-section" id="structure-age"><h2 className="sp-sec-title">{t.structureTitle}</h2><div className="age-structure">{ageStructure.map(y=> <div className="as-year" key={y.y}><div className="as-stack" aria-label={y.y}><div className="as-seg over60" style={{'--p':y.o}} title={`60+ ${y.o}%`} /><div className="as-seg working" style={{'--p':y.w}} title={`15-59 ${y.w}%`} /><div className="as-seg under15" style={{'--p':y.u}} title={`<15 ${y.u}%`} /></div><div className="as-year-label">{y.y}</div></div>)}</div><p className="sp-note">{t.active}</p></section>
						<p className="sp-disclaimer">{t.disclaimer}</p>
					</article>
				</main>
				<aside className="geo-side"><PageSidebar lang={lang} slug={SLUG} theme="light" /></aside>
			</div>
		</div>
	</div>;

	function num(v){return v.toLocaleString(lang);} // number formatting
	function fmt(v,dec){return v.toLocaleString(lang,{minimumFractionDigits:dec,maximumFractionDigits:dec});}
	function cell(v,percent){return percent? String(v).replace('.',','): num(v);}  
}

function StyleBlock(){
	return <style>{`
	:root{--c-bg:#f6fffb;--c-grad:linear-gradient(140deg,#ffffff,#f0fdf4 60%,#e6f9f3);--c-accent:#047857;--c-accent2:#0d9488;--radius:1.25rem;}
	.sp-shell{min-height:100vh;display:grid;grid-template-columns:1fr;gap:1.25rem;padding:calc(var(--header-h,64px) + 1rem) .9rem 3.5rem;background:var(--c-grad);}
	.sp-desktop{display:none;}
	.sp-mobile{display:block;}
	.sp-header{text-align:center;padding:.25rem 0 0;}
	.sp-title{margin:0;font-size:clamp(1.55rem,7vw,2.9rem);line-height:1.05;font-weight:800;background:linear-gradient(90deg,#065f46,#10b981,#0ea5e9 65%,#6366f1);-webkit-background-clip:text;color:transparent;letter-spacing:.5px;}
	.sp-main{display:flex;flex-direction:column;gap:1.15rem;max-width:980px;margin:0 auto;width:100%;}
	.sp-card{background:#fff;border:1px solid #e2e8f0;border-radius:var(--radius);padding:1.05rem 1rem 1.1rem;box-shadow:0 4px 12px -4px rgba(0,0,0,.08);position:relative;}
	.sec-title{margin:0 0 .65rem;font-size:1.05rem;font-weight:800;letter-spacing:.5px;color:#065f46;}
	.lead{font-size:.92rem;line-height:1.55;font-weight:500;color:#1f2937;}
	.meta{font-size:.65rem;color:#065f46;font-weight:600;line-height:1.4;margin:.35rem 0 0;}
	.meta.tiny{font-size:.55rem;}
	.disclaimer{margin:1.4rem 0 0;font-size:.55rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;font-weight:600;text-align:center;}
	/* Communes mobile cards */
	.communes-mobile .cg{border:1px solid #d1d5db;border-radius:.9rem;padding:.55rem .65rem .6rem;margin-bottom:.65rem;background:#ffffff;box-shadow:0 2px 4px -2px rgba(0,0,0,.06);}
	.communes-mobile .cg:last-child{margin-bottom:0;}
	.communes-mobile .cg-head{font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#92400e;background:#fef3c7;border-radius:.5rem;padding:.4rem .6rem;margin:0 0 .55rem;}
	.c-row{display:flex;flex-direction:column;gap:.2rem;padding:.35rem .35rem .4rem;border-radius:.6rem;}
	.c-row:not(:last-child){border-bottom:1px dashed #e5e7eb;margin-bottom:.3rem;}
	.c-name{font-size:.78rem;font-weight:700;color:#065f46;}
	.c-metrics{display:flex;flex-wrap:wrap;gap:.45rem .9rem;font-size:.63rem;line-height:1.2;}
	.cg.total{background:#ecfdf5;border-color:#a7f3d0;}
	.total-name{font-weight:800;}
	.total-metrics span{font-weight:700;}
	/* Desktop table (hidden on mobile) */
	.desktop-only{display:none;}
	@media (min-width:780px){.desktop-only{display:block;} .communes-mobile{display:none;}}
	.table-scroll{overflow:auto;border:1px solid #e2e8f0;border-radius:1rem;position:relative;background:linear-gradient(145deg,#fff,#f0fdf4);}
	.table-scroll:before,.table-scroll:after{content:"";position:absolute;top:0;bottom:0;width:36px;pointer-events:none;z-index:2;}
	.table-scroll:before{left:0;background:linear-gradient(to right,#ffffff,rgba(255,255,255,0));border-top-left-radius:inherit;border-bottom-left-radius:inherit;}
	.table-scroll:after{right:0;background:linear-gradient(to left,#ffffff,rgba(255,255,255,0));border-top-right-radius:inherit;border-bottom-right-radius:inherit;}
	.tbl{width:100%;border-collapse:collapse;font-size:.7rem;min-width:640px;}
	.tbl th,.tbl td{border:1px solid #d4d4d8;padding:.45rem .55rem;text-align:start;}
	[dir='rtl'] .tbl th,[dir='rtl'] .tbl td{text-align:right;}
	.tbl th{background:#d97706;color:#fff;font-weight:800;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;}
	.tbl .grp td{background:#f5f5f4;font-weight:700;font-size:.72rem;color:#92400e;letter-spacing:.04em;text-transform:uppercase;}
	.tbl .tot td{background:#fef3c7;font-weight:800;}
	/* Evolution mobile */
	.evo-mobile .erow{border:1px solid #d1d5db;border-radius:.9rem;padding:.55rem .6rem .65rem;margin-bottom:.6rem;background:#ffffff;box-shadow:0 2px 4px -2px rgba(0,0,0,.06);}
	.evo-mobile .erow.percent{background:#fefce8;}
	.evo-mobile .erow-head{font-size:.72rem;font-weight:700;color:#065f46;margin:0 0 .4rem;}
	.evo-year-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:.4rem .5rem;}
	.ey{background:#f8fafc;border:1px solid #e2e8f0;border-radius:.55rem;padding:.35rem .4rem;display:flex;flex-direction:column;gap:.25rem;}
	.ey-year{font-size:.58rem;font-weight:700;letter-spacing:.04em;color:#92400e;background:#fef3c7;padding:.15rem .35rem;border-radius:.4rem;width:max-content;}
	.ey-values{display:flex;flex-direction:column;gap:.15rem;font-size:.55rem;}
	/* Evolution desktop table */
	.evo-desktop .tbl{min-width:860px;font-size:.66rem;}
	.evo-desktop th[colspan]{background:#d97706;}
	.evo-desktop tbody tr.percent td{background:#fefce8;}
	.evo-desktop tbody tr td:first-child{font-weight:600;}
	.evo-desktop thead tr:nth-child(2) th{background:#f59e0b;color:#fff;}
	.evo-desktop .tbl th[rowspan]{vertical-align:bottom;}
	/* Age pyramid */
	.pyr{display:flex;flex-direction:column;gap:.25rem;max-width:540px;margin:0 auto;}
	.pyr-line{display:grid;grid-template-columns:1fr 54px 1fr;align-items:center;gap:.4rem;}
	.pyr-line .age-label{font-size:.5rem;font-weight:600;text-align:center;color:#374151;}
	.pyr-line .bar{--scale:5;height:12px;border-radius:.25rem;position:relative;background:linear-gradient(90deg,#10b981,#0d9488);} 
	.pyr-line .bar.male{background:linear-gradient(90deg,#2563eb,#1d4ed8);margin-left:auto;}
	.pyr-line .bar:after{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(90deg,rgba(255,255,255,.35),transparent);}
	.pyr-line .bar{width:calc(var(--v) * var(--scale) * 1%);}
	.pyr-legend{display:flex;justify-content:center;gap:1.1rem;margin-top:.35rem;font-size:.56rem;font-weight:700;}
	.pyr-legend .m{color:#2563eb;} .pyr-legend .f{color:#047857;}
	/* Keep age pyramid centered & non-mirrored in RTL */
	[dir='rtl'] .pyr,[dir='rtl'] .pyr-chart,[dir='rtl'] .pyr-line{direction:ltr;}
	[dir='rtl'] .pyr-line .age-label{direction:ltr;}
	/* Age structure */
	.as-grid{display:flex;justify-content:center;gap:1.25rem;flex-wrap:wrap;margin-top:.2rem;}
	.as-item{display:flex;flex-direction:column;align-items:center;gap:.45rem;}
	.stack{width:60px;height:150px;display:flex;flex-direction:column-reverse;border-radius:.55rem;overflow:hidden;box-shadow:0 4px 10px -4px rgba(0,0,0,.25);background:#f1f5f9;}
	.seg{display:block;width:100%;height:calc(var(--p) * 1%);position:relative;}
	.seg:after{content:attr(title);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:.48rem;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.35);}
	.seg.young{background:#d97706;} .seg.work{background:#0f766e;} .seg.old{background:#f59e0b;}
	.as-year{font-size:.58rem;font-weight:700;color:#065f46;letter-spacing:.04em;}
	/* Sidebar placed last on mobile */
	.sp-sidebar{max-width:960px;margin:0 auto;width:100%;}
	.sp-sidebar :where(.sidebar-inner){position:sticky;top:calc(var(--header-h,64px) + .75rem);} /* if internal class exists */
	@media (min-width:1180px){
		.sp-mobile{display:none;}
		.sp-desktop{display:block;}
		.sp-shell{display:none;}
		.sp-responsive{background:radial-gradient(circle at 12% 18%,#ecfdf5,transparent 65%),radial-gradient(circle at 85% 82%,#d1fae5,transparent 70%),linear-gradient(125deg,#ffffff,#f0fdf4 55%,#e6fcf3);min-height:100vh;padding:4.5rem clamp(1rem,3vw,3rem) 6rem;}
		.geo-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:3.2rem;max-width:1350px;margin:0 auto;}
		.geo-head{text-align:center;margin:0 0 2rem;}
		.geo-title{margin:0;font-size:clamp(2.1rem,4.5vw,3.25rem);font-weight:800;line-height:1.05;letter-spacing:.5px;background:linear-gradient(90deg,#065f46,#059669 35%,#0ea5e9 70%,#6366f1);-webkit-background-clip:text;color:transparent;}
		.geo-sep{height:4px;width:100%;margin:1rem auto 0;background:linear-gradient(90deg,transparent,#34d399,#0ea5e9 70%,transparent);border-radius:2rem;max-width:640px;}
		.geo-article{background:#fff;border:1px solid #e5e7eb;border-radius:2rem;padding:clamp(1.5rem,2.4vw,2.7rem);box-shadow:0 6px 18px rgba(0,0,0,0.08);}
		.spd-section + .spd-section{margin-top:2.9rem;}
		.sp-sec-title{margin:0 0 1.1rem;font-size:clamp(1.3rem,2.1vw,1.9rem);font-weight:800;background:linear-gradient(90deg,#065f46,#10b981);-webkit-background-clip:text;color:transparent;}
		.sp-intro{font-size:1rem;line-height:1.65;color:#1f2937;font-weight:500;margin:0 0 1rem;}
		.sp-note{font-size:.8rem;line-height:1.5;color:#065f46;font-weight:600;margin:.25rem 0 0;}
		.sp-disclaimer{margin-top:3rem;font-size:.7rem;letter-spacing:.05em;text-transform:uppercase;color:#6b7280;font-weight:600;}
		.sp-table-wrapper{width:100%;overflow-x:auto;background:linear-gradient(135deg,#ffffff 0%,#f0fdf4 70%);border:1px solid #e2e8f0;border-radius:1.2rem;padding:1rem;margin:0 0 1.2rem;box-shadow:0 4px 14px -4px rgba(0,0,0,.08);}    
		.sp-table{width:100%;border-collapse:collapse;font-size:.75rem;min-width:640px;}
		.sp-table th,.sp-table td{border:1px solid #d4d4d8;padding:.55rem .65rem;text-align:start;}
		[dir='rtl'] .sp-table th,[dir='rtl'] .sp-table td{text-align:right;}
		.sp-table th{background:#d97706;color:#fff;font-weight:800;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;}
		.sp-table .sp-group td{background:#f5f5f4;font-weight:700;font-size:.62rem;letter-spacing:.05em;text-transform:uppercase;color:#92400e;}
		.sp-table .sp-total td{background:#fef3c7;font-weight:800;}
		.evo-table th[colspan]{background:#d97706;}
		.evo-table .sub-head th{background:#f59e0b;color:#fff;font-weight:700;}
		.evo-table .is-percent td{background:#fefce8;}
		.pyramid{margin-top:.3rem;}
		.pyr-chart{display:flex;flex-direction:column;gap:.25rem;max-width:640px;margin:0 auto;}
		.pyr-row{display:grid;grid-template-columns:1fr 70px 1fr;align-items:center;gap:.5rem;}
		.pyr-age{text-align:center;font-size:.55rem;font-weight:600;letter-spacing:.05em;color:#374151;}
		.pyr-bar{--scale:6;position:relative;height:14px;border-radius:.3rem;background:linear-gradient(90deg,#10b981,#059669);filter:brightness(.95);} 
		.pyr-bar.male{background:linear-gradient(90deg,#2563eb,#1d4ed8);} 
		.pyr-bar:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.25),transparent);border-radius:inherit;opacity:.5;}
		.pyr-bar{width:calc(var(--v) * var(--scale) * 1%);} 
		.pyr-bar.male{margin-left:auto;}
		.pyr-legend{display:flex;gap:1rem;margin-top:.6rem;font-size:.7rem;font-weight:700;justify-content:center;}
		.pyr-legend .male-l{color:#1d4ed8;}
		.pyr-legend .female-l{color:#047857;}
		/* Desktop age pyramid RTL fix */
		[dir='rtl'] .pyramid,[dir='rtl'] .pyr-chart,[dir='rtl'] .pyr-row{direction:ltr;}
		[dir='rtl'] .pyr-age{direction:ltr;}
		.age-structure{display:flex;gap:2.2rem;align-items:flex-end;margin-top:1rem;flex-wrap:wrap;justify-content:center;}
		.as-year{display:flex;flex-direction:column;align-items:center;gap:.6rem;}
		.as-stack{position:relative;width:70px;height:180px;display:flex;flex-direction:column-reverse;border-radius:.6rem;overflow:hidden;box-shadow:0 6px 16px -6px rgba(0,0,0,.2);background:#f1f5f9;}
		.as-seg{width:100%;position:relative;display:block;}
		.as-seg:after{content:attr(title);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:.55rem;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4);} 
		.as-seg.under15{background:#d97706;height:calc(var(--p) * 1%);} 
		.as-seg.working{background:#0f766e;height:calc(var(--p) * 1%);} 
		.as-seg.over60{background:#f59e0b;height:calc(var(--p) * 1%);} 
		.as-year-label{font-size:.7rem;font-weight:700;color:#065f46;letter-spacing:.05em;}
	}
	}
	@media (min-width:880px){
		.sp-card{padding:1.35rem 1.4rem 1.5rem;}
		.sec-title{font-size:1.25rem;}
		.lead{font-size:1rem;}
		.meta{font-size:.62rem;}
	}
	`}</style>;
}

