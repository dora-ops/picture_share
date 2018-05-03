<template>
  <div id="app">
    <min-menu v-if="isAuth"></min-menu>
    <div class="app-content">
      <router-view></router-view>
    </div>
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
  .app-content{
    margin-top: 73px;
  }
</style>
