const router = require("express").Router();
const VerifyAdmin = require("../../middlewares/VerifyAdmin");
const VerifyToken = require("../../middlewares/VerifyToken");

const {
  getAllOrders,
  getOrders,
  addOrder,
  deleteOrder,
  paidOrder,
  shippedOrder,
} = require("../../controllers/ordersController");

router.get("/orders/all", VerifyToken, VerifyAdmin, getAllOrders);
router.get("/orders", VerifyToken, getOrders);
router.post("/orders", VerifyToken, addOrder);
router.delete("/orders/:id", deleteOrder);
router.patch("/orders/paid/:id", paidOrder);
router.patch("/orders/shipped/:id", shippedOrder);

module.exports = router;
