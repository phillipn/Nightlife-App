var mongoose = require('mongoose');
var Yelp = require('yelp');
var Loc = mongoose.model('Location');
var asyncLoop = require('node-async-loop');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

function saveAll(businesses, callback) {

  // a count for completed operations, and save all errors
  var info = businesses;
  var count = 0,
    errors = [],
    people = [];
  if (businesses.length === 0) {
    return callback();
    
  } else {
    for (var i = 0; i < businesses.length; i++) {
      people[i] = new Loc({name: businesses[i].name})
      people[i].save(function(err, success){
        count++;
      })
    }
    if (count === businesses.length) {
      sendJSONresponse(res, 200, info);
    }
  }
};

/* GET list of locations */
module.exports.locationListByCity = function(req, res) {
  var city = req.query.city;
  var info;
  var yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api 
  yelp.search({ limit: 20, location: city, sort: 2 })
    .then(function (data) {
      info = data;
      sendJSONresponse(res, 200, info);
      saveAll(info.businesses);
    })
    .catch(function (err) {
      console.error(err);
    });
};

module.exports.goingToLoc = function(req, res) {
  var locName = req.params.location;
  Loc.findOne({ name : locName }).exec(function(err, location) {
    if (!location) {
      console.log(req);
      Loc.create({
        name: locName,
        peopleGoing: 1
      }, function(err, location) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(location);
          sendJSONresponse(res, 201, location);
        }
      });
    } else {
      location.peopleGoing += 1;
      location.save(function(err, location) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, location);
        }
      });
    }
  })
}

module.exports.addPeopleGoing = function(req, res, data){
  console.log(data);
}