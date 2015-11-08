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
        valueToGrade = valueToGradeOrNull == null ? {} : JSON.stringify(valueToGradeOrNull);

    angular.merge(tests, valueToGrade);

    function serverConnectionDelegatorFactory(loadDataVersionsFromServer, saveUserToServer, saveTestResultToServer) {

        $(storage).on('internetConnectionConfirmed', serverConnectionDelegator);

        var timeOfLastVersionCheck;

        function serverConnectionDelegator() {

            if(localStorage.getItem('unsavedUser') === true)
                return saveUserToServer();

            if(getOldestUnsavedTestResult())
                return saveTestResultToServer();

            if(timeOfLastVersionCheck && moment().diff(timeOfLastVersionCheck, 'minutes') > 1)
                loadDataVersionsFromServer();

            timeOfLastVersionCheck = moment();
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
                            if(response.data.lastModified != user.lastModified) {
                                loadUserFromServer();
                                loadAllTestResultsFromServer();
                            }
                            if(response.data.updateTime != localStorage.getItem('updateTime')) {
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
                            localStorage.setItem('valueToGrade', JSON.stringify(response.data.valueToGrade));
                            angular.merge(tests, response.data.valueToGrade);
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

    function getTestResults(name) {
        var unsavedTestResults = getUnsavedTestResults().filter(function(unsavedTestResult) {
            return unsavedTestResult.testName == name;
        }).map(function(unsavedTestResult) {
            return unsavedTestResult.testResult;
        });
        var stringOrNull = localStorage.getItem(name);
        if(stringOrNull === null)
            return unsavedTestResults;
        return JSON.parse(stringOrNull).concat(unsavedTestResults);
    }

    function listTestResultsFactory(dateFormat) {
        return function listTestResults(name, from) {
            //this can be done much faster since array is ordered
            var testResults = getTestResults(name);
            return testResults.filter(function(testResult) {
                return moment(testResult.date, dateFormat).isAfter(from);
            })
        };
    }

    function latestTestResult(name) {
        var testResults = getTestResults(name);
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

        test.stableRedPointBouldering = {
            values: [5, 25],
            grades: ['6A', '8A']
        };
        test.stableRedPointLead = {
            values: [5, 25],
            grades: ['6b', '8b']
        };
        tests[name] = test;
    }

    function journal(noOfTestResults) {
        //just get all testResults and sort? ineffective but easy

        var
            testResultsIndices = [],
            testResultsMatrix = [],
            testResults,
            i;

        for (i = testNames.length - 1; i >= 0; --i) {

            var name = testNames[i];

            testResults = getTestResults(name);

            if (testResults.length > 0) {
                testResultsIndices.push(-1);
                testResultsMatrix.push(testResults);
            }
        }

        var journalTestResults = [];

        for (var noOfTestResultsLeft = noOfTestResults; noOfTestResultsLeft > 0; --noOfTestResultsLeft) {

            var
                latestDate,
                latest;

            for (i = testResultsMatrix.length - 1; i >= 0; --i) {

                testResults = testResultsMatrix[i];

                var index = testResultsIndices[i] + 1;

                if (testResults.length <= index) {
                    testResultsIndices.splice(i, 1);
                    testResultsMatrix.splice(i, 1);
                } else {
                    var testResult = testResults[index];

                    if (latestDate.isBefore(testResult.date)) {
                        latestDate = testResult.date;
                        latest = i;
                    }

                }

            }

            ++testResultsIndices[latest];

            journalTestResults.push(testResultsMatrix[latest][testResultsIndices[latest]]);

        }

        return journalTestResults;
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
        .run(serverConnectionDelegatorFactory);

})(angular.module('Storage', []));
