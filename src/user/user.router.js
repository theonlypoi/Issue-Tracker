(function() {
  'use strict';

  angular.module('User')
         .config(UserRoutesConfig);

  UserRoutesConfig.$inject = ['$stateProvider'];

  function UserRoutesConfig($stateProvider) {
    $stateProvider
      .state('user',{
        abstract: true,
        templateUrl: 'src/user/home/home.html',
        resolve: {
          assignedIssues: ['UserService',function(UserService) {
            return UserService.getIssueDetails();
          }],
          status: ['UserService',function(UserService) {
            return UserService.getStatus();
          }]
        }
      })
      .state('user.dashboard',{
        url: '/user/dashboard',
        templateUrl: 'src/user/tables.html',
        controller: 'DashboardController',
        controllerAs: 'DashboardCtrl'
      })
      .state('user.issue',{
        url: '/user/issue/{id}',
        templateUrl: 'src/user/issueDetail.html',
        controller: 'ProjectController',
        controllerAs: 'ProjectCtrl'
      })
      .state('user.projects',{
        url: '/user/projects',
        templateUrl: 'src/user/project/project-detail.html',
        controller: 'ProjectDetailController as pdc',
        resolve: {
          projects: ['UserService',function(UserService) {
            return UserService.getProjectList();
          }]
        }
      });
  }
})();
