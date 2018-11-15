
const HomeController = require('./HomeController');
const PaymentController = require('./PaymentController');

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
        this.app.use('/payments', PaymentController(this.io));
    }
}


module.exports = new MysqlController();
