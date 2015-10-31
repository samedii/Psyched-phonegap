(function(dipsRings) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    dipsRings
        .run(function(addTest) {

            addTest('dipsRings', {
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
                name: 'Dips rings'
            });
        });

})(angular.module('Tests.DipsRings', [
    'Storage'
]));
