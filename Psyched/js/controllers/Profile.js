(function(profile) {
    'use strict';

    function ProfileCtrl($scope, saveTestResult, latestTestResult, tests, user, dateFormat) {

        $scope.moment = moment;

        $scope.user = user;
        $scope.userBirth = moment(user.birth, dateFormat).toDate();
        $scope.changedUserBirth = function(userBirth) {
            $scope.user.birth = moment(userBirth).format(dateFormat);
        };

        $scope.latestTestResult = latestTestResult;
        $scope.tests = tests;

        $scope.saveTestResult = function() {
            saveTestResult('type', 'value');
        };
    }

    profile
        .controller('ProfileCtrl', ProfileCtrl);

})(angular.module('Profile', [
    'Storage',
    'RadarChart'
    ]));
