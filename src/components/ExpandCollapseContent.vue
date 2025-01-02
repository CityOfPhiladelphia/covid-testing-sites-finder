<script setup>

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import $config from '../main.js';

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// computed
const languagesSpoken = computed(() => {
  let values = [];
  let results;
  if (props.item.properties.Language_Spoken) {
    console.log('in languagesSpoken computed, props.item.properties.LANGUAGE:', props.item.properties.language);
    values = props.item.properties.Language_Spoken.split(',');
    results = values.map(element => {
      return element.trim();
    });
  } else {
    results = [ 'English' ];
  }
  return results;
});

// const i18nLocale = computed(() => {
//   return this.$i18n.locale;
// });

const days = computed(() => {
  let columns = [
    {
      label: 'Days',
      i18nLabel: 'daysOfOperation',
      field: 'label',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'Schedule',
      i18nLabel: 'testingHours',
      field: 'value',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  let rows = [];
  let allDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];

  let item = props.item;
  let holidays = [];
  let exceptions = [];
  if ($config.holidays && $config.holidays.days) {
    holidays = $config.holidays.days;
  }
  if ($config.holidays && $config.holidays.exceptions) {
    exceptions = $config.holidays.exceptions;
  }

  for (let [ index, day ] of allDays.entries()) {
    let normallyOpen = item.properties[day] != null;
    let holidayToday = holidays.includes(day);
    let yesterday = allDays[index-1];
    let normallyOpenYesterday = item.properties[yesterday] != null;
    let holidayYesterday = holidays.includes(yesterday);
    let siteIsException = exceptions.includes(getSiteName(props.item));

    if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {

      let hours;
      if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
        hours = item.properties[day];
      } else if (!normallyOpen && holidayYesterday) {
        hours = item.properties[yesterday];
      }

      let dayObject = {
        id: index,
        // label: this.$i18n.messages[this.i18nLocale][day],
        label: t(day),
        value: hours,
      };
      rows.push(dayObject);
    }
  }
  return { columns, rows };
});

// methods
const getSiteName = (item) => {
  // console.log('in getSiteName, item:', item, 'transforms:', transforms);
  let valOrGetter = $config.locationInfo.siteName;
  const valOrGetterType = typeof valOrGetter;
  let val;

  if (valOrGetterType === 'function') {
    // const state = this.$store.state;
    const getter = valOrGetter;
    if (item) {
      val = getter(item);
    } //else {
    //   val = getter(state);
    // }
  } else {
    val = item[valOrGetter];
  }
  // console.log('getSiteName val:', val);
  return val;
};

const parseAddress = (address) => {
  const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
  return formattedAddress;
};

const getDriveThruWalkUpValue = (dbValue) => {
  let value;
  if (dbValue == 'wu') {
    value = 'walkUp';
  } else if (dbValue == 'dt') {
    value = 'driveThru';
  } else if (dbValue == 'both') {
    value = 'both';
  }
  return value;
};

const getSymptomaticValue = (dbValue) => {
  let value;
  if (dbValue == 'symptom') {
    value = 'yes';
  } else if (dbValue == 'asymptom') {
    value = 'no';
  } else {
    value = null;
  }
  return value;
};

const languagesSpokenValueWithComma = (option, index) => {
  console.log('languagesSpokenValueWithComma, option:', option, 'index:', index);
  let languagesList = languagesSpoken.value;
  // let value = this.$i18n.messages[this.i18nLocale].languages[option.trim().toLowerCase()];
  let value = t(option.trim().toLowerCase());
  let finalValue;
  if (value) {
    if (index !== languagesList.length-1) {
      finalValue = value + ', ';
    } else {
      finalValue = value;
    }
  } else {
    if (index !== languagesList.length-1) {
      finalValue = option + ', ';
    } else {
      finalValue = option;
    }
  }
  return finalValue;
};

</script>

<template>
  <div class="main-content">
    <div class="columns">
      <div class="column">
        <div
          v-if="item.properties.testing_location_address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column">
            {{ item.properties.testing_location_address }}<br>
            {{ item.properties.City }}, PA {{ item.properties.zipcode }}<br>
            {{ item.properties.TestingLocation2 }}
          </div>
        </div>

        <div
          v-if="item.properties.ProviderURL"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column">
            <a
              target="_blank"
              :href="item.properties.ProviderURL"
            >{{ $t('website') }}</a>
          </div>
        </div>
        <div
          v-if="item.properties.contact_phone_number"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column">
            <div>
              {{ item.properties.contact_phone_number }}
            </div>
            <div>
              {{ $t( 'languages.translationServices' ) }}
              <span v-if="item.properties.translation_services">
                {{ $t( item.properties.translation_services ) }}
              </span>
              <span v-else>
                {{ $t('No') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="columns is-mobile">
          <div
            v-if="item.properties.facility_type"
            class="column is-1"
          >
            <font-awesome-icon icon="building" />
          </div>
          <div class="column">
            <div>{{ $t( 'facilityType[\'' + item.properties.facility_type + '\']') }}</div>

            <div
              v-if="item.properties.drive_thruwalk_up !== null"
            >
              {{ $t( 'process[\'' + getDriveThruWalkUpValue(item.properties.drive_thruwalk_up) + '\']') }}
            </div>
          </div>
        </div>

        <div
          v-if="item.properties.facility_type"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="user-md" />
          </div>
          <div class="column">
            <div>
              {{ $t( 'patientAge[\'' + item.properties.Age + '\']') }}
            </div>

            <div v-if="item.properties.rapid_testing">
              {{ $t( 'rapid[\'' + item.properties.rapid_testing + '\']') }}
            </div>

            <div v-if="item.properties.pcr_testing">
              {{ $t( 'pcr[\'' + item.properties.pcr_testing + '\']') }}
            </div>

            <div>
              {{ $t( 'refReq[\'' + item.properties.Referral + '\']') }}
            </div>

            <div>
              {{ $t( 'symptomatic[\'' + getSymptomaticValue(item.properties.Symptoms) + '\']') }}
            </div>
          </div>
        </div>

        <div class="columns is-mobile">
          <div
            class="column is-1"
          >
            <font-awesome-icon icon="language" />
          </div>
          <div class="column">
            <div
              v-if="languagesSpoken"
            >
              <b>{{ $t('languages.languagesSpoken') + ': ' }}</b>
              <span
                v-for="(option, index) of languagesSpoken"

                :key="index"
              >
                {{ languagesSpokenValueWithComma(option, index) }}
              </span>
              <span
                v-if="!languagesSpoken"
              >
                {{ $t('languages.english') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3>{{ $t('eligibility') }}</h3>
    <div class="table-intro">
      <span v-if="item.properties.testing_restrictions">{{ $t( 'restrictions[\'' + item.properties.testing_restrictions + '\']') }}  </span>
      <span v-if="item.properties.Notes">{{ $t( 'notes[\'' + item.properties.Notes + '\']') }}</span>
    </div>

    <!-- <h3>{{ $t('languages.languagesSpoken') }}</h3>
    <div
      v-if="languagesSpoken.length"
      class="list-holder"
    >
      <ul>
        <li
          v-for="(language, index) of languagesSpoken"
          :key="index"
        >
          {{ $t('languages[\'' + language.toLowerCase() + '\']') }}
        </li>
      </ul>
    </div>
    <div
      v-else
      class="list-holder"
    >
      <ul>
        <li>
          {{ $t('languages.english') }}
        </li>
      </ul>
    </div> -->

    <h3>{{ $t('testingHours') }}</h3>
    <vue-good-table
      :columns="days.columns"
      :rows="days.rows"
      :sort-options="{ enabled: false }"
      style-class="table"
    >
      <template
        slot="table-column"
        slot-scope="props"
      >
        <span
          v-if="props.column.label =='Days'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
        <span
          v-if="props.column.label =='Schedule'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>
