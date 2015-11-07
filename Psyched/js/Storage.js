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
        user = localStorage.getItem('user') || {/*
            userId: 1,
            name: 'Richard Hermanson',
            birth: '1989-12-23 00:00:00',
            startedClimbing: 2010,
            email: 'samedii@gmail.com',
            passwordHash: 'test',
            lastModified: '2015-11-06 00:00:00'
        */};

    function loadUserFactory($http) {
        return function loadUser(email, passwordHash) {
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
                        }
                    },
                    function errorCallback(response) {
                        console.log('loadUser: error server');
                    }
                );
        };
    }

    function tryToSaveFactory($http) {
        return function tryToSave() {
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

                                if(unsavedTestResult.oldLastModified != user.lastModified) {
                                    console.log('TODO: missing data, need to reload');
                                }
                                user.lastModified = unsavedTestResult.lastModified;
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
        var unsavedTestResults = getUnsavedTestResults();
        unsavedTestResults = unsavedTestResults.filter(function(testResult) {
            return testResult.name == name;
        });
        var stringOrNull = localStorage.getItem(name);
        if(stringOrNull === null)
            return unsavedTestResults;
        return JSON.parse(stringOrNull).concat(unsavedTestResults);
    }

    function isDateOutside(date, from, to) {
        return date.isBefore(from) || date.isAfter(to);
    }

    function listTestResultsFactory(dateFormat) {
        return function listTestResults(name, from, to) {
            //this can be done much faster since array is ordered
            var testResults = getTestResults(name);
            return testResults.filter(function(testResult) {
                return !isDateOutside(moment(testResult.date, dateFormat), from, to);
            })
        };
    }

    function latestTestResult(name) {
        var testResults = getTestResults(name);
        if(testResults.length > 0)
            return testResults[testResults.length-1];
        return undefined;
    }

    function saveTestResultFactory(tryToSave) {
        return function saveTestResult(name, testResult) {
            //TODO: check if resultId already exists (update result)
            var unsavedTestResults = getUnsavedTestResults();
            unsavedTestResults.push({
                testName: name,
                testResult: testResult
            });
            localStorage.setItem('unsavedTestResults', JSON.stringify(unsavedTestResults));
            tryToSave();
        };
    }

    function clearStorage() {
        localStorage.clear();
    }

    function addTest(name, test) {
        testNames.push(name);
        var
            values = [5, 25],
            grades = ['6A', '8B'];

        test.points = {
            lead: {
                values: values,
                grades: grades
            },
            bouldering: {
                values: values,
                grades: grades
            }
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
        .factory('tryToSave', tryToSaveFactory)
        .value('user', user);

})(angular.module('Storage', []));
