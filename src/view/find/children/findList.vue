<template>
  <section class="findlist-main">
    <div class="findlist-card" v-for="photo in photoList" :key="photo.id" v-lazy-container="{ selector: 'img'}">
      <div class="findlist-img"  @click="routeImageView(photo)">
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
          <li @click="changePhotoLike(photo)">
            <span :class="[photo.isLike ? 'icon-red' : 'icon-default']"><i class="fas fa-heart"></i></span>
            <span>{{photo.photoLikes}}</span>
          </li>
          <li @click="changePhotoCollection(photo)">
            <span :class="[photo.isCollection ? 'icon-yellow': 'icon-default']"><i class="fas fa-star"></i></span>
            <span>{{photo.photoCollection}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="findlist-more">
      <button @click="handleMore" class="btn" v-if="isMore" >查看更多</button>
      <h3 v-else>The end</h3>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import { actionType, state } from '../../../config/config.js'
  import { getPhotoFromType } from '../../../API/find.js'
  import { postPhotoMessage } from '../../../API/imageView.js';
  
  export default {
    name: 'findList',
    data(){
      return {
        type: null,
        photoList: [],
        start: 0,
        length: 8,
        photoTotal: 0,
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      }),
      isMore(){
        return this.photoList.length < this.photoTotal ? true : false
      }
    },
    watch: {
      '$route'(to, from, next){
        let { params: { type } } = to;
        this.type = type;
        this.start = 0;
        this.getPhotoFromType();
      }
    },
    methods: {
      async getPhotoFromType(){
        let { resData, photoTotal } = await getPhotoFromType(this.userId, this.type, this.start, this.length);
        this.photoList = resData;
        this.photoTotal = photoTotal;
      },
      async handleMore(){
        this.start += this.length;
        let { resData, photoTotal } = await getPhotoFromType(this.userId, this.type, this.start, this.length);
        this.photoList.push(...resData);
      },
      async changePhotoLike(photo){
        let praiseState = await postPhotoMessage({
          messageType: actionType.praise.state,
          messageToId: photo.userId,
          messageFromId: this.userId,
          photoId: photo.id
        })
        if(praiseState === state.scuess){
          photo.isLike = true;
          photo.photoLikes++
        }else{
          photo.isLike = false;
          photo.photoLikes--
        }
      },
      async changePhotoCollection(photo){
        let collectionState = await postPhotoMessage({
          messageType: actionType.collection.state,
          messageToId: photo.userId,
          messageFromId: this.userId,
          photoId: photo.id
        })
        if(collectionState === state.scuess){
          photo.isCollection = true;
          photo.photoCollection++
        }else{
          photo.isCollection = false;
          photo.photoCollection--
        }
      },
      routeImageView(photo){
        this.$router.push({ name: 'imageView', params: { id: photo.id }})
      }
    },
    created(){
      const { params: { type } } = this.$route;
      this.type = type;
      this.getPhotoFromType();
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
  .findlist-more{
    margin-top: 15px;
    grid-column: 1 / 5;
    justify-self: center; 
    & .btn{

    }
  }
</style>

