<template>
  <div class="grid-x grid-padding-x">
    <div class="cell medium-12">
      <div
        v-if="item.attributes.testing_location_address"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="map-marker-alt" />
        </div>
        <div class="small-22">
          {{ item.attributes.testing_location_address }}<br>
          {{ item.attributes.City }}, PA {{ item.attributes.zipcode }}<br>
          {{ item.attributes.TestingLocation2 }}
        </div>
      </div>

      <div
        v-if="item.attributes.ProviderURL"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="globe" />
        </div>
        <div class="small-22">
          <a
            target="_blank"
            :href="item.attributes.ProviderURL"
          >{{ $t('website') }}</a>
        </div>
      </div>

      <div
        v-if="item.attributes.contact_phone_number"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="phone" />
        </div>
        <div class="small-22">
          {{ item.attributes.contact_phone_number }}
        </div>
      </div>
    </div>

    <div class="cell medium-12">
      <div
        v-if="item.attributes.facility_type"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="building" />
        </div>
        <div
          class="small-22"
        >
          <div>
            {{ $t( 'facilityType[\'' + item.attributes.facility_type + '\']') }}
          </div>

          <div
            v-if="item.attributes.drive_thruwalk_up !== null"
          >
            {{ $t( 'driveThrough[\'' + item.attributes.drive_thruwalk_up + '\']') }}
          </div>
        </div>
      </div>
    </div>

    <div class="small-24">

      <vertical-table-light
        class="print-padding"
        :slots="mainVerticalTableSlots"
        :options="mainVerticalTableOptions"
      >

        <template
          v-slot:component1
          class="table-slot"
        >
          <span
            v-show="item.attributes.testing_restrictions != null"
            class="td-style"
          >
            {{ $t('restrictions[\'' + item.attributes.testing_restrictions + '\']') }}
          </span>
          <span
            v-show="item.attributes.Notes != null"
            class="td-style"
          >
            {{ $t('notes[\'' + item.attributes.Notes + '\']') }}
          </span>
        </template>

        <template
          v-slot:component2
          class="table-slot"
        >
          <vertical-table-light
            class="print-padding"
            :slots="component1VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>

      </vertical-table-light>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ExpandCollapseContent',
  components: {
    VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
  },
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
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
      if (this.days.length > 0) {
        let newField = {
          label: 'testingHours',
          labelType: 'i18n',
          valueType: 'component2',
        };
        slots.fields.push(newField)
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

    days() {
      let allDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
      let theFields = [];
      let days = {};
      for (let day of allDays) {
        if (this.item.attributes[day] != null){
          let dayObject = {
            label: day,
            labelType: 'i18n',
            value: this.item.attributes[day],
            // valueType: 'i18n',
          };
          theFields.push(dayObject);
        }
      }
      return theFields;
    },
    component1VerticalTableSlots() {
      return {
        id: 'compTable1',
        fields: this.days,
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

.td-style {
  font-size: 14px !important;
}

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
  }

  .temp-close-section {
    width: 100%;
  }

  .card-exclamation-holder {
    padding: 20px;
    background-color: #CC3000;
    text-align: center;
  }

  .fa-icon-class {
    color: white;
    text-align: center;
  }

  .card-exclamation-details {
    padding: 10px;
    background-color: #F5D6CC;
  }

  .location-title {
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 0;
    &:hover{
      background: #2176d2;
      color: white;
    }
  }

  &::after{
    position: absolute;
    right:1rem;
    top: 0;
    content: '+';
    font-weight: 900;
    font-size:1.5rem;
    z-index: 100;
    color: color(dark-ben-franklin)
  }
  &.open{
    h2{
      color:white;
      background-color: color(ben-franklin-blue);
      font-weight: 900;
    }
    &::after{
      content: '-';
      color:white;
    }
  }
  .location-content{
    overflow: hidden;
    height:0;

    &.location-open{
      padding: 1rem;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
