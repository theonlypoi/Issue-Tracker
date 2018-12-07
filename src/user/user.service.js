(function() {
  'use strict';
  angular.module('User')
         .service('UserService',UserService);

  UserService.$inject = ['ApiBasePath','$http','$log'];

  function UserService(ApiBasePath,$http,$log) {
    var service = this;
    service.getIssueDetails = function() {
        // $log.info("Entering to get issue details for user.");
        return $http.get(ApiBasePath + '/user/getUserProjectDetail')
                    .then(function(result){
                      return result;
                    });
      }
   service.getProjectList = function() {
     return $http.get(ApiBasePath + '/user/getUserProjects')
                 .then(function(result){
                   return result;
                 })
                 .catch(function(err){
                   console.log("Some Error Happened while retrieving data.");
                 });
   }

   service.getStatus = function() {
     return $http.get(ApiBasePath + '/getStatus')
                 .then(function(result){
                   return result.data;
                 })
                 .catch(function(err){
                   console.log("Some Error Happened while retrieving data.");
                 });
   }

   service.changeStatus = function(status,id) {
     // console.log("Assignment ID:",id);
     var params = {
       statusid: status.statusid,
       id:id
     };
     return $http.post(ApiBasePath + '/user/updateStatus',params)
                 .then(function(result){
                   return result.status;
                 })
   }
  }
})();
