<template>
  <section class="home-container">
    <el-carousel height="400px">
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
              <span>{{cover.photoCollections}}</span>
            </div>
          </div>
        </div>
        <img class="home-coverPic" :src="cover.photoNormal" alt="">
      </el-carousel-item>
    </el-carousel>
    <min-pinboard :photoData="photoArray"></min-pinboard>
    <div class="home-loading" ref="loading"></div>
  </section>
</template>

<script>
import api from '../../plugin/axios.js';
import { getHomeCover, getLimitPhoto } from '../../API/home.js';
import pinboard from '../../components/pinboard';

  export default {
    name: 'home',
    components: {
      'min-pinboard': pinboard
    },
    data(){
      return {
        homeCovers: [],
        photoArray: [],
        offset: 0,
        limit: 8,
        isInfinite: false,
        intersection: null,
      }
    },
    methods: {
      async getHomeCover(){
        const resData = await getHomeCover();
        this.homeCovers = resData;
      },
      async getAllPhoto(){
        if(!this.isInfinite) return;
        const photoArray = await getLimitPhoto(this.offset, this.limit);
        this.appendPhoto(photoArray);
      },
      appendPhoto(photoArray){
        if(photoArray.length !== this.limit){
          this.isInfinite = false;
        }
        this.offset += this.limit;
        photoArray.forEach(photo => this.photoArray.push(photo));
      },
      infiniteLoad(){
        this.intersection = new IntersectionObserver((entries)=>{
          if(entries[0].isIntersecting){
            this.getAllPhoto()
          }
        }, {
          root: null,
          threshold: 1
        })
        this.intersection.observe(this.$refs.loading);
      },
    },
    mounted(){
      this.infiniteLoad();
    },
    created(){
      this.getHomeCover();
      this.getAllPhoto();
      this.isInfinite = true;
      this.$store.dispatch('GET_COUNT_LIST');
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
  .home-loading{
    width: 100%;
    height: 25px;
    margin-top: 25px;
  }
</style>
