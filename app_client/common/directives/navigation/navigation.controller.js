(function () {

  angular
    .module('nightlifeApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location']; // 'authentication'
  function navigationCtrl($location) {
    var vm = this;

    vm.currentPath = $location.path();

    // vm.isLoggedIn = authentication.isLoggedIn();

    // vm.currentUser = authentication.currentUser();

   // .logout = function() {
   // authentication.logout();
   // $location.path('/');
   // 

  }
})();