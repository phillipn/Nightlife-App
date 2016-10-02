(function () {

  angular
    .module('nightlifeApp')
    .filter('contactList', contactList);

  function contactList () {
    return function (contact) {
      return contact["name"] + ' - ' + contact["email"];
    }
  }


})();