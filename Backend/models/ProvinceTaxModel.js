const mongoose = require("mongoose");

const provinceTaxSchema = new mongoose.Schema({
  province_tax: {
    land_transfer_tax: {
      tax_brackets: [{
        from: Number,
        to: Number,
        fixed_amt: Number,
        rate: Number
      }]
    },
    property_registration_tax: {
      property_tax: {
        tax_brackets: [{
          from: Number,
          to: Number,
          fixed_amt: Number,
          rate: Number
        }]
      },
      mortgage_tax: {
        tax_brackets: [{
          from: Number,
          to: Number,
          fixed_amt: Number,
          rate: Number
        }]
      }
    }
  },
  province_id: Number
});

const ProvinceTaxModel = mongoose.model("ProvinceTax", provinceTaxSchema);

module.exports = ProvinceTaxModel;
