<template>
  <q-layout view="lHh Lpr lFf" class="full-height">
    <q-page-container :style="styleObject">
      <div class="main">
        <div class="main-layout ml">
          <router-view />
        </div>
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

<style lang="scss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.main-layout {
  height: 100%;
  position: relative;
}
.page {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
.scrollArea {
  flex: 1;
  width: 100%;
  overflow: auto;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: bottom !important;
  height: 100%;
}
</style>
