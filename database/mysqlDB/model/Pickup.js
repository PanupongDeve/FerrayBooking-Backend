module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pickups', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        car: {
            field: 'car',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        zone: {
            field: 'zone',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        address: {
            field: 'address',
            type: DataTypes.STRING(191),
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