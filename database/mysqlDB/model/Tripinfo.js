module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tripinfos', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        partner_name: { // ข้อมูลของเจ้าของเรือ
            field: 'partner_name',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        source: {
            field: 'source',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        destination: {
            field: 'destination',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        amount_adult: {
            field: 'amount_adult',
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        amount_children: {
            field: 'amount_children',
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        amount_baby: {
            field: 'amount_baby',
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        type: {
            field: 'type',
            type: DataTypes.STRING(191),
            defaultValue: false,
        },
        day_on: {
            field: 'day_on',
            type: DataTypes.DATE,
            allowNull: true
        },
        day_off: {
            field: 'day_off',
            type: DataTypes.DATE,
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