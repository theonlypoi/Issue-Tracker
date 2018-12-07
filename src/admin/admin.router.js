(function() {
  'use strict';

  angular.module('User')
         .config(AdminRoutesConfig);

  AdminRoutesConfig.$inject = ['$stateProvider'];

  function AdminRoutesConfig($stateProvider) {
    $stateProvider
      .state('admin',{
        abstract: true,
        templateUrl: 'src/admin/home/home.html',
        resolve: {
          allIssues: ['AdminService',function(AdminService) {
            return AdminService.getAllIssues();
          }],
          status: ['AdminService',function(AdminService) {
            return AdminService.getStatus();
          }],
          priority: ['AdminService',function(AdminService) {
            return AdminService.getPriority();
          }],
          projects: ['AdminService',function(AdminService) {
            return AdminService.getProjects();
          }],
          users: ['AdminService',function(AdminService) {
            return AdminService.getUsers();
          }],
          userproject: ['AdminService',function(AdminService){
            return AdminService.getUserProject();
          }],
          issuetype: ['AdminService',function(AdminService){
            return AdminService.getIssueType();
          }]
        }
      })
      .state('admin.dashboard',{
        url: '/admin/dashboard',
        templateUrl: 'src/admin/dashboard.html',
        controller: 'AdminDashboardController',
        controllerAs: 'AdminDashboardCtrl'
      })
      .state('admin.assignment',{
        url: '/admin/assignment',
        templateUrl: 'src/admin/AssignIssue/AssignIssue.html',
        controller: 'IssueAssignmentController',
        controllerAs: 'iac'
      })
      .state('admin.edit',{
        url: '/admin/edit/{id}',
        templateUrl: 'src/admin/AssignIssue/EditIssue.html',
        controller: 'IssueEditController',
        controllerAs: 'iac'
      })
      .state('admin.project-detail',{
        url: '/admin/project-detail/{id}',
        templateUrl: 'src/admin/dashboard/project-view.html',
        controller: 'ProjectViewController as pvc'
      })
      .state('admin.register-project',{
        url: '/admin/register-project',
        templateUrl: 'src/admin/register/register-project.html',
        controller: 'RegisterProjectController as iac'
      })
      .state('admin.register-user',{
        url: '/admin/register-user',
        templateUrl: 'src/admin/register/register-user.html',
        controller: 'RegisterUserController as iac',
        resolve: {
          userrole: ['AdminService',function(AdminService){
            return AdminService.getUserRole();
          }]
        }
      })
      .state('admin.assign-project',{
          url: '/admin/assign-project',
          templateUrl: 'src/admin/AssignProject/assign.project.html',
          controller: 'AssignProjectController as iac'
      });
  }
})();
