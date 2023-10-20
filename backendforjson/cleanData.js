const express = require("express");
const cors = require("cors");

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

// Reads one document from every collection, keeps the projected fields and merges them.
async function buildCleanData(db) {
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
  return merged;
}

function createApp(db) {
  const app = express();
  app.use(cors());
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.get("/api/cleanData", async (req, res) => {
    try {
      res.json(await buildCleanData(db));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  return app;
}

module.exports = { createApp, buildCleanData, projections };
