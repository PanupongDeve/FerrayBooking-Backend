module.exports = (sequelize, DataTypes) => {
    return sequelize.define('refunds', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        refund_id: {
            field: 'refund_id',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        amount: {
            field: 'amount',
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