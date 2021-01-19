<template>
  <q-layout view="lHh Lpr lFf" class="full-height">
    <q-header class="bg-indigo-9 q-pa-xs">
      <q-breadcrumbs active-color="white">
        <q-breadcrumbs-el v-for="(el, index) in breadcrumbs" :key="index"
          :icon="el.icon" :label="el.label" :to="el.to"
        />
      </q-breadcrumbs>
    </q-header>
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
  data () {
    return {
      router: this.$router,
      breadcrumbs: [{
        icon: 'home', label: 'Главная', to: '/'
      }]
    }
  },
  computed: {
    styleObject () {
      return {
        height: this.$q.screen.height + 'px'
      }
    }
  },
  watch: {
    'router.history.current.path' () {
      this.updateBreadcrumbs()
    }
  },
  methods: {
    updateBreadcrumbs () {
      if (this.router.history.current.path === '/') {
        this.breadcrumbs = [this.breadcrumbs[0]]
      } else if (this.router.history.current.path === '/card') {
        this.breadcrumbs.push({ label: 'Библиотека' })
      }
    }
  },
  mounted () {
    this.updateBreadcrumbs()
  }
}
</script>

<style lang="scss">
$m-border-color: #D8D8D8;
$m-border-radius: 5px;

.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 10px 10px;
}
.main-layout {
  height: 100%;
  position: relative;
  border-radius: $m-border-radius;
  background-color: #F8F8F8;
  font-family: GothamPro, serif;
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
.bordered {
  border: 1px solid $m-border-color;
  border-radius: $m-border-radius;
}
</style>
