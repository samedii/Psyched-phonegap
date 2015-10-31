(function(situps) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'];

    situps
        .run(function(addTest) {

            addTest('situps', {
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
                name: 'Sit-ups'
            });
        });

})(angular.module('Tests.Situps', [
    'Storage'
]));
