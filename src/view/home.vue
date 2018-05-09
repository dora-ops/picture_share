<template>
  <section class="home-container">
    <min-jumbotron :user="userInfo"></min-jumbotron>
    <min-pinboard></min-pinboard>
  </section>
</template>

<script>
import jumbotron from '../components/jumbotron';
import pinboard from '../components/pinboard';
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
      userName: state => state.user.userName,
      userAvatar: state => state.user.userAvatar
    })
  },
  methods: {
    async getUserHomeData(id){
      const data = await api.getUserhome({ id });
      const { data: { data: { userName, userInfo } } } = data;
      this.userInfo = userInfo;
      this.$store.commit('SET_USERINFO', { userName, avatar: userInfo.avatar});
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.getUserHomeData(id);
  }
}
</script>