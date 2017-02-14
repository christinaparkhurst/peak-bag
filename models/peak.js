
var mongoose = require('mongoose');

var PeakSchema = new mongoose.Schema({
  summitted:      { type: Boolean, required: true },
  name:           { type: String,  required: true },
  latitude:       Number,
  longitude:      Number,
  coords:         { type: [Number] },
  elevation:      Number,
  date:           String,
  notes:          String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Peak', PeakSchema);
