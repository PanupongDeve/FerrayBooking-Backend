module.exports = (sequelize, DataTypes) => {
    return sequelize.define('payments', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        payment_type: {
            field: 'payment_type',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        charge_id: {
            field: 'charge_id',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        amout: {
            field: 'amout',
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        softDelete: {
            field: 'soft_delete',
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
};