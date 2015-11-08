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
            bouldering: arrayToPercent(grades.bouldering)
        };

    function valueToPercentageFactory(tests) {
        return function valueToPercentage(value, name, discipline) {

            //assumes values are sorted

            var
                grading = discipline == 'bouldering' ? 'stableRedpointBouldering' : 'stableRedpointLead',
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
        .factory('valueToPercentage', valueToPercentageFactory)
        .factory('listSingleTestType', listSingleTestTypeFactory)
        .factory('listTypes', listTypesFactory);

})(angular.module('GraphingAssistant', [
    'Storage'
    ]));
