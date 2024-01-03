const { MongoClient } = require("mongodb");
const { createApp } = require("./cleanData");

const url = process.env.MONGO_URI;
if (!url) {
  console.error("Set the MONGO_URI environment variable to your MongoDB connection string.");
  process.exit(1);
}
const dbName = "cluster0";

(async () => {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();

    const port = process.env.PORT || 8080;
    createApp(client.db(dbName)).listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
