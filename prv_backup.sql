-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 26, 2025 at 09:16 AM
-- Server version: 8.3.0
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prv`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'generale', '2025-08-26 09:14:48', '2025-08-26 09:14:48'),
(2, 'sante', '2025-08-26 09:14:48', '2025-08-26 09:14:48'),
(3, 'culture', '2025-08-26 09:14:48', '2025-08-26 09:14:48'),
(4, 'environnement', '2025-08-26 09:14:48', '2025-08-26 09:14:48');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '2025_08_11_081914_create_news_table', 1),
(4, '2025_08_11_082544_create_news_images_table', 1),
(5, '2025_08_22_000000_create_categories_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint UNSIGNED DEFAULT NULL,
  `title_fr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_fr` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_ar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_blob` longblob,
  `image_mime` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_category_id_foreign` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `category_id`, `title_fr`, `title_ar`, `content_fr`, `content_ar`, `image_blob`, `image_mime`, `created_at`, `updated_at`) VALUES
(2, 1, 'Gouvernance – Plateforme de Participation Citoyenne d’El Hajeb', 'الحاجب: منصة رقمية جديدة للمشاركة المواطِنة', 'La province d’El Hajeb a officiellement déployé une nouvelle plateforme numérique destinée à rapprocher l’administration des citoyens. Accessible sur ordinateur comme sur mobile, l’outil permet de déposer des réclamations géolocalisées, de proposer des idées de projets ou encore de suivre l’avancement des dossiers déjà ouverts.\r\n\r\nSelon la Division des Affaires Intérieures, plus de 300 comptes ont été créés durant la phase pilote et une cinquantaine de suggestions ont déjà été classées par thématique (voirie, éclairage public, propreté, sécurité routière, espaces verts). Un module de transparence publiera trimestriellement des indicateurs: taux de traitement, délais moyens de réponse et budget engagé.\r\n\r\nLes associations locales saluent une démarche qui pourrait favoriser une culture de co‑construction des politiques publiques. Des ateliers de sensibilisation seront organisés dans les lycées et maisons de jeunes afin d’élargir la participation des jeunes et des femmes. L’initiative s’inscrit dans la stratégie nationale de transformation digitale et de renforcement de la redevabilité locale.\r\n\r\nAu‑delà de l’aspect technologique, les autorités expliquent que la plateforme est un levier de priorisation budgétaire: l’analyse agrégée des signalements récurrents (trous de chaussée, éclairage défaillant, dépôts sauvages) permettra de calibrer les plans d’entretien annuel et de réduire les interventions d’urgence plus coûteuses. Un tableau de bord interne, connecté au système de gestion des marchés, fera le lien entre demande citoyenne et commande publique.\r\n\r\nUn accent particulier sera mis sur l’inclusion numérique. Une tournée mobile (kiosque équipé de tablettes) se déplacera dans les douars périphériques pour assister les personnes âgées ou peu familiarisées avec les interfaces digitales. Par ailleurs, un protocole d’interfaçage ouvert (API) est prévu afin que des acteurs tiers – universités, incubateurs civiques – puissent développer des visualisations avancées ou des modèles prédictifs de maintenance urbaine.\r\n\r\nÀ moyen terme, la province envisage d’intégrer une cartographie des projets participatifs financés, avec des fiches d’impact (coût, délai, bénéficiaires estimés, indicateurs de suivi). Ce volet vise à renforcer la confiance en montrant concrètement la transformation des contributions citoyennes en actions tangibles sur le terrain. Les retours d’expérience seront capitalisés pour alimenter un guide méthodologique à destination d’autres collectivités.', 'أطلقت عمالة إقليم الحاجب منصة رقمية جديدة تهدف إلى تقريب الإدارة من المواطنين وتعزيز الثقة المتبادلة. تُمكِّن المنصة من تقديم شكايات أو اقتراحات بشكل مباشر، مع إمكانية إرفاق صور وتحديد الموقع الجغرافي، وتتبع مرحلة المعالجة إلى غاية الإغلاق.\r\n\r\nوخلال المرحلة التجريبية، تم إنشاء أكثر من 300 حساب وتسجيل عشرات المقترحات في مجالات النظافة والإنارة العمومية والسلامة الطرقية وتزيين الفضاءات العمومية. كما سيتم نشر تقارير دورية تتضمن مؤشرات حول آجال المعالجة ونسب الإنجاز والاعتمادات المعبأة.\r\n\r\nوترى جمعيات المجتمع المدني أن هذه الخطوة تعزز المشاركة المواطِنة وتُرسّخ ثقافة الحوار حول أولويات التنمية المحلية. كما ستُنظم لقاءات تعريفية بالمؤسسات التعليمية ومراكز الشباب لتشجيع فئة التلاميذ والنساء على التفاعل. المبادرة تندرج ضمن جهود التحول الرقمي وترسيخ مبادئ الشفافية والنجاعة.\r\n\r\nلا يقتصر الطموح على الجانب التقني، بل يُراد للمنصة أن تصبح أداة لتوجيه الاستثمارات العمومية، إذ ستمكّن البيانات المجمعة حول النقاط المتكررة (حفر، إنارة معطلة، نفايات عشوائية) من إعداد مخططات صيانة استباقية تقلل الكلفة وتحد من التدخلات الطارئة. وسيُخصص لوح قيادة داخلي يربط بين الطلبات ومراحل الصفقات العمومية.\r\n\r\nوحرصاً على الشمول الرقمي، ستتنقل وحدة متنقلة مزودة بأجهزة لوحية إلى الدواوير لمساعدة كبار السن ومن لا دراية لهم بالأدوات الرقمية. كما يُرتقب فتح واجهة برمجية تسمح للجامعات والمبادرات المواطِنة بابتكار تطبيقات تحليلية أو أدوات تنبؤية للصيانة الحضرية.\r\n\r\nوعلى المدى المتوسط، ستُدمج خريطة للمشاريع المنجزة بناءً على المقترحات، متضمنة كُلفتها ومؤشرات أثرها، في مسعى لترسيخ الثقة عبر إظهار التحول الملموس لمطالب السكان إلى منجزات. وسيُستثمر هذا الرصيد في إعداد دليل مرجعي لفائدة جماعات أخرى.', NULL, NULL, '2025-08-11 11:00:27', '2025-08-20 11:30:47'),
(4, 2, 'Modernisation intégrale de l’Hôpital Provincial d’El Hajeb', 'تحديث شامل للمستشفى الإقليمي بالحاجب', 'Un vaste programme de modernisation est engagé à l’hôpital provincial d’El Hajeb. Le projet comprend l’acquisition d’un scanner de dernière génération, la rénovation du bloc opératoire, l’extension des urgences et la réorganisation des circuits de tri afin de réduire l’attente.\r\n\r\nLe ministère de la Santé précise que l’établissement bénéficiera également d’un dossier médical informatisé et d’un plan d’efficacité énergétique (éclairage LED, optimisation de la climatisation). Une formation continue est prévue pour le personnel paramédical sur la prise en charge des urgences traumatologiques et cardiologiques.\r\n\r\nLes associations de patients saluent une démarche qui devrait améliorer la qualité et la sécurité des soins, tout en attirant davantage de spécialistes vers le territoire. Des indicateurs de performance (taux de réadmission, délai moyen de tri, taux d’occupation des lits critiques) seront publiés de manière semestrielle pour objectiver les progrès.\r\n\r\nLa modernisation inclut aussi un volet numérique: segmentation du réseau pour la cybersécurité, archivage d’imagerie médicale compatible PACS et déploiement de terminaux mobiles sécurisés pour les équipes d’intervention. L’hôpital participera à un projet pilote de télécardiologie permettant l’interprétation distante d’ECG complexes par un centre universitaire partenaire.\r\n\r\nSur le plan architectural, les flux ont été reconfigurés pour séparer les circuits propres et contaminés, améliorer la ventilation naturelle et réduire les croisements évitables. Un jardin thérapeutique sera aménagé pour favoriser la convalescence des patients chroniques et réduire le stress du personnel.\r\n\r\nÀ terme, la direction ambitionne d’obtenir une accréditation qualité nationale, étape préalable pour entrer dans des programmes de recherche clinique collaboratifs. Le projet est financé par un mix de budget d’État, de contribution régionale et de partenariats public‑privé ciblés sur l’équipement biomédical.', 'أُطلق برنامج واسع لتأهيل المستشفى الإقليمي بالحاجب يشمل اقتناء أجهزة طبية متطورة، وتجديد قاعات العمليات، وتوسيع مصلحة المستعجلات مع تحسين مسار استقبال وفرز الحالات لتقليص مدة الانتظار.\r\n\r\nسيستفيد المستشفى من رقمنة السجلات الطبية واعتماد حلول طاقة أكثر نجاعة (إنارة اقتصادية، وضبط ذكي للتبريد والتهوية). كما ستُبرمج دورات تكوينية مستمرة للأطر شبه الطبية في التعامل مع الإصابات المتعددة والحالات القلبية الحرجة.\r\n\r\nوتؤكد جمعيات المرضى أن الخطوة تفتح آفاقاً لتحسين سلامة العلاجات وجذب الأطر المختصة، مع نشر مؤشرات تقييم نصف سنوية (معدل إعادة الإدخال، زمن الفرز الأولي، نسبة إشغال الأسرة الحرجة).\r\n\r\nيشمل التحديث جانباً رقمياً يتعلق بتأمين الشبكات الداخلية، وأرشفة الصور الطبية وفق معايير متوافقة، وتوفير أجهزة لوحية مشفرة للفرق المتنقلة. كما سيشارك المستشفى في مشروع تجريبي للتطبيب عن بُعد في أمراض القلب يتيح قراءة تخطيطات معقدة عن بعد.\r\n\r\nمهندسياً أُعيد تنظيم المسارات للفصل بين الدورات النظيفة والمحتملة التلوث، وتحسين التهوية الطبيعية والحد من تقاطعات الحركة. وسيُنشأ فضاء حدائقي علاجي يُسهم في دعم نفسية المرضى ورفاه المهنيين.\r\n\r\nوتسعى الإدارة لنيل اعتماد وطني في الجودة كخطوة للانخراط في أبحاث سريرية مشتركة، مع تمويل متنوع يجمع ميزانية الدولة ودعم الجهة وشراكات عمومية‑خاصة موجهة للتجهيز الطبي.', NULL, NULL, '2025-08-11 11:00:38', '2025-08-20 11:31:10'),
(5, 3, 'Culture – Festival des Arts Berbères : une édition élargie', 'الثقافة: توسيع برنامج مهرجان الفنون الأمازيغية', 'La 5ᵉ édition du Festival des Arts Berbères prévoit une programmation enrichie: concerts de musique amazighe contemporaine, ateliers de danse patrimoniale, marché de l’artisanat et rencontres littéraires bilingues. Un espace transmission mettra en lumière les jeunes artisans (tissage, gravure sur bois, bijouterie). Des panels débattront de la sauvegarde du patrimoine immatériel face aux mutations numériques.\r\n\r\nLes organisateurs espèrent attirer davantage de visiteurs nationaux grâce à une campagne de communication multicanale. Des partenariats avec des offices du tourisme voisins pourraient inscrire l’événement dans un circuit culturel régional.\r\n\r\nNouveautés majeures: une résidence artistique croisant musiciens traditionnels et producteurs électroniques, un laboratoire de design pour revisiter les motifs amazighs dans des applications textiles durables, et des sessions pédagogiques sur la documentation numérique des rites oraux.\r\n\r\nUn observatoire éphémère collectera des données sur les flux de visiteurs, les dépenses locales et l’empreinte carbone (mobilités, énergie scénique) afin de calibrer une stratégie d’éco‑événement pour les prochaines éditions.\r\n\r\nLe festival veut également promouvoir l’entrepreneuriat culturel: ateliers sur la gestion des droits, la diffusion en streaming, le micro‑financement communautaire. Un espace mentorat mettra en relation jeunes créateurs et professionnels confirmés.\r\n\r\nÀ terme, l’ambition est de créer une plateforme permanente d’archives vivantes, accessible en ligne, regroupant captations, catalogues artisanaux numérisés et récits oraux indexés.', 'تتضمن الدورة الخامسة لمهرجان الفنون الأمازيغية برنامجاً موسعاً يشمل حفلات للموسيقى العصرية ذات الجذور الأمازيغية وورشات للرقص التراثي وسوقاً للصناعات التقليدية ولقاءات أدبية ثنائية اللغة. ويُبرز رواق خاص أعمال حرفيين شباب في النسيج والنقش وصياغة الحلي، مع ندوات تناقش حماية التراث اللامادي أمام التحول الرقمي.\r\n\r\nيعتمد المنظمون حملة تواصل متعددة القنوات ويبحثون شراكات مع وجهات سياحية مجاورة لإدراج الحدث ضمن مسارات ثقافية جهوية. وتشمل المستجدات إقامة فنية تمزج بين العازفين التقليديين والإنتاج الإلكتروني، ومختبراً لتصميم يعيد توظيف الرموز الأمازيغية في تطبيقات نسيجية مستدامة، وجلسات تدريب على التوثيق الرقمي للطقوس الشفوية.\r\n\r\nسيُجمع بيانات حول حركة الزوار والإنفاق والأثر الكربوني (النقل، الطاقة) لبناء نموذج تظاهرة بيئية في الدورات القادمة. كما يُمنح حيز لريادة الأعمال الثقافية: إدارة الحقوق، البث عبر المنصات، التمويل المجتمعي المصغر. ويوفر ركن الإرشاد لقاءات بين مبدعين ناشئين ومحترفين.\r\n\r\nوترنو الرؤية بعيدة المدى إلى إنشاء منصة رقمية دائمة تؤرشف العروض والحرف والقصص الشفوية بفهرسة تتيح البحث والتعليم.', NULL, NULL, '2025-08-12 00:46:39', '2025-08-20 11:35:40'),
(7, 4, 'Environnement – Grande campagne de reboisement à El Hajeb', 'البيئة: حملة واسعة للتشجير بإقليم الحاجب', 'Une campagne de reboisement vise la mise en terre de plus de 10 000 plants (cèdres, chênes verts et espèces autochtones adaptées à la résilience climatique). Les services forestiers utilisent un système de suivi géospatial pour contrôler croissance et mortalité pendant les deux premières années. Des écoles participent à des ateliers pédagogiques sur la préservation des sols et la prévention des incendies.\r\n\r\nUn volet sensibilisation aborde la lutte contre le surpâturage et la valorisation de l’économie verte (plantes aromatiques, écotourisme). Le programme s’inscrit dans la stratégie nationale de restauration des écosystèmes fragilisés par la sécheresse.\r\n\r\nLa sélection des essences privilégie la diversité fonctionnelle afin de renforcer la résilience face aux stress hydriques: panachage d’espèces à enracinement profond et de couvre‑sol pour limiter l’érosion. Des micro‑bassins sont aménagés pour capter l’eau de ruissellement et améliorer la survie des jeunes plants durant les étés secs.\r\n\r\nUn protocole participatif engage habitants et associations dans le suivi (application mobile de signalement d’arbres dépérissants, photos géotaggées). Les données collectées alimentent un tableau de bord accessible aux chercheurs.\r\n\r\nParallèlement, un module de formation introduit les filières de valorisation non ligneuses (miel, plantes aromatiques, mycologie contrôlée) pour créer des revenus alternatifs qui réduisent la pression sur les coupes illicites. Une étude de faisabilité sur le paiement pour services écosystémiques est envisagée.\r\n\r\nÀ long terme, le projet ambitionne de constituer un corridor écologique reliant des fragments forestiers isolés afin de favoriser la circulation génétique de la faune et d’atténuer les effets de fragmentation.', 'أُطلقت حملة تشجير تستهدف غرس أزيد من عشرة آلاف شتلة من الأرز والبلوط الأخضر وأنواع محلية مقاومة للجفاف، مع اعتماد نظام تتبع جغرافي لمراقبة النمو والوفيات خلال أول سنتين وإشراك المؤسسات التعليمية في ورشات توعية بالوقاية من الحرائق وحماية التربة.\r\n\r\nيشمل البرنامج توعية بمخاطر الرعي الجائر وتثمين الاقتصاد الأخضر (النباتات العطرية، السياحة البيئية) ضمن الإستراتيجية الوطنية لاسترجاع النظم المتدهورة. وتم اختيار تشكيلة متنوعة من الأنواع لضمان مرونة أكبر في مواجهة الإجهاد المائي، مع إنشاء أحواض دقيقة لتجميع مياه التساقطات ودعم بقاء الشتلات صيفاً.\r\n\r\nتُمكّن آلية تشاركية السكان والجمعيات من الإبلاغ عن الأشجار المريضة عبر تطبيق محمول يعتمد صوراً مرفقة بالإحداثيات، ما يزود لوحة قيادة بحثية مفتوحة.\r\n\r\nكما يُنظم تكوين حول سلاسل تثمين المنتجات غير الخشبية (العسل، النباتات، الفطريات وفق ضوابط) لتوفير دخل بديل يقلل الضغط على القطع غير القانوني. ويُدرس خيار الدفع مقابل الخدمات البيئية كحافز للحفاظ.\r\n\r\nويهدف المشروع بعيد المدى إلى ربط أجزاء غابوية متفرقة عبر ممر بيئي يسمح بالتدفق الجيني للحياة البرية ويحد من آثار التجزئة.', NULL, NULL, '2025-08-11 11:20:06', '2025-08-20 11:34:22'),
(9, 2, 'Culture – Festival des Arts Berbères : une édition élargie', 'الثقافة: توسيع برنامج مهرجان الفنون الأمازيغية', 'La 5ᵉ édition du Festival des Arts Berbères prévoit une programmation enrichie: concerts de musique amazighe contemporaine, ateliers de danse patrimoniale, marché de l’artisanat et rencontres littéraires bilingues. Un espace transmission mettra en lumière les jeunes artisans (tissage, gravure sur bois, bijouterie). Des panels débattront de la sauvegarde du patrimoine immatériel face aux mutations numériques.\r\n\r\nLes organisateurs espèrent attirer davantage de visiteurs nationaux grâce à une campagne de communication multicanale. Des partenariats avec des offices du tourisme voisins pourraient inscrire l’événement dans un circuit culturel régional.\r\n\r\nNouveautés majeures: une résidence artistique croisant musiciens traditionnels et producteurs électroniques, un laboratoire de design pour revisiter les motifs amazighs dans des applications textiles durables, et des sessions pédagogiques sur la documentation numérique des rites oraux.\r\n\r\nUn observatoire éphémère collectera des données sur les flux de visiteurs, les dépenses locales et l’empreinte carbone (mobilités, énergie scénique) afin de calibrer une stratégie d’éco‑événement pour les prochaines éditions.\r\n\r\nLe festival veut également promouvoir l’entrepreneuriat culturel: ateliers sur la gestion des droits, la diffusion en streaming, le micro‑financement communautaire. Un espace mentorat mettra en relation jeunes créateurs et professionnels confirmés.\r\n', 'تتضمن الدورة الخامسة لمهرجان الفنون الأمازيغية برنامجاً موسعاً يشمل حفلات للموسيقى العصرية ذات الجذور الأمازيغية وورشات للرقص التراثي وسوقاً للصناعات التقليدية ولقاءات أدبية ثنائية اللغة. ويُبرز رواق خاص أعمال حرفيين شباب في النسيج والنقش وصياغة الحلي، مع ندوات تناقش حماية التراث اللامادي أمام التحول الرقمي.\r\n\r\nيعتمد المنظمون حملة تواصل متعددة القنوات ويبحثون شراكات مع وجهات سياحية مجاورة لإدراج الحدث ضمن مسارات ثقافية جهوية. وتشمل المستجدات إقامة فنية تمزج بين العازفين التقليديين والإنتاج الإلكتروني، ومختبراً لتصميم يعيد توظيف الرموز الأمازيغية في تطبيقات نسيجية مستدامة، وجلسات تدريب على التوثيق الرقمي للطقوس الشفوية.\r\n\r\nسيُجمع بيانات حول حركة الزوار والإنفاق والأثر الكربوني (النقل، الطاقة) لبناء نموذج تظاهرة بيئية في الدورات القادمة. كما يُمنح حيز لريادة الأعمال الثقافية: إدارة الحقوق، البث عبر المنصات، التمويل المجتمعي المصغر. ويوفر ركن الإرشاد لقاءات بين مبدعين ناشئين ومحترفين.\r\n\r\nوترنو الرؤية بعيدة المدى إلى إنشاء منصة رقمية دائمة تؤرشف العروض والحرف والقصص الشفوية بفهرسة تتيح البحث والتعليم.', NULL, NULL, '2025-08-12 00:46:39', '2025-08-20 11:35:40'),
(10, 3, 'Économie – Nouvelle zone industrielle: attractivité et emplois', 'الاقتصاد: منطقة صناعية جديدة لتعزيز الاستثمار وفرص الشغل', 'Le projet de zone industrielle d’El Hajeb couvrira 32 hectares, dédié prioritairement à l’agro‑alimentaire, la valorisation des produits forestiers non ligneux et l’artisanat structuré. Un guichet unique simplifiera les procédures de raccordement (énergie, eau, fibre optique). Les autorités annoncent des incitations fiscales temporaires et un dispositif d’accompagnement à l’export pour les PME.\r\n\r\nUne pépinière d’entreprises intégrera un laboratoire de contrôle qualité partagé et un espace de prototypage. L’étude d’impact prévoit la création directe d’environ 600 emplois sur trois ans, avec retombées indirectes dans la logistique et les services.\r\n\r\nLe plan d’aménagement inclut des principes d’écoparc: mutualisation de certaines utilités (station de pré‑traitement, plateforme de tri), corridors verts et toitures prêtes à accueillir du photovoltaïque. Un cadre de reporting ESG incitera les occupants à mesurer consommation d’eau spécifique, intensité énergétique et taux de valorisation des déchets.\r\n\r\nUn partenariat académique visera la formation continue des techniciens (maintenance 4.0, automatisation légère, cybersécurité industrielle) pour soutenir l’élévation du capital humain. Les PME bénéficieront d’un accompagnement digital (ERP mutualisé, place de marché inter‑entreprises).\r\n\r\nSur le volet financement, un fonds local de “co‑développement” explorera la prise de participation minoritaire dans des unités à fort potentiel export, catalysant l’effet de levier bancaire. Une zone logistique attenante est à l’étude pour fluidifier le groupage des expéditions.\r\n\r\nÀ long terme, l’objectif est de positionner la zone comme hub régional de transformation durable, articulé avec des clusters voisins afin de renforcer l’intégration des chaînes de valeur.', 'سيغطي مشروع المنطقة الصناعية الجديدة بالحاجب 32 هكتاراً مخصصاً أساساً للصناعات الغذائية وتثمين المنتجات الغابوية غير الخشبية والحرف المنظمة، مع شباك وحيد لتبسيط مساطر الربط بالطاقة والماء والألياف البصرية وحوافز ضريبية مرحلية ودعم للتصدير لفائدة المقاولات الصغرى والمتوسطة.\r\n\r\nتضم الحاضنة مختبراً مشتركاً لمراقبة الجودة وفضاءً للنمذجة الأولية، بينما تتوقع الدراسة خلق 600 منصب مباشر خلال ثلاث سنوات إضافة إلى أثر غير مباشر في النقل والخدمات. ويعتمد التصميم مقاربة الحديقة الصناعية البيئية (خدمات مشتركة، ممرات خضراء، أسطح جاهزة للطاقة الشمسية) مع إطار قياس بيئي‑اجتماعي لحساب استهلاك الماء وكثافة الطاقة ونسب تثمين المخلفات.\r\n\r\nسيُبرم تعاون مع مؤسسات تكوين لتأهيل تقنيين في الصيانة الذكية والأتمتة والأمن السيبراني الصناعي، إلى جانب حلول رقمية مشتركة (تخطيط موارد، سوق تبادل بين الوحدات).\r\n\r\nتمت دراسة إنشاء صندوق محلي للاستثمار المشترك بحصص صغرى في الوحدات ذات القابلية للتصدير لتعزيز الرفع المالي البنكي، مع بحث إقامة منصة لوجستية محاذية لتيسير تجميع الشحنات.\r\n\r\nوالهدف بعيد المدى هو تموقع المنطقة كمركز جهوي للتحويل المستدام متكامل مع الأقطاب المجاورة لضمان ترابط سلاسل القيمة.', NULL, NULL, '2025-08-12 00:51:10', '2025-08-20 11:36:55'),
(11, 4, 'Tourisme durable – Nouvelles randonnées écoguidées', 'السياحة البيئية: مسارات جديدة بتنشيط المرشدين المحليين', 'El Hajeb étoffe son offre écotouristique avec des randonnées guidées dans les forêts de cèdres et zones de biodiversité sensibilisant à la protection des points d’eau et à la gestion des déchets sur les sentiers. Les guides locaux ont suivi une formation sur l’interprétation écologique et la sécurité des groupes. Un module numérique permettra aux visiteurs de réserver en ligne et de consulter des fiches faune‑flore.\r\n\r\nL’initiative devrait prolonger la durée moyenne de séjour et générer des revenus complémentaires pour les communautés rurales. Des parcours thématiques (plantes médicinales, migration des oiseaux, géologie) seront cartographiés avec niveaux de difficulté gradués.\r\n\r\nUn protocole de limitation de la fréquentation sur les segments sensibles prévoira quotas journaliers et créneaux horaires étalés. Des indicateurs (érosion des sols, dérangement faunique, déchets collectés) seront suivis pour ajuster la capacité de charge écologique.\r\n\r\nUne charte du visiteur responsable (bruit, respect de la flore, gestion des emballages) sera accessible en plusieurs langues. Les coopératives locales proposeront des produits de terroir labellisés renforçant la chaîne de valeur locale.\r\n\r\nÀ moyen terme, une application mobile intégrera guidage hors‑ligne, réalité augmentée pour reconnaître certaines essences et système de points de fidélité convertible en réductions sur des services écotouristiques.\r\n\r\nLe projet explore enfin la mise en place d’un mécanisme de compensation carbone volontaire affecté à la restauration de zones dégradées.', 'تعزز الحاجب عرضها في السياحة البيئية عبر مسارات تنزه مؤطرة داخل غابات الأرز ومناطق التنوع الحيوي مع توعية بحماية منابع المياه وتدبير النفايات. تلقى المرشدون تكويناً في الشرح الإيكولوجي وسلامة المجموعات، وسيُتاح حجز رقمي وملفات تعريف بأنواع النباتات والحيوانات.\r\n\r\nيتوقع أن تسهم المبادرة في رفع مدة إقامة الزوار وخلق دخل إضافي للساكنة القروية، مع إعداد مسارات موضوعاتية (نباتات طبية، هجرة الطيور، التكوين الجيولوجي) ودرجات صعوبة متدرجة.\r\n\r\nسيُطبق نظام حصص يومية وأوقات موزعة على المقاطع الحساسة، مع مؤشرات للرصد (تعرية التربة، إزعاج الحياة البرية، كمية النفايات) لضبط القدرة الاستيعابية. وتُقدم ميثاق للزائر المسؤول بلغات عدة، فيما تعرض تعاونيات محلية منتوجات مجالية معتمدة.\r\n\r\nعلى المدى المتوسط ستوفر تطبيقات توجيهاً دون اتصال وواقعاً معززاً للتعرف على بعض الأنواع ونظام نقاط ولاء يحفز السلوك المستدام.\r\n\r\nويُدرس إنشاء آلية تعويض كربوني طوعي تُوجَّه مداخيلها لاستصلاح مقاطع متدهورة.', NULL, NULL, '2025-08-12 07:30:05', '2025-08-20 11:37:48'),
(16, 1, 'Analyse – Transformations économiques et politiques dans le monde arabe', 'تحليل: التحولات الاقتصادية والسياسية في العالم العربي', 'Le monde arabe traverse une phase de recomposition marquée par la diversification économique des pays du Golfe, les réformes budgétaires et la montée des investissements dans les énergies renouvelables et les technologies de l’information. Parallèlement, des économies fragiles subissent inflation et pressions sociales, alimentant débats sur les filets de protection et la soutenabilité de la dette.\r\n\r\nSur le plan diplomatique, des plateformes régionales cherchent à renforcer la coopération sécuritaire et l’intégration logistique (corridors portuaires et numériques). Les enjeux de gouvernance, la transition numérique, l’emploi des jeunes diplômés et l’adaptation climatique demeurent centraux.\r\n\r\nDe nouveaux cadres réglementaires sur les données et l’intelligence artificielle pourraient accélérer l’innovation inclusive, à condition d’accompagner les PME et de réduire la fracture de compétences. Les stratégies énergétiques pivotent vers l’hydrogène vert, le dessalement sobre et les réseaux intelligents intégrant stockage distribué.\r\n\r\nLes tensions géopolitiques et la réorganisation des chaînes d’approvisionnement mondiales poussent plusieurs pays à renforcer la souveraineté agro‑alimentaire (irrigation de précision, génétique adaptée à la sécheresse) et la fabrication locale de composants critiques.\r\n\r\nLa réussite de la prochaine décennie dépendra de la capacité à conjuguer stabilité macroéconomique, justice sociale et résilience environnementale, en articulant investissements infrastructurels et capital humain. Une gouvernance plus participative et des mécanismes d’évaluation indépendants seront déterminants pour ancrer la confiance.\r\n\r\nEnfin, la dynamique diasporique offre un potentiel de transfert de connaissances et de financement patient qui reste encore partiellement exploité.', 'يشهد العالم العربي مرحلة إعادة تشكل مع تنويع اقتصادات الخليج وارتفاع الاستثمارات في الطاقات المتجددة والتقنيات الرقمية، بينما تعاني اقتصادات هشة من التضخم والضغط الاجتماعي ما يثير نقاشاً حول شبكات الحماية واستدامة الدين.\r\n\r\nدبلوماسياً تتجه المبادرات الإقليمية نحو تعزيز التعاون الأمني والاندماج اللوجستي عبر ممرات بحرية ورقمية، وتبرز قضايا الحوكمة والتحول الرقمي وتشغيل الشباب والتكيف المناخي في قلب الأولويات.\r\n\r\nتسعى تشريعات جديدة لتنظيم البيانات والذكاء الاصطناعي إلى دفع الابتكار الشامل شريطة مواكبة المقاولات الصغرى وسد فجوات الكفاءات. كما تتجه السياسات الطاقية إلى الهيدروجين الأخضر والتحلية المقتصدة والطاقة الشبكية الذكية مع حلول تخزين موزعة.\r\n\r\nدفعت التوترات الجيوسياسية وإعادة تشكيل سلاسل التوريد عدداً من الدول إلى تعزيز الأمن الغذائي (الري الدقيق، أصناف مقاومة للجفاف) والتصنيع المحلي لمكوّنات استراتيجية.\r\n\r\nترتبط آفاق العقد المقبل بقدرة الحكومات على الموازنة بين الاستقرار الاقتصادي والعدالة الاجتماعية والمرونة البيئية عبر استثمار موجه في البنية التحتية ورأس المال البشري، واعتماد تقييمات مستقلة تعزز الثقة العامة.\r\n\r\nكما يشكل تفعيل طاقات الجاليات بالخارج رافعة لنقل المعرفة وتمويل طويل الأمد لم تستثمر بعد بالقدر الكافي.', NULL, NULL, '2025-08-12 08:40:18', '2025-08-20 11:39:02'),
(17, 1, 'Aménagement urbain – Rénovation stratégique du centre‑ville', 'تهيئة حضرية: مشروع استراتيجي لتجديد وسط مدينة الحاجب', 'El Hajeb lance un programme de requalification urbaine: réfection des trottoirs, éclairage LED intelligent, rationalisation de la signalisation et création de micro‑espaces verts de proximité. Une démarche participative a collecté les attentes des commerçants (fluidité piétonne, stationnement courte durée) et des riverains (sécurité nocturne, accessibilité).\r\n\r\nDes matériaux perméables seront privilégiés pour favoriser l’infiltration des eaux pluviales et réduire le ruissellement. L’initiative vise aussi à renforcer l’attractivité commerciale tout en préservant l’identité architecturale.\r\n\r\nLe schéma directeur inclut un volet mobilité douce: zones 30, élargissement de trottoirs critiques, mobilier urbain ergonomique et supports vélos. Une charte d’harmonisation des devantures commerciales sera proposée pour réduire l’encombrement visuel et améliorer la lisibilité.\r\n\r\nUne plateforme SIG centralisera inventaire des réseaux, arbres, mobiliers et points lumineux pour optimiser maintenance et planification. Les données d’éclairement nocturne permettront d’ajuster les niveaux lumineux et réduire la consommation énergétique.\r\n\r\nDes appels à projets culturels activeront les places requalifiées (expositions temporaires, marchés créatifs). Un indicateur composite de “vitalité piétonne” (flux, durée de séjour, taux d’occupation commerciale) guidera les ajustements progressifs.\r\n\r\nÀ horizon long, le centre‑ville ambitionne une labellisation “quartier durable” intégrant gestion circulaire des déchets, arrosage intelligent des espaces verts et capteurs de qualité de l’air.', 'انطلق برنامج لإعادة تأهيل وسط مدينة الحاجب يشمل إعادة تبليط الأرصفة، واعتماد إنارة LED ذكية، وتنظيم التشوير، وإحداث فضاءات خضراء صغرى. جُمعت انتظارات التجار حول سيولة حركة الراجلين وتهيئة مواقف قصيرة، ومطالب السكان المتعلقة بالأمن الليلي وسهولة الولوج.\r\n\r\nسيتم تفضيل مواد منفذة للمياه للحد من الجريان وتحسين تغذية الفرشة، مع الحفاظ على الهوية المعمارية وتعزيز الجاذبية التجارية. ويتضمن المخطط محاور للحركية الهادئة (مناطق سرعة منخفضة، توسيع الأرصفة، تجهيزات للدراجات). وستُطرح ميثاق لتوحيد الواجهات والحد من التشويش البصري.\r\n\r\nتُمكن منصة نظم معلومات جغرافية من جمع بيانات الشبكات والأشجار والإنارة لتخطيط الصيانة وتحسين استهلاك الطاقة عبر قياس الإضاءة فعلياً.\r\n\r\nكما ستُفعل الساحات المهيأة بأنشطة ثقافية وأسواق مبتكرة، ويُعتمد مؤشر مركب لقياس “الحيوية الحضرية” (تدفق، مدة مكوث، نسبة إشغال تجاري) لتوجيه التحسينات.\r\n\r\nويستهدف المشروع مستقبلاً نيل تصنيف “حي مستدام” يدمج تدوير النفايات، ري ذكي للمسطحات الخضراء، وحساسات لرصد جودة الهواء.', NULL, NULL, '2025-08-12 09:15:12', '2025-08-20 11:40:14'),
(20, 2, 'Société – L’importance stratégique de la lecture à l’ère numérique', 'مجتمع: الأهمية الإستراتيجية للقراءة في العصر الرقمي', 'La lecture demeure un levier structurant de développement personnel et citoyen. À l’ère de la surcharge informationnelle, elle affine l’esprit critique, consolide la maîtrise linguistique et soutient l’innovation. Des enseignants d’El Hajeb expérimentent des clubs de lecture bilingues où les apprenants comparent styles narratifs et registres lexicaux.\r\n\r\nDes bibliothèques scolaires adoptent un système de prêt numérique pour étendre l’accès aux ouvrages spécialisés. Encourager la lecture régulière, c’est aussi renforcer la résilience cognitive face à la fragmentation attentionnelle induite par les flux numériques. Un programme local proposera des ateliers d’écriture créative et de débat argumenté.\r\n\r\nLes neurosciences confirment que la lecture profonde améliore la connectivité entre régions cérébrales impliquées dans compréhension, mémoire sémantique et empathie. Introduire des plages “déconnexion” et des rituels de lecture silencieuse aide à réduire l’hyper‑stimulation.\r\n\r\nUn axe d’inclusion vise la réduction des inégalités d’accès: bibliobus élargi, formats audio pour malvoyants, adaptation de contenus en lecture facile pour les publics en difficulté. La médiation numérique formera les familles à la vérification des sources et à la détection des biais.\r\n\r\nDes partenariats avec des éditeurs permettront l’expérimentation de licences souples pour lecture collective et annotation collaborative en ligne. Un observatoire citoyen de la lecture pourrait publier annuellement des indicateurs (temps de lecture moyen, diversité de genres, ratio papier/numérique).\r\n\r\nIn fine, la stratégie locale entend faire de la lecture une infrastructure immatérielle favorisant créativité entrepreneuriale, cohésion sociale et participation démocratique.', 'تظل القراءة رافعة أساسية لبناء الفرد والمجتمع في زمن فيض المعلومات، إذ تعزز التفكير النقدي وتدعم التحكم اللغوي وتغذي الابتكار. ويجرب مدرسون بالحاجب أندية ثنائية اللغة تقارن الأساليب السردية والثروة المعجمية، فيما تعتمد مكتبات نظام إعارة رقمية لتوسيع الولوج للمراجع.\r\n\r\nترسخ القراءة المنتظمة المناعة المعرفية ضد تشتت الانتباه الناتج عن التدفق الرقمي، وتدعم القدرة على التركيز والتأمل. وتظهر أبحاث علم الأعصاب أن القراءة العميقة تنشط شبكات فهم النص والذاكرة التعريفية والتعاطف، ما يعزز بناء المعنى.\r\n\r\nيستهدف محور الإدماج تقليص الفوارق عبر مكتبة متنقلة، وصيغ صوتية للمكفوفين، وتبسيط نصوص للفئات ذات صعوبات. كما تشمل الوساطة الرقمية تكوين الأسر على التحقق من المصادر ورصد الانحيازات الإعلامية.\r\n\r\nتتيح شراكات مع ناشرين صيغ ترخيص مرنة للقراءة الجماعية والتعليق التعاوني، مع بحث إنشاء مرصد مواطني ينشر مؤشرات سنوية (مدة القراءة، تنوع الأجناس، نسبة الرقمي).\r\n\r\nوتروم الإستراتيجية جعل القراءة بنية غير مادية تغذي الإبداع والنسيج الاجتماعي والمشاركة الديمقراطية.', NULL, NULL, '2025-08-15 00:02:21', '2025-08-20 11:41:33');

-- --------------------------------------------------------

--
-- Table structure for table `news_images`
--

DROP TABLE IF EXISTS `news_images`;
CREATE TABLE IF NOT EXISTS `news_images` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `news_id` bigint UNSIGNED NOT NULL,
  `data` longblob NOT NULL,
  `mime` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_images_news_id_foreign` (`news_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `is_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test Admin', 'admin@example.com', NULL, '$2y$12$s1j7eeO3kQUhjS/H.5Kpaep0s9VB8hI1B8wh5pFTjFfyU69mEl5Nm', 1, NULL, '2025-08-26 09:14:48', '2025-08-26 09:14:48');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
