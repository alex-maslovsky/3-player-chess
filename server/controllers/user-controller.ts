import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import UserRepository from '../repositories/user-repository';
import LobbyRepository from '../repositories/lobby-repository';

const userRepository = new UserRepository();
const lobbyRepository = new LobbyRepository();

export default (socket: Socket): void => {
    socket.on(ControllerEvents.Login, (username: string) => {
        const user = userRepository.findByUsername(username);

        if (!user) {
            userRepository.insert({ socketId: socket.id, username });
        }

        socket.emit(ControllerEvents.Login, { succeeded: !user });
    });

    socket.on(ControllerEvents.Disconnect, () => {
        const deletedUser = userRepository.deleteBySocketId(socket.id);

        if (deletedUser) {
            const deletedLobby = lobbyRepository.deleteByHostUsername(deletedUser.username);

            if (deletedLobby) {
                socket.server.emit(ControllerEvents.OnLobbyListUpdates, lobbyRepository.getLobbyHostUsernames());
            }
        }
    });
}
