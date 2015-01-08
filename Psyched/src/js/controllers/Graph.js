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

    function chart(list) {
        return function chartLink(scope, element, attrs) {

            var to = moment(),
                from = to.clone().subtract(scope.selected.time.time),
                entries = list(from, to, ['pullup'], 'boulder');


            var chart = c3.generate({
                    padding: {
                        right: 0,
                        left: 20
                    },
                    bindto: element[0],
                    data: {
                        xs: {
                            pullup: 'xpullup'
                        },
                        xFormat: '%Y-%m-%d %H:%M', //TODO: Wrong format
                        rows: entries,
                        /*groups: [
                            [
                                ['symptom', 'effect', 'worry', 'wellbeing']
                            ]
                        ],
                        names: {
                            symptom: 'Symptom',
                            effect: 'Påverkan',
                            worry: 'Oro',
                            wellbeing: 'Välbefinnande'
                        },*/
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
    'Storage'
]));
