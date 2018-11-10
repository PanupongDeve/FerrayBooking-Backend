const ApiResponse = require('../../class/Response/ApiResponse');
const Response = require('../../class/Response/Response');
const HandleMessageError = require('../../class/HandleMessageError');

class BaseController {
    constructor(io) {
        this.io = io;
        this.enableSocket = false;
        this.ApiResponse = new ApiResponse();
        this.Response = new Response();
        this.HandleMessageError = new HandleMessageError();
    }
}

module.exports = BaseController;