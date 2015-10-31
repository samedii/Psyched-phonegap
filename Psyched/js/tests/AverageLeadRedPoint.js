(function(averageLeadRedPoint) {
    'use strict';

    averageLeadRedPoint
        .run(function(addTest) {

            addTest('AverageLeadRedPoint', {
                type: 'measurement',
                name: 'Average lead red point'
            });
        });

})(angular.module('Tests.AverageLeadRedPoint', [
    'Storage'
]));
