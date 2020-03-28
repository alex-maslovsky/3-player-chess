import io from 'socket.io-client';
import config from "./config.json";
import Router, { Params } from './Router';
import Home from './src/components/Home';

io(config.socket.serverUrl);

function getRootContainer(): HTMLElement {
    return document.getElementsByClassName('main-container')[0] as HTMLElement;
}

const router = new Router();

router.on('', (params: Params, query: string) => {
    const root = getRootContainer();

    root.innerHTML = '';
    new Home(root);
});

router.resolve();
