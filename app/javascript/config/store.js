import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    last_page: '/',
    back_to_list: false
  },
  mutations: {
    last_page(state, value) {
      state.last_page = value;
    },
    back_to_list(state, value) {
      state.back_to_list = value;
    }
  }
});

export default store;
