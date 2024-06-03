module.exports = (express, app) => {
    const itemController = require("../controllers/item.controller.js")
    const router = express.Router();
   
    app.use("/api/items", router);

    router.get("/", itemController.getAllItems);
    router.post("/save", itemController.saveItems)
    
};