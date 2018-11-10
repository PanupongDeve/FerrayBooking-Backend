const express = require('express')
const router = express.Router()
const BaseController = require('./BaseController');
const modelPromise = require('../../database/mysqlDB').model;

class CatsController extends BaseController {
    constructor(io) {
        super(io);
        this.router = router;
        this.router.get('/', this.get.bind(this));
        this.router.get('/:id', this.getById.bind(this));
        this.router.post('/create', this.post.bind(this));
        this.router.patch('/:id', this.update.bind(this));
        this.router.delete('/:id', this.delete.bind(this));
    }

    async sendSocket() {
        const model = await Promise.resolve(modelPromise);   
        const cats = await model.cat.findAll();
        this.io.emit('cat/findAll', cats);
    }

    async get(req, res) {
        const model = await Promise.resolve(modelPromise);   
        const cats = await model.cat.findAll();
        this.ApiResponse.success(cats)(res);
    }

    async getById(req, res) {
        const model = await Promise.resolve(modelPromise);
        const cat = await model.cat.findById(req.params.id);
        this.ApiResponse.success(cat)(res);
    }

    async post(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const cat = await model.cat.create(req.body);
        this.enableSocket ? await this.sendSocket(owners): '';
        this.ApiResponse.success(cat)(res);
    }

    async update(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const id = req.params.id;
        let cat = await model.cat.findById(id);
        cat = await cat.updateAttributes(req.body);
        this.enableSocket ? await this.sendSocket(owners): '';
        this.ApiResponse.success(cat)(res);
    }

    async delete(req, res) {
        res.send(`you delete cat number ${req.params.id}`)
    }
}

module.exports = (io) => new CatsController(io).router;