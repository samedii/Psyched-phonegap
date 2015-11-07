(function(graph) {
    'use strict';

    function GraphCtrl($scope) {

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

    function chartDirective(listTypes, testNames, grades, percentages, dateFormat) {




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

            var to = moment(),
                from = to.clone().subtract(scope.selected.time.time),
                entries = listTypes(testNames, from, to, 'bouldering').map(function(data) {
                    if (data[0].indexOf('x') === 0)
                        data.push(to.format(dateFormat));
                    else
                        data.push(data[data.length - 1]);
                    return data;
                }),
                xs = testNames.reduce(function(dict, test) {
                    dict[test] = 'x' + test;
                    return dict;
                }, {}),
                names = testNames.reduce(function(dict, test) {
                    dict[test] = test[0].toUpperCase() + test.slice(1);
                    return dict;
                }, {}),
                values = grades[scope.selected.type.type].reduce(function(arr, grade) {
                    arr.push(percentages[scope.selected.type.type][grade]);
                    return arr;
                }, []),
                regions = entries.reduce(function(dict, data) {
                    if (data[0].indexOf('x') === 0)
                        dict[data[0].slice(1)] = [{
                            start: data[data.length - 2],
                            style: 'dashed'
                        }];
                    return dict;
                }, {});

            function options() {
                return {
                    padding: {
                        right: 35,
                        left: 34
                    },
                    bindto: element[0],
                    data: {
                        xs: xs,
                        xFormat: '%Y-%m-%d %H:%M:%S',
                        columns: entries,
                        regions: regions,
                        groups: [
                            [
                                testNames
                            ]
                        ],
                        names: names,
                        type: 'line'
                    },
                    point: {
                        show: false
                    },
                    tooltip: {
                        show: false
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

            var chart = c3.generate(options());

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
