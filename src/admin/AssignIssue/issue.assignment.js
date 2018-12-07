(function(){
  'use strict';
  angular.module('Admin')
         .controller('IssueAssignmentController',IssueAssignmentController);

  IssueAssignmentController.$inject = ['projects','users','userproject','status','priority','issuetype','AdminService',
                                        'CurrentUserService','$state'];

  function IssueAssignmentController(projects,users,userproject,status,priority,issuetype,AdminService,
                                      CurrentUserService,$state) {
    var iac = this;
    iac.projects = projects.data;
    iac.users = users.data;
    iac.userproject = userproject.data;
    iac.status = status.data;
    iac.priority = priority.data;
    iac.issuetype = issuetype.data;

    iac.assignedby = CurrentUserService.getId();

    iac.project = "";
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

    iac.assign = function() {
      // projectid,moduletype,assignmentdetails,status,assignedby,assignedto,priority,startdate,enddate,assignmenttitle
      AdminService.assign(iac.project.projectid,iac.issuetype_it.id,iac.desc,iac.status_s.statusid,iac.assignedby,
                          iac.user.userid,iac.priority_p.priorityid,iac.sdate,iac.edate,iac.title)
                  .then(function(status){
                    if(status === 200) {
                      iac.success = true;
                      iac.successMessage = "New Issue Assigned.."
                    }
                    else {
                        iac.error = true;
                        iac.errorMessage = "Issue Assignment Failed..."
                    }
                    iac.project = "";
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
