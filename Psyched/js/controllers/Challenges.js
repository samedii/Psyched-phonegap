(function(challenges) {
    'use strict';

    function ChallengesCtrl($scope, testNames, tests) {

    	$scope.challengeNames = testNames.filter(function(name) {
    		return tests[name].type == 'challenge';
    	});
    	$scope.tests = tests;

    }

    challenges.controller('ChallengesCtrl', ChallengesCtrl);

})(angular.module('Challenges', [
    'Storage'
    ]));
