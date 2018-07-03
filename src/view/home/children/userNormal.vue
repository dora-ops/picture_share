<template>
  <div class="userNormal-main">
    <div class="userNormal-topPic">
      <img :src="photographer.userBgimg" alt="">
    </div>
    <div class="userNormal-avatar">
      <img :src="photographer.userAvatar" alt="">
    </div>
    <div class="userNormal-nickName">
      <p>{{photographer.userNickName}}</p>
    </div>
    <ul class="userNormal-metalist">
      <li>
        <span>粉丝</span>
        <span>{{fanTotal}}</span>
      </li>
    </ul>
    <div class="userNormal-desc">
      <p>{{photographer.userDesc}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userNormal',
    props: {
      photographer: {
        type: Object
      },
      fanTotal: {
        type: Number
      }
    }
  }

</script>

<style lang="scss">
  .userNormal-main{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
    background: #ffffff;
  }
  .userNormal-topPic{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .userNormal-avatar{
    width: 56px;
    height: 56px;
    position: absolute;
    top: 92px;
    left: 50%;
    transform: translateX(-50%);
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .userNormal-nickName{
    margin-top: 160px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .userNormal-metalist{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    & li {
      margin-bottom: 10px;
    }
  }
</style>
