(function () {

  angular
    .module('nightlifeApp')
    .filter('formatDistance', formatDistance);

  var _isNumeric = function (n) {
    !!parseFloat(n);
  };

  function formatDistance () {
    return function (addressArray) {
      if(!addressArray || addressArray.length === 0){
        return "";
      }
      
      var l = addressArray.length;
      
      for(var i=0; i<l; i++){
        if (_isNumeric(addressArray[i])) {
          return addressArray[i] + ',';
        }
      }
      return addressArray[0] + ',';
    };
  }


})();