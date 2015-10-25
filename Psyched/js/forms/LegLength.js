(function(legLength) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    legLength
        .run(function(addTest) {

            addTest('legLength', {
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
                type: 'measurement',
                name: 'Leg length',
                unit: 'cm'
            });
        });

})(angular.module('Form.LegLength', [
    'Storage'
]));
