const User = {
  state: {
    userToken: null,
    userId: null,
    userName: null,
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
      state.userName = user.userName;
    },
    LOGIN_OUT(state){
      state.userToken = null;
    },
  }
}

export default User;