(function(measurements) {
    'use strict';

    function MeasurementsCtrl($scope, testNames, tests) {

    	$scope.measurementNames = testNames.filter(function(name) {
    		return tests[name].type == 'measurement';
    	});
    	$scope.tests = tests;

    }

    measurements.controller('MeasurementsCtrl', MeasurementsCtrl);

})(angular.module('Measurements', [
    'Storage'
    ]));
