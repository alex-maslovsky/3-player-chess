import socket from './socket-service';
import SocketEvents from '../constants/socket-events';

export const createLobby = (hostUsername) => {
    socket.emit(SocketEvents.CreateLobby, hostUsername);
};

export const onLobbyListUpdates = (onChange) => {
    socket.emit(SocketEvents.GetAllLobbies, null);
    socket.on(SocketEvents.GetAllLobbies, (lobbyList) => {
        onChange(lobbyList);
        socket.off(SocketEvents.GetAllLobbies);
    });

    socket.on(SocketEvents.OnLobbyListUpdates, onChange);
};
