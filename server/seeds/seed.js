import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./users.js";
import crops from "./crops.js";
import User from "../models/User.js";
import Crop from "../models/Crop.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Crop.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Get farmers and vendors
    const farmers = createdUsers.filter((user) => user.role === "farmer");
    const vendors = createdUsers.filter((user) => user.role === "vendor");
    const drivers = createdUsers.filter((user) => user.role === "driver");

    // Prepare crops with farmer references
    const sampleCrops = crops.map((crop) => {
      const farmer = farmers[Math.floor(Math.random() * farmers.length)];
      return {
        ...crop,
        farmer: farmer._id,
      };
    });

    // Insert crops
    const createdCrops = await Crop.insertMany(sampleCrops);

    // Create some orders
    const sampleOrders = [
      {
        vendor: vendors[0]._id,
        farmer: farmers[0]._id,
        items: [
          {
            crop: createdCrops[0]._id,
            quantity: 5,
            price: createdCrops[0].price,
          },
          {
            crop: createdCrops[1]._id,
            quantity: 3,
            price: createdCrops[1].price,
          },
        ],
        totalPrice: 5 * createdCrops[0].price + 3 * createdCrops[1].price,
        deliveryAddress: vendors[0].address,
        paymentStatus: "verified",
        orderStatus: "ready",
        isPaid: true,
        paidAt: new Date(),
      },
      {
        vendor: vendors[1]._id,
        farmer: farmers[1]._id,
        driver: drivers[0]._id,
        items: [
          {
            crop: createdCrops[2]._id,
            quantity: 10,
            price: createdCrops[2].price,
          },
        ],
        totalPrice: 10 * createdCrops[2].price,
        deliveryAddress: vendors[1].address,
        paymentStatus: "verified",
        orderStatus: "delivered",
        isPaid: true,
        paidAt: new Date(),
        isDelivered: true,
        deliveredAt: new Date(),
      },
    ];

    await Order.insertMany(sampleOrders);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Crop.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
