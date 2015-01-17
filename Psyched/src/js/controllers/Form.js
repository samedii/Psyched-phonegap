(function(form) {
    'use strict';

    function FormCtrl($scope, saveEntry, $routeParams, $window) {
        $scope.entry = {
            date: moment().toISOString()
        };

        $scope.saveEntry = function() {
            saveEntry('pullup', $scope.entry);
            $state.go('graph', {
                graph: 'pullup'
            });
        };

        $scope.back = function() {
            $window.history.back();
        };
    }

    form.controller('FormCtrl', FormCtrl);

})(angular.module('Form', [
    'Form.Pullup',
    'Form.Transition',
    'Storage',
    'ngRoute'
]));
