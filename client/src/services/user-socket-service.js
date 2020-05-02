import socket from './socket-service';
import SocketEvents from '../constants/socket-events';

export const login = (username) => {
    socket.emit(SocketEvents.Login, { username });

    return new Promise((resolve) => {
        socket.on(SocketEvents.Login, ({ token, username }) => {
            resolve({ token, username });
            socket.off(SocketEvents.Login);
        });
    });
};

export const verifyToken = () => {
    socket.authEmit(SocketEvents.VerifyToken);

    return new Promise((resolve) => {
        socket.on(SocketEvents.VerifyToken, ({ username }) => {
            resolve(username);
            socket.off(SocketEvents.VerifyToken);
        });
    });
};
