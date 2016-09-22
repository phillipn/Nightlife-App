(function() {

  angular
    .module('nightlifeApp')
    .service('nightlifeData', nightlifeData);

  function nightlifeData ($http, authentication) {
    var locationsByCity = function (city) {
      return $http.get('/api/locations?city=' + city);
    }
    var goingToLocation = function(bar) {
      return $http.post('/api/locations/going', bar, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }
    var notGoingToLocation = function(bar) {
      return $http.post('/api/locations/notgoing', bar, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }
    
    return {
      locationsByCity : locationsByCity,
      goingToLocation : goingToLocation,
      notGoingToLocation : notGoingToLocation
    };
  }

})();