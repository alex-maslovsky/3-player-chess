import io from 'socket.io-client';
import config from "./config.json";
import Router from './Router';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import profileService from './services/ProfileService';

io(config.socket.serverUrl);

function getRootContainer(): HTMLElement {
    return document.getElementsByClassName('main-container')[0] as HTMLElement;
}

const router = new Router();

router.hookBefore((done: (suppress?: boolean) => void) => {
    if (router.getCurrentRoute() === '/profile' || profileService.getProfileName()) {
        done();
        return;
    }

    router.navigate('/profile');
    done(false);
});

router.on('/', () => {
    const root = getRootContainer();

    root.innerHTML = '';
    new Home(root);
});

router.on('/profile', () => {
    const root = getRootContainer();

    root.innerHTML = '';
    new Profile(root);
});

router.resolve();
