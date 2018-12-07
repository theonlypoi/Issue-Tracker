(function(){
  'use strict';
  angular.module('Admin')
         .controller('ProjectViewController',ProjectViewController);

  ProjectViewController.$inject = ['$stateParams','allIssues'];

  function ProjectViewController($stateParams,allIssues) {
    var pvc = this;
    pvc.issue = allIssues.data[$stateParams.id];
  }
})();
