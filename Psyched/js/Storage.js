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

    function getOldestUnsavedTestResult() {
        var unsavedTestResults = getUnsavedTestResults();
        return unsavedTestResults.length > 0 ? unsavedTestResults[0] : false;
    }

    function getOldestUnsavedEditedTestResult() {
        var unsavedEditedTestResults = getUnsavedEditedTestResults();
        return unsavedEditedTestResults.length > 0 ? unsavedEditedTestResults[0] : false;
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

    function savedOldestUnsavedEditedTestResult(name, testResult) {
        var
            unsavedEditedTestResults = getUnsavedEditedTestResults(),
            savedTestResult = unsavedEditedTestResults.shift(); //TODO: unused, check equals
        localStorage.setItem('unsavedEditedTestResults', JSON.stringify(unsavedEditedTestResults));
    }

    function getUnsavedTestResults() {
        var stringOrNull = localStorage.getItem('unsavedTestResults');
        if(stringOrNull === null)
            return [];
        return JSON.parse(stringOrNull);
    }

    function getUnsavedEditedTestResults() {
        var stringOrNull = localStorage.getItem('unsavedEditedTestResults');
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

    function saveTestResultFactory(saveUnsavedTestResultToServer, saveUnsavedEditedTestResultToServer) {
        return function saveTestResult(name, testResult) {

            if(testResult.resultId === undefined) {
                //Create
                var unsavedTestResults = getUnsavedTestResults();
                unsavedTestResults.push({
                    testName: name,
                    testResult: testResult
                });
                localStorage.setItem('unsavedTestResults', JSON.stringify(unsavedTestResults));
                //saveUnsavedTestResultToServer();
            }
            else {
                //Edit/Update
                var unsavedEditedTestResults = getUnsavedEditedTestResults();
                unsavedEditedTestResults.push({
                    testName: name,
                    testResult: testResult
                });

                saveEditsToTestResult(name, testResult);

                localStorage.setItem('unsavedEditedTestResults', JSON.stringify(unsavedEditedTestResults));
                //saveUnsavedEditedTestResultToServer();
            }
        };
    }

    function saveEditsToTestResult(name, testResult) {
        var testResults = getSavedTestResultsWithTestName(name);
        for(var i = testResults.length-1; i >= 0; --i) {
            if(testResults[i].resultId === testResult.resultId) {
                testResults[i].value = testResult.value;
            }
        }

        localStorage.setItem(name, JSON.stringify(testResults));
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
        .value('getOldestUnsavedEditedTestResult', getOldestUnsavedEditedTestResult)
        .value('savedOldestUnsavedTestResult', savedOldestUnsavedTestResult)
        .value('savedOldestUnsavedEditedTestResult', savedOldestUnsavedEditedTestResult)
        .value('testNames', testNames)
        .value('tests', tests)
        .value('addTest', addTest)
        .factory('listTestResults', listTestResultsFactory)
        .value('latestTestResult', latestTestResult)
        .factory('saveTestResult', saveTestResultFactory)
        .value('clearStorage', clearStorage)
        .value('user', user)
        .factory('getLatestSavedResults', getLatestSavedResultsFactory)
        .value('getSavedTestResultWithTestNameAndId', getSavedTestResultWithTestNameAndId);

})(angular.module('Storage', [
    'Communication'
    ]));
