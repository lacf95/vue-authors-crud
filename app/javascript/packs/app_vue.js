import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import App from '../app.vue';
import store from '../config/store';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('app'));
  const app = new Vue({
    el,
    render: h => h(App),
    store
  });
});
