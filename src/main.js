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
        'Monday': function(state, item) {
          return item.attributes.Monday !== null;
        },
        'Tuesday': function(state, item) {
          return item.attributes.Tuesday !== null; 
        },
        'Wednesday': function(state, item) {
          return item.attributes.Wednesday !== null; 
        },
        'Thursday': function(state, item) {
          return item.attributes.Thursday !== null; 
        },
        'Friday': function(state, item) {
          return item.attributes.Friday !== null; 
        },
        'Saturday': function(state, item) {
          return item.attributes.Saturday !== null; 
        },
        'Sunday': function(state, item) {
          return item.attributes.Sunday !== null; 
        },
        // 'Mon.': {
        //   name: 'Monday',
        //   value: function(state, item) { return item.attributes.Monday !== null;},
        // },
        // 'Tues.': {
        //   name: 'Tuesday',
        //   value: function(state, item) { return item.attributes.Tuesday !== null; },
        // },
        // 'Wed.': {
        //   name: 'Wednesday',
        //   value: function(state, item) { return item.attributes.Wednesday !== null; },
        // },
        // 'Thurs.': {
        //   name: 'Thursday',
        //   value: function(state, item) { return item.attributes.Thursday !== null; },
        // },
        // 'Fri.': {
        //   name: 'Friday',
        //   value: function(state, item) { return item.attributes.Friday !== null; },
        // },
        // 'Sat.': {
        //   name: 'Saturday',
        //   value: function(state, item) { return item.attributes.Saturday !== null; },
        // },
        // 'Sun.': {
        //   name: 'Sunday',
        //   value: function(state, item) { return item.attributes.Sunday !== null; },
        // },
      },
      referralRequired: {
        'Yes': function(state, item) {
          return item.attributes.Referral === 'Yes'; 
        },
        'No': function(state, item) {
          return item.attributes.Referral === 'No'; 
        },
        'Unknown': function(state, item) {
          return item.attributes.Referral == null; 
        },
        // 'Yes': {
        //   name: 'Referral',
        //   value: function(state, item) { return item.attributes.Referral !== null; },
        // },
        // 'No': {
        //   name: 'Referral',
        //   value: function(state, item) { return item.attributes.Referral !== null; },
        // },
        // 'Unknown': {
        //   name: 'Referral',
        //   value: function(state, item) { return item.attributes.Referral !== null; },
        // },
      },
      access: {
        'Drive thru': function(state, item) {
          return [ 'Drive Thru', 'Drive Thru/Walk-Up' ].includes(item.attributes.drive_thruwalk_up); 
        },
        'Walk up': function(state, item) {
          return [ 'Walk', 'Drive Thru/Walk-Up' ].includes(item.attributes.drive_thruwalk_up); 
        },
        // 'Drive thru': {
        //   name: 'drive_thruwalk_up',
        //   value: function(state, item) { return item.attributes.drive_thruwalk_up !== null; },
        // },
        // 'Walk up': {
        //   name: 'drive_thruwalk_up',
        //   value: function(state, item) { return item.attributes.drive_thruwalk_up !== null; },
        // },
      },
      // 'public': function(state, item) { return item.attributes.private_public === 'Public'; },
    },
  },
  markerType: 'circle-marker',
  locationSlots: {
    title: function(state, item) {
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
            title: 'Covid testing sites',
            subtitle: 'Find covid testing sites',
            about: 'About this finder',
            betaTag: 'Beta',
            feedback: 'Feedback',
            searchPlaceholder: 'Search by address',
            viewMap: 'View map',
            viewList: 'View list',
            noResults: 'No testing site was found within your search. Please call your health care provider or visit the Department of Public Health’s COVID-19 website for information about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested">getting tested in Philadelphia</a>.',
          },
          refinePanel: {
            refine: 'Refine',
            clearAll: 'Clear all',
            applyFilters: 'Apply filters',
          },
          beforeYouGo: 'Before you go',
          checkSite: 'Check the specific site information. Hours are subject to change.',
          hoursVary: 'Hours and availability varies.',
          process: 'Process',
          referralRequired: 'Referral needed?',
          eligibility: 'Eligibility',
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
          website: 'website',
          driveThrough: {
            'Drive thru': 'Drive thru',
            'Walk up': 'Walk up',
            'Drive-thru/walk-up': 'Drive-thru/walk-up',
          },
          panelText:{
            p1: 'If you are unable to get a COVID-19 test through your health care provider, this tool can help you find a free test within the City of Philadelphia.',
          },
          restrictons: {
            'Must be 18 years or older': 'Must be 18 years or older',
            'Must be 14 years or older': 'Must be 14 years or older',
            'Network patients only': 'Network patients only',
            'Low-income patients': 'Low-income patients',
            'Priority given to health care workers and first responders': 'Priority given to health care workers and first responders',
          },
          notes:{
            'Call ahead for an appointment.': 'Call ahead for an appointment.',
            'Call 10 minutes before arrival. Schedule appointment through JeffConnect and JeffNow.' : 'Call 10 minutes before arrival. Schedule appointment through JeffConnect and JeffNow.',
            'Closed Call ahead for an appointment. Referrals from Mercy physician required.': 'Closed Call ahead for an appointment. Referrals from Mercy physician required.', 
            'Appointments/referrals through JeffConnect.' : 'Appointments/referrals through JeffConnect.',
            'Closed Appointments/referral through JeffConnect': 'Closed Appointments/referral through JeffConnect',
            'Referral from Mercy physician required.': 'Referral from Mercy physician required.',
            'Referral by provider required.': 'Referral by provider required.',
            'Walk-ins allowed, no appointment necessary.' : 'Walk-ins allowed, no appointment necessary.',
            'Call 10 minutes before arrival. Schedule appointment through /JeffConnect and JeffNow.' : 'Call 10 minutes before arrival. Schedule appointment through JeffConnect and JeffNow.',
          },
          facilityType: {
            'Clinic': 'Clinic',
            'Urgent Care' : 'Urgent Care',
            'Hospital' : 'Hospital',
            'Health Center' : 'Health Center',
            'Drug Store': 'Drug Store',
            'Health center (PHMC)': 'Health center (PHMC)', 
            'Field Site': 'Field Site',
            'Medical': 'Medical',
            'Other': 'Other',
          },
          
        },
        'es': {
          language: 'Español',
          app: {
            title: 'Lugares de distribución de alimentos',
            subtitle: 'Obtenga alimentos y comidas gratis durante la epidemia de la COVID-19',
            refine: 'Ajustar',
            clearAll: 'Eliminar todo',
            about: 'Sobre este buscador',
            feedback: 'Comentarios',
            searchPlaceholder: 'Buscar por dirección',
            viewMap: 'Ver mapa',
            viewList: 'Ver lista',
            applyFilters: 'Aplicar filtros',
            betaTag: 'Beta',
          },
          eligibility: 'Elegibilidad',
          pickupDetails: 'Detalles y horarios de retiro',
          beforeYouGo: 'Antes de ir',
          change: 'Cambio de horarios',
          closure: 'Cierre temporal',
          checkSite: 'Verifique la información específica del lugar. Los horarios pueden cambiar.',
          hoursVary: 'Los horarios y la disponibilidad pueden variar.',
          Monday: 'Lunes',
          Tuesday: 'Martes',
          Wednesday: 'Miércoles',
          Thursday: 'Jueves',
          Friday: 'Viernes',
          Saturday: 'Sábado',
          Sunday: 'Domingo',
          referralRequired: 'Referral required?',
          access: 'Access',
          Yes: 'Si',
          No: 'Non',
          Unknown: 'Unknown',
          'Drive thru': 'Drive thru',
          'Walk up': 'Walk up',
          sections: {},
        },
        'ch': {
          language: '中文',
          app: {          
            title: '食品分发地点',
            subtitle: '在冠状病毒-19期间查找免费食物和餐点',
            refine: '细化',
            clearAll: '全部清除',
            about: '有关这个搜索工具',
            feedback: '反馈',
            searchPlaceholder: '按地址搜索',
            viewMap: '看地图',
            viewList: '看列单',
            applyFilters: '使用过滤器',
            betaTag: '贝塔',
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
            refine: 'Tinh chỉnh',
            clearAll: 'Xóa hết',
            about: 'Giới thiệu công cụ tìm kiếm này',
            feedback: 'Ý kiến phản hồi',
            searchPlaceholder: 'Tìm kiểm theo địa chỉ',
            viewMap: 'Xem bản đồ',
            viewList: 'Xem danh sách',
            applyFilters: 'Áp dụng bộ lọc',
            betaTag: 'Bản Beta',
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
            refine: 'Уточнить параметры поиска',
            clearAll: 'Очистить все',
            about: 'Об этом средстве поиска ',
            feedback: 'Обратная связь',
            searchPlaceholder: 'Поиск по адресу',
            viewMap: 'Посмотреть на карте',
            viewList: 'Посмотреть список',
            applyFilters: 'Применить фильтры',
            betaTag: 'Бета-версия',
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
            title: 'Sites de distribution alimentaire',
            subtitle: 'Trouver de la nourriture et des repas gratuits pendant le COVID-19',
            refine: 'Raffiner',
            clearAll: 'Tout effacer',
            about: 'À propos de cet outil de recherche',
            feedback: 'Commentaires',
            searchPlaceholder: 'Recherche à partir de l’adresse',
            viewMap: 'Voir la carte',
            viewList: 'Voir la liste',
            applyFilters: 'Appliquer les filtres',
            betaTag: 'Bêta',
          },
          eligibility: 'Admissibilité au programme',
          pickupDetails: 'Détails de collecte',
          beforeYouGo: 'Avant de vous déplacer ',
          change: 'Changement d’horaire',
          closure: 'Fermeture temporaire',
          checkSite: 'Consulter les informations concernant le site donné. Les horaires peuvent changers.',
          hoursVary: 'Les horaires et la disponibilité varient.',
          Monday: 'Lundi',
          Tuesday: 'Mardi',
          Wednesday: 'Mercredi',
          Thursday: 'Jeudi',
          Friday: 'Vendredi',
          Saturday: 'Samedi',
          Sunday: 'Dimanche',
          referralRequired: 'Referral required?',
          access: 'Access',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          'Drive thru': 'Drive thru',
          'Walk up': 'Walk up',
          sections: {},
        },
      },
    },
  },
});
