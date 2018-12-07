(function(){
  'use strict';
  angular.module('User')
         .controller('ProjectDetailController',ProjectDetailController);

  ProjectDetailController.$inject = ['projects'];

  function ProjectDetailController(projects){
    var pdc = this;
    pdc.projects = projects.data;

  }
})();
