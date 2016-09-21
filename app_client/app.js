(function () {

  angular.module('nightlifeApp', ['ngRoute', 'ngSanitize']);

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/listingPage/listingPage.view.html',
        controller: 'listingCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/aboutPage/aboutPage.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('nightlifeApp')
    .config(['$routeProvider', config]);

})();