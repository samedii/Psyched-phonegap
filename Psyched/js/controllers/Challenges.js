(function(challenges) {
    'use strict';

    function ChallengesCtrl($scope, testNames, tests, latestTestResult) {

        $scope.latestTestResult = latestTestResult;
    	$scope.challengeNames = testNames.filter(function(name) {
    		return tests[name].type == 'challenge';
    	});
    	$scope.tests = tests;

    }

    challenges.controller('ChallengesCtrl', ChallengesCtrl);

})(angular.module('Challenges', [
    'Storage'
    ]));
