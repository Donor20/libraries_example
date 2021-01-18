<template>
  <div id="q-app" class="full-height">
    <router-view />
  </div>
</template>
<script>
import store from './store/index'

export default {
  name: 'App',
  store
}
</script>
