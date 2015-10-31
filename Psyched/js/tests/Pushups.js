(function(pushups) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    pushups
        .run(function(addTest) {

            addTest('pushups', {
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
                name: 'Push-ups'
            });
        });

})(angular.module('Tests.Pushups', [
    'Storage'
]));
