// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

// turn off console logging in production
if (process.env.NODE_ENV === 'production') {
  console.log = console.info = console.debug = console.error = function () {};
}
console.log('main.js process.env.NODE_ENV:', process.env.NODE_ENV, 'process.env.VUE_APP_PUBLICPATH:', process.env.VUE_APP_PUBLICPATH);

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faUserMd } from '@fortawesome/free-solid-svg-icons/faUserMd';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
library.add(faExclamationTriangle, faCalendarAlt, faBuilding, faUserMd, faCircle);

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
  alerts: {
    modal: {
      enabled: false,
      // header: 'Possible closures',
      // body: '<p>All City-run COVID-19 testing sites and health centers are open and on a normal schedule, though others may be closed. Please call ahead to ensure that the site you are going to is open.</p>',
      header: 'Before you go',
      body: '<p>Some test sites may be closed due to winter weather conditions.  Always call ahead before you go to a site.</p>',
    },
    // header: {
    //   type: 'alertBanner',
    //   // enabled: function(state) {
    //   //   return state.alertResponse === 'alertHours';
    //   // },
    //   // content: '<b>Until further notice:</b> Please call ahead or check hours of operation while business restrictions are still in effect.',
    // },
    alertChecks: [
      // {
      //   type: 'alertHours',
      //   condition: [
      //     {
      //       'day': 1,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //     {
      //       'day': 2,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //   ],
      // },
    ],
  },
  app: {
    logoAlt: 'City of Philadelphia',
    type: 'covidTestingSites',
  },
  gtag: {
    category: 'rf-covid',
  },
  searchBar: {
    dropdown: [
      'address',
      // 'keyword',
    ],
  },
  locationInfo: {
    siteName: function(item) {
      return item.attributes.testing_location_nameoperator;
    },
  },
  customComps,
  baseConfig: BASE_CONFIG_URL,
  // holidays: {
  //   days: ['Monday'],
  // },
  hiddenRefine: {
    City: function(item) {
      return item.attributes.City === 'Philadelphia';
    },
    Visibility: function(item) {
      return item.attributes.Visibility === 'pub' || item.attributes.Visibility === 'For Public View';
    },
  },
  refine: {
    type: 'multipleFieldGroups',
    multipleFieldGroups: {
      patientAge: {
        'year18': {
          unique_key: 'patientAge_year18',
          i18n_key: 'patientAge.year18',
          value: function(item) {
            return item.attributes.Age === 'year18';
          },
        },
        'year14': {
          unique_key: 'patientAge_year14',
          i18n_key: 'patientAge.year14',
          value: function(item) {
            return item.attributes.Age === 'year14';
          },
        },
        'pedCare': {
          unique_key: 'patientAge_pedCare',
          i18n_key: 'patientAge.pedCare',
          value: function(item) {
            return item.attributes.Age === 'pedCare';
          },
        },
      },
      refReq: {
        'yes': {
          unique_key: 'refReq_yes',
          i18n_key: 'Yes',
          value: function(item) {
            return item.attributes.Referral === 'yes';
          },
        },
        'no': {
          unique_key: 'refReq_no',
          i18n_key: 'No',
          value: function(item) {
            return item.attributes.Referral === 'no';
          },
        },
      },
      symptomatic: {
        'yes': {
          unique_key: 'symptomatic_yes',
          i18n_key: 'Yes',
          value: function(item) {
            return item.attributes.Symptoms === 'symptom';
          },
        },
        'no': {
          unique_key: 'symptomatic_no',
          i18n_key: 'No',
          value: function(item) {
            return item.attributes.Symptoms === 'asymptom';
          },
        },
      },
      process: {
        'driveThru': {
          unique_key: 'process_driveThru',
          i18n_key: 'process.dt',
          value: function(item) {
            return [ 'dt', 'both' ].includes(item.attributes.drive_thruwalk_up);
          },
        },
        'walkUp': {
          unique_key: 'process_walkUp',
          i18n_key: 'process.wu',
          value: function(item) {
            return [ 'wu', 'both' ].includes(item.attributes.drive_thruwalk_up);
          },
        },
      },
      rapid: {
        'yes': {
          unique_key: 'rapid_yes',
          i18n_key: 'Yes',
          value: function(item) {
            return item.attributes.rapid_testing === 'Yes';
          },
        },
        'no': {
          unique_key: 'rapid_no',
          i18n_key: 'No',
          value: function(item) {
            return item.attributes.rapid_testing === 'No' || item.attributes.rapid_testing == null;
          },
        },
      },
    },
  },
  markerType: 'circle-marker',
  circleMarkers:{
    color: '#FF9D14',
    weight: 0,
    radius: 8,
    mobileRadius: 12,
    size: 16,
    mobileSize: 20,
  },
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
  footer: [
    {
      type: "native",
      href: "https://www.phila.gov/",
      attrs: {
        target: "_blank",
      },
      text: "cityOfPhiladelphia",
    },
    {
      type: "native",
      href: "#",
      text: "about",
    },
    {
      type: "native",
      href: "https://www.phila.gov/feedback/",
      attrs: {
        target: "_blank",
      },
      text: "feedback",
    },
    {
      type: "native",
      href: "https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/data/testing/",
      attrs: {
        target: "_blank",
      },
      text: "viewAccessible",
    },
  ],
  infoCircles: {
    'symptomatic': {
      'html': '\
      <div class="full-div">For more information, see <a class="white-font-link" target="_blank" href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">\
      Symptoms of coronavirus (CDC)</a>.</div>\
      ',
    },
  },
  map: {
    // type: 'leaflet',
    type: 'mapbox',
    // tiles: 'hosted',
    containerClass: 'map-container',
    defaultBasemap: 'pwd',
    center: [ -75.163471, 39.953338 ],
    minZoom: 11,
    maxZoom: 25,
    shouldInitialize: true,

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
  // mbStyle: 'mapbox://styles/ajrothwell/ck6gz6rmk04681ir1fdmagq5h',
  mbStyle: {
    version: 8,
    sources: {
      pwd: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
        ],
        type: 'raster',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'pwd',
        type: 'raster',
        source: 'pwd',
      },
    ],
  },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
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
            subtitle: 'Find a COVID-19 test near you',
            bannerAlert: 'Many sites are closed today. Check specific site details for more information.',
            noResults: 'No testing site was found within your search. Please call your health care provider or visit the Department of Public Health’s COVID-19 website for information about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
          },
          viewAccessible: 'View accessible list of site locations',
          introPage: {
            p1: 'There are permanent and temporary testing sites throughout Philadelphia. <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">Find out who should get tested</a>.',
            section1Title: 'Find a pop-up testing event',
            p2: 'Pop-up events are hosted at temporary locations and are not shown on the map. <a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">Check the calendar event for details</a>.',
            section2Title: 'Find a test site',
            p3: 'Use this finder to:',
            ol1: {
              li1: 'Locate a COVID-19 testing site in Philadelphia.',
              li2: 'Select the location on the map for details.',
              li3: 'Contact the provider before going for a test.',
            },
            p4: 'What to expect at a test site',
            p5: 'You won’t have to pay out-of-pocket to get a test. However, some sites may bill your insurance for a visit fee.',
            p6: 'At the site, you will be asked for identification and may also be asked for health insurance information. If you don’t have these, you can still get a test.',
            p7: 'Some sites may:',
            ul1: {
              li1: 'Limit testing to people who meet certain criteria.',
              li2: 'Require an appointment.',
              li3: 'Require a referral from your doctor.',
              li4: 'Ask you to stay in your car (for drive-thru sites).',
            },
            callout1: {
              p1: '<b>Questions?</b> Call your health care provider or see our FAQ about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
            },
          },
          languages: {
            languagesSpoken: 'Languages spoken:',
            english: 'English',
            spanish: 'Spanish',
            chinese: 'Chinese',
            french: 'French',
            arabic: 'Arabic',
            hindi: 'Hindi',
            algerian: 'Algerian',
            russian: 'Russian',
            translationServices: 'Phone interpretation services:',
          },
          address: 'address',
          keyword: 'keyword',
          beforeYouGo: 'Before you go',
          checkSite: 'Check the specific site information. Hours are subject to change.',
          hoursVary: 'Hours and availability varies.',
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
          // access: 'Process',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          website: 'Website',
          process: {
            category: 'Process',
            dt: 'Drive-thru',
            wu: 'Walk-up',
            both: 'Drive-thru & walk-up',
          },
          symptomatic: {
            category: 'Must be symptomatic',
            null: '',
            symptom: 'Must be symptomatic',
            asymptom: 'Symptoms not required (but exposure might be)',
          },
          rapid: {
            category: 'Rapid testing',
            Yes: 'Offers rapid testing (call for details)',
          },
          refReq: {
            category: 'Referral required',
            null: '',
            yes: 'Referral required',
            no: 'No referral required',
          },
          patientAge: {
            category: 'Patient age',
            null: '',
            year14: '+14 years old',
            year18: '+18 years old',
            pedCare: 'Offers pediatric testing',
          },
          panelText:{
            p1: 'If you are unable to get a COVID-19 test through your health care provider, this tool can help you find a test within the City of Philadelphia.',
          },
          restrictions: {
            lowInc: 'This site is intended for low-income families and individuals.',
            year14: 'Must be 14 years or older.',
            year18: 'Must be 18 years or older.',
            netPat: 'A patient must be in the provider’s network to receive a test at this site.',
            medPrior: 'Priority will be given to health care workers and first responders at this site.',
            homeless: 'This site is intended for people experiencing homelessness.',
            telemed: 'A telemedicine visit is required before testing at this site.',
            onlineQuest: 'An online questionnaire must be completed before visiting this site.',
          },
          notes:{
            schedApp: 'Appointments are required for testing.',
            refReq: 'Referral required.',
            schedAppRefReq: 'Appointment and referral required.',
            noApp: 'No appointment necessary for testing.',
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
            bannerAlert: 'Muchos lugares están cerrados hoy. Consulte los detalles específicos del lugar para obtener más información.',
            noResults: 'No se encontró un lugar donde se realicen pruebas que coincida con su búsqueda. Llame a su proveedor de atención médica o visite el sitio web sobre COVID-19 del Departamento de Salud Pública para obtener información sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
          },
          introPage: {
            p1: 'Hay sitios de pruebas permanentes y temporales en toda Filadelfia. <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">Averigüe quién debe hacerse la prueba</a>.',
            section1Title: 'Encuentre un evento emergente de pruebas',
            p2: 'Los eventos emergentes se realizan en lugares temporales y no se muestran en el mapa. <a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">Revise el evento en el calendario para obtener más detalles</a>.',
            section2Title: 'Encuentre un centro de pruebas',
            p3: 'Utilice este buscador para:',
            ol1: {
              li1: 'localizar un sitio de pruebas de COVID-19 en Filadelfia;',
              li2: 'seleccionar la ubicación en el mapa para obtener detalles;',
              li3: 'ponerse en contacto con el proveedor antes de ir a hacer la prueba.',
            },
            p4: 'Qué esperar en un sitio de pruebas',
            p5: 'No tendrá que pagar de su bolsillo para hacerse una prueba. Sin embargo, algunos sitios pueden facturar a su seguro un cargo por visita.',
            p6: 'En el sitio de pruebas, se le pedirá que se identifique y es posible que también se le soliciten los datos de su seguro médico. Si no tiene la información, igual puede hacerse la prueba.',
            p7: 'Algunos sitios pueden:',
            ul1: {
              li1: 'limitar las pruebas a las personas que cumplan ciertos criterios;',
              li2: 'exigir una cita;',
              li3: 'exigir una derivación de su médico;',
              li4: 'pedirle que se quede dentro de su automóvil (en los sitios donde se realiza la prueba en vehículos).',
            },
            callout1: {
              p1: '<b>¿Tiene preguntas?</b> Llame a su proveedor de atención médica o consulte nuestras preguntas frecuentes (FAQ) sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
            },
          },
          languages: {
            languagesSpoken: 'Idiomas que se hablan:',
            english: 'Inglés',
            spanish: 'Español',
            chinese: 'Chino',
            french: 'Francés',
            arabic: 'Arábe',
            hindi: 'Hindi',
            algerian: 'Argelino',
            russian: 'Ruso',
            translationServices: 'Servicios telefónicos de interpretación:',
          },
          address: 'spanish address',
          keyword: 'spanish keyword',
          beforeYouGo: 'Antes de ir',
          checkSite: 'Verifique la información específica del lugar. Los horarios pueden cambiar.',
          hoursVary: 'Los horarios y la disponibilidad pueden variar.',
          eligibility: 'Detalles',
          testingHours: 'Horario para las pruebas',
          daysOfOperation: 'Días de servicio',
          Monday: 'Lun.',
          Tuesday: 'Mar.',
          Wednesday: 'Mié.',
          Thursday: 'Jue.',
          Friday: 'Vie.',
          Saturday: 'Sáb.',
          Sunday: 'Dom.',
          // access: 'Acceso',
          Yes: 'Sí',
          No: 'No',
          Unknown: 'Desconocido',
          website: 'Sitio web',
          process: {
            category: 'Proceso',
            dt: 'En vehículo',
            wu: 'A pie',
            both: 'En vehículo y a pie',
          },
          symptomatic: {
            category: 'Debe ser sintomático',
            null: '',
            symptom: 'Debe ser sintomático',
            asymptom: 'No se requieren síntomas (pero la exposición puede ser)',
          },
          rapid: {
            category: 'Pruebas rápidas',
            Yes: 'Ofrece pruebas rápidas (llamar para obtener detalles)',
          },
          refReq: {
            category: 'Se necesita derivación',
            null: '',
            yes: 'Se necesita derivación',
            no: 'No se necesita derivación',
          },
          patientAge: {
            category: 'Edad del paciente',
            null: '',
            year14: 'Más de 14 años',
            year18: 'Más de 18 años',
            pedCare: 'Ofrece pruebas pediátricas',
          },
          panelText: {
            p1: 'Si no puede obtener una prueba de COVID-19 a través de su proveedor de atención médica, esta herramienta puede ayudarlo a encontrar una prueba gratuita en la ciudad de Filadelfia.',
          },
          restrictions: {
            lowInc: 'Este sitio está dirigido a las familias y las personas de bajos ingresos. ',
            year14: 'Debe tener 14 años de edad o más.',
            year18: 'Debe tener 18 años de edad o más.',
            netPat: 'El paciente debe pertenecer a la red del proveedor para recibir una prueba en este lugar.',
            medPrior: 'En este lugar, se dará prioridad a los trabajadores de salud y las personas en la primera línea de respuesta.',
            homeless: 'Este lugar está dirigido a las personas sin hogar.',
            telemed: 'Se requiere una consulta de telemedicina antes de realizar pruebas en este lugar.',
            onlineQuest: 'Se debe completar un cuestionario en línea antes de acudir a este sitio.',
          },
          notes: {
            schedApp: 'Se requiere cita para las pruebas.',
            refReq: 'Se necesita derivación.',
            schedAppRefReq: 'Se necesita cita y derivación.',
            noApp: 'No se requiere cita para las pruebas.',
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
            title: 'COVID-19 检测地点',
            subtitle: '搜索您附近的 COVID-19 检测地点',
            bannerAlert: '今天很多地点均关闭。有关更多信息，请查看具体地点详细信息。',
            noResults: '在您的搜索范围内未找到检测地点。请致电您的医疗保健提供者或访问公共卫生部 (Department of Public Health) 的 COVID-19 网站，了解关于 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">在费城进行检测</a>的信息.',
          },
          introPage: {
            p1: '费城市有许多常驻及临时检测站。<a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">查看哪些人应接受检测。</a>',
            section1Title: '查找临时检测服务站',
            p2: '临时检测服务站设立在临时地点并且未在地图上显示。<a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">查看检测服务的日程详情。</a>',
            section2Title: '查找检测站',
            p3: '使用此查找器，即可：',
            ol1: {
              li1: '定位费城市的 COVID-19 检测站。',
              li2: '在地图上选择地点，即可了解详情。',
              li3: '在去做检测之前，联系服务提供者。',
            },
            p4: '检测站的提示和要求',
            p5: '您不必自行承担检测费用。然而，一些检测站可能向您的保险计划开具账单以支付诊疗费。',
            p6: '检测站可能要求您提供身份证件或健康保险信息。如果您没有上述证明，仍然可以进行检测。',
            p7: '一些检测站可能：',
            ul1: {
              li1: '只对符合一定条件的人群提供检测。',
              li2: '需要预约。',
              li3: '要求您提供医生开具的转诊信函。',
              li4: '要求您待在您的车里（如免下车检测服务站）。',
            },
            callout1: {
              p1: '<b>有疑问？</b> 联系您的医疗保健提供者或浏览网站 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">在费城参加检测</a>，查看常见问题与解答。',
            },
          },
          languages: {
            languagesSpoken: '所用语言：',
            english: '英语',
            spanish: '西班牙语',
            chinese: '中文',
            french: '法语',
            arabic: '阿拉伯',
            hindi: '印地语',
            algerian: '阿尔及利亚人',
            russian: '俄语',
            translationServices: '电话译员服务：',
          },
          address: 'chinese address',
          keyword: 'chinese keyword',
          beforeYouGo: '在您出发前请先了解以下信息',
          checkSite: '查看特定场所的信息。 时间有可能会变动。',
          hoursVary: '时间和可用性各不相同。',
          eligibility: '详情',
          testingHours: '检测时间',
          daysOfOperation: '营业时间',
          Monday: '周一',
          Tuesday: '周二',
          Wednesday: '周三',
          Thursday: '周四',
          Friday: '周五',
          Saturday: '周六',
          Sunday: '周日',
          // access: '访问',
          Yes: '是',
          No: '否',
          Unknown: '未知',
          website: '网站',
          process: {
            category: '流程',
            dt: '免下车',
            wu: '步行',
            both: '免下车和步行',
          },
          symptomatic: {
            category: '必须有症状',
            null: '',
            symptom: '必须有症状',
            asymptom: '不需要症状（但可能需要暴露）',
          },
          rapid: {
            category: '快速测试',
            Yes: '网站提供快速测试（请致电获取详细信息）',
          },
          refReq: {
            category: '需要转介',
            null: '',
            yes: '需要转介',
            no: '不需要转介',
          },
          patientAge: {
            category: '患者年龄',
            null: '',
            year14: '14 岁以上',
            year18: '18 岁以上',
            pedCare: '提供儿科检测',
          },
          panelText: {
            p1: '如果您无法通过您的医疗保健提供者进行 COVID-19 检测，此工具可以帮助您找到费城市内的免费检测地点。',
          },
          restrictions: {
            lowInc: '此站点是为低收入家庭和个人准备的。',
            year14: '必须 14 岁或以上。',
            year18: '必须 18 岁或以上。',
            netPat: '患者必须在提供者网络中才能在此站点接受检测。',
            medPrior: '此站点将优先考虑医疗保健工作人员和急救人员。',
            homeless: '此站点是为无家可归的人准备的。',
            telemed: '在此站点进行检测前需要进行远程医疗看诊。',
            onlineQuest: '来本站点之前必须完成在线调查问卷。',
          },
          notes: {
            schedApp: '检测需要预约。',
            refReq: '需要转介。',
            schedAppRefReq: '需要预约和转介。',
            noApp: '检测无需预约。',
            testAll: '即使未出现症状也可提供检测。',
          },
          facilityType: {
            drugstore: '药房',
            fieldSite: '户外地点',
            clinic: '诊所',
            hospital: '医院',
            other: '其他',
            phmcHC: 'PHMC 健康中心',
            urgentCare: '急救中心',
            cityHC: '市健康中心',
            homelessServices: '无家可归者服务',
          },
        },
        'vi': {
          language: 'Tiếng Việt',
          app: {
            title: 'Các cơ sở xét nghiệm COVID-19',
            subtitle: 'Tìm cơ sở xét nghiệm COVID-19 gần quý vị',
            bannerAlert: 'Hôm nay, nhiều địa điểm đóng cửa. Hãy kiểm tra các chi tiết về địa điểm cụ thể để biết thêm thông tin.',
            noResults: 'Không tìm thấy cơ sở xét nghiệm trong phạm vi tìm kiếm của quý vị. Vui lòng gọi điện cho nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị hoặc truy cập trang web về COVID-19 của Sở Y Tế Công Cộng để biết thông tin về a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cách nhận xét nghiệm tại Philadelphia</a>.',
          },
          introPage: {
            p1: 'Có các địa điểm xét nghiệm cố định và tạm thời trên khắp Philadelphia. <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">Tìm hiểu xem ai nên xét nghiệm</a>.',
            section1Title: 'Tìm một sự kiện xét nghiệm lưu động',
            p2: 'Sự kiện lưu động được tổ chức ở các địa điểm tạm thời và không được hiển thị trên bản đồ. <a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">Kiểm tra sự kiện trên lịch để biết thông tin chi tiết</a>.',
            section2Title: 'Tìm một địa điểm xét nghiệm',
            p3: 'Sử dụng trình tìm kiếm này để:',
            ol1: {
              li1: 'Định vị một địa điểm xét nghiệm COVID-19 ở Philadelphia.',
              li2: 'Chọn địa điểm trên bản đồ để biết thông tin chi tiết.',
              li3: 'Liên hệ với nhà cung cấp trước khi đi xét nghiệm.',
            },
            p4: 'Những điều nên dự kiến ở địa điểm xét nghiệm',
            p5: 'Bạn sẽ không phải trả tiền túi để làm xét nghiệm. Tuy nhiên, một số địa điểm có thể lập hóa đơn bảo hiểm của bạn đối với phí thăm khám.',
            p6: 'Ở địa điểm, bạn sẽ được yêu cầu trình giấy tờ nhận dạng và cũng có thể được yêu cầu cung cấp thông tin bảo hiểm y tế. Nếu không có những thứ này, bạn vẫn có thể làm xét nghiệm.',
            p7: 'Một số địa điểm có thể:',
            ul1: {
              li1: 'Hạn chế xét nghiệm đối với những người đáp ứng các tiêu chí nhất định.',
              li2: 'Yêu cầu hẹn trước.',
              li3: 'Yêu cầu có giới thiệu từ bác sĩ của bạn.',
              li4: 'Yêu cầu bạn ngồi trong xe (đối với các địa điểm cho phép lái xe qua).',
            },
            callout1: {
              p1: '<b>Có thắc mắc?</b> Gọi cho nhà cung cấp dịch vụ chăm sóc sức khỏe của bạn hoặc xem Các Câu hỏi Thường gặp của chúng tôi về <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">đi xét nghiệm ở Philadelphia</a>.',
            },
          },
          languages: {
            languagesSpoken: 'Các ngôn ngữ được nói:',
            english: 'Tiếng Anh',
            spanish: 'Tiếng Tây Ban Nha',
            chinese: 'Tiếng Trung Quốc',
            french: 'Tiếng Pháp',
            arabic: 'Tiếng Ả Rập',
            hindi: 'Tiếng Hindi',
            algerian: 'Người Algeria',
            russian: 'Tiếng Nga',
            translationServices: 'Dịch vụ thông dịch qua điện thoại:',
          },
          address: 'vietnamese address',
          keyword: 'vietnamese keyword',
          beforeYouGo: 'Trước khi quý vị đến',
          checkSite: 'Kiểm tra thông tin địa điểm cụ thể. Giờ hoạt động có thể thay đổi.',
          hoursVary: 'Giờ làm việc và tính sẵn có khác nhau.',
          eligibility: 'Chi tiết',
          testingHours: 'Giờ xét nghiệm',
          daysOfOperation: 'Ngày làm việc',
          Monday: 'Thứ hai',
          Tuesday: 'Thứ ba',
          Wednesday: 'Thứ tư',
          Thursday: 'Thứ năm',
          Friday: 'Thứ sáu',
          Saturday: 'thứ bảy',
          Sunday: 'Chủ Nhật',
          // access: 'Truy cập',
          Yes: 'Có',
          No: 'Không',
          Unknown: 'Không biết',
          website: 'Trang web',
          process: {
            category: 'Quy trình',
            dt: 'Lái xe qua',
            wu: 'Đi bộ vào',
            both: 'Lái xe qua & đi bộ vào',
          },
          symptomatic: {
            category: 'Phải có triệu chứng',
            null: '',
            symptom: 'Phải có triệu chứng',
            asymptom: 'Các triệu chứng không bắt buộc (nhưng có thể bị phơi nhiễm)',
          },
          rapid: {
            category: 'Kiểm tra nhanh',
            Yes: 'Cung cấp thử nghiệm nhanh (gọi để biết chi tiết)',
          },
          refReq: {
            category: 'Phải có giấy giới thiệu',
            null: '',
            yes: 'Phải có giấy giới thiệu',
            no: 'Không yêu cầu có giấy giới thiệu',
          },
          patientAge: {
            category: 'Tuổi của bệnh nhân',
            null: '',
            year14: 'Trên 14 tuổi',
            year18: 'Trên 18 tuổi',
            pedCare: 'Cung cấp dịch vụ xét nghiệm nhi khoa',
          },
          panelText: {
            p1: 'Nếu quý vị không được xét nghiệm COVID-19 thông qua nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị, thì công cụ này có thể giúp quý vị tìm cơ sở xét nghiệm miễn phí trong phạm vi Thành Phố Philadelphia.',
          },
          restrictions: {
            lowInc: 'Cơ sở này dành cho các gia đình và cá nhân có thu nhập thấp.',
            year14: 'Phải từ 14 tuổi trở lên.',
            year18: 'Phải từ 18 tuổi trở lên.',
            netPat: 'Bệnh nhân phải thuộc mạng lưới của nhà cung cấp để được xét nghiệm tại cơ sở này.',
            medPrior: 'Ưu tiên cho các nhân viên chăm sóc sức khỏe và nhân viên phản ứng tuyến đầu tại cơ sở này.',
            homeless: 'Cơ sở này dành cho người vô gia cư.',
            telemed: 'Phải được thăm khám y tế qua điện thoại trước khi xét nghiệm tại cơ sở này.',
            onlineQuest: 'Phải hoàn tất bảng câu hỏi trực tuyến trước khi đến thăm khám tại cơ sở này.',
          },
          notes: {
            schedApp: 'Yêu cầu đặt lịch hẹn để xét nghiệm',
            refReq: 'Phải có giấy giới thiệu.',
            schedAppRefReq: 'Phải có lịch hẹn và giấy giới thiệu.',
            noApp: 'Không cần đặt lịch hẹn để xét nghiệm.',
            testAll: 'Thực hiện xét nghiệm ngay cả khi không có triệu chứng.',
          },
          facilityType: {
            drugstore: 'Hiệu Thuốc',
            fieldSite: 'Cơ Sở Tại Hiện Trường',
            clinic: 'Phòng Khám',
            hospital: 'Bệnh Viện',
            other: 'Khác',
            phmcHC: 'Trung tâm y tế PHMC',
            urgentCare: 'Chăm Sóc Khẩn Cấp',
            cityHC: 'Trung tâm y tế thành phố',
            homelessServices: 'Dịch vụ vô gia cư',
          },
        },
        'ru': {
          language: 'Pусский',
          app: {
            title: 'Пункты тестирования на COVID-19',
            subtitle: 'Найдите тест на COVID-19 поблизости',
            bannerAlert: 'Многие места сегодня закрыты. Для получения более подробной информации о месте отдыха просмотрите дополнительные сведения.',
            noResults: 'В ходе поиска не найдено ни одного пункта для тестирования. Позвоните своему врачу или посетите веб-сайт Департамента здравоохранения, посвященный COVID-19, и узнайте, как <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">пройти тестирование в Филадельфии</a>.',
          },
          introPage: {
            p1: 'В разных районах Филадельфии работают постоянные и временные центры тестирования. <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">Узнайте, кому нужно сдавать тесты.</a>.',
            section1Title: 'Найдите мобильный центр тестирования',
            p2: 'Мобильные центры тестирования, где тесты можно сдать в определенные даты, не показаны на карте. <a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">Проверьте расписание мобильных центров тестирования в календаре</a>.',
            section2Title: 'Найдите центр тестирования',
            p3: 'С помощью этого инструмента вы можете:',
            ol1: {
              li1: 'Найти центр тестирования на COVID-19 в Филадельфии.',
              li2: 'Выбрать центр на карте и узнать подробные сведения.',
              li3: 'Связаться с центром до сдачи теста.',
            },
            p4: 'Сдача теста в центре тестирования',
            p5: 'Вы не платите за сдачу теста. Однако в некоторых центрах могут выставить счет за посещение вашей страховой компании.',
            p6: 'Вас попросят предъявить удостоверение личности, а в некоторых центрах могут также попросить сообщить информацию о медицинском страховании. Вы можете сдать тест, даже если у вас этого нет.',
            p7: 'В некоторых центрах тестирования:',
            ul1: {
              li1: 'Тесты делают только людям, соответствующим определенным критериям.',
              li2: 'Требуется предварительная запись.',
              li3: 'Требуется направление от врача.',
              li4: 'Вас могут попросить оставаться в автомобиле (в центрах «drive-thru»).',
            },
            callout1: {
              p1: '<b>Есть вопросы?</b> Позвоните своему врачу или прочитайте ответы на часто задаваемые вопросы о <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">тестировании на COVID-19 в Филадельфии</a>.',
            },
          },
          languages: {
            languagesSpoken: 'Доступные языки:',
            english: 'Английский',
            spanish: 'Испанский',
            chinese: 'Китайский',
            french: 'Французский',
            arabic: 'арабский',
            hindi: 'хинди',
            algerian: 'алжирский',
            russian: 'русский',
            translationServices: 'Услуги переводчика по телефону:',
          },
          address: 'russian address',
          keyword: 'russian keyword',
          beforeYouGo: 'Прежде чем вы пойдете',
          checkSite: 'уточните информацию по конкретному пункту. Часы работы могут меняться.',
          hoursVary: 'Часы работы и возможность оказания услуги могут меняться.',
          eligibility: 'Сведения',
          testingHours: 'Часы тестирования',
          daysOfOperation: 'Рабочие дни',
          Monday: 'Пн',
          Tuesday: 'Вт',
          Wednesday: 'Ср',
          Thursday: 'Чт',
          Friday: 'Пт',
          Saturday: 'Сб',
          Sunday: 'Вс',
          // access: 'Доступ',
          Yes: 'Да',
          No: 'Нет',
          Unknown: 'Неизвестно',
          website: 'Веб-сайт',
          process: {
            category: 'Процесс',
            dt: 'Без выхода из машины',
            wu: 'Пункт внутри помещения',
            both: 'Обслуживание как без выхода из машины, так и внутри помещения',
          },
          symptomatic: {
            category: 'Наличие симптомов обязательно',
            null: '',
            symptom: 'Наличие симптомов обязательно',
            asymptom: 'Симптомы не требуются (но возможно воздействие)',
          },
          rapid: {
            category: 'Экспресс-тестирование',
            Yes: 'Предлагает экспресс-тестирование (подробности по телефону)',
          },
          refReq: {
            category: 'Требуется направление',
            null: '',
            yes: 'Требуется направление',
            no: 'Направление не требуется',
          },
          patientAge: {
            category: 'Возраст пациента',
            null: '',
            year14: 'C 14 лет',
            year18: 'С 18 лет',
            pedCare: 'Проводится тестирование пациентов детского возраста',
          },
          panelText: {
            p1: 'Если вы не можете пройти тест COVID-19 у своего врача, этот инструмент поможет вам найти пункт бесплатного тестирования в пределах городской черты Филадельфии.',
          },
          restrictions: {
            lowInc: 'Данный пункт тестирования предназначен для семей и лиц с низкими доходами. ',
            year14: 'Для лиц не моложе 14 лет.',
            year18: 'Для лиц не моложе 18 лет.',
            netPat: 'Для прохождения тестирования в данном пункте необходимо быть пациентом сети этого медучреждения.',
            medPrior: 'В данном пункте тестирования приоритет имеют работники системы здравоохранения и служб экстренного реагирования.',
            homeless: 'Данный пункт тестирования предназначен для бездомных людей.',
            telemed: 'Перед тестированием в данном пункте требуется дистанционное посещение врача.',
            onlineQuest: 'Перед посещением данного пункта требуется пройти онлайн-опрос.',
          },
          notes: {
            schedApp: 'Для прохождения тестирования нужна предварительная запись.',
            refReq: 'Требуется направление от врача.',
            schedAppRefReq: 'Требуется предварительная запись и направление от врача.',
            noApp: 'Для прохождения тестирования предварительная запись не нужна.',
            testAll: 'Тестирование проводится даже при отсутствии симптомов.',
          },
          facilityType: {
            drugstore: 'Аптека',
            fieldSite: 'Полевой пункт',
            clinic: 'Клиника',
            hospital: 'Больница',
            other: 'Прочее',
            phmcHC: 'Медицинский центр PHMC',
            urgentCare: 'Пункт неотложной помощи',
            cityHC: 'Городской медицинский центр',
            homelessServices: 'Пункт оказания услуг для бездомных',
          },
        },
        'fr': {
          language: 'Français',
          app: {
            title: 'Sites de dépistage du COVID-19',
            subtitle: 'Trouver où recevoir un test de dépistage du COVID-19 à proximité de chez vous',
            bannerAlert: 'De nombreux sites sont fermés aujourd’hui. Consultez les détails spécifiques au site pour obtenir de plus amples informations.',
            noResults: 'Aucun site de dépistage n’a été trouvé pour votre recherche. Veuillez appeler votre prestataire de soins de santé ou consulter le site Web du département de la Santé publique sur le COVID-19 pour obtenir des informations sur les tests de dépistage à Philadelphie.',
          },
          introPage: {
            p1: 'Des sites de dépistage permanents et temporaires se trouvent dans toute la ville de Philadelphie. <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">Découvrez qui devrait se faire dépister</a>.',
            section1Title: 'Trouvez un événement éphémère de dépistage',
            p2: 'Les événements éphémères ont lieu dans des sites temporaires et ne figurent pas sur la carte. <a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">Consultez le calendrier des événements pour obtenir des détails</a>.',
            section2Title: 'Trouver un site de dépistage',
            p3: 'Utilisez ce localisateur pour :',
            ol1: {
              li1: 'Trouver un site de dépistage COVID-19 à Philadelphie.',
              li2: 'Sélectionner son emplacement sur la carte pour en obtenir les détails.',
              li3: 'Contacter le prestataire avant de vous y rendre pour un test.',
            },
            p4: 'Au site de dépistage :',
            p5: 'Vous n’aurez rien à payer pour vous faire dépister. Cependant, certains sites pourraient envoyer une facture à votre assurance pour le forfait de la visite.',
            p6: 'Il vous sera demandé une pièce d’identité, et possiblement vos informations d’assurance maladie. Si vous ne les avez pas, vous pourrez quand même vous faire dépister.',
            p7: 'Il est possible que certains sites :',
            ul1: {
              li1: 'Limitent le dépistage aux personnes répondant à certains critères.',
              li2: 'Exigent un rendez-vous.',
              li3: 'Exigent un renvoi de votre médecin.',
              li4: 'Demandent que vous restiez dans votre voiture (sites drive-thru)',
            },
            callout1:{
              p1: '<b>Des questions ?</b> Appelez votre prestataire de soins de santé ou consultez notre FAQ sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">le dépistage à Philadelphie.</a>',
            },
          },
          // introPage:{
          //   introTitle: 'À propos de cet outil de recherche',
          //   p1: 'Cet outil peut vous aider à trouver où recevoir un test de dépistage du COVID-19 à Philadelphie. (Voir notre FAQ pour toute information complémentaire sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les personnes qui devraient se faire tester</a>.) Vous pouvez :',
          //   ul1:{
          //     li1: 'Rechercher un site de dépistage à partir d’une adresse.',
          //     li2: 'Cliquer sur la carte pour obtenir des informations concernant un site particulier.',
          //     li3: 'Filtrer la liste des sites selon les balises données.',
          //   },
          //   section1Title: 'Découvrir si vous pouvez en bénéficier.',
          //   p2: 'Tous les sites de dépistage sont gratuits. On vous demandera une pièce d’identité et peut-être des informations sur votre assurance-santé. Si vous n’avez pas de pièce d’identité ou d’assurance-santé, vous pouvez tout de même vous faire dépister. En outre, certains sites peuvent :',
          //   ul2:{
          //     li1: 'Limiter les tests de dépistage aux personnes qui remplissent certains critères.',
          //     li2: 'Exiger un rendez-vous.',
          //     li3: 'Exiger une référence de votre médecin traitant.',
          //     li4: 'Demander que vous restiez dans votre véhicule (pour les sites en drive).',
          //   },
          //   p3: 'Consultez les détails spécifiques à un site sur la carte. Appelez ensuite le prestataire ou consultez son site Web avant de vous déplacer.',
          //   callout1:{
          //     p1: '<b>Des questions ?</b> Veuillez appeler votre prestataire de soins de santé ou consulter notre FAQ sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les tests de dépistage à Philadelphie.</a>',
          //   },
          //   section2Title: 'Sites mobiles et ponctuels de dépistage',
          //   p4: 'Pour trouver un site mobile ou un site ponctuel de dépistage à Philadelphie',
          // },
          languages: {
            languagesSpoken: 'Langues parlées:',
            english: 'Anglais',
            spanish: 'Espagnol',
            chinese: 'Chinois',
            french: 'Français',
            arabic: 'Arabe',
            hindi: 'Hindi',
            algerian: 'Algérien',
            russian: 'Russe',
            translationServices: 'Services d’interprétation par téléphone:',
          },
          address: 'french address',
          keyword: 'french keyword',
          beforeYouGo: 'Avant de vous déplacer',
          checkSite: 'Consulter les informations concernant le site donné. Les horaires peuvent changers.',
          hoursVary: 'Les horaires et la disponibilité varient.',
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
          // access: 'Accès',
          Yes: 'Oui',
          No: 'Non',
          Unknown: 'Inconnu',
          website: 'Site Web',
          process:{
            category: 'Processus',
            dt: 'Drive',
            wu: 'Guichet',
            both: 'Drive et guichet',
          },
          symptomatic: {
            category: 'Sans symptômes',
            null: '',
            symptom: 'Sans symptômes',
            asymptom: 'Symptômes non requis (mais une exposition peut l\'être)',
          },
          rapid: {
            category: 'Test de diagnostic rapide',
            Yes: 'Le site propose des tests rapides (appelez pour plus de détails)',
          },
          refReq: {
            category: 'Référence du médecin exigée',
            null: '',
            yes: 'Référence du médecin exigée',
            no: 'Aucune référence exigée',
          },
          patientAge: {
            category: 'Âge du patient',
            null: '',
            year14: '+ de 14 ans',
            year18: '+ de 18 ans',
            pedCare: 'Propose des tests de dépistage pour enfants',
          },
          panelText:{
            p1: 'Si vous ne pouvez pas vous faire dépister pour le COVID-19 par le biais de votre médecin traitant cet outil peut vous aider à trouver un site de dépistage gratuit dans la ville de Philadelphie.',
          },
          restrictions:{
            lowInc: 'Ce site est destiné aux familles et aux personnes à faibles revenus. ',
            year14: 'Doit être âgé d’au moins 14 ans.',
            year18: 'Doit être âgé d’au moins 18 ans.',
            netPat: 'Le patient doit faire partie du réseau du prestataire de soins pour recevoir un test à ce site.',
            medPrior: 'La priorité sera donnée au personnel soignant et aux premiers intervenants à ce site.',
            homeless: 'Ce site est destiné aux sans-abri.',
            telemed: 'Une visite de télémédecine est obligatoire avant de se faire tester à ce site.',
            onlineQuest: 'Un questionnaire est à remplir en ligne avant de se présenter à ce site.',
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
