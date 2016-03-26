/* global angular */
/* global _ */
'use strict';

var apiUrl = "";

var fetch = function($http, requestUrl, success) {
  $http.get(requestUrl)
  .then(
    success,
    function(error) {
      console.log("error", error);
    });
  };

  angular.module('myApp', [])
  .controller('appController', ['$scope', '$http', appController]);


  function appController($scope, $http) {

  }
