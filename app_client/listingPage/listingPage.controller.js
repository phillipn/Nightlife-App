(function(){
  angular.module('nightlifeApp')
    .controller('listingCtrl', listingCtrl);

  function listingCtrl($location, nightlifeData, authentication){
    var vm = this;   
    
    vm.isLoggedIn = authentication.isLoggedIn();
    
    vm.currentPath = $location.path();
    
    vm.pageHeader = {
      title: "Nightlife",
      strapline: "Where you at bro?"
    }
    
    vm.onSubmit = function(){
      vm.message = '';
      if(!vm.formData){
        vm.message = "You need to enter an city mang.";
        return false;
      }
      vm.loading = "Loading...";
      
      nightlifeData.locationsByCity(vm.formData)
        .success(function (data) {
          vm.loading = '';
          if(authentication.currentUser()){
            data.forEach(function(bar){
              if(bar.peopleGoing.indexOf(authentication.currentUser().email) === -1){
                bar.attending = false;
              } else {
                bar.attending = true;
              }
            })
          }
          vm.businesses = data;
        })
        .error(function (data) {
          vm.message = "No spots found in this location";
          vm.loading = '';
        });
        return false;
    }
    
    vm.lastSearch = $location.search().search; 
    
    if(vm.lastSearch){
      vm.formData = vm.lastSearch;
      vm.onSubmit();
    }

    vm.going = function(bar){
      if(vm.isLoggedIn && bar.attending === false){
        bar.attending = true;
        bar.peopleGoing.length += 1;
        
        nightlifeData.goingToLocation(bar)
          .error(function (err) {
            vm.message= err;
          }); 
      } else {
        vm.message = "Log in please";
        return false;
      }
      return false;
    }
    
    vm.notGoing = function(bar){
      if(vm.isLoggedIn && bar.attending === true){
        bar.attending = false;
        bar.peopleGoing.length -= 1;
  
        nightlifeData.notGoingToLocation(bar)
          .error(function (err) {
            vm.message= err;
          }); 
      } else {
        vm.message = "Log in please";
        return false;
      }
      return false;
    }
  }
})();