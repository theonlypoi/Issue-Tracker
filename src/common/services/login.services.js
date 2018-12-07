(function() {
  angular.module('Common')
         .service('LoginService',LoginService);

  LoginService.$inject = ['ApiBasePath','$http'];

  function LoginService(ApiBasePath,$http){
    var service = this;

    service.login = function(email,password) {

      var params = {
        email: email,
        password: password
      }
      return $http.post(ApiBasePath + '/login',params)
                  .then(function(response) {
                      return response.data;
                  });
    };

    service.logout = function() {
      return $http.get(ApiBasePath + '/logout')
                  .then(function(response){
                    return response.data;
                  });
    }
  }
})();
