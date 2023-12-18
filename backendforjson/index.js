const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


const url = 'mongodb+srv://miyannishar786:miyannishar786@cluster0.ynel6uq.mongodb.net/';
const dbName = 'cluster0';
const collectionName1 = 'daily';
const collectionName2 = 'activity';
const collectionName3 = 'body';
const collectionName4 = 'sleep';

(async () => {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);

    app.get('/api/cleanData', async (req, res) => {
      try {
        const collection1 = db.collection(collectionName1);
        const collection2 = db.collection(collectionName2);
        const collection3 = db.collection(collectionName3);
        const collection4 = db.collection(collectionName4);

        const data1 = await collection1.findOne({}, {
          projection: {
            'calories_data.total_burned_calories': 1,
            'work_data.work_kilojoules': 1,
            'movement_data.max_speed_meters_per_second': 1,
            'strain_data.strain_level': 1,
            'metadata.summary': 1,
            '_id': 0 // Exclude the _id field
          }
        });

        const data2 = await collection2.findOne({}, {
          projection: {
            'calories_data.total_burned_calories': 1,
            'work_data.work_kilojoules': 1,
            'movement_data.avg_speed_meters_per_second': 1,
            'heart_rate.summary.max_hr_bpm': 1,
            'metadata.summary': 1,
            '_id': 0 // Exclude the _id field
          }
        });

        const data3 = await collection3.findOne({}, {
          projection: {
            'hydration_data.day_total_water_consumption_ml': 1,
            'blood_pressure_data.blood_pressure_samples[0].diastolic_bp': 1,
            'blood_pressure_data.blood_pressure_samples[0].systolic_bp': 1,
            'heart_data.heart_rate_data.summary.avg_hr_bpm': 1,
            'temperature_data.body_temperature_samples[0].temperature_celsius': 1,
            '_id': 0 // Exclude the _id field
          }
        });

        const data4 = await collection4.findOne({}, {
          projection: {
            'sleep_durations_data.awake.sleep_latency_seconds': 1,
            'sleep_durations_data.awake.wake_up_latency_seconds': 1,
            'sleep_durations_data.awake.num_wakeup_events': 1,
            'sleep_durations_data.asleep.duration_light_sleep_state_seconds': 1,
            'sleep_durations_data.asleep.duration_REM_sleep_state_seconds': 1,
            'sleep_durations_data.asleep.duration_asleep_state_seconds': 1,
            'sleep_durations_data.duration_deep_sleep_state_seconds': 1,
            'metadata.summary': 1,
            '_id': 0 // Exclude the _id field
          }
        });

        res.json({
          ...data1,
          ...data2,
          ...data3,
          ...data4,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
      }
    });

    const port = 8080;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
