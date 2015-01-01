(function(graph) {
    'use strict';

    function GraphCtrl($scope) {

        $scope.times = [{
            name: '1 vecka',
            time: {
                'w': 1
            }
        }, {
            name: '1 månad',
            time: {
                'M': 1
            }
        }, {
            name: '3 månader',
            time: {
                'M': 3
            }
        }, {
            name: '1 år',
            time: {
                'y': 1
            }
        }, {
            name: 'Allt',
            time: {
                'y': 100
            }
        }];

        $scope.graphs = [{
            'name': 'Fingers',
        }, {
            'name': 'Core',
        }, {
            'name': 'Lower body',
        }];

        $scope.selected = {
            time: {
                name: '3 månader',
                time: {
                    'M': 3
                }
            },
            graph: {
                'name': 'Fingers',
            }
        };


    }

    function chart(firstEntryDate, listSHS) {
        return function chartLink(scope, element, attrs) {
            var to = moment(),
                from = to.clone().subtract(scope.selected.time.time);

            var shs = listSHS(from, to);

            from = firstEntryDate(shs);

            shs = shs.map(function(e) {
                return [e.symptom, e.effect, e.worry, e.wellbeing, e.date.format('YYYY-MM-DD h:m')];
            });

            shs.unshift(['symptom', 'effect', 'worry', 'wellbeing', 'date']);

            var chart = c3.generate({
                padding: {
                    top: 10,
                    right: 0,
                    bottom: 0,
                    left: 20,
                },
                bindto: element[0],
                data: {
                    x: 'date',
                    xFormat: '%Y-%m-%d %H:%M',
                    rows: shs,
                    groups: [
                        [
                            ['symptom', 'effect', 'worry', 'wellbeing']
                        ]
                    ],
                    names: {
                        symptom: 'Symptom',
                        effect: 'Påverkan',
                        worry: 'Oro',
                        wellbeing: 'Välbefinnande'
                    },
                    type: 'line'
                },
                color: {
                    pattern: ['rgb(255, 127, 14)', 'rgb(214, 39, 40)', 'rgb(31, 119, 180)', 'rgb(44, 160, 44)']
                },
                point: {
                    show: false
                },
                tooltip: {
                    show: false
                },
                axis: {
                    x: {
                        label: 'Datum',
                        type: 'timeseries',
                        tick: {
                            format: '%d/%m'
                        },
                        padding: {
                            left: 0
                        }
                    },
                    y: {
                        max: 100,
                        min: 0,
                        label: {
                            text: 'Värde'
                        },
                        padding: {
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
        };
    }

    graph
        .controller('GraphCtrl', GraphCtrl)
        .directive('chart', chart);

})(angular.module('Graph', [
    'Graph.tools',
    'Graph.tools.test'
]));
