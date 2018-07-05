<template>
  <section class="findlist-main">
    <div class="findlist-card" v-for="photo in photoList" :key="photo.id" @click="routeImageView(photo)" v-lazy-container="{ selector: 'img'}">
      <div class="findlist-img">
        <img :data-src="photo.photoCover" alt="">
      </div>
      <div class="findlist-info">
        <div class="findlist-avatar">
          <img :data-src="photo.userInfo.userAvatar" alt="">
        </div>
        <div class="findlist-user">
          <span>{{photo.userInfo.userNickName}}</span>
        </div>
        <ul class="findlist-meta">
          <li>
            <span class="icon-red"><i class="fas fa-heart"></i></span>
            <span>{{photo.photoLikes}}</span>
          </li>
          <li>
            <span class="icon-yellow"><i class="fas fa-star"></i></span>
            <span>{{photo.photoCollection}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import { getPhotoFromType } from '../../../API/find.js'
  export default {
    name: 'findList',
    data(){
      return {
        photoList: []
      }
    },
    watch: {
      '$route'(to, from, next){
        let { params: { type } } = to;
        this.getPhotoFromType(type);
      }
    },
    methods: {
      async getPhotoFromType(type){
        this.photoList = await getPhotoFromType(type)
      },
      routeImageView(photo){
        this.$router.push({ name: 'imageView', params: { id: photo.id }})
      }
    },
    created(){
      const { params: { type } } = this.$route;
      this.getPhotoFromType(type);
    }
  }
</script>

<style lang="scss">
  .findlist-main{
    display: grid;
    grid-template-columns: repeat(4, 285px);
    grid-template-rows: repeat(auto-fill, 345px);
    width: 1200px;
    margin: 30px auto;
    justify-content: center;
    grid-gap: 15px;
  }
  .findlist-card{
    width: 285px;
    height: 345px;
    background: #ffffff;
    cursor: pointer;
  }
  .findlist-img{
    width: 100%;
    height: 285px;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .findlist-info{
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
  .findlist-avatar{
    width: 35px;
    height: 35px;
    margin-right: 10px;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .findlist-user{
    font-size: 14px;
  }
  .findlist-meta{
    display: flex;
    margin-left: auto;
    & li {
      margin-right: 15px;
    }
  }
</style>

