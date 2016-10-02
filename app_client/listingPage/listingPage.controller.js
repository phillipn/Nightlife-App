(function(){
  angular.module('nightlifeApp')
    .controller('listingCtrl', listingCtrl);

  function listingCtrl($location, nightlifeData, authentication){
    var vm = this;   
    
    vm.isLoggedIn = authentication.isLoggedIn();
    
    vm.currentUser = authentication.currentUser();
    
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
          var i;
          vm.loading = '';
          if(authentication.currentUser()){
            data.forEach(function(bar){
              bar.attending = false;
              bar.numberOfPeople = bar.peopleGoing.length;
              for (i = 0; i < bar.numberOfPeople; i++) {
                if (bar.peopleGoing[i].email ===  authentication.currentUser().email) {
                  bar.attending = true;
                  break;
                }
              }
            })
          } else {
            data.forEach(function(bar){
              bar.numberOfPeople = bar.peopleGoing.length;
            })
          }
          vm.bars = data;
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
    
    vm.expandAttendees=function(bar){
      if(bar.numberOfPeople === 0){
        return false;
      } else {
        bar.clicked = !bar.clicked;
      }
    }
    

    vm.going = function(bar){
      if(vm.isLoggedIn && bar.attending === false){
        bar.clicked = false;
        bar.attending = true;
        bar.numberOfPeople += + 1;
        
        nightlifeData.goingToLocation(bar)
          .success(function (data) {
            bar.peopleGoing = data.peopleGoing;
          })
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
        bar.clicked = false;
        bar.attending = false;
        bar.numberOfPeople -= 1;
        
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