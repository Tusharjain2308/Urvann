const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  categories: [{ type: String }],            // multiple categories supported
  inStock: { type: Boolean, default: true },  // stock availability
  image: { type: String },                    // optional image URL
});

module.exports = mongoose.models.Plant || mongoose.model("Plant", plantSchema);
