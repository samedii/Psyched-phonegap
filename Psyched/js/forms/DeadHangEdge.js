(function(deadHangEdge) {
    'use strict';

    var
        values = [18, 6],
        grades = ['6A', '8B'];

    deadHangEdge
        .run(function(addTest) {

            addTest('deadHangEdge', {
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

})(angular.module('Form.DeadHangEdge', [
    'Storage'
]));

