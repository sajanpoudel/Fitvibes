const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://miyannishar786:miyannishar786@cluster0.ynel6uq.mongodb.net/cluster0'; // Update with your database name
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const cors = require('cors');
app.use(cors());


app.get('/api/activity', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('cluster0'); // Update with your database name
    const collection = database.collection('activity');
    const data = await collection.find({}).toArray();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error retrieving activity data:', error);
    res.status(500).send('Internal Server Error');
  } 
});

app.get('/api/body', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('cluster0'); // Update with your database name
    const collection = database.collection('body');
    const data = await collection.find({}).toArray();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error retrieving activity data:', error);
    res.status(500).send('Internal Server Error');
  } 
});

app.get('/api/daily', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('cluster0'); // Update with your database name
    const collection = database.collection('daily');
    const data = await collection.find({}).toArray();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error retrieving activity data:', error);
    res.status(500).send('Internal Server Error');
  } 
});

app.get('/api/sleep', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('cluster0'); // Update with your database name
    const collection = database.collection('sleep');
    const data = await collection.find({}).toArray();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error retrieving activity data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
