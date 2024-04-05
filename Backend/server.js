// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const ProvinceModel = require("./models/ProvinceModel");
const CityModel = require("./models/CityModel");
const DocumentTypeModel = require("./models/DocumentTypes");
const ProvinceTaxModel = require("./models/ProvinceTaxModel")

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

dotenv.config(); 

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;


if (!mongoURI || !dbName) {
  console.error('Please provide MongoDB URI and database name in the .env file.');
  process.exit(1);
}

mongoose.connect(mongoURI, { dbName: dbName }); 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log(`Connected to MongoDB database: ${dbName}`);
});

app.get("/api/provinces", async (req, res) => {
  try {
    const provinces = await ProvinceModel.find();
    res.json(provinces);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
});

app.get("/api/cities", async (req, res) => {
  try {
    const cities = await CityModel.find();
    res.json(cities);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
});

app.get("/api/cities/:province_id", async (req, res) => {
  let { province_id } = req.params;

  province_id = parseInt(province_id);
  try {
    const cities = await CityModel.find({ province_id: province_id });
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

app.get("/api/provinceTax", async (req, res) => {
  try {
    const provinceTax = await ProvinceTaxModel.find();
    res.json(provinceTax);
  } catch (error) {
    console.error("Error fetching TAX:", error);
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
});

app.get("/api/provinceTax/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const provinceTax = await ProvinceTaxModel.find({ province_id: parseInt(id) });
    res.json(provinceTax);
  } catch (error) {
    console.error("Error fetching province tax:", error);
    res.status(500).json({ error: "Failed to fetch province tax" });
  }
});


app.get("/api/documents", async (_req, res) => {
  try {
    const documentTypes = await DocumentTypeModel.find();
    res.json({ documentTypes });
  } catch (error) {
    console.error("Error fetching document types:", error);
    res.status(500).json({ error: "Failed to fetch document types" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
