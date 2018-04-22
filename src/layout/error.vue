<template>
  <div class="error-container">
    <main class="error-main">
      <img src="../assets/404.png" alt="" srcset="">
      <div class="error-title">哎呀..... 看上去你迷路了</div>
      <router-link to="/index" tag="div" class="error-link">回到首页</router-link>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'error',

  }
</script>

<style lang="scss">
  .error-container{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .error-main{
    width: 800px;
    height: 450px;
    padding: 20px;
    text-align: center;
    color: #5f99c1;
    font-size: 18px;
    border: 20px solid #a7c9e1;
    & img{
      display: block;
      min-width: 100%;
      max-height: 400px;
    }
    .error-link{
      margin-top: 15px;
      font-size: 14px;
      color: #78909c;
      cursor: pointer;
    }
  }
</style>
