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
            name: 'Boulder',
            type: 'boulder'
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
                name: 'Boulder',
                type: 'boulder'
            }
        };

    }

    function chartDirective(list, testTypes, grades, percentages) {




        return function chartLink(scope, element, attrs) {



            var to = moment(),
                from = to.clone().subtract(scope.selected.time.time),
                entries = list(from, to, testTypes, 'boulder').map(function(data) {
                    if (data[0].indexOf('x') === 0)
                        data.push(to.toISOString());
                    else
                        data.push(data[data.length - 1]);
                    return data;
                }),
                xs = testTypes.reduce(function(dict, test) {
                    dict[test] = 'x' + test;
                    return dict;
                }, {}),
                names = testTypes.reduce(function(dict, test) {
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
                        xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
                        columns: entries,
                        regions: regions,
                        groups: [
                            [
                                testTypes
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
                                format: '%d/%m'
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
    'Storage',
    'ngRoute'
]));
