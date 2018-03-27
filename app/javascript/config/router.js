import VueRouter from 'vue-router';
import store from './store';

import UserAuth from '../components/users/auth';
import AuthorsIndex from '../components/authors/index';
import AuthorsNew from '../components/authors/new';
import AuthorsShow from '../components/authors/show';
import AuthorsEdit from '../components/authors/edit';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: AuthorsIndex },
    { name: 'signIn', path: '/sign-in', component: UserAuth },
    { name: 'authorsNew', path: '/new', component: AuthorsNew },
    { name: 'authorsShow', path: '/show/:id', component: AuthorsShow },
    { name: 'authorsEdit', path: '/edit/:id', component: AuthorsEdit }
  ]
});


router.beforeEach((to, from, next) => {
  const lastPage = {
    name: from.name,
    params: from.params
  };
  if (!lastPage.name) {
    lastPage.name = to.name;
    lastPage.params = to.params;
  }
  store.commit('lastPage', lastPage);
  next();
});

export default router;
