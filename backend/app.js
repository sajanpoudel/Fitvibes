const express = require("express");
const cors = require("cors");

const COLLECTIONS = ["activity", "body", "daily", "sleep"];

// Builds the express app. getCollection(name) must return an object with find({}).toArray().
// Keeping the database behind this function lets the routes be tested without MongoDB.
function createApp(getCollection) {
  const app = express();
  app.use(cors());

  COLLECTIONS.forEach((name) =>
    app.get(`/api/${name}`, async (req, res) => {
      try {
        const data = await getCollection(name).find({}).toArray();
        res.json(data);
      } catch (error) {
        console.error(`Error retrieving ${name} data:`, error);
        res.status(500).send("Internal Server Error");
      }
    })
  );

  return app;
}

module.exports = { createApp, COLLECTIONS };
