app.controller('resourcesController', ['$scope', '$http', '$routeParams', resourcesController]);
app.controller('eventsController', ['$scope', '$http', eventsController]);
app.controller('aboutController', ['$scope', '$http', aboutController]);


function resourcesController($scope, $http, $routeParams) {
    $scope.$parent.view = "resources";

    if ($routeParams.resourceId) {
        $scope.resourceId = $routeParams.resourceId;
        $scope.$parent.view = "present";
    } else {
        $scope.$parent.view = "resources";
    }
}

function eventsController($scope, $http) {
  $scope.$parent.view = "events";
}

function aboutController($scope, $http) {
  $scope.$parent.view = "about";
}
