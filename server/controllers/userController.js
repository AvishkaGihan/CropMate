import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get all farmers
// @route   GET /api/users/farmers
// @access  Public
const getFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({ role: "farmer" }).select("-password");
  res.json(farmers);
});

// @desc    Get all drivers
// @route   GET /api/users/drivers
// @access  Public
const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await User.find({ role: "driver" }).select("-password");
  res.json(drivers);
});

// @desc    Get farmer by ID
// @route   GET /api/users/farmers/:id
// @access  Public
const getFarmerById = asyncHandler(async (req, res) => {
  const farmer = await User.findById(req.params.id)
    .select("-password")
    .populate("crops", "name price images");

  if (farmer && farmer.role === "farmer") {
    res.json(farmer);
  } else {
    res.status(404);
    throw new Error("Farmer not found");
  }
});

export { getFarmers, getDrivers, getFarmerById };
