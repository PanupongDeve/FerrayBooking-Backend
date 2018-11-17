const BaseDTO  = require('./BaseDTO');

class OrderDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.name = '-';
        this.country_code = '-';
        this.email = '-';
        this.tel = '-';

        this.is_pick_up = false;
        this.is_drop_off = false;
        
        this.tripinfos = null;
        this.pickups = null; // 0 คือไม่ใช้บริการ
        this.dropoffs = null; // 0 คือไม่ใช้บริการ
        this.payments = null;

        this.softDelete = null;
        this.createdAt = null;
        this.updatedAt = null;
    }

    setForCreate(data) {
        delete this.id;
        delete this.softDelete;
        delete this.createdAt;
        delete this.updatedAt;
        delete this.tripinfos;
        delete this.pickups;
        delete this.dropoffs;
        delete this.payments;

        this.name = data.name || this.name;
        this.country_code = data.country_code || this.country_code;
        this.email = data.email || this.email;
        this.is_pick_up = data.is_pick_up || this.is_pick_up;
        this.is_drop_off = data.is_drop_off || this.is_drop_off;
    }

    setForUpdate(oldData, newData) {
        newData = Object.assign(oldData, newData);
        this.setForCreate(newData);
    }

    setForDelete() {

    }

    // implement;
    setForResponseData(data) {
        this.id = data.id;
        this.name = data.name;
        this.country_code = data.country_code;
        this.email = data.email;
        this.tel = data.tel;
        this.is_pick_up = data.is_pick_up;
        this.is_drop_off = data.is_drop_off;
        this.tripinfos = data.tripinfos;
        this.pickups = data.pickups;
        this.dropoffs = data.dropoffs;
        this.payments = data.payments;
        this.softDelete = data.softDelete;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

module.exports = OrderDTO;