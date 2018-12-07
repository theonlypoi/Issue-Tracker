(function(){
    /* global angular */
    'use strict';
    angular.module('Common')
           .controller('Login',Login);

    Login.$inject = ['$log','$state','LoginService','CurrentUserService','$location','$timeout'];
    function Login($log,$state,LoginService,CurrentUserService,$location,$timeout) {
        var $ctrl = this;

        $ctrl.email = "";
        $ctrl.password = "";
        $ctrl.error = "";

        $ctrl.login = function() {
            LoginService.login($ctrl.email,$ctrl.password)
                        .then(function(res){
                          CurrentUserService.saveToken(res.isAdmin,res.token,res.id);

                          if(!res.isAdmin) {
                            // $log.info("Going to user dashboard");
                            $state.go('user.dashboard');
                          }
                          else {
                            // $log.info("Going to admin dashboard");
                            $state.go('admin.dashboard');
                          }
                        },
                        function(err) {
                          $ctrl.error = 'Invalid login and/or password';
                        });
        }
    }
})();
