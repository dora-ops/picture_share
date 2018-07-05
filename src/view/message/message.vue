<template>
  <section class="message-container">
    <div class="message-main">
      <div class="message-left">
        <ul class="message-list">
          <router-link class="message-list-item" v-for="(message, index) in messageType" :key="index" :to="{name: 'messagelist', params: {type: message.route }}" tag="li" exact-active-class="message-active" v-if="message.state !== messageType.all.state">
            <span>{{message.text}}</span>
            <span>{{getMessageCount(message.state)}}</span>
          </router-link>
        </ul>
      </div>
      <div class="message-right">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import { getCountMessage } from '../../API/message.js';
  import { actionType } from '../../config/config.js';

  export default {
    name: 'message',
    data(){
      return {
        messageType: actionType
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId,
        userMessage: state => state.user.userMessage
      }),
      activeType(){
        let key = Object.keys(actionType)[1]
        return key
      }
    },
    methods: {
      getMessageCount(type){
        if(this.userMessage.length === 0 ) return; 
        let message = this.userMessage.find((message)=>{
          if(message.messageType === type){
            return message;
          }
        })
        return message.messageCount > 0 ? message.messageCount : '';
      }
    },
    mounted(){
      this.$store.dispatch('GET_COUNT_LIST');
      this.$router.push({name: 'messagelist', params: {type: this.activeType }})
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

