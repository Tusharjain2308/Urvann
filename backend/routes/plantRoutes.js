const express = require("express");
const router = express.Router();
const {
  addPlant,
  updatePlant,
  deletePlant,
  getAllPlants,
  getPlantById,
  searchPlants,
} = require("../controllers/plantController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// User search routes
router.get("/search", searchPlants);

// Admin CRUD routes
router.post("/addplant", protect, adminOnly, addPlant);
router.put("/updateplant/:id", protect, adminOnly, updatePlant);
router.delete("/deleteplant/:id", protect, adminOnly, deletePlant);
router.get("/getall", protect, adminOnly, getAllPlants);
router.get("/:id", protect, adminOnly, getPlantById);

module.exports = router;
