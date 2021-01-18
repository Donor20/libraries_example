<template>
  <div v-if="lib" class="page q-pa-sm q-gutter-sm">
    <q-img :src="lib.data.general.image.url" style="height: 200px" contain></q-img>
    <div v-for="(field, index) of fields" :key="index"
      class="row"
    >
      <div style="opacity: 50%; width: 150px;">{{field.title}}:</div>
      <div v-html="field.value" style="margin-left: 20px;"></div>
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
    fields () {
      const general = this.lib.data.general
      return [
        { title: 'Название', value: general.name },
        { title: 'Местоположение', value: general.address.fullAddress },
        { title: 'Описание', value: general.description }
      ]
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

<style scoped>

</style>
