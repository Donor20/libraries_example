<template>
  <q-layout view="lHh Lpr lFf" class="full-height">
    <q-page-container :style="styleObject">
      <div class="main ml">
        <div class="main-layout">
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
  padding-top: 20px;
  padding-bottom: 20px;
}
.main-layout {
  margin: 0 auto;
  z-index: 4000;
  height: 100%;
  width: 90%;
  max-width: 950px;
  border-radius: 5px;
  position: relative;
  /* iOS view constraints */
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.page {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
</style>
