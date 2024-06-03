module.exports = (sequelize, DataTypes) => 
    sequelize.define("item", {
        itemId: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        specialDays: {
            type: DataTypes.JSON
        },
        specialPrice: {
            type: DataTypes.DECIMAL(10, 2)
        }
    }, {
        timestamps: false
    });