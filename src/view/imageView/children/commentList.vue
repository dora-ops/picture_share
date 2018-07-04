<template>
  <div class="commentlist-main">
    <div class="commentlist-avatar">
      <img :src="commentInfo.commentFromAvatar" alt="">
    </div>
    <div class="commentlist-content">
      <div class="commentlist-info">
        <p>{{commentInfo.commentFromNickName}} <span>{{commentInfo.createdTime}}</span>
        </p>
        <p>{{commentInfo.commentContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'commentList',
    props: {
      commentInfo: {
        type: Object
      }
    }
  }
</script>

<style lang="scss">
  .commentlist-main{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    padding: 15px 0; 
    border-top: 1px solid #eeeeee;
  }
  .commentlist-avatar{
    width: 40px;
    height: 40px;
    margin-right: 15px;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .commentlist-info{
    & p:first-child{
      padding-bottom: 10px;
    }
  }
</style>

