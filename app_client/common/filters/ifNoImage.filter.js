(function(){
 
  angular
    .module('nightlifeApp')
    .filter('ifNoImage', ifNoImage);
  
  function ifNoImage(){
    return function(yelpImage){
      if(!yelpImage){
        return '/images/no_image.svg';
      } else {
        return yelpImage;
      }
    }
  }
})();