const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const API_PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`));
