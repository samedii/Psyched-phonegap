(function(deadHangEdge) {
    'use strict';

    var
        values = [18, 6],
        grades = ['6A', '8B'];

    deadHangEdge
        .run(function(addTest) {

            addTest('deadHangEdge', {
                points: {
                    lead: {
                        values: values,
                        grades: grades
                    },
                    bouldering: {
                        values: values,
                        grades: grades
                    }
                },
                type: 'trial',
                name: 'Dead hang edge',
                unit: 'mm'
            });
        });

})(angular.module('Tests.DeadHangEdge', [
    'Storage'
]));

