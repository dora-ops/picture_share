<template>
  <section class="concern-container">
    <div class="concern-main">
      <div class="concern-left">
        <ul class="concern-list">
          <li class="concern-list-item">添加关注</li>
          <li class="concern-list-item" v-for="user in concernUser" :key="user.id" @click="routePhotoList(user)">
            <img :src="user.userAvatar" alt="">
            <p class="item-name">{{user.userName}}</p>
          </li>
        </ul>
      </div>
      <div class="concern-right">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '../../plugin/axios.js';
  import { getUserConcern } from '../../API/concern.js';
  export default {
    name: 'concern',
    data(){
      return {
        concernUser: [],
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      })
    },
    methods: {
      async getConcern(){
        const concernUsers = await getUserConcern(this.userId);
        this.concernUser = concernUsers;
      },
      routePhotoList(user){
        this.$router.push({name: 'photolist', params: { id: user.id } });
      }
    },
    created(){
      this.getConcern()
    }
  }
</script>

<style lang="scss">
  .concern-container{
    min-height: calc(100vh - 73px);
    background: #ffffff;
  }
  .concern-main{
    width: 1300px;
    margin: 0 auto;
    padding: 30px 0;
    display: flex;
  }
  .concern-left{
    position: fixed;
    top: 0;
    margin-top: 73px;
    bottom: 0;
    width: 300px;
    overflow: auto;
    border-right: 1px solid #f0f0f0
  }
  .concern-right{
    width: 1000px;
    padding-left: 30px;
    margin-left: 300px;
    height: auto;
  }
  .concern-list{
    width: 100%;
  }
  .concern-list-item{
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 10px 0 10px 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    &:hover{
      background: #f0f0f0;
    }
    &:first-of-type{
      border-bottom: 1px solid #c9cdce;
    }
    & img{
      width: 50px;
      height: 50px;
      margin-right: 15px;
      border-radius: 50%;
    }
  }
</style>
