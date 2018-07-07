<template>
  <section class="photoType-main">
    <div v-if="photoList.length === 0" class="photoType-noData">
      <p>快去添加图片吧</p>
    </div>
    <min-card v-for="photo in photoList" :key=" photo.id" :photo="photo"></min-card>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import card from '../../../components/card';
  import { actionType } from '../../../config/config.js';
  import { getUserPhotoFromType } from '../../../API/user.js';

  export default {
    name: 'photoType',
    data(){
      return {
        photoList: []
      }
    },
    components: {
      'min-card': card
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId
      }),
    },
    watch: {
      '$route'(to, from, next){
        const { params: { type, id} } = to;
        this.getUserPhotoFromType(id, actionType[type].state);
      }
    },
    methods: {
      async getUserPhotoFromType(id, type){
        this.photoList = await getUserPhotoFromType(id, type)
      }
    },
    created(){
      const { params: { type, id } } = this.$route;
      this.getUserPhotoFromType(id, actionType[type].state);

    }

  }
</script>

<style>
  .photoType-main{
    width: 1300px;
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(4, 300px);
    grid-template-rows: repeat(auto-fill, 200px);
    grid-gap: 15px;
    justify-content: center;
  }
  .photoType-noData{
    width: 1200px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
</style>
