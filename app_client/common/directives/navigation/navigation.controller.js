(function () {

  angular
    .module('nightlifeApp')
    .controller('navigationCtrl', navigationCtrl);

  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      $location.search('search', null);
      $location.path('/login');
    };

  }
})();