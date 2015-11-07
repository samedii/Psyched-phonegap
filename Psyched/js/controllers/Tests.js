(function(tests) {
    'use strict';

    function TestsCtrl($scope, saveTestResult, $routeParams, $window, $location, dateFormat) {

        $scope.routeParams = $routeParams;

        $scope.entry = {
            date: moment().format(dateFormat)
        };

        $scope.saveTestResult = function() {
            saveTestResult($routeParams.form, $scope.entry);
            $location.path('/graph');
        };

        $scope.back = function() {
            $window.history.back();
        };
    }

    tests.run(function(addTest) {
        addTest('apeIndex', {type: 'measurement', english: 'Ape index', unit: 'cm'});
        addTest('campusBoard', {type: 'challenge', english: 'Campus board'});
        addTest('deadHangEdge', {type: 'trial', english: 'Dead hang edge', unit: 'mm'});
        addTest('deadHangPocket', {type: 'trial', english: 'Dead hang edge'});
        addTest('deadHangSloper', {type: 'trial', english: 'Dead hang sloper'});
        addTest('dipsRings', {type: 'trial', english: 'dipsRings'});
        addTest('dragonFlags', {type: 'trial', english: 'dragonFlags'});
        addTest('height', {type: 'measurement', english: 'height', unit: 'cm'});
        addTest('ironCross', {type: 'challenge', english: 'ironCross'});
        addTest('legLength', {type: 'measurement', english: 'legLength', unit: 'cm'});
        addTest('legLifts', {type: 'trial', english: 'legLifts'});
        addTest('onearms', {type: 'trial', english: 'onearms'});
        addTest('personalBestBoulderingFlash', {type: 'measurement', english: 'personalBestBoulderingFlash'});
        addTest('personalBestBoulderingRedPoint', {type: 'measurement', english: 'personalBestBoulderingRedPoint'});
        addTest('personalBestLeadFlash', {type: 'measurement', english: 'personalBestLeadFlash'});
        addTest('personalBestLeadRedPoint', {type: 'measurement', english: 'personalBestLeadRedPoint'});
        addTest('pullups', {type: 'trial', english: 'pullups'});
        addTest('pushups', {type: 'trial', english: 'pushups'});
        addTest('situps', {type: 'trial', english: 'situps'});
        addTest('stableBoulderingFlash', {type: 'measurement', english: 'stableBoulderingFlash'});
        addTest('stableBoulderingRedPoint', {type: 'measurement', english: 'stableBoulderingRedPoint'});
        addTest('stableLeadFlash', {type: 'measurement', english: 'stableLeadFlash'});
        addTest('stableLeadRedPoint', {type: 'measurement', english: 'stableLeadRedPoint'});
        addTest('typewriters', {type: 'trial', english: 'typewriters'});
        addTest('weight', {type: 'measurement', english: 'weight', unit: 'kg'});
    });

    tests.controller('TestsCtrl', TestsCtrl);

})(angular.module('Tests', [
    'Storage',
    'ngRoute'
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
