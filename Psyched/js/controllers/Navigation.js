(function(navigation) {
    'use strict';

    function NavigationCtrl($scope, testTypes, tests) {
        $scope.testTypes = testTypes;
        $scope.tests = tests;
    }

    navigation.controller('NavigationCtrl', NavigationCtrl);

})(angular.module('Navigation', [
    'Storage'
]));