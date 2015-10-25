(function(averageBoulderingFlash) {
    'use strict';

    averageBoulderingFlash
        .run(function(addTest) {

            addTest('averageBoulderingFlash', {
                type: 'measurement',
                name: 'Average bouldering flash'
            });
        });

})(angular.module('Form.AverageBoulderingFlash', [
    'Storage'
]));
