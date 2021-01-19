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
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'LibCard',
  data () {
    return {
      lib: null
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
}
</style>
