// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const ProvinceModel = require("./models/ProvinceModel");
const CityModel = require("./models/CityModel");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

dotenv.config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// mongoose.connect("mongodb+srv://stuart207j:kishan2001@cluster0.hahprlw.mongodb.net/mortgage");


// app.use(express.json());
// app.use(cors()); // Enable CORS for all routes


// // Connect to MongoDB


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

app.get("/api/cities/:province_id", async (req, res) => {
  let { province_id } = req.params;
  // Parse provinceId as a number
  province_id = parseInt(province_id);
  
  try {
    const cities = await CityModel.find({ province_id: province_id });
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
