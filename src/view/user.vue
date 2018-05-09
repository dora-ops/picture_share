<template>
  <mi-grid :cols="['1fr']" :rows="['auto']" justifyContent="center">
    <min-jumbotron :user="userInfo"></min-jumbotron>
    <min-pinboard></min-pinboard>
    <router-view></router-view>
  </mi-grid> 
</template>

<script>
import { mapState } from 'vuex';
import api from '../plugin/axios';
import jumbotron from '../components/jumbotron';
import pinboard from '../components/pinboard';

export default {
  name: 'user',
  components: {
    'min-jumbotron': jumbotron,
    'min-pinboard': pinboard
  },
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      userName: state => state.user.userName,
      userAvatar: state => state.user.userAvatar,
    }),
  },
  watch: {
    '$route'(to, from, next){
      const { params: { id } } = to;
      this.getUserHomeData(id);
    }
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
};
</script>

<style lang="scss">
.user-info {
  position: relative;
  margin-top: 70px;
  background: #ffffff;
  margin-bottom: 20px;
}
.user-coverImage {
  position: relative;
  border-radius: 8px 8px 0px 0px;
  background: #999999;
  height: 132px;
  transition: 0.3s ease-in-out;
  & .user-upload {
    position: absolute;
    top: 25px;
    right: 15px;
    z-index: 5;
    & .btn {
      border-color: #ffffff;
      color: #ffffff;
    }
  }
  & .user-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.user-edit {
  border: 1px solid #ffffff;
  color: #d3d3d3;
  position: absolute;
  right: 15px;
}
.user-wrapper {
  position: relative;
}
.user-avatar {
  position: absolute;
  top: -70%;
  left: 15px;
  width: 160px;
  height: 160px;
  border: 4px solid #ffffff;
  border-radius: 8px;
  background: #ffffff;
  &:hover {
    .user-avatar--upload {
      display: block;
    }
  }
  & img {
    width: 100%;
    height: 100%;
  }
  &--upload {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &--mask {
    position: absolute;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    background: #1a1a1a;
    opacity: 0.4;
  }
  &--content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    text-align: center;
    z-index: 5;
  }
}
.user-content {
  line-height: 32px;
  margin-left: 200px;
  padding: 15px;
  &--left {
    float: left;
    & .user-heart {
      color: #e64c65;
    }
  }
  &--right {
    float: right;
    display: block;
    & .user-circles {
      display: block;
      & li {
        display: inline-block;
        margin-left: 5px;
      }
    }
    & .user-profill {
      border-color: #239fdb;
      color: #239fdb;
      margin-left: 5px;
      margin-top: 15px;
    }
  }
}
.user-edit-avatar {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  & img {
    width: 100%;
    height: 200px;
    object-fit: fill;
  }
}
.user-edit-footer {
  width: 80%;
  line-height: 50px;
  margin: 0 auto;
  padding: 15px 0;
  & .btn {
    width: 60%;
    border-color: #239fdb;
    color: #239fdb;
  }
}
</style>

