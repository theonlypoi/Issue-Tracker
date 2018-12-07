(function(){
  'use strict';
  angular.module('Admin')
         .controller('RegisterProjectController',RegisterProjectController);

  RegisterProjectController.$inject = ['AdminService','$state']
  function RegisterProjectController(AdminService,$state) {
    var iac = this;
    iac.projectname = "";
    iac.client = "";
    iac.description = "";
    iac.sdate = "";
    iac.edate = "";
    iac.active = "";

    iac.register = function() {
      AdminService.registerProject(iac.projectname,iac.client,iac.description,iac.sdate,iac.edate,iac.active)
                  .then(function(status){
                    if(status === 200) {
                      iac.success = true;
                      iac.successMessage = "Project Registration Successful..";
                    }
                    else {
                        iac.error = true;
                        iac.errorMessage = "Project Registration Failed..";
                    }
                    iac.projectname = "";
                    iac.client = "";
                    iac.description = "";
                    iac.sdate = "";
                    iac.edate = "";
                    iac.active = "";

                    // $state.go('admin.dashboard').then(function(){
                    //      $state.reload();
                    //  });
                  })
                  .catch(function(err) {
                    iac.error = true;
                    iac.errorMessage = "Project Registration Failed..";
                  });
    }

    iac.switchBool = function() {
      iac.success = false;
      iac.error = false;
    }
  }
})();
