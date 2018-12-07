(function() {
  angular.module('Common')
         .factory('authHttpInterceptor',authHttpInterceptor);

  authHttpInterceptor.$inject = ['CurrentUserService','$q','$location'];

  function authHttpInterceptor(CurrentUserService,$q,$location) {
    return {
      request: function(config) {
        if(CurrentUserService.isAuthenticated()){
          console.log(config);
          config.headers['x-access-token'] = CurrentUserService.getToken();
        }
        return config;
      },
      responseError: function(err) {
        console.log("Response Error:",err);
        if(err.status !== undefined) {
          $location.path('/login')
        }
        return $q.reject(err);
      }
    }
  }
})();
