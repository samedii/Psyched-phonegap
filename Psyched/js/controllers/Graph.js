(function(graph) {
    'use strict';

    function GraphCtrl($scope) {

        $scope.shouldHideGraphExplanation = localStorage.getItem('shouldHideGraphExplanation');
        $scope.hideGraphExplanation = function() {
            $scope.shouldHideGraphExplanation = true;
            localStorage.setItem('shouldHideGraphExplanation', true);
        };

        $scope.times = [{
            name: '1 week',
            time: {
                'w': 1
            }
        }, {
            name: '1 month',
            time: {
                'M': 1
            }
        }, {
            name: '3 months',
            time: {
                'M': 3
            }
        }, {
            name: '1 year',
            time: {
                'y': 1
            }
        }, {
            name: 'Show all',
            time: {
                'y': 100
            }
        }];

        $scope.types = [{
            name: 'Bouldering',
            type: 'bouldering'
        }, {
            name: 'Lead',
            type: 'lead'
        }];

        $scope.selected = {
            time: {
                name: 'Show all',
                time: {
                    'y': 100
                }
            },
            type: {
                name: 'Bouldering',
                type: 'bouldering'
            }
        };

    }

    function chartDirective(listTypes, testNames, grades, percentages, dateFormat, tests, getTestResultsWithTestName) {

        return function chartLink(scope, element, attrs) {

            //Min-Max?
            //http://c3js.org/samples/data_label_format.html
            //or add Weight (65-87 kg)
            //Challenges
            //Landmarks
            //http://c3js.org/samples/grid_x_lines.html
            //http://c3js.org/samples/api_grid_x.html
            //for big stuff, otherwise show progress (same as normal tests)
            //Control that looks the same for this (showing axis stuff or no)
            //add control with presets (show/hide challenges, recently changed, remove all, show all, ...)
            //
            //maybe custom legend http://c3js.org/samples/legend_custom.html

            var chart;

            function options() {

                var fewerTestNames = testNames.filter(function(testName) {
                    return ['height', 'legLength', 'apeIndex'].indexOf(testName) == -1 || getTestResultsWithTestName(testName).length > 1;
                });

                var
                    to = moment(),
                    from = to.clone().subtract(scope.selected.time.time),
                    entries = listTypes(fewerTestNames, from, scope.selected.type.type),
                    weights = entries.reduce(function(weights, data) {
                        weights[data[0]] = data.length;
                        return weights;
                    }, {}),
                    hide = fewerTestNames.sort(function(testNameA, testNameB) {
                        return weights[testNameB]-weights[testNameA];
                    }).slice(3),
                    columns = entries.map(function(data) {
                        if (data[0].indexOf('x') === 0)
                            data.push(to.format(dateFormat));
                        else
                            data.push(data[data.length - 1]);
                        return data;
                    }),
                    xs = fewerTestNames.reduce(function(dict, testName) {
                        dict[testName] = 'x' + testName;
                        return dict;
                    }, {}),
                    names = fewerTestNames.reduce(function(dict, testName) {
                        dict[testName] = testName[0].toUpperCase() + testName.slice(1);
                        return dict;
                    }, {}),
                    values = grades[scope.selected.type.type].reduce(function(arr, grade) {
                        arr.push(percentages[scope.selected.type.type][grade]);
                        return arr;
                    }, []),
                    regions = columns.reduce(function(dict, data) {
                        if (data[0].indexOf('x') === 0)
                            dict[data[0].slice(1)] = [{
                                start: data[data.length - 2],
                                style: 'dashed'
                            }];
                        return dict;
                    }, {});

                return {
                    padding: {
                        right: 35,
                        left: 34
                    },
                    bindto: element[0],
                    data: {
                        xs: xs,
                        xFormat: '%Y-%m-%d %H:%M:%S',
                        columns: columns,
                        regions: regions,
                        groups: [
                            [
                                fewerTestNames
                            ]
                        ],
                        names: names,
                        type: 'line',
                        hide: hide
                    },
                    point: {
                        show: false
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        item: {
                            onclick: function (id) {
                                chart.toggle(id);
                            }
                        }
                    },
                    axis: {
                        x: {
                            label: 'Date',
                            type: 'timeseries',
                            tick: {
                                format: '%d/%m',
                                fit: false
                            }
                        },
                        y: {
                            max: 1,
                            min: 0,
                            label: 'Grade',
                            padding: {
                                top: 0,
                                bottom: 0
                            },
                            tick: {
                                values: values,
                                format: function(d) {
                                    return grades[scope.selected.type.type][values.indexOf(d)];
                                }
                            }
                        },
                        y2: {
                            max: 1,
                            min: 0,
                            label: 'Min-Max',
                            show: true,
                            tick: {
                                format: function(d) {
                                    return d * 100 + '%';
                                }
                            }
                        }
                    }
                };
            }

            chart = c3.generate(options());

            scope.$watchGroup(['selected.type.type', 'selected.time.time'], function() {
                chart.destroy();
                chart = c3.generate(options());
            });

        };
    }

    graph
        .controller('GraphCtrl', GraphCtrl)
        .directive('chart', chartDirective);

})(angular.module('Graph', [
    'GraphingAssistant',
    'ngRoute'
]));
