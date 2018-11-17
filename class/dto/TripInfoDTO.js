const BaseDTO  = require('./BaseDTO');

class TripInfoDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '-';
        this.partner_name = '-';
        this.source = '-';
        this.destination = '-';
        this.amount_adult = 0;
        this.amount_children = 0;
        this.amount_baby = 0;
        this.type = '-';
        this.day_on = new Date();
        this.day_off = new Date();

        this.orders = '-';

        this.softDelete = null;
        this.createdAt = null;
        this.updatedAt = null;
    }

    setForCreate(data) {
        delete this.id;
        delete this.softDelete;
        delete this.createdAt;
        delete this.updatedAt;
        delete this.orders;

        this.partner_name = data.partner_name || this.partner_name;
        this.source = data.source || this.source;
        this.destination = data.destination || this.destination;
        this.amount_adult = data.amount_adult || this.amount_adult;
        this.amount_children = data.amount_children || this.amount_children;
        this.amount_baby = data.amount_baby || this.amount_baby;
        this.type = data.type || this.type;
        this.day_on = data.day_on || this.day_on;
        this.day_off = data.day_off || this.day_off;
    }

    setForResponseData(data) {
        this.id = data.id;
        this.partner_name = data.partner_name;
        this.source = data.source;
        this.destination = data.destination;
        this.amount_adult = data.amount_adult;
        this.amount_children = data.amount_children;
        this.amount_baby = data.amount_baby;
        this.type = data.type;
        this.day_on = data.day_on;
        this.day_off = data.day_off;
        this.orders = data.orders;
    }
}

module.exports = TripInfoDTO;