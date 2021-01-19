<template>
  <div v-if="lib" class="page libInfo">
    <div>
      <q-img :src="lib.data.general.image.url" class="libImg bordered " :ratio="16/9" >
        <div class="absolute-bottom text-subtitle1">
          <div class="libImgTitle text-bold">{{name}}</div>
          <div>
            <q-icon name="location_on" />
            {{fullAddress}}
          </div>
        </div>
      </q-img>
      <div class="q-pa-sm q-gutter-sm">
        <div v-html="description"></div>
      </div>
      <div class="q-pa-sm">
        <div class="smallTitle text-bold">Время работы</div>
        <div v-for="(value, key) in workingSchedule" :key="key" class="workingSchedule">
          <span class="smallTitle text-bold">{{days[key]}}</span>
          {{value.from}} - {{value.to}}
        </div>
      </div>
      <div class="q-pa-sm">
        <div class="smallTitle text-bold">Тэги</div>
        <q-chip v-for="tag in tags" :key="tag.id"
                class="bg-indigo text-white"
        >
          {{tag.name}}
        </q-chip>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'LibCard',
  data () {
    return {
      lib: null,
      days: {
        1: 'пн', 2: 'вт', 3: 'ср', 4: 'чт', 5: 'пт', 6: 'сб', 7: 'вс'
      }
    }
  },
  computed: {
    name () {
      return this.lib.data.general.name
    },
    fullAddress () {
      return this.lib.data.general.address.fullAddress
    },
    description () {
      return this.lib.data.general.description
    },
    tags () {
      return this.lib.data.general.tags
    },
    workingSchedule () {
      return this.lib.data.general.workingSchedule
    }
  },
  methods: {
    getLib () {
      const id = this.$router.history.current.query.id
      return api.getLibById(id).then(lib => {
        this.lib = lib
      })
    }
  },
  mounted () {
    this.getLib()
  }
}
</script>

<style lang="scss">
.libInfo {
  overflow: auto;
  .libImg {
    width: 100%;
    height: 400px;
    /*filter: blur(1px);*/
    .libImgTitle {
      font-size: 18px;
      margin-top: 50px;
    }
  }
  .title {
    text-transform: uppercase;
    /*text-align: center;*/
    font-size: 18px;
  }
  .value {
    margin-left: 16px;
    margin-bottom: 8px;
  }
  .q-img__content > div {
    background: linear-gradient(0deg, black, transparent);;
  }
  p:last-of-type {
    margin: 0;
  }
  .smallTitle {
    opacity: 50%;
  }
  .workingSchedule {
    padding-left: 8px;
  }
}
</style>
