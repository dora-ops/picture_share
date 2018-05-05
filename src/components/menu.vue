<template>
  <header class="menu-container">
    <div class="menu-logo">
      <div class="menu-logo-font material-icons">photo_camera</div>
      <h3 class="menu-logo-text">极简</h3>
    </div>
    <nav class="menu-nav">
      <router-link to="/" exact>发现</router-link>
      <router-link to="/subscriptions" exact>关注</router-link>
      <router-link to="/notifications" exact>消息</router-link>
    </nav>
    <div class="menu-user">
      <div class="menu-user-avatar" @click="routeUserHome">
        <img :src="userAvatar" alt="">
      </div>
      <div class="menu-user-add material-icons">add_circle_outline</div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MinMenu',
  computed: {
    ...mapState({
      userAvatar: state => state.user.userAvatar,
      userId: state => state.user.userId
    })
  },
  methods: {
    routeUserHome(){
      this.$router.push({name: 'user', params: { id: this.userId }});
    }
  }  
}

</script>

<style lang="scss">
  .router-link-active{
    background: #5db0c6;
  }
  .menu-container{
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 73px;
    line-height: 73px;
    padding: 0 30px; 
    background: #ffffff;
    border-bottom: 1px solid #eeeff2;
    z-index: 9999;
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
      &:hover{
        background: #5db0c6;
        color: #ffffff;
      }
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
      & img{
        display: block;
        width: 30px;
        height: 30px;
        margin: 20px 0;
        border-radius: 50%;
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
