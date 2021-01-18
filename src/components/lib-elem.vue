<template>
  <q-item class="q-pa-sm items-center" @click="openPage" clickable>
    <div class="text-bold">{{lib.data.general.name}}</div>
    <div>{{lib.data.general.locale.name}}</div>
<!--    <q-img :src="lib.data.general.image.url"></q-img>-->
  </q-item>
</template>

<script>
export default {
  name: 'lib-elem',
  props: ['lib'],
  methods: {
    openPage () {
      this.$router.push({ path: 'card', query: { id: this.lib._id } })
    }
  }
}
</script>

<style scoped>

</style>
