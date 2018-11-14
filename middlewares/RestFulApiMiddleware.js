const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

class SetupMiddleware {
    constructor() {
        this.app = null;
    }

    inCludeApp(app) {
        this.app = app;
    }

    middleware() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 400 }
          }));
        this.app.use(morgan('common', {
            stream: fs.createWriteStream(path.join(__dirname, `access.log`), {flags: 'a'})
          }))
        this.app.use(session({ 
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true, 
            cookie: { maxAge: expiryDate }
        }));
        this.app.use(cookieParser());
        
        //use static folder
        this.app.use(express.static('public'));
        //config urlencode
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));

        this.app.use(compression());
    }

    mount() {
        console.log('\x1b[31m', 'System:', '\x1b[37m', 'Initial Middleware has been established successfully.');
        this.middleware();
    }
}

module.exports = new SetupMiddleware();