<template>
  <section class="user-container">
    <min-jumbotron :user="userInfo" :concernText="concernText" @changeConcern="changeConcern"></min-jumbotron>
    <min-pinboard :photoData="photos"></min-pinboard>
  </section>
</template>

<script>
import jumbotron from '../../components/jumbotron';
import pinboard from '../../components/pinboard';
import api from '../../plugin/axios';
import { mapState } from 'vuex';
const state = {
  scuess: '1',
  error: '0'
}

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
      const data = await api.getUserhome( { params: { id } } );
      const photoData = await api.getUserPhoto( {params: { id } } );
      const { data: { data: userData } } = data;
      const { data: { data: photos } } = photoData;
      this.userInfo = userData;
      this.photos = photos;
      if(this.id !== this.userId){
        const concernData= await api.getConcernState({ 
          params: { concernFromId: this.userId, userId: id }
        })
        const { data: { data: concernState } } = concernData;
        this.concernState = concernState;
      }
    },
    async changeConcern(){
      const stateData = await api.postConcernState({
        data: {concernFromId: this.userId, userId: this.userInfo.id}
      })
      const { data: { data: concernState } } = stateData;
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