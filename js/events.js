app.controller('eventsController', ['$scope', '$http', eventsController]);

function eventsController($scope, $http) {

  $scope.$parent.view = "events";

      /*
      Tabletop.init( {
        key: api.events,
        callback: function(data, tabletop) {
          $scope.$parent.events = eventsTransform(data);
          $scope.showUpcomingEvents = $scope.events.upcoming.length > 0;
          $scope.$digest();
        },
        simpleSheet: true,
        orderby: 'date',
        reverse: true
      } );
      */


}
