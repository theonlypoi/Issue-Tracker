(function() {
  'use strict';
  angular.module('Common',['ui.router','ngStorage'])
         .constant('ApiBasePath','http://localhost:3000')
         .run(run);

  run.$inject = ['$rootScope','AuthRedirectorService'];

  function run($rootScope,AuthRedirectorService) {
    $rootScope.$on('$stateChangeStart',AuthRedirectorService.onStateChangeStart);
  }
})();
