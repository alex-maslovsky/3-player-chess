import io, { Socket } from 'socket.io';

const server = io.listen(process.env.API_PORT || 5000);

server.on('connection', (socket: Socket) => {
    console.log(socket);
});
