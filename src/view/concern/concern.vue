<template>
  <section class="concern-container">
    <div class="concern-left">
        
    </div>
    <div class="concern-right">
      <div class="concern-userInfo">
        <div class="concern-avatar">
          <img :src="userDetail.userAvatar" alt="" srcset="">
        </div>
        <p class="concern-name">{{userDetail.userName}}</p>
      </div>
      <div class="concern-meta">
          <ul class="concern-metalist">
            <li>
              <p>粉丝</p>
              <p>{{userDetail.fanCount}}</p>
            </li>
            <li>
              <p>作品</p>
              <p>{{userDetail.photoCount}}</p>
            </li>
            <li>
              <p>关注</p>
              <p>{{userDetail.followCount}}</p>
            </li>
          </ul>
        </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import { getUserDetail } from '../../API/user.js';
  import { getUserFromConcern, getConcerenPhotoList } from '../../API/concern.js'
  export default {
    name: 'concern',
    data(){
      return {
        userDetail: {},
        photolist: []
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      })
    },
    methods: {
      async getUserFromConcern(){
        this.userDetail = await getUserFromConcern(this.userId);
      },
      async getConcerenPhotoList(){
        this.photolist = await getConcerenPhotoList(this.userId);
      }
    },
    created(){
      this.getUserFromConcern();
      this.getConcerenPhotoList();
    }
  }
</script>

<style lang="scss">
  .concern-container{
    margin-top: 103px;
    width: 940px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }
  .concern-left{
    width: 680px;
  }
  .concern-right{
    width: 240px;
    height: 240px;
    margin-left: 20px;
    background: #ffffff;
  }
  .concern-userInfo{
    padding: 20px;
    display: flex;
    height: 160px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .concern-avatar{
    width: 62px;
    height: 62px;;
    & img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .concern-name{
    width: 100%;
    text-align: center;
    margin-top: 15px;
  }
  .concern-meta{
    width: 100%;
    border-top: 1px solid #eee;
  }
  .concern-metalist{
    display: flex;
    height: 80px;
    justify-content: space-between;
    & li{
      flex: 1 0 auto;
      height: 80px;
      text-align: center; 
      & p {
        margin-top: 15px; 
        height: 20px;
        line-height: 20px;
      }
    }
    & li:not(:first-child){
      border-left: 1px solid #eee;
    }
  }
</style>
