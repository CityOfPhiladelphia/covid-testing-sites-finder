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
  alerts: {
    modal: {
      enabled: true,
      header: 'Closures',
      body: '<p>All City-run COVID-19 testing sites and health centers are open and on a normal schedule, though others may be closed. Please call ahead to ensure that the site you are going to is open.</p>',
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
  comboSearch: {
    dropdown: [ 'address' ],
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
      return item.attributes.Visibility === 'pub';
    },
  },
  refine: {
    type: 'multipleFieldGroups',
    multipleFieldGroups: {
      daysOfOperation: {
        'Monday': {
          unique_key: 'day_Monday',
          value: function(item) {
            return item.attributes.Monday !== null;
          },
        },
        'Tuesday': {
          unique_key: 'day_Tuesday',
          value: function(item) {
            return item.attributes.Tuesday !== null;
          },
        },
        'Wednesday': {
          unique_key: 'day_Wednesday',
          value: function(item) {
            return item.attributes.Wednesday !== null;
          },
        },
        'Thursday': {
          unique_key: 'day_Thursday',
          value: function(item) {
            return item.attributes.Thursday !== null;
          },
        },
        'Friday': {
          unique_key: 'day_Friday',
          value: function(item) {
            return item.attributes.Friday !== null;
          },
        },
        'Saturday': {
          unique_key: 'day_Saturday',
          value: function(item) {
            return item.attributes.Saturday !== null;
          },
        },
        'Sunday': {
          unique_key: 'day_Sunday',
          value: function(item) {
            return item.attributes.Sunday !== null;
          },
        },
      },
      access: {
        'Drive thru': {
          unique_key: 'dtwu_driveThru',
          // unique_key: 'driveThrough.dt',
          i18n_key: 'driveThrough.dt',
          value: function(item) {
            return [ 'dt', 'both' ].includes(item.attributes.drive_thruwalk_up);
          },
        },
        'Walk up': {
          unique_key: 'dtwu_walkUp',
          i18n_key: 'driveThrough.wu',
          value: function(item) {
            return [ 'wu', 'both' ].includes(item.attributes.drive_thruwalk_up);
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
  footer: {
    'HowToUse': false,
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
            subtitle: 'Find a free COVID-19 test near you',
            bannerAlert: 'Many sites are closed today. Check specific site details for more information.',
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
          access: 'Process',
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
            bannerAlert: 'Muchos lugares están cerrados hoy. Consulte los detalles específicos del lugar para obtener más información.',
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
          Monday: 'Lun.',
          Tuesday: 'Mar.',
          Wednesday: 'Mié.',
          Thursday: 'Jue.',
          Friday: 'Vie.',
          Saturday: 'Sáb.',
          Sunday: 'Dom.',
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
            title: 'COVID-19 检测地点',
            subtitle: '搜索您附近的 COVID-19 免费检测地点',
            bannerAlert: '今天很多地点均关闭。有关更多信息，请查看具体地点详细信息。',
            noResults: '在您的搜索范围内未找到检测地点。请致电您的医疗保健提供者或访问公共卫生部 (Department of Public Health) 的 COVID-19 网站，了解关于 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">在费城进行检测</a>的信息.',
          },
          introPage: {
            introTitle: '关于此搜索工具',
            p1: '此工具可以帮助您找到费城的 COVID-19 免费检测地点。（关于 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">“应接受测试人员”</a>的更多信息，请参见我们的“常见问题”。）您可以：',
            ul1: {
              li1: '按地址搜索检测地点。',
              li2: '点击地图上的位置了解具体地点信息。',
              li3: '按提供的标签筛选地点列表',
            },
            section1Title: '查询您是否符合条件',
            p2: '每个地点的要求各不相同。检测地点不需要缴纳保险或提供公民身份证明。但一些地点可能：',
            ul2: {
              li1: '仅限符合特定标准的人进行检测。',
              li2: '需要预约。',
              li3: '需要医生转介。',
              li4: '要求您留在车里（适用于免下车地点）。',
            },
            p3: '查看地图上某一位置的详情。然后，前去检测前，请致电或访问提供者的网站。',
            callout1: {
              p1: '<b>是否有任何疑问？</b>关于在费城进行检测的信息，请致电您的医疗保健提供者或参见我们的“常见问题”.',
            },
          },
          beforeYouGo: '在您出发前请先了解以下信息',
          checkSite: '检测不需要资金保险或提供公民身份证明。但是，许多地点会有其他要求。查看具体地点详情。',
          hoursVary: '时间和可用性各不相同。',
          process: '流程',
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
          access: '访问',
          Yes: '是',
          No: '否',
          Unknown: '未知',
          website: '网站',
          driveThrough: {
            dt: '免下车',
            wu: '步行',
            both: '免下车和步行',
          },
          panelText: {
            p1: '如果您无法通过您的医疗保健提供者进行 COVID-19 检测，此工具可以帮助您找到费城市内的免费检测地点。',
          },
          restrictions: {
            lowInc: '适用于低收入家庭和个人。',
            year14: '必须 14 岁或以上。',
            year18: '必须 18 岁或以上。',
            netPat: '必须是提供者网络内的患者。',
            medPrior: '优先考虑医疗保健工作人员和急救人员。',
            homeless: '适用于无家可归者。',
          },
          notes: {
            schedApp: '必须安排预约。',
            refReq: '需要转介。',
            schedAppRefReq: '需要预约和转介。',
            noApp: '无需预约。',
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
            subtitle: 'Tìm cơ sở xét nghiệm COVID-19 miễn phí gần quý vị',
            bannerAlert: 'Hôm nay, nhiều địa điểm đóng cửa. Hãy kiểm tra các chi tiết về địa điểm cụ thể để biết thêm thông tin.',
            noResults: 'Không tìm thấy cơ sở xét nghiệm trong phạm vi tìm kiếm của quý vị. Vui lòng gọi điện cho nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị hoặc truy cập trang web về COVID-19 của Sở Y Tế Công Cộng để biết thông tin về a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cách nhận xét nghiệm tại Philadelphia</a>.',
          },
          introPage: {
            introTitle: 'Giới thiệu công cụ tìm kiếm này',
            p1: 'Công cụ này có thể giúp quý vị tìm một cơ sở xét nghiệm miễn phí tại Philadelphia. (Xem Các Câu Hỏi Thường Gặp của chúng tôi để biết thêm thông tin về <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">những người nên được xét nghiệm</a>.) Quý vị có thể:',
            ul1: {
              li1: 'Tìm cơ sở xét nghiệm theo địa chỉ.',
              li2: 'Nhấn vào địa điểm trên bản đồ để biết thông tin về cơ sở cụ thể.',
              li3: 'Lọc danh sách cơ sở bằng các thẻ gắn được cung cấp.',
            },
            section1Title: 'Tìm hiểu liệu quý vị có hội đủ điều kiện không',
            p2: 'Mỗi cơ sở có các yêu cầu khác nhau. Không cơ sở xét nghiệm nào yêu cầu bảo hiểm thanh toán hay bằng chứng về tư cách công dân. Nhưng một số cơ sở có thể:',
            ul2: {
              li1: 'Hạn chế chỉ xét nghiệm cho những người đáp ứng các tiêu chí nhất định.',
              li2: 'Yêu cầu đặt lịch hẹn.',
              li3: 'Yêu cầu giấy giới thiệu từ bác sĩ của quý vị.',
              li4: 'Yêu cầu quý vị ở yên trong xe (với các cơ sở lái xe qua).',
            },
            p3: 'Kiểm tra thông tin cụ thể chi tiết của địa điểm trên bản đồ. Sau đó, gọi điện hoặc truy cập trang web của nhà cung cấp trước khi đến xét nghiệm.',
            callout1: {
              p1: '<b>Quý vị có câu hỏi?</b> Vui lòng gọi điện cho nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị hoặc xem Các Câu Hỏi Thường Gặp của chúng tôi về <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cách nhận xét nghiệm tại Philadelphia</a>.',
            },
          },
          beforeYouGo: 'Trước khi quý vị đến',
          checkSite: 'Việc xét nghiệm không yêu cầu phải có bảo hiểm thanh toán hay bằng chứng về tư cách công dân. Nhưng nhiều cơ sở có các yêu cầu khác. Hãy kiểm tra thông tin chi tiết của cơ sở cụ thể.',
          hoursVary: 'Giờ làm việc và tính sẵn có khác nhau.',
          process: 'Quy trình',
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
          access: 'Truy cập',
          Yes: 'Có',
          No: 'Không',
          Unknown: 'Không biết',
          website: 'Trang web',
          driveThrough: {
            dt: 'Lái xe qua',
            wu: 'Đi bộ vào',
            both: 'Lái xe qua & đi bộ vào',
          },
          panelText: {
            p1: 'Nếu quý vị không được xét nghiệm COVID-19 thông qua nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị, thì công cụ này có thể giúp quý vị tìm cơ sở xét nghiệm miễn phí trong phạm vi Thành Phố Philadelphia.',
          },
          restrictions: {
            lowInc: 'Dành cho các gia đình và cá nhân có thu nhập thấp.',
            year14: 'Phải từ 14 tuổi trở lên.',
            year18: 'Phải từ 18 tuổi trở lên.',
            netPat: 'Phải là bệnh nhân trong mạng lưới của nhà cung cấp.',
            medPrior: 'Ưu tiên cho các nhân viên chăm sóc sức khỏe và nhân viên phản ứng tuyến đầu.',
            homeless: 'Dành cho người vô gia cư.',
          },
          notes: {
            schedApp: 'Phải sắp xếp lịch hẹn.',
            refReq: 'Phải có giấy giới thiệu.',
            schedAppRefReq: 'Phải có lịch hẹn và giấy giới thiệu.',
            noApp: 'Không cần đặt lịch hẹn.',
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
            subtitle: 'Найдите бесплатный тест на COVID-19 поблизости',
            bannerAlert: 'Многие места сегодня закрыты. Для получения более подробной информации о месте отдыха просмотрите дополнительные сведения.',
            noResults: 'В ходе поиска не найдено ни одного пункта для тестирования. Позвоните своему врачу или посетите веб-сайт Департамента здравоохранения, посвященный COVID-19, и узнайте, как <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">пройти тестирование в Филадельфии</a>.',
          },
          introPage: {
            introTitle: 'Об этом средстве поиска',
            p1: 'Этот инструмент поможет вам найти пункт бесплатного тестирования на COVID-19 в Филадельфии. (См. раздел часто задаваемых вопросов, чтобы подробнее узнать, <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">кто должен проходить тестирование</a>.) Вы можете:',
            ul1: {
              li1: 'Выполнить поиск пункта для тестирования по адресу.',
              li2: 'Нажать на местоположение на карте, чтобы получить конкретную информацию о пункте.',
              li3: 'Отфильтровать список пунктов по предоставленным тегам.',
            },
            section1Title: 'Узнать, имеете ли вы право',
            p2: 'В каждом пункте свои требования. Ни один пункт для тестирования не требует страхования платежей или подтверждения гражданства. Тем не менее, некоторые пункты имеют право:',
            ul2: {
              li1: 'Ограничивать тестирование, проводя его только для людей, которые соответствуют определенным критериям.',
              li2: 'Требовать предварительной записи.',
              li3: 'Требовать направления от вашего врача.',
              li4: 'Просить вас оставаться в машине (если обслуживание проводится без выхода из машины).',
            },
            p3: 'Проверьте дополнительные сведения о местоположении на карте. Затем, прежде чем отправляться на тестирование, позвоните врачу или посетите его веб-сайт.',
            callout1: {
              p1: '<b>Вопросы?</b> Позвоните своему врачу или посмотрите раздел часто задаваемых вопросов о <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">тестировании в Филадельфии</a>.',
            },
          },
          beforeYouGo: 'Прежде чем вы пойдете',
          checkSite: 'Для прохождения теста не требуется страхование платежей и подтверждение гражданства. Но во многих пунктах есть другие требования. Проверьте дополнительные сведения о пункте тестирования.',
          hoursVary: 'Часы работы и возможность оказания услуги могут меняться.',
          process: 'Процесс',
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
          access: 'Доступ',
          Yes: 'Да',
          No: 'Нет',
          Unknown: 'Неизвестно',
          website: 'Веб-сайт',
          driveThrough: {
            dt: 'Без выхода из машины',
            wu: 'Пункт внутри помещения',
            both: 'Обслуживание как без выхода из машины, так и внутри помещения',
          },
          panelText: {
            p1: 'Если вы не можете пройти тест COVID-19 у своего врача, этот инструмент поможет вам найти пункт бесплатного тестирования в пределах городской черты Филадельфии.',
          },
          restrictions: {
            lowInc: 'Инструмент предназначен для семей и лиц с низкими доходами.',
            year14: 'Для лиц не моложе 14 лет.',
            year18: 'Для лиц не моложе 18 лет.',
            netPat: 'Только для пациентов сети медучреждения.',
            medPrior: 'Приоритет имеют работники системы здравоохранения и служб экстренного реагирования.',
            homeless: 'Пункт предназначен для бездомных людей.',
          },
          notes: {
            schedApp: 'Только по предварительной записи.',
            refReq: 'Требуется направление от врача.',
            schedAppRefReq: 'Требуется предварительная запись и направление от врача.',
            noApp: 'Предварительная запись не нужна.',
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
            subtitle: 'Trouver où recevoir gratuitement un test de dépistage du COVID-19 à proximité de chez vous',
            bannerAlert: 'De nombreux sites sont fermés aujourd’hui. Consultez les détails spécifiques au site pour obtenir de plus amples informations.',
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
              p1: '<b>Des questions ?</b> Veuillez appeler votre prestataire de soins de santé ou consulter notre FAQ sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les tests de dépistage à Philadelphie.</a>',
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
