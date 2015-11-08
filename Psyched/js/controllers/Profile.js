(function(profile) {
    'use strict';

    function ProfileCtrl($scope, latestTestResult, tests, user, dateFormat, saveUserToServer) {

        $scope.user = user;
        $scope.userBirth = moment(user.birth, dateFormat).toDate();
        $scope.changedUserBirth = function(userBirth) {
            $scope.user.birth = moment(userBirth).format('YYYY-MM-DD');
        };

        $scope.latestTestResult = latestTestResult;
        $scope.tests = tests;

        $scope.saveUserToServer = saveUserToServer;

    }

    profile
        .controller('ProfileCtrl', ProfileCtrl);

})(angular.module('Profile', [
    'Storage',
    'RadarChart'
    ]));
