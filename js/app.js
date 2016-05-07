/* global angular */
/* global _ */
  'use strict';

  console.log("Hi. There isn't too much to find in here, but feel free to dig around the public GitHub repo https://github.com/MattPLavoie/mattplavoie.github.io");

  var api = {
    events: "1JNlc1HvUc0a2p3Yk2ilvk8c5RLcvmhc-1RCOvHJ1WJU",
    references: "1X41NyFxfKDsdjgHbKWQ2XdL0Cf4vDQmxkOnRh4JvQNQ"
   };

  var fetch = function($http, requestUrl, success) {
    $http.get(requestUrl)
    .then(
      success,
      function(error) {
        console.log("error", error);
      });
  };

  var app = angular.module('app', [
    'ngSanitize',
    'ngRoute'
  ])
  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/events/', {
        templateUrl: 'partials/events.html',
        controller: 'eventsController'
      }).
      when('/resources/', {
        templateUrl: 'partials/resources.html',
        controller: 'resourcesController'
      }).
      otherwise({
        redirectTo: '/events/'
      });
  }]);

  app.controller('appController', ['$scope', '$http', '$location', appController]);

  function appController($scope, $http, $location) {

    if($location.host() == "mattplavoie.com") {
      $scope.$on( "$viewContentLoaded", function() {
        ga('set', 'page', $location.path());
        ga('send', 'pageview');
      });
    }

    Tabletop.init( {
      key: api.references,
      callback: function(data, tabletop) {
        $scope.references = data;
        $scope.$digest();
      },
      simpleSheet: true
    } );
  }
