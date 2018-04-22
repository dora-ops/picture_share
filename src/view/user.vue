<template>
  <mi-grid :cols="['1000px']" :rows="['auto']" justifyContent="center">
    <mi-grid :cols="['auto']" :rows="['auto', '120px']" class="user-info">
      <div class="user-coverImage" :style="coverHeight">
        <div class="user-image">
          <img :src="userCoverPic" alt="">
        </div>
        <mi-upload class="user-upload" :meta="{userId, filed: 'coverPic'}" :after-upload="onAfterUpload">
           <button class="btn">上传封面图片</button>
        </mi-upload>
      </div>
      <div class="user-wrapper">
         <div class="user-avatar">
           <img :src="userAvatar" alt="">
          <mi-upload class="user-avatar--upload" :meta="{userId, filed: 'avatar'}" :after-upload="onAfterUpload">
            <div class="user-avatar--mask"></div>
            <div class="user-avatar--content">修改图像</div>
          </mi-upload>
         </div>
         <div class="user-content clearfix">
           <div class="user-content--left">
              <h3 class="user-name">{{userName}}</h3>
              <p class="user-desc">一句话介绍自己</p>
              <span class="user-heart"><i class="fas fa-heart"></i></span>
           </div>
          <div class="user-content--right">
            <ul class="user-circles">
              <li>热度: </li>
              <li class="circle-red"><i class="far fa-circle"></i></li>
              <li class="circle-orange"><i class="far fa-circle"></i></li>
              <li class="circle-blue"><i class="far fa-circle"></i></li>
              <li class="circle-green"><i class="far fa-circle"></i></li>
            </ul>
            <button class="btn user-profill">编辑个人资料</button>
          </div>
         </div>
       </div>
    </mi-grid>
  </mi-grid> 
</template>

<script>
import { mapState } from 'vuex';
import api from '../plugin/axios';

  export default {
    name: "user",
    data(){
      return {
        coverPic: '',
        avatarUrl: ''
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId,
        userName: state => state.user.userName,
        userAvatar: state => state.user.userAvatar,
        userCoverPic: state => state.user.userCoverPic,
        userDesc: state => state.user.userDesc
      }),
      coverHeight(){
        let ret = {};
        if(this.userCoverPic){
          ret.height = '240px';
        }
        return ret;
      }
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
      onAfterUpload(){
        this.getUserInfo();
      }
    },
    created(){
      this.getUserInfo();
    }
  }
</script>

<style lang="scss">
  .user-info{
    position: relative;
    margin: 10px 0;
    background: #ffffff;
  }
  .user-coverImage{
    position: relative;
    border-radius: 8px 8px 0px 0px;
    background: #999999;
    height: 132px;
    transition: 0.3s ease-in-out;
    & .user-upload{
      position: absolute;
      top: 25px;
      right: 15px;
      z-index: 5;
      & .btn{
        border-color: #ffffff;
        color: #ffffff;
      }
    }
    & .user-image{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      & img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .user-edit{
    border: 1px solid #ffffff;
    color: #d3d3d3;
    position: absolute;
    right: 15px;
  }
  .user-wrapper{
    position: relative;
  }
  .user-avatar{
    position: absolute;
    top: -70%;
    left: 15px;
    width: 160px;
    height: 160px;
    border: 4px solid #ffffff;
    border-radius: 8px;
    background: #ffffff;
    &:hover{
      .user-avatar--upload{
        display: block;
      }
    }
    & img{
      width: 100%;
      height: 100%;
    }
    &--upload{
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &--mask{
      position: absolute;
      opacity: 0.4;
      width: 100%;
      height: 100%;
      background: #1a1a1a;
      opacity: 0.4;
    }
    &--content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      text-align: center;
      z-index: 5;
    }
  }
  .user-content{
    line-height: 32px;
    margin-left: 200px;
    padding: 15px;
    &--left{
      float: left;
      & .user-heart{
        color: #e64c65;
      }
    }
    &--right{
      float: right;
      display: block;
      & .user-circles{
        display: block;
        & li{
          display: inline-block;
          margin-left: 5px;
        }
      }
      & .user-profill{
        border-color: #239fdb;
        color: #239fdb;
        margin-left: 5px;
        margin-top: 15px;
      }
    }
  }
</style>

