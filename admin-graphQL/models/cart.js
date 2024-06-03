module.exports = (sequelize, DataTypes) => 
    sequelize.define("cart", {
        cartId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: false
    });