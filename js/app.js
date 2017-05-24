/* global angular */
/* global _ */
'use strict';

console.log("Hi. There isn't too much to find in here, but feel free to dig around the public GitHub repo https://github.com/MattPLavoie/mattplavoie.github.io");


/* These are the public ids for Google Sheets that contain the dynamic data for this site */
var api = {
    events: "1JNlc1HvUc0a2p3Yk2ilvk8c5RLcvmhc-1RCOvHJ1WJU",
    resources: "1X41NyFxfKDsdjgHbKWQ2XdL0Cf4vDQmxkOnRh4JvQNQ"
};

/* Define the app and routhing */
window.app = angular.module('app', [
    'ngSanitize',
    'ngRoute'
])
.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
    when('/events/', {
        templateUrl: 'partials/events.html',
        controller: 'eventsController'
    }).
    when('/resources/:resourceId', {
        templateUrl: 'partials/present.html',
        controller: 'resourcesController'
    }).
    when('/resources/', {
        templateUrl: 'partials/resources.html',
        controller: 'resourcesController'
    }).
    when('/about/', {
        templateUrl: 'partials/about.html',
        controller: 'aboutController'
    }).
    otherwise({
        redirectTo: '/resources/'
    });
}]);

app.controller('appController', ['$scope', '$http', '$location', '$q', appController]);

function appController($scope, $http, $location, $q) {

    /* Configure scrolling and fixed nav bar. This could be cleaned up */
    var body = $('body');
    var nav = $('nav');
    var header = $('header');
    var headerHeight = 0, navHeight = 0, initialScroll = 0;

    var resizeHandler = function () {
        headerHeight = header.outerHeight();
        navHeight = nav.outerHeight();
        header.css('border-bottom-width', navHeight);
    };

    _.delay(resizeHandler, 60);

    $(window).resize(_.throttle(resizeHandler, 60));

    $(document).scroll(_.throttle(function () {
        if (body.scrollTop() >= headerHeight) {
            body.addClass('sticky');
        } else {
            body.removeClass('sticky');
        }
    }, 60));

    $scope.scrollTo = function(el) {
        body.animate({ scrollTop: $('.' + el).offset().top - navHeight }, 600);
    };

    // New Page, record Google analytics and reposition scroll
    $scope.$on( "$routeChangeStart", function() {
        initialScroll = body.scrollTop();
    });
    $scope.$on( "$viewContentLoaded", function() {
        if($location.host() == "mattplavoie.com") {
            ga('set', 'page', $location.path());
            ga('send', 'pageview');
        }

        if (initialScroll > headerHeight) {
            _.delay(function() {
                body.scrollTop(headerHeight);
            }, 60);
        }
    });


    // Pull data from APIs and apply data transforms
    Tabletop.init( {
        key: api.resources,
        callback: function(data, tabletop) {
            $scope.resources = transformMetadata(data);
            $scope.resourceTypes = _.uniq(_.map($scope.resources, 'type'));
            $scope.$digest();
        },
        simpleSheet: true
    } );

    Tabletop.init( {
        key: api.events,
        callback: function(data, tabletop) {
            $scope.events = eventsTransform(data);
            $scope.$digest();
        },
        simpleSheet: true,
        orderby: 'date',
        reverse: true
    } );
}



/* Helper functions */

var transformMetadata = function (data) {
    return _.forEach(data, function(row) {
        row = _.update(row, 'date', function(date) {
            var m = moment(date,"MM-DD-YYYY");
            row.displayDate = m.format("dddd, MMMM Do YYYY");
            return m;
        });

        row = _.update(row, 'description', function(description) {
            return _.compact(description.split(/\n/g));
        })

        return row;
    });
}

var partitionItems = function(data) {
    var splitEvents = _.partition(data, function (event) {
        return moment().subtract(1, 'days').diff(event.date) >= 0;
    })

    var events = {
        past: splitEvents[0],
        upcoming: _.reverse(splitEvents[1])
    };

    return events;

}
var eventsTransform = function (data) {
    var transformedEvents = transformMetadata(data);
    var events = partitionItems(transformedEvents);
    return events;
};
