<template>
  <div class="page">
    <h4 class="flatsPageTitle">Список библиотек</h4>
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
<!--    <q-table-->
<!--      :data="data"-->
<!--      :columns="columns"-->
<!--    >-->
<!--      <template v-slot:header="props">-->
<!--      <q-tr :props="props">-->
<!--        <q-th v-for="col in props.cols" :key="col.name" :props="props">-->
<!--          {{col.label}}-->
<!--        </q-th>-->
<!--      </q-tr>-->
<!--    </template>-->
<!--      <template v-slot:body="props">-->
<!--        <q-tr>-->
<!--          <q-td v-for="col in props.cols" :key="col.name" :props="props">-->
<!--            <div>{{props.row.data.general[col.field]}}</div>-->
<!--          </q-td>-->
<!--        </q-tr>-->
<!--      </template>-->
<!--    </q-table>-->
    <q-list class="full-height" bordered>
      <q-scroll-area class="scrollArea">
        <template v-for="lib of data">
          <lib-elem :lib="lib" :key="lib._id"></lib-elem>
        </template>
      </q-scroll-area>
    </q-list>
    <q-scroll-area v-if="false" class="scrollArea">
      <div class="row flatCards">
        <flat-card v-for="flat in flats" :key="flat.building_id + '_' + flat.id"
                   :flat="flat"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import api from '../services/api'
import FlatCard from '../components/flat-card'
import RangeFilter from '../components/range-filter'
import LibElem from '../components/lib-elem'

export default {
  name: 'PageIndex',
  components: { LibElem, RangeFilter, FlatCard },
  data () {
    return {
      flats: [],
      roomsFilter: null,
      roomsOptions: [
        { label: 'S', value: '?' },
        { label: '1к', value: 1 },
        { label: '2к', value: 2 },
        { label: '3к', value: 3 }
      ],
      data: [],
      columns: [
        { name: 'name', label: 'Название', field: 'name' }
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
    },
    getLibraries () {
      return api.getLibraries().then(data => {
        this.data = data.slice(0, 3)
      })
    }
  },
  mounted () {
    this.getFlats()
    this.getLibraries()
  }
}
</script>
