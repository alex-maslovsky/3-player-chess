import socket from './socket-service';
import SocketEvents from '../constants/socket-events';

export const login = (username) => {
    socket.emit(SocketEvents.Login, username);

    return new Promise((resolve) => {
        socket.on(SocketEvents.Login, ({ succeeded }) => {
            resolve(succeeded);
            socket.off(SocketEvents.Login);
        });
    });
};
