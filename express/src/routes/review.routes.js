module.exports = (express, app) => {
    const reviewController = require("../controllers/review.controller.js")
    const router = express.Router();
   
    app.use("/api/review", router);

    router.post("/save", reviewController.saveReview)
    
};