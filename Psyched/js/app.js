// JavaScript source code
'use strict'
var ibdApp = angular.module('ibdApp', [
    'ngRoute',
    'mobile-angular-ui',
    'Graph',
    'ShortHealthScale',
    'Toa',
    'Welcome'
]);

ibdApp.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/graph', {
        templateUrl: 'partials/graph.html',
        controller: 'GraphCtrl'
    }).
    when('/toa', {
        templateUrl: 'partials/toa.html',
        controller: 'ToaCtrl'
    }).
    when('/shs', {
        templateUrl: 'partials/shortHealthScale.html',
        controller: 'ShortHealthScaleCtrl'
    }).
    when('/welcome', {
        templateUrl: 'partials/welcome.html',
        controller: 'WelcomeCtrl'
    }).
    otherwise({
        redirectTo: '/welcome'
    });
}]);