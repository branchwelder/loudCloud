var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var User = mongoose.Schema({
    username: String,
    zipcode: String,
    preferences: Object
});

module.exports = mongoose.model("User", User);
