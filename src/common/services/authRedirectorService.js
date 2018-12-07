(function() {
  'use angular';
  angular.module('Common')
         .service('AuthRedirectorService',AuthRedirectorService);

  AuthRedirectorService.$inject = ['$state','CurrentUserService'];

  function AuthRedirectorService($state,CurrentUserService) {
    var service = this;

    service.onStateChangeStart = function(event,toState,toParams,fromState,fromParams) {

      if(toState.name.indexOf('admin.') === 0 && !CurrentUserService.isAuthenticated()){
        event.preventDefault();
        $state.go('home.login',{
          'toState':toState,
          'toParams': toParams
        });
      };

      if(toState.name.indexOf('user.') === 0 && !CurrentUserService.isAuthenticated()){
        event.preventDefault();
        $state.go('home.login');
      };

    }
  }
})();
