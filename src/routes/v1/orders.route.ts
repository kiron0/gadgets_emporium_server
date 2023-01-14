import { Router } from "express";
const router: Router = Router();
import { VerifyAdmin } from "../../middlewares/VerifyAdmin";
import { VerifyToken } from "../../middlewares/VerifyToken";

import {
  getAllOrders,
  getOrders,
  addOrder,
  deleteOrder,
  paidOrder,
  shippedOrder,
} from "../../controllers/orders.controller";

router.get("/orders/all", VerifyToken, VerifyAdmin, getAllOrders);
router.get("/orders", VerifyToken, getOrders);
router.post("/orders", VerifyToken, addOrder);
router.delete("/orders/:id", deleteOrder);
router.patch("/orders/paid/:id", paidOrder);
router.patch("/orders/shipped/:id", shippedOrder);

export default router;
