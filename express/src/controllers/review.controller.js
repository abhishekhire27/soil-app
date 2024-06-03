const db = require("../config").default;

exports.saveReview = async (req, res) => {
    try {
        const { reviewId, ...reviewData } = req.body;

        try {
            if (reviewId) {
                const review = await db.review.update(reviewData, {
                    where: { reviewId: reviewId },
                });

                if (review && review[0] === 1) {
                    res.status(200).json({});
                } else {
                    res.status(404).json({ message: "Review not found or no changes made.", details: error.message });
                }
            } else {
                const newReview = await db.review.create(reviewData);
                res.status(200).json(newReview);
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error", details: error.message });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error for saving review", details: error.message })
    }
}