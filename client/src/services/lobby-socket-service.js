import socket from './socket-service';
import SocketEvents from '../constants/socket-events';

export const createLobby = (hostUsername) => {
    socket.emit(SocketEvents.CreateLobby, hostUsername);

    return new Promise((resolve) => {
        socket.on(SocketEvents.CreateLobby, (lobby) => {
            resolve(lobby);
            socket.off(SocketEvents.CreateLobby);
        });
    });
};

export const onLobbyListUpdates = (onUpdates) => {
    socket.emit(SocketEvents.GetAllLobbies, null);
    socket.on(SocketEvents.GetAllLobbies, (lobbyList) => {
        onUpdates(lobbyList);
        socket.off(SocketEvents.GetAllLobbies);
    });

    socket.on(SocketEvents.OnLobbyListUpdates, onUpdates);
};

export const joinToLobby = (hostUsername, username) => {
    socket.emit(SocketEvents.JoinToLobby, hostUsername, username);

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
