const mongoose = require('mongoose');

const { Schema } = mongoose;

const LibreSchema = new Schema(
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
      required: false,
    },
    license: {
      type: String,
      enum: [
        'GPL-2.0', 'GPL-3.0', 'LGPL-2.0', 'LGPL-2.1', 'LGPL-3.0', 'MPL-2.0',
      ],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Libre', LibreSchema);
