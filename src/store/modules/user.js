import api from '../../plugin/axios';
import { stat } from 'fs';

const User = {
  state: {
    userToken: null,
    userId: null,
    userName: null,
    userAvatar: null,
    userMessage: 0
  },
  getters: {
    isAuth(state){
      return !!state.userToken;
    },
    messageTotal(state){
      if(state.userMessage === 0){
        return false
      }else if(state.userMessage >= 99){
        return '99+'
      }else{
        return state.userMessage;
      }
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
      state.userName = user.userName;
      state.userAvatar = user.userAvatar;
    },
    SET_MESSAGES(state, messageTotal){
      state.userMessage = messageTotal;
    }
  },
  actions: {
    async GET_COUNT_LIST(context){
      const data = await api.getCountList({ params: { id: context.state.userId }});
      const { data: { data: countList } } = data;
      const messageTotals = countList.map((count) => count.messageTotal);
      if(countList.length === 0){
        let messageTotal = 0;
        context.commit('SET_MESSAGES', messageTotal);
        return;
      }
      const messageTotal = messageTotals.reduce((a, b) => a + b);
      context.commit('SET_MESSAGES', messageTotal);
    }
  }
}

export default User;