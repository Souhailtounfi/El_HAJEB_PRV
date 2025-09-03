import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Page: Banque de Données des Investissements (Province El Hajeb)
 */

export default function Investissements() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isAr = lang.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  // NOTE: Data sample extracted from provided capture (first rows only). Extend as needed.
  const fr = {
    title: "BANQUE DE DONNÉES DES INVESTISSEMENTS – PROVINCE EL HAJEB",
    // legend removed per request
    cols: [
      "#",
      "NATURE DU PROJET",
      "CONSISTANCE DU PROJET",
      "SECTEUR D'INVESTISSEMENT",
      "LOCALISATION DU PROJET",
      "PROMOTEUR DU PROJET",
    ],
    rows: [
      [
        "1",
        "LOTISSEMENT D'HABITAT SOCIAL « OUED EDDAHAB »",
        "122 lots d'habitat, garderie, centre commercial, parking, espace vert",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Amicale Oued Eddahab",
      ],
      [
        "2",
        "COMPLEXE SOCIOEDUCATIF ET COMMERCIAL « IBTISSAMA »",
        "centre commercial, salle polyvalente centre d'accueil, espace d'accueil, bureaux, restaurant au R.D.C,",
        "Commerce Et Social",
        "COMMUNE EL HAJEB",
        "Conseil Provincial D'el HAJEB",
      ],
      [
        "3",
        "REGULARISATION ET EXTENSION DE LA COOPERATIVE LAITIERE ENNASR",
        "équipements à construire, à aménager et à régulariser",
        "Agro-Industrie",
        "COMMUNE AIN TAOUJDATE",
        "Coopérative Annasr",
      ],
      [
        "4",
        "EXTENSION DU COMPLEXE AGRO-INDUSTRIEL",
        "construction de hangars de stockage des grains, silos de stockage",
        "Agro-Industrie",
        "COMMUNE AIN TAOUJDATE",
        "Société « Les Huileries Sous Belhassane »",
      ],
      [
        "5",
        "MARCHÉ COUVERT « SWIKA »",
        "38 boutiques, caniveaux pour évacuations des eaux de pluie",
        "Commerce",
        "COMMUNE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "6",
        "CONSTRUCTION ET AMENAGEMENT D'UN SOUK HEBDOMADAIRE AINTAOUJDATE",
        "aire à grains, souk de bétail, locaux pour bouchers et poissonniers, café restaurant, bloc sanitaire, bloc administratif, loge gardien,...",
        "Commerce",
        "COMMUNE AIN TAOUJDATE",
        "Cu Ain Taoujdate",
      ],
      [
        "7",
        "LOTISSEMENT D'HABITAT « FIRDAOUS »",
        "160 lots de recasement, 62 lots économiques, 03 lots d'équipements...",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Société Al Omrane",
      ],
      [
        "8",
        "LOTISSEMENT D'HABITAT « EL  YACOUT1 »",
        "414 lots économiques, 03 lots d'équipements",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Société Al Omrane",
      ],
      [
        "9",
        "LOTISSEMENT D'HABITAT « EL  YACOUT2 »",
        "538 lots économiques, 07 lots d'équipements",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Société Al Omrane",
      ],
      [
        "10",
        "LOTISSEMENT « OUM RBIE »",
        "213 lots économiques, 03 lots d'équipements",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Amicale El Khair",
      ],
      [
        "11",
        "LOTISSEMENT « AL KHADRAE »",
        "404 lots économiques, 04 lots d'équipements",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Mohamed Aliat Et Cts",
      ],
      [
        "12",
        "LOTISSEMENT « MALIKA »",
        "138 lots économiques, 04 lots d'équipements",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Zakaria El Yachaoui",
      ],
      [
        "13",
        "LOTISSEMENT « OUBIHI »",
        "49 lots économiques, 05 lots immeubles ,03 lots d'équipements",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Ste Amoyka",
      ],
      [
        "14",
        "LOTISSEMENT « CHIBA II »",
        "32 lots économiques",
        "Habitat",
        "COMMUNE EL HAJEB",
        "Ste Dalsam",
      ],
      [
        "15",
        "ACIMA",
        "hall de vente de 700m² station de services et galerie",
        "Commerce",
        "COMMUNE EL HAJEB",
        "Acima",
      ],
      [
        "16",
        "COMPLEXE RELIGIEUX ET CULTUREL",
        "accueil général colloques -conférence –complexe administratif-complexe religieux-centre de documentation et divers",
        "Services Divers",
        "COMMUNE EL HAJEB",
        "Ministère Des Habous Et Affaires Islamique",
      ],
      [
        "17",
        "ESPACE DE L’ARTISAN",
        "Bâtiment en r+1 comprenant au rdc : 6 ateliers, salle d’exposition, café, crèche, espace de vente, bloc sanitaire et parking à l’étage : 4 ateliers, salle d’exposition salle de formation, bureau, salle de réception salle des réunions, salle de prière, débarras et bloc sanitaire",
        "Artisanat",
        "COMMUNE EL HAJEB",
        "Conseil Provincial",
      ],
      [
        "18",
        "POLYCLINIQUE",
        "Clinique, cuisine, réfectoire, buvette, laboratoire, pharmacie, para pharmacie, école d’infirmerie, centre de rééducation, service de radiologie, guérite, espace vert, voirie, parkings et mur de clôture.",
        "Services Divers",
        "COMMUNE EL HAJEB",
        "Haddou Oulaasri",
      ],
      [
        "19",
        "OPERATION SOCIALE « JAWAHIR »",
        "2500 logements sociaux",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Ahmed El Ajouri",
      ],
      [
        "20",
        "LOTISSEMENT « RIAD SALAM »",
        "116 lots d’immeubles, 156 lots d’habitats économiques 78 lots de villas, 6 lots d’équipements et 14 boutiques",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Larbi Haraifi",
      ],
      [
        "21",
        "LOTISSEMENT « SALAM II »",
        "150 lots d'habitats économiques et 4 lots d'équipements",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Société Al Omrane",
      ],
      [
        "22",
        "LOTISSEMENT « AGDAL »",
        "245 lots d'habitats économiques et 4 lots d'équipements",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Abdelouahed Massaoudi",
      ],
      [
        "23",
        "LOTISSEMENT « SAADIA »",
        "60 lots d'habitats économiques et 2 lots d'équipements",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Abdelahad Berrada",
      ],
      [
        "24",
        "LOTISSEMENT « CHAMS »",
        "60 lots d'habitats économiques et 3 lots d'équipements",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Société El Mahssen",
      ],
      [
        "25",
        "LOTISSEMENT « AMIRA »",
        "34 lots d'habitats économiques",
        "Habitat",
        "COMMUNE AIN TAOUJDATE",
        "Ahmed Bouyaouzan",
      ],
      [
        "26",
        "STATION D'EPURATION",
        "Station d'épuration, 03 bassins anaérobies",
        "BTP",
        "COMMUNE LAQSIR",
        "Commune Ain Taoujdate",
      ],
      [
        "27",
        "COMPLEXE D'ANIMATION ET DE LOISIRS",
        "Motel, 04 bungalows et annexes",
        "Tourisme",
        "COMMUNE AÏT NAAMANE",
        "Société Mountazah Aït Naamane",
      ],
      [
        "28",
        "CENTRE SPORTIF, LUDIQUE ET RÉSIDENTIEL",
        "Equipement en commun terrain de sport, piscine, café restaurant, centre commercial, motel, mosquée, chalets individuels, chalets jumelés, groupes résidentiels, espaces verts, voiries, parkings et clôture",
        "Tourisme Loisirs Et Services",
        "COMMUNE AÏT NAAMANE",
        "Haddou Oulassi",
      ],
      [
        "29",
        "CONSTRUCTION D'UN NOUVEAU SOUK HEBDOMADAIRE À LA CU D'AIN",
        "Locaux commerciaux et annexes",
        "Commerce",
        "COMMUNE DE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "30",
        "EXTENSION DU CHATEAU ROSLANE / CRÉATION D'UN CHAI / ENSEMBLE ÉCO TOURISTIQUE",
        "Extension du château (capacité 110.00 hl), unité de conditionnement (30.000 bouteilles/heure), ensemble à vocation éco touristique de haut standing",
        "Agro‑Industrie Et Tourisme",
        "COMMUNE IQADDAR",
        "Société Les Celliers De Meknès S.A",
      ],
      [
        "31",
        "CONSTRUCTION D'UN HÔTEL CLUB",
        "Accueil, centre de sensibilisation et de formation, parc zoologique, centre sportif, verger éducatif, restaurant, cafétéria, médiathèques, magasin pour produits bio, potager éducatif, jardin horticole, 20 bungalows, mosquée, buvette, vestiaires, piscines, kiosques, parkings, zone de triage des déchets, bassin de traitement des eaux usées et voies piétonnes",
        "Agro‑Alimentaire Et Tourisme",
        "COMMUNE IQADDAR",
        "Société « Atlas Wallaki »",
      ],
      [
        "32",
        "STATION DE MONTE ÉQUINE",
        "Accueil, bureaux, laboratoire, boxes, bloc sanitaire, carrière de détente, cour de monte, aire de lavage, quai de débarquement et mur de clôture",
        "Agricole",
        "COMMUNE IQADDAR",
        "S.O.R.E.C",
      ],
      [
        "33",
        "CONSTRUCTION D'UN CENTRE D'APPEL",
        "Centre d'appel",
        "Services Divers",
        "COMMUNE EL HAJEB",
        "Abou Ilham",
      ],
      [
        "34",
        "RÉALISATION D'UN SOUK HEBDOMADAIRE A LA VILLE D'EL HAJEB",
        "Locaux commerciaux, aire à grains, souks ovins et caprins, souk bovin, boucheries et poissonneries, blocs sanitaires, blocs administratifs, logement gardien, clôture, café et restaurant",
        "Commerce Et Services",
        "COMMUNE EL HAJEB",
        "Commune D'El Hajeb",
      ],
      [
        "35",
        "RÉALISATION D'UN CENTRE DE LOISIRS ET D'UNE AIRE DE REP0S",
        "2 cafés-restaurants, piscine, 06 bungalows en bois, parc de jeux pour enfants et annexes",
        "Tourisme Et Services",
        "COMMUNE AÏT BOURZOUINE",
        "Société Aire De Repos Atlas Biladi SARL",
      ],
      [
        "36",
        "SOUK HEBDOMADAIRE À VILLE SABAA AYOUne",
        "Locaux commerciaux, plateforme pour vente en gros et annexes",
        "Commerce",
        "COMMUNE SABAA AYOUne",
        "Conseil Commune Sabaa Ayoune",
      ],
      [
        "37",
        "RÉALISATION D'UN TERRAIN DE SPORT ET DÉPENDANCES",
        "Terrain de sport, complexe commercial de 75 boutiques, une poissonnerie et annexe",
        "Services Divers",
        "COMMUNE D'EL HAJEB",
        "Commune D'El Hajeb",
      ],
      [
        "38",
        "CONSTRUCTION D'UN PROJET D'HABITAT NOMMÉ « AL AMAL »",
        "84 lots d'habitat",
        "Habitat",
        "COMMUNE D'EL HAJEB",
        "Amicale Al Amal des fonctionnaires de la D.P.A d'El Hajeb",
      ],
      [
        "39",
        "AMÉNAGEMENT DE L'ESPACE VERT LONGEANT LA VOIRIE FERRE, LA PLACE DU 20 AOUT ET LA MAISON DES JEUNES",
        "Aménagement espaces verts, revêtement sols, équipement bassin et arrosage, éclairage ...",
        "Services Divers",
        "COMMUNE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "40",
        "CONSTRUCTION D'UNE SALLE OMNISPORTS ET D'UNE SALLE DE RÉUNION",
        "Salle couverte avec dépendances, terrains de jeux en plein air et annexes",
        "Services Divers",
        "COMMUNE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "41",
        "CONSTRUCTION D'UNE BIBLIOTHÈQUE",
        "Bibliothèque ...",
        "Services Divers",
        "COMMUNE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "42",
        "RÉALISATION D'UN LOTISSEMENT « LASSADAM »",
        "Lotissement d'habitat",
        "Habitat",
        "COMMUNE IQADDAR",
        "Commune Iqaddar",
      ],
      [
        "43",
        "ÉCOLE PRIVÉE",
        "Etablissement de 35 salles de classe, 02 salles informatiques et annexes",
        "Enseignement",
        "COMMUNE EL HAJEB",
        "Société Frihab / Al Amana Sarl",
      ],
      [
        "44",
        "PROGRAMME IMMOBILIER NOMMÉ « AL KARAMA »",
        "96 logements sociaux, 21 lots de villas",
        "Habitat",
        "COMMUNE EL HAJEB, PROVINCE D'EL",
        "Société Oumrane Meknès",
      ],
      [
        "45",
        "PROJET D'ARBORICULTURE FRUITIÈRE",
        "Laboratoire in vitro, chambre froide, parc à bois distribution sous label",
        "Agro‑Industrie",
        "COMMUNE SBAAAYOUNE",
        "Ahmed Ismaili",
      ],
      [
        "46",
        "OPÉRATION « ERRÂHMA »",
        "76 lots d'habitats économiques et 20 lots d'immeubles",
        "Habitat",
        "COMMUNE SABAA AYOUne",
        "Commune Sabaa Ayoune",
      ],
      [
        "47",
        "OPÉRATION « DEVICO »",
        "586 lots d'habitats économiques, 945 lots de villas, 26 lots d'immeubles et 131 lots industriels",
        "Habitat",
        "COMMUNE SABAA AYOUne",
        "Société Devico",
      ],
      [
        "48",
        "SOUK HEBDOMADAIRE",
        "Locaux commerciaux (boutiques)",
        "Commerce",
        "COMMUNE AGOURAI",
        "Commune Agourai",
      ],
      [
        "49",
        "LOTISSEMENT « MANSOURI »",
        "35 lots d'habitats économiques et 1 lot d'équipement",
        "Habitat",
        "COMMUNE AGOURAI",
        "Société Dimasy Liliskane",
      ],
      [
        "50",
        "RÉGULARISATION DE LA SITUATION FONCIÈRE DU TERRAIN ABRITANT LE MARCHÉ DE ...",
        "88 magasins, mosquée, frigo, hangar, balance, poste de police, sanitaire ...",
        "Commerce",
        "COMMUNE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "51",
        "RÉGULARISATION FONCIÈRE DU TERRAIN ABRITANT LE MARCHÉ PILOTE",
        "451 magasins, 32 magasins pour légumes, et annexe pour marchands ambulants",
        "Commerce",
        "COMMUNE AIN TAOUJDATE",
        "Commune Ain Taoujdate",
      ],
      [
        "52",
        "LOTISSEMENT « ANNAKHIL »",
        "4 tranches comprenant : 1183 lots économiques 504 logements sociaux et 8 lots d'équipements",
        "Habitat",
        "COMMUNE LAQSIR",
        "Société Devico Isskane",
      ],
      [
        "53",
        "RELOGEMENT, RESTRUCTURATION ET ÉQUIPEMENT DU DOUAR OUED N'IA",
        "Relogement, restructuration et équipement du douar",
        "Bâtiment Et Travaux Publics",
        "COMMUNE LAQSIR",
        "Commune Laqsir",
      ],
      [
        "54",
        "LOTISSEMENT « AL WIFAK »",
        "17 lots d'habitats économiques",
        "Habitat",
        "COMMUNE AÏT BOUBIDMANE",
        "Amicale Al Wifak",
      ],
      [
        "55",
        "AMÉNAGEMENT ET CONSTRUCTION D'UNE FERME DE CHAMPICULTURE",
        "Résidence principale, accueil, restauration, administration, gîte ruraux, chambres de culture paramétrées, unités de conditionnement et d'emballage et unité de compostage",
        "Agro‑Alimentaire",
        "COMMUNE RURALE RAS IJJERRI",
        "Société Saveurs D'Orient Et Du Maghreb",
      ],
      [
        "56",
        "LOTISSEMENT « ANNAJATE »",
        "46 lots d'habitats économiques",
        "Habitat",
        "COMMUNE RAS IJJERRI",
        "Amicale Annajate",
      ],
    ],
  };

  const ar = {
    title: "بنك معطيات الاستثمارات – إقليم الحاجب",
    cols: [
      "#",
      "طبيعة المشروع",
      "مكونات المشروع",
      "قطاع الاستثمار",
      "موقع المشروع",
      "صاحب المشروع",
    ],
    rows: [
      [
        "1",
        'تجزئة السكن الاجتماعي "واد الذهب"',
        "122 قطعة سكنية، روضة أطفال، مركز تجاري، موقف سيارات، مساحة خضراء",
        "السكن",
        "جماعة الحاجب",
        "جمعية واد الذهب",
      ],
      [
        "2",
        'مركب سوسيو تربوي وتجاري "ابتسامة"',
        "مركز تجاري، قاعة متعددة الاستعمالات، مركز استقبال، مكاتب، مطعم بالطابق الأرضي",
        "تجارة واجتماعي",
        "جماعة الحاجب",
        "المجلس الإقليمي للحاجب",
      ],
      [
        "3",
        'تسوية وتوسعة التعاونية اللبنية "إنواسَر"',
        "تجهيزات للبناء، تهيئة وتسوية",
        "الصناعات الغذائية",
        "جماعة عين تاوجدات",
        "تعاونية إنواسَر",
      ],
      [
        "4",
        "توسعة المركب الصناعي الفلاحي",
        "بناء مخازن للحبوب وصوامع للتخزين",
        "الصناعات الغذائية",
        "جماعة عين تاوجدات",
        "شركة معاصر زيوت سوس",
      ],
      [
        "5",
        'السوق المغطى "سويكة"',
        "38 دكاناً، قنوات لتصريف مياه الأمطار",
        "تجارة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "6",
        "بناء وتهيئة سوق أسبوعي",
        "ساحة للحبوب، سوق للماشية، محلات للجزارة والأسماك، مقهى ومطعم، مرافق صحية، إدارة، سكن للحارس...",
        "تجارة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "7",
        'تجزئة السكن "فردوس"',
        "160 قطعة إعادة إسكان، 62 قطعة اقتصادية، 3 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "شركة العمران",
      ],
      [
        "8",
        'تجزئة السكن "الياقوت 1"',
        "414 قطعة اقتصادية، 3 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "شركة العمران",
      ],
      [
        "9",
        'تجزئة السكن "الياقوت 2"',
        "538 قطعة اقتصادية، 7 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "شركة العمران",
      ],
      [
        "10",
        'تجزئة "أم ريب"',
        "213 قطعة اقتصادية، 3 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "جمعية الخير",
      ],
      [
        "11",
        'تجزئة "الخضراء"',
        "404 قطعة اقتصادية، 4 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "محمد العايت وشركاؤه",
      ],
      [
        "12",
        'تجزئة "مليكة"',
        "138 قطعة اقتصادية، 4 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "زكريا اليعشوي",
      ],
      [
        "13",
        'تجزئة "أوبي"',
        "49 قطعة اقتصادية، 5 قطع عمارات، 3 قطع تجهيزات",
        "السكن",
        "جماعة الحاجب",
        "شركة أموقة",
      ],
      [
        "14",
        'تجزئة "شيبة 2"',
        "32 قطعة اقتصادية",
        "السكن",
        "جماعة الحاجب",
        "شركة دلسام",
      ],
      [
        "15",
        "أسواق عَسِيمَا",
        "قاعة بيع 700م²، محطة خدمات ومعرض",
        "تجارة",
        "جماعة الحاجب",
        "عسِيمَا",
      ],
      [
        "16",
        "مركب ديني وثقافي",
        "استقبال عام، ندوات، مؤتمرات، إدارة، مركب ديني، مركز توثيق وغيرها",
        "خدمات متنوعة",
        "جماعة الحاجب",
        "وزارة الأوقاف والشؤون الإسلامية",
      ],
      [
        "17",
        "فضاء الحرفي",
        "مبنى من طابقين: الطابق الأرضي 6 ورشات، قاعة عرض، مقهى، حضانة، فضاء بيع، مرافق صحية، موقف سيارات؛ الطابق العلوي 4 ورشات، قاعة عرض، قاعة تكوين، مكتب، قاعة استقبال، قاعة اجتماعات، قاعة صلاة، مستودع، مرافق صحية",
        "حرف يدوية",
        "جماعة الحاجب",
        "المجلس الإقليمي",
      ],
      [
        "18",
        "مصحة متعددة التخصصات",
        "مصحة، مطبخ، قاعة طعام، مقصف، مختبر، صيدلية، مدرسة ممرضين، مركز إعادة تأهيل، قسم الأشعة، حراسة، مساحة خضراء، طرق، مواقف سيارات وسور",
        "خدمات متنوعة",
        "جماعة الحاجب",
        "حدو أولاسيت",
      ],
      [
        "19",
        'عملية اجتماعية "جواهر"',
        "2500 سكن اجتماعي",
        "السكن",
        "جماعة عين تاوجدات",
        "أحمد العيوج",
      ],
      [
        "20",
        'تجزئة "رياض السلام"',
        "116 قطعة عمارات، 156 قطعة سكن اقتصادي، 78 قطعة فيلات، 6 قطع تجهيزات و14 محل تجاري",
        "السكن",
        "جماعة عين تاوجدات",
        "العربي حرافي",
      ],
      [
        "21",
        'تجزئة "سلام 2"',
        "150 قطعة سكن اقتصادي و4 قطع تجهيزات",
        "السكن",
        "جماعة عين تاوجدات",
        "شركة العمران",
      ],
      [
        "22",
        'تجزئة "أكدال"',
        "245 قطعة سكن اقتصادي و4 قطع تجهيزات",
        "السكن",
        "جماعة عين تاوجدات",
        "عبد الواحد مسعودي",
      ],
      [
        "23",
        'تجزئة "السعدية"',
        "60 قطعة سكن اقتصادي و2 تجهيزات",
        "السكن",
        "جماعة عين تاوجدات",
        "عبد الأحد برادة",
      ],
      [
        "24",
        'تجزئة "شمس"',
        "60 قطعة سكن اقتصادي و3 تجهيزات",
        "السكن",
        "جماعة عين تاوجدات",
        "شركة المبسوط",
      ],
      [
        "25",
        'تجزئة "أميرة"',
        "34 قطعة سكن اقتصادي",
        "السكن",
        "جماعة عين تاوجدات",
        "أحمد بوعنوزان",
      ],
      [
        "26",
        "محطة معالجة المياه",
        "محطة معالجة، 3 أحواض لاهوائية",
        "البناء والأشغال العمومية",
        "جماعة القصير",
        "جماعة عين تاوجدات",
      ],
      [
        "27",
        "مركب ترفيهي وسياحي",
        "موتيل، 4 بنغالو وملحقاتها",
        "سياحة",
        "جماعة آيت نعمان",
        "شركة منتزه آيت نعمان",
      ],
      [
        "28",
        "مركز رياضي وترفيهي وسكني",
        "تجهيزات مشتركة: ملعب رياضي، مسبح، مقهى، مركز تجاري، موتيل، مسجد، شاليهات فردية ومزدوجة، مجموعات سكنية، مساحات خضراء، طرق، مواقف سيارات وسياج",
        "سياحة وترفيه وخدمات",
        "جماعة آيت نعمان",
        "حدو أولاسي",
      ],
      [
        "29",
        "بناء سوق أسبوعي جديد بجماعة عين تاوجدات",
        "محلات تجارية وملحقاتها",
        "تجارة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "30",
        "توسعة قصر روسلان / إنشاء قبو / مجمع سياحي بيئي",
        "توسعة القصر (سعة 110.000 هكتوليتر)، وحدة تعبئة (30.000 زجاجة/ساعة)، مجمع سياحي بيئي عالي المستوى",
        "صناعة غذائية وسياحة",
        "جماعة إقادار",
        "شركة أقبية مكناس",
      ],
      [
        "31",
        "بناء نادي فندقي",
        "استقبال، مركز توعية وتكوين، حديقة حيوانات، مركز رياضي، بستان تعليمي، مطعم، مقصف، مكتبات، متجر منتجات عضوية، حديقة خضروات تعليمية، حديقة نباتية، 20 بنغالو، مسجد، مقصف، غرف تبديل ملابس، مسابح، أكشاك، مواقف سيارات، منطقة فرز النفايات، حوض معالجة المياه العادمة ومسارات للمشاة",
        "صناعات غذائية وسياحة",
        "جماعة إقادار",
        "شركة أطلس ولاكي",
      ],
      [
        "32",
        "محطة تربية الخيول",
        "استقبال، مكاتب، مختبر، صناديق، مرافق صحية، ساحة استرخاء، ساحة تزاوج، منطقة غسيل، رصيف تفريغ وسور",
        "زراعة",
        "جماعة إقادار",
        "سوريك",
      ],
      [
        "33",
        "بناء مركز للاتصال",
        "مركز اتصال",
        "خدمات متنوعة",
        "جماعة الحاجب",
        "أبو إلهام",
      ],
      [
        "34",
        "إنجاز سوق أسبوعي بمدينة الحاجب",
        "محلات تجارية، ساحة للحبوب، أسواق للأغنام والماعز، سوق للأبقار، محلات جزارة وأسماك، مرافق صحية، إدارة، سكن للحارس، سياج، مقهى ومطعم",
        "تجارة وخدمات",
        "جماعة الحاجب",
        "جماعة الحاجب",
      ],
      [
        "35",
        "إنجاز مركز ترفيهي ومنطقة استراحة",
        "مقهيان-مطعمان، مسبح، 6 بنغالو خشبي، حديقة ألعاب للأطفال وملحقاتها",
        "سياحة وخدمات",
        "جماعة آيت بورزوين",
        "شركة منطقة استراحة أطلس بلادي",
      ],
      [
        "36",
        "سوق أسبوعي بمدينة سبع عيون",
        "محلات تجارية، منصة للبيع بالجملة وملحقاتها",
        "تجارة",
        "جماعة سبع عيون",
        "مجلس جماعة سبع عيون",
      ],
      [
        "37",
        "إنجاز ملعب رياضي وملحقاته",
        "ملعب رياضي، مجمع تجاري يضم 75 محلاً، محل أسماك وملحق",
        "خدمات متنوعة",
        "جماعة الحاجب",
        "جماعة الحاجب",
      ],
      [
        "38",
        'بناء مشروع سكني "الأمل"',
        "84 قطعة سكنية",
        "السكن",
        "جماعة الحاجب",
        "جمعية الأمل لموظفي المديرية الإقليمية للفلاحة بالحاجب",
      ],
      [
        "39",
        "تهيئة المساحة الخضراء المحاذية للطريق الحديدي وساحة 20 غشت ودار الشباب",
        "تهيئة المساحات الخضراء، تغطية الأرضيات، تجهيز الحوض والري، الإنارة ...",
        "خدمات متنوعة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "40",
        "بناء قاعة رياضية متعددة الاستعمالات وقاعة اجتماعات",
        "قاعة مغطاة بملحقاتها، ملاعب في الهواء الطلق وملحقاتها",
        "خدمات متنوعة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "41",
        "بناء مكتبة",
        "مكتبة ...",
        "خدمات متنوعة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "42",
        'إنجاز تجزئة "لسعدام"',
        "تجزئة سكنية",
        "السكن",
        "جماعة إقادار",
        "جماعة إقادار",
      ],
      [
        "43",
        "مدرسة خاصة",
        "مؤسسة تضم 35 قاعة دراسية، قاعتين للمعلوميات وملحقات",
        "تعليم",
        "جماعة الحاجب",
        "شركة فريهاب / الأمانة",
      ],
      [
        "44",
        'برنامج عقاري "الكرامة"',
        "96 سكن اجتماعي، 21 قطعة فيلات",
        "السكن",
        "جماعة الحاجب، إقليم الحاجب",
        "شركة العمران مكناس",
      ],
      [
        "45",
        "مشروع غراسة الأشجار المثمرة",
        "مختبر زراعة الأنسجة، غرفة تبريد، ساحة توزيع الأخشاب بعلامة تجارية",
        "الصناعات الغذائية",
        "جماعة سبع عيون",
        "أحمد إسماعيلي",
      ],
      [
        "46",
        'عملية "الرحمة"',
        "76 قطعة سكن اقتصادي و20 قطعة عمارات",
        "السكن",
        "جماعة سبع عيون",
        "جماعة سبع عيون",
      ],
      [
        "47",
        'عملية "ديفيكو"',
        "586 قطعة سكن اقتصادي، 945 قطعة فيلات، 26 قطعة عمارات و131 قطعة صناعية",
        "السكن",
        "جماعة سبع عيون",
        "شركة ديفيكو",
      ],
      [
        "48",
        "سوق أسبوعي",
        "محلات تجارية (بوتيكات)",
        "تجارة",
        "جماعة أكوراي",
        "جماعة أكوراي",
      ],
      [
        "49",
        'تجزئة "منصوري"',
        "35 قطعة سكن اقتصادي وقطعة تجهيزات واحدة",
        "السكن",
        "جماعة أكوراي",
        "شركة دماسي لكساس",
      ],
      [
        "50",
        "تسوية الوضعية العقارية للأرض التي تحتضن السوق ...",
        "88 محلاً، مسجد، ثلاجة، مستودع، ميزان، مركز شرطة، مرافق صحية ...",
        "تجارة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "51",
        "تسوية عقارية للأرض التي تحتضن السوق النموذجي",
        "451 محلاً، 32 محلاً للخضر، وملحق للبائعين المتجولين",
        "تجارة",
        "جماعة عين تاوجدات",
        "جماعة عين تاوجدات",
      ],
      [
        "52",
        'تجزئة "النخيل"',
        "4 مراحل تضم: 1183 قطعة اقتصادية، 504 سكن اجتماعي و8 قطع تجهيزات",
        "السكن",
        "جماعة القصير",
        "شركة ديفيكو / إسكانس",
      ],
      [
        "53",
        "إعادة إسكان وهيكلة وتجهيز دوار واد نيا",
        "إعادة إسكان، هيكلة وتجهيز الدوار",
        "البناء والأشغال العمومية",
        "جماعة القصير",
        "جماعة القصير",
      ],
      [
        "54",
        'تجزئة "الوفاق"',
        "17 قطعة سكن اقتصادي",
        "السكن",
        "جماعة آيت بوبيدمان",
        "جمعية الوفاق",
      ],
      [
        "55",
        "تهيئة وبناء مزرعة فطر",
        "سكن رئيسي، استقبال، مطعم، إدارة، إقامة ريفية، غرف زراعة مجهزة، وحدات تعبئة وتغليف ووحدة كمبوست",
        "الصناعات الغذائية",
        "جماعة راس اجيري",
        "شركة نكهات الشرق والمغرب",
      ],
      [
        "56",
        'تجزئة "النجاة"',
        "46 قطعة سكن اقتصادي",
        "السكن",
        "جماعة راس اجيري",
        "جمعية النجاة",
      ],
    ],
  };

  const t = isAr ? ar : fr;

  const Table = ({ cols, rows }) => (
    <div className="inv-scroll" role="region" aria-label={t.title}>
      <table className="inv-table responsive-table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} data-label={cols[j]}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="inv-wrap" dir={dir}>
      <InvestissementsStyle dir={dir} />
      <header className="inv-hero fade-in">
        <h1>{t.title}</h1>
      </header>
      <section className="inv-section fade-in">
        <h2>{isAr ? "جدول الاستثمارات" : "Tableau des Investissements"}</h2>
        <Table cols={t.cols} rows={t.rows} />
      </section>
    </div>
  );
}

function InvestissementsStyle({ dir }) {
  return (
    <style>{`
.inv-wrap{--green:#047857;--green-dark:#064e3b;--gold:#d4af37;--rad:1.4rem;--bg:linear-gradient(135deg,#ecfdf5,#ffffff 55%);max-width:1800px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.8rem) clamp(1rem,3.2vw,3.6rem) 4.5rem;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:var(--green-dark);}
.inv-hero{background:linear-gradient(100deg,#065f46,#089471);padding:1.9rem 1.6rem 2rem;border:1px solid #0d9b7644;border-radius:var(--rad);box-shadow:0 26px 60px -24px rgba(0,0,0,.35);text-align:center;margin-bottom:2.75rem;}
.inv-hero h1{margin:0;font-size:clamp(1.9rem,3.9vw,3.35rem);font-weight:800;letter-spacing:.045em;line-height:1.18;background:linear-gradient(115deg,#fff,#e0fbea 55%,#d1fae5);-webkit-background-clip:text;color:transparent;}
.legend{display:none;}
  .inv-section{background:rgba(255,255,255,.78);border:1px solid #10b98140;padding:1.9rem 1.8rem 2.5rem;border-radius:var(--rad);box-shadow:0 28px 55px -22px rgba(0,0,0,.27);position:relative;overflow:hidden;}
.inv-section:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 22%,rgba(16,185,129,.18),transparent 65%),radial-gradient(circle at 85% 78%,rgba(16,185,129,.16),transparent 60%);mix-blend-mode:multiply;pointer-events:none;}
.inv-section h2{margin:0 0 1.6rem;font-size:clamp(1.35rem,2.5vw,2.25rem);font-weight:800;letter-spacing:.055em;color:var(--green-dark);text-transform:uppercase;display:flex;align-items:center;gap:.75rem;}
.inv-section h2:after{content:"";flex:1;height:3px;background:linear-gradient(90deg,var(--green-dark),#10b981 55%,transparent);border-radius:2px;}
  .inv-scroll{overflow-x:auto;position:relative;padding-bottom:.3rem;}
.inv-table{width:100%;border-collapse:collapse;font-size:clamp(.78rem,.9vw,.9rem);min-width:1280px;}
.inv-table th,.inv-table td{border:1px solid #0d9b9733;padding:.75rem .85rem;text-align:${
      dir === "rtl" ? "right" : "left"
    };vertical-align:top;line-height:1.5;}
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
`}</style>
  );
}
