<template>
  <q-layout>
    <q-page-container view="lHh Lpr lFf" :style="styleObject">
      <div class="main-layout">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  computed: {
    styleObject () {
      return {
        height: this.$q.screen.height + 'px'
      }
    }
  }
}
</script>
