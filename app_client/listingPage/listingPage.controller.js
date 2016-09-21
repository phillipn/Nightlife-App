(function(){
  angular.module('nightlifeApp')
    .controller('listingCtrl', listingCtrl);

  function listingCtrl(nightlifeData){
    var vm = this;   
    
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
      
      vm.loading = "Loading..."
      
      nightlifeData.locationsByCity(vm.formData)
        .success(function (data) {
          vm.loading = '';
          vm.businesses = data;
          console.log(data);
        })
        .error(function (data) {
          vm.message = "No spots found in this location";
          vm.loading = '';
        });
        return false;
    }
    
    vm.going = function(bar){
      bar.peopleGoing = bar.peopleGoing + 1;
      bar.disable = true;
      nightlifeData.goingToLocation(bar)
        .success(function (data) {
        })
        .error(function (err) {
          vm.message= err;
        }); 
      return false;
    }
  }
})();