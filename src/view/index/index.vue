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
import menu from '../../components/menu';
import api from '../../plugin/axios';
import upload from './children/upload';
import { mapState } from "vuex";

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
        const data = await api.getUserinfo({ params: { id: this.userId }});
        const { data: { data: { userName, userAvatar } } } = data;
        this.$store.commit('SET_USERINFO', { userName, userAvatar });
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


