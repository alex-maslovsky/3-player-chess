import { Server } from 'socket.io';

export default class BaseController {
    constructor(protected server: Server) {
    }
}
