<template>
  <section class="user-container">
    <min-jumbotron :user="userInfo" :concernText="concernText" @changeConcern="changeConcern"></min-jumbotron>
    <min-pinboard :photoData="photos"></min-pinboard>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { state } from '../../config/config.js';
import pinboard from '../../components/pinboard';
import jumbotron from '../../components/jumbotron';
import { getUserDetail, getUserPhoto, getConcernState, toogleConcernState } from '../../API/user.js';

export default {
  name: 'user',
  components: {
    'min-jumbotron': jumbotron,
    'min-pinboard': pinboard
  },
  data(){
    return {
      id: null,
      concernState: null,
      userInfo: {},
      photos: []
    }
  },
  watch:{
    '$route'(to, from, next){
      const { id } = to.params;
      this.id = id;
      this.getUserHomeData(id);
    },
    id(val, oldval){
      if(val !== oldval){
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
    }
  },
  methods: {
    async getUserHomeData(id){
      const photos = await getUserPhoto(id);
      const userData = await getUserDetail(id);
      this.userInfo = userData;
      this.photos = photos;
    },
    async getConcernState(id){
      const concernState = await getConcernState(this.userId, id);
      this.concernState = concernState;
    },
    async changeConcern(){
      const concernState = await toogleConcernState(this.userId, this.userInfo.id);
      this.concernState =concernState;
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.id = id;
    this.getUserHomeData(id);
  }
}
</script>