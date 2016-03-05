var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var User = mongoose.Schema({
    name: String,
    location: Array,
    preferences: Object
});

module.exports = mongoose.model("User", User);
