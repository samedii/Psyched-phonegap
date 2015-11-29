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

    function capitalize() {
      return function(input, scope) {
        if (input!=null)
        input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
      }
    }

    profile
        .controller('ProfileCtrl', ProfileCtrl)
        .filter('capitalize', capitalize);

})(angular.module('Profile', [
    'Storage',
    'RadarChart'
    ]));
