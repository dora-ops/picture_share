<template>
  <section class="pinboard-container">
    <div class="pinboard-nav">
      <div class="pinboard-nav-text">作品集锦</div>
      <ul class="pinboard-nav-rank">
        <li>热度:</li>
        <li class="material-icons circle-red">panorama_fish_eye</li>
        <li class="material-icons circle-orange">panorama_fish_eye</li>
        <li class="material-icons circle-blue">panorama_fish_eye</li>
        <li class="material-icons circle-green">panorama_fish_eye</li>
      </ul>
    </div>
    <div class="pinboard-main">
      <min-card v-for="item in 5" :key="item"></min-card>
    </div>
  </section>
</template>

<script>
import card from './card';

  export default {
    name: 'MinPinboard',
    components: {
      'min-card': card
    }
  }
</script>

<style lang="scss">
  .pinboard-container{
    height: auto;
  }
  .pinboard-nav{
    display: flex;
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 0 30px;
    background: #ffffff;
    & &-rank{
      margin-left: auto;
      display: flex;
      align-items: center;
      & li{
        margin-left: 15px;
      }
    }
  }
  .pinboard-main{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
    padding: 0 30px;
    width: 100%;
    height: auto;
  }

</style>

