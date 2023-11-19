const { MongoClient } = require("mongodb");
const { createApp } = require("./app");

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("Set the MONGO_URI environment variable to your MongoDB connection string.");
  process.exit(1);
}
const DB_NAME = "cluster0"; // Update with your database name
const PORT = process.env.PORT || 5000;

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// The collection is looked up on every request, after the client has connected once.
const app = createApp((name) => ({
  find: (query, options) => ({
    toArray: async () => {
      await client.connect();
      return client.db(DB_NAME).collection(name).find(query, options).toArray();
    },
  }),
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
