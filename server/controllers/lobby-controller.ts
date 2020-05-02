import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import LobbyRepository from '../repositories/lobby-repository';
import auth, { IAuthParams } from '../middlewares/auth-middleware';
import { removeUserFromLobby } from './user-controller';

const lobbyRepository = new LobbyRepository();

export interface ICreateLobbyParams extends IAuthParams {
    hostUsername: string;
}

export interface IJoinToLobbyParams extends IAuthParams {
    hostUsername: string;
    username: string;
}

export default (socket: Socket): void => {
    socket.on(ControllerEvents.CreateLobby, auth((params: ICreateLobbyParams) => {
        const createdLobby = lobbyRepository.insert({
            hostUsername: params.hostUsername,
            members: [{
                socketId: socket.id,
                username: params.hostUsername,
            }],
        });

        socket.emit(ControllerEvents.CreateLobby, createdLobby);
        socket.server.emit(ControllerEvents.OnLobbyListUpdates, lobbyRepository.getLobbyHostUsernames());
    }));

    socket.on(ControllerEvents.GetAllLobbies, auth(() => {
        socket.emit(ControllerEvents.GetAllLobbies, lobbyRepository.getLobbyHostUsernames());
    }));

    socket.on(ControllerEvents.JoinToLobby, auth((params: IJoinToLobbyParams) => {
        const lobby = lobbyRepository.findLobbyByHostUsername(params.hostUsername);

        if (!lobby || lobby.members.find((member) => member.username === params.username)) {
            socket.emit(ControllerEvents.JoinToLobby, null);
        } else {
            lobby.members.push({ socketId: socket.id, username: params.username });
            lobbyRepository.update(lobby);

            socket.emit(ControllerEvents.JoinToLobby, lobby);

            socket.server.emit(ControllerEvents.OnLobbyUpdates, lobby);
        }
    }));

    socket.on(ControllerEvents.LeaveLobby, auth(() => {
        removeUserFromLobby(socket);
    }));

    socket.on(ControllerEvents.CloseLobby, auth((_, tokenData) => {
        const deletedLobby = lobbyRepository.deleteByHostUsername(tokenData.username);

        if (deletedLobby) {
            socket.server.emit(ControllerEvents.OnLobbyListUpdates, lobbyRepository.getLobbyHostUsernames());
            socket.server.emit(ControllerEvents.OnLobbyClosed, deletedLobby);
        }
    }));
}