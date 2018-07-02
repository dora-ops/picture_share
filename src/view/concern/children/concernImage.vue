<template>
  <div class="concernImage-main">
    <div class="concerenImage-image" @click="routeImageView">
      <img :src="imageDetail.photoShow" alt="">
    </div>
    <div class="concernImage-user">
      <div class="concernImage-info" @click="routeUser">
        <div class="concernImage-userAvatar">
          <img :src="userInfo.userAvatar" alt="">
        </div>
        <div class="concernImage-userMeta">
          <span>{{userInfo.userName}}</span>
          <span>{{imageDetail.createdTime}}</span>
        </div>
      </div>
      <ul class="concernImage-meta">
        <li>
          <span class="concernImage-icon"><i class="far fa-eye"></i></span>
          <span>{{imageDetail.photoBrowse}}</span>
        </li>
        <li>
          <span class="concernImage-icon"><i class="fas fa-heart"></i></span>
          <span>{{imageDetail.photoLikes}}</span>
        </li>
        <li>
          <span class="concernImage-icon"><i class="fas fa-star"></i></span>
          <span>{{imageDetail.photoCollections}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'concernImage',
    props: {
      imageDetail: {
        type: Object
      }
    },
    computed:{
      userInfo(){
        return this.imageDetail.userInfo;
      }
    },
    methods: {
      routeImageView(){
        this.$router.push({ name: 'imageView', params: { id: this.imageDetail.id }})
      },
      routeUser(){
        this.$router.push({ name: 'user', params: { id: this.userInfo.userId }});
      }
    }
  }
</script>

<style lang="scss">
  .concernImage-main{
    margin-bottom:  30px;
  }
  .concerenImage-image{
    width: 100%;
    height: 450px;
    cursor: pointer;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .concernImage-user{
    width: 100%;
    height: 67px;
    padding: 0 15px;
    background: #ffffff;
    display: flex;
  }
  .concernImage-info{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
  }
  .concernImage-userAvatar{
    width: 35px;
    height: 35px;
    margin-right: 15px;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius:  50%;
    }
  }
  .concernImage-meta{
    margin-left: auto;
    display: flex;
    width: 120px;
    justify-content: space-between;
    align-items: center;
  }
  .concernImage-icon{
    color: #e0e0e0;
    margin-right: 5px;
  }
</style>

