(function(tests) {
    'use strict';

    //Pullups
    //Dead hang edge
    //Dead hang slopers
    //Dead hang open hand
    //Pistol squats
    //Knee lifts
    //Leg lifts
    //Dragon flags
    //Muscle ups, rings, bar
    //One arms
    //Situps
    //Pushups
    //Dips, rings, bar
    //Typewriters

    function TestsCtrl($scope, testTypes, tests) {
        $scope.testTypes = testTypes;
        $scope.tests = tests;
    }

    tests.controller('TestsCtrl', TestsCtrl);

})(angular.module('Tests', [
    'Storage'
    ]));
