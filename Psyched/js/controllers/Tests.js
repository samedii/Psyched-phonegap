(function(tests) {
    'use strict';

    function TestsCtrl($scope, saveTestResult, $routeParams, $window, $location, dateFormat, getSavedTestResultWithTestNameAndId, tests) {

        $scope.routeParams = $routeParams;

        $scope.tests = tests;

        if($routeParams.resultId) {
            $scope.entry = getSavedTestResultWithTestNameAndId($routeParams.testName, $routeParams.resultId)
        }
        else {
            $scope.entry = {};
        }

        $scope.saveTestResult = function() {
            if(!$routeParams.resultId) {
                $scope.entry.date = moment().format(dateFormat);
            }
            saveTestResult($routeParams.testName, $scope.entry);
            $location.path('/graph');
        };

        $scope.back = function() {
            $window.history.back();
        };

    }

    tests.run(function(addTest) {
        addTest('apeIndex', {type: 'measurement', english: 'Ape index', unit: 'cm', min: -50, max: 50});
        addTest('campusBoard', {type: 'challenge', english: 'Campus board', overrideInput: true});
        addTest('crimp', {type: 'trial', english: 'Crimp', unit: 'mm', min: 0.1, max: 50});
        addTest('openHand', {type: 'trial', english: 'Open hand', unit: 'mm', min: 0.1, max: 50});
        addTest('sloper35Degrees', {type: 'trial', english: '35° sloper', unit: 's', min: 1, max: 1000});
        addTest('sloper45Degrees', {type: 'challenge', english: '45° sloper', unit: 's', min: 1, max: 10000});
        addTest('onefingerPocket', {type: 'challenge', english: 'One-finger pocket', unit: 's', min: 1, max: 1000});
        addTest('twofingerPocket', {type: 'trial', english: 'Two-finger pocket', unit: 's', min: 1, max: 10000});
        addTest('dipsBars', {type: 'trial', english: 'Dips on bars', min: 1, max: 1000});
        addTest('dipsRings', {type: 'trial', english: 'Dips on rings', min: 1, max: 1000});
        addTest('dragonFlags', {type: 'challenge', english: 'Dragon flags', min: 1, max: 400});
        addTest('humanFlag', {type: 'challenge', english: 'Human flag', unit: 's', min: 1, max: 1000});
        addTest('height', {type: 'measurement', english: 'Height', unit: 'cm', min: 40, max: 400});
        addTest('ironCross', {type: 'challenge', english: 'Iron cross', unit: 's', min: 1, max: 100});
        addTest('legLength', {type: 'measurement', english: 'Leg length', unit: 'cm', min: 20, max: 200});
        addTest('legLifts', {type: 'trial', english: 'Leg lifts', min: 1, max: 200});
        addTest('onearms', {type: 'challenge', english: 'Onearms', min: 1, max: 200});
        addTest('personalBestBoulderingFlash', {type: 'measurement', english: 'PB bouldering flash', isGrade: true, gradeType: 'bouldering'});
        addTest('personalBestBoulderingRedpoint', {type: 'measurement', english: 'PB bouldering redpoint', isGrade: true, gradeType: 'bouldering'});
        addTest('personalBestLeadFlash', {type: 'measurement', english: 'PB lead flash', isGrade: true, gradeType: 'lead'});
        addTest('personalBestLeadRedpoint', {type: 'measurement', english: 'PB lead redpoint', isGrade: true, gradeType: 'lead'});
        addTest('pullups', {type: 'trial', english: 'Pull-ups', min: 1, max: 1000});
        addTest('pushups', {type: 'trial', english: 'Push-ups', min: 1, max: 10000});
        addTest('stableBoulderingFlash', {type: 'measurement', english: 'Stable bouldering flash', isGrade: true, gradeType: 'bouldering'});
        addTest('stableBoulderingRedpoint', {type: 'measurement', english: 'Stable bouldering redpoint', isGrade: true, gradeType: 'bouldering'});
        addTest('stableLeadFlash', {type: 'measurement', english: 'Stable lead flash', isGrade: true, gradeType: 'lead'});
        addTest('stableLeadRedpoint', {type: 'measurement', english: 'Stable lead redpoint', isGrade: true, gradeType: 'lead'});
        addTest('typewriters', {type: 'trial', english: 'Typewriters', min: 1, max: 1000});
        addTest('weight', {type: 'measurement', english: 'Weight', unit: 'kg', min: 20, max: 400});
        addTest('frontLever', {type: 'challenge', english: 'Front lever', unit: 's', min: 1, max: 1000});
        addTest('muscleupsRings', {type: 'challenge', english: 'Muscle-ups on rings', min: 1, max: 1000});
        addTest('muscleupsBar', {type: 'challenge', english: 'Muscle-ups on bar', min: 1, max: 1000});
    });

    tests
        .controller('TestsCtrl', TestsCtrl)
        .directive('stringToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function(value) {
                        return parseFloat(value, 10);
                    });
                }
            };
        });

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
