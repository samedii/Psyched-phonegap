(function(form) {
    'use strict';

    function FormCtrl($scope, saveEntry, $routeParams, $window, $location) {

        $scope.routeParams = $routeParams;

        $scope.entry = {
            date: moment().toISOString()
        };

        $scope.saveEntry = function() {
            saveEntry($routeParams.form, $scope.entry);
            $location.path('/graph');
        };

        $scope.back = function() {
            $window.history.back();
        };
    }

    form.controller('FormCtrl', FormCtrl);

})(angular.module('Form', [
    'Form.Pullup',
    'Form.DeadHangEdge',
    'Storage',
    'ngRoute'
]));
