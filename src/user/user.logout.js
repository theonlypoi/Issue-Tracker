(function() {
  'use strict';
  angular.module('User')
         .controller('Logout',Logout);

  Logout.$inject = ['CurrentUserService','LoginService','$log','$location'];

  function Logout(CurrentUserService,LoginService,$log,$location) {
    var $ctrl = this;

    $ctrl.logout  = function() {
      if(CurrentUserService.isAuthenticated()){
        LoginService.logout()
                    .then(function(res) {
                        CurrentUserService.destroyToken();
                        $log.info(res);
                        $location.path('/login');
                    },
                    function(err){
                      $log.info(err);
                    });
      }
    }
  }
})();
