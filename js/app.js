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

  var eventsTransform = function (data) {
    var transformedEvents = _.forEach(data, function(row) {

      row = _.update(row, 'date', function(date) {
        var m = moment(date,"MM-DD-YYYY");
        row.displayDate = m.format("dddd, MMMM Do YYYY");
        return m;
      });

      row = _.update(row, 'description', function(description) {
        return description.split(/\n/g);
      })

      return row;
    });

    var splitEvents = _.partition(transformedEvents, function (event) {
      return moment().diff(event.date) >= 0;
    })

    var events = {
      past: splitEvents[0],
      upcoming: _.reverse(splitEvents[1])
    }

    return events;
  };

  angular.module('myApp', ['ngSanitize'])
  .controller('appController', ['$scope', '$http', appController])
  .controller('eventsController', ['$scope', '$http', eventsController]);


  function appController($scope, $http) {
    $scope.view = 'events';
  }

  function eventsController($scope, $http) {

    $scope.toggle = function() {
      $scope.showUpcomingEvents = !$scope.showUpcomingEvents;
    }

    Tabletop.init( {
      key: api.events,
      callback: function(data, tabletop) {
        $scope.events = eventsTransform(data);
        $scope.showUpcomingEvents = $scope.events.upcoming.length > 0;

        Tabletop.init( {
          key: api.references,
          callback: function(data, tabletop) {
            $scope.references = data;
            $scope.$digest();
          },
          simpleSheet: true
        } );
      },
      simpleSheet: true,
      orderby: 'date',
      reverse: true
    } );
  }
