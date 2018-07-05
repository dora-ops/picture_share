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
          <div class="imageView-avatar" @click="routeHome">
            <span class="avatar-img"><img :src="userInfo.userAvatar" alt=""></span>
            <span class="avatar-name">{{userInfo.userNickName}}</span>
          </div>
          <div class="imageView-meta">
            <h3 class="imageView-info">{{photoInfo.photoTitle}}</h3>
            <p class="imageView-info">发布于 {{photoInfo.createdTime}} </p>
            <div class="imageView-info imageView-desc">
              <p>{{photoInfo.photoDesc}}</p>
            </div>
            <ul class="imageView-bar">
              <li class="imageView-baritem">
                <span :class="[praiseState === '0' ? 'icon-default' : 'icon-red']">
                  <i class="fas fa-heart"></i>
                </span>
                <span class="imageView-text">{{photoInfo.photoLikes}}</span>
              </li>
              <li class="imageView-baritem">
                <span :class="[collectionState === '0' ? 'icon-default' : 'icon-yellow']">
                  <i class="fas fa-star"></i>
                </span>
                <span class="imageView-text">{{photoInfo.photoCollection}}</span>
              </li>
              <li class="imageView-baritem">
                <span class="icon-default">
                  <i class="far fa-eye"></i>
                </span>
                <span class="imageView-text">{{photoInfo.photoBrowse}}</span>
              </li>
            </ul>
          </div>
          <div class="imageView-action">
            <button class="btn" @click="handlePraise">{{praiseText}}</button>
            <button class="btn" @click="handleCollection">{{collectionText}}</button>
            <button class="btn">发送消息</button>
          </div>
      </section>
    </section>
    <section class="imageView-photoInfo">
      <h2>{{photoInfo.photoTitle}}</h2>
      <ul class="imageView-navMeta">
        <li> <span>发布:</span> <span>{{photoInfo.createdTime}}</span></li>
        <li> <span>分类:</span> <span>{{photoInfo.photoCategoryName}}</span></li>
        <li> <span>浏览:</span> <span>{{photoInfo.photoBrowse}}</span> </li>
      </ul>
      <div class="imageView-detail">
        <p>{{photoInfo.photoDesc}}</p>
      </div>
      <div class="imageView-comment">
        <div>发表你的评论</div>
        <textarea v-model.trim="photoComment"></textarea>
        <button class="btn imageView-submit" @click="handleComment" v-bind:disabled="isSubmit">评论</button>
      </div>
      <div class="imageView-commentList">
        <div v-if="commentTotal">
          <h3>{{commentTotal}}条评论</h3>
          <min-commentlist v-for="comment in commentList" :key="comment.id" :commentInfo="comment"></min-commentlist>
          <div class="imageView-more">
            <button class="btn" @click="getMoreComment">查看更多</button>
          </div>
        </div>
        <div v-else>
          <p>暂无评论</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import { getUserDetail } from '../../API/user.js';
  import { state, actionType } from '../../config/config.js';
  import commenList from './children/commentList.vue';
  import { getPhotoInfo, postPhotoMessage, getMessageState, postComment, getCommentList } from '../../API/imageView.js';

  export default {
    name: 'imageView',
    data(){
      return {
        photoId: null,
        userInfo: {},
        photoInfo: {},
        praiseState: state.error,
        collectionState: state.error,
        photoComment: '',
        commentList: [],
        commentTotal: 0,
        start: 0,
        length: 2,
        isSubmit: false,
      }
    },
    components: {
      'min-commentlist': commenList
    },
    watch: {
      '$route'(to, from){
        const { params: { id } } = to;
        this.photoId = id;
        this.getPhotoInfo(id);
      },
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId,
        userName: state => state.user.userName,
        userAvatar: state => state.user.userAvatar
      }),
      praiseText(){
        return this.praiseState === state.error || undefined ? '点赞支持' : '已点赞';
      },
      collectionText(){
        return this.collectionState === state.error || undefined ? '收藏作品' : '已收藏';
      },
      moreComment(){
        return this.commentTotal > length ? true : false; 
      }
    },
    methods: {
      async getPhotoInfo(photoId){
        const photoData = await getPhotoInfo(photoId);
        const { userInfo } = photoData;
        this.photoInfo = photoData;
        this.userInfo = userInfo;
        this.getStateFromUser();
        this.getCommentList();
      },
      async handlePraise(){
        this.praiseState = await postPhotoMessage({
          messageType: actionType.praise.state,
          messageToId: this.userInfo.userId,
          messageFromId: this.userId,
          photoId: this.photoInfo.id
        })
        this.praiseState === state.error ? this.photoInfo.photoLikes -= 1 : this.photoInfo.photoLikes += 1; 
      },
      async handleCollection(){
        this.collectionState = await postPhotoMessage({
          messageType: actionType.collection.state,
          messageToId: this.userInfo.userId,
          messageFromId: this.userId,
          photoId: this.photoInfo.id
        })
        this.collectionState=== state.error ? this.photoInfo.photoCollection -= 1 : this.photoInfo.photoCollection += 1; 
      },
      async getStateFromUser(){
        let resData = await getMessageState(this.userId, this.userInfo.id, this.photoId);
        let praise = resData.find((message)=> message.messageType === actionType.praise.state);
        let collection = resData.find((message) => message.messageType === actionType.collection.state);
        if(praise !== undefined){
          this.praiseState = praise.messageState;
        }
        if(collection !== undefined){
          this.collectionState = collection.messageState
        }
      },
      async handleComment(){  
        if(this.photoComment === ''){
          this.$message({message: '评论不能为空', type: 'error'})
          return;
        }
        this.createNewComment();
        this.isSubmit = true;
        this.photoComment = " ";
        let resData = await postComment({
          commentContent: this.photoComment, 
          commentFromId: this.userId,
          commentFromAvatar: this.userAvatar,
          commentFromNickName: this.userName,
          photoId: this.photoId
        })
        if(resData){
          this.$message({ message: '评论成功', type: 'info'})
          this.isSubmit = false;
        }
      },
      async getCommentList(){
        const { commentList, total } = await getCommentList(this.photoId, this.start, this.length);
        this.commentList = commentList;
        this.commentTotal = total;
      },
      async getMoreComment(){
        this.start += this.length;
        const { commentList } = await getCommentList(this.photoId, this.start, this.length);
        this.commentList.push(...commentList);
      },
      createNewComment(){
        this.commentList.unshift({
          commentFromAvatar: this.userAvatar,
          commentFromNickName: this.userName,
          commentContent: this.photoComment
        })
        this.commentTotal += 1;
      },
      routeHome(){
        this.$router.push({ name: 'user', params: { id: this.userInfo.id }});
      }

    },
    created(){
      const { params: { id } } = this.$route;
      this.photoId = id;
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
    cursor: pointer;
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
  .imageView-photoInfo{
    width: 1200px;
    margin: 20px auto;
    padding: 30px;
    background: #ffffff;
  }
  .imageView-navMeta{
    display: flex;
    margin-top: 15px;
    & li {
      margin-right: 15px;
    }
  }
  .imageView-detail{
    margin-top: 15px;
    & p {
      font-size: 18px;
      line-height: 36px;
      padding-bottom: 26px;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .imageView-comment{
    width: 100%;
    margin-top: 15px;
    overflow: hidden;
    & textarea {
      width: 100%;
      height: 200px;
      overflow-y: auto;
      resize: none;
      outline: none;
      padding: 10px;
      font-size: 18px;
      line-height: 36px;
      margin-top: 15px; 
    }
  }
  .imageView-submit{
    float: right;
    margin-top: 15px;
    background: #039BE5;
    border: #039BE5;
    color: #ffffff;
    &:disabled{
      background: #e6e6e6;
      color: #292b2c;
    }
  }
  .imageView-more{
    margin-top: 15px;
    text-align: center;
    & .btn{
      border: 1px solid #ddd;
      padding: 0 30px;
    }
  }
</style>
