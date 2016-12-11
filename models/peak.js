
var mongoose = require('mongoose');

var PeakSchema = new mongoose.Schema({
  summitted:      { type: Boolean, required: true },
  name:           { type: String,  required: true },
  latitude:       Number,
  longitude:      Number,
  coords:         [ Number, Number ],
  elevation:      Number,
  date:           String,      //figure out how to format date
  notes:          String
  // img:      //how do i upload image
  },
  { timestamps: true }  // createdAt, updatedAt
);

// function date2String(date) {
//   var options = {
//     weekday: 'long', year: 'numeric', month: 'short',
//     day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
//   };
//   return date.toLocaleDateString('en-US', options);
// }
//
// PeakSchema.methods.getCreatedAt = function() {
//   return date2String(this.createdAt);
// };
//
// PeakSchema.methods.getUpdatedAt = function() {
//   return date2String(this.updatedAt);
// };

module.exports = mongoose.model('Peak', PeakSchema);
