const omise = require('omise');

class BaseOmise {
    constructor() {
        this.omise = omise({
            'secretKey': 'skey_test_5duml3bvjg1h38ixngm',
            'publicKey': 'pkey_test_5dwp04fqofo95svccpa'
        });
    }
}

module.exports = BaseOmise;