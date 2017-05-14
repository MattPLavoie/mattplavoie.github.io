app.controller('presentationController', ['$scope', '$http', '$routeParams', resourcesController]);

function presentationController($scope, $http, $routeParams) {
    console.log('hello');
  $scope.$parent.view = "present";
  $scope.resourceId = $routeParams.resourceId;
  console.log('a',$routeParams.resourceId);
}
