var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var path = require('path');

/* GET pages. */
router.get('/', function(req, res, next) {
  if (req.session.userID != null) {
      res.sendFile('index.html', { root: path.join(__dirname, '../views') });
  } else {
    res.redirect('/login');
  }
});

router.get('/config', function(req, res, next) {
  res.sendFile('config.html', { root: path.join(__dirname, '../views') });
});

router.get('/login', function(req, res){
  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
});

router.get('/logout', function(req, res){
  req.session.userID = null;
  res.redirect('/');
});

router.get('/api/getUserData', function(req,res){
  User.findByID(session.userID, function(err, user){
    res.json(user)
  });
});

/* POST pages. */
router.post('/api/login', function(req, res, next){
  User.find({username: req.body.username},function (error, user){
    if (error){
      console.log(error);
    } else{
      if(user.length > 0){
        req.session.userID = user[0]._id;
        res.send("done")
      } else{
        var newUser = new User({
          username: req.body.username
        });
        newUser.save(function(err,data){
          if (err) {res.status(500).send('Error when saving new user to db')}
          req.session.userID = data._id
          res.send("done")
        });
      }
    }
  });
})

router.post('/api/update', function(req, res, next) {
  console.log("halllooo");
  var zipcode = req.body.zipcode;
  var preferences = req.body.preferences;
  var id = req.session.userID;
  req.session.zipcode = req.body.zipcode;

  User.findByIdAndUpdate(id, {$set: {zipcode: zipcode, preferences: preferences }}, {upsert:false},function (err, user) {
    if (err) return res.status(500).
      send('An error occurred when updating the topic.')
    User.find(function (err, users) {res.json(users)});
  })
});

module.exports = router;
