const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const RestFulApiMiddleware = require('./middlewares/RestFulApiMiddleware');
const mysqlDB = require('./database/mysqlDB');
const MysqlController = require('./controllers/MysqlController');
const SocketServer = require('./socketServer');


module.exports = class App {
    constructor(port) {
        this.http = http;
        this.app = app
        this.io = io
        this.port = process.env.PORT || port;
    }

    async mountDatabase() {
        await mysqlDB.mount();
    }

    mountMiddleware() {
        RestFulApiMiddleware.inCludeApp(this.app);
        RestFulApiMiddleware.mount();
    }

    mountSocketServer() {
        const socketServer = new SocketServer(this.io);
        socketServer.mount();
    }

    mountController() {
        MysqlController.inCludeApp(this.app, this.io);
        MysqlController.mount();
    }


    async start() {
        await this.mountMiddleware();
        await this.mountDatabase();
        await this.mountSocketServer();
        await this.mountController();
        this.http.listen(this.port, () => {
            console.log('\x1b[31m', 'System:', '\x1b[37m', `Server Start on port \x1b[32m${this.port}\x1b[37m`)
        })
    }
}