import io from 'socket.io-client';
import { getToken } from './local-storage-service';

const [ protocol, , domain ] = window.location.href.split('/');
const socket = io(`${protocol}//${domain.split(':')[0]}:5000`);

socket.authEmit = (event, params) => {
    socket.emit(event, Object.assign({ token: getToken() }, params));
};

export default socket;
