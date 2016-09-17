(function () {

  angular.module('nightlifeApp', ['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/listingPage/listingPage.view.html',
        controller: 'listingCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('nightlifeApp')
    .config(['$routeProvider', config]);

})();