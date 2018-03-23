<template lang="pug">
  #app.container
    .row
      .col-md-12
          h1.display-4.text-center
            router-link.text-dark(to='/')
              i(data-feather='book-open')
              | Authors
    router-view
</template>

<script>
import feather from 'feather-icons';
import router from './config/router'
import store from './config/store';

router.beforeEach((to, from, next) => {
  store.commit('last_page', from.path);
  next();
});

export default {
  router,
  mounted() {
    feather.replace();
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

h1 {
  border-bottom: 2px solid #dc3545;
  margin-bottom: 30px;
}

svg {
  width: 34px;
  height: 34px;
  stroke: #dc3545;
  margin-right: 6px;
}
</style>
