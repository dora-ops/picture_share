const User = {
  state: {
    userToken: null,
    userInfo: null,
  },
  getters: {
    isAuth(state){
      return !!state.userToken;
    }
  },
  mutations: {
    LOGIN_IN(state, user){
      state.userToken = user.userToken;
      state.userInfo = user.userInfo;
    },
    LOGIN_OUT(state){
      state.userToken = null;
      state.userInfo = null;
    }
  }
}

export default User;