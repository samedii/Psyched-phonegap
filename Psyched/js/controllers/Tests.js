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
        addTest('dipsRings', {type: 'trial', english: 'Dips rings'});
        addTest('dragonFlags', {type: 'trial', english: 'Dragon flags'});
        addTest('height', {type: 'measurement', english: 'Height', unit: 'cm'});
        addTest('ironCross', {type: 'challenge', english: 'Iron cross'});
        addTest('legLength', {type: 'measurement', english: 'Leg length', unit: 'cm'});
        addTest('legLifts', {type: 'trial', english: 'Leg lifts'});
        addTest('onearms', {type: 'trial', english: 'Onearms'});
        addTest('personalBestBoulderingFlash', {type: 'measurement', english: 'Personal best bouldering flash', isGrade: true, gradeType: 'bouldering'});
        addTest('personalBestBoulderingRedpoint', {type: 'measurement', english: 'Personal best bouldering redpoint', isGrade: true, gradeType: 'bouldering'});
        addTest('personalBestLeadFlash', {type: 'measurement', english: 'Personal best lead flash', isGrade: true, gradeType: 'lead'});
        addTest('personalBestLeadRedpoint', {type: 'measurement', english: 'Personal best lead redpoint', isGrade: true, gradeType: 'lead'});
        addTest('pullups', {type: 'trial', english: 'Pull-ups'});
        addTest('pushups', {type: 'trial', english: 'Push-ups'});
        addTest('stickSitups', {type: 'trial', english: 'Stick sit-ups'});
        addTest('stableBoulderingFlash', {type: 'measurement', english: 'Stable bouldering flash', isGrade: true, gradeType: 'bouldering'});
        addTest('stableBoulderingRedpoint', {type: 'measurement', english: 'Stable bouldering redpoint', isGrade: true, gradeType: 'bouldering'});
        addTest('stableLeadFlash', {type: 'measurement', english: 'Stable lead flash', isGrade: true, gradeType: 'lead'});
        addTest('stableLeadRedpoint', {type: 'measurement', english: 'Stable lead redpoint', isGrade: true, gradeType: 'lead'});
        addTest('typewriters', {type: 'trial', english: 'Typewriters'});
        addTest('weight', {type: 'measurement', english: 'Weight', unit: 'kg'});
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
