<template lang="pug">
  #app.container
    app-header
    router-view
</template>

<script>
import feather from 'feather-icons';
import AppHeader from './components/app_header';
import router from './config/router'
import store from './config/store';

router.beforeEach((to, from, next) => {
  store.commit('lastPage', from.path);
  next();
});

export default {
  router,
  mounted() {
    feather.replace();
  },
  components: {
    AppHeader
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700');

* {
  font-family: 'Crimson Text', serif;
}

.container {
  margin-top: 20px;
}
</style>
