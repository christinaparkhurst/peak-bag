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
  // get all the todos and render the index view
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
    title: '',          //update
    completed: false    //update
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
    title: req.body.title,            //update
    completed: req.body.completed ? true : false      //update
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
    peak.title = req.body.title;
    peak.completed = req.body.completed ? true : false;
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
