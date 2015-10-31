(function(deadHangSloper) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    deadHangSloper
        .run(function(addTest) {

            addTest('deadHangSloper', {
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
                name: 'Dead hang sloper'
            });
        });

})(angular.module('Tests.DeadHangSloper', [
    'Storage'
]));
