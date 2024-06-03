module.exports = (sequelize, DataTypes) => 
    sequelize.define("orderItem", {
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'orders',
                key: 'orderId'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
