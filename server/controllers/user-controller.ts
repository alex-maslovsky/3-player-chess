import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import UserRepository from '../repositories/user-repository';
import LobbyRepository from '../repositories/lobby-repository';
import { IAuthParams } from '../middlewares/auth-middleware';
import * as jwtService from '../services/jwt-service';

const userRepository = new UserRepository();
const lobbyRepository = new LobbyRepository();

export interface ILoginParams {
    username: string;
}

export function removeUserFromLobby(socket: Socket): void {
    const lobby = lobbyRepository.findBySocketId(socket.id);

    if (lobby) {
        lobby.members = lobby.members.filter((member) => member.socketId !== socket.id);
        socket.server.emit(ControllerEvents.OnLobbyUpdates, lobbyRepository.update(lobby));
    }
}

export default (socket: Socket): void => {
    socket.on(ControllerEvents.Login, (params: ILoginParams) => {
        let user = userRepository.findByUsername(params.username);
        let token: string = null;

        if (!user) {
            user = userRepository.insert({ socketIds: [socket.id], username: params.username });
            token = jwtService.generate({ username: params.username });
        }

        socket.emit(ControllerEvents.Login, { username: user.username, token });
    });

    socket.on(ControllerEvents.VerifyToken, (params: IAuthParams) => {
        const tokenData = jwtService.verify<{ username: string }>(params.token);

        if (tokenData) {
            const user = userRepository.findByUsername(tokenData.username);

            if (user) {
                user.socketIds.push(socket.id);
                userRepository.update(user);
                socket.emit(ControllerEvents.VerifyToken, {
                    username: tokenData?.username,
                });

                return;
            }
        }

        socket.emit(ControllerEvents.VerifyToken, {
            username: null,
        });
    });

    socket.on(ControllerEvents.Disconnect, () => {
        const user = userRepository.findBySocketId(socket.id);

        if (user) {
            const deletedLobby = lobbyRepository.deleteByHostUsername(user.username);

            removeUserFromLobby(socket);

            if (deletedLobby) {
                socket.server.emit(ControllerEvents.OnLobbyListUpdates, lobbyRepository.getLobbyHostUsernames());
                socket.server.emit(ControllerEvents.OnLobbyClosed, deletedLobby);
            }
        }
    });
}
