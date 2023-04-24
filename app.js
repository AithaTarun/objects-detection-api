const express = require('express');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_DB_URL

mongoose.connect
(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then
(
  ()=>
  {
    console.log("Connected to database")
  }
).catch
(
  (e)=>
  {
    console.log("Connection to database failed", e);
  }
);

app.use
(
  express.json()
);

try
{
  app.use(cors({
  origin: ['http://localhost', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
}
catch (e)
{
  console.log("Error occurred :", e)
}

const userRoutes = require('./routes/user');
app.use("/api/user", userRoutes);

const predictionRoutes = require('./routes/prediction');
app.use("/api/prediction", predictionRoutes);

const reviewRoutes = require('./routes/review');
app.use("/api/review", reviewRoutes);

module.exports = app;
