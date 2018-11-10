const express = require('express')
const router = express.Router()
const BaseController = require('./BaseController');
const modelPromise = require('../../database/mysqlDB').model;


class OwnersController extends BaseController {
    constructor(io) {
        super(io)
        this.router = router;
        this.router.get('/', this.get.bind(this));
        this.router.get('/:id', this.getById.bind(this));
        this.router.post('/create', this.post.bind(this));
        this.router.patch('/:id', this.update.bind(this));
        this.router.delete('/:id', this.delete.bind(this));
    }

    async sendSocket() {
        const model = await Promise.resolve(modelPromise);   
        const owners = await model.owner.findAll({
            include: [model.cat]
        });
        this.io.emit('owners/findAll', owners);
    }

    async get(req, res) {
        const model = await Promise.resolve(modelPromise);   
        const owners = await model.owner.findAll({
            include: [model.cat]
        });
        this.ApiResponse.success(owners)(res);
    }

    async getById(req, res) {
        const model = await Promise.resolve(modelPromise);
        const owner = await model.owner.findById(req.params.id, {
            include: [model.cat]
        });
        this.ApiResponse.success(owner)(res);
    }

    async post(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const owner = await model.owner.create(req.body);
        this.enableSocket ? await this.sendSocket(): '';
        this.ApiResponse.success(owner)(res);
    }

    async update(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const id = req.params.id;
        let owner = await model.owner.findById(id);
        owner = await owner.updateAttributes(req.body, {
            include: [model.cat]
        });
        this.enableSocket ? await this.sendSocket(): '';
        this.ApiResponse.success(owner)(res);
    }

    async delete(req, res) {
        res.send(`you delete owner number ${req.params.id}`)
    }
}

module.exports = (io) => new OwnersController(io).router;