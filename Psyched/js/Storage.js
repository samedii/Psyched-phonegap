(function(storage) {
    'use strict';

    var
        /*unsavedTestResults = [{
            testName: 'pullups',
            testResult: {
                value: 10,
                date: ...
            }
        }];*/
        testNames = [
            //'pullups'
        ],
        tests = {/*
            pullups: {
                resultId: 1,
                    ...
                }
            }*/
        },
        userStringOrNull = localStorage.getItem('user'),
        user = userStringOrNull == null ? {/*
            email: 'samedii@gmail.com',
            passwordHash: 'test',
            userId: 1,
            name: 'Richard Hermanson',
            birth: '1989-12-23 00:00:00',
            startedClimbing: 2010,
            lastModified: '2015-11-06 00:00:00'
        */} : JSON.parse(userStringOrNull),
        valueToGradeOrNull = localStorage.getItem('valueToGrade'),
        valueToGrade = valueToGradeOrNull == null ? {} : JSON.parse(valueToGradeOrNull);

    tests = angular.merge(tests, valueToGrade);

    function serverConnectionDelegatorFactory(loadDataVersionsFromServer, saveUserToServer, saveTestResultToServer) {

        $(storage).on('internetConnectionConfirmed', serverConnectionDelegator);

        var timeOfLastVersionCheck;

        function serverConnectionDelegator() {

            console.log('serverConnectionDelegator');

            if(localStorage.getItem('unsavedUser') === true)
                return saveUserToServer();

            if(getOldestUnsavedTestResult())
                return saveTestResultToServer();

            if(!timeOfLastVersionCheck || moment().diff(timeOfLastVersionCheck, 'minutes') > 1) {
                loadDataVersionsFromServer();
                timeOfLastVersionCheck = moment();
            }
        };
    }

    function loadDataVersionsFromServerFactory($http, loadValueToGradeFromServer, loadUserFromServer, loadAllTestResultsFromServer) {
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

    function loadValueToGradeFromServerFactory($http) {
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
                            $(storage).trigger('internetConnectionConfirmed');
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadAllTestResults: error server');
                    }
                );
        };
    }

    function loadAllTestResultsFromServerFactory($http) {
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
                            $(storage).trigger('internetConnectionConfirmed');
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadAllTestResults: error server');
                    }
                );
        };
    }

    function loadUserFromServerFactory($http, loadAllTestResultsFromServer, loadValueToGradeFromServer) {
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
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadUser: error server');
                    }
                );
        };
    }

    function saveUserToServerFactory($http) {
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

                            $(storage).trigger('internetConnectionConfirmed');
                        }
                    },
                    function errorCallback(response) {
                        console.log('saveUser: error server');
                    }
                );
        };
    }

    function saveTestResultToServerFactory($http) {
        return function saveTestResultToServer() {
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
                                console.log('tryToSave: error returned, ' + response.data.error);
                            }
                            else {
                                console.log('saveTestResultToServer');
                                savedOldestUnsavedTestResult(
                                    unsavedTestResult.testName,
                                    response.data.testResult);

                                if(response.data.oldLastModified != user.lastModified) {
                                    console.log('missing data, need to reload');
                                }
                                else {
                                    user.lastModified = response.data.lastModified;
                                }

                                $(storage).trigger('internetConnectionConfirmed');
                            }
                        },
                        function errorCallback(response) {
                            console.log('tryToSave: error server');
                        }
                    );
            }
        };
    }

    function getOldestUnsavedTestResult() {
        var unsavedTestResults = getUnsavedTestResults();
        return unsavedTestResults.length > 0 ? unsavedTestResults[0] : false;
    }

    function savedOldestUnsavedTestResult(name, testResult) {
        var
            unsavedTestResults = getUnsavedTestResults(),
            savedTestResult = unsavedTestResults.shift(); //TODO: unused, check equals
        localStorage.setItem('unsavedTestResults', JSON.stringify(unsavedTestResults));

        var stringOrNull = localStorage.getItem(name);
        if(stringOrNull === null)
            stringOrNull = '[]';
        var namedTestResults = JSON.parse(stringOrNull).concat(testResult);
        localStorage.setItem(name, JSON.stringify(namedTestResults));
    }


    function getUnsavedTestResults() {
        var stringOrNull = localStorage.getItem('unsavedTestResults');
        if(stringOrNull === null)
            return [];
        return JSON.parse(stringOrNull);
    }

    function getSavedTestResultsWithTestName(testName) {
        var stringOrNull = localStorage.getItem(testName);
        if(stringOrNull === null)
            return [];
        return JSON.parse(stringOrNull);
    }

    function getTestResultsWithTestName(testName) {
        var unsavedTestResults = getUnsavedTestResults().filter(function(unsavedTestResult) {
            return unsavedTestResult.testName == testName;
        }).map(function(unsavedTestResult) {
            return unsavedTestResult.testResult;
        });
        return getSavedTestResultsWithTestName(testName).concat(unsavedTestResults);
    }

    function listTestResultsFactory(dateFormat) {
        return function listTestResults(name, from) {
            //this can be done much faster since array is ordered
            var testResults = getTestResultsWithTestName(name);
            return testResults.filter(function(testResult) {
                return moment(testResult.date, dateFormat).isAfter(from);
            })
        };
    }

    function latestTestResult(name) {
        var testResults = getTestResultsWithTestName(name);
        if(testResults.length > 0)
            return testResults[testResults.length-1];
        return undefined;
    }

    function saveTestResultFactory(saveTestResultToServer) {
        return function saveTestResult(name, testResult) {
            //TODO: check if resultId already exists (update result)
            var unsavedTestResults = getUnsavedTestResults();
            unsavedTestResults.push({
                testName: name,
                testResult: testResult
            });
            localStorage.setItem('unsavedTestResults', JSON.stringify(unsavedTestResults));
            saveTestResultToServer();
        };
    }

    function clearStorage() {
        localStorage.clear();
        user.userId = undefined;
        user.email = undefined;
        user.passwordHash = undefined;
        user.name = undefined;
        user.birth = undefined;
        user.startedClimbing = undefined;
        user.lastModified = undefined;
    }

    function addTest(name, test) {
        testNames.push(name);
        if(tests[name]) {
            angular.extend(tests[name],test);
        }
        else {
            tests[name] = test;
        }
    }

    function getLatestSavedResultsFactory(dateFormat) {
        return function getLatestSavedResults(noOfTestResults) {
            //just get all testResults and sort? ineffective but easy

            var
                entries = [],
                i;

            for (var i = testNames.length - 1; i >= 0; --i) {

                var stringOrNull = localStorage.getItem(testNames[i]);
                if(stringOrNull === null)
                    continue;

                var
                    testResults = JSON.parse(stringOrNull),
                    someEntries = testResults.map(function(testResult) {
                        testResult.testName = testNames[i];
                        return testResult;
                    });
                entries = entries.concat(someEntries);
            }

            entries = entries.sort(function(a,b) {
                return moment(b.date, dateFormat).diff(moment(a.date, dateFormat));
            });

            return entries;
        };
    }

    function getSavedTestResultWithTestNameAndId(testName, resultId) {
        var
            testResults = getSavedTestResultsWithTestName(testName),
            testResult;

        while((testResult = testResults.pop())) 
            if(testResult.resultId === resultId)
                return testResult;
    }

    storage
        .value('getUnsavedTestResults', getUnsavedTestResults)
        .value('getOldestUnsavedTestResult', getOldestUnsavedTestResult)
        .value('savedOldestUnsavedTestResult', savedOldestUnsavedTestResult)
        .value('testNames', testNames)
        .value('tests', tests)
        .value('addTest', addTest)
        .factory('listTestResults', listTestResultsFactory)
        .value('latestTestResult', latestTestResult)
        .factory('saveTestResult', saveTestResultFactory)
        .value('clearStorage', clearStorage)
        .factory('saveTestResultToServer', saveTestResultToServerFactory)
        .value('user', user)
        .factory('loadUserFromServer', loadUserFromServerFactory)
        .factory('saveUserToServer', saveUserToServerFactory)
        .factory('loadAllTestResultsFromServer', loadAllTestResultsFromServerFactory)
        .factory('loadValueToGradeFromServer', loadValueToGradeFromServerFactory)
        .factory('loadDataVersionsFromServer', loadDataVersionsFromServerFactory)
        .factory('getLatestSavedResults', getLatestSavedResultsFactory)
        .value('getSavedTestResultWithTestNameAndId', getSavedTestResultWithTestNameAndId)
        .run(serverConnectionDelegatorFactory);

})(angular.module('Storage', []));
