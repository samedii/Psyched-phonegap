(function() {
    'use strict';

    angular.module('Psyched', [
        'ngRoute',
        'mobile-angular-ui',
        'Navigation',
        'Graph',
        'Journal',
        'Profile',
        'Form',
        'Tests',
        'Challenges',
        'Measurements'
    ])

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
            .when('/tests', {
                templateUrl: 'partials/tests.html',
                controller: 'TestsCtrl'
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
            .when('/form/:form', {
                templateUrl: 'partials/form.html',
                controller: 'FormCtrl'
            })
            .otherwise('/profile');

    });

})();
