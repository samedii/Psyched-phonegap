(function(ironCross) {
    'use strict';

    ironCross
        .run(function(addTest) {

            addTest('ironCross', {
                type: 'challenge',
                name: 'Iron cross',
                unit: '%'
            });
        });

})(angular.module('Form.IronCross', [
    'Storage'
]));
