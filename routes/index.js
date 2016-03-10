var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var path = require('path');
var request = require('request');
var parse = require('../utils/parseWeatherCode.js');
var config = require('../auth.js');
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
  clientId : config.spotify.clientID,
  clientSecret : config.spotify.clientSecret,
  redirectUri : 'localhost:3000/callback'
});

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

router.get('/api/getUserData', function(req, res){
  User.find({ _id : req.session.userID }, function(err, user){
    console.log(user);
    res.json(user)
  });
});

router.get('/api/queryAPI', function(req, res){
  var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + req.session.zipcode + "&APPID=7df611ce3dfb9dd777f9f9816d8810c7";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      console.log(data.weather[0].id)
      var weather = parse(data.weather[0].id)
      console.log("local weather: "+ weather)
      res.json(weather);
    } else{console.log("weather zipcode lookup error: " + error)}
  })
});

/* POST pages. */
router.post('/api/login', function(req, res, next){
  User.findOne({username: req.body.username},function (error, user){
    if (error){
      console.log(error);
    } else{
      if(user != undefined){
        console.log(user)
        req.session.userID = user._id;
        req.session.zipcode = user.zipcode;
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
