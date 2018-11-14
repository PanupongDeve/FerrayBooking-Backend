const BaseOmise  = require('./BaseOmise');

class Charges extends BaseOmise {
    constructor(){
        super();
    }

    async create(options) {
        const response  = await this.omise.charges.create(options);
        return response;
    }

    async get(chargeId) {
        const response = await this.omise.charges.retrieve(chargeId);
        return response;
    }
}


module.exports = Charges;