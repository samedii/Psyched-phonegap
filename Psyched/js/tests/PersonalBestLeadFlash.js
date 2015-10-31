(function(personalBestLeadFlash) {
    'use strict';

    personalBestLeadFlash
        .run(function(addTest) {

            addTest('personalBestLeadFlash', {
                type: 'measurement',
                name: 'Personal best lead flash'
            });
        });

})(angular.module('Tests.PersonalBestLeadFlash', [
    'Storage'
]));
