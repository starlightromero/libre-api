const mongoose = require('mongoose');

const { Schema } = mongoose;

const proprietarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Proprietary', proprietarySchema);
