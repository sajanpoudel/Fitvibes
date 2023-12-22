const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const url = process.env.MONGO_URI;
if (!url) {
  console.error("Set the MONGO_URI environment variable to your MongoDB connection string.");
  process.exit(1);
}
const dbName = "cluster0";

// Which fields to keep from each collection. The results are merged in this
// order, so a later collection wins when two of them share a key.
const projections = [
  [
    "daily",
    {
      "calories_data.total_burned_calories": 1,
      "work_data.work_kilojoules": 1,
      "movement_data.max_speed_meters_per_second": 1,
      "strain_data.strain_level": 1,
      "metadata.summary": 1,
    },
  ],
  [
    "activity",
    {
      "calories_data.total_burned_calories": 1,
      "work_data.work_kilojoules": 1,
      "movement_data.avg_speed_meters_per_second": 1,
      "heart_rate.summary.max_hr_bpm": 1,
      "metadata.summary": 1,
    },
  ],
  [
    "body",
    {
      "hydration_data.day_total_water_consumption_ml": 1,
      "blood_pressure_data.blood_pressure_samples[0].diastolic_bp": 1,
      "blood_pressure_data.blood_pressure_samples[0].systolic_bp": 1,
      "heart_data.heart_rate_data.summary.avg_hr_bpm": 1,
      "temperature_data.body_temperature_samples[0].temperature_celsius": 1,
    },
  ],
  [
    "sleep",
    {
      "sleep_durations_data.awake.sleep_latency_seconds": 1,
      "sleep_durations_data.awake.wake_up_latency_seconds": 1,
      "sleep_durations_data.awake.num_wakeup_events": 1,
      "sleep_durations_data.asleep.duration_light_sleep_state_seconds": 1,
      "sleep_durations_data.asleep.duration_REM_sleep_state_seconds": 1,
      "sleep_durations_data.asleep.duration_asleep_state_seconds": 1,
      "sleep_durations_data.duration_deep_sleep_state_seconds": 1,
      "metadata.summary": 1,
    },
  ],
];

(async () => {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);

    app.get("/api/cleanData", async (req, res) => {
      try {
        const merged = {};
        for (const [collectionName, projection] of projections) {
          const document = await db.collection(collectionName).findOne(
            {},
            {
              projection: { ...projection, _id: 0 }, // exclude the _id field
            }
          );
          Object.assign(merged, document);
        }
        res.json(merged);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
