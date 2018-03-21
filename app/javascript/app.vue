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

import AuthorsList from 'authors_list';
import NewAuthor from 'new_author';
import ShowAuthor from 'show_author';
import EditAuthor from 'edit_author';
import VueRouter from 'vue-router';
import store from 'packs/store';

const router = new VueRouter({
  routes: [
    { path: '/', component: AuthorsList },
    { path: '/new', component: NewAuthor },
    { path: '/show/:id', component: ShowAuthor },
    { path: '/edit/:id', component: EditAuthor }
  ]
});

router.beforeEach((to, from, next) => {
  store.commit('lastPage', from.path);
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
