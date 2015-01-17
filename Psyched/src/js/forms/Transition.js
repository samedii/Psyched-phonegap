(function(transition) {
    'use strict';

    var
        values = [18, 6],
        grades = ['6A', '8B'];

    transition
        .run(function(addTest) {

            addTest('transition', {
                points: {
                    lead: {
                        values: values,
                        grades: grades
                    },
                    boulder: {
                        values: values,
                        grades: grades
                    }
                },
                min: 0,
                permanence: function(date) {
                    return 1;
                }
            });
        });

})(angular.module('Form.Transition', [
    'Storage'
]));