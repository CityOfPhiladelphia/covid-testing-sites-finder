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

import { faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faAngleUp as farAngleUp } from '@fortawesome/pro-regular-svg-icons/faAngleUp';
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faPlus as farPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faMinus as farMinus } from '@fortawesome/pro-regular-svg-icons/faMinus';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';

library.add(faExclamationTriangle, faCalendarAlt, faBuilding, faUserMd, faCircle, farAngleDown, farAngleUp, farTimes, farPlus, farMinus, faLanguage);

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

import i18n from './i18n/i18n';
console.log('main.js i18n:', i18n);

import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';

pinboard({
  i18n: i18n.i18n,
  publicPath: process.env.VUE_APP_PUBLICPATH,
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
  anySearch: true,
  allowZipcodeSearch: true,
  allowPrint: true,
  showBuffers: true,
  resetDataOnGeocode: true,
  retractableRefine: true,
  dropdownRefine: false,
  gtag: {
    category: 'rf-covid',
  },
  searchBar: {
    searchTypes: [
      'address',
      // 'zipcode',
      // 'keyword',
    ],
    searchDistance: 3,
    fuseThreshold: 0.4,
    // placeholder: 'Search by address',
    // searchTypes: [ 'address' ],
    // labelText:  {
    //   address: 'Search by address',
    // },
    // placeholderText: {
    //   address: 'Search by address',
    // },
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
    columns: false,
    multipleFieldGroups: {
      patientAge: {
        checkbox: {
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
      },
      refReq: {
        radio: {
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
      },
      symptomatic: {
        tooltip: {
          tip: 'tooltips.symptomatic',
        },
        radio: {
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
      },
      process: {
        checkbox: {
          'driveThru': {
            unique_key: 'process_driveThru',
            i18n_key: 'process.driveThru',
            value: function(item) {
              return [ 'dt', 'both' ].includes(item.attributes.drive_thruwalk_up);
            },
          },
          'walkUp': {
            unique_key: 'process_walkUp',
            i18n_key: 'process.walkUp',
            value: function(item) {
              return [ 'wu', 'both' ].includes(item.attributes.drive_thruwalk_up);
            },
          },
        },
      },
      rapid: {
        radio: {
          'Yes': {
            unique_key: 'rapid_Yes',
            i18n_key: 'Yes',
            value: function(item) {
              return item.attributes.rapid_testing === 'Yes';
            },
          },
          'No': {
            unique_key: 'rapid_No',
            i18n_key: 'No',
            value: function(item) {
              return item.attributes.rapid_testing === 'No' || item.attributes.rapid_testing == null;
            },
          },
        },
      },
      pcr: {
        radio: {
          'Yes': {
            unique_key: 'pcr_Yes',
            i18n_key: 'Yes',
            value: function(item) {
              return item.attributes.pcr_testing === 'yes';
            },
          },
          'No': {
            unique_key: 'pcr_No',
            i18n_key: 'No',
            value: function(item) {
              return item.attributes.pcr_testing === 'no' || item.attributes.pcr_testing == null;
            },
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
      href: "https://www.phila.gov/covid-testing-sites/",
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
});
