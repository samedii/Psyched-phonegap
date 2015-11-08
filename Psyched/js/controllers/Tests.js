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
        addTest('deadHangPocket', {type: 'trial', english: 'Dead hang pocket'});
        addTest('deadHangSloper', {type: 'trial', english: 'Dead hang sloper'});
        addTest('dipsRings', {type: 'trial', english: 'dipsRings'});
        addTest('dragonFlags', {type: 'trial', english: 'dragonFlags'});
        addTest('height', {type: 'measurement', english: 'height', unit: 'cm'});
        addTest('ironCross', {type: 'challenge', english: 'ironCross'});
        addTest('legLength', {type: 'measurement', english: 'legLength', unit: 'cm'});
        addTest('legLifts', {type: 'trial', english: 'legLifts'});
        addTest('onearms', {type: 'trial', english: 'onearms'});
        addTest('personalBestBoulderingFlash', {type: 'measurement', english: 'personalBestBoulderingFlash', isGrade: true, gradeType: 'bouldering'});
        addTest('personalBestBoulderingRedpoint', {type: 'measurement', english: 'personalBestBoulderingRedpoint', isGrade: true, gradeType: 'bouldering'});
        addTest('personalBestLeadFlash', {type: 'measurement', english: 'personalBestLeadFlash', isGrade: true, gradeType: 'lead'});
        addTest('personalBestLeadRedpoint', {type: 'measurement', english: 'personalBestLeadRedpoint', isGrade: true, gradeType: 'lead'});
        addTest('pullups', {type: 'trial', english: 'pullups'});
        addTest('pushups', {type: 'trial', english: 'pushups'});
        addTest('situps', {type: 'trial', english: 'situps'});
        addTest('stableBoulderingFlash', {type: 'measurement', english: 'stableBoulderingFlash', isGrade: true, gradeType: 'bouldering'});
        addTest('stableBoulderingRedpoint', {type: 'measurement', english: 'stableBoulderingRedpoint', isGrade: true, gradeType: 'bouldering'});
        addTest('stableLeadFlash', {type: 'measurement', english: 'stableLeadFlash', isGrade: true, gradeType: 'lead'});
        addTest('stableLeadRedpoint', {type: 'measurement', english: 'stableLeadRedpoint', isGrade: true, gradeType: 'lead'});
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
