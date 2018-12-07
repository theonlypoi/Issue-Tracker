(function () {
  /**
      In this function we will write methods to get the access token from the server and save that access token.
      Whenever we will request the server we have to provide the access token along with the request header.So we will
      provide a method to send the current user's access token to any service which is requiring it.
  */
    'use strict';

    angular.module('Common')
         .service('CurrentUserService', CurrentUserService);

    CurrentUserService.$inject = ['$localStorage'];

    function CurrentUserService($localStorage) {
        var service = this;
        var admin = false;
        var accessToken = undefined;

        service.storage = $localStorage;

        service.saveToken = function(isAdmin,accessToken,id) {
        service.storage.accessToken = accessToken;
        service.storage.admin = isAdmin;
        service.storage.id = id;
    };

    service.isAuthenticated = function() {
      if(service.storage.accessToken !== undefined) {
        return true;
      };
      return false;
    };

    service.isAdmin = function() {
      return service.storage.admin;
    };

    service.getToken = function() {
      return service.storage.accessToken;
    };

    service.getId = function() {
      return service.storage.id;
    }

    service.destroyToken = function() {
      $localStorage.$reset(); // clear everything in a single go
    };

  }
})();
