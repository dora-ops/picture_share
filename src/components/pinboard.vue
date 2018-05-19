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
      <min-card v-for="pinboard in pinboards" :key="pinboard.id" :pinboard="pinboard" class="pinboard-card"></min-card>
    </div>
  </section>
</template>

<script>
import card from './card';

  export default {
    name: 'MinPinboard',
    props: {
      pinboards: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
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
    flex-wrap: wrap;
    max-width: 1290px;
    padding: 0 15px;
    height: auto;
    margin: 30px auto 0;
  }
  .pinboard-card{
    margin-right: 20px;
  }
  .pinboard-card:nth-of-type(4n){
    margin-right: 0;
  }
</style>

