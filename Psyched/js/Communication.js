(function(communication) {
    'use strict';


    function serverConnectionDelegatorFactory(loadDataVersionsFromServer, saveUserToServer, saveUnsavedTestResultToServer, saveUnsavedEditedTestResultToServer, getOldestUnsavedTestResult, getOldestUnsavedEditedTestResult) {

        $('body').on('internetConnectionConfirmed', serverConnectionDelegator);

        var timeOfLastVersionCheck;

        function serverConnectionDelegator() {

            console.log('serverConnectionDelegator');

            if(localStorage.getItem('unsavedUser') === true)
                return saveUserToServer();

            if(getOldestUnsavedTestResult())
                return saveUnsavedTestResultToServer();

            if(getOldestUnsavedEditedTestResult())
                return saveUnsavedEditedTestResultToServer();

            if(!timeOfLastVersionCheck || moment().diff(timeOfLastVersionCheck, 'minutes') > 1) {
                loadDataVersionsFromServer();
                timeOfLastVersionCheck = moment();
            }
        };
        return serverConnectionDelegator;
    }

    function loadDataVersionsFromServerFactory($http, loadValueToGradeFromServer, loadUserFromServer, loadAllTestResultsFromServer, user) {
        return function loadDataVersionsFromServer() {
            $http.post(
                'http://direwolf.se/Psyched-Server/loadDataVersions.php',
                {
                    userId: user.userId
                },
                {})
                .then(
                    function successCallback(response) {
                        if(response.data.error) {
                            console.log('loadDataVersions: error returned, ' + response.data.error);
                        }
                        else {
                            console.log('loadDataVersionsFromServer');
                            if(response.data.lastModified != user.lastModified) {
                                console.log('response.data.lastModified != user.lastModified');
                                loadUserFromServer();
                                loadAllTestResultsFromServer();
                            }
                            if(response.data.updateTime != localStorage.getItem('updateTime')) {
                                console.log('response.data.updateTime != localStorage.getItem(\'updateTime\')');
                                loadValueToGradeFromServer();
                            }
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadDataVersions: error server');
                    }
                );
        };
    }

    function loadValueToGradeFromServerFactory($http, tests) {
        return function loadValueToGradeFromServer() {
            $http.post(
                'http://direwolf.se/Psyched-Server/loadValueToGrade.php',
                {},
                {})
                .then(
                    function successCallback(response) {
                        if(response.data.error) {
                            console.log('loadValueToGrade: error returned, ' + response.data.error);
                        }
                        else {
                            console.log('loadValueToGradeFromServer');
                            localStorage.setItem('valueToGrade', JSON.stringify(response.data.valueToGrade));
                            tests = angular.merge(tests, response.data.valueToGrade);
                            localStorage.setItem('updateTime', response.data.updateTime);
                            $('body').trigger('internetConnectionConfirmed');
                            $('body').trigger('loadValueToGradeFromServer');
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadAllTestResults: error server');
                    }
                );
        };
    }

    function loadAllTestResultsFromServerFactory($http, user, testNames) {
        return function loadAllTestResultsFromServer() {
            $http.post(
                'http://direwolf.se/Psyched-Server/loadAllTestResults.php',
                {
                    userId: user.userId
                },
                {})
                .then(
                    function successCallback(response) {
                        if(response.data.error) {
                            console.log('loadAllTestResults: error returned, ' + response.data.error);
                        }
                        else {
                            console.log('loadAllTestResultsFromServer');
                            for(var i=testNames.length-1; i>=0; --i) {
                                var testName = testNames[i];
                                localStorage.setItem(testName, JSON.stringify(response.data[testName] || []));
                            }
                            $('body').trigger('internetConnectionConfirmed');
                            $('body').trigger('loadAllTestResultsFromServer');
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadAllTestResults: error server');
                    }
                );
        };
    }

    function loadUserFromServerFactory($http, loadAllTestResultsFromServer, loadValueToGradeFromServer, user) {
        return function loadUserFromServer(email, passwordHash) {
            $http.post(
                'http://direwolf.se/Psyched-Server/loadUser.php',
                {
                    email: email,
                    passwordHash: passwordHash
                },
                {})
                .then(
                    function successCallback(response) {
                        if(response.data.error) {
                            console.log('loadUser: error returned, ' + response.data.error);
                        }
                        else {
                            console.log('loadUserFromServer');
                            angular.extend(user, response.data);
                            if(user.birth == '0000-00-00')
                                user.birth = undefined;
                            if(user.startedClimbing == '0000')
                                user.startedClimbing = undefined;
                            localStorage.setItem('user', JSON.stringify(user));
                            loadValueToGradeFromServer();
                            loadAllTestResultsFromServer();
                            $('body').trigger('loadUserFromServer');
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadUser: error server');
                    }
                );
        };
    }

    function saveUserToServerFactory($http, user) {
        return function saveUserToServer() {
            localStorage.setItem('unsavedUser',true);
            localStorage.setItem('user', JSON.stringify(user));
            $http.post(
                'http://direwolf.se/Psyched-Server/updateUser.php',
                user,
                {})
                .then(
                    function successCallback(response) {
                        if(response.data.error) {
                            console.log('saveUser: error returned, ' + response.data.error);
                        }
                        else {
                            console.log('saveUserToServer');
                            angular.extend(user, response.data);
                            if(user.birth == '0000-00-00')
                                user.birth = undefined;
                            if(user.startedClimbing == '0000')
                                user.startedClimbing = undefined;
                            localStorage.setItem('user', JSON.stringify(user));
                            localStorage.setItem('unsavedUser',false);

                            $('body').trigger('internetConnectionConfirmed');
                        }
                    },
                    function errorCallback(response) {
                        console.log('saveUser: error server');
                    }
                );
        };
    }


    function saveUnsavedEditedTestResultToServerFactory($http, savedOldestUnsavedEditedTestResult, getOldestUnsavedEditedTestResult, user) {
        return function saveUnsavedEditedTestResultToServer() {
            var unsavedEditedTestResult = getOldestUnsavedEditedTestResult();
            unsavedEditedTestResult.userId = user.userId;
            if(unsavedEditedTestResult) {
                $http.post(
                    'http://direwolf.se/Psyched-Server/editTestResult.php',
                    unsavedEditedTestResult,
                    {})
                    .then(
                        function successCallback(response) {
                            if(response.data.error) {
                                console.log('saveUnsavedEditedTestResultToServer: error returned, ' + response.data.error);
                            }
                            else {
                                console.log('saveUnsavedEditedTestResultToServer');
                                savedOldestUnsavedEditedTestResult(
                                    unsavedEditedTestResult.testName,
                                    response.data.testResult);

                                if(response.data.oldLastModified != user.lastModified) {
                                    console.log('missing data, need to reload');
                                }
                                else {
                                    user.lastModified = response.data.lastModified;
                                }

                                $('body').trigger('internetConnectionConfirmed');
                            }
                        },
                        function errorCallback(response) {
                            console.log('saveUnsavedEditedTestResultToServer: error server');
                        }
                    );
            }
        };
    }

    function saveUnsavedTestResultToServerFactory($http, getOldestUnsavedTestResult, savedOldestUnsavedTestResult, user) {
        return function saveUnsavedTestResultToServer() {
            var unsavedTestResult = getOldestUnsavedTestResult();
            unsavedTestResult.userId = user.userId;
            if(unsavedTestResult) {
                $http.post(
                    'http://direwolf.se/Psyched-Server/createTestResult.php',
                    unsavedTestResult,
                    {})
                    .then(
                        function successCallback(response) {
                            if(response.data.error) {
                                console.log('saveUnsavedTestResultToServer: error returned, ' + response.data.error);
                            }
                            else {
                                console.log('saveUnsavedTestResultToServer');
                                savedOldestUnsavedTestResult(
                                    unsavedTestResult.testName,
                                    response.data.testResult);

                                if(response.data.oldLastModified != user.lastModified) {
                                    console.log('missing data, need to reload');
                                }
                                else {
                                    user.lastModified = response.data.lastModified;
                                }

                                $('body').trigger('internetConnectionConfirmed');
                            }
                        },
                        function errorCallback(response) {
                            console.log('saveUnsavedTestResultToServer: error server');
                        }
                    );
            }
        };
    }

	communication
        .factory('saveUnsavedTestResultToServer', saveUnsavedTestResultToServerFactory)
        .factory('saveUnsavedEditedTestResultToServer', saveUnsavedEditedTestResultToServerFactory)
        .factory('loadUserFromServer', loadUserFromServerFactory)
        .factory('saveUserToServer', saveUserToServerFactory)
        .factory('loadAllTestResultsFromServer', loadAllTestResultsFromServerFactory)
        .factory('loadValueToGradeFromServer', loadValueToGradeFromServerFactory)
        .factory('loadDataVersionsFromServer', loadDataVersionsFromServerFactory)
        .factory('serverConnectionDelegator', serverConnectionDelegatorFactory);

})(angular.module('Communication', []));