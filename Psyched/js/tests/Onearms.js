(function(onearms) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    onearms
        .run(function(addTest) {

            addTest('onearms', {
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
                name: 'One-arm pull-ups'
            });
        });

})(angular.module('Tests.Onearms', [
    'Storage'
]));
