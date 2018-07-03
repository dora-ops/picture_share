import { getCountMessage } from '../../API/message';

const User = {
  state: {
    userToken: null,
    userId: null,
    userName: null,
    userAvatar: null,
    userMessage: []
  },
  getters: {
    isAuth(state){
      return !!state.userToken;
    },
    messageTotal(state){
      let total = 0;
      state.userMessage.forEach((message)=>{
        total += message.messageCount;
      })
      return total;
    }
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
      state.userName = user.userNickName;
      state.userAvatar = user.userAvatar;
    },
    SET_MESSAGES(state, userMessage){
      state.userMessage = userMessage;
    }
  },
  actions: {
    async GET_COUNT_LIST(context){
      let userMessage = await getCountMessage(context.state.userId);
      context.commit('SET_MESSAGES', userMessage);
    }
  }
}

export default User;