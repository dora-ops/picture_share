<template>
  <div id="app">
    <min-menu v-if="isAuth"></min-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from './components/menu';
import { mapGetters }from 'vuex';

export default {
  name: 'App',
  components: {
    'min-menu': menu
  },
  computed: {
    ...mapGetters([
      'isAuth'
    ])
  }
}

</script>

<style lang="scss">
  #app{
    min-width: 1000px;
  }
</style>
