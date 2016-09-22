(function () {

  angular
    .module('nightlifeApp')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, $location, authentication, nightlifeData) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Nightlife'
    };

    vm.credentials = {
      email : "",
      password : ""
    };
    
    vm.returnPage = $location.search().page || '/';
    
    vm.lastSearch = $location.search().search;

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.path(vm.returnPage);
        })
    };
  }

})();