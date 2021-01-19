<template>
  <div class="page libList">
    <div class="q-pa-sm q-gutter-sm full-height">
      <div class="title text-bold text-indigo">Список библиотек</div>
      <div>
        <div class="q-gutter-sm row">
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
      </div>
      <q-table
        class="bordered libTable"
        :data="formattedLibs"
        :columns="columns"
        separator="cell"
        flat hide-bottom virtual-scroll
        :rows-per-page-options="[0]" dense
        table-header-class="bg-white text-indigo"
        table-row-class="cursor-pointer"
        @row-click="openPage"
      />
    </div>
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
  computed: {
    formattedLibs () {
      const result = []
      for (const lib of this.libs) {
        result.push(this.getFormattedLib(lib))
      }
      return result
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
    openPage (e, row) {
      this.$router.push({ path: 'card', query: { id: row._id } })
    },
    getFormattedLib (lib) {
      return {
        _id: lib._id,
        name: lib.data.general.name,
        localeName: lib.data.general.locale.name
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
.libList {
  .title {
    margin: 16px 0 16px 0;
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
  }
  .libInput {
    font-size: 14px;
    height: 40px;
    background-color: white;
    padding: 0 8px;
    min-width: 200px;
    flex: 1;
  }
  .libTable {
    max-height: calc(100% - 100px);
    td, th {
      padding: 16px;
      font-size: 14px;
    }
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
  @media (max-width: $breakpoint-xs-max) {
    .libTable {
      td, th {
        padding: 8px;
        font-size: 12px;
      }
    }
  }
}
</style>
