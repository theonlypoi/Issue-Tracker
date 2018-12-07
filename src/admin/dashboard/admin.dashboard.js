(function(){
  'use strict';
  angular.module('Admin')
         .controller('AdminDashboardController',AdminDashboardController);

  AdminDashboardController.$inject = ['allIssues'];

  function AdminDashboardController(allIssues) {
      var AdminDashboardCtrl = this;
      AdminDashboardCtrl.issues = allIssues.data;
  }

})();
