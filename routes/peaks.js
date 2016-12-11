var express = require('express');
var router = express.Router();
var Peak = require('../models/peak');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
router.get('/', function(req, res, next) {
  // get all the peaks and render the index view
  Peak.find({}).sort({ createdAt: -1})
  .then(function(peaks) {
    res.render('peaks/index', { peaks: peaks } );
  })
  .catch(function(err) {
    return next(err);
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var peak = {
    name: '',
    summitted: '',
    latitude: '',
    longitude: '',
    elevation: '',
    date: '',
    notes: ''
  };
  res.render('peaks/new', { peak: peak } );
});

// SHOW
router.get('/:id', function(req, res, next) {
  Peak.findById(req.params.id)
  .then(function(peak) {
    if (!peak) return next(makeError(res, 'Document not found', 404));
    res.render('peaks/show', { peak: peak });
  })
  .catch(function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', function(req, res, next) {
  var peak = new Peak({
    name: req.body.name,
    summitted: req.body.summitted ? true : false,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    elevation: req.body.elevation,
    date: req.body.date,
    notes: req.body.notes
  });
  peak.save()
  .then(function(saved) {
    res.redirect('/peaks');
  })
  .catch(function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  Peak.findById(req.params.id)
  .then(function(peak) {
    if (!peak) return next(makeError(res, 'Document not found', 404));
    res.render('peaks/edit', { peak: peak });
  })
  .catch(function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  Peak.findById(req.params.id)
  .then(function(peak) {
    if (!peak) return next(makeError(res, 'Document not found', 404));
    peak.name = req.body.name;
    peak.summitted = req.body.summitted ? true : false;
    peak.latitude = req.body.latitude;
    peak.longitude = req.body.longitude;
    peak.elevation = req.body.elevation;
    peak.date = req.body.date;
    peak.notes = req.body.notes;
    return peak.save();
  })
  .then(function(saved) {
    res.redirect('/peaks');
  })
  .catch(function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
  Peak.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/peaks');
  })
  .catch(function(err) {
    return next(err);
  });
});

module.exports = router;
