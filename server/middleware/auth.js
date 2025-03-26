import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const farmer = (req, res, next) => {
  if (req.user && req.user.role === "farmer") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a farmer");
  }
};

const vendor = (req, res, next) => {
  if (req.user && req.user.role === "vendor") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a vendor");
  }
};

const driver = (req, res, next) => {
  if (req.user && req.user.role === "driver") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a driver");
  }
};

export { protect, farmer, vendor, driver };
