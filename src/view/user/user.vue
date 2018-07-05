<template>
  <section class="user-container">
    <min-jumbotron :user="userInfo" :concernText="concernText" @changeConcern="changeConcern"></min-jumbotron>
    <ul class="user-toolbar">
      <router-link tag="li" :to="{name: 'photoType', params: { type: 'all' }}" exact-active-class="user-active">作品</router-link>
      <router-link tag="li" :to="{name: 'photoType', params: { type: 'praise' }}" exact-active-class="user-active">点赞</router-link>
      <router-link tag="li" :to="{name: 'photoType', params: { type: 'collection' }}" exact-active-class="user-active">收藏</router-link>
    </ul> 
    <router-view></router-view>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { state } from '../../config/config.js';
import jumbotron from '../../components/jumbotron';
import { getUserDetail, getUserPhoto, getConcernState, toogleConcernState } from '../../API/user.js';

export default {
  name: 'user',
  components: {
    'min-jumbotron': jumbotron,
  },
  data(){
    return {
      id: null,
      concernState: null,
      userInfo: {},
    }
  },
  watch:{
    '$route'(to, from, next){
      const { id } = to.params;
      this.id = id;
      this.getUserHomeData(id);
    },
    id(val, oldval){
      if(val !== String(this.userId)){
        this.getConcernState(val);
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
    }),
    concernText(){
      return this.concernState === state.scuess ? '已关注' : '关注他';
    },
    photoTotal(){
      return this.photos.length;
    }
  },
  methods: {
    async getUserHomeData(id){
      this.userInfo = await getUserDetail(id);
    },
    async getConcernState(id){
      this.concernState = await getConcernState(this.userId, id);
    },
    async changeConcern(){
      this.concernState = await toogleConcernState(this.userId, this.userInfo.id);
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.id = id;
    this.getUserHomeData(id);
    this.$router.push({ name: 'photoType', params: { type: 'all' } })
  }
}
</script>

<style lang="scss">
  .user-active{
    color: #5db0c6;
    border-bottom: 1px solid #5db0c6;
  }
  .user-toolbar{
    width: 100%;
    background: #ffffff;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    & li {
      padding: 0 15px;
      cursor: pointer;
    }
  }
</style>
