const router = require("express").Router();
const VerifyToken = require("../../middlewares/VerifyToken");
const {
  getReviews,
  getReviewsByUserId,
  postReview,
  deleteReview,
  updateReview,
  featureRequestPost,
} = require("../../controllers/reviewsController");

router.get("/reviews", getReviews);
router.post("/reviews", VerifyToken, postReview);
router.delete("/reviews/:id", VerifyToken, deleteReview);
router.put("/reviews/:id", VerifyToken, updateReview);
router.get("/reviews/user", VerifyToken, getReviewsByUserId);
router.post("/app/sendFeatureRequest", featureRequestPost);

module.exports = router;
