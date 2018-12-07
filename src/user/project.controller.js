(function() {
  'use strict';
  angular.module('User')
         .controller('ProjectController',ProjectController);

  ProjectController.$inject = ['$stateParams','assignedIssues','status','UserService','$state'];

  function ProjectController($stateParams,assignedIssues,$log,status,UserService,$state) {
    var ProjectCtrl = this;

    ProjectCtrl.project = assignedIssues.data[$stateParams.id];
    ProjectCtrl.status = status;

    ProjectCtrl.status_s = "";

    ProjectCtrl.error = false;
    ProjectCtrl.success = false;

    ProjectCtrl.changeStatus = function() {
      UserService.changeStatus(ProjectCtrl.status_s,ProjectCtrl.project.assignmentid)
                 .then(function(status){
                     if(status === 200){
                     ProjectCtrl.success = true;
                     ProjectCtrl.successMessage = "Status Updation Successful.."
                   }
                   else {
                       ProjectCtrl.error = true;
                       ProjectCtrl.errorMessage = "Status Updation Failed.."
                   }
                   ProjectCtrl.status_s = "";
                   $state.go('user.dashboard').then(function(){
                        $state.reload();
                    });
                 });
    }

    ProjectCtrl.switchBool = function() {
      ProjectCtrl.success = false;
      ProjectCtrl.error = false;
    }
  }
})();
