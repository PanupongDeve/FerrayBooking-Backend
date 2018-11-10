const OwnersSocket = require('./OwnersSocket');

class SocketServer {
    constructor(io) {
        this.io = io;
    }


    mount() {
        console.log('\x1b[31m', 'System:', '\x1b[37m', 'Initial SocketServer has been established successfully.');
        this.io.on('connection', this.socketRouter.bind(this));
    }

    socketRouter(socket) {
        // OwnersSocket.setUp(this.io, socket, 'owners').start();
    }
}


module.exports = SocketServer;
