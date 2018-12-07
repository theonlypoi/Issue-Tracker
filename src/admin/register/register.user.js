(function(){
  'use strict';
  angular.module('Admin')
         .controller('RegisterUserController',RegisterUserController);

  RegisterUserController.$inject = ['AdminService','userrole','$state']
  function RegisterUserController(AdminService,userrole,$state) {
    var iac = this;
    iac.roles = userrole.data;
    iac.username = "";
    iac.mail = "";
    iac.password = "";
    iac.userrole = "";
    iac.active = "";

    iac.registerUser = function() {
      AdminService.registerUser(iac.username,iac.mail,iac.password,iac.userrole.roleid,iac.active)
                  .then(function(status){
                    if(status === 200) {
                      iac.success = true;
                      iac.successMessage = "User Registration Successful..";
                    }
                    else {
                        iac.error = true;
                        iac.errorMessage = "User Registration Failed..";
                    }
                    iac.username = "";
                    iac.mail = "";
                    iac.password = "";
                    iac.userrole = "";
                    iac.active = "";

                    // $state.go('admin.dashboard').then(function(){
                    //      $state.reload();
                    //  });
                  })
                  .catch(function(err) {
                    iac.error = true;
                    iac.errorMessage = "User Registration Failed..";
                  });
    }

    iac.switchBool = function() {
      iac.success = false;
      iac.error = false;
    }
  }
})();
