(function(pullup) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    pullup
        .run(function(addTest) {

            addTest('pullup', {
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

})(angular.module('Form.Pullup', [
    'Storage'
]));
