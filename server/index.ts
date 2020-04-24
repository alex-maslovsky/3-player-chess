import io, { Socket } from 'socket.io';
import ControllerEvents from './constants/controller-events';
import userController from './controllers/user-controller';

const server = io.listen(process.env.API_PORT || 5000);

server.on(ControllerEvents.Connection, (socket: Socket) => {
    userController(socket);
});
