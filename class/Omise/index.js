const Tokens = require('./Tokens');
const LinkPayment = require('./LinkPayment');
const OMISE_ENUM = require('./OMISE_ENUM');
const Source = require('./Source');
const Charges  = require('./Charges');
const Transaction = require('./Transaction');

class Payment {
    constructor() {
        this.tokens = new Tokens();
        this.links = new LinkPayment();
        this.sources = new Source();
        this.charges = new Charges();
        this.transaction = new Transaction();
    }

    static getSource() {
        return OMISE_ENUM.source();
    }
}

module.exports = Payment;