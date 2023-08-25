<template>
  <div class="main-content">
    <div class="columns">
      <div class="column">
        <div
          v-if="item.attributes.testing_location_address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column">
            {{ item.attributes.testing_location_address }}<br>
            {{ item.attributes.City }}, PA {{ item.attributes.zipcode }}<br>
            {{ item.attributes.TestingLocation2 }}
          </div>
        </div>

        <div
          v-if="item.attributes.ProviderURL"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column">
            <a
              target="_blank"
              :href="item.attributes.ProviderURL"
            >{{ $t('website') }}</a>
          </div>
        </div>
        <div
          v-if="item.attributes.contact_phone_number"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column">
            <div>
              {{ item.attributes.contact_phone_number }}
            </div>
            <div>
              {{ $t( 'languages.translationServices' ) }}
              <span v-if="item.attributes.translation_services">
                {{ $t( item.attributes.translation_services ) }}
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
            v-if="item.attributes.facility_type"
            class="column is-1"
          >
            <font-awesome-icon icon="building" />
          </div>
          <div class="column">
            <div>{{ $t( 'facilityType[\'' + item.attributes.facility_type + '\']') }}</div>

            <div
              v-if="item.attributes.drive_thruwalk_up !== null"
            >
              {{ $t( 'process[\'' + getDriveThruWalkUpValue(item.attributes.drive_thruwalk_up) + '\']') }}
            </div>
          </div>
        </div>

        <div
          v-if="item.attributes.facility_type"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="user-md" />
          </div>
          <div class="column">
            <div>
              {{ $t( 'patientAge[\'' + item.attributes.Age + '\']') }}
            </div>

            <div v-if="item.attributes.rapid_testing">
              {{ $t( 'rapid[\'' + item.attributes.rapid_testing + '\']') }}
            </div>

            <div v-if="item.attributes.pcr_testing">
              {{ $t( 'pcr[\'' + item.attributes.pcr_testing + '\']') }}
            </div>

            <div>
              {{ $t( 'refReq[\'' + item.attributes.Referral + '\']') }}
            </div>

            <div>
              {{ $t( 'symptomatic[\'' + getSymptomaticValue(item.attributes.Symptoms) + '\']') }}
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
      <span v-if="item.attributes.testing_restrictions">{{ $t( 'restrictions[\'' + item.attributes.testing_restrictions + '\']') }}  </span>
      <span v-if="item.attributes.Notes">{{ $t( 'notes[\'' + item.attributes.Notes + '\']') }}</span>
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
      style-class="vgt-table condensed"
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

<script>

import SharedFunctions from './mixins/SharedFunctions.vue';
import { VueGoodTable } from 'vue-good-table';
// import 'vue-good-table/dist/vue-good-table.css';

export default {
  name: 'ExpandCollapseContent',
  components: {
    VueGoodTable,
  },
  mixins: [ SharedFunctions ],
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    languagesSpoken() {
      let values = [];
      let results;
      if (this.item.attributes.Language_Spoken) {
        console.log('in languagesSpoken computed, this.item.attributes.LANGUAGE:', this.item.attributes.language);
        values = this.item.attributes.Language_Spoken.split(',');
        results = values.map(element => {
          return element.trim();
        });
      } else {
        results = [ 'English' ];
      }
      return results;
    },
    i18nLocale() {
      return this.$i18n.locale;
    },
    days() {
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

      let item = this.item;
      let holidays = [];
      let exceptions = [];
      if (this.$config.holidays && this.$config.holidays.days) {
        holidays = this.$config.holidays.days;
      }
      if (this.$config.holidays && this.$config.holidays.exceptions) {
        exceptions = this.$config.holidays.exceptions;
      }

      for (let [ index, day ] of allDays.entries()) {
        let normallyOpen = item.attributes[day] != null;
        let holidayToday = holidays.includes(day);
        let yesterday = allDays[index-1];
        let normallyOpenYesterday = item.attributes[yesterday] != null;
        let holidayYesterday = holidays.includes(yesterday);
        let siteIsException = exceptions.includes(this.getSiteName(this.item));

        if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {

          let hours;
          if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
            hours = item.attributes[day];
          } else if (!normallyOpen && holidayYesterday) {
            hours = item.attributes[yesterday];
          }

          let dayObject = {
            id: index,
            label: this.$i18n.messages[this.i18nLocale][day],
            value: hours,
          };
          rows.push(dayObject);
        }
      }
      return { columns, rows };
    },
  },
  methods: {
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
    getDriveThruWalkUpValue(dbValue) {
      let value;
      if (dbValue == 'wu') {
        value = 'walkUp';
      } else if (dbValue == 'dt') {
        value = 'driveThru';
      } else if (dbValue == 'both') {
        value = 'both';
      }
      return value;
    },
    getSymptomaticValue(dbValue) {
      let value;
      if (dbValue == 'symptom') {
        value = 'yes';
      } else if (dbValue == 'asymptom') {
        value = 'no';
      } else {
        value = null;
      }
      return value;
    },
    languagesSpokenValueWithComma(option, index) {
      console.log('languagesSpokenValueWithComma, option:', option, 'index:', index);
      let languagesList = this.languagesSpoken;
      let value = this.$i18n.messages[this.i18nLocale].languages[option.trim().toLowerCase()];
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
    },
  },
};

</script>
