(function(storage) {
    'use strict';

    var
        leadGrades = [
            '1',
            '2',
            '3',
            '4a',
            '4b',
            '4c',
            '5a',
            '5b',
            '6a',
            '6a+',
            '6b',
            '6b+',
            '6c',
            '6c+',
            '7a',
            '7a+',
            '7b',
            '7b+',
            '7c',
            '7c+',
            '8a',
            '8a+',
            '8b',
            '8b+',
            '8c',
            '8c+',
            '9a',
            '9a+',
            '9b',
            '9b+'
        ],
        boulderGrades = [
            '3',
            '4-',
            '4',
            '4+',
            '5',
            '5+',
            '6A',
            '6A+',
            '6B',
            '6B+',
            '6C',
            '6C+',
            '7A',
            '7A+',
            '7B',
            '7B+',
            '7C',
            '7C+',
            '8A',
            '8A+',
            '8B',
            '8B+',
            '8C',
            '8C+'
        ],
        arrayToPercent = function(grades) {

            var map = {},
                l = grades.length - 1;

            for (var i = 0; i <= l; ++i) {
                map[grades[i]] = i / l;
            }

            return map;
        },
        leadToPercent = arrayToPercent(leadGrades),
        boulderToPercent = arrayToPercent(boulderGrades),
        testTypes = [
            //'pullup'
        ],
        tests = {
            /*pullup: {
                    ...
                }
            }*/
        };

    function addTest(type, test) {
        testTypes.push(type);
        tests[type] = test;
    }

    function getSavedDataArr(type) {
        var stringOrNull = localStorage.getItem(type);

        if (stringOrNull === null)
            return null;

        return JSON.parse(stringOrNull);
    }

    function getSingleTestData(type, discipline) {

        var entries = getSavedDataArr(type);

        if (entries === null)
            return [type];

        var toGrade, toPercent;
        if (discipline == 'lead') {
            toGrade = tests[type].toLead;
            toPercent = leadToPercent;
        } else {
            toGrade = tests[type].toBoulder;
            toPercent = boulderToPercent;
        }

        var
            data = [],
            x = [],
            entry;

        while ((entry = entries.shift())) {
            data.push(toPercent(toGrade(entry.value)));
            x.push(moment(entry.date));
        }

        data.unshift(type);
        x.unshift('x' + type);

        return [x, data];
    }

    function getTestData(types, discipline) {
        return types.reduce(function(data, type) {
            return data.concat(getSingleTestData(type, discipline));
        });
    }

    function saveEntry(type, entry) {
        var entries = getSavedDataArr(type);

        if (entries === null)
            entries = [];

        entries.push(entry);

        localStorage.setItem(type, JSON.stringify(entries));
    }

    function clearStorage() {
        localStorage.clear();
    }


    storage
        .value('leadToPercent', leadToPercent)
        .value('boulderToPercent', boulderToPercent)
        .value('testTypes', testTypes)
        .value('tests', tests)
        .value('addTest', addTest)
        .value('getTestData', getTestData)
        .value('saveEntry', saveEntry)
        .value('clearStorage', clearStorage);

})(angular.module('Storage', []));
