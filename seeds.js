var mongoose = require('mongoose');
var Peak = require('./models/peak');

mongoose.connect('mongodb://localhost/peaks');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old peaks...');
Peak.remove({})
.then(function() {
  console.log('old peaks removed');
  console.log('creating some new peaks...');
  var halfDome  = new Peak({ name: 'Half Dome',    summitted: true });
  return Peak.create(halfDome);
})
.then(function(savedPeaks) {
  console.log('Just saved', savedPeaks.length, 'peaks.');
  return Peak.find({});
})
.then(function(allPeaks) {
  console.log('Printing all peaks:');
  allPeaks.forEach(function(peak) {
    console.log(peak);
  });
  return Peak.findOne({name: 'Half Dome'});
})
.then(function(halfDome) {
  halfDome.completed = true;
  return halfDome.save();
})
.then(function(halfDome) {
  console.log('updated Half Dome:', halfDome);
  return halfDome.remove();
})
.then(function(deleted) {
  return Peak.find({});
})
.then(function(allPeaks) {
  console.log('Printing all peaks:');
  allPeaks.forEach(function(peak) {
    console.log(peak);
  });
  quit();
});
