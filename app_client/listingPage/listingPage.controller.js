(function(){
  angular.module('nightlifeApp')
    .controller('listingCtrl', listingCtrl);

  function listingCtrl(nightlifeData){
    var vm = this;
    vm.bar = 0;
    
    vm.onSubmit = function(){
      if(!vm.formData){
        vm.message = "You need to enter an city mang.";
        return false;
      }
      
      vm.loading = "Loading..."
      
      nightlifeData.locationsByCity(vm.formData)
        .success(function (data) {
          data.businesses.forEach(function(item, index){
            if(!item.peopleGoing){
              item.peopleGoing = 0;
            }
          })
            vm.data = { locations: data };
        })
        .error(function (data) {
          vm.message= "API error...";
        });
    }
    
    vm.going = function(bar){
      nightlifeData.goingToLocation(bar)
        .success(function (data) {
          console.log(data);
          data.locations.peopleGoing += 1;
        })
        .error(function (err) {
          vm.message= err;
        });
      
      return false;
    }
  }
})();