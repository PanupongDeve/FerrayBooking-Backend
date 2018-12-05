module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ferrys', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        start_point: { // จุดเริ่มต้น
            field: 'start_point',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        end_point: { // จุดหมาย
            field: 'end_point',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        time_start: { // เวลาออกเดินทาง
            field: 'time_start',
            type: DataTypes.DATE,
            allowNull: true
        },
        time_end: { // เวลาถึงที่หมาย
            field: 'time_end',
            type: DataTypes.DATE,
            allowNull: true
        },
        time: { // เวลาเดินทาง
            field: 'time',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        company: { // ชื่อบริษัท
            field: 'company',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        port: { // ชื่อท่าเรือ
            field: 'port',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        seat_type: { // ชนิดที่นั่ง
            field: 'seat_type',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        description: { // รายละเอียด
            field: 'description',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        adult_price: { // ราคาผู้ใหญ่
            field: 'adult_price',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        chidren_price: { // ราคาเด็ก
            field: 'chidren_price',
            type: DataTypes.STRING(191),
            allowNull: true
        },
        baby_price: { // ราคาทารก
            field: 'baby_price',
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