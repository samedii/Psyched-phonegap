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

})(angular.module('Tests.IronCross', [
    'Storage'
]));
