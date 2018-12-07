(function(){
  'use strict';

  angular.module('Common')
         .config(CommonRoutesConfig);

  CommonRoutesConfig.$inject = ['$stateProvider','$httpProvider'];

  function CommonRoutesConfig($stateProvider,$httpProvider) {
    $httpProvider.interceptors.push('loadingHttpInterceptor');
    $httpProvider.interceptors.push('authHttpInterceptor');
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    // $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home',{
          abstract: true,
          templateUrl: 'src/common/template/common.html'
        })
        .state('home.login',{
          url:'/login',
          templateUrl: 'src/common/template/login.html',
          controller: 'Login',
          controllerAs: '$ctrl',
          params:{
            toState: null,
            toParams: null
          }
        })
        .state('home.change-password',{
          url:'/changepassword',
          templateUrl: 'src/common/template/forgot-password.html',
          controller: 'PasswordController as pc'
        });
  }
})();
