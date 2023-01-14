import { Router } from "express";
const router: Router = Router();
import { VerifyToken } from "../../middlewares/VerifyToken";

import {
  createPaymentIntent,
  createBooking,
  getPaymentHistory,
} from "../../controllers/payment.controller";

router.post("/payment/create-payment-intent", VerifyToken, createPaymentIntent);
router.post("/booking", VerifyToken, createBooking);
router.get("/payment/history", VerifyToken, getPaymentHistory);

export default router;
