<template>
  <div class="container">
    <min-menu></min-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from '../components/menu';
import api from '../plugin/axios';
import { mapState } from "vuex";

  export default {
    name: 'index',
    components: {
      'min-menu': menu
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId,
        userName: state => state.user.userName
      })
    },
    methods: {
      async getUserInfo(){
        const data = await api.getUserinfo({id: this.userId});
        const { data: {
           data: { 
             userName, 
             userInfo: { avatar }
            }
          }
        } = data;
        this.$store.commit('SET_USERINFO', {userName, avatar});
      },
      routeUserHome(){
        this.$router.push({name: 'home', params: { 'id': this.userId }});
      }
    },
    created(){
      this.getUserInfo();
    }
  }
</script>

<style lang="scss">
  
</style>
