import Vue from 'vue';
import VueRouter from 'vue-router';
import Pages from './constants/pages';
import Home from './components/home/Home';
import Login from './components/Login';
import Lobby from './components/lobby/Lobby';
import { getUsername } from './services/local-storage-service';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: Pages.Home },
    { path: '/login', component: Login, name: Pages.Login },
    { path: '/lobby/:hostUsername?', component: Lobby, name: Pages.Lobby }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== Pages.Login && !getUsername()) {
    next({ name: Pages.Login, query: { backUrl: to.path } });
  } else {
    next();
  }
});

export default router;
