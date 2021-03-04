const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
});

module.exports = mongoose.model('User', User);
