var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  address: String,
  state_code: String, 
  city: String,
  country_code: String
})

var locationSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review_count: Number,
  image_url: String,
  mobile_url: String,
  peopleGoing: Number,
  location: [addressSchema]
});

mongoose.model('Location', locationSchema);