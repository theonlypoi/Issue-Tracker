(function() {
  'use strict';

  angular.module('Common')
         .component('loading',{
            template: '<img src="images/spinner.svg" style= "background-color:white" ng-if = "$ctrl.show">',
            controller: LoadingSpinnerController,
            controllerAs: '$ctrl'
         });

  LoadingSpinnerController.$inject = ['$rootScope']
  function LoadingSpinnerController($rootScope) {
    var $ctrl = this;

    /**
        onInit and onDestroy are two life cycle methods for angular components.
        onInit can be considered as the constructor for the component and it is a best place to
        initialize anything for the component.

        In the component we will show a spinner image to show the user that some kind of processing is going on
        and for that we first declare show property on $ctrl as false and we will listen to an event with namespace
        `spinner:activate`.If we encounter that event then it's handler function `onSpinnerActivate` will be
        executed.

        In the onSpinnerActivate function we take 2 parameters (the event and the data broadcasted with the event.)
        and change $ctrl.show value depending on the `on` property in the data object.

        Basically this event is going to be broadcasted when we do any kind of http request because that may take
        some time and for that we are going to set up an httpinterceptor which will intercept any http request and
        broadcast this event.

        As we are broadcasting this event from the rootscope(basically the starting ng-app) it never gets destroyed.
        So there is a possibility of memory leak as with each request a new $rootScope.$on will be executed.
        So we have to explicitly destroy that. $rootScope.$on returns a deregistration function and we simply need to
        call the function in the onDestroy method of the controller of the component.

    */

    $ctrl.onInit = function() {
      $ctrl.show = false;
      var listener = $rootScope.$on('spinner:activate',onSpinnerActivate);
    };

    $ctrl.onDestroy = function() {
      listener();
    };

    function onSpinnerActivate(event,data) {
      $ctrl.show = data.on;
    };
  }
})();
