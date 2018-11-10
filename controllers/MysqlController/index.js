
const HomeController = require('./HomeController');

class MysqlController {
    constructor() {
        this.app = null;
        this.io = null;
    }

    inCludeApp(app, io) {
        this.app = app;
        this.io = io;
    }

    mount() {
        console.log('\x1b[31m', 'System:', '\x1b[37m', 'Initial Controller has been established successfully.');
        this.app.use('/', HomeController(this.io));
    }
}


module.exports = new MysqlController();
