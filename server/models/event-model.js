const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

const { Schema } = mongoose;

const Event = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true },
    eventTimestamp: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('events', Event);
