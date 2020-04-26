import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import LobbyRepository from '../repositories/lobby-repository';

const lobbyRepository = new LobbyRepository();

export default (socket: Socket): void => {
    socket.on(ControllerEvents.CreateLobby, (hostUsername: string) => {
        const createdLobby = lobbyRepository.insert({ hostUsername, members: [ hostUsername ] });

        socket.emit(ControllerEvents.CreateLobby, createdLobby);
        socket.server.emit(ControllerEvents.OnLobbyListUpdates, lobbyRepository.getLobbyHostUsernames());
    });

    socket.on(ControllerEvents.GetAllLobbies, () => {
        socket.emit(ControllerEvents.GetAllLobbies, lobbyRepository.getLobbyHostUsernames());
    });

    socket.on(ControllerEvents.JoinToLobby, (hostUsername: string, username: string) => {
        const lobby = lobbyRepository.findLobbyByHostUsername(hostUsername);

        if (!lobby || lobby.members.includes(username)) {
            socket.emit(ControllerEvents.JoinToLobby, null);
        } else {
            lobby.members.push(username);
            lobbyRepository.update(lobby);

            socket.emit(ControllerEvents.JoinToLobby, lobby);

            socket.server.emit(ControllerEvents.OnLobbyUpdates, lobby);
        }
    });
}