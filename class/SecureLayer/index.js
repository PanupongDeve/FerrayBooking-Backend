const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

class SecureLayer {

    setMiddlewareWebApp(app) {
        app.use(helmet());
        app.disable('x-powered-by')
        app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 400 }
        }));
        app.use(morgan('common', {
            stream: fs.createWriteStream(path.join(__dirname, 'log',`access.log`), {flags: 'a'})
        }));

        app.use(session({ 
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true, 
            cookie: { maxAge: expiryDate }
        }));
        app.use(cookieParser());
    }
}

module.exports = SecureLayer;