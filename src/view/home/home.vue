<template>
  <section class="home-container">
    <el-carousel height="470px">
      <el-carousel-item class="home-carousel" v-for="cover in homeCovers" :key="cover.id">
        <div class="home-coverInfo">
          <h3>{{cover.photoTitle}}</h3>
          <p>{{cover.photoAvatar}} 发布于 {{cover.createdTime}}</p>
          <div class="home-coverMeta">
            <div class="meta-bar">
              <span class="icon-red">
                <i class="fas fa-heart"></i>
              </span>
              <span>{{cover.photoLikes}}</span>
            </div>
            <div class="meta-bar">
              <span class="icon-yellow">
                <i class="fas fa-star"></i>
              </span>
              <span>{{cover.photoCollection}}</span>
            </div>
          </div>
        </div>
        <img class="home-coverPic" :src="cover.photoNormal" alt="">
      </el-carousel-item>
    </el-carousel>
    <section class="home-section home-recommend">
      <div class="home-section-title">
        <span class="icon-red"><i class="fas fa-dot-circle"></i></span>
        <h1>首页推荐</h1>
        <span class="icon-red"><i class="fas fa-dot-circle"></i></span>
      </div>
      <div class="home-recommend-photo">
        <min-imgNormal v-for="photo in recommendArray" :key="photo.id" :photo="photo" :avatar="photo.userInfo.userAvatar"></min-imgNormal>
      </div>
    </section>
    <section class="home-section home-hot">
      <div class="home-section-title">
        <span class="icon-red"><i class="fas fa-dot-circle"></i></span>
        <h1>最热摄影师</h1>
        <span class="icon-red"><i class="fas fa-dot-circle"></i></span>
      </div>
      <div class="home-hot-photo">
        <min-userNormal v-for="photographer in photographerArray" :key="photographer.id" :photographer="photographer.userInfo" :fanTotal="photographer.fanTotal"></min-userNormal>
      </div>
    </section>
    <section class="home-section home-footer">
      
    </section>
  </section>
</template>

<script>

import { getHomeCover, getRecommendPhoto, getHotPhotographer } from '../../API/home.js';
import imgNormal from './children/imgNormal';
import userNormal from './children/userNormal';


  export default {
    name: 'home',
    components: {
      'min-imgNormal': imgNormal,
      'min-userNormal': userNormal   
    },
    data(){
      return {
        homeCovers: [],
        recommendArray: [],
        photographerArray: []
      }
    },
    methods: {
      async getHomeData(){
        this.homeCovers = await getHomeCover();
        this.recommendArray = await getRecommendPhoto();
        this.photographerArray = await getHotPhotographer();
      }
    },
    created(){
      this.getHomeData();
      //this.$store.dispatch('GET_COUNT_LIST');
    }
  }
</script>

<style lang="scss">
  .home-carousel{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .home-coverInfo{
    position: absolute;
    width: 400px;
    color: #ffffff;
    top: 50%;
    left: 15%;
    transform: translateY(-50%);
    & h3{
      font-size: 25px;
      font-weight: normal;
    }
    & p{
      margin-top: 15px;
      color: #dedddd;
    }
  }
  .home-coverMeta{
    display: flex;
    margin-top: 15px;
    & .meta-bar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 30px;
      font-size: 20px;
      & span:last-of-type{
        margin-left: 8px;
      }
    }
  }
  .home-coverPic{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
  }
  .home-section{
    width: 1200px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
  .home-section-title{
    display: flex;
    height: 50px;
    line-height: 50px;
    justify-content: center;
    margin: 40px 0;
    & h1 {
      margin: 0 30px;
      font-size: 32px;
      font-weight: normal;
    }
  }
  .home-recommend-photo{
    display: grid;
    grid-template-columns: repeat(4, 285px);
    grid-template-rows: repeat(4, 285px);
    grid-gap: 15px;
    justify-content: center;
  }
  .home-hot-photo{
    display: grid;
    grid-template-columns: repeat(4, 285px);
    grid-template-rows: repeat(1, 285px);
    grid-gap: 15px;
    justify-content: center;
  }
  .home-footer{
    
  }
</style>
