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

app.controller('eventsController', ['$scope', '$http', eventsController]);

function eventsController($scope, $http) {

  $scope.toggle = function() {
    $scope.showUpcomingEvents = !$scope.showUpcomingEvents;
  }

  if(!$scope.events) {
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
  } else {
    //$scope.$digest();
  }
}
