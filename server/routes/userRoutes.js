import express from "express";
import {
  getFarmers,
  getDrivers,
  getFarmerById,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/farmers").get(getFarmers);
router.route("/drivers").get(getDrivers);
router.route("/farmers/:id").get(getFarmerById);

export default router;
