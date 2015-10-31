(function(personalBestBoulderingRedPoint) {
    'use strict';

    personalBestBoulderingRedPoint
        .run(function(addTest) {

            addTest('personalBestBoulderingRedPoint', {
                type: 'measurement',
                name: 'Personal best bouldering red point'
            });
        });

})(angular.module('Tests.PersonalBestBoulderingRedPoint', [
    'Storage'
]));
