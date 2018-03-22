import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lastPage: '/',
    backToList: false
  },
  mutations: {
    lastPage(state, newPage) {
      state.lastPage = newPage;
    },
    backToList(state, value) {
      state.backToList = value;
    }
  }
});

export default store;
