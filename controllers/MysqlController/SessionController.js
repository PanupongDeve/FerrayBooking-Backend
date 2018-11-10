const express = require('express');
const router = express.Router();
const BaseController = require('./BaseController');
const modelPromise = require('../../database/mysqlDB').model;
const AuthLayer = require('../../class/AuthLayer');

const authLayer = new AuthLayer();

class SessionController extends BaseController {
    constructor(io) {
        super(io)
        this.router = router;
        this.router.get('/dashboard', authLayer.isPrivateRoutes, this.dashboard.bind(this));
        this.router.get('/login', authLayer.isAuthRoutes, this.loginForm.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.get('/register', authLayer.isAuthRoutes, this.registerForm.bind(this));
        this.router.post('/register', this.register.bind(this));
        this.router.get('/logout', this.logout.bind(this));
    }

    async dashboard(req, res) {
        await this.Response.render(res, 'sessions/dashboard');      
    }

    async loginForm(req ,res) {
        const errorMessage = req.session.errorLogin;
        req.session.errorLogin = null;
        await this.Response.render(res, 'sessions/loginForm', {errorMessage});      
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const model = await Promise.resolve(modelPromise);
            const user = await model.user.findOne({  where: {username} })
            if(!user) {
                throw 'ไม่พบผู้ใช้'
            }
            authLayer.verifyPassword(password, user.passwordHash);
            req.session.user = user;
            await this.Response.redirect(res, '/sessions/dashboard');
        } catch (error) {
            console.log(error);
            req.session.errorLogin = this.HandleMessageError.set(error);
            await this.Response.redirect(res, '/sessions/login');
        }    
    }

    async registerForm(req, res) {
        const errorMessage = req.session.errorRegister;
        req.session.errorRegister = null;
        await this.Response.render(res, 'sessions/registerForm', {errorMessage});
    }

    async register(req, res) {
        try { 
            const model = await Promise.resolve(modelPromise);  
            const { username, password } = req.body;
            if(authLayer.checkPasswordConfirm(req.body)) {        
                throw "รหัสผ่านไม่ตรงกัน"
            } else if(await authLayer.checkUsername(model.user, username))  {
                throw "มีชื่อผู้ใช้นี้อยู่แล้ว"
            } else {
                const passwordHash = authLayer.hashPassword(password);
                const user = {
                    username,
                    passwordHash,
                    role: 'User'
                }
                await model.user.create(user);
                req.session.user = user;
                await this.Response.redirect(res, '/sessions/dashboard');
            }
        } catch (error) {
            console.log(error);
            req.session.errorRegister= this.HandleMessageError.set(error);
            await this.Response.redirect(res, '/sessions/register');
        }    
    }

    async logout(req, res) {
        req.session.user = null;
        await this.Response.redirect(res, '/sessions/login');
    }
   
}

module.exports = (io) => new SessionController(io).router;