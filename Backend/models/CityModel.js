const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city_id: Number,
  description: String,
  province_id: Number,
});

module.exports = mongoose.model("City", citySchema);
