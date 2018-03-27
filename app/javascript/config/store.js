import Vuex from 'vuex';
import Vue from 'vue';
import Session from './session';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lastPage: null,
    backToList: false,
    user: Session.get()
  },
  mutations: {
    lastPage(state, value) {
      state.lastPage = value;
    },
    backToList(state, value) {
      state.backToList = value;
    },
    user(state, value) {
      state.user = value;
      if (value) {
        Session.signIn(value);
      } else {
        Session.signOut();
      }
    }
  }
});

export default store;
