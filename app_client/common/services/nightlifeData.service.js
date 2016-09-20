(function() {

  angular
    .module('nightlifeApp')
    .service('nightlifeData', nightlifeData);

  function nightlifeData ($http) {
    var locationsByCity = function (city) {
      return $http.get('/api/locations?city=' + city);
    }
    var goingToLocation = function(locName) {
      return $http.post('/api/locations/' + locName);
    }
    
    return {
      locationsByCity : locationsByCity,
      goingToLocation : goingToLocation
    };
  }

})();