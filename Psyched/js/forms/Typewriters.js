(function(typewriters) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    typewriters
        .run(function(addTest) {

            addTest('typewriters', {
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
                name: 'Typewriter pull-ups'
            });
        });

})(angular.module('Form.Typewriters', [
    'Storage'
]));
