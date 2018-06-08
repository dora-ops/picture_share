<template>
  <div class="messagelist-main">
    <ul class="messagelist-list">
      <li v-for="message in messageList" :key="message.id" class="messagelist-item">
        <div class="messagelist-img">
          <img :src="message.detail.userAvatar" alt="">  
        </div>    
        <div class="messagelist-meta">
          <span>{{message.detail.userName}}</span>
          <span>{{messageText}}你的作品</span>
          <span>{{message.photoInfo.photoTitle}}</span>
          <div class="messagelist-time">{{covertTime(message.createdTime)}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { messageAction } from '../../../config/config.js';
  import { mapState } from 'vuex';
  import api from '../../../plugin/axios.js';

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
        userId: state => state.user.userId
      }),
      messageText(){
        let keys = Object.keys(messageAction);
        for (const key of keys) {
          if(key === this.type){
            return messageAction[key];
          }
        }
      },
    },
    methods: {
      async getTypeMessage(type, id){
        const data = await api.getMessageList({ params: { type, id } }); 
        const { data: { data: messagelist } } = data;
        this.messageList = messagelist;
        this.$store.dispatch('GET_COUNT_LIST');
        this.$emit('deleteMessage', this.type);
      },
      covertTime(time){
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}-${month}-${day}`;
      }
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
  .messagelist-photo{
    
  }
</style>

