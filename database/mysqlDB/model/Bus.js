module.exports = (sequelize, DataTypes) => {
    return sequelize.define('buss', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        bus_type: { // ชนิดของรถ
            field: 'bus_type',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        company_tour: { // บริษัททัวร์
            field: 'company_tour',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        zone: { // โซนที่ไปรับได้
            field: 'zone',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        price: { // ราคา
            field: 'price',
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