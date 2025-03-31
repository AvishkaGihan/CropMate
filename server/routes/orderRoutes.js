import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updatePaymentStatus,
  updateOrderToProcessing,
  updateOrderToReady,
  getAvailableOrders,
  acceptOrderForDelivery,
  updateOrderToDelivered,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect, farmer, vendor, driver } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(protect, vendor, addOrderItems)
  .get(protect, getMyOrders);
router.route("/available").get(protect, driver, getAvailableOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, vendor, updateOrderToPaid);
router.route("/:id/payment-status").put(protect, farmer, updatePaymentStatus);
router.route("/:id/process").put(protect, farmer, updateOrderToProcessing);
router.route("/:id/ready").put(protect, farmer, updateOrderToReady);
router.route("/:id/accept").put(protect, driver, acceptOrderForDelivery);
router.route("/:id/deliver").put(protect, driver, updateOrderToDelivered);

export default router;
