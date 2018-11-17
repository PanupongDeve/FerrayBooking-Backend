
const Sequelize = require('sequelize');
const config = require('./config.js');


class Mysql {
    constructor() {
        this.Sequelize = Sequelize;
        this.sequelize = this.setupDatabase();
        this.model = this.mountModel(this.sequelize, this.Sequelize);
       
    }

    setupDatabase() {
        const database = process.env.DB_NAME || config.DB_NAME;
        const username = process.env.DB_USERNAME || config.DB_USERNAME;
        const password = process.env.DB_PASSWORD || config.DB_PASSWORD;
        const host = (process.env.DOCKER === 'yes') ? process.env.DB_HOST_DOCKER : config.DB_HOST;
        

        const sequelize = new this.Sequelize(database, username, password, {
                host,
                dialect: 'mysql',
                efine: {
                    timestamps: true
                },
                operatorsAliases: false,
                port: 3306,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                logging: false
        });


        return sequelize;
    }

    async mount() {
        console.log('MYSQL MOUNT ---> STATUS: SUCCESS');
        this.sequelize.authenticate().then(() => {
            console.log('\x1b[31m', 'System:', '\x1b[37m', 'Connection has been established successfully.');
          })
          .catch(err => {
            console.error('\x1b[31m', 'System:', '\x1b[37m', 'Unable to connect to the database:', err);
          });
    }

    async mountModel(sequelize, DataTypes) {
        const model = {};
        model.sequelize = sequelize;
        model.orders = require('./model/Order')(sequelize, DataTypes);
        model.tripinfos = require('./model/Tripinfo')(sequelize, DataTypes);
        model.pickups = require('./model/Pickup')(sequelize, DataTypes);
        model.dropoffs = require('./model/Dropoff')(sequelize, DataTypes);
        model.payments = require('./model/Payment')(sequelize, DataTypes);

        model.orderTripinfo = require('./model/OrderTripinfo')(sequelize, DataTypes);
        model.orderPickup = require('./model/OrderPickup')(sequelize, DataTypes);
        model.orderDropoff = require('./model/OrderDropoff')(sequelize, DataTypes);
        model.orderPayment= require('./model/OrderPayment')(sequelize, DataTypes);

        await this.mountSync(model);
        await this.mountRelation(model);
    
        return model
        
    }

    async mountSync(model) {
        /**
         * ทำการสร้าง database
         * model.owner.sync({force: true}); --> สร้างดาต้าเบสอันใหม่โดยลบข้อมูลออกหมด
         */
        await model.orders.sync();
        await model.tripinfos.sync();
        await model.pickups.sync();
        await model.dropoffs.sync();
        await model.payments.sync();
        
        await model.orderTripinfo.sync();
        await model.orderPickup.sync();
        await model.orderDropoff.sync();
        await model.orderPayment.sync();
    }

    async mountRelation(model) {
        /**
         * กำหนด relation
         * 
         */
        // model.owner.hasMany(model.cat);

        model.orders.belongsToMany(model.tripinfos, { through: { model: model.orderTripinfo } });
        model.tripinfos.belongsToMany(model.orders, { through: { model: model.orderTripinfo } });

        model.orders.belongsToMany(model.pickups, { through: { model: model.orderPickup } });
        model.pickups.belongsToMany(model.orders, { through: { model: model.orderPickup } });

        model.orders.belongsToMany(model.dropoffs, { through: { model: model.orderDropoff } });
        model.dropoffs.belongsToMany(model.orders, { through: { model: model.orderDropoff } });

        model.orders.belongsToMany(model.payments, { through: { model: model.orderPayment } });
        model.payments.belongsToMany(model.orders, { through: { model: model.orderPayment } });
    }

    
}

module.exports = new Mysql();



