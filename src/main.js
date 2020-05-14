// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faUserMd } from '@fortawesome/free-solid-svg-icons/faUserMd';
library.add(faExclamationTriangle, faBuilding, faUserMd);

// import pinboard
import pinboard from '@phila/pinboard/src/main.js';

// data-sources
import covidTestingSites from './data-sources/covid-testing-sites';
// import compiled from './data-sources/compiled';
var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@6126861722cee9384694742363d1661e771493b9/config.js';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = {
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
};

pinboard({
  // baseConfig: null,
  comboSearch: {
    dropdown: [ 'address' ],
    position: 'right',
    placeholderText: 'Search by address',
  },
  footer: {
    'HowToUse': false,
  },
  customComps,
  refine: {
    // type: 'categoryField',
    // categoryField: function(item) { return item.attributes.facility_type; },
    // type: 'multipleFields',
    type: 'multipleFieldGroups',
    multipleFieldGroups: {
      daysOfOperation: {
        'Monday': {
          unique_key: 'day_Monday',
          value: function(state, item) {
            return item.attributes.Monday !== null;
          },
        },
        'Tuesday': {
          unique_key: 'day_Tuesday',
          value: function(state, item) {
            return item.attributes.Tuesday !== null;
          },
        },
        'Wednesday': {
          unique_key: 'day_Wednesday',
          value: function(state, item) {
            return item.attributes.Wednesday !== null;
          },
        },
        'Thursday': {
          unique_key: 'day_Thursday',
          value: function(state, item) {
            return item.attributes.Thursday !== null;
          },
        },
        'Friday': {
          unique_key: 'day_Friday',
          value: function(state, item) {
            return item.attributes.Friday !== null;
          },
        },
        'Saturday': {
          unique_key: 'day_Saturday',
          value: function(state, item) {
            return item.attributes.Saturday !== null;
          },
        },
        'Sunday': {
          unique_key: 'day_Sunday',
          value: function(state, item) {
            return item.attributes.Sunday !== null;
          },
        },
      },
      access: {
        'Drive thru': {
          // unique_key: 'dtwu_driveThru',
          unique_key: 'driveThrough.dt',
          i18n_key: 'driveThrough.dt',
          value: function(state, item) {
            return [ 'dt', 'both' ].includes(item.attributes.drive_thruwalk_up);
          },
        },
        'Walk up': {
          unique_key: 'dtwu_walkUp',
          i18n_key: 'driveThrough.wu',
          value: function(state, item) {
            return [ 'wu', 'both' ].includes(item.attributes.drive_thruwalk_up);
          },
        },
      },
    },
  },
  markerType: 'circle-marker',
  locationInfo: {
    siteName: function(state, item) {
      return item.attributes.testing_location_nameoperator;
    },
  },
  baseConfig: BASE_CONFIG_URL,
  cyclomedia: {
    enabled: false,
    measurementAllowed: false,
    popoutAble: true,
    recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  dataSources: {
    covidTestingSites,
  },
  router: {
    enabled: false,
  },
  app: {
    logoAlt: 'City of Philadelphia',
    type: 'covidTestingSites',
  },
  projection: '4326',
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      include_units: true,
    },
  },
  infoCircles: {},
  map: {
    defaultBasemap: 'pwd',
    center: [ -75.163471, 39.953338 ],
    zoom: 12,
    geocodeZoom: 15,
    imagery: {
      enabled: false,
    },
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels',
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water',
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
    },
  },
  circleMarkers:{
    color: '#FF9D14',
    weight: 0,
    radius: 8,
    mobileRadius: 12,
  },
  sections: {},
  subsections: {},
  i18n: {
    header: 'i18nBanner',
    enabled: true,
    refinePanel: true,
    expandCollapseTitle: true,
    footer: true,
    data: {
      locale: 'en-US',
      messages: {
        'en-US': {
          language: 'English',
          app: {
            title: 'COVID-19 testing sites',
            subtitle: 'Find a free COVID-19 test near you',
            noResults: 'No testing site was found within your search. Please call your health care provider or visit the Department of Public Health’s COVID-19 website for information about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
          },
          introPage: {
            introTitle: 'About this finder',
            p1: 'This tool can help you find a free COVID-19 test in Philadelphia. (See our FAQ for more information about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">who should get tested</a>.) You can:',
            ul1: {
              li1: 'Search for a testing site by address.',
              li2: 'Click on a map location for specific site information.',
              li3: 'Filter the site list by the tags provided.',
            },
            section1Title: 'Find out if you’re eligible',
            p2: 'Each site has different requirements. No testing sites require payment, insurance, or proof of citizenship. But, some sites may:',
            ul2: {
              li1: 'Limit testing to people who meet certain criteria.',
              li2: 'Require an appointment.',
              li3: 'Require a referral from your doctor.',
              li4: 'Ask you to stay in your car (for drive-thru sites).',
            },
            p3: 'Check a location’s specific details on the map. Then, call or visit the provider\'s website before going for a test.',
            callout1: {
              p1: '<b>Questions?</b> Please call your health care provider or see our FAQ about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
            },
          },
          beforeYouGo: 'Before you go',
          checkSite: 'Tests don’t require money, insurance, or proof of citizenship. But, many have other requirements. Check specific site details.',
          hoursVary: 'Hours and availability varies.',
          process: 'Process',
          eligibility: 'Details',
          testingHours: 'Testing hours',
          daysOfOperation: 'Days of operation',
          Monday: 'Mon.',
          Tuesday: 'Tues.',
          Wednesday: 'Wed.',
          Thursday: 'Thurs.',
          Friday: 'Fri.',
          Saturday: 'Sat.',
          Sunday: 'Sun.',
          access: 'Access',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          website: 'Website',
          driveThrough: {
            dt: 'Drive-thru',
            wu: 'Walk-up',
            both: 'Drive-thru & walk-up',
          },
          panelText:{
            p1: 'If you are unable to get a COVID-19 test through your health care provider, this tool can help you find a free test within the City of Philadelphia.',
          },
          restrictions: {
            lowInc: 'Intended for low-income families and individuals.',
            year14: 'Must be 14 years or older.',
            year18: 'Must be 18 years or older.',
            netPat: 'Must be a patient in the provider\'s network.',
            medPrior: 'Priority given to health care workers and first responders.',
            homeless: 'Intended for people experiencing homelessness.',
          },
          notes:{
            schedApp: 'Must schedule an appointment.',
            refReq: 'Referral required.',
            schedAppRefReq: 'Appointment and referral required.',
            noApp: 'No appointment necessary.',
            testAll: 'Testing provided even if symptoms are not present.',
          },
          facilityType: {
            drugstore: 'Drugstore',
            fieldSite: 'Field Site',
            clinic: 'Clinic',
            hospital: 'Hospital',
            other: 'Other',
            phmcHC: 'PHMC health center',
            urgentCare: 'Urgent Care',
            cityHC: 'City health center',
            homelessServices: 'Homeless services',
          },
        },
        'es': {
          language: 'Español',
          app: {
            title: 'Lugares donde se realizan pruebas de COVID-19',
            subtitle: 'Encuentre un lugar cercano para hacerse la prueba de COVID-19.',
            noResults: 'No se encontró un lugar donde se realicen pruebas que coincida con su búsqueda. Llame a su proveedor de atención médica o visite el sitio web sobre COVID-19 del Departamento de Salud Pública para obtener información sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
          },
          introPage: {
            introTitle: 'Sobre este buscador',
            p1: 'Esta herramienta puede ayudarlo a encontrar una prueba de COVID-19 gratuita en Filadelfia. (Consulte nuestras Preguntas frecuentes para obtener más información sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">quién debería hacerse la prueba</a>). Puede hacer lo siguiente:',
            ul1: {
              li1: 'Buscar un lugar donde se realicen pruebas según la dirección.',
              li2: 'Hacer clic en una ubicación del mapa para obtener información específica del lugar.',
              li3: 'Filtrar la lista de lugares según las etiquetas provistas.',
            },
          section1Title: 'Saber si es elegible.',
          p2: 'Cada lugar tiene distintos requisitos. Ningún lugar requiere pagos, seguro ni verificación de ciudadanía. Sin embargo, algunos lugares podrían hacer lo siguiente:',
          ul2: {
            li1: 'Restringir la prueba para personas que cumplan ciertos requisitos.',
            li2: 'Exigir una cita.',
            li3: 'Exigir una derivación médica.',
            li4: 'Pedirle que se quede en su automóvil (en lugares a los que se accede en automóvil).',
          },
          p3: 'Revise los detalles de una ubicación específica en el mapa. Luego, puede llamar o visitar el sitio web del proveedor antes de ir a realizarse la prueba.',
          callout1: {
              p1: '<b>¿Tiene preguntas?</b> Llame a su proveedor de atención médica o consulte nuestras Preguntas frecuentes sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
            },
          },
          beforeYouGo: 'Antes de ir',
          checkSite: 'Las pruebas no exigen pagos, seguro ni verificación de ciudadanía. Sin embargo, pueden tener otros requisitos. Revise los detalles específicos del lugar.',
          hoursVary: 'Los horarios y la disponibilidad pueden variar.',
          process: 'Proceso',
          eligibility: 'Detalles',
          testingHours: 'Horario para las pruebas',
          daysOfOperation: 'Días de servicio',
          Monday: 'Lu.',
          Tuesday: 'Ma.',
          Wednesday: 'Mi.',
          Thursday: 'Ju.',
          Friday: 'Vi.',
          Saturday: 'Sá.',
          Sunday: 'Do.',
          access: 'Acceso',
          Yes: 'Sí',
          No: 'No',
          Unknown: 'Desconocido',
          website: 'Sitio web',
          driveThrough: {
            dt: 'En vehículo',
            wu: 'A pie',
          both: 'En vehículo y a pie',
          },
          panelText: {
            p1: 'Si no puede obtener una prueba de COVID-19 a través de su proveedor de atención médica, esta herramienta puede ayudarlo a encontrar una prueba gratuita en la ciudad de Filadelfia.',
          },
          restrictions: {
            lowInc: 'Está dirigido a personas y familias de bajos ingresos.',
            year14: 'Debe tener 14 años de edad o más.',
            year18: 'Debe tener 18 años de edad o más.',
            netPat: 'Debe ser un paciente de la red del proveedor.',
            medPrior: 'Se da prioridad a los trabajadores de la salud y personas en la primera línea de respuesta.',
            homeless: 'Está dirigido a personas sin hogar.',
          },
          notes: {
            schedApp: 'Se debe programar una cita.',
            refReq: 'Se necesita derivación.',
            schedAppRefReq: 'Se necesita cita y derivación.',
            noApp: 'No se necesita cita.',
            testAll: 'Se realiza la prueba aunque no tenga síntomas.',
          },
          facilityType: {
            drugstore: 'Farmacia',
            fieldSite: 'Sitio de campo',
            clinic: 'Clínica',
            hospital: 'Hospital',
            other: 'Otro',
            phmcHC: 'Centro de salud PHMC',
            urgentCare: 'Atención urgente',
            cityHC: 'Centro de salud de la ciudad',
            homelessServices: 'Servicios para personas sin hogar',
          },
        },
        'ch': {
          language: '中文',
          app: {
            title: '食品分发地点',
            subtitle: '在冠状病毒-19期间查找免费食物和餐点',
          },
          eligibility: '合格标准',
          pickupDetails: '取餐详情及时间',
          beforeYouGo: '您出发前',
          change: '日程表变更',
          closure: '临时关闭',
          checkSite: '查看特定场所的信息。 时间有可能会变动。',
          hoursVary: '时间和可用性各不相同。',
          Monday: '星期一',
          Tuesday: '星期二',
          Wednesday: '星期三',
          Thursday: '星期四',
          Friday: '星期五',
          Saturday: '星期六',
          Sunday: '星期日',
          referralRequired: 'Referral required?',
          access: 'Access',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          'Drive thru': 'Drive thru',
          'Walk up': 'Walk up',
          sections: {},
        },
        'vi': {
          language: 'Tiếng Việt',
          app: {
            title: 'Các điểm phân phát thực phẩm',
            subtitle: 'Tìm thực phẩm và bữa ăn miễn phí trong dịch COVID-19',
          },
          eligibility: 'Điều kiện hội đủ',
          pickupDetails: 'Chi tiết',
          beforeYouGo: 'Trước khi đi',
          change: 'Đổi lịch',
          closure: 'Đóng cửa tạm thời',
          checkSite: 'Kiểm tra thông tin địa điểm cụ thể. Giờ hoạt động có thể thay đổi.',
          hoursVary: 'Giờ hoạt động và mức sẵn có khác nhau.',
          Monday: 'Thứ Hai',
          Tuesday: 'Thứ Ba',
          Wednesday: 'Thứ Tư',
          Thursday: 'Thứ Năm',
          Friday: 'Thứ Sáu',
          Saturday: 'Thứ Bảy',
          Sunday: 'Chủ Nhật',
          referralRequired: 'Referral required?',
          access: 'Access',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          'Drive thru': 'Drive thru',
          'Walk up': 'Walk up',
          sections: {},
        },
        'ru': {
          language: 'Pусский',
          app:{
            title: 'Пункты выдачи продуктов',
            subtitle: 'Поиск пунктов бесплатного продовольствия и питания во время пандемии COVID-19',
          },
          eligibility: 'Критерии получения помощи',
          pickupDetails: 'Информация о получении и время получения',
          beforeYouGo: 'Прежде чем идти',
          change: 'Изменение графика работы',
          closure: 'Временное закрытие',
          checkSite: 'уточните информацию по конкретному пункту. Часы работы могут меняться.',
          hoursVary: 'Время выдачи и имеющееся в наличии питание могут меняться.',
          Monday: 'Понедельник',
          Tuesday: 'Вторник',
          Wednesday: 'Среда',
          Thursday: 'Четверг',
          Friday: 'Пятница',
          Saturday: 'Суббота',
          Sunday: 'Воскресенье',
          referralRequired: 'Referral required?',
          access: 'Access',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          'Drive thru': 'Drive thru',
          'Walk up': 'Walk up',
          sections: {},
        },
        'fr': {
          language: 'Français',
          app: {
            title: 'Sites de dépistage du COVID-19',
            subtitle: 'Trouver où recevoir gratuitement un test de dépistage du COVID-19 à proximité de chez vous',
            noResults: 'Aucun site de dépistage n’a été trouvé pour votre recherche. Veuillez appeler votre prestataire de soins de santé ou consulter le site Web du département de la Santé publique sur le COVID-19 pour obtenir des informations sur les tests de dépistage à Philadelphie.',
          },
          introPage:{
            introTitle: 'À propos de cet outil de recherche',
            p1: 'Cet outil peut vous aider à trouver où recevoir gratuitement un test de dépistage du COVID-19 à Philadelphie. (Voir notre FAQ pour toute information complémentaire sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les personnes qui devraient se faire tester</a>.) Vous pouvez :',
            ul1:{
              li1: 'Rechercher un site de dépistage à partir d’une adresse.',
              li2: 'Cliquer sur la carte pour obtenir des informations concernant un site particulier.',
              li3: 'Filtrer la liste des sites selon les balises données.',
            },
            section1Title: 'Découvrir si vous pouvez en bénéficier.',
            p2: 'Les exigences de chaque site sont différentes. Aucun site de dépistage n’exige une assurance ou une preuve de citoyenneté. Cependant certains sites peuvent :',
            ul2:{
              li1: 'Limiter les tests de dépistage aux personnes qui remplissent certains critères.',
              li2: 'Exiger un rendez-vous.',
              li3: 'Exiger une référence de votre médecin traitant.',
              li4: 'Demander que vous restiez dans votre véhicule (pour les sites en drive).',
            },
            p3: 'Consultez les détails spécifiques à un site sur la carte. Appelez ensuite le prestataire ou consultez son site Web avant de vous déplacer.',
            callout1:{
              p1: 'Des questions ? Veuillez appeler votre prestataire de soins de santé ou consulter notre FAQ sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les tests de dépistage à Philadelphie.</a>',
            },
          },
          beforeYouGo: 'Avant de vous déplacer',
          checkSite: 'Une assurance ou une preuve de citoyenneté ne sont pas exigées pour les tests. Mais beaucoup de sites imposent d’autres conditions. Consultez les détails concernant un site particulier.',
          hoursVary: 'Les horaires et la disponibilité varient.',
          process: 'Processus',
          eligibility: 'Détails',
          testingHours: 'Horaires de dépistage',
          daysOfOperation: 'Jours d’ouverture',
          Monday: 'Lundi',
          Tuesday: 'Mardi',
          Wednesday: 'Mercredi',
          Thursday: 'Jeudi',
          Friday: 'Vendredi',
          Saturday: 'Samedi',
          Sunday: 'Dimanche',
          access: 'Accès',
          Yes: 'Oui',
          No: 'Non',
          Unknown: 'Inconnu',
          website: 'Site Web',
          driveThrough:{
            dt: 'Drive',
            wu: 'Guichet',
            both: 'Drive et guichet',
          },
          panelText:{
            p1: 'Si vous ne pouvez pas vous faire dépister pour le COVID-19 par le biais de votre médecin traitant cet outil peut vous aider à trouver un site de dépistage gratuit dans la ville de Philadelphie.',
          },
          restrictions:{
            lowInc: 'À l’intention des familles et des personnes à faibles revenus.',
            year14: 'Doit être âgé d’au moins 14 ans.',
            year18: 'Doit être âgé d’au moins 18 ans.',
            netPat: 'Doit être un patient dans le réseau du prestataire.',
            medPrior: 'La priorité est donnée au personnel soignant et aux premiers intervenants.',
            homeless: 'À l’intention des sans-abri.',
          },
          notes:{
            schedApp: 'Prise de rendez-vous obligatoire',
            refReq: 'Référence du médecin exigée.',
            schedAppRefReq: 'Rendez-vous et référence du médecin exigés.',
            noApp: 'Sans rendez-vous.',
            testAll: 'Tests effectués même sans symptômes.',
          },
          facilityType:{
            drugstore: 'Pharmacie',
            fieldSite: 'Site de terrain',
            clinic: 'Clinique',
            hospital: 'Hôpital',
            other: 'Autre',
            phmcHC: 'Centre médical PHMC',
            urgentCare: 'Clinique de soins d’urgence',
            cityHC: 'Centre médical de la ville',
            homelessServices: 'Services aux sans-abri',
          },
        },
      },
    },
  },
});
