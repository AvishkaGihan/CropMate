import asyncHandler from "express-async-handler";
import Crop from "../models/Crop.js";
import upload from "../config/upload.js";

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
const getCrops = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Crop.countDocuments({ ...keyword });
  const crops = await Crop.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("farmer", "name email phone");

  res.json({ crops, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Public
const getCropById = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id).populate(
    "farmer",
    "name email phone address bankDetails"
  );

  if (crop) {
    res.json(crop);
  } else {
    res.status(404);
    throw new Error("Crop not found");
  }
});

// @desc    Create a crop
// @route   POST /api/crops
// @access  Private/Farmer
const createCrop = asyncHandler(async (req, res) => {
  // Handle file upload
  upload.array("images", 5)(req, res, async (err) => {
    if (err) {
      res.status(400);
      throw new Error(err);
    }

    const {
      name,
      description,
      price,
      quantity,
      category,
      harvestDate,
      isOrganic,
    } = req.body;

    // Get uploaded images paths
    const images = req.files.map((file) => file.path);

    if (!images || images.length === 0) {
      res.status(400);
      throw new Error("Please upload at least one image");
    }

    const crop = new Crop({
      name,
      description,
      price,
      quantity,
      category,
      images,
      farmer: req.user._id,
      harvestDate,
      isOrganic: isOrganic === "true",
    });

    const createdCrop = await crop.save();
    res.status(201).json(createdCrop);
  });
});

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private/Farmer
const updateCrop = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    category,
    harvestDate,
    isOrganic,
  } = req.body;

  const crop = await Crop.findById(req.params.id);

  if (crop) {
    if (crop.farmer.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this crop");
    }

    crop.name = name || crop.name;
    crop.description = description || crop.description;
    crop.price = price || crop.price;
    crop.quantity = quantity || crop.quantity;
    crop.category = category || crop.category;
    crop.harvestDate = harvestDate || crop.harvestDate;
    crop.isOrganic = isOrganic || crop.isOrganic;

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.path);
      crop.images = images;
    }

    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } else {
    res.status(404);
    throw new Error("Crop not found");
  }
});

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private/Farmer
const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (crop) {
    if (crop.farmer.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this crop");
    }

    await crop.remove();
    res.json({ message: "Crop removed" });
  } else {
    res.status(404);
    throw new Error("Crop not found");
  }
});

// @desc    Get logged in farmer's crops
// @route   GET /api/crops/my-crops
// @access  Private/Farmer
const getMyCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find({ farmer: req.user._id });
  res.json(crops);
});

export {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getMyCrops,
};
