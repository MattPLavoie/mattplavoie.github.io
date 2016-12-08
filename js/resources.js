app.controller('resourcesController', ['$scope', '$http', resourcesController]);

function resourcesController($scope, $http) {
  $scope.$parent.view = "resources";
}
