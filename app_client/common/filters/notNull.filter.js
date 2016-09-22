(function(){
 
  angular
    .module('nightlifeApp')
    .filter('notNull', notNull);
  
  function notNull(){
    return function(value){
      if(!value){
        return '0';
      } else {
        return value;
      }
    }
  }
})();