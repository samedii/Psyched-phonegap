(function(weight) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    weight
        .run(function(addTest) {

            addTest('weight', {
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
                name: 'Weight',
                unit: 'kg'
            });
        });

})(angular.module('Form.Weight', [
    'Storage'
]));
