<script setup>

import { useConfigStore } from '@pinboard';
const $config = useConfigStore().config;

const props = defineProps({
  'message': {
    type: String,
    default: function() {
      return 'defaultMessage';
    },
  },
});

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
