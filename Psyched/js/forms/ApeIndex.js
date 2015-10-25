(function(apeIndex) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    apeIndex
        .run(function(addTest) {

            addTest('apeIndex', {
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
                name: 'Ape index',
                unit: 'cm'
            });
        });

})(angular.module('Form.ApeIndex', [
    'Storage'
]));
