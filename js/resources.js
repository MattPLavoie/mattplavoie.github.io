app.controller('resourcesController', ['$scope', '$http', '$routeParams', resourcesController]);

function resourcesController($scope, $http, $routeParams) {

    $scope.$parent.view = "resources";
    $scope.resourceId = $routeParams.resourceId;

    if ($scope.resourceId) {
        $scope.$parent.view = "present";
    } else {
        $scope.$parent.view = "resources";
    }

}
