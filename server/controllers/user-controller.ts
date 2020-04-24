import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import UserRepository from '../repositories/user-repository';

const userRepository = new UserRepository();

export default (socket: Socket): void => {
    socket.on(ControllerEvents.Login, (username: string) => {
        const user = userRepository.findByUsername(username);

        if (!user) {
            userRepository.insert({ socketId: socket.id, username });
        }

        socket.emit(ControllerEvents.Login, { succeeded: !user });
    });

    socket.on(ControllerEvents.Disconnect, () => {
        userRepository.deleteBySocketId(socket.id);
    });
}
