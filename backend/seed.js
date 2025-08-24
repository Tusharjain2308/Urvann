const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Plant = require("./models/Plant");
const plantsData = require("./seed/plant.js");

dotenv.config();
connectDB();

const seedDB = async () => {
  try {
    await Plant.deleteMany({});
    await Plant.insertMany(plantsData);
    console.log("🌱 Seeded the mini plant database successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
