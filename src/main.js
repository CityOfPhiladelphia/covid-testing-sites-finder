// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

import isMac from './util/is-mac';
if (isMac()) {
  import('./assets/mac-style.scss')
}

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
import pinboard from '@phila/pinboard';
// import pinboard from '../node_modules/@phila/pinboard/src/main.js';
import '../node_modules/@phila/pinboard/dist/style.css';

// data-sources
import covidTestingSites from './data-sources/covid-testing-sites';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = markRaw({
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
});

import i18n from './i18n/i18n';
console.log('main.js i18n:', i18n, 'publicPath:', import.meta.env.VITE_PUBLICPATH);

let $config = {
  publicPath: import.meta.env.VITE_PUBLICPATH,
  i18n: i18n.i18n,
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
    siteNameField: 'testing_location_nameoperator',
    siteName: function(item) {
      return item.properties.testing_location_nameoperator;
    },
  },
  customComps,
  // holidays: {
  //   days: ['Monday'],
  // },
  hiddenRefine: {
    City: function(item) {
      return item.properties.City === 'Philadelphia';
    },
    Visibility: function(item) {
      return item.properties.Visibility === 'pub' || item.properties.Visibility === 'For Public View';
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
              return item.properties.Age === 'year18';
            },
          },
          'year14': {
            unique_key: 'patientAge_year14',
            i18n_key: 'patientAge.year14',
            value: function(item) {
              return item.properties.Age === 'year14';
            },
          },
          'pedCare': {
            unique_key: 'patientAge_pedCare',
            i18n_key: 'patientAge.pedCare',
            value: function(item) {
              return item.properties.Age === 'pedCare';
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
              return item.properties.Referral === 'yes';
            },
          },
          'no': {
            unique_key: 'refReq_no',
            i18n_key: 'No',
            value: function(item) {
              return item.properties.Referral === 'no';
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
              return item.properties.Symptoms === 'symptom';
            },
          },
          'no': {
            unique_key: 'symptomatic_no',
            i18n_key: 'No',
            value: function(item) {
              return item.properties.Symptoms === 'asymptom';
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
              return [ 'dt', 'both' ].includes(item.properties.drive_thruwalk_up);
            },
          },
          'walkUp': {
            unique_key: 'process_walkUp',
            i18n_key: 'process.walkUp',
            value: function(item) {
              return [ 'wu', 'both' ].includes(item.properties.drive_thruwalk_up);
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
              return item.properties.rapid_testing === 'Yes';
            },
          },
          'No': {
            unique_key: 'rapid_No',
            i18n_key: 'No',
            value: function(item) {
              return item.properties.rapid_testing === 'No' || item.properties.rapid_testing == null;
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
              return item.properties.pcr_testing === 'yes';
            },
          },
          'No': {
            unique_key: 'pcr_No',
            i18n_key: 'No',
            value: function(item) {
              return item.properties.pcr_testing === 'no' || item.properties.pcr_testing == null;
            },
          },
        },
      },
    },
  },
  markerType: 'circle-marker',
  mapLayer: {
    id: 'resources',
    source: 'resources',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': '#FF9D14',
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white',
    },
  },
  cyclomedia: {
    enabled: false,
    // measurementAllowed: false,
    // popoutAble: true,
    // recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    // username: import.meta.env.VITE_CYCLOMEDIA_USERNAME,
    // password: import.meta.env.VITE_CYCLOMEDIA_PASSWORD,
    // apiKey: import.meta.env.VITE_CYCLOMEDIA_API_KEY,
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
  // infoCircles: {
  //   'symptomatic': {
  //     'html': '\
  //     <div class="full-div">For more information, see <a class="white-font-link" target="_blank" href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">\
  //     Symptoms of coronavirus (CDC)</a>.</div>\
  //     ',
  //   },
  // },
};

console.log('$config:', $config);

pinboard($config);
export default $config;