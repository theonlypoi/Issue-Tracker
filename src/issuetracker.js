(function () {
    /* global angular */
    'use strict';

    angular.module('IssueTracker', ['User', 'Admin'])
           .config(config);

    config.$inject = ['$urlRouterProvider'];

    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
    }
    
})();
