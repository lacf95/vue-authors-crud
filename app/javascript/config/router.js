import VueRouter from 'vue-router';
import AuthorsList from '../components/authors_list';
import NewAuthor from '../components/new_author';
import ShowAuthor from '../components/show_author';
import EditAuthor from '../components/edit_author';

const router = new VueRouter({
  routes: [
    { path: '/', component: AuthorsList },
    { path: '/new', component: NewAuthor },
    { path: '/show/:id', component: ShowAuthor },
    { path: '/edit/:id', component: EditAuthor }
  ]
});

export default router;
