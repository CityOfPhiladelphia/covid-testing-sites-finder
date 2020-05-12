<template>
  <section class="services grid-x grid-padding-x">
    <div class="cell">
      <vertical-table-light
        class="print-padding"
        :slots="mainVerticalTableSlots"
        :options="mainVerticalTableOptions"
      >
        <template
          v-slot:component1
          class="table-slot"
        >
          <span v-show="item.attributes.testing_restrictions != null">
            {{ $t('restrictions[\'' + item.attributes.testing_restrictions + '\']') }}
          </span>
          <span v-show="item.attributes.Notes != null">
            {{ $t('notes[\'' + item.attributes.Notes + '\']') }}
          </span>
          <!-- <div>{{ item.attributes.testing_restrictions }}</div>
          <div>{{ item.attributes.Notes }}</div>
          <div>{{ item.attributes.private_public }}</div> -->
        </template>

        <template
          v-slot:component2
          class="table-slot"
        >
          <!-- <div>
            {{ $t('sections.' + this.section + '.pickupDetails') }}
          </div> -->
          <vertical-table-light
            class="print-padding"
            :slots="component1VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>
      </vertical-table-light>
    </div>
  </section>
</template>

<script>

export default {
  name: 'DataCard',
  components: {
    VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
    VerticalTable3CellsLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTable3CellsLight.vue'),
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

    mainVerticalTableOptions() {
      return {
        styles: {
          th: {
            'vertical-align': 'top',
            'font-size': '14px',
            // 'width': '30%',
            'min-width': '40px !important',
            'max-width': '50px !important',
            'width': '10% !important',
          },
          td: {
            'font-size': '14px',
            // 'width': '80%',
          },
        },
      };
    },
    mainVerticalTableSlots() {
      return {
        id: 'mainTable',
        fields: [
          {
            label: 'eligibility',
            labelType: 'i18n',
            // value: this.$props.item.attributes.facility_type,
            valueType: 'component1',
            //value: 'sections.' + this.section + '.eligibility',
            // valueType: 'i18n',
          },
          {
            label: 'testingHours',
            labelType: 'i18n',
            valueType: 'component2',
          },
        ],
      };
    },

    componentVerticalTableOptions() {
      return {
        styles: {
          th: {
            // 'vertical-align': 'top',
            'font-size': '14px',
            'min-width': '45px !important',
            'max-width': '50px !important',
            'width': '25% !important',
          },
          td: {
            'font-size': '14px',
            // 'width': '90%',
          },
        },
      };
    },
    componentVerticalTableSlots() {
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
      return {
        id: 'compTable',
        fields: theFields,
      };
    },


    component1VerticalTableOptions() {
      return {
        styles: {
          th: {
            // 'vertical-align': 'top',
            'font-size': '14px',
            'min-width': '45px !important',
            'max-width': '50px !important',
            'width': '25% !important',
          },
          td: {
            'font-size': '14px',
            // 'width': '90%',
          },
        },
      };
    },
    component1VerticalTableSlots() {
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
      return {
        id: 'compTable1',
        fields: theFields,
      };
    },

  },
};

</script>

<style lang="scss">

.services {
  width: 100%;
}

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
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
