<template>
  <header class="menu-container">
    <div class="menu-logo">
      <div class="menu-logo-font">
        <i class="fas fa-camera-retro"></i>
      </div>
      <router-link :to="{name: 'home'}" tag="h3" class="menu-logo-text">极简</router-link>
    </div>
    <nav class="menu-nav">
      <router-link :to="{name: 'home'}" exact-active-class="menu-active">首页</router-link>
      <router-link :to="{name: 'find'}" exact-active-class="menu-active">发现</router-link>
      <router-link :to="{name: 'concern'}" exact-active-class="menu-active">关注</router-link>
      <router-link :to="{name: 'message',}" exact-active-class="menu-active">
        消息
      <span class="menu-badge" v-if="messageTotal">{{messageTotal}}</span>
      </router-link>
    </nav>
    <div class="menu-user">
      <div class="menu-user-avatar" @mouseover="open = true" @mouseleave="open = false">
        <img :src="userAvatar" alt="">
        <ul class="menu-user-nav" :class="{'open': open}">
          <router-link :to="{name: 'user', params: { id: userId }}" tag="li">我的主页</router-link>
          <router-link :to="{name: 'profile'}" tag="li">我的设置</router-link>
          <li @click="loginOut">登出</li>
        </ul>
      </div>
      <div class="menu-user-add material-icons" @click="openDialog"><i class="fas fa-plus-circle"></i></div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { deleteTokenFromLocalStroage } from '../util/auth.js';

export default {
  name: 'MinMenu',
  data(){
    return{
      open: false,
    }
  },
  computed: {
    ...mapState({
      userAvatar: state => state.user.userAvatar,
      userId: state => state.user.userId
    }),
    ...mapGetters([
      'messageTotal'
    ])
  },
  methods: {
    loginOut(){
      this.$store.commit('LOGIN_OUT');
      deleteTokenFromLocalStroage();
      this.$router.push({ name: 'login' });
    },
    openDialog(){
      this.$store.commit('TOOGLE_DIALOG', true);
    }
  }  
}

</script>

<style lang="scss">
  .open{
    display: block !important;
  }
  .menu-active{
    background: #5db0c6;
  }
  .menu-container{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 73px;
    line-height: 73px;
    padding: 0 30px; 
    background: #ffffff;
    border-bottom: 1px solid #eeeff2;
    z-index: 2000;
  }
  .menu-logo{
    display: flex;
    width: 200px;
    line-height: 73px;
    color: #484e4f;
    & &-font{
      font-size: 36px;
      line-height: 73px;
      padding: 0 10px;
    }
  }
  .menu-nav{
    display: flex;
    & a{
      display: block;
      padding: 0 15px;
      color: #484e4f;
      position: relative;
      &:hover{
        background: #5db0c6;
        color: #ffffff;
      }
    }
    & .menu-badge{
      display: block;
      position: absolute;
      top: 10px;
      right: 0px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: red;
      border-radius: 10px;
      color: #ffffff;
    }
  }
  .menu-user{
    display: flex;
    justify-content: center;
    width: 200px;
    margin-left: auto;
    line-height: 73px;
    & &-avatar{
      padding: 0 15px;
      line-height: 73px;
      cursor: pointer;
      position: relative;
      & img{
        display: block;
        width: 30px;
        height: 30px;
        margin: 20px 0;
        border-radius: 50%;
      }
    }
    & &-nav{
      position: absolute;
      width: 120px;
      top: 73px;
      right: 15px;
      display: none;
      z-index: 800;
      & li{
        padding: 0 15px;
        height: 35px;
        line-height: 35px;
        background: #ffffff;
        font-size: 14px;
        color: #484e4f;
        &:hover{
          color: #f4876d; 
        }
      }
    }
    & &-add{
      line-height: 73px;
      color: #f4876d;
      font-size: 30px;
      cursor: pointer;
    }
  }
</style>
