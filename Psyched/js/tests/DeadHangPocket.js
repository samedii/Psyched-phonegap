(function(deadHangPocket) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    deadHangPocket
        .run(function(addTest) {

            addTest('deadHangPocket', {
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
                name: 'Dead hang pocket'
            });
        });

})(angular.module('Tests.DeadHangPocket', [
    'Storage'
]));
