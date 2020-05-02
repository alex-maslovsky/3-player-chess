import io, { Socket } from 'socket.io';
import config from './config';
import ControllerEvents from './constants/controller-events';
import userController from './controllers/user-controller';
import lobbyController from './controllers/lobby-controller';

const server = io.listen(config.apiPort);

server.on(ControllerEvents.Connection, (socket: Socket) => {
    userController(socket);
    lobbyController(socket);
});
