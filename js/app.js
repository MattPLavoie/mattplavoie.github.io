/* global angular */
/* global _ */
'use strict';

console.log("Hi. There isn't too much to find in here, but feel free to dig around the public GitHub repo https://github.com/MattPLavoie/mattplavoie.github.io");

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
