<template>
  <div class="rangeFilter">
    <div class="rangeFilterName row">
          <span v-for="(t, index) in rangeFilter.label.split('²')" :key="index">
            <template v-if="index === 0">{{t}}</template>
            <template v-else><span class="smallNumber">2</span>{{t}}</template>
          </span>
    </div>
    <div class="row">
      <q-input class="rangeFilterInput"
             :value="rangeFilter.value.min"
             @input="onInputMin"
             borderless
      />
      <span class="dash">-</span>
      <q-input class="rangeFilterInput"
             :value="rangeFilter.value.max"
             @input="onInputMax"
             borderless
      />
    </div>
    <q-range class="rangeFilterRange"
             :value="rangeFilter.value"
             @input="onRangeInput"
             :min="rangeFilter.min"
             :max="rangeFilter.max"
    />
  </div>
</template>

<script>
export default {
  name: 'range-filter',
  props: ['rangeFilter'],
  methods: {
    onInputMin (value) {
      const key = this.rangeFilter.key
      this.$store.dispatch('filters/setMinRangeValue', { key, value })
    },
    onInputMax (value) {
      const key = this.rangeFilter.key
      this.$store.dispatch('filters/setMaxRangeValue', { key, value })
    },
    onRangeInput ({ min, max }) {
      const key = this.rangeFilter.key
      this.$store.dispatch('filters/setMinRangeValue', { key, value: min })
      this.$store.dispatch('filters/setMaxRangeValue', { key, value: max })
    }
  }
}
</script>
