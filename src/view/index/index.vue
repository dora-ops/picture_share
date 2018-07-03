<template>
  <div class="container">
    <min-menu></min-menu>
    <min-upload></min-upload>
    <div class="index-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import upload from './children/upload';
import menu from '../../components/menu';
import { getUserInfo } from '../../API/index.js';

  export default {
    name: 'index',
    components: {
      'min-menu': menu,
      'min-upload': upload
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      })
    },
    methods: {
      async getUserInfo(){
        const resData = await getUserInfo(this.userId);
        this.$store.commit('SET_USERINFO', resData);
      },
    },
    created(){
      this.getUserInfo();
    }
  }
</script>

<style lang="scss">
  .index-container{
    margin-top: 73px;
  }
</style>


