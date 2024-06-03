module.exports = (sequelize, DataTypes) => 
    sequelize.define("review", {
        reviewId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        reviewText: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        starRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        timestamps: false
    });