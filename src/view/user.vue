<template>
  <section class="user-container">
    <min-jumbotron :user="userInfo"></min-jumbotron>
    <min-pinboard :photoData="photos"></min-pinboard>
  </section>
</template>

<script>
import jumbotron from '../components/jumbotron';
import pinboard from '../components/pinboard';
import api from '../plugin/axios';
import { mapState } from 'vuex';

export default {
  name: 'user',
  components: {
    'min-jumbotron': jumbotron,
    'min-pinboard': pinboard
  },
  data(){
    return {
      userInfo: {},
      photos: []
    }
  },
  watch:{
    '$route'(to, from, next){
      const { id } = to.params;
      this.getUserHomeData(id);
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
    })
  },
  methods: {
    async getUserHomeData(id){
      const data = await api.getUserhome( { params: { id } } );
      const photoData = await api.getUserPhoto( {params: { id } } );
      const { data: { data: userData } } = data;
      const { data: { data: photos } } = photoData;
      this.userInfo = userData;
      this.photos = photos;
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.getUserHomeData(id);
  }
}
</script>