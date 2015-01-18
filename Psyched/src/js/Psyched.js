(function() {
    'use strict';

    angular.module('Psyched', [
        'ngRoute',
        'mobile-angular-ui',
        'Navigation',
        'Graph',
        'Journal',
        'Profile',
        'Form'
    ])

    .config(function($routeProvider) {

        $routeProvider
            .when('/graph/:graph', {
                templateUrl: 'partials/graph.html',
                controller: 'GraphCtrl'
            })
            .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl'
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
