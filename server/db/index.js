const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(`DB Connection Error: ${error.message}`));

const db = mongoose.connection;

module.exports = db;
