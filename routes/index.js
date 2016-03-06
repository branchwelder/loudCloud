var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');

/* GET pages. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.get('/config', function(req, res, next) {
  res.sendFile('config.html', { root: path.join(__dirname, '../views') });
});

router.post('/api/create', function(req, res, next) {
  //var name = req.body.name;
  var name = 'sadfjjsdfha';
  var location = req.body.location;
  var preferences = req.body.preferences;

  User.count({name: name}, function (err, count){
    if(count > 0)
      res.status(403).send('A user with that name already exists');
    else {
      User.create({ name: name, location:location, preferences:preferences }, function (err, topic) {
        if (err) return res.status(500).
          send('An error occurred when creating the new user.');
        User.find(function (err, users) {res.json(users)});
      });
    }
  });
});

router.post('/api/update', function(req, res, next) {
  var name = req.body.name;
  var location = req.body.location;
  var preferences = req.body.preferences;
  var id = req.params.id;

  User.findByIdAndUpdate(id, {$set: { name: name, location: location, preferences: preferences }}, {upsert:false},function (err, topic) {
    if (err) return res.status(500).
      send('An error occurred when updating the topic.');
    User.find(function (err, topics) {res.json(topics)});
  })
});

module.exports = router;
