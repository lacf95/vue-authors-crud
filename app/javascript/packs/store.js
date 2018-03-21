import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lastPage: '/'
  },
  mutations: {
    lastPage(state, newPage) {
      state.lastPage = newPage;
    }
  }
});

export default store;
