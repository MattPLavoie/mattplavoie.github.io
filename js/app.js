/* global angular */
/* global _ */
  'use strict';

  console.log("Hi. There isn't too much to find in here, but feel free to dig around the public GitHub repo https://github.com/MattPLavoie/mattplavoie.github.io");

  var api = {
    events: "1JNlc1HvUc0a2p3Yk2ilvk8c5RLcvmhc-1RCOvHJ1WJU",
    resources: "1X41NyFxfKDsdjgHbKWQ2XdL0Cf4vDQmxkOnRh4JvQNQ"
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

  app.controller('appController', ['$scope', '$http', '$location', '$q', appController]);

  function appController($scope, $http, $location, $q) {

    // Google analytics
    if($location.host() == "mattplavoie.com") {
      $scope.$on( "$viewContentLoaded", function() {
        ga('set', 'page', $location.path());
        ga('send', 'pageview');
      });
    }

    // Pull data from API for resources
    Tabletop.init( {
      key: api.resources,
      callback: function(data, tabletop) {
        $scope.references = data;
        $scope.$digest();
      },
      simpleSheet: true
    } );

    Tabletop.init( {
      key: api.events,
      callback: function(data, tabletop) {
        $scope.events = eventsTransform(data);
        $scope.showUpcomingEvents = $scope.events.upcoming.length > 0;
        $scope.$digest();
      },
      simpleSheet: true,
      orderby: 'date',
      reverse: true
    } );

    // Configure scrolling and fixed nav bar
    var body = $('body');
    var nav = $('nav');
    var header = $('header');
    var headerHeight = 0, navHeight = 0;

    var resizeHandler = function () {
      headerHeight = header.outerHeight();
      navHeight = nav.outerHeight();
      header.css('border-bottom-width', navHeight);
    };

    resizeHandler();

    $(window).resize(_.throttle(resizeHandler, 60));

    $(document).scroll(_.throttle(function () {
      if (body.scrollTop() > headerHeight) {
        body.addClass('sticky');
      } else {
        body.removeClass('sticky');
      }
    }, 60))

    $scope.scrollTo = function(el) {
      $('body').animate({ scrollTop: $('.' + el).offset().top - navHeight }, 600);
    };

  }
