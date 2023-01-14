import { Router } from "express";
const router: Router = Router();
import { VerifyToken } from "../../middlewares/VerifyToken";

import {
  getReviews,
  getReviewsByUserId,
  postReview,
  deleteReview,
  updateReview,
  featureRequestPost,
} from "../../controllers/reviews.controller";

router.get("/reviews", getReviews);
router.post("/reviews", VerifyToken, postReview);
router.delete("/reviews/:id", VerifyToken, deleteReview);
router.put("/reviews/:id", VerifyToken, updateReview);
router.get("/reviews/user", VerifyToken, getReviewsByUserId);
router.post("/app/sendFeatureRequest", featureRequestPost);

export default router;
