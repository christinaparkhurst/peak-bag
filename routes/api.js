// var express = require('express');
// var Peak = require('../models/peak.js');
// var passport = require('passport');
// var router = express.Router();
//
// exports.post = function(req, res) {
//     var peak = new Peak({name: req.body.name, longitude: req.body.longitude, latitude: req.body.latitude});
//     peak.save(function (err) {
//         if (err) throw err;
//         console.log('Task saved.');
//
//         res.send('Peak saved.');
//     });
// };
//
// exports.save = function(req, res) {
//     var peak = new Peak({name: req.params.name, longitude: req.params.longitude, latitude: req.params.latitude});
//     peak.save(function (err) {
//         if (err) throw err;
//         console.log('Peak saved.');
//
//         res.send('Peak saved.');
//     });
// };
//
// exports.list = function(req, res) {
//     Peak.find(function(err, peak) {
// 	res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
//         res.send(req.query["callback"] + '({"records":' +  JSON.stringify(peak) + '});');
//     });
// };
//
// exports.show = (function(req, res) {
//     Peak.findOne({name: req.params.name}, function(error, peak) {
//         res.send([{Peak: peak}]);
//     });
// });
//
// exports.near = function(req, res) {
//     Peak.find({coords : { $near : [req.params.lon, req.params.lat], $maxDistance : req.params.dist/68.91}}, function (error, peak) {
//         res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
//         res.send(req.query["callback"] +'({"records":' + JSON.stringify(peak) + '});');
//     });
// };
//
// module.exports = router;
