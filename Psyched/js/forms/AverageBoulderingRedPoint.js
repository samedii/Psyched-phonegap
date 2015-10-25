(function(averageBoulderingRedPoint) {
    'use strict';

    averageBoulderingRedPoint
        .run(function(addTest) {

            addTest('averageBoulderingRedPoint', {
                type: 'measurement',
                name: 'Average bouldering red point'
            });
        });

})(angular.module('Form.AverageBoulderingRedPoint', [
    'Storage'
]));
