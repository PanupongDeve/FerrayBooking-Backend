module.exports = (sequelize, DataTypes) => {
    return sequelize.define('orders', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        tel: {
            field: 'tel',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        country_code: {
            field: 'country_code',
            type: DataTypes.STRING(191),
            allowNull: true,
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(191),
            allowNull: true,
        },
        is_pick_up: {
            field: 'is_pick_up',
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_drop_off: {
            field: 'is_drop_off',
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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