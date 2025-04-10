import express from "express";
import {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} from "../controllers/cropController.js";
import { protect, farmer } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";

const router = express.Router();

router.route("/").get(getCrops).post(protect, farmer, uploadImage, createCrop);
router
  .route("/:id")
  .get(getCropById)
  .put(protect, farmer, uploadImage, updateCrop)
  .delete(protect, farmer, deleteCrop);

export default router;
