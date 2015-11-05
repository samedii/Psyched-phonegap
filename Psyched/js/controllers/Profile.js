(function(profile) {
    'use strict';

    function ProfileCtrl($scope, saveEntry, latestEntry, tests) {

        $scope.moment = moment;

        $scope.user = {
            name: 'Carl Richard Hermanson',
            birth: moment().toDate(),
            startedClimbing: 2010
        }

        $scope.latestEntry = latestEntry;
        $scope.tests = tests;

        $scope.saveEntry = function() {
            saveEntry('type', 'value');
        };
    }

    profile
        .controller('ProfileCtrl', ProfileCtrl);

})(angular.module('Profile', [
    'Storage',
    'RadarChart'
    ]));
