const BaseOmise  = require('./BaseOmise');

class LinkPayment extends BaseOmise {
    async createOneTimeUseLink(options) {
        let optionsUpdate = Object.assign(options, {
            multiple: false
        });

        const result = await this.omise.links.create(optionsUpdate);
        return result.payment_uri;
    }

    async createMultipleTimeUseLink(options) {
        let optionsUpdate = Object.assign(options, {
            multiple: true
        })
        const result = await this.omise.links.create(optionsUpdate);
        return result.payment_uri;
    }

}

module.exports = LinkPayment;