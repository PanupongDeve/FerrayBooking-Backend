const SecureLayer = require('../class/SecureLayer');
const AuthLayer = require('../class/AuthLayer');
const UserLayer = require('../class/UserLayer');
const secureLayer = new SecureLayer();
const authLayer = new AuthLayer();
const userLayer = new UserLayer();

class SetupMiddleware {
    constructor() {
        this.app = null;
    }

    inCludeApp(app) {
        this.app = app;
    }

    middleware() {
        secureLayer.setMiddlewareWebApp(this.app);
        authLayer.setMiddlewareWebApp(this.app)
        userLayer.setMiddlewareWebApp(this.app);
    }

    mount() {
        console.log('\x1b[31m', 'System:', '\x1b[37m', 'Initial Middleware has been established successfully.');
        this.middleware();
    }
}

module.exports = new SetupMiddleware();