(function(pullups) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    pullups
        .run(function(addTest) {

            addTest('pullups', {
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
                name: 'Pull-ups'
            });
        });

})(angular.module('Form.Pullups', [
    'Storage'
]));
