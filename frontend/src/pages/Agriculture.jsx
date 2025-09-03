import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import agr1 from '../assets/agr1.png';
import agr2 from '../assets/agr2.png';
import agr3 from '../assets/agr3.png';
import agr4 from '../assets/agr4.png';
import agr5 from '../assets/agr5.png';
import agr6 from '../assets/agr6.png';

/* Agriculture Page
*/

export default function Agriculture(){
  const { i18n } = useTranslation();
  const lang = i18n.language; const isAr = lang.startsWith('ar'); const dir = isAr? 'rtl':'ltr';
  useEffect(()=>{ document.documentElement.dir = dir; },[dir]);

  const fr = {
    title:'AGRICULTURE',
    intro:[
      "Par son étendue géographique, la Province d'EL HAJEB dispose d'importantes potentialités agricoles qui font d'elle une région agricole par excellence. En effet le rôle principal de l'agriculture qui présente une production végétale, animale et forestière très diversifiée constitue une plateforme de développement des industries agro-alimentaires.",
      "La Province est constituée de grandes étendues de plaines caractérisées par des sols profonds et fertiles, d'un climat favorable sur la majeure partie des terres, un potentiel d'irrigation appréciable et d'importantes ressources humaines (main-d’œuvre qualifiée). Ce qui éveille la convoitise des agriculteurs et les investisseurs.",
      "Ces potentialités naturelles demeurent sous exploitées et faiblement valorisées comparativement à la demande accrue en produits agricoles  au niveau de notre région et celles avoisinantes."
    ],
    landTitle:'Répartition du foncier',
    landCols:['STATUT JURIDIQUE','SUPERFICIE (HA)'],
    landRows:[['Melk','118.535'],['Collectif','32.418'],['Réforme agraire','23.675'],['Domaines de l’État','47.150'],['Habous','56']],
    landTotal:['TOTAL','221.834'],
    vegTitle:'Production végétale',
    vegBullets:[
      "La Province d'EL HAJEB compte 221.833 ha de terres réparties comme suit:",
      "• Superficie Agricole Utile (SAU) : 150.000 ha dont 32.000 ha irrigués et 118.000 ha Bour.",
      "• Parcours : 38.833 ha",
      "• Incultes : 5.500 ha",
      "• Forêts : 33.000 ha"
    ],
    soilProdTitle:"Occupation du sol et production (Moyenne des cinq dernières campagnes agricoles)",
    soilCols:['PRODUCTION VEGETALE','OCCUPATION DU SOL (HA)','PRODUCTION (T)'],
    soilRows:[
      ['CULTURE OLEAGINEUSE','1000','717.5'],
      ['MARAICHAGE','12.000','346721'],
      ['CULTURE FOURRAGERE','10240','80790'],
      ['LEGUMINEUSES','8460','6006'],
      ['CEREALES','70000','2450000'],
      ['VIGNES (RAISIN DE TABLE)','12000','60000'],
      ['AMANDIER','2909','15604'],
      ['POMMIER/PECHER/NECTARINIER','2800','48627 (UNIQUEMENT LES POMMES)'],
      ['OLIVIER','11.000','22000'],
      ['AUTRES','6948','78344']
    ],
    farmSizeTitle:'Taille des exploitations',
    farmCols:['TAILLE','NOMBRE D’AGRICULTEURS','%','SUPERFICIE EN HA','%'],
    farmRows:[
      ['0-5 HA','6143','45','14.600','10'],
      ['5-10 HA','3617','26,5','21.900','15'],
      ['10-20 HA','2252','16,5','27.700','19'],
      ['20-50 HA','1229','9','30.700','21'],
      ['50-100 HA','273','2','14.600','10'],
      ['> 100 HA','136','1','36.500','25']
    ],
    farmTotal:['TOTAL','13650','100','146000','100'],
    legTitle:'Légumineuses',
    legCols:['PRINCIPALES CULTURES','SUPERFICIE (HA)','PRODUCTION MOY (QX)','RENDEMENT MOY. (QX/HA)'],
    legRows:[
      ['FEVES','6.500','65.000','10'],
      ['LENTILLES','1.500','12.000','8'],
      ['POIS-CHICHES','800','6.400','8'],
      ['AUTRES','200','1.400','-']
    ],
    legTotal:['TOTAL','9.000','84.800','-'],
    fodderTitle:'Cultures fourragères',
    fodderCols:['CULTURES','SUPERFICIE (HA)','RENDEMENT MOYEN (QX/HA)'],
    fodderRows:[
      ['AVOINE','5000','60'],
      ['ORGE FOURRAGER','3200','80'],
      ['BERSIM','450','250'],
      ['LUZERNE','50','400'],
      ['MAÏS FOURRAGER','200','260'],
      ['MELANGE FOURRAGER','555','70'],
      ['AUTRES','1045','-']
    ],
    fodderTotal:['TOTAL','10500','1120'],
    maraichTitle:'Cultures maraîchères',
    maraichCols:['ESPECES','SUPERFICIE (HA)','RENDEMENT (QX/HA)'],
    maraichRows:[
      ['OIGNONS','6000','600'],
      ['POMME DE TERRE','5000','350'],
      ['CAROTTES','250','300'],
      ['AUTRES','1950','-']
    ],
    maraichTotal:['TOTAL','12200','1150'],
    arborTitle:'Arboriculture',
    arborIntro:"Les plantations fruitières, avec 15 % de la S.A.U se situent en deuxième lieu après les céréales et offrent des possibilités notables pour une meilleure valorisation de ces fruits.",
    arborCols:['PRINCIPALES PLANTATIONS','SUPERFICIE PRODUCTIVE (HA)'],
    arborRows:[
      ['OLIVIER','6340'],
      ['VIGNE DE TABLE','1185'],
      ['VIGNE DE PRODUCTION DE VIN','4864'],
      ['POMMIER','1800'],
      ['PRUNIER','967'],
      ['AMANDIER','2810'],
      ['POIRIER','435'],
      ['PECHER NECTARINIER','764'],
      ['AUTRES','2835']
    ],
    arborTotal:['TOTAL','22000'],
    unitsTitle:'Unités de transformation des matières premières agricoles',
    unitsOlivierCols:['L’UNITE','CADRE DE REALISATION','LOCALISATION','CAPACITE','ETAT DE FONCTIONNEMENT','TONNAGE TRAITE'],
    unitsOlivierRows:[
      ['1','PILIER II','COOPÉRATIVE IDRISSIA, CR SEBT JAHJOUH','200 KG/H','BON','140 T'],
      ['2','FOND DE DEVELOPPEMENT AGRICOLE(FDA)','CR LAQSIR','60 T/J','BON','2400 T'],
      ['3','FDA','CR AIT HARZELLAH','84 T/J','BON','3500 T'],
      ['4','FDA','CR LAQSIR','2,5 T/H','BON','1500 T'],
      ['5','FDA','CERCLE AIN TAOUJDATE','6 T/H','BON','1600 T']
    ],
    unitsPrunierCols:['L’UNITE','CADRE DE REALISATION','LOCALISATION','CAPACITE','ETAT DE FONCTIONNEMENT','TONNAGE TRAITE'],
    unitsPrunierRows:[
      ['1','FDA','CR LAQSIR','FRIGO : 2970 M3','BON','650 T (prunes de table)'],
      ['2','FDA','CR LAQSIR','UNITE DE CONDITIONNEMENT : 2 T/H','BON','600 T (pruneaux secs)']
    ],
    unitsAilCols:['L’UNITE','CADRE DE REALISATION','LOCALISATION','CAPACITE','ETAT DE FONCTIONNEMENT','TONNAGE TRAITE'],
    unitsAilRows:[
      ['1','FDA','CR LAQSIR','UNITE DE CONDITIONNEMENT : 2 T/H','BON','50 T']
    ],
    unitsPommierCols:['L’UNITE','CADRE DE REALISATION','LOCALISATION','CAPACITE','ETAT DE FONCTIONNEMENT','TONNAGE TRAITE'],
    unitsPommierRows:[
      ['1','FDA','CR AIT BOURZOUINE','1ER FRIGO : 4838 M3','BON','1000 T'],
      ['1','FDA','CR AIT BOURZOUINE','2EME FRIGO : 4500 M3','BON','800 T'],
      ['2','FDA','CR AIT BOUBIDMANE','FRIGO : 4836 M3','BON','1000 T'],
      ['3','FDA','CR IQADAR','FRIGO : 4984 M3','BON','2000 T'],
      ['4','FDA','CR AIT HARZELLAH','FRIGO : 4868 M3','BON','600 T'],
      ['5','FDA','CERCLE AIN TAOUJDATE','1ER FRIGO : 4500 M3','BON','1000 T'],
      ['5','FDA','CERCLE AIN TAOUJDATE','2EME FRIGO : 5177 M3','BON','1000 T'],
      ['6','FDA','CR AIT BOUBIDMANE','1ER FRIGO : 4883 M3','BON','1000 T'],
      ['6','FDA','CR AIT BOUBIDMANE','2EME FRIGO : 4898 M3','BON','1000 T'],
      ['7','FDA','CR BITIT','FRIGO : 3072 M3','BON','600 T'],
      ['8','FDA','CR IQADAR','FRIGO : 2080 M3','BON','440 T'],
      ['9','FDA','CR AIT HARZELLAH','FRIGO : 9000 M3','BON','4600 T'],
      ['10','FDA','CR AIT YAAZEM','FRIGO : 4329 M3','BON','400 T'],
      ['11','FDA','CR AIT HARZELLAH','FRIGO : 7900 M3','EN PANNE ACTUELLEMENT','-'],
      ['12','FDA','CR LAQSIR','FRIGO : 6541 M3','BON','']
    ],
    animalTitle:'Production animale',
    herdTitle:'Taille du cheptel : moyenne des cinq dernières campagnes',
    herdCols:['EFFECTIFS','NOMBRE'],
    herdRows:[
      ['RUCHES','1500'],
      ['CAMELINS','0'],
      ['BOVINS','32000'],
      ['CAPRINS','20000'],
      ['OVINS','330.000'],
      ['EQUIDES','5571']
    ],
    herdLegend:'Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »',
    herdText:`L'élevage dans la Province est dominé par les ovins en élevage intensif. Il doit son développement à l’existence de vastes étendues de parcours collectifs et forestiers. Les caprins occupent aussi une place de choix vu les habitudes culinaires des habitants de la province de plus la chair de ces derniers est très appréciée par les diabétiques.`,
    prodTitle:'Production : moyenne des cinq dernières campagnes (en tonnes)',
    prodCols:['PRODUCTION','PRODUCTION (T)'],
    prodRows:[
      ['MIEL','150'],
      ['LAINE','123.65'],
      ['VIANDE ROUGE','803.64'],
      ['VIANDE BLANCHE','4304.80']
    ],
    prodLegend:'Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »',
    prodText:`La production laitière est estimée à 28 millions de litres par an.`,
    apicultureText:`A l'échelle de la Province, la production de miel est non négligeable totalisant ainsi 19.8 tonnes. Cette collecte demeure néanmoins insuffisante malgré la bonne qualité de ce produit qui constitue un créneau très rentable.
La cuniculture est actuellement conduite à petites échelles et s’avère très porteuse.`,
    coopTitle:'Coopératives et associations agricoles',
    coopCols:['NATURE','NOMBRE D’ORGANISATIONS','NOMBRE D’ADHERENTS'],
    coopRows:[
      ['COOPERATIVES REFORME AGRAIRE','60','1883'],
      ['COOPERATIVES HORS REFORME AGRAIRE','20','675'],
      ['ASSOCIATIONS PROFESSIONNELLES','19','901'],
      ['ASSOCIATION USAGEE EAU AGRICOLE','20','1619'],
      ['GROUPE D’INTERET ECO-AGRICOLE','01','120'],
      ['ASSOCIATIONS DIVERS','03','200']
    ],
    coopLegend:'Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »',
    coopText:`60 coopératives de réforme Agraire dont une pastorale englobent 23.850 ha, réparties sur 1883 bénéficiaires.`,
    opportunitiesTitle:'Opportunités d\'investissement',
    opportunities:[
      "Unités d'engraissement ovins & caprins", 'Création de nouvelles huileries & conserveries','Valorisation oignon & pomme de terre (froid)','Production de plants (rosacées, vigne)','Unités apicoles modernes + valorisation des essaims','Valorisation sous-produit de la vinification (anthocyanes)','Unités de distillation PAM (plantes aromatiques & médicinales)','Création de pépinières (dindonneaux)','Valorisation production viticole (conditionnement & labels)'
    ]
  };
  const ar = {
    title:'الفلاحة',
    intro:[
      'يتوفر إقليم الحاجب على مؤهلات فلاحية مهمة تجعله منطقة فلاحية بامتياز.',
      'سهول واسعة خصبة، مناخ ملائم، إمكانيات ري معتبرة ويد عاملة مؤهلة.',
      'هذه المؤهلات لا تزال مستغلة جزئيا مقارنة بالطلب المتزايد على المنتجات الفلاحية.'
    ],
    landTitle:'توزيع الأراضي', landCols:['الوضعية القانونية','المساحة (هكتار)'], landRows:[['ملك','118.535'],['جماعي','32.418'],['إصلاح زراعي','23.675'],['أملاك الدولة','47.150'],['حبوس','56']], landTotal:['المجموع','221.834'],
    vegTitle:'الإنتاج النباتي', vegBullets:['المساحة الزراعية المستعملة 150000 هكتار (32000 مسقية)','مراعي 38833 هكتار','بور و أراضي غير مزروعة 5500 هكتار','غابات 35000 هكتار'],
    soilProdTitle:'استعمال الأرض و الإنتاج (متوسط 4 مواسم)', soilCols:['إنتاج نباتي','المساحة (هكتار)','الإنتاج (طن)'], soilRows:[['زيتيات','1000','717.5'],['خضروات','12000','346721'],['أعلاف','10240','90790'],['بقوليات','8460','6806'],['حبوبات','70000','2450000'],['كروم مائدة','12000','50000'],['لوز','2999','16604'],['تفاح/خوخ/نكتارين','2800','48627 (تفاح)'],['زيتون','11000','22000'],['أخرى','6948','78344']],
    farmSizeTitle:'حجم الاستغلاليات', farmCols:['الحجم','الفلاحون','%','المساحة (هكتار)','%'], farmRows:[['0-5 هكتار','6143','45','14600','10'],['5-10 هكتار','3617','26.5','21900','15'],['10-20 هكتار','2252','16.5','27700','19'],['20-50 هكتار','1229','9','30700','21'],['50-100 هكتار','273','2','14600','10'],['> 100 هكتار','136','1','36500','25']],
    legTitle:'البقوليات', legCols:['محاصيل','المساحة (هكتار)','الإنتاج (قنطار)','المردودية (قنطار/هكتار)'], legRows:[['فول','6500','65000','10'],['عدس','1500','12000','8'],['حمص','800','6400','8'],['أخرى','200','1400','-']],
    fodderTitle:'محاصيل علفية', fodderCols:['محاصيل','المساحة (هكتار)','المردودية (قنطار/هكتار)'], fodderRows:[['شوفان','5000','60'],['شعير علفي','3200','80'],['برسيم','450','250'],['برسيم (لوسيرن)','50','400'],['ذرة علفية','200','260'],['خليط علفي','555','70'],['أخرى','145','-']],
    maraichTitle:'الخضروات', maraichCols:['أصناف','المساحة (هكتار)','المردودية (قنطار/هكتار)'], maraichRows:[['بصل','6000','600'],['بطاطس','5000','350'],['جزر','250','300'],['أخرى','1950','-']],
    arborTitle:'الأشجار المثمرة (مساحة إنتاجية)', arborCols:['المغروسات','المساحة (هكتار)'], arborRows:[['زيتون','6340'],['عنب مائدة','1185'],['عنب نبيذ','4864'],['تفاح','1800'],['برقوق','967'],['لوز','2810'],['إجاص','435'],['خوخ/نكتارين','764'],['أخرى','2835']],
    unitsTitle:'وحدات التحويل الرئيسية (مختارة)', unitsCols:['الوحدة','الموقع','الطاقة','الحالة'], unitsRows:[['زيتون - ركيزة II','تعاونية الإدريسية','200 كلغ/س','جيد'],['زيتون - FDA','جماعة آيت حرزالله','84 طن/ي','جيد'],['برقوق - FDA','جماعة لقصير','تبريد 2970 م3','جيد'],['نباتات عطرية - FDA','جماعة لقصير','2 طن/س','جيد']],
    animalTitle:'الإنتاج الحيواني', herdTitle:'حجم القطيع (متوسط 5 مواسم)', herdCols:['النوع','العدد'], herdRows:[['خلايا نحل','1500'],['إبل','0'],['أبقار','32000'],['معز','30000'],['أغنام','330000'],['خيول','5571']], prodTitle:'الإنتاج (متوسط أطنان)', prodCols:['إنتاج','طن'], prodRows:[['عسل','150'],['صوف','123.65'],['لحوم حمراء','803.64'],['لحوم بيضاء','4304.80']], opportunitiesTitle:'فرص الاستثمار', opportunities:["تسمين الأغنام و الماعز","إنشاء معاصر و مصانع تعليب جديدة","تثمين البصل و البطاطس (تبريد)",'إنتاج مشاتل (عنب ، ورود)','وحدات حديثة لتربية النحل + تثمين الطرود','تثمين منتجات العنب (مركبات ملونة)','وحدات تقطير النباتات العطرية والطبية','مفاقس دواجن (ديك رومي)','تثمين الإنتاج الكرومي (تعبئة و ملصقات)']
  };

  const t = isAr? ar: fr;

  const Section = ({id, title, children}) => (
    <section id={id} className="agr-section fade-in">
      <h2>{title}</h2>
      {children}
    </section>
  );

  const Table = ({cols, rows, total, className=''}) => (
    <div className="table-wrap" role="region" aria-label={cols[0]}>
      <table className={`agr-table responsive-table ${className}`}>
        <thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r,ri)=> <tr key={ri}>{r.map((c,i)=><td key={i} data-label={cols[i]}>{c}</td>)}</tr>)}
        </tbody>
        {total && <tfoot><tr>{total.map((c,i)=><th key={i}>{c}</th>)}</tr></tfoot>}
      </table>
    </div>
  );

  return (
    <div className="agr-wrap" dir={dir}>
      <AgrStyle dir={dir} />
      <header className="agr-hero fade-in">
        <h1 className="agr-title">{t.title}</h1>
      </header>
      <section className="agr-intro fade-in delay-1" aria-label={t.title + ' intro'}>
        <div className="intro-text">
          <p className="lead main">{t.intro[0]}</p>
          <p className="lead subtle">{t.intro[1]}</p>
          <p className="lead subtle">{t.intro[2]}</p>
        </div>
        <div className="intro-gallery" role="group" aria-label={isAr? 'صور' : 'Images'}>
          {[agr1,agr2,agr3].map((img,i)=>(
            <figure key={i} className="hero-img"><img src={img} alt={isAr? 'فلاحة' : 'agriculture'} loading="lazy" /></figure>
          ))}
        </div>
      </section>

      <Section id="foncier" title={t.landTitle}>
        <Table cols={t.landCols} rows={t.landRows} total={t.landTotal} />
      </Section>

      <Section id="veg" title={t.vegTitle}>
        <ul className="bullets">{t.vegBullets.map(b=> <li key={b}>{b}</li>)}</ul>
        <div className="image-row">
          <img src={agr4} alt="irrigation" />
        </div>
        {/* Custom label and explanatory text for the soil table (French only) */}
        {!isAr && (
          <>
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>
              Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »
            </div>
            <Table cols={t.soilCols} rows={t.soilRows} />
            <div className="table-note" style={{marginTop:'.7rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>
              On retiendra la grande superficie emblavée en céréaliculture 74900 ha avec un rendement moyen de 22qx/ha pour le blé tendre<br/>
              L'orge couvre une superficie de 14.000 ha pour un rendement moyen de 18qx/ha, destiné essentiellement à l'alimentation complémentaire pour le bétail.<br/>
              Le blé dur enregistre un rendement moyen de 20qx/ha.
            </div>
          </>
        )}
        {isAr && (
          <>
            <h3 className="mini-title">{t.soilProdTitle}</h3>
            <Table cols={t.soilCols} rows={t.soilRows} />
          </>
        )}
      </Section>

      <Section id="farm-size" title={t.farmSizeTitle}>
        <Table cols={t.farmCols} rows={t.farmRows} total={t.farmTotal} />
        {!isAr && (
          <div className="table-note" style={{marginTop:'.7rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>
            • 71,5 % des agriculteurs exploitent moins de 10 ha, soit 25 % des terres.<br/>
            • 1 % des agriculteurs exploitent plus de 100 ha, soit 25 % des terres.
          </div>
        )}
      </Section>

      <Section id="legumineuses" title={t.legTitle}>
        {!isAr && (
          <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>
            Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2014 »
          </div>
        )}
        <Table cols={t.legCols} rows={t.legRows} total={t.legTotal} />
      </Section>

      <Section id="fourrageres" title={t.fodderTitle}>
        {!isAr && (
          <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>
            Délégation Provincial de l’agriculture d’EL HAJEB
          </div>
        )}
        <Table cols={t.fodderCols} rows={t.fodderRows} total={t.fodderTotal} />
      </Section>

      <Section id="maraicheres" title={t.maraichTitle}>
        <div className="dual-images">
          <img src={agr5} alt="maraichage" />
          <img src={agr6} alt="maraichage" />
        </div>
        {!isAr && (
          <>
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>
              Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »
            </div>
            <Table cols={t.maraichCols} rows={t.maraichRows} total={t.maraichTotal} />
            <div className="table-note" style={{marginTop:'.7rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>
              La province est considérée comme la zone de la production par excellence, de l'oignon et de la pomme de terre, grâce à la fertilité et la profondeur des sols, mais aussi à la maîtrise des techniques culturales. La culture de l'oignon représente plus de la moitié de la production régionale.
            </div>
          </>
        )}
        {isAr && (
          <Table cols={t.maraichCols} rows={t.maraichRows} total={t.maraichTotal} />
        )}
      </Section>

      <Section id="arboriculture" title={t.arborTitle}>
        {!isAr && (
          <>
            <div className="table-note" style={{marginTop:'.7rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>
              {t.arborIntro}
            </div>
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>
              Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »
            </div>
            <Table cols={t.arborCols} rows={t.arborRows} total={t.arborTotal} />
            <div className="table-note" style={{marginTop:'.7rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>
              Le tableau ci-dessus fait ressortir que la production des vignes et des oliviers devance largement les rosacées à fruit. Sur le plan interne, cette homogénéité s'explique par les grandes plantations d'oliviers sur les versants des vallées.<br/>
              Les grandes plantations des vignes s'expliquent surtout par la nature des sols sablonneux très appréciés par les vignobles. D'où, l'installation des centres provinciaux de vinification qui participent à plus de 88% de la production régionale.
            </div>
          </>
        )}
        {isAr && (
          <Table cols={t.arborCols} rows={t.arborRows} total={t.arborTotal} />
        )}
      </Section>

      <Section id="units" title={t.unitsTitle}>
        {!isAr && (
          <>
            {/* OLIVIER */}
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>OLIVIER</div>
            <Table cols={t.unitsOlivierCols} rows={t.unitsOlivierRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#047857'}}>Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »</div>
            {/* PRUNIER */}
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>PRUNIER</div>
            <Table cols={t.unitsPrunierCols} rows={t.unitsPrunierRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#047857'}}>Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »</div>
            {/* PLANTES AROMATIQUES ET MEDICINALES (AIL) */}
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>PLANTES AROMATIQUES ET MEDICINALES (AIL)</div>
            <Table cols={t.unitsAilCols} rows={t.unitsAilRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#047857'}}>Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »</div>
            {/* POMMIER ET AUTRES FRUITS */}
            <div className="table-label" style={{fontWeight:700,marginTop:'1.2rem',marginBottom:'.5rem',fontSize:'1.08rem',color:'#047857'}}>POMMIER ET AUTRES FRUITS</div>
            <Table cols={t.unitsPommierCols} rows={t.unitsPommierRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#047857'}}>Délégation Provinciale de l’agriculture (DPA) d’EL HAJEB « 2015 »</div>
          </>
        )}
        {isAr && (
          <Table cols={['الوحدة','الموقع','الطاقة','الحالة']} rows={t.unitsRows} />
        )}
      </Section>

      <Section id="animal" title={t.animalTitle}>
        {!isAr && (
          <>
            {/* Taille du cheptel */}
            <h3 className="mini-title">{t.herdTitle}</h3>
            <Table cols={t.herdCols} rows={t.herdRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'.7rem',fontSize:'.98rem',color:'#047857'}}>{t.herdLegend}</div>
            <div className="table-note" style={{marginTop:'.2rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>{t.herdText}</div>
            {/* Production */}
            <h3 className="mini-title space-top">{t.prodTitle}</h3>
            <Table cols={t.prodCols} rows={t.prodRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'.7rem',fontSize:'.98rem',color:'#047857'}}>{t.prodLegend}</div>
            <div className="table-note" style={{marginTop:'.2rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>{t.prodText}</div>
            {/* Apiculture et cuniculture */}
            <div className="table-note" style={{marginTop:'.2rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500,whiteSpace:'pre-line'}}>{t.apicultureText}</div>
            {/* Coopératives et associations agricoles */}
            <h3 className="mini-title">{t.coopTitle}</h3>
            <Table cols={t.coopCols} rows={t.coopRows} />
            <div className="table-label" style={{fontWeight:500,marginTop:'.5rem',marginBottom:'.7rem',fontSize:'.98rem',color:'#047857'}}>{t.coopLegend}</div>
            <div className="table-note" style={{marginTop:'.2rem',marginBottom:'1.2rem',fontSize:'.98rem',color:'#065f46',fontWeight:500}}>{t.coopText}</div>
          </>
        )}
        {isAr && (
          <>
            <h3 className="mini-title">{t.herdTitle}</h3>
            <Table cols={t.herdCols} rows={t.herdRows} />
            <h3 className="mini-title space-top">{t.prodTitle}</h3>
            <Table cols={t.prodCols} rows={t.prodRows} />
          </>
        )}
      </Section>

      {/* Terres Collectives & Atouts (French only) */}
      <div className="agr-section fade-in" style={{marginTop:'3rem', background:'rgba(255,255,255,.85)', border:'1px solid #10b98133', borderRadius:'1.4rem', padding:'2.2rem 2rem 2.7rem', boxShadow:'0 24px 52px -22px rgba(0,0,0,.28)', fontSize:'1.18rem'}}>
        {/* French and Arabic versions for Terres Collectives & Atouts */}
        {!isAr ? (
          <>
            <h2 style={{fontSize:'1.55rem', color:'#04432f', fontWeight:900, marginBottom:'1.1rem'}}>1. TERRES COLLECTIVES :</h2>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.5rem', fontSize:'1.13rem'}}>TERRES COLLECTIVES</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
              L'exploitation des terres collectives diffère selon les mœurs et les coutumes des tribus, dont certaines s'exploitent individuellement et d'autres collectivement. La superficie des terres collectives relevant territorialement de la Province d'EL HAJEB est de 32.422 ha, réparties sur 33 titres fonciers (avec une superficie de 29065 ha), 04 réquisitions (avec une superficie de 3356 ha). Ce patrimoine constitue les biens fonciers de 14 collectivités ethniques.
            </div>
            <h2 style={{fontSize:'1.55rem', color:'#04432f', fontWeight:900, margin:'2.2rem 0 1.1rem'}}>2. ATOUTS :</h2>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.5rem', fontSize:'1.13rem'}}>Nombreux sont les atouts dont dispose la Province d’EL HAJEB. Elle recèle en effet de grandes opportunités de développement agricole et agro-industriel dues à la diversité de ses ressources naturelles.</div>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.3rem', fontSize:'1.13rem'}}>LE CLIMAT ET SOL</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
              Le climat constitue une vraie aubaine pour la Province étant donné les apports importants en précipitations et les chutes de neiges au niveau de la partie amont. Ces précipitations constituent l’essentiel des apports en eau qui alimentent les principales sources de la Province et l’alimentation continue des nappes phréatiques. En année normale, les précipitations moyennes sont de l’ordre de 560 mm, ce qui a permis le développement important des filières des céréales, des maraichages, de l’arboriculture fruitière, des légumineuses et des cultures industrielles. Les sols sont riches et profonds et à fort potentiel productif.
            </div>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.3rem', fontSize:'1.13rem'}}>PRODUCTIONS VEGETALES</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
              Les réalisations provinciales en produits végétaux connaissent une forte abondance et diversité, en effet l’existence des grandes cultures (maraichage, céréales…) côtoie une arboriculture fruitière très développée.
            </div>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.3rem', fontSize:'1.13rem'}}>PRODUCTION ANIMALE</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500}}>
              Cette production est surtout accentuée sur les ovins et principalement la race TIMAHDITE de renommée nationale (productivité, qualité).<br/>
              Le potentiel de production ovine est intimement lié aux grands espaces de parcours pourvoyeurs principaux des besoins alimentaires des troupeaux.<br/>
              Le potentiel bovin laitier est important surtout dans la zone d’AÏN TAOUJDATE.
            </div>
          </>
        ) : (
          <>
            <h2 style={{fontSize:'1.55rem', color:'#04432f', fontWeight:900, marginBottom:'1.1rem'}}>١. الأراضي الجماعية :</h2>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.5rem', fontSize:'1.13rem'}}>الأراضي الجماعية</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
              تختلف طرق استغلال الأراضي الجماعية حسب عادات وتقاليد القبائل، فبعضها يُستغل بشكل فردي والبعض الآخر بشكل جماعي. تبلغ مساحة الأراضي الجماعية التابعة ترابياً لإقليم الحاجب 32.422 هكتار، موزعة على 33 رسماً عقارياً (بمساحة 29.065 هكتار) و4 مطالب (بمساحة 3.356 هكتار). وتُعد هذه الأملاك العقارية ملكاً لـ 14 جماعة عرقية.
            </div>
            <h2 style={{fontSize:'1.55rem', color:'#04432f', fontWeight:900, margin:'2.2rem 0 1.1rem'}}>٢. المؤهلات :</h2>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.5rem', fontSize:'1.13rem'}}>يتوفر إقليم الحاجب على العديد من المؤهلات التي تتيح فرصاً كبيرة للتنمية الفلاحية والصناعات الغذائية، وذلك بفضل تنوع موارده الطبيعية.</div>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.3rem', fontSize:'1.13rem'}}>المناخ والتربة</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
              يشكل المناخ ميزة حقيقية للإقليم بفضل التساقطات المطرية المهمة وتساقط الثلوج في المناطق العليا، حيث تشكل هذه التساقطات المصدر الأساسي للمياه التي تغذي أهم منابع الإقليم وتساهم في تغذية الفرشات المائية بشكل مستمر. في السنوات العادية، يبلغ معدل التساقطات حوالي 560 ملم، مما ساهم في تطوير سلاسل الحبوب، والخضروات، والأشجار المثمرة، والبقوليات، والمحاصيل الصناعية. التربة غنية وعميقة وذات قدرة إنتاجية عالية.
            </div>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.3rem', fontSize:'1.13rem'}}>الإنتاج النباتي</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
              يعرف الإنتاج النباتي بالإقليم وفرة وتنوعاً كبيرين، حيث تتجاور الزراعات الكبرى (الخضروات، الحبوب...) مع أشجار الفاكهة المثمرة المتطورة.
            </div>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.3rem', fontSize:'1.13rem'}}>الإنتاج الحيواني</div>
            <div style={{fontSize:'1.08rem', color:'#065f46', fontWeight:500}}>
              يتركز هذا الإنتاج أساساً على الأغنام وخاصة سلالة تمحضيت ذات الشهرة الوطنية (الإنتاجية والجودة).<br/>
              ويرتبط هذا الإنتاج ارتباطاً وثيقاً بالمساحات الشاسعة للمراعي التي توفر الاحتياجات الغذائية للقطعان.<br/>
              كما أن إنتاج الحليب البقري مهم خاصة في منطقة عين تاوجطات.
            </div>
          </>
        )}
      </div>
      <Section id="opportunities" title={t.opportunitiesTitle}>
        {!isAr ? (
          <div style={{fontSize:'1.13rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.7rem', fontSize:'1.18rem'}}>Les opportunités d’investissement concernent :</div>
            <ul className="bullets" style={{fontSize:'1.08rem'}}>
              <li>L’élevage de caprins en intensif et ce par la création d’unités spécialisées permettant de répondre à une demande de plus en plus accrue en viandes rouges et fromages de chèvres.</li>
              <li>La création d’unités d’engraissement d’ovins et de caprins est à saisir.</li>
              <li>Les pépinières de production de dindonneaux. Ce créneau s’avère actuellement porteur, le marché national étant demandeur. Les investisseurs peuvent également opter pour la production de la viande de la dinde destinée à l’exportation.</li>
              <li>La cuniculture : la cuniculture pourrait être conduite en unités proprement dites pour alimenter le marché local en viande lapine. Le développement de tous ces élevages est de nature à soulager la forte demande exercée sur la viande bovine.</li>
              <li>Intensification de l’arboriculture particulièrement les rosacées fruitières, essentiellement le pommier, le cerisier et l’amandier dans les zones de montagne.</li>
              <li>La création d’unités modernes d’élevage apicole ainsi que la création d’unités spécialisées dans la production et la commercialisation des essaims constituent des opportunités à saisir.</li>
              <li>La création de nouvelles huileries et conserveries.</li>
              <li>La valorisation de la production viticole par la vinification et le conditionnement sous de nouveaux labels.</li>
              <li>La valorisation du sous-produit de la vinification par l’extraction des anthocyanes à partir du marc du raisin.</li>
              <li>La valorisation de la production fruitière et légumière par la transformation et le conditionnement (prunes, cerises, pomme de terre etc.).</li>
              <li>La valorisation de la production de la pomme de terre et de l’oignon par la création d’unités frigorifiques de conservation.</li>
              <li>La valorisation de certains produits agricoles par la création d’unités de fabrication d’aliment de bétail.</li>
              <li>La valorisation des plantes aromatiques et médicinales par la création d’unités de distillation.</li>
            </ul>
          </div>
        ) : (
          <div style={{fontSize:'1.13rem', color:'#065f46', fontWeight:500, marginBottom:'1.2rem'}}>
            <div style={{fontWeight:700, color:'#047857', marginBottom:'.7rem', fontSize:'1.18rem'}}>تشمل فرص الاستثمار ما يلي:</div>
            <ul className="bullets" style={{fontSize:'1.08rem', direction:'rtl', textAlign:'right'}}>
              <li>تربية الماعز بشكل مكثف من خلال إنشاء وحدات متخصصة لتلبية الطلب المتزايد على اللحوم الحمراء وأجبان الماعز.</li>
              <li>إحداث وحدات لتسمين الأغنام والماعز.</li>
              <li>مشاتل إنتاج الديك الرومي، وهو قطاع واعد حالياً مع تزايد الطلب الوطني، ويمكن للمستثمرين أيضاً التوجه لإنتاج لحوم الديك الرومي للتصدير.</li>
              <li>تربية الأرانب في وحدات متخصصة لتزويد السوق المحلي بلحوم الأرانب، مما يخفف الضغط على لحوم الأبقار.</li>
              <li>تكثيف زراعة الأشجار المثمرة خاصة الورديات (التفاح، الكرز، اللوز) في المناطق الجبلية.</li>
              <li>إحداث وحدات حديثة لتربية النحل وإنشاء وحدات متخصصة لإنتاج وتسويق الطرود النحلية.</li>
              <li>إحداث معاصر ومصانع تعليب جديدة.</li>
              <li>تثمين الإنتاج الكرومي عبر التخمير والتعبئة بعلامات جديدة.</li>
              <li>تثمين مخلفات العنب عبر استخراج المواد الملونة (الأنثوسيانين) من تفل العنب.</li>
              <li>تثمين الإنتاج الفاكهي والخضروي عبر التحويل والتعبئة (البرقوق، الكرز، البطاطس، إلخ).</li>
              <li>تثمين إنتاج البطاطس والبصل عبر إنشاء وحدات تبريد للحفظ.</li>
              <li>تثمين بعض المنتجات الفلاحية عبر إنشاء وحدات لصناعة أعلاف الماشية.</li>
              <li>تثمين النباتات العطرية والطبية عبر إنشاء وحدات تقطير.</li>
            </ul>
          </div>
        )}
      </Section>
    </div>
  );
}

function AgrStyle({dir}){return <style>{`
.agr-wrap{--c1:#059669;--c2:#10b981;--c3:#065f46;--rad:1.4rem;max-width:1650px;margin-inline:auto;padding:clamp(1rem,2.2vw,2.7rem) clamp(1rem,3vw,3.3rem) 4rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#064e3b;}
.agr-hero{background:linear-gradient(135deg,#065f46,#089470);border:1px solid #0d9b7655;padding:2.2rem 2rem 2.3rem;border-radius:var(--rad);box-shadow:0 28px 60px -22px rgba(0,0,0,.45);position:relative;overflow:hidden;text-align:center;}
.agr-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 25%,rgba(255,255,255,.15),transparent 60%),radial-gradient(circle at 80% 70%,rgba(255,255,255,.12),transparent 65%);pointer-events:none;}
.agr-title{margin:0;font-size:clamp(2.1rem,4vw,3.5rem);font-weight:900;letter-spacing:.045em;background:linear-gradient(120deg,#fff,#d1fae5 55%,#bbf7d0);-webkit-background-clip:text;color:transparent;}
/* Make intro text and images the same height and images larger */
.agr-intro{margin-top:2.1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:1.8rem;align-items:stretch;}
.intro-text{background:rgba(255,255,255,.82);border:1px solid #10b98133;padding:1.7rem 1.5rem 1.8rem;border-radius:1.25rem;box-shadow:0 18px 42px -18px rgba(0,0,0,.28);height:100%;display:flex;flex-direction:column;justify-content:center;min-height:340px;}
.lead{margin:.15rem 0 .95rem;font-size:1.13rem;line-height:1.72;font-weight:700;color:#053826;max-width:1000px;}
.lead.subtle{opacity:.92;}
.intro-gallery{display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:1.2rem;background:rgba(255,255,255,.82);border:1px solid #10b98133;padding:1.4rem 1.2rem 1.6rem;border-radius:1.25rem;box-shadow:0 18px 42px -18px rgba(0,0,0,.28);height:100%;min-height:340px;}
.hero-img{flex:1 1 220px;max-width:340px;min-width:180px;background:rgba(255,255,255,.18);border:1px solid #10b98133;border-radius:1rem;padding:.55rem;backdrop-filter:blur(10px) saturate(160%);-webkit-backdrop-filter:blur(10px) saturate(160%);box-shadow:0 10px 30px -14px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;}
.hero-img img{width:100%;height:240px;max-height:280px;border-radius:.7rem;display:block;aspect-ratio:4/3;object-fit:cover;}
@media (max-width:760px){
  .agr-intro{grid-template-columns:1fr;}
  .intro-text,.intro-gallery{min-height:0;height:auto;}
  .lead{font-size:1.01rem;}
  .hero-img{max-width:100%;min-width:120px;}
  .hero-img img{height:130px;max-height:170px;}
}
.agr-section{margin-top:3rem;background:rgba(255,255,255,.85);border:1px solid #10b98133;border-radius:var(--rad);padding:2.2rem 2rem 2.7rem;box-shadow:0 24px 52px -22px rgba(0,0,0,.28);position:relative;overflow:hidden;}
.agr-section:before{content:"";position:absolute;inset:0;background:linear-gradient(140deg,rgba(255,255,255,.55),transparent 70%);mix-blend-mode:overlay;pointer-events:none;}
.agr-section h2{margin:0 0 1.3rem;font-size:clamp(1.45rem,2.7vw,2.35rem);font-weight:900;letter-spacing:.05em;color:#04432f;text-transform:uppercase;}
.mini-title{margin:1.4rem 0 .9rem;font-size:clamp(1.13rem,1.7vw,1.32rem);font-weight:800;color:#04432f;letter-spacing:.035em;}
.table-wrap{overflow-x:auto;margin-bottom:.4rem;}
.agr-table{width:100%;border-collapse:collapse;font-size:1.01rem;min-width:560px;}
.agr-table th,.agr-table td{border:1px solid #10b98133;padding:.65rem .85rem;text-align:${dir==='rtl'?'right':'left'};vertical-align:top;}
.agr-table th{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:800;letter-spacing:.05em;}
.agr-table tbody td{background:#fff;font-weight:700;color:#053826;}
.agr-table tbody tr:nth-child(even) td{background:#ecfdf5;}
.agr-table tfoot th{background:#047857;color:#fff;font-weight:900;}
.bullets{margin:0 0 1.1rem;padding-${dir==='rtl'?'right':'left'}:1.05rem;display:flex;flex-direction:column;gap:.7rem;font-size:1.01rem;font-weight:700;color:#053826;}
.bullets.cols{flex-direction:row;flex-wrap:wrap;gap:.85rem;}
.bullets.cols li{flex:1 1 240px;}
.image-row{display:flex;justify-content:center;}
.image-row img{max-width:680px;width:100%;border-radius:1rem;box-shadow:0 18px 46px -18px rgba(0,0,0,.35);}
.dual-images{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem;margin-bottom:1.1rem;}
.dual-images img{width:100%;border-radius:1rem;box-shadow:0 14px 36px -16px rgba(0,0,0,.32);aspect-ratio:4/3;object-fit:cover;}
/* Responsive tables -> cards */
@media (max-width:760px){
  .agr-section{padding:1.55rem 1.15rem 2.05rem;}
  /* Increase table font size for mobile readability */
  .agr-table{font-size:1.08rem;min-width:0;}
  .responsive-table thead{position:absolute;left:-9999px;top:-9999px;}
  .responsive-table tbody tr{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.6rem;border:1px solid #10b98133;background:#fff;margin-bottom:.95rem;padding:.8rem .85rem;border-radius:1rem;box-shadow:0 8px 20px -12px rgba(0,0,0,.2);} 
  .responsive-table td{border:none!important;padding:.42rem .55rem;background:transparent!important;display:flex;flex-direction:column;gap:.22rem;font-size:1.01rem;line-height:1.38;}
  .responsive-table td:before{content:attr(data-label);font-size:.92rem;font-weight:800;color:#047857;letter-spacing:.02em;}
  .agr-table tfoot{display:none;}
  .bullets{font-size:1.08rem;line-height:1.55;}
  .lead{font-size:1.13rem;line-height:1.7;}
}
@media (prefers-reduced-motion:no-preference){.fade-in{opacity:0;animation:fadeIn .85s ease forwards;transform:translateY(10px);} @keyframes fadeIn{to{opacity:1;transform:none;}}}
`}</style>;}
