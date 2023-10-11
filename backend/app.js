const express = require("express");
const cors = require("cors");

const COLLECTIONS = ["activity", "body", "daily", "sleep"];
const MAX_LIMIT = 1000;

// Reads the optional ?limit= query value: a whole number from 1 to MAX_LIMIT, otherwise no limit.
function parseLimit(value) {
  const number = Number.parseInt(value, 10);
  if (!Number.isInteger(number) || number < 1) return undefined;
  return Math.min(number, MAX_LIMIT);
}

// Builds the express app. getCollection(name) must return an object with find({}).toArray().
// Keeping the database behind this function lets the routes be tested without MongoDB.
function createApp(getCollection) {
  const app = express();
  app.use(cors());

  // A cheap route for monitors and load balancers. It does not touch the database.
  app.get("/api/health", (req, res) => res.json({ status: "ok", collections: COLLECTIONS }));

  COLLECTIONS.forEach((name) =>
    app.get(`/api/${name}`, async (req, res) => {
      try {
        const limit = parseLimit(req.query.limit);
        const data = await getCollection(name).find({}, limit ? { limit } : {}).toArray();
        res.json(data);
      } catch (error) {
        console.error(`Error retrieving ${name} data:`, error);
        res.status(500).send("Internal Server Error");
      }
    })
  );

  return app;
}

module.exports = { createApp, parseLimit, COLLECTIONS, MAX_LIMIT };
