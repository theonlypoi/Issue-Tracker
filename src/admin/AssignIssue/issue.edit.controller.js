(function(){
  'use strict';
  angular.module('Admin')
         .controller('IssueEditController',IssueEditController);

  IssueEditController.$inject = ['allIssues','users','userproject','status','priority','issuetype','AdminService',
                                        'CurrentUserService','$stateParams','$state'];

  function IssueEditController(allIssues,users,userproject,status,priority,issuetype,AdminService,
                                      CurrentUserService,$stateParams,$state) {
    var iac = this;

    iac.reqd_project = allIssues.data[$stateParams.id];

    iac.project = {};
    iac.project.name = iac.reqd_project.projectname;
    iac.project.projectid = iac.reqd_project.projectid;

    iac.userproject = userproject.data;
    iac.status = status.data;
    iac.priority = priority.data;
    iac.issuetype = issuetype.data;

    iac.assignedby = CurrentUserService.getId();

    iac.user = "";
    iac.status_s = "";
    iac.priority_p = "";
    iac.title = "";
    iac.issuetype_it = "";
    iac.desc = "";
    iac.sdate = "";
    iac.edate = "";

    iac.error = false;
    iac.success = false;

    iac.edit = function() {
      AdminService.edit(iac.reqd_project.assignmentid,iac.project.projectid,iac.issuetype_it.id,iac.desc,
        iac.status_s.statusid,iac.assignedby,iac.user.userid,iac.priority_p.priorityid,iac.sdate,iac.edate,iac.title)
                  .then(function(status){
                    if(status === 200) {
                      iac.success = true;
                      iac.successMessage = "Successfully Edited Issue.."
                    }
                    else {
                        iac.error = true;
                        iac.errorMessage = "Issue Updation Failed.."
                    }

                    iac.user = "";
                    iac.status_s = "";
                    iac.priority_p = "";
                    iac.title = "";
                    iac.issuetype_it = "";
                    iac.desc = "";
                    iac.sdate = "";
                    iac.edate = "";

                    // $state.go('admin.dashboard').then(function(){
                    //      $state.reload();
                    //  });
                  });
    }

    iac.switchBool = function() {
      iac.success = false;
      iac.error = false;
    }
  }


})();
