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
          <div
            v-html="item.attributes.facility_type"
          />
          <!-- v-html="$t('sections.' + section + '.subsections[\'' + item.attributes.CATEGORY + '\'].name')" -->
          <div
            v-html="item.attributes.drive_thruwalk_up"
          />
          <!-- v-html="$t('sections.' + section + '.subsections[\'' + item.attributes.CATEGORY + '\'].name')" -->
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
          Referral:
          <span
            v-html="item.attributes.Referral"
          />
          <!-- v-html="$t('sections.' + section + '.subsections[\'' + item.attributes.CATEGORY + '\'].name')" -->
        </div>
      </div>
    </div>

    <!-- <div
      v-if="item.attributes.TEMPCLOSE !== null"
      class="grid-x temp-close-section"
    >
      <div class="card-exclamation-holder small-5">
        <font-awesome-icon
          icon="exclamation-triangle"
          class="fa-2x fa-icon-class"
        />
      </div>
      <div class="grid-y card-exclamation-details small-19">
        <div><b>{{ $t('change') }}:</b></div>
        <div>{{ $t('closure') }}: {{ item.attributes.TEMPCLOSE }}</div>
      </div>
    </div> -->

    <!-- <senior-meal-site-card
      v-if="section === 'seniorMealSites'"
      :item="item"
    />

    <food-site-card
      v-if="section === 'foodSites'"
      :item="item"
    />

    <charter-school-card
      v-if="subsection === 'CHARTER'"
      :item="item"
    />

    <ppr-school-card
      v-if="section === 'studentMealSites' && subsection === 'PPR_StudentMeals'"
      :item="item"
    />

    <psd-school-card
      v-if="subsection === 'PSD'"
      :item="item"
    />

    <pha-school-card
      v-if="subsection === 'PHA'"
      :item="item"
    />
  -->

    <!-- v-if="section === 'outdoorMealSites'" -->
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
