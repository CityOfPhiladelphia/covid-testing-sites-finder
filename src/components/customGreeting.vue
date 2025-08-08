<script setup>

import $config from '../main.js';

const props = defineProps({
  'message': {
    type: String,
    default: function() {
      return 'defaultMessage';
    },
  },
});

// const sections = ref({});
// const subsections = ref({});

// computed
// const i18nEnabled = computed(() => {
//   if (this.$config.i18n) {
//     return true;
//   }
//   return false;
// });

// const calloutOptions = computed(() => {
//   return {};
// });

// const calloutSlots = computed(() => {
//   return {
//     text: 'test',
//   };
// });

const database = computed(() => {
  let value = {}
  if (DataStore.sources[DataStore.appType]) {
    // if (import.meta.env.VITE_DEBUG) console.log('DataStore.appType:', DataStore.appType, 'DataStore.sources[DataStore.appType]:', DataStore.sources[DataStore.appType]);
    value = DataStore.sources[DataStore.appType].data.rows || DataStore.sources[DataStore.appType].data.features || DataStore.sources[DataStore.appType].data;
  }
  return value;
});

// hasError() {
//   return this.$store.state.geocode.status === 'error';
// },
// errorMessage() {
//   const input = this.$store.state.geocode.input;
//   return `
//       <p>
//         We couldn't find
//         ${input ? '<strong>' + input + '</strong>' : 'that address'}.
//         Are you sure everything was spelled correctly?
//       </p>
//       <p>
//         Here are some examples of things you can search for:
//       </p>
//       <ul>
//         <li>1234 Market St</li>
//         <li>1001 Pine Street #201</li>
//         <li>12th & Market</li>
//         <li>883309050 (an OPA number with no hyphens or other characters)</li>
//       </ul>
//     `;
// },

// watch(
//   () => database,
//   async nextDatabase => {
//     subsections.value = getCounts();
//     // subsections = subsections;
//     // this.$store.commit('setSubsections', subsections);
//   }
// );

// onMounted(async () =>{
//   this.sections = $config.sections;
// });

// methods
const getCounts = () => {
  // console.log('customGreeting.vue getCounts is running');
  const refineData = this.database;
  // const refineData = this.sources[this.$appType].data.rows;

  let service = '';

  // console.log('in getRefineSearchList, refineData:', refineData);
  refineData.forEach((arrayElem) => {
    // console.log('arrayElem:', arrayElem);
    if (arrayElem.services_offered) {
      service += `${arrayElem.services_offered},`;
    } else if (arrayElem.attributes.CATEGORY) {
      service += `${arrayElem.attributes.CATEGORY},`;
    }
  });

  // TODO: break this into smaller chunks
  // let serviceArray = service.split(/(,|;)/);
  let serviceArray = service.split(',');
  serviceArray = serviceArray.map(s => s.trim());

  // const uniqArray = [ ...new Set(serviceArray) ];
  // console.log('serviceArray:', serviceArray, 'uniqArray:', uniqArray);
  //
  // // clean up any dangling , or ;
  // let uniq = uniqArray.filter(a => a.length > 2);
  //
  // uniq.filter(Boolean); // remove empties

  let countObject = serviceArray.reduce(function (acc, curr) {
    if (typeof acc[curr] == 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  return countObject;
};

</script>

<template>
  <div
    class="main-greeting"
  >
    <div class="exclamation-holder columns is-mobile">
      <div class="column is-narrow">
        <font-awesome-icon
          icon="exclamation-triangle"
          class="fa-3x"
        />
      </div>
      <div class="column exclamation-details">
        <div><b>{{ $t('beforeYouGo') }}:</b></div>
        <div>{{ $t('checkSite') }}</div>
      </div>
    </div>

    <div class="has-text-centered container">
      <button
        class="button greeting-button"
        @click="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
    </div>

    <div
      class="main-area"
    >
      <h3>{{ $t('introPage.section2Title') }}</h3>
      <p>{{ $t('introPage.p3') }}</p>
      <div class="intro-list">
        <ol>
          <li
            v-for="(item, index) in $config.i18n.data.messages['en'].introPage.ol1"
            :key="index"
          >
            {{ $t('introPage.ol1.' + index) }}
          </li>
        </ol>
      </div>
      <h3>{{ $t('introPage.p4') }}</h3>
      <p>{{ $t('introPage.p9') }}</p>
      <br>
      <!-- <p>{{ $t('introPage.p5') }}</p>
      <br>
      <p>{{ $t('introPage.p6') }}</p>
      <br> -->
      <p>{{ $t('introPage.p7') }}</p>

      <div class="intro-list">
        <ul>
          <li
            v-for="(item, index) in $config.i18n.data.messages['en'].introPage.ul1"
            :key="index"
          >
            {{ $t('introPage.ul1.' + index) }}
          </li>
        </ul>
      </div>

      <div class="custom-callout">
        <p
          class="no-margin"
          v-html="$t('introPage.callout1.p1')"
        />
      </div>
    </div> <!-- end of main-area -->
  </div>
</template>

<style lang="scss" scoped>

.main-greeting {
  padding: 1rem;
}

.greeting-button {
  background-color: #0f4d90 !important;
  border-color: #0f4d90 !important;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  margin: 1rem;
}

.greeting-button:hover {
  background-color: #444444 !important;
}

.custom-callout {
  border-style: solid;
  border-width: 1px;
  padding: 10px;
}

</style>
