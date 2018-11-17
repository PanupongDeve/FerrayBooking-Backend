const BaseDTO  = require('./BaseDTO');

class DropOffDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.car = '-';
        this.zone = '-';
        this.address = '-'; // Bath
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

        this.car = data.car || this.car;
        this.zone = data.zone || this.zone;
        this.address = data.address || this.address;
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

module.exports = DropOffDTO;