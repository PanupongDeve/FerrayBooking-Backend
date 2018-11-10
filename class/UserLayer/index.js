const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const expressSanitizer = require('express-sanitizer');
const methodOverride = require('method-override');

class UserLayer {

    setMiddlewareWebApp(app) {
        //use static folder
        app.use(express.static('public'));
        //config urlencode
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));

        //express Sanitizer ใช้ สำหรับกรอง code เช่น <script></script> ไว้หลัง bodyParser
        app.use(expressSanitizer());

        // USER METHOD OVERRIDE
        app.use(methodOverride('_method'));

        app.use(compression());
        app.set('view engine', 'ejs');
    }
}

module.exports = UserLayer;