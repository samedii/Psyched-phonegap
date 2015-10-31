(function(profile) {
    'use strict';

    function ProfileCtrl($scope, saveEntry, latestEntry) {

        $scope.moment = moment;

        $scope.editables = {
            name: 'Carl Richard Hermanson',
            birth: moment().toDate(),
            startedClimbing: 2010
        }

        $scope.latestEntry = latestEntry;

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
