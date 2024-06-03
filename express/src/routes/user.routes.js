module.exports = (express, app) => {
    const userController = require("../controllers/user.controller")
    const router = express.Router();

    app.use("/api/user", router);

    router.post("/login", userController.login);
    router.post("/register", userController.register);
    router.put("/updateProfile", userController.updateProfile);
    router.put("/deleteProfile", userController.deleteProfile);
    router.put("/changePassword", userController.changePassword);
    router.post("/checkEmailId", userController.checkEmailId);

};