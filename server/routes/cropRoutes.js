import express from "express";
import {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getMyCrops,
} from "../controllers/cropController.js";
import { protect, farmer } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getCrops).post(protect, farmer, createCrop);
router.route("/my-crops").get(protect, farmer, getMyCrops);
router
  .route("/:id")
  .get(getCropById)
  .put(protect, farmer, updateCrop)
  .delete(protect, farmer, deleteCrop);

export default router;
