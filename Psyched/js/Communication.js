(function(communication) {
    'use strict';

    var serverURL = 'http://direwolf.se/Psyched-Server/';

    function createURL(serviceName) {
    	return serverURL + serviceName + '.php';
    }

    function callService(serviceName, parameters, successCallback, errorCallback) {
        $http.post(
            createURL(serviceName),
            parameters,
            {})
        	.then(
        		function(response) {
        			if(response.data.error && errorCallback) errorCallback(response);
        			else if(successCallback) successCallback(response);
        		},
        		errorCallback
        	);
    }

    function createTestResult(parameters) {
    	callService('createTestResult',
    		parameters,
    		function successCallback(response) {

    		},
    		function errorCallback(response) {

    		});
    }

    function createUser() {
    	callService('createUser',
    		parameters,
    		function successCallback(response) {

    		},
    		function errorCallback(response) {

    		});
    }

    function loadAllEntries() {
    	callService('loadAllEntries',
    		parameters,
    		function successCallback(response) {

    		},
    		function errorCallback(response) {

    		});
    }

    function loadUser() {
    	callService('loadUser',
    		parameters,
    		function successCallback(response) {

    		},
    		function errorCallback(response) {

    		});
    }

    function loadValueToGrade() {
    	callService('loadValueToGrade',
    		parameters,
    		function successCallback(response) {

    		},
    		function errorCallback(response) {

    		});
    }

    function updateUser() {
    	callService('updateUser',
    		parameters,
    		function successCallback(response) {

    		},
    		function errorCallback(response) {

    		});
    }

	communication
        .value('createTestResult', loadValueToGrade),
        .value('createUser', loadValueToGrade),
        .value('loadAllEntries', loadValueToGrade),
        .value('loadUser', loadValueToGrade),
        .value('loadValueToGrade', loadValueToGrade),
        .value('updateUser', loadValueToGrade);

})(angular.module('Communication', []));