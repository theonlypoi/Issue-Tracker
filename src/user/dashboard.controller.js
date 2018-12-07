(function(){
  'use strict';
  angular.module('User')
         .controller('DashboardController',DashboardController);

  DashboardController.$inject = ['assignedIssues'];

  function DashboardController(assignedIssues){
    var DashboardCtrl = this;

    DashboardCtrl.allIssues = assignedIssues.data;

  }
})();
