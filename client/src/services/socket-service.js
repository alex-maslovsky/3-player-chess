import io from 'socket.io-client';

const [ protocol, , domain ] = window.location.href.split('/');
const socket = io(`${protocol}//${domain.split(':')[0]}:5000`);

export default socket;
