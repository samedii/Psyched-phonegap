(function() {
    'use strict';

    angular.module('Psyched', [
        'ngRoute',
        'mobile-angular-ui',
        'Navigation',
        'Graph',
        'Journal',
        'Profile',
        'Tests',
        'Trials',
        'Challenges',
        'Measurements'
    ])
    .constant('dateFormat', 'YYYY-MM-DD HH:mm:ss') //internal and mysql-server

    .config(function($routeProvider) {

        $routeProvider
            .when('/graph', {
                templateUrl: 'partials/graph.html',
                controller: 'GraphCtrl'
            })
            .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/trials', {
                templateUrl: 'partials/trials.html',
                controller: 'TrialsCtrl'
            })
            .when('/challenges', {
                templateUrl: 'partials/challenges.html',
                controller: 'ChallengesCtrl'
            })
            .when('/measurements', {
                templateUrl: 'partials/measurements.html',
                controller: 'MeasurementsCtrl'
            })
            .when('/journal', {
                templateUrl: 'partials/journal.html',
                controller: 'JournalCtrl'
            })
            .when('/tests/:form', {
                templateUrl: 'partials/tests.html',
                controller: 'TestsCtrl'
            })
            .otherwise('/profile');

    });

})();
