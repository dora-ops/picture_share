<template>
  <section class="pinboard-container">
    <div class="pinboard-nav">
      <ul class="pinboard-nav-rank">
        <li>作品</li>
        <li>收藏</li>
        <li>喜欢</li>
      </ul>
    </div>
    <div class="pinboard-main">
      <min-card v-for="photo in photoData" :key="photo.id" :photo="photo" class="pinboard-card"  ></min-card>
    </div>
  </section>
</template>

<script>
import card from './card';

  export default {
    name: 'MinPinboard',
    props: {
      photoData: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    components: {
      'min-card': card
    },
    methods: {
      routeImageView(id){
        console.log(id);
        this.$router.push({name: 'imageView', params: { id }});
      }
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
      margin-right: auto;
      display: flex;
      align-items: center;
      & li{
        margin-left: 15px;
        cursor: pointer;
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

