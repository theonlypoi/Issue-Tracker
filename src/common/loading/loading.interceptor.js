(function() {
  'use strict';
  /**
    This function will keep track of any http request made and when it begins it will broadcast the
    'spinner:activate' event. As the loading spinner component is listening to this event it will kick off.
  */

  angular.module('Common')
         .factory('loadingHttpInterceptor',loadingHttpInterceptor);

  loadingHttpInterceptor.$inject = ['$rootScope','$q'];
  function loadingHttpInterceptor($rootScope,$q) {
    /**
        loadingCount is used to keep track of the total number of http requestes made. If a single http request
        is made then we will start to show our loading spinner. As this is async,so there may be more than one http
        requestes occuring in parallel & we want to continue our loading spinner until all the requests are resolved.

        Httpinterceptor is a factory function that returns request,response,requestError and responseError.Whenever any
        http requests occur it will broadcast spinner:activate event with on set to true. When the request(s) will be
        completed or any error occurred in response at that time it will set on property to false and our
        loading spinner will stop.
    */
    
    let loadingCount = 0;
    let eventName = 'spinner:activate';
    return {
      request: function(config) {
        console.log(config);
        if(++loadingCount === 1) {
          $rootScope.$broadcast(eventName,{on: true});
        }
        return config;
      },
      response: function(response) {
        if(--loadingCount === 0) {
          $rootScope.$broadcast(eventName,{on:false});
        }
        return response;
      },
      responseError: function(response) {
        if(--loadingCount === 0) {
          $rootScope.$broadcast(eventName,{on:false});
        }
        return $q.reject(response);
      }
    }
  }
})();
