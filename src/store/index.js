import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    'user': User,
  },
  state: {
    dialogVisible: false
  },
  mutations: {
    TOOGLE_DIALOG(state, visible){
      state.dialogVisible = visible;
    }
  }
})

export default store;