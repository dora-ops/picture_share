<template>
  <div class="messagelist-main">
    <div class="messagelist-noData" v-if="messageList.length === 0">
      <p>暂时还没有消息哦</p>
    </div>
    <ul class="messagelist-list" v-else>
      <li v-for="message in messageList" :key="message.id" class="messagelist-item">
        <div class="messagelist-img">
          <img :src="message.userInfo.userAvatar" alt="">  
        </div>    
        <div class="messagelist-meta">
          <span>{{message.userInfo.userNickName}}</span>
          <span>{{messageText}}你的作品</span>
          <span>{{message.photo.photoTitle}}</span>
          <div class="messagelist-time">{{message.createdTime}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { actionType } from '../../../config/config.js';
  import { getMessageList } from '../../../API/message.js';

  export default {
    name: 'messagelist',
    data(){
      return {
        type: null,
        messageList: [],
      }
    },
    watch: {
      '$route'(to, from){
        const { params: { type } } = this.$route;
        this.type = type;
        this.getTypeMessage(type, this.userId);
      }
    },
    computed:{
      ...mapState({
        userId: state => state.user.userId,
        userMessage: state => state.user.userMessage
      }),
      messageText(){
        return actionType[this.type].text;
      },
    },
    methods: {
      async getTypeMessage(type, id){
        let messageType = actionType[type].state;
        this.messageList = await getMessageList(messageType, id); 
        this.$store.dispatch('GET_COUNT_LIST');
      },
    },
    created(){
      const { params: { type } } = this.$route;
      this.type = type;
      this.getTypeMessage(type, this.userId);
    }
  }
</script>

<style lang="scss">
  .messagelist-item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 15px 30px;
    border-bottom: 1px dashed #f0f0f0;
  }
  .messagelist-img{
    width: 60px;
    height: 60px;
    margin-right: 15px;
    & img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .messagelist-meta{
    & span{
      font-size: 16px;
      font-weight: bold;
    }
    & span:nth-of-type(2){
      font-size: 14px;
      color: #78909c;
    }
    .messagelist-time{
      margin-top: 8px;
      font-size: 14px;
    }
  }
  .messagelist-noData{
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>

