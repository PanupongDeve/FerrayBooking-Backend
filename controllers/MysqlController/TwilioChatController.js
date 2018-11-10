const express = require('express')
const router = express.Router()
const BaseController = require('./BaseController');
const TwilioChat = require('../../class/TwilioChat');


class TwilioChatController extends BaseController {
    constructor(io) {
        super(io)
        this.router = router;
        this.router.post('/', this.post.bind(this));
        this.twilioChat = new TwilioChat();
    }

    async post(req, res) {
        const deviceId = req.body.device;
        const identity = req.body.identity;

        const token = this.twilioChat.generateToken(identity, deviceId);

        const data = {
            identity: identity,
            token: token.toJwt(),
        }
        this.ApiResponse.success(data)(res)
    }
  
}

module.exports = (io) => new TwilioChatController(io).router;