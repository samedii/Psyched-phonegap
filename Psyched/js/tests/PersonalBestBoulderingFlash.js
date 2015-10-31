(function(personalBestBoulderingFlash) {
    'use strict';

    personalBestBoulderingFlash
        .run(function(addTest) {

            addTest('personalBestBoulderingFlash', {
                type: 'measurement',
                name: 'Personal best bouldering flash'
            });
        });

})(angular.module('Tests.PersonalBestBoulderingFlash', [
    'Storage'
]));
