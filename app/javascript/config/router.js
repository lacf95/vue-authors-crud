import VueRouter from 'vue-router';

import UserAuth from '../components/users/auth';

import AuthorsIndex from '../components/authors/index';
import AuthorsNew from '../components/authors/new';
import AuthorsShow from '../components/authors/show';
import AuthorsEdit from '../components/authors/edit';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: AuthorsIndex },
    { path: '/sign-in', component: UserAuth },
    { path: '/new', component: AuthorsNew },
    { path: '/show/:id', component: AuthorsShow },
    { path: '/edit/:id', component: AuthorsEdit }
  ]
});

export default router;
