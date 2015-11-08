(function(radarChart) {
    'use strict';

    function calculateGroupDataFactory(latestTestResult, valueToPercentage) {
        return function calculateGroupData(discipline) {

            function weightedAverage(testNames, weights) {

                var
                    testName,
                    entry,
                    weightedSum = 0,
                    totalWeight = 0;

                for(var i = testNames.length-1; i>=0; --i) {
                    testName = testNames[i];
                    entry = latestTestResult(testName);
                    if(!entry)
                        continue;
                    //could let weight change depending on age of data
                    weightedSum += valueToPercentage(entry.value,testName,discipline)*weights[i];
                    totalWeight += weights[i];
                }

                if(totalWeight === 0)
                    return 0;
                return weightedSum/totalWeight;
            }

            return [[
                //fingers
                weightedAverage(
                    ['deadHangEdge', 'deadHangPocket', 'deadHangSloper'],
                    [5,1,1]),
                //arms
                weightedAverage(
                    ['pullups','onearms','typewriters'],
                    [1,1,0.5]),
                //upperBody
                weightedAverage(
                    ['pullups','dipsRings','onearms','typewriters'],
                    [1,2,1,4]),
                //core
                weightedAverage(
                    ['legLifts','dipsRings'],
                    [1,0.2]),
                //lowerBody
                weightedAverage(
                    ['legLifts'],
                    [1])
            ]];
        };
    }

    function RadarChartCtrl($scope, calculateGroupData) {
        $scope.labels =['Fingers', 'Arms', 'Upper body', 'Core', 'Lower body'];

        $scope.data = calculateGroupData('bouldering');


        var scaleSteps = 5;

        $scope.options = {
            //Boolean - Whether to show lines for each scale point
            scaleShowLine : true,

            //Boolean - Whether we show the angle lines out of the radar
            angleShowLineOut : true,

            scaleOverride: true,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: scaleSteps,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: 1/scaleSteps,
            // Number - The scale starting value
            scaleStartValue: 0,

            //Boolean - Whether to show labels on the scale
            scaleShowLabels : false,

            scaleLabel: "<%=value%>replace",

            // Boolean - Whether the scale should begin at zero
            scaleBeginAtZero : true,

            //String - Colour of the angle line
            angleLineColor : "rgba(0,0,0,.1)",

            //Number - Pixel width of the angle line
            angleLineWidth : 1,

            //String - Point label font declaration
            pointLabelFontFamily : "'Arial'",

            //String - Point label font weight
            pointLabelFontStyle : "normal",

            //Number - Point label font size in pixels
            pointLabelFontSize : 10,

            //String - Point label font colour
            pointLabelFontColor : "#666",

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 3,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

        }

    }

    radarChart
        .factory('calculateGroupData', calculateGroupDataFactory)
        .controller('RadarChartCtrl', RadarChartCtrl);

})(angular.module('RadarChart', [
    'Storage',
    'GraphingAssistant',
    'chart.js'
]));