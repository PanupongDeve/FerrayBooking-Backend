const BaseDTO  = require('./BaseDTO');

class PaymentDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.payment_type = '-';
        this.charge_id = '-';
        this.amount = '-'; // Bath
        this.orders = null;
        this.softDelete = null;
        this.createdAt = null;
        this.updatedAt = null;
    }

    setForCreate(data) {
        delete this.id;
        delete this.softDelete;
        delete this.createdAt;
        delete this.updatedAt;
        delete this.orders

        this.payment_type = data.payment_type || this.payment_type;
        this.charge_id = data.charge_id || this.charge_id;
        this.amount = data.amount || this.amount;
    }

    setForUpdate(oldData, newData) {
        newData = Object.assign(oldData, newData);
        this.setForCreate(newData);
    }

    setForDelete() {

    }

    // implement;
    setForResponseData(data) {

    }
}

module.exports = PaymentDTO;