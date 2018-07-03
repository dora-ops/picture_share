<template>
  <div class="imgNormal-main" @mouseout="showInfo = false " @mouseover=" showInfo = true">
    <div class="imgNormal-tag">{{photo.photoCategoryName}}</div>
    <div class="imgNormal-img">
      <img :src="photo.photoCover" alt="">
    </div>
    <div class="imgNormal-info" v-show="showInfo">
      <div class="imgNormal-avatar">
        <img :src="avatar" alt="">
      </div>
      <div class="imgNormal-nickName">
        <p>{{photo.photoAvatar}}</p>
      </div>
      <div class="imgNormal-browse">
        <span><i class="far fa-eye"></i></span>
        <span>{{photo.photoBrowse}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'imgNormal',
    props: {
      avatar: {
        type: String
      },
      photo: {
        type: Object
      }
    },
    data(){
      return {
        showInfo: false
      }
    }
  }
</script>

<style lang="scss">
  .imgNormal-main{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }
  .imgNormal-tag{
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.5);
  }
  .imgNormal-img{
    width: 285px;
    height: 285px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .imgNormal-info{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    background: rgba(0, 0, 0, 0.5); 
    display: flex;
    padding: 0 5px;
    justify-content: space-around;
    align-items: center;
  }
  .imgNormal-avatar{
    width: 30px;
    height: 30px;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .imgNormal-nickName{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #ffffff;
    margin-left: -35px;
  }
  .imgNormal-browse{
    color: #eeeeee;
    & span:first-child{
      margin-right: 15px;
    }
  }
</style>
