import socket from './socket-service';
import SocketEvents from '../constants/socket-events';

export const createLobby = (hostUsername) => {
    socket.authEmit(SocketEvents.CreateLobby, { hostUsername });

    return new Promise((resolve) => {
        socket.on(SocketEvents.CreateLobby, (lobby) => {
            resolve(lobby);
            socket.off(SocketEvents.CreateLobby);
        });
    });
};

export const onLobbyListUpdates = (onUpdates) => {
    socket.authEmit(SocketEvents.GetAllLobbies, null);
    socket.on(SocketEvents.GetAllLobbies, (lobbyList) => {
        onUpdates(lobbyList);
        socket.off(SocketEvents.GetAllLobbies);
    });

    socket.on(SocketEvents.OnLobbyListUpdates, onUpdates);
};

export const joinToLobby = (hostUsername, username) => {
    socket.authEmit(SocketEvents.JoinToLobby, { hostUsername, username });

    return new Promise((resolve) => {
        socket.on(SocketEvents.JoinToLobby, (lobby) => {
            resolve(lobby);
            socket.off(SocketEvents.JoinToLobby);
        });
    });
};

export const onLobbyUpdates = (hostUsername, onUpdates) => {
    socket.on(SocketEvents.OnLobbyUpdates, (lobby) => {
        if (lobby.hostUsername === hostUsername) {
            onUpdates(lobby);
        }
    });
};

export const onLobbyClosed = (hostUsername, onClosed) => {
    socket.on(SocketEvents.OnLobbyClosed, (lobby) => {
        if (lobby.hostUsername === hostUsername) {
            onClosed(lobby);
        }
    });
};

export const leave = () => {
    socket.authEmit(SocketEvents.LeaveLobby);
};

export const close = () => {
    socket.authEmit(SocketEvents.CloseLobby);
};
