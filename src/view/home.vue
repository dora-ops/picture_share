<template>
  <section class="home-container">
    <min-jumbotron :user="userInfo"></min-jumbotron>
    <min-pinboard :pinboards="pinboards"></min-pinboard>
  </section>
</template>

<script>
import jumbotron from '../components/jumbotron';
import pinboard from '../components/pinboard';
import api from '../plugin/axios';
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    'min-jumbotron': jumbotron,
    'min-pinboard': pinboard
  },
  data(){
    return {
      userInfo: {},
      pinboards: []
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
      const { data: { data: userData } } = data;
      this.userInfo = userData;
      //this.pinboards = photoData;
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.getUserHomeData(id);
  }
}
</script>