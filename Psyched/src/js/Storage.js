(function(storage) {
    'use strict';

    var
        grades = {
            lead: [
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
            boulder: [
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
            ]
        },
        percentages = {
            lead: arrayToPercent(grades.lead),
            boulder: arrayToPercent(grades.boulder)
        },
        testTypes = [
            //'pullup'
        ],
        tests = {
            /*pullup: {
                    ...
                }
            }*/
        };

    function arrayToPercent(grades) {

        var map = {},
            l = grades.length - 1;

        for (var i = 0; i <= l; ++i) {
            map[grades[i]] = i / l;
        }

        return map;
    }

    function addTest(type, test) {
        testTypes.push(type);
        tests[type] = test;
    }

    function getSavedDataArr(type) {
        var stringOrNull = localStorage.getItem(type);

        if (stringOrNull === null)
            return [];

        return JSON.parse(stringOrNull);
    }

    function isDateOutside(date, from, to) {
        return date.isBefore(from) && date.isAfter(to);
    }

    function valueToPercentage(value, type, discipline) {

        //assumes values are sorted

        var
            points = tests[type][discipline],
            values = points.values,
            grades = points.grades;

        var geq; //greater than or equal
        for (geq = values.length - 1; geq > 0 && value < values[geq]; --geq);

        if (value === values[geq])
            return percentages[discipline][grades[geq]];

        if (value < values[geq])
            ++geq; //smaller than smallest value

        //between grades or past
        var
            better = percentages[discipline][grades[geq]],
            worse = percentages[discipline][grades[geq-1]],
            slope = (better - worse) / (values[geq] - values[geq - 1]),
            p = slope * (value - values[geq - 1]) + values[geq - 1];

        return p;
    }

    function listSingleTestData(from, to, type, discipline) {

        var entries = getSavedDataArr(type);

        var
            data = [],
            x = [],
            entry;

        while ((entry = entries.shift())) {

            if (isDateOutside(moment(entry.date), from, to))
                continue;

            data.push(valueToPercentage(entry.value, type, discipline));
            x.push(entry.date);
        }

        data.unshift(type);
        x.unshift('x' + type);

        return [x, data];
    }

    function list(from, to, types, discipline) {
        return types.reduce(function(data, type) {
            return data.concat(listSingleTestData(from, to, type, discipline));
        },[]);
    }

    function saveEntry(type, entry) {

        var entries = getSavedDataArr(type);

        entries.push(entry);

        localStorage.setItem(type, JSON.stringify(entries));
    }

    function clearStorage() {
        localStorage.clear();
    }


    storage
        .value('testTypes', testTypes)
        .value('tests', tests)
        .value('addTest', addTest)
        .value('list', list)
        .value('saveEntry', saveEntry)
        .value('clearStorage', clearStorage);

})(angular.module('Storage', []));
