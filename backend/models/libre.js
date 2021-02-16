const mongoose = require('mongoose');

const { Schema } = mongoose;

const libreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Libre', libreSchema);
