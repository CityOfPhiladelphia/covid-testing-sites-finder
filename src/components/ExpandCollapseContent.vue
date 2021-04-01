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
            {{ item.attributes.contact_phone_number }}
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
              {{ $t( 'process[\'' + item.attributes.drive_thruwalk_up + '\']') }}
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

            <div>
              {{ $t( 'refReq[\'' + item.attributes.Referral + '\']') }}
            </div>

            <!-- v-if="item.attributes.drive_thruwalk_up !== null" -->
            <div>
              {{ $t( 'symptomatic[\'' + item.attributes.Symptoms + '\']') }}
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>

    <div class="columns is-mobile no-margins">
      <div class="column is-one-quarter is-paddingless">
        <div>{{ $t( 'eligibility' ) }}</div>
      </div>
      <div class="column is-paddingless">
        <span v-if="item.attributes.testing_restrictions">{{ $t( 'restrictions[\'' + item.attributes.testing_restrictions + '\']') }}  </span>
        <span v-if="item.attributes.Notes">{{ $t( 'notes[\'' + item.attributes.Notes + '\']') }}</span>
      </div>
    </div>
    <hr class="no-margins">

    <div class="columns is-mobile no-margins">
      <div class="column is-one-quarter is-paddingless">
        <div>{{ $t( 'languages.languagesSpoken' ) }}</div>
      </div>
      <div class="column is-paddingless">
        <div
          v-for="(language, index) of languagesSpoken"
          :key="index"
        >
          {{ $t('languages[\'' + language.toLowerCase() + '\']') }}
        </div>
      </div>
    </div>
    <hr class="no-margins">

    <div class="columns is-mobile no-margins">
      <div class="column is-one-quarter is-paddingless">
        <div>{{ $t( 'languages.translationServices' ) }}</div>
      </div>
      <div class="column is-paddingless">
        <div>{{ $t( item.attributes.translation_services ) }}</div>
      </div>
    </div>
    <hr class="no-margins">

    <div class="columns is-mobile no-margins">
      <div class="column is-one-quarter is-paddingless">
        <div>{{ $t( 'testingHours' ) }}</div>
      </div>

      <div class="column is-paddingless">
        <div
          v-for="(day, index) of days"
          :key="index"
        >
          <div
            class="columns is-mobile no-margins"
          >
            <div class="column is-paddingless">
              <div>
                {{ $t(day.label) }}
              </div>
            </div>

            <div class="column is-paddingless">
              <div>
                {{ day.value }}
              </div>
            </div>
          </div>
        </template>

        <template
          v-slot:component4
          class="table-slot"
        >
          <vertical-table-light
            class="print-padding"
            :slots="component4VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>

        <template
          v-slot:component5
          class="table-slot"
        >
          <vertical-table-light
            class="print-padding"
            :slots="component5VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>
      </vertical-table-light>
    </div>
  </div>
</template>

<script>

import SharedFunctions from './mixins/SharedFunctions.vue';

export default {
  name: 'ExpandCollapseContent',
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
      if (this.$props.item.attributes.Language_Spoken) {
        // console.log('in languagesSpoken computed, this.$props.item.attributes.Language_Spoken:', this.$props.item.attributes.Language_Spoken);
        values = this.$props.item.attributes.Language_Spoken.split(', ');
      }
      return values;
    },
<<<<<<< HEAD
    mainVerticalTableSlots() {
      let slots = {
        id: 'mainTable',
        fields: [
          {
            label: 'eligibility',
            labelType: 'i18n',
            valueType: 'component1',
          },
        ],
      };
      if (this.$props.item.attributes.Language_Spoken != null) {
        let row2 = {
          label: 'languages.languagesSpoken',
          labelType: 'i18n',
          valueType: 'component2',
        };
        slots.fields.push(row2);
      }

      if (this.$props.item.attributes.translation_services != null) {
        let row3 = {
          label: 'languages.translationServices',
          labelType: 'i18n',
          valueType: 'component3',
        };
        slots.fields.push(row3);
      }

      if (this.days.length > 0) {
        let newField = {
          label: 'testingHours',
          labelType: 'i18n',
          valueType: 'component4',
        };
        slots.fields.push(newField);
      }

      if (this.daysRapid.length > 0) {
        let newField = {
          label: 'rapid.category',
          labelType: 'i18n',
          valueType: 'component5',
        };
        slots.fields.push(newField);
      }

      return slots;
    },
    mainVerticalTableOptions() {
      return {
        styles: {
          th: {
            'vertical-align': 'top',
            'font-size': '14px',
            'min-width': '40px !important',
            'max-width': '50px !important',
            'width': '10% !important',
          },
          td: {
            'font-size': '14px !important',
          },
        },
      };
    },
=======
>>>>>>> 14573f3 (changes to expand-collapse)

    days() {
      let allDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
      let theFields = [];
      // let days = {};

      let item = this.item;
      let holidays = [];
      let exceptions = [];
      if (this.$config.holidays && this.$config.holidays.days) {
        holidays = this.$config.holidays.days;
      }
      if (this.$config.holidays && this.$config.holidays.exceptions) {
        exceptions = this.$config.holidays.exceptions;
      }
      // let siteName = this.getSiteName(this.item);

      for (let [ index, day ] of allDays.entries()) {
        let normallyOpen = item.attributes[day] != null;
        let holidayToday = holidays.includes(day);
        let yesterday = allDays[index-1];
        let normallyOpenYesterday = item.attributes[yesterday] != null;
        let holidayYesterday = holidays.includes(yesterday);
        let siteIsException = exceptions.includes(this.getSiteName(this.item));

        // if (this.item.attributes[day] != null){
        if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {

          let hours;
          if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
            hours = item.attributes[day];
          } else if (!normallyOpen && holidayYesterday) {
            hours = item.attributes[yesterday];
          }

          let dayObject = {
            label: day,
            labelType: 'i18n',
            value: hours,
            // valueType: 'i18n',
          };
          theFields.push(dayObject);
        }
      }
      return theFields;
    },
<<<<<<< HEAD

    daysRapid() {
      let allDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
      let theFields = [];
      // let days = {};

      let item = this.item;
      let holidays = [];
      let exceptions = [];
      if (this.$config.holidays && this.$config.holidays.days) {
        holidays = this.$config.holidays.days;
      }
      if (this.$config.holidays && this.$config.holidays.exceptions) {
        exceptions = this.$config.holidays.exceptions;
      }
      // let siteName = this.getSiteName(this.item);

      for (let [ index, day ] of allDays.entries()) {
        let normallyOpen = item.attributes[day+'_rapid_tests'] != null;
        let holidayToday = holidays.includes(day);
        let yesterday = allDays[index-1];
        let normallyOpenYesterday = item.attributes[yesterday] != null;
        let holidayYesterday = holidays.includes(yesterday);
        let siteIsException = exceptions.includes(this.getSiteName(this.item));

        // if (this.item.attributes[day] != null){
        if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {

          let hours;
          if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
            // let value = day + '_rapid_tests';
            // console.log('day:', day, 'value:', value);
            hours = item.attributes[day+'_rapid_tests'];
          } else if (!normallyOpen && holidayYesterday) {
            // let value = yesterday + '_rapid_tests';
            // console.log('yesterday:', yesterday, 'value:', value);
            hours = item.attributes[yesterday+'_rapid_tests'];
          }

          let dayObject = {
            label: day,
            labelType: 'i18n',
            value: hours,
            // valueType: 'i18n',
          };
          theFields.push(dayObject);
        }
      }
      // console.log('theFields:', theFields);
      return theFields;
    },

    component4VerticalTableSlots() {
      return {
        id: 'compTable1',
        fields: this.days,
      };
    },
    component5VerticalTableSlots() {
      return {
        id: 'compTable1',
        fields: this.daysRapid,
      };
    },
    component1VerticalTableOptions() {
      return {
        styles: {
          th: {
            'font-size': '14px',
            'min-width': '45px !important',
            'max-width': '50px !important',
            'width': '25% !important',
          },
          td: {
            'font-size': '14px !important',
          },
        },
      };
    },

=======
>>>>>>> 14573f3 (changes to expand-collapse)
  },
  methods: {
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
  },
};

</script>

<style lang="scss">

.no-wrap {
  white-space: nowrap;
}

.no-margins {
  margin: 0px;
  margin-bottom: 0px !important;
}

.main-content {
  font-size: 14px,
}

.td-style {
  font-size: 14px !important;
}

.td-textbox {
  padding-left: 2rem;
}

</style>
