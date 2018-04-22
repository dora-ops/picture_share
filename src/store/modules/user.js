const User = {
  state: {
    userToken: null,
    userId: null,
    userName: null,
    userDesc: null,
    userAvatar: null,
    userCoverPic: null,
  },
  getters: {
    isAuth(state){
      return !!state.userToken;
    },
  },
  mutations: {
    LOGIN_IN(state, user){
      state.userToken = user.token;
      state.userId = user.id;
    },
    LOGIN_OUT(state){
      state.userToken = null;
    },
    SET_USERINFO(state, user){
      state.userName = user.userName
      state.userDesc = user.desc;
      state.userAvatar = user.avatar;
      state.userCoverPic = user.coverPic;
    }
  }
}

export default User;