<template>
  <div class="photolist-main">
    <ul class="photolist-list">
      <min-card class="photolist-item" v-for="photo in photoArray" :key="photo.id" :photo="photo"></min-card>
    </ul>
  </div>
</template>

<script>
  import api from '../../../plugin/axios.js';
  import card from '../../../components/card';
  
  export default {
    name: 'photoList',
    components: {
      'min-card': card
    },
    data(){
      return {
        photoArray: [],
      }
    },
    methods: {
      async getPhoto(id){
        const photoData = await api.getUserPhoto({ params: { id }});
        const {data: { data: photoArray }} = photoData;
        this.photoArray = photoArray;
      },
    },
    created(){
      const { params: { id } } = this.$route;
      this.getPhoto(id);
    }
  }
</script>

<style lang="scss">
  .photolist-main{
    width: 100%;
    height: auto;
  }
  .photolist-list{
    display: flex;
    height: auto;
    flex-wrap: wrap;
  }
  .photolist-item{
    margin-right: 35px;
    &:nth-of-type(3n){
      margin-right: 0;
    }
    
  }
</style>
