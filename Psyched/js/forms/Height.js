(function(height) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    height
        .run(function(addTest) {

            addTest('height', {
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
                name: 'Height',
                unit: 'cm'
            });
        });

})(angular.module('Form.Height', [
    'Storage'
]));
