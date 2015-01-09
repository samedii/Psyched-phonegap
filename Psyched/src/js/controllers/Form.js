(function(form) {
    'use strict';

    function FormCtrl($scope, saveEntry, $state) {
        $scope.entry = {
            date: moment().toISOString()
        };

        $scope.saveEntry = function() {
            saveEntry('pullup', $scope.entry);
            $state.go('graph', {
                graph: 'pullup'
            });
        };
    }

    form.controller('FormCtrl', FormCtrl);

})(angular.module('Form', [
    'Form.Pullup',
    'Storage',
    'ui.router'
]));
