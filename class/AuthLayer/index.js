const bcrypt = require('bcrypt');

const Response = require('../Response/Response');

const saltRounds = 10;

class AuthLayer {
    constructor() {
        this.Response = new Response();
        this.isAuthRoutes = this.isAuthRoutes.bind(this);
        this.isPrivateRoutes = this.isPrivateRoutes.bind(this);
    }

    setMiddlewareWebApp(app) {
        app.use(this.checkAuth);
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    verifyPassword(password, passwordHash) {
        if(!bcrypt.compareSync(password, passwordHash)) {
            throw "รหัสผ่านไม่ถูกต้อง";
        }
    }

    async checkUsername(userModel, username) {
        try {
            const user = await userModel.findOne({  where: {username} })
            if(user) return true;
        } catch (error) {
            throw error;
        }
    }

    async checkAuth(req, res, next) {
        if(req.session && req.session.user) {
            res.locals.user = req.session.user;
        } else {
            res.locals.user = false;
        }
        
        next();
    }

    checkPasswordConfirm (body) {
        return body.passwordConfirm !== body.password;   
    }

    async isPrivateRoutes (req, res, next)  {
        if(!req.session.user) {
            await this.Response.redirect(res, 'login')
        } else {
            next();
        }   
    }

    async isAuthRoutes (req, res, next)  {
        if(req.session.user) {
            await this.Response.redirect(res, 'dashboard')
        } else {
            next();
        }   
    }
}

module.exports = AuthLayer;