const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const eventRouter = require('./routes/event-router');

const app = express();
const API_PORT = 10080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('TODO: Admin panel');
});

app.use('/api', eventRouter);

app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`));
