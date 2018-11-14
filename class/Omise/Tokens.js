const BaseOmise  = require('./BaseOmise');

class Tokens extends BaseOmise {
    constructor() {
        super();
        this.token = null;
    }

    async create() {
        try {
            if(!this.token) {
                const token = await this.omise.tokens.create({
                    'card':{
                        'name': 'JOHN DOE',
                        'city': 'Bangkok',
                        'postal_code': 10320,
                        'number': '4242424242424242',
                        'expiration_month': 11,
                        'expiration_year': 2020,
                        'security_code': 123
                    }
                });
                this.token = token;
            }
            return this.token.id;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Tokens;