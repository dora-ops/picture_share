<template>
  <section class="message-container">
    <div class="message-main">
      <div class="message-left">
        <ul class="message-list">
          <router-link class="message-list-item" :to="{name: 'messagelist', params: {type: 'collection'}}" tag="li" exact-active-class="message-active">
            <span>收藏</span>
            <span>{{collectionCount}}</span>
          </router-link>
          <router-link class="message-list-item" :to="{name: 'messagelist', params: {type: 'praise'}}" tag="li" exact-active-class="message-active">
            <span>点赞</span>
            <span>{{praiseCount}}</span>
          </router-link>
          <router-link class="message-list-item" :to="{name: 'messagelist', params: {type: 'concern'}}" tag="li" exact-active-class="message-active">
            <span>关注</span>
            <span>{{concernCount}}</span>
          </router-link>
        </ul>
      </div>
      <div class="message-right">
        <router-view v-on:deleteMessage="deleteMessage"></router-view>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '../../plugin/axios.js';
  import { messageAction } from '../../config/config.js';

  export default {
    name: 'message',
    data(){
      return {
        type: null,
        collectionCount: '',
        praiseCount: '',
        concernCount: ''
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      })
    },
    methods: {
      async getCountList(){
        const data = await api.getCountList({ params: { id: this.userId }});
        const { data: { data: countList } } = data;
        countList.forEach(messageObj => {
          const { messageType, messageTotal } = messageObj;
          if(messageType === 'collection'){
            this.collectionCount = messageTotal;
          }else if(messageType === 'praise'){
            this.praiseCount = messageTotal;
          }else if(messageType === 'concern'){
            this.concernCount = messageTotal;
          }
        });
      },
      deleteMessage(messageType){
        console.log(messageType);
        if(messageType === 'collection'){
            this.collectionCount = "";
          }else if(messageType === 'praise'){
            this.praiseCount = "";
          }else if(messageType === 'concernCount'){
            this.concernCount = "";
          }
      }
    },
    created(){
      this.getCountList()
      this.$router.push({name: 'messagelist', params: {type: 'collection'}})
    }
  }
</script>

<style lang="scss">
  .message-active{
    border-left: 4px solid red !important;
    background: #f0f0f0;
  }
  .message-main{
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    display: flex;
    align-items: flex-start;
  }
  .message-left{
    width: 320px;
    margin-right: 20px;
    background: #ffffff;
  }
  .message-list-item{
    padding: 15px 15px;
    height: 60px;
    line-height: 30px;
    cursor: pointer;
    display: flex;
    & span{
      height: 30px;
      line-height: 30px;
      &:last-of-type{
        margin-left: 200px
      }
    }
  }
  .message-right{
    width: 860px;
    min-height: 300px;
    background: #ffffff;
  }
</style>

