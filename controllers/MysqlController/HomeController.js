const express = require('express')
const router = express.Router()
const BaseController = require('./BaseController');
const enumTypes = require('../../enum');
const Middlewares = require('../../middlewares');
const UserDTO = require('../../class/dto/UserDTO');
const FileManager = require('../../class/FileManager');
const AuthLayer = require('../../class/AuthLayer');
const authLayer = new AuthLayer();

class HomeController extends BaseController {
    constructor(io) {
        super(io)
        this.router = router;
        this.fileManager = new FileManager('public/images');
        this.router.get('/', authLayer.checkPasswordConfirm,this.home);
        this.router.get('/upload', this.fileManager.middlewareImage(),this.upload);
    }

    async home(req, res) {
        this.ApiResponse.success('Server runing....')(res);
    }

    async enum(req, res) {
        this.ApiResponse.success(enumTypes)(res);
    }

    async getProfileFormToken(req, res) {
        const user = new UserDTO(req.profile).toObject();
        this.ApiResponse.success(user)(res);       
    }

    async upload(req, res) {
        try {
            let { file } = req;
            file.path = file.path.substring(7); //  --> to cut /public
            if (!file) throw 'ต้องมีอย่างน้อย 1 ไฟล์';
            this.ApiResponse.success(`/${file.path}`)(res); 
        } catch (error) {
            this.ApiResponse.error(error)(res);
        }
    }
}

module.exports = (io) => new HomeController(io).router;