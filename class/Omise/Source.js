const BaseOmise  = require('./BaseOmise');

class Source extends BaseOmise {
    async create(options) {
        const response = await this.omise.sources.create(options);
        return response.id;
    }
}

module.exports = Source;