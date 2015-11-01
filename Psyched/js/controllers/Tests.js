(function(tests) {
    'use strict';

    function TestsCtrl($scope, saveEntry, $routeParams, $window, $location) {

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

    tests.controller('TestsCtrl', TestsCtrl);

})(angular.module('Tests', [
    'Storage',
    'ngRoute',
    'Tests.ApeIndex',
    'Tests.AverageBoulderingFlash',
    'Tests.AverageBoulderingRedPoint',
    'Tests.AverageLeadFlash',
    'Tests.AverageLeadRedPoint',
    'Tests.DeadHangEdge',
    'Tests.DeadHangPocket',
    'Tests.DeadHangSloper',
    'Tests.DipsRings',
    'Tests.DragonFlags',
    'Tests.Height',
    'Tests.IronCross',
    'Tests.LegLength',
    'Tests.LegLifts',
    'Tests.Onearms',
    'Tests.PersonalBestBoulderingFlash',
    'Tests.PersonalBestBoulderingRedPoint',
    'Tests.PersonalBestLeadFlash',
    'Tests.PersonalBestLeadRedPoint',
    'Tests.Pullups',
    'Tests.Pushups',
    'Tests.Typewriters',
    'Tests.Situps',
    'Tests.Weight'
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
