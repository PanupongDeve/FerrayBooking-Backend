const express = require('express')
const router = express.Router()
const BaseController = require('./BaseController');
const modelPromise = require('../../database/mysqlDB').model;


class OwnersController extends BaseController {
    constructor(io) {
        super(io)
        this.router = router;
        this.router.get('/create', this.create.bind(this));
    }


    async create(req, res) {
        const model = await Promise.resolve(modelPromise);
        const query = { include: [
            { model: model.tripinfos },
            { model: model.pickups },
            { model: model.dropoffs },
            { model: model.payments }
        ] };
        const orders = await model.orders.findAll(query);
        this.ApiResponse.success(orders)(res);
    }
}

module.exports = (io) => new OwnersController(io).router;