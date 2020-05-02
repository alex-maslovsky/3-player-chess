import Vue from 'vue';
import VueRouter from 'vue-router';
import Pages from './constants/pages';
import Home from './components/home/Home';
import Login from './components/Login';
import Lobby from './components/lobby/Lobby';
import { getToken, deleteToken } from './services/local-storage-service';
import { verifyToken } from './services/user-socket-service';
import userStore from './stores/user-store';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: Pages.Home },
        { path: '/login', component: Login, name: Pages.Login },
        { path: '/lobby/:hostUsername?', component: Lobby, name: Pages.Lobby }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.name !== Pages.Login && !getToken()) {
        next({ name: Pages.Login, query: { backUrl: to.path } });
    } else {
        if (!from.name && getToken()) {
            const username = await verifyToken();

            if (username) {
                userStore.username = username;
            } else {
                deleteToken();

                if (to.name !== Pages.Login) {
                    next({ name: Pages.Login, query: { backUrl: to.path } });
                }

                return;
            }
        }

        next();
    }
});

export default router;
