(function(personalBestLeadRedPoint) {
    'use strict';

    personalBestLeadRedPoint
        .run(function(addTest) {

            addTest('personalBestLeadRedPoint', {
                type: 'measurement',
                name: 'Personal best lead red point'
            });
        });

})(angular.module('Tests.PersonalBestLeadRedPoint', [
    'Storage'
]));
