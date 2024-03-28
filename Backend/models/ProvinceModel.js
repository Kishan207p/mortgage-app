const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  province_id: Number,
  code: String,
  description: String,
});

module.exports = mongoose.model("Province", provinceSchema);
