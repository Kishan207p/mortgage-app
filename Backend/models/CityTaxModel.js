const mongoose = require("mongoose");

const taxBracketSchema = new mongoose.Schema({
  from: Number,
  to: Number,
  fixed_amt: Number,
  rate: Number
});

const cityTaxSchema = new mongoose.Schema({
  province_id: Number, // Include province_id
  citiesTax: [
    {
      city_id: Number,
      city_tax: {
        land_transfer_tax: {
          tax_brackets: [taxBracketSchema]
        },
        property_registration_tax: {
          property_tax: {
            tax_brackets: [taxBracketSchema]
          },
          mortgage_tax: {
            tax_brackets: [taxBracketSchema]
          }
        }
      }
    }
  ]
});

const CityTaxModel = mongoose.model("CityTax", cityTaxSchema);

module.exports = CityTaxModel;
