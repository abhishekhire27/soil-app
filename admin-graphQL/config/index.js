const { Sequelize, DataTypes } = require("sequelize");
const config = require("./mysqlConfig");

const db = {
  op: Sequelize.op,
};
db.sequelize = config;

db.user = require("../models/user.js")(db.sequelize, DataTypes);
db.cart = require("../models/cart.js")(db.sequelize, DataTypes);
db.item = require("../models/item.js")(db.sequelize, DataTypes);
db.order = require("../models/order.js")(db.sequelize, DataTypes);
db.review = require("../models/review.js")(db.sequelize, DataTypes);
db.cartItems = require("../models/cartItems.js")(db.sequelize, DataTypes);
db.orderItems = require("../models/orderItems.js")(db.sequelize, DataTypes);

db.cart.hasOne(db.user, { foreignKey: "userId" });
db.user.belongsTo(db.cart, { foreignKey: "cartId" });

db.user.hasMany(db.review, { foreignKey: "reviewId" });
db.review.belongsTo(db.user, { foreignKey: "userId" });

db.item.hasMany(db.review, { foreignKey: "reviewId" });
db.review.belongsTo(db.item, { foreignKey: "itemId" });

db.cart.belongsToMany(db.item, { through: db.cartItems, foreignKey: "cartId" });
db.item.belongsToMany(db.cart, { through: db.cartItems, foreignKey: "itemId" });

db.user.hasMany(db.order, { foreignKey: "userId" });
db.order.belongsTo(db.user, { foreignKey: "userId" });

db.order.belongsToMany(db.item, {
  through: db.orderItems,
  foreignKey: "orderId",
});
db.item.belongsToMany(db.order, {
  through: db.orderItems,
  foreignKey: "itemId",
});

db.sync = async () => {
  await db.sequelize.sync();
};

module.exports = db;
