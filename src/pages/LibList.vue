<template>
  <div class="page libList">
    <h4 class="title">Список библиотек</h4>
    <div class="filters">
      <q-input v-model="textFilter"
               class="bordered" placeholder="Начните вбивать название..."
               borderless clearable
      />
    </div>
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
      <q-table
        class="full-height bordered m-table"
        :data="data"
        :columns="columns"
        separator="cell"
        flat hide-bottom
        :rows-per-page-options="[0]"
      >
        <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <span class="text-bold">{{col.label}}</span>
          </q-th>
        </q-tr>
      </template>
        <template v-slot:body="props">
          <q-tr class="cursor-pointer" @click="openPage(props.row)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div>{{getFormattedRow(props.row)[col.field]}}</div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-scroll-area>
    <q-list v-if="false" class="full-height" bordered>
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
  name: 'LibList',
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
        {
          name: 'name',
          label: 'Название',
          field: 'name',
          sortable: true,
          align: 'left'
        },
        {
          name: 'localeName',
          label: 'Местоположение',
          field: 'localeName',
          sortable: true,
          align: 'left'
        }
      ],
      textFilter: ''
    }
  },
  computed: {
    rangeFilters () {
      return this.$store.getters['filters/ranges']
    }
  },
  methods: {
    openPage (row) {
      this.$router.push({ path: 'card', query: { id: row._id } })
    },
    getFormattedRow (row) {
      return {
        name: row.data.general.name,
        localeName: row.data.general.locale.name
      }
    },
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
        this.data = data.slice(0, 20)
      })
    }
  },
  mounted () {
    this.getFlats()
    this.getLibraries()
  }
}
</script>

<style lang="scss">
$m-border-color: #D8D8D8;
$m-border-radius: 5px;

.libList {
  .title {
    margin: 16px 0 32px 0;
    text-transform: uppercase;
    text-align: center;
  }
  .q-input {
    font-size: 16px;
    height: 40px;
    background-color: white;
    padding: 0 8px;
  }
  .bordered {
    border: 1px solid $m-border-color;
    border-radius: $m-border-radius;
  }
  .m-table {
    thead {
      tr th {
        position: sticky;
        z-index: 1;
      }

      tr:first-child th {
        top: 0
      }
    }
    &.q-table--loading thead tr:last-child th {
      top: 48px;
      .q-table__linear-progress {
        left: 0;
      }
    }
  }
}
</style>
