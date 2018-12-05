const express = require('express')
const router = express.Router()
const BaseController = require('./BaseController');
const modelPromise = require('../../database/mysqlDB').model;
const OrderDto = require('../../class/dto/OrderDTO');
const Payment = require('../../class/Omise');

const payments = new Payment();

class OwnersController extends BaseController {
    constructor(io) {
        super(io)
        this.router = router;
        this.router.post('/createTransactions', this.createTransaction.bind(this));
        this.router.get('/create', this.create.bind(this));
        this.router.get('/success', this.success.bind(this));
    }

    async createTransaction(req ,res) {
        try {
            // const {
            //     order,
            //     payment,
            //     pickUp,
            //     dropOff,
            //     tripInfo
            // }  = JSON.parse(req.body.data);

            // req.session.paymentData = {
            //     order,
            //     payment,
            //     pickUp,
            //     dropOff,
            //     tripInfo
            // }
            console.log(req.body);
            const options = {
                amount: 300000,
                return_uri: 'http://localhost:3004/payments/success'
            }

            const charge = await payments.transaction.aliplay(options);
            this.ApiResponse.redirect(res, charge.authorize_uri);
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res) {
        const testData = {
            name: 'panupong',
            payment: {
                payment_type: 'test'
            }
        }
        const model = await Promise.resolve(modelPromise);
        const orderDTO = new OrderDto();
        try {
            let transaction;
            orderDTO.setForCreate(testData);
            transaction = await model.sequelize.transaction();
           
            const order = await model.orders.create(orderDTO, { transaction });
            const payment = await model.payments.create(testData.payment, { transaction });
            const order_payment = await model.orderPayment.create({
                orderId: order.id,
                paymentId: payment.id
            }, { transaction });
            await transaction.commit();
            this.ApiResponse.success(orderDTO)(res);
        } catch (error) {
            console.log(error);
            await transaction.rollback();
        }
    }

    async success(req, res) {
        const model = await Promise.resolve(modelPromise);
        const query = { include: [
                { model: model.tripinfos },
                { model: model.pickups },
                { model: model.dropoffs },
                { model: model.payments }
            ] };
        const orders = await model.orders.findAll(query);
        this.ApiResponse.success('success')(res);
    }
}

module.exports = (io) => new OwnersController(io).router;