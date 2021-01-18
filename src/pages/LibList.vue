<template>
  <div class="page libList q-pa-sm q-gutter-sm">
    <h5 class="title">Список библиотек</h5>
    <div class="filters row">
      <q-input v-model="nameFilter"
               class="libInput bordered"
               placeholder="Начните вбивать название..."
               borderless clearable debounce="500"
      />
      <q-select v-model="localeFilter" :options="filteredLocales"
                @filter="localeFilterFn"
                class="libInput bordered"
                placeholder="Выберите местоположение..."
                borderless clearable debounce="500" use-input hide-selected fill-input
      />
    </div>
    <q-table
      class="bordered libTable"
      :data="libs"
      :columns="columns"
      separator="cell"
      flat hide-bottom virtual-scroll
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
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'LibList',
  components: {},
  data () {
    return {
      libs: [],
      locales: [],
      filteredLocales: [],
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
      nameFilter: '',
      localeFilter: null
    }
  },
  watch: {
    nameFilter () {
      this.getLibs()
    },
    localeFilter () {
      this.getLibs()
    }
  },
  methods: {
    localeFilterFn (val, update) {
      if (val === '') {
        update(() => {
          this.filteredLocales = this.locales
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.filteredLocales = this.locales.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    openPage (row) {
      this.$router.push({ path: 'card', query: { id: row._id } })
    },
    getFormattedRow (row) {
      return {
        name: row.data.general.name,
        localeName: row.data.general.locale.name
      }
    },
    getLocales () {
      return api.getLocales().then(locales => {
        this.locales = locales
      })
    },
    getLibs () {
      return api.getLibs({
        name: this.nameFilter,
        locale: this.localeFilter
      }).then(libs => {
        this.libs = libs
      })
    }
  },
  mounted () {
    this.getLocales()
    this.getLibs()
  }
}
</script>

<style lang="scss">
$m-active-color: #70D24E;
$m-border-color: #D8D8D8;
$m-border-radius: 5px;

.libList {
  .title {
    margin: 16px 0 16px 0;
    text-transform: uppercase;
    text-align: center;
  }
  .libInput {
    font-size: 14px;
    height: 40px;
    background-color: white;
    padding: 0 8px;
    margin-left: 8px;
    flex: 1;
  }
  .libInput:first-of-type {
    margin-left: 0;
  }
  .bordered {
    border: 1px solid $m-border-color;
    border-radius: $m-border-radius;
  }
  .libTable {
    max-height: calc(100% - 120px);
    td, th {
      font-size: 14px;
    }
    thead {
      tr th {
        position: sticky;
        z-index: 1;
        background-color: white;
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
