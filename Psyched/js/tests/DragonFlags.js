(function(dragonFlags) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    dragonFlags
        .run(function(addTest) {

            addTest('dragonFlags', {
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
                name: 'Dragon flags'
            });
        });

})(angular.module('Tests.DragonFlags', [
    'Storage'
]));
