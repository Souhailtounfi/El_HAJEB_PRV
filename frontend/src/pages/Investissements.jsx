import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/* Page: Banque de Données des Investissements (Province El Hajeb)
*/

export default function Investissements(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  // NOTE: Data sample extracted from provided capture (first rows only). Extend as needed.
  const fr = {
    title:'BANQUE DE DONNÉES DES INVESTISSEMENTS – PROVINCE EL HAJEB',
    // legend removed per request
    cols:['#','NATURE DU PROJET','CONSISTANCE DU PROJET','SECTEUR D\'INVESTISSEMENT','LOCALISATION DU PROJET','PROMOTEUR DU PROJET'],
    rows:[
      ['1','LOTISSEMENT D\'HABITAT SOCIAL « OUED EDDAHAB »','122 lots d\'habitat, garderie, centre commercial, parking, espace vert','Habitat','COMMUNE EL HAJEB','Amicale Oued Eddahab'],
      ['2','COMPLEXE SOCIOÉDUCATIF ET COMMERCIAL « IBTISSAMA »','Centre commercial, salle polyvalente, centre d\'accueil, espace d\'accueil, bureaux, restaurant au R.D.C','Commerce Et Social','COMMUNE EL HAJEB','Conseil Provincial D\'El Hajeb'],
      ['3','RÉGULARISATION ET EXTENSION DE LA COOPÉRATIVE LAITIÈRE ENVASSR','Equipements à construire, à aménager et à régulariser','Agro‑Industrie','COMMUNE AIN TAOUJDATE','Coopérative Envassr'],
      ['4','EXTENSION DU COMPLEXE AGRO‑INDUSTRIEL','Construction de hangars de stockage des grains, silos de stockage','Agro‑Industrie','COMMUNE AIN TAOUJDATE','Société « Les Huileries Souss »'],
      ['5','MARCHÉ COUVERT « SWIKA »','38 boutiques, caniveaux pour évacuations des eaux de pluie','Commerce','COMMUNE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['6','CONSTRUCTION ET AMÉNAGEMENT D\'UN SOUK HEBDOMADAIRE','Aire à grains, souk de bétail, locaux pour bouchers et poissonneries, café restaurant, bloc sanitaire, bloc administratif, loge gardien ...','Commerce','COMMUNE AIN TAOUJDATE','Cu Ain Taoujdate'],
      ['7','LOTISSEMENT D\'HABITAT « FIRDAOUS »','160 lots de recasement, 62 lots économiques, 03 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Société Al Oumrane'],
      ['8','LOTISSEMENT D\'HABITAT « EL YACOUT I »','414 lots économiques, 03 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Société Al Oumrane'],
      ['9','LOTISSEMENT D\'HABITAT « EL YACOUT 2 »','538 lots économiques, 07 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Société Al Oumrane'],
      ['10','LOTISSEMENT « OUM RÎBE »','213 lots économiques, 03 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Amicale El Khaïr'],
      ['11','LOTISSEMENT « AL KHADRAE »','404 lots économiques, 04 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Mohamed Alait Et C°'],
      ['12','LOTISSEMENT « MALIKA »','138 lots économiques, 04 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Zakaria El Yachouyi'],
      ['13','LOTISSEMENT « OUBHI »','49 lots économiques, 05 lots immeubles, 03 lots d\'équipements','Habitat','COMMUNE EL HAJEB','Ste Amouka'],
      ['14','LOTISSEMENT « CHIBA II »','32 lots économiques','Habitat','COMMUNE EL HAJEB','Ste Dalsam'],
      ['15','ACIMA','Hall de vente de 700 m² station de services et galerie','Commerce','COMMUNE EL HAJEB','Acima'],
      ['16','COMPLEXE RELIGIEUX ET CULTUREL','Accueil général, colloques, conférences, complexe administratif, complexe religieux, centre de documentation et divers','Services Divers','COMMUNE EL HAJEB','Ministère Des Habous Et Affaires Islamiques'],
      ['17','ESPACE DE L\'ARTISAN','Bâtiment en r+1 : rdc 6 ateliers, salle d\'exposition, café, crèche, espace de vente, bloc sanitaire et parking; à l\'étage 4 ateliers, salle d\'exposition, salle de formation, bureau, salle de réception, salle des réunions, salle de prière, débarras, bloc sanitaire','Artisanat','COMMUNE EL HAJEB','Conseil Provincial'],
      ['18','POLYCLINIQUE','Clinique, cuisine, réfectoire, buvette, laboratoire, pharmacie, par pharmacie, école d\'infirmière, centre de rééducation, service de radiologie, guérîte, espace vert, voirie, parkings et mur de clôture.','Services Divers','COMMUNE EL HAJEB','Haddou Oulassit'],
      ['19','OPÉRATION SOCIALE « JAWAHIR »','2500 logements sociaux','Habitat','COMMUNE AIN TAOUJDATE','Ahmed El Aïouaj'],
      ['20','LOTISSEMENT « RIAD SALAM »','116 lots d\'immeubles, 156 lots d\'habitats économiques, 78 lots de villas, 6 lots d\'équipements et 14 boutiques','Habitat','COMMUNE AIN TAOUJDATE','Larbi Harafi'],
      ['21','LOTISSEMENT « SALAM II »','150 lots d\'habitats économiques et 4 lots d\'équipements','Habitat','COMMUNE AIN TAOUJDATE','Société Al Oumrane'],
      ['22','LOTISSEMENT « AGDAL »','245 lots d\'habitats économiques et 4 lots d\'équipements','Habitat','COMMUNE AIN TAOUJDATE','Abdelouahed Massaoudi'],
      ['23','LOTISSEMENT « SAADIA »','60 lots d\'habitats économiques et 2 lots d\'équipements','Habitat','COMMUNE AIN TAOUJDATE','Abdelahad Berrada'],
      ['24','LOTISSEMENT « CHAMS »','60 lots d\'habitats économiques et 3 lots d\'équipements','Habitat','COMMUNE AIN TAOUJDATE','Société El Mabsout'],
      ['25','LOTISSEMENT « AMIRA »','34 lots d\'habitats économiques','Habitat','COMMUNE AIN TAOUJDATE','Ahmed Bouanouazan'],
      ['26','STATION D\'EPURATION','Station d\'épuration, 03 bassins anaérobies','BTP','COMMUNE LAQSIR','Commune Ain Taoujdate'],
      ['27','COMPLEXE D\'ANIMATION ET DE LOISIRS','Motel, 04 bungalows et annexes','Tourisme','COMMUNE AÏT NAAMANE','Société Mountazah Aït Naamane'],
      ['28','CENTRE SPORTIF, LUDIQUE ET RÉSIDENTIEL','Equipement en commun terrain de sport, piscine, café restaurant, centre commercial, motel, mosquée, chalets individuels, chalets jumelés, groupes résidentiels, espaces verts, voiries, parkings et clôture','Tourisme Loisirs Et Services','COMMUNE AÏT NAAMANE','Haddou Oulassi'],
      ['29','CONSTRUCTION D\'UN NOUVEAU SOUK HEBDOMADAIRE À LA CU D\'AIN','Locaux commerciaux et annexes','Commerce','COMMUNE DE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['30','EXTENSION DU CHATEAU ROSLANE / CRÉATION D\'UN CHAI / ENSEMBLE ÉCO TOURISTIQUE','Extension du château (capacité 110.00 hl), unité de conditionnement (30.000 bouteilles/heure), ensemble à vocation éco touristique de haut standing','Agro‑Industrie Et Tourisme','COMMUNE IQADDAR','Société Les Celliers De Meknès S.A'],
      ['31','CONSTRUCTION D\'UN HÔTEL CLUB','Accueil, centre de sensibilisation et de formation, parc zoologique, centre sportif, verger éducatif, restaurant, cafétéria, médiathèques, magasin pour produits bio, potager éducatif, jardin horticole, 20 bungalows, mosquée, buvette, vestiaires, piscines, kiosques, parkings, zone de triage des déchets, bassin de traitement des eaux usées et voies piétonnes','Agro‑Alimentaire Et Tourisme','COMMUNE IQADDAR','Société « Atlas Wallaki »'],
      ['32','STATION DE MONTE ÉQUINE','Accueil, bureaux, laboratoire, boxes, bloc sanitaire, carrière de détente, cour de monte, aire de lavage, quai de débarquement et mur de clôture','Agricole','COMMUNE IQADDAR','S.O.R.E.C'],
      ['33','CONSTRUCTION D\'UN CENTRE D\'APPEL','Centre d\'appel','Services Divers','COMMUNE EL HAJEB','Abou Ilham'],
      ['34','RÉALISATION D\'UN SOUK HEBDOMADAIRE A LA VILLE D\'EL HAJEB','Locaux commerciaux, aire à grains, souks ovins et caprins, souk bovin, boucheries et poissonneries, blocs sanitaires, blocs administratifs, logement gardien, clôture, café et restaurant','Commerce Et Services','COMMUNE EL HAJEB','Commune D\'El Hajeb'],
      ['35','RÉALISATION D\'UN CENTRE DE LOISIRS ET D\'UNE AIRE DE REP0S','2 cafés-restaurants, piscine, 06 bungalows en bois, parc de jeux pour enfants et annexes','Tourisme Et Services','COMMUNE AÏT BOURZOUINE','Société Aire De Repos Atlas Bladi SARL'],
      ['36','SOUK HEBDOMADAIRE À VILLE SABAA AYOUne','Locaux commerciaux, plateforme pour vente en gros et annexes','Commerce','COMMUNE SABAA AYOUne','Conseil Commune Sabaa Ayoune'],
      ['37','RÉALISATION D\'UN TERRAIN DE SPORT ET DÉPENDANCES','Terrain de sport, complexe commercial de 75 boutiques, une poissonnerie et annexe','Services Divers','COMMUNE D\'EL HAJEB','Commune D\'El Hajeb'],
      ['38','CONSTRUCTION D\'UN PROJET D\'HABITAT NOMMÉ « AL AMAL »','84 lots d\'habitat','Habitat','COMMUNE D\'EL HAJEB','Amicale Al Amal des fonctionnaires de la D.P.A d\'El Hajeb'],
      ['39','AMÉNAGEMENT DE L\'ESPACE VERT LONGEANT LA VOIRIE FERRE, LA PLACE DU 20 AOUT ET LA MAISON DES JEUNES','Aménagement espaces verts, revêtement sols, équipement bassin et arrosage, éclairage ...','Services Divers','COMMUNE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['40','CONSTRUCTION D\'UNE SALLE OMNISPORTS ET D\'UNE SALLE DE RÉUNION','Salle couverte avec dépendances, terrains de jeux en plein air et annexes','Services Divers','COMMUNE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['41','CONSTRUCTION D\'UNE BIBLIOTHÈQUE','Bibliothèque ...','Services Divers','COMMUNE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['42','RÉALISATION D\'UN LOTISSEMENT « LASSADAM »','Lotissement d\'habitat','Habitat','COMMUNE IQADDAR','Commune Iqaddar'],
      ['43','ÉCOLE PRIVÉE','Etablissement de 35 salles de classe, 02 salles informatiques et annexes','Enseignement','COMMUNE EL HAJEB','Société Frihab / Al Amana Sarl'],
      ['44','PROGRAMME IMMOBILIER NOMMÉ « AL KARAMA »','96 logements sociaux, 21 lots de villas','Habitat','COMMUNE EL HAJEB, PROVINCE D\'EL','Société Oumrane Meknès'],
      ['45','PROJET D\'ARBORICULTURE FRUITIÈRE','Laboratoire in vitro, chambre froide, parc à bois distribution sous label','Agro‑Industrie','COMMUNE SBAAAYOUNE','Ahmed Ismaili'],
      ['46','OPÉRATION « ERRÂHMA »','76 lots d\'habitats économiques et 20 lots d\'immeubles','Habitat','COMMUNE SABAA AYOUne','Commune Sabaa Ayoune'],
      ['47','OPÉRATION « DEVICO »','586 lots d\'habitats économiques, 945 lots de villas, 26 lots d\'immeubles et 131 lots industriels','Habitat','COMMUNE SABAA AYOUne','Société Devico'],
      ['48','SOUK HEBDOMADAIRE','Locaux commerciaux (boutiques)','Commerce','COMMUNE AGOURAI','Commune Agourai'],
      ['49','LOTISSEMENT « MANSOURI »','35 lots d\'habitats économiques et 1 lot d\'équipement','Habitat','COMMUNE AGOURAI','Société Dimassi Lakssas'],
      ['50','RÉGULARISATION DE LA SITUATION FONCIÈRE DU TERRAIN ABRITANT LE MARCHÉ DE ...','88 magasins, mosquée, frigo, hangar, balance, poste de police, sanitaire ...','Commerce','COMMUNE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['51','RÉGULARISATION FONCIÈRE DU TERRAIN ABRITANT LE MARCHÉ PILOTE','451 magasins, 32 magasins pour légumes, et annexe pour marchands ambulants','Commerce','COMMUNE AIN TAOUJDATE','Commune Ain Taoujdate'],
      ['52','LOTISSEMENT « ANNAKHIL »','4 tranches comprenant : 1183 lots économiques 504 logements sociaux et 8 lots d\'équipements','Habitat','COMMUNE LAQSIR','Société Devico / Isskanes'],
      ['53','RELOGEMENT, RESTRUCTURATION ET ÉQUIPEMENT DU DOUAR OUED N\'IA','Relogement, restructuration et équipement du douar','Bâtiment Et Travaux Publics','COMMUNE LAQSIR','Commune Laqsir'],
      ['54','LOTISSEMENT « AL WIFAK »','17 lots d\'habitats économiques','Habitat','COMMUNE AÏT BOUBIDMANE','Amicale Al Wifak'],
      ['55','AMÉNAGEMENT ET CONSTRUCTION D\'UNE FERME DE CHAMPICULTURE','Résidence principale, accueil, restauration, administration, gîte ruraux, chambres de culture paramétrées, unités de conditionnement et d\'emballage et unité de compostage','Agro‑Alimentaire','COMMUNE RURALE RAS IJJERRI','Société Saveurs D\'Orient Et Du Maghreb'],
      ['56','LOTISSEMENT « ANNAJATE »','46 lots d\'habitats économiques','Habitat','COMMUNE RAS IJJERRI','Amicale Annajate'],
    ],
  };

  const ar = {
    title:'بنك معطيات الاستثمارات – إقليم الحاجب',
    // legend removed per request
    cols:['#','طبيعة المشروع','مكونات المشروع','قطاع الاستثمار','موقع المشروع','صاحب المشروع'],
    rows:[
      ['1','تجزئة السكن الاجتماعي واد الذهب','122 قطعة سكن، روض أطفال، مركز تجاري، موقف، مساحة خضراء','سكن','جماعة الحاجب','جمعية واد الذهب'],
      ['2','مركب سوسيو تربوي وتجاري "ابتسامة"','مركز تجاري، قاعة متعددة، فضاء استقبال، مكاتب، مطعم بالطابق الأرضي','تجارة واجتماعي','جماعة الحاجب','المجلس الإقليمي للحاجب'],
      ['3','تسوية وتوسعة التعاونية اللبنية','تجهيزات للبناء و التهيئة والتسوية','صناعة غذائية','جماعة عين تاوجدات','تعاونية إنواسَر'],
      ['4','توسعة المركب الصناعي الفلاحي','بناء مخازن للحبوب وصوامع للتخزين','صناعة غذائية','جماعة عين تاوجدات','معامل زيوت سوس'],
      ['5','السوق المغطى "سويكة"','38 دكانا، قنوات لتصريف مياه الأمطار','تجارة','جماعة عين تاوجدات','جماعة عين تاوجدات'],
    ],
  };

  const t = isAr? ar: fr;

  const Table = ({cols,rows}) => (
    <div className="inv-scroll" role="region" aria-label={t.title}>
      <table className="inv-table responsive-table"><thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} data-label={cols[j]}>{c}</td>)}</tr>)}</tbody></table>
    </div>
  );

  return (
    <div className="inv-wrap" dir={dir}>
      <InvestissementsStyle dir={dir} />
  <header className="inv-hero fade-in"><h1>{t.title}</h1></header>
      <section className="inv-section fade-in">
        <h2>{isAr? 'جدول الاستثمارات' : 'Tableau des Investissements'}</h2>
        <Table cols={t.cols} rows={t.rows} />
      </section>
    </div>
  );
}

function InvestissementsStyle({dir}){return <style>{`
.inv-wrap{--green:#047857;--green-dark:#064e3b;--gold:#d4af37;--rad:1.4rem;--bg:linear-gradient(135deg,#ecfdf5,#ffffff 55%);max-width:1800px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.8rem) clamp(1rem,3.2vw,3.6rem) 4.5rem;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:var(--green-dark);}
.inv-hero{background:linear-gradient(100deg,#065f46,#089471);padding:1.9rem 1.6rem 2rem;border:1px solid #0d9b7644;border-radius:var(--rad);box-shadow:0 26px 60px -24px rgba(0,0,0,.35);text-align:center;margin-bottom:2.75rem;}
.inv-hero h1{margin:0;font-size:clamp(1.9rem,3.9vw,3.35rem);font-weight:800;letter-spacing:.045em;line-height:1.18;background:linear-gradient(115deg,#fff,#e0fbea 55%,#d1fae5);-webkit-background-clip:text;color:transparent;}
.legend{display:none;}
.inv-section{background:rgba(255,255,255,.78);border:1px solid #10b98140;padding:1.9rem 1.8rem 2.5rem;border-radius:var(--rad);box-shadow:0 28px 55px -22px rgba(0,0,0,.27);position:relative;overflow:hidden;backdrop-filter:blur(6px);}
.inv-section:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 22%,rgba(16,185,129,.18),transparent 65%),radial-gradient(circle at 85% 78%,rgba(16,185,129,.16),transparent 60%);mix-blend-mode:multiply;pointer-events:none;}
.inv-section h2{margin:0 0 1.6rem;font-size:clamp(1.35rem,2.5vw,2.25rem);font-weight:800;letter-spacing:.055em;color:var(--green-dark);text-transform:uppercase;display:flex;align-items:center;gap:.75rem;}
.inv-section h2:after{content:"";flex:1;height:3px;background:linear-gradient(90deg,var(--green-dark),#10b981 55%,transparent);border-radius:2px;}
.inv-scroll{overflow-x:auto;position:relative;--shadow:linear-gradient(to right,#ffffff,rgba(255,255,255,0));padding-bottom:.3rem;}
.inv-scroll:before,.inv-scroll:after{content:"";position:absolute;top:0;bottom:.3rem;width:40px;pointer-events:none;z-index:2;}
.inv-scroll:before{left:0;background:linear-gradient(to right,#ffffff,rgba(255,255,255,0));}
.inv-scroll:after{right:0;background:linear-gradient(to left,#ffffff,rgba(255,255,255,0));}
.inv-table{width:100%;border-collapse:collapse;font-size:clamp(.78rem,.9vw,.9rem);min-width:1280px;}
.inv-table th,.inv-table td{border:1px solid #0d9b9733;padding:.75rem .85rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;line-height:1.5;}
.inv-table th{background:linear-gradient(180deg,#047857,#036549);color:#fff;font-weight:700;font-size:.75rem;letter-spacing:.055em;position:sticky;top:0;z-index:1;}
.inv-table thead tr th:first-child{width:46px;text-align:center;}
.inv-table tbody td:first-child{font-weight:700;text-align:center;background:#ecfdf5;font-size:.74rem;}
.inv-table tbody tr:nth-child(even) td{background:#f5fffa;}
.inv-table tbody tr:hover td{background:#d1fae599;transition:.25s;}
.inv-table tbody td{background:#ffffff;font-weight:600;color:#063727;}
/* Card layout on narrow screens */
@media (max-width:900px){
  .inv-section{padding:1.55rem 1.1rem 2.1rem;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody{display:flex;flex-direction:column;gap:1rem;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.65rem;border:1px solid #10b98140;background:#fff;border-radius:1.2rem;padding:1rem .95rem;box-shadow:0 10px 28px -14px rgba(0,0,0,.25);}
  .responsive-table td{border:none!important;padding:.4rem .45rem;background:transparent!important;display:flex;flex-direction:column;gap:.25rem;font-size:.9rem;line-height:1.4;}
  .responsive-table td:before{content:attr(data-label);font-size:.74rem;font-weight:700;color:#047857;letter-spacing:.03em;opacity:.9;}
  .inv-table{min-width:0;font-size:.9rem;}
  .inv-table tbody td:first-child{font-size:.82rem;}
}
/* Extra large adjustments */
@media (min-width:1800px){
  .inv-wrap{max-width:2100px;}
  .inv-table{font-size:.95rem;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
