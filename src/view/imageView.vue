<template>
  <section class="imageView-container">
    <section class="imageView-main"> 
      <section class="imageView-left">
        <el-carousel :autoplay="false" height="470px">
          <el-carousel-item v-for="photo in photoInfo.photoNormal" :key="photo.id">
            <div class="imageView-imgBox">
              <img class="imageView-img" :src="photo" alt="">
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section class="imageView-right">
          <div class="imageView-avatar">
            <span class="avatar-img"><img :src="userInfo.userAvatar" alt=""></span>
            <span class="avatar-name">{{userInfo.userName}}</span>
            <button class="btn" v-if="id === userId">关注她</button>
          </div>
          <div class="imageView-meta">
            <h3 class="imageView-info">{{photoInfo.photoTitle}}</h3>
            <p class="imageView-info">发布于 {{time}} </p>
            <div class="imageView-info imageView-desc">
              <p>{{photoInfo.photoDesc}}</p>
            </div>
            <ul class="imageView-bar">
              <li class="imageView-baritem">
                <span class="material-icons" :class="[praiseState === '0' ? 'icon-default' : 'icon-red']">favorite</span>
                <span class="imageView-text">{{photoInfo.photoLikes}}</span>
              </li>
              <li class="imageView-baritem">
                <span class="material-icons" :class="[collectionState === '0' ? 'icon-default' : 'icon-yellow']">star</span>
                <span class="imageView-text">{{photoInfo.photoCollection}}</span>
              </li>
              <li class="imageView-baritem">
                <span class="material-icons icon-default">remove_red_eye</span>
                <span class="imageView-text">{{photoInfo.photoBrowse}}</span>
              </li>
            </ul>
          </div>
          <div class="imageView-action">
            <button class="btn" @click="handlePraise">{{praiseText}}</button>
            <button class="btn" @click="handleCollection">{{collectionText}}</button>
            <button class="btn" @click="handleMessage">发送消息</button>
          </div>
      </section>
    </section>
  </section>
</template>

<script>
import api from '../plugin/axios.js';
import User from '../store/modules/user.js';
import { mapState } from 'vuex';
const state = {
  success: '1',
  error: '0'
}
  export default {
    name: 'imageView',
    data(){
      return {
        id: null,
        userInfo: {},
        photoInfo: {},
        praiseState: null,
        collectionState: null
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      }),
      time(){
        let date = new Date(this.photoInfo.createdAt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}-${month}-${day}`;
      },
      praiseText(){
        return this.praiseState === state.error ? '点赞支持' : '已点赞';
      },
      collectionText(){
        return this.collectionState === state.error ? '收藏作品' : '已收藏';
      }
    },
    methods: {
      async getPhotoInfo(id){
        const photoInfo = await api.getPhotoInfo({ 
          params: { photoId: id, userId: this.userId } 
        });
        const { data: { data: { userId }, data: photoData } } = photoInfo;
        const userInfo = await api.getUserhome({ params: { id: userId }});
        const { data: { data: userData } } = userInfo; 
        this.userInfo = userData;
        this.photoInfo = photoData;
        this.photoInfo.photoNormal = JSON.parse(photoData.photoNormal);
        this.praiseState = photoData.praiseState;
        this.collectionState = photoData.collectionState;
      },
      async handlePraise(){
        const stateData = await api.postPraiseState({ data: {
          praiseFromId: this.userId,
          praiseToId: this.userInfo.userId,
          photoId: this.photoInfo.id,
        }});
        const { data: { data: state } } = stateData;
        this.praiseState = state;
        this.getPhotoInfo(this.id);
      },
      async handleCollection(){
        const stateData = await api.postCollectionState({ data: {
          collectionFromId: this.userId,
          collectionToId: this.userInfo.userId,
          photoId: this.photoInfo.id,
        }})
        const { data: { data: state } } = stateData;
        this.collectionState = state;
        this.getPhotoInfo(this.id);
      },
      async handleMessage(){

      }
    },
    created(){
      const { params: { id } } = this.$route;
      this.id = id;
      this.getPhotoInfo(id);
    }
  }
</script>

<style lang="scss">
  .imageView-container{
    width: 100%;
    height: auto;
    
  }
  .imageView-main{
    display: flex;
    min-height: 500px;
    background: #ffffff;
  }
  .imageView-left{
    height: 100%;
    flex: 1 0 auto;
    padding: 15px 30px;
    border-right: 1px solid #eeeff2;
  }
  .imageView-imgBox{
    position: relative;
    height: 100%;
  }
  .imageView-img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    min-width: 100px;
    max-width: 100%;
    max-height: 100%;
  }
  .imageView-right{
    width: 340px;
    padding: 15px 15px;
  }
  .imageView-avatar{
    padding-bottom: 15px;
    border-bottom: 1px solid #eeeff2;
    & span {
      display: inline-block;
      vertical-align: middle;
      margin-right: 15px;
    }
    & .avatar-name{
      width: 140px;
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .avatar-img{
      width: 40px;
      height: 40px;
      & img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .imageView-meta{
    padding: 15px 0;
    border-bottom: 1px solid #eeeff2;
  }
  .imageView-info{
    margin-bottom: 15px;
  }
  .imageView-desc{
    line-height: 20px;
    height: 40px;
    max-height: 150px;
    overflow: hidden;
    & p {
      float: right;
      margin-left: -5px;
      width: 100%;
      word-break: break-all;
    }
    &::before{
      float: left;
      width: 5px;
      content: '';
      height: 40px;
    }
    &::after{
      float: right;
      content: '...';
      height: 20px;
      line-height: 20px;
      width: 3em;
      margin-left: 3em;
      position: relative;
      left: 100%;
      top: -20px;
      padding-right: 5px;
    }
  }
  .imageView-bar{
    display: flex;
    margin-top: 15px;
    & .imageView-baritem{
      margin-right: 15px;
      display: flex;
      align-items: center;
      & .imageView-text{
        font-size: 18px;
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
  .imageView-action{
    padding-top: 15px;
    & .btn{
      width: 100%;
      margin-bottom: 15px;
      border-radius: 5px;
      border: 1px solid #d6d8db;
      &:first-of-type{
        color: #ffffff;
        border: 1px solid #EA6F5A;
        background: #EA6F5A;
      }
    }
  }
</style>
