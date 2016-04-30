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

  angular.module('myApp', ['ngSanitize'])
  .controller('appController', ['$scope', '$http', appController]);


  function appController($scope, $http) {
    $scope.showSpeakingCurrent = false;
    $scope.showSpeakingPast = true;

    $scope.toggle = function(mode) {
      $scope.showSpeakingCurrent = mode == 'current';
      $scope.showSpeakingPast = mode == 'past';
    }

    var eventsTransform = function (data) {
      $scope.events = _.forEach(data, function(row) {

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
    }

    Tabletop.init( {
      key: api.events,
      callback: function(data, tabletop) {

        eventsTransform(data);

        Tabletop.init( {
          key: api.references,
          callback: function(data, tabletop) {

            $scope.references = data;

            $scope.$digest();
          },
          simpleSheet: true,
          orderby: 'date',
          reverse: true
        } );

      },
      simpleSheet: true,
      orderby: 'date',
      reverse: true
    } );
  }
