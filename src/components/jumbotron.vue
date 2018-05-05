<template>
  <section class="jumbotron-container">
    <div class="jumbotron-coverimage">
      <img src="" alt="">
    </div>
    <aside class="jumbotron-slide">
      <div class="jumbotron-slide-avatar">
        <img :src="userAvatar" alt="">
      </div>
      <div class="jumbotron-slide-text">
        <h3>{{userName}}</h3>
        <p>一句话介绍自己</p>
      </div>
      <div class="jumbotron-slide-detail">
        <div class="detail-total">
          <span class="material-icons icon-red">favorite</span>
          <span>{{heatTotal}}</span>
        </div>
        <span class="material-icons detail-total" v-if="isUser">mail_outline</span>
      </div>
      <ul class="jumbotron-slide-toolbar">
        <li>
          <span href="#" class="material-icons">photo_library</span>
          <span>{{photoTotal}}</span>
        </li>
        <li>
          <span href="#" class="material-icons">library_music</span>
          <span>{{musicTotal}}</span>
        </li>
        <li>
          <span href="#" class="material-icons">video_library</span>
          <span>{{videoTotal}}</span>
        </li>
      </ul>
      <button class="btn jumbotron-slide-edit">编辑封面图</button>
    </aside>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MinJumbotron',
  props: {
    heatTotal: {
      type: Number,
      default: 0,
    },
    photoTotal: {
      type: Number,
      default: 0
    },
    musicTotal: {
      type: Number,
      default: 0
    },
    videoTotal: {
      type: Number,
      default: 0
    },
    isUser: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      userAvatar: state => state.user.userAvatar,
      userName: state => state.user.userName,
      userDesc: state => state.user.userDesc
    })
  },
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
      min-width: 100%;
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
      & li{
        color: #dedddd;
        cursor: pointer;
        & span{
          display: inline-block;
          vertical-align: middle;
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
