var mongoose = require('mongoose');
var Yelp = require('yelp');
var Loc = mongoose.model('Location');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var parseDb = function(businesses, callback) {
  var lookup = 0;
  var arr = [];
  businesses.forEach(function(business) {
    Loc.findOne({ name: business.name }).exec(function (err, record) {
      if(err){ console.log(err); }
      if(record){
        arr.push(record);
      } else {
        arr.push({
          name: business.name, 
          rating: business.rating,
          review_count: business.review_count,  
          image_url: business.image_url, 
          mobile_url: business.mobile_url, 
          location:{ 
            address: business.location.address, 
            city: business.location.city, 
            state_code: business.location.state_code, 
            country_code: business.location.country_code
          }, 
          peopleGoing: []});
      }
      if (++lookup == businesses.length){ callback(arr); }
    });
  });
}

/* GET list of locations */
module.exports.locationListByCity = function(req, res) {
  var city = req.query.city;
  var yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
  });

  yelp.search({ limit: 20, term: 'bar', location: city, sort: 2 })
    .then(function (data) {
      parseDb(data.businesses, function(arr){
        sendJSONresponse(res, 200, arr);
      })
    }) 
    .catch(function (err) {
      sendJSONresponse(res, 400, err);
    });
};

module.exports.notGoingToLoc = function(req, res) {
  var barInfo = req.body;
  Loc.findOne({ name : barInfo.name }).exec(function(err, location) {
    if(!location){
      sendJSONresponse(res, 404, err);
    } else {
      var index = location.peopleGoing.indexOf(req.payload.email);
      if(index == -1){
        sendJSONresponse(res, 404, err);
      } else {
        location.peopleGoing.splice(index, 1);
        location.save(function(err, location) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, location);
          }
        });
      }
    }
  })
}

module.exports.goingToLoc = function(req, res) {
  var barInfo = req.body;
  Loc.findOne({ name : barInfo.name }).exec(function(err, location) {
    if (!location) {
      Loc.create({
        name: barInfo.name, 
        rating: barInfo.rating, 
        image_url: barInfo.image_url, 
        mobile_url: barInfo.mobile_url, 
        location: {address: barInfo.location.address, city: barInfo.location.city, state_code: barInfo.location.state_code, country_code: barInfo.location.country_code}, 
        peopleGoing: [req.payload.email]
      }, function(err, location) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          sendJSONresponse(res, 201, location);
        }
      });
    } else {
      location.peopleGoing.push(req.payload.email);
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