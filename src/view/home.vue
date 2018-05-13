<template>
  <section class="home-container">
    <min-jumbotron :user="userInfo"></min-jumbotron>
    <min-pinboard></min-pinboard>
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
      userInfo: {}
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
    })
  },
  methods: {
    async getUserHomeData(id){
      const data = await api.getUserhome({ params: { id } } );
      const {data: { data: userInfo } } =data;
      this.userInfo = userInfo;
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.getUserHomeData(id);
  }
}
</script>