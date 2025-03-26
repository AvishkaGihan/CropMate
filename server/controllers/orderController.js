import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Crop from "../models/Crop.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Vendor
const addOrderItems = asyncHandler(async (req, res) => {
  const { items, deliveryAddress, paymentSlip } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // Calculate total price and verify items
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const crop = await Crop.findById(item.crop);

      if (!crop) {
        res.status(404);
        throw new Error(`Crop not found: ${item.crop}`);
      }

      if (crop.quantity < item.quantity) {
        res.status(400);
        throw new Error(`Not enough quantity available for ${crop.name}`);
      }

      totalPrice += crop.price * item.quantity;

      orderItems.push({
        crop: item.crop,
        quantity: item.quantity,
        price: crop.price,
      });

      // Reduce the crop quantity
      crop.quantity -= item.quantity;
      await crop.save();
    }

    const order = new Order({
      vendor: req.user._id,
      farmer: items[0].farmer, // Assuming all items are from the same farmer
      items: orderItems,
      totalPrice,
      deliveryAddress,
      paymentSlip,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("vendor", "name email phone")
    .populate("farmer", "name email phone bankDetails")
    .populate("driver", "name email phone")
    .populate("items.crop", "name images");

  if (order) {
    // Check if the user is authorized to view this order
    if (
      order.vendor._id.toString() !== req.user._id.toString() &&
      order.farmer._id.toString() !== req.user._id.toString() &&
      order.driver &&
      order.driver._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(401);
      throw new Error("Not authorized to view this order");
    }

    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Vendor
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.vendor.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this order");
    }

    order.paymentSlip = req.body.paymentSlip || order.paymentSlip;
    order.paymentStatus = "pending"; // Admin will verify later
    order.isPaid = false;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order payment status (for farmer/admin)
// @route   PUT /api/orders/:id/payment-status
// @access  Private/Farmer
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.farmer.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this order");
    }

    order.paymentStatus = req.body.paymentStatus;
    if (req.body.paymentStatus === "verified") {
      order.isPaid = true;
      order.paidAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to processing (farmer starts preparing)
// @route   PUT /api/orders/:id/process
// @access  Private/Farmer
const updateOrderToProcessing = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.farmer.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this order");
    }

    order.orderStatus = "processing";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to ready for delivery
// @route   PUT /api/orders/:id/ready
// @access  Private/Farmer
const updateOrderToReady = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.farmer.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this order");
    }

    order.orderStatus = "ready";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get available orders for drivers
// @route   GET /api/orders/available
// @access  Private/Driver
const getAvailableOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ orderStatus: "ready" })
    .populate("vendor", "name address")
    .populate("farmer", "name address");

  res.json(orders);
});

// @desc    Accept order for delivery
// @route   PUT /api/orders/:id/accept
// @access  Private/Driver
const acceptOrderForDelivery = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.orderStatus !== "ready") {
      res.status(400);
      throw new Error("Order is not ready for delivery");
    }

    order.driver = req.user._id;
    order.orderStatus = "assigned";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Driver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.driver.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this order");
    }

    order.orderStatus = "delivered";
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "vendor") {
    orders = await Order.find({ vendor: req.user._id })
      .populate("farmer", "name")
      .populate("driver", "name");
  } else if (req.user.role === "farmer") {
    orders = await Order.find({ farmer: req.user._id })
      .populate("vendor", "name")
      .populate("driver", "name");
  } else if (req.user.role === "driver") {
    orders = await Order.find({ driver: req.user._id })
      .populate("vendor", "name")
      .populate("farmer", "name");
  }

  res.json(orders);
});

export {
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
};
