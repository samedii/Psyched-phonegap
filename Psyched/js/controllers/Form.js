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
    'Storage',
    'ngRoute',
    'Form.ApeIndex',
    'Form.AverageBoulderingFlash',
    'Form.AverageBoulderingRedPoint',
    'Form.AverageLeadFlash',
    'Form.AverageLeadRedPoint',
    'Form.DeadHangEdge',
    'Form.DeadHangPocket',
    'Form.DeadHangSloper',
    'Form.DipsRings',
    'Form.DragonFlags',
    'Form.Height',
    'Form.IronCross',
    'Form.LegLength',
    'Form.Onearms',
    'Form.PersonalBestBoulderingFlash',
    'Form.PersonalBestBoulderingRedPoint',
    'Form.PersonalBestLeadFlash',
    'Form.PersonalBestLeadRedPoint',
    'Form.Pullups',
    'Form.Pushups',
    'Form.Typewriters',
    'Form.Weight'
]));

//Pistol squats
//Knee lifts
//Leg lifts
//Muscle ups, rings, bar
//Dips, rings, bar
//
//font lever
//-vanlig
//-v
//-ett ben
//-hopkurad
//flaggan
//-varianter
//iron cross
//-whole
//-half
//-elbow
//one arm
//muscle up
//-bar
//-rings
//dragon flag
//-variant?
//plankan x min
//Beast maker stuff
//Cambus board
//
