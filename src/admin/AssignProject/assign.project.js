(function(){
  'use strict';
  angular.module('Admin')
         .controller('AssignProjectController',AssignProjectController);

  AssignProjectController.$inject = ['AdminService','projects','users','$state']
  function AssignProjectController(AdminService,projects,users,$state) {
    var iac = this;

    iac.projects = projects.data;
    iac.users = users.data;

    iac.project = "";
    iac.user = "";
    iac.active = "";

    iac.assignProject = function() {
      AdminService.assignProject(iac.user.userid,iac.project.projectid,iac.active)
                  .then(function(status){
                    if(status === 200) {
                      iac.success = true;
                      iac.successMessage = "Project Assignment Successful..";
                    }
                    else {
                        iac.error = true;
                        iac.errorMessage = "Project Assignment Failed..";
                    }
                    iac.project = "";
                    iac.user = "";
                    iac.active = "";

                    // $state.go('admin.dashboard').then(function(){
                    //      $state.reload();
                    //  });
                  })
                  .catch(function(err) {
                    iac.error = true;
                    iac.errorMessage = "Project Assignment Failed..";
                  });
    }

    iac.switchBool = function() {
      iac.success = false;
      iac.error = false;
    }
  }
})();
