module.exports = (express, app) => {
    const cartItemsController = require("../controllers/cartItems.controller.js")
    const router = express.Router();

    app.use("/api/cartItems", router);

    router.post("/emptyCart", cartItemsController.emptyCart);
    router.get("/getCartItems", cartItemsController.getCartItems);
    router.post("/removeFromCart", cartItemsController.removeFromCart);
    router.post("/addToCart", cartItemsController.addToCart);
    
};