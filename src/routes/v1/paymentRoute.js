const router = require("express").Router();
const VerifyAdmin = require("../../middlewares/VerifyAdmin");
const VerifyToken = require("../../middlewares/VerifyToken");

const {
  createPaymentIntent,
  createBooking,
  getPaymentHistory,
} = require("../../controllers/paymentController");

router.post("/payment/create-payment-intent", VerifyToken, createPaymentIntent);
router.post("/booking", VerifyToken, createBooking);
router.get("/payment/history", VerifyToken, getPaymentHistory);

module.exports = router;
