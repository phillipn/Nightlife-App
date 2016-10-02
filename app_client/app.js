(function () {

  angular.module('nightlifeApp', ['ngRoute', 'ngSanitize', 'ngAnimate']);

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
      .when('/register', {
       templateUrl: '/auth/register/register.view.html',
       controller: 'registerCtrl',
       controllerAs: 'vm'
     })
     .when('/login', {
       templateUrl: '/auth/login/login.view.html',
       controller: 'loginCtrl',
       controllerAs: 'vm'
     })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('nightlifeApp')
    .config(['$routeProvider', config]);

})();