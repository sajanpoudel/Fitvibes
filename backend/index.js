const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("Set the MONGO_URI environment variable to your MongoDB connection string.");
  process.exit(1);
}
const DB_NAME = "cluster0"; // Update with your database name
const PORT = process.env.PORT || 5000;
const COLLECTIONS = ["activity", "body", "daily", "sleep"];

const app = express();
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

// Builds a route handler that returns every document of one collection as JSON.
const sendCollection = (collectionName) => async (req, res) => {
  try {
    await client.connect();
    const data = await client.db(DB_NAME).collection(collectionName).find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(`Error retrieving ${collectionName} data:`, error);
    res.status(500).send("Internal Server Error");
  }
};

COLLECTIONS.forEach((name) => app.get(`/api/${name}`, sendCollection(name)));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
