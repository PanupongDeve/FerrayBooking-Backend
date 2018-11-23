const BaseOmise  = require('./BaseOmise');
const Source = require('./Source');
const Charges = require('./Charges');
const SourceType = require('./OMISE_ENUM').source();

class Transaction extends BaseOmise {
    constructor() {
        super();
        this.sources = new Source();
        this.charges = new Charges();
    }

    async aliplay(options) {
        return await this.connectBank(options, SourceType.alipay);
    }

    async scb(options) {
        return await this.connectBank(options, SourceType.internet_banking_scb);
    }

    async ktb(options) {
        return await this.connectBank(options, SourceType.internet_banking_ktb);
    }

    async bay(options) {
        return await this.connectBank(options, SourceType.internet_banking_bay);
    }

    async bbl(options) {
        return await this.connectBank(options, SourceType.internet_banking_bbl);
    }



    async connectBank(options, sourceType) {
        const sourceId  =  await this.sources.create({
            type: sourceType,
            amount: options.amount,
            currency: 'thb'
        });

        const charge = await this.charges.create({
            amount: options.amount,
            currency: 'thb',
            source: sourceId,
            return_uri: options.return_uri
        });

        return charge;
    }
}

module.exports = Transaction;




