module.exports = (sequelize, DataTypes) => 
    sequelize.define("user", {
        userId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        password_hashed: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        joiningDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        dietaryPreference: {
            type: DataTypes.STRING,
            allowNull: true
        },
        healthGoal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        activityLevel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userStatus: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
);