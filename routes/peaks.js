var express = require('express');
var router = express.Router();
var Peak = require('../models/peak');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

//helper method to redirect user if not authenticated
function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
// router.get('/', authenticate, function(req, res, next) {
//   // get all the peaks and render the index view
//   Peak.find({}).sort({ createdAt: -1})
//   .then(function(peaks) {
//     res.render('peaks/index', { peaks: peaks } );
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });

router.get('/', authenticate, function(req, res, next) {
  var peaks = global.currentUser.peaks;
  let allPeaksAsString = '[' +
    peaks.map(peak => {
      return "['" + peak.name + "', " + peak.latitude + ', ' + peak.longitude + ']';
  }).join(',') + ']';
  res.render('peaks/index', { peaks: peaks, allPeaksAsString, message: req.flash() });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var peak = {
    name: '',
    summitted: '',
    latitude: '',
    longitude: '',
    // coords: '',
    elevation: '',
    date: '',
    notes: ''
  };
  res.render('peaks/new', { peak: peak, message: req.flash() } );
});

// SHOW
// router.get('/:id', function(req, res, next) {
//   Peak.findById(req.params.id)
//   .then(function(peak) {
//     if (!peak) return next(makeError(res, 'Document not found', 404));
//     res.render('peaks/show', { peak: peak });
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });

router.get('/:id', authenticate, function(req, res, next) {
  var peak = currentUser.peaks.id(req.params.id);
  if (!peak) return next(makeError(res, 'Document not found', 404));
  res.render('peaks/show', { peak: peak, message: req.flash() });
});


// CREATE
// router.post('/', function(req, res, next) {
//   var peak = new Peak({
//     name: req.body.name,
//     summitted: req.body.summitted ? true : false,
//     latitude: req.body.latitude,
//     longitude: req.body.longitude,
//     elevation: req.body.elevation,
//     date: req.body.date,
//     notes: req.body.notes
//   });
//   peak.save()
//   .then(function(saved) {
//     res.redirect('/peaks');
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });
router.post('/', authenticate, function(req, res, next) {
  var peak = new Peak({
    name: req.body.name,
    summitted: req.body.summitted ? true : false,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    // coords: req.body.coords,
    elevation: req.body.elevation,
    date: req.body.date,
    notes: req.body.notes
  });
  currentUser.peaks.push(peak);
  currentUser.save()
  .then(function() {
    res.redirect('/peaks');
  }, function(err){
    return next(err);
  });
});


// EDIT
// router.get('/:id/edit', function(req, res, next) {
//   Peak.findById(req.params.id)
//   .then(function(peak) {
//     if (!peak) return next(makeError(res, 'Document not found', 404));
//     res.render('peaks/edit', { peak: peak });
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });
router.get('/:id/edit', authenticate, function(req, res, next) {
  var peak = currentUser.peaks.id(req.params.id);
  if (!peak) return next(makeError(res, 'Document not found', 404));
  res.render('peaks/edit', { peak: peak, message: req.flash() });
});



// UPDATE
// router.put('/:id', function(req, res, next) {
//   Peak.findById(req.params.id)
//   .then(function(peak) {
//     if (!peak) return next(makeError(res, 'Document not found', 404));
//     peak.name = req.body.name;
//     peak.summitted = req.body.summitted ? true : false;
//     peak.latitude = req.body.latitude;
//     peak.longitude = req.body.longitude;
//     peak.elevation = req.body.elevation;
//     peak.date = req.body.date;
//     peak.notes = req.body.notes;
//     return peak.save();
//   })
//   .then(function(saved) {
//     res.redirect('/peaks');
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });
router.put('/:id', authenticate, function(req, res, next) {
  var peak = currentUser.peaks.id(req.params.id);
  if (!peak) return next(makeError(res, 'Document not found', 404));
  else {
    peak.name = req.body.name;
    peak.summitted = req.body.summitted ? true : false;
    peak.latitude = req.body.latitude;
    peak.longitude = req.body.longitude;
    // peak.coords = req.peak.coords;
    peak.elevation = req.body.elevation;
    peak.date = req.body.date;
    peak.notes = req.body.notes;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/peaks');
    }, function(err) {
    return next(err);
    });
  }
});

// DESTROY
// router.delete('/:id', function(req, res, next) {
//   Peak.findByIdAndRemove(req.params.id)
//   .then(function() {
//     res.redirect('/peaks');
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });
router.delete('/:id', authenticate, function(req, res, next) {
  var peak = currentUser.peaks.id(req.params.id);
  if (!peak) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.peaks.indexOf(peak);
  currentUser.peaks.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/peaks');
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
