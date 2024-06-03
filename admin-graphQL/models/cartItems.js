module.exports = (sequelize, DataTypes) =>
    sequelize.define("cartItems", {
        cartId: {
            type: DataTypes.BIGINT,
            references: {
                model: "cart",
                key: "cartId"
            },
            primaryKey: true
        },
        itemId: {
            type: DataTypes.BIGINT,
            references: {
                model: "item",
                key: "itemId"
            },
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        }
    }, {
        timeStamps: false
    });