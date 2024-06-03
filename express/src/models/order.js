module.exports = (sequelize, DataTypes) =>
    sequelize.define("order", {
        orderId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
