import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import LobbyRepository from '../repositories/lobby-repository';

const lobbyRepository = new LobbyRepository();

export default (socket: Socket): void => {
    socket.on(ControllerEvents.CreateLobby, (hostUsername) => {
        lobbyRepository.insert({ hostUsername });

        socket.server.emit(ControllerEvents.OnLobbyListUpdates, lobbyRepository.getLobbyHostUsernames());
    });

    socket.on(ControllerEvents.GetAllLobbies, () => {
        socket.emit(ControllerEvents.GetAllLobbies, lobbyRepository.getLobbyHostUsernames());
    });
}