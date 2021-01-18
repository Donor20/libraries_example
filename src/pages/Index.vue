<template>
  <q-page class="page flatsPage">
    <h4 class="flatsPageTitle">Lorem ipsum dolor sit</h4>
    <div class="flatsPageFilters row">
      <div class="rangeFilter">
        <div class="rangeFilterName">КОМНАТЫ</div>
        <div class="roomsFilter row">
          <q-btn v-for="ro in roomsOptions" :key="ro.value"
                 @click="roomsFilter === ro.value ? roomsFilter = null : roomsFilter = ro.value"
                 class="no-shadow" :class="{ 'activeBtn': roomsFilter === ro.value }"
                 unelevated no-caps
          >{{ro.label}}</q-btn>
        </div>
      </div>
      <range-filter v-for="rangeFilter in rangeFilters" :key="rangeFilter.key"
                    :rangeFilter="rangeFilter"
      />
      <div class="btnsFilters">
        <q-btn @click="getFlats" class="activeBtn" unelevated>
          Применить
        </q-btn>
        <div class="refreshFiltersBtn" @click="resetFilters">
          <span>сбросить фильтр</span>
        </div>
      </div>
    </div>
    <q-scroll-area class="scrollArea">
      <div class="row flatCards">
        <flat-card v-for="flat in flats" :key="flat.building_id + '_' + flat.id"
                   :flat="flat"
        />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import api from '../services/api'
import FlatCard from '../components/flat-card'
import RangeFilter from '../components/range-filter'

export default {
  name: 'PageIndex',
  components: { RangeFilter, FlatCard },
  data () {
    return {
      flats: [],
      roomsFilter: null,
      roomsOptions: [
        { label: 'S', value: '?' },
        { label: '1к', value: 1 },
        { label: '2к', value: 2 },
        { label: '3к', value: 3 }
      ]
    }
  },
  computed: {
    rangeFilters () {
      return this.$store.getters['filters/ranges']
    }
  },
  methods: {
    resetFilters () {
      this.roomsFilter = null
      this.$store.dispatch('filters/resetRanges')
      this.getFlats()
    },
    getFlats () {
      const filters = { rooms: this.roomsFilter }
      for (const rangeFilter of this.rangeFilters) {
        filters[rangeFilter.key] = rangeFilter.value
      }
      return api.getFlats(filters).then(flats => {
        this.flats = flats
      })
    }
  },
  mounted () {
    this.getFlats()
  }
}
</script>
