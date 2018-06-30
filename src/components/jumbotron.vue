<template>
  <section class="jumbotron-container">
    <div class="jumbotron-coverimage">
      <img :src="user.userBgimg" alt="">
    </div>
    <aside class="jumbotron-slide">
      <div class="jumbotron-slide-avatar">
        <img :src="user.userAvatar" alt="">
      </div>
      <div class="jumbotron-slide-text">
        <h3>{{user.userName}}</h3>
        <p>{{user.userDesc}}</p>
      </div>
      <div class="jumbotron-slide-detail">
        <div class="detail-total">
          <span class="icon-red"><i class="fas fa-heart"></i></span>
          <span>{{user.userLikes}}</span>
        </div>
        <span class="detail-total" v-if="!isUser"><i class="far fa-envelope"></i></span>
      </div>
      <ul class="jumbotron-slide-toolbar">
        <li>
          <span href="#"><i class="far fa-image"></i></span>
          <span>{{user.userPhotos}}</span>
        </li>
        <li>
          <span href="#"><i class="fas fa-star"></i></span>
          <span>{{user.userCollections}}</span>
        </li>
      </ul>
      <el-upload v-if="isUser"
      ref='upload' action="http://139.199.230.46:3000/upload" :data="{type: 'coverPic', userId: userId}" :headers="{Authorization:`Bearer ${userToken}`}" accept=".jpg, .jpeg" :on-success="handleResponse" :show-file-list="false">
        <button class="btn jumbotron-slide-edit">编辑封面图</button>
      </el-upload>
      <button class="btn jumbotron-slide-edit" @click="changeConcern" v-else>{{concernText}}</button>
    </aside>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api  from '../plugin/axios';
const state = {
  scuess: '1',
  error: '0'
}

export default {
  name: 'MinJumbotron',
  props: {
    user: {
      type: Object,
      default(){
        return {}
      }
    },
    concernText: {
      type: String,
    }
  },
  computed: {
    ...mapState({
      userToken: state => state.user.userToken,
      userId: state => state.user.userId,
      userAvatar: state => state.user.userAvatar,
      userName: state => state.user.userName,
    }),
    isUser(){
      return this.userId === this.user.userId;
    },
  },
  methods: {
    handleResponse(data){
      const { data: dataSrc } = data;
      this.updateBgimg(dataSrc[0]);
    },
    async updateBgimg(bgImg){
      const data = await api.postUserBgimg({ 
        params: { id: this.userId }, 
        data: { userBgimg: bgImg } 
      });
      const { data: { message, status } } = data;
      if(status === 466){
        this.$message({message, type: 'error'})
      }else{
        this.user.userBgimg = bgImg;
        this.$message({ message, type: 'success' });
      }  
    },
    changeConcern(){
      this.$emit('changeConcern');
    }
  }
}
</script>

<style lang="scss">
  .jumbotron-container{
    width: 100%;
    height: 400px;
    position: relative;
  }
  .jumbotron-coverimage{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    & img{
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  }
  .jumbotron-slide{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 400px;
    background: rgba(0, 0, 0, 0.5);
    & &-avatar{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      margin-top: 15px;
      & img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    & &-text{
      width: 200px;
      height: auto;
      margin-top: 15px;
      padding-bottom: 15px;
      text-align: center;
      color: #fdfdfd;
      border-bottom: 1px solid #dedddd;
      & p {
        margin-top: 15px;
        color: #dedddd;
        height: auto;
        max-height: 35px;
        line-height: 18px;
        overflow: hidden;
        font-size: 14px;
      }
    }
    & &-detail{
      width: 200px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      font-size: 16px;
      & .detail-total{
        cursor: pointer;
        & span{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    & &-toolbar{
      width: 200px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & li{
        color: #dedddd;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        & span:last-of-type{
          margin-left: 5px;
          font-size: 16px;
        }
      }
    }
    & &-edit{
      width: 200px;
      margin-top: 30px;
      color: #dedddd
    }
  }
</style>
