const Plant = require("../models/Plant");

// @desc   Add a new plant (Admin only)
// @route  POST /api/plants
// @access Private/Admin
const addPlant = async (req, res) => {
  try {
    const { name, price, categories, inStock, image } = req.body;

    // ✅ Basic validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const newPlant = new Plant({
      name,
      price,
      categories: categories || [],
      inStock: inStock ?? true,
      image: image || "",
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ message: "Server error while adding plant" });
  }
};

const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlant = await Plant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json(updatedPlant);
  } catch (error) {
    res.status(500).json({ message: "Error updating plant", error });
  }
};

// Delete Plant
const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlant = await Plant.findByIdAndDelete(id);

    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plant", error });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching plants", error: err.message });
  }
};

// ✅ Get plant by ID
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(plant);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching plant", error: err.message });
  }
};

// ✅ Search & Filter plants
// const searchPlants = async (req, res) => {
//   try {
//     const { name, category } = req.query;

//     let query = {};

//     // Case-insensitive search by name
//     if (name) {
//       query.name = { $regex: name, $options: "i" };
//     }

//     // Case-insensitive search by category keyword
//     if (category) {
//       query.categories = { $regex: category, $options: "i" };
//     }

//     const plants = await Plant.find(query);

//     res.json(plants);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error searching plants", error: err.message });
//   }
// };

const searchPlants = async (req, res) => {
  try {
    const { name, category } = req.query;

    let conditions = {};

    if (name) {
      conditions.name = { $regex: name, $options: "i" };
    }

    if (category) {
      // category must match at least one inside categories array
      conditions.categories = { $regex: new RegExp(category, "i") };
    }

    const plants = await Plant.find(conditions);
    res.json(plants);
    console.log("Plants fetched:", plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({
      message: "Error fetching plants",
      error: error.message,
    });
  }
};

module.exports = {
  addPlant,
  updatePlant,
  deletePlant,
  getAllPlants,
  getPlantById,
  searchPlants,
};
