(function(averageLeadFlash) {
    'use strict';

    averageLeadFlash
        .run(function(addTest) {

            addTest('averageLeadFlash', {
                type: 'measurement',
                name: 'Average lead flash'
            });
        });

})(angular.module('Form.AverageLeadFlash', [
    'Storage'
]));
