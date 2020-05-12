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

      <div
        v-if="item.attributes.Referral"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="user-md" />
        </div>
        <div
          class="small-22"
        >
          {{ $t('referralRequired') }}

          <!-- v-html="item.attributes.Referral" -->
          <span>
            {{ $t(item.attributes.Referral) }}
          </span>
          <!-- v-html="$t('sections.' + section + '.subsections[\'' + item.attributes.CATEGORY + '\'].name')" -->
        </div>
      </div>
    </div>

    <data-card
      :item="item"
    />

  </div>
</template>

<script>

import DataCard from './DataCard.vue';

export default {
  name: 'ExpandCollapseContent',
  components: {
    DataCard,
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
    subsections() {
      return this.$config.subsections;
    },
    section() {
      return this.subsections[this.$props.item.attributes['CATEGORY']];
    },
    subsection() {
      return this.$props.item.attributes.CATEGORY;
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
