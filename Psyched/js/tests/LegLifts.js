(function(legLifts) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    legLifts
        .run(function(addTest) {

            addTest('legLifts', {
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
                name: 'Leg lifts'
            });
        });

})(angular.module('Tests.LegLifts', [
    'Storage'
]));
