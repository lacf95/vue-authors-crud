import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Status from '../util/status_codes';
import Session from '../config/session';
import store from '../config/store';
import App from '../app.vue';

Vue.use(BootstrapVue);

Vue.prototype.$status = Status;

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('app'));
  const app = new Vue({
    el,
    render: h => h(App),
    store
  });
});
