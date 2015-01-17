(function() {
    'use strict';

    angular.module('Psyched', [
        'ngRoute',
        'mobile-angular-ui',
        'Graph',
        'Journal',
        'Profile',
        'Form'
    ])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($routeProvider) {

            $routeProvider
                .when('graph', {
                    url: '/graph/:graph',
                    templateUrl: 'partials/graph.html',
                    controller: 'GraphCtrl'
                })
                .when('profile', {
                    url: '/profile',
                    templateUrl: 'partials/profile.html',
                    controller: 'ProfileCtrl'
                })
                .when('journal', {
                    url: '/journal',
                    templateUrl: 'partials/journal.html',
                    controller: 'JournalCtrl'
                })
                .when('form', {
                    url: '/form/:form',
                    templateUrl: 'partials/form.html',
                    controller: 'FormCtrl'
                });

            $urlRouterProvider.when('/graph', '/graph/');

            $urlRouterProvider.otherwise('/profile');

            $urlRouterProvider.rule(function($injector, $location) {
                //what this function returns will be set as the $location.url
                var path = $location.path(),
                    normalized = path.toLowerCase();
                if (path != normalized) {
                    //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
                    $location.replace().path(normalized);
                }
                // because we've returned nothing, no state change occurs
            });

        }
    ]);

})();
