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
        'Measurements',
        'Login',
        'Storage'
    ])
    .constant('dateFormat', 'YYYY-MM-DD HH:mm:ss') //internal and mysql-server

    .config(function($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            })
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

    })

    .controller('PsychedCtrl', function($scope, $rootScope, $location, dateFormat, user, clearStorage) {

        $rootScope.moment = moment;
        $rootScope.dateFormat = dateFormat;

        if(!user.userId)
            $location.path('/login');

        $scope.logout = function() {
            clearStorage();
        };

    });

})();
