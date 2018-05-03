<template>
  <div class="container">
    <p>{{this.userName}}</p>
    <span @click="routeUserHome">个人主页</span>
    <router-view></router-view>
  </div>
</template>

<script>
import api from '../plugin/axios';
import { mapState } from "vuex";

  export default {
    name: 'index',
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
             userInfo: { desc, avatar, coverPic}
            }
          }
        } = data;
        this.$store.commit('SET_USERINFO', {userName, desc, avatar, coverPic})
      },
      routeUserHome(){
        this.$router.push({name: 'user', params: { 'id': this.userId }});
      }
    },
    created(){
      this.getUserInfo();
    }
  }
</script>

<style lang="scss">
  .container{
    margin-top: 70px;
  }
</style>
