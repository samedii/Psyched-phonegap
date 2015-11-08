(function(trials) {
    'use strict';

    function TrialsCtrl($scope, testNames, tests, latestTestResult) {

        $scope.latestTestResult = latestTestResult;
        $scope.moment = moment;

    	$scope.trialNames = testNames.filter(function(name) {
    		return tests[name].type == 'trial';
    	});
    	$scope.tests = tests;
    }

    trials.controller('TrialsCtrl', TrialsCtrl);

})(angular.module('Trials', [
    'Storage'
    ]));
