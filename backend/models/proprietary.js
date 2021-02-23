const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProprietarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Word processor',
        'Graphic design',
        'Video editing',
        'Spreadsheet',
        'Presentation',
        'Web browser',
        'Email client',
        'Media player',
        'Messaging',
        'Password manager',
        'Video conferencing',
      ],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Proprietary', ProprietarySchema);
