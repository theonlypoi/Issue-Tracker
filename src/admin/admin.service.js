(function(){
  'use strict';
  angular.module('Admin')
         .service('AdminService',AdminService);

  AdminService.$inject = ['$http','ApiBasePath'];

  function AdminService($http,ApiBasePath) {
    var service = this;
    service.getAllIssues = function() {
      return $http.get(ApiBasePath + '/admin/getDetails')
                  .then(function(result){
                    return result;
                  });
    }

    service.getStatus = function() {
      return $http.get(ApiBasePath + '/getStatus')
                  .then(function(result){
                    return result;
                  });
    }

    service.getPriority = function() {
      return $http.get(ApiBasePath + '/getPriority')
                  .then(function(result){
                    return result;
                  });
    }

    service.getProjects = function() {
      return $http.get(ApiBasePath + '/getProjects')
                  .then(function(result){
                    return result;
                  });
    }

    service.getUsers = function() {
      return $http.get(ApiBasePath + '/getUsers')
                  .then(function(result){
                    return result;
                  });
    }

    service.getUserProject = function() {
      return $http.get(ApiBasePath + '/getUserProject')
                  .then(function(result){
                    return result;
                  });
    }

    service.getIssueType = function() {
      return $http.get(ApiBasePath + '/issuetype')
                  .then(function(result){
                    return result;
                  });
    }

    service.assign = function(prid,mtype,assignmentdetails,sid,assignedby,assignedto,pid,sdate,edate,title) {
        var params = {
          projectid: prid,
          moduletype: mtype,
          assignmentdetails: assignmentdetails,
          status:sid,
          assignedby:assignedby,
          assignedto:assignedto,
          priority: pid,
          startdate: sdate,
          enddate: edate,
          assignmenttitle: title
        }

        return $http.post(ApiBasePath + '/admin/assignIssue',params)
                    .then(function(result){
                        return result.status;
                    });
    }

    service.edit = function(aid,prid,mtype,assignmentdetails,sid,assignedby,assignedto,pid,sdate,edate,title){
      var params = {
        id: aid,
        projectid: prid,
        moduletype: mtype,
        assignmentdetails: assignmentdetails,
        status:sid,
        assignedby:assignedby,
        assignedto:assignedto,
        priority: pid,
        startdate: sdate,
        enddate: edate,
        assignmenttitle: title
      }

      return $http.post(ApiBasePath + '/admin/editIssue',params)
                  .then(function(result){
                      console.log(result.status);
                      return result.status;
                  });
    }

    service.registerProject = function(pname,client,desc,sdate,edate,active) {
        var params = {
          projectname: pname,
          client: client,
          description: desc,
          startdate: sdate,
          enddate: edate,
          active: active
        }
        return $http.post(ApiBasePath + '/admin/registerProject',params)
                    .then(function(result){
                        console.log(result.status);
                        return result.status;
                    });
    }

    service.registerUser = function(uname,mail,password,role,active) {
        var params = {
          username: uname,
          usermail: mail,
          userpassword: password,
          userrole: role,
          active: active
        }
        return $http.post(ApiBasePath + '/admin/registerUser',params)
                    .then(function(result){
                        console.log(result.status);
                        return result.status;
                    });
    }

    service.getUserRole = function() {
      return $http.get(ApiBasePath + '/admin/getUserRoles')
                  .then(function(result){
                    return result;
                  });
    }

    service.assignProject = function(userid,projectid,active) {
      var params = {
        userid: userid,
        projectid: projectid,
        active: active
      }
      return $http.post(ApiBasePath + '/admin/assignProject',params)
                  .then(function(result){
                    console.log(result);
                    return result.status;
                  });
    }
  }
})();
