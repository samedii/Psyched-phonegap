(function(journal) {
    'use strict';

    function JournalCtrl($scope, getLatestSavedResults, tests) {
    	$scope.tests = tests;
    	$scope.journal = getLatestSavedResults();
    }

    journal.controller('JournalCtrl', JournalCtrl);

})(angular.module('Journal', [
		'Storage'
	]));
