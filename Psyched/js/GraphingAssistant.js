(function(assistant) {
    'use strict';

    //TODO: usage, go between storage and graph
    //convert format

    function arrayToPercent(grades) {

        var map = {},
            l = grades.length - 1;

        for (var i = 0; i <= l; ++i) {
            map[grades[i]] = i / l;
        }

        return map;
    }

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
                '5c',
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
            bouldering: [
                '3',
                '4-',
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
        conversionNames = {
            lead: ['YDS'],
            bouldering: ['Hueco']
        },
        conversionGrades = {
            Hueco: {
                '3': 'VB',
                '4-': 'V0-',
                '4+': 'V0+',
                '5': 'V1',
                '5+': 'V2',
                '6A': 'V3',
                '6A+': 'V3',
                '6B': 'V4',
                '6B+': 'V4',
                '6C': 'V5',
                '6C+': 'V5/V6',
                '7A': 'V6',
                '7A+': 'V7',
                '7B': 'V8',
                '7B+': 'V8/V9',
                '7C': 'V9',
                '7C+': 'V10',
                '8A': 'V11',
                '8A+': 'V12',
                '8B': 'V13',
                '8B+': 'V14',
                '8C': 'V15',
                '8C+': 'V16',
            },
            YDS: {
                '1': '3-4',
                '2': '5.1',
                '3': '5.3',
                '4a': '5.4',
                '4b': '5.5',
                '4c': '5.6',
                '5a': '5.7',
                '5b': '5.8',
                '5c': '5.9',
                '6a': '5.10a',
                '6a+': '5.10b',
                '6b': '5.10c',
                '6b+': '5.10d',
                '6c': '5.11a/5.11b',
                '6c+': '5.11b/5.11c',
                '7a': '5.11d',
                '7a+': '5.12a',
                '7b': '5.12b',
                '7b+': '5.12c',
                '7c': '5.12d',
                '7c+': '5.13a',
                '8a': '5.13b',
                '8a+': '5.13c',
                '8b': '5.13d',
                '8b+': '5.14a',
                '8c': '5.14b',
                '8c+': '5.14c',
                '9a': '5.14d',
                '9a+': '5.15a',
                '9b': '5.15b',
                '9b+': '5.15c'
            }
        },
        percentages = {
            lead: arrayToPercent(grades.lead),
            bouldering: arrayToPercent(grades.bouldering)
        };

    function valueToPercentageFactory(tests) {
        return function valueToPercentage(value, name, discipline) {

            //assumes values are sorted

            var
                grading = discipline == 'bouldering' ? 'stableBoulderingRedpoint' : 'stableLeadRedpoint',
                points = tests[name][grading];

            if(!points)
                return false;

            var
                values = points.values, //TODO: these can be grades already (how hard do you climb?)
                grades = points.grades; //TODO: if these don't exist? max-min

            var geq; //greater than or equal
            for (geq = values.length - 1; geq > 0 && value < values[geq]; --geq);

            if (value === values[geq])
                return percentages[discipline][grades[geq]];

            if (geq === 0)
                ++geq;

            //between grades or past
            var
                better = percentages[discipline][grades[geq]],
                worse = percentages[discipline][grades[geq - 1]],
                slope = (better - worse) / (values[geq] - values[geq - 1]),
                p = slope * (value - values[geq - 1]) + worse;

            return p;
        };
    }

    function listSingleTestTypeFactory(listTestResults, valueToPercentage, tests) {
        return function listSingleTestType(name, from, discipline) {
            var entries = listTestResults(name, from);
            if(entries.length === 0)
                return [];

            var
                values = [name],
                dates = ['x' + name],
                entry;

            var
                grading = discipline == 'bouldering' ? 'stableBoulderingRedpoint' : 'stableLeadRedpoint',
                points = tests[name][grading];

            if(points) {
                while((entry = entries.shift())) {
                    values.push(valueToPercentage(entry.value, name, discipline));
                    dates.push(entry.date);
                }
            }
            else if(tests[name].isGrade) {
                while((entry = entries.shift())) {
                    values.push(percentages[tests[name].gradeType][entry.value]);
                    dates.push(entry.date);
                }
            }
            else {
                var min = entries[0].value, max = min, entryValue;
                for(var i = entries.length-1; i>=1; --i) {
                    entryValue = entries[i].value;
                    if(entryValue > max) max = entryValue;
                    else if(entryValue < min) min = entryValue;
                }
                while ((entry = entries.shift())) {
                    if(max-min == 0) values.push(0.5);
                    else values.push((entry.value-min)/(max-min));
                    dates.push(entry.date);
                }
            }

            return [dates, values];
        };
    }

    function listTypesFactory(listSingleTestType) {
        return function listTypes(names, from, discipline) {
            return names.reduce(function(data, name) {
                return data.concat(listSingleTestType(name, from, discipline));
            }, []);
        };
    }

    assistant
        .value('grades', grades)
        .value('percentages', percentages)
        .value('conversionNames', conversionNames)
        .value('conversionGrades', conversionGrades)
        .factory('valueToPercentage', valueToPercentageFactory)
        .factory('listSingleTestType', listSingleTestTypeFactory)
        .factory('listTypes', listTypesFactory);

})(angular.module('GraphingAssistant', [
    'Storage'
    ]));
