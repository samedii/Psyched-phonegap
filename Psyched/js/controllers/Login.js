(function(login) {
    'use strict';

    function LoginCtrl($scope, user, loadUser, $http, $location) {
        $scope.user = user;

        $scope.user.email = 'test@gmail.com';
        $scope.password = 'test';

        $scope.login = function() {
            loadUser($scope.user.email, md5($scope.password));
        };

        $scope.create = function() {
            var
                email = $scope.user.email,
                passwordHash = md5($scope.password);

            $http.post(
                'http://direwolf.se/Psyched-Server/createUser.php',
                {
                    email: email,
                    passwordHash: passwordHash
                },
                {})
                .then(
                    function successCallback(response) {
                        if(response.data.error) {
                            console.log('createUser: error returned, ' + response.data.error);
                        }
                        else {
                            loadUser(email, passwordHash);
                        }
                    },
                    function errorCallback(response) {
                        console.log('createUser: error server');
                    }
                );
        };

        $scope.$watch('user.userId', function(userId) {
            if(userId)
                $location.path('/profile');
        })
    }

    login
        .controller('LoginCtrl', LoginCtrl);

})(angular.module('Login', [
    'Storage'
    ]));
