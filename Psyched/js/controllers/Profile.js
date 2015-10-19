(function(profile) {
    'use strict';

    function ProfileCtrl($scope, saveEntry) {

        $scope.moment = moment;

        $scope.editables = {
            name: 'Carl Richard Hermanson',
            birth: moment().toDate(),
            startedClimbing: 2010
        }

        //TODO: add get latest entry in storage and expose to scope here
        $scope.latestEntry = function() { return 4; };

        $scope.saveEntry = function() {
            saveEntry('type', 'value');
        };
    }

    function radarChart() {
        return radarChartLink;
    }

    function radarChartLink(scope, element, attrs) {

        var
            body = $('.app-content'),
            size = Math.min(body.height()-20, body.width()-200-15);

        var w = size,
            h = size;

        var colorscale = d3.scale.category10();

        //Legend titles
        var LegendOptions = ['Simon'];

        //Data
        var d = [
            [{
                axis: "Fingers",
                value: 0.59
            }, {
                axis: "Upper body",
                value: 0.56
            }, {
                axis: "Lower body",
                value: 0.42
            }, {
                axis: "Core",
                value: 0.34
            }, {
                axis: "Technique",
                value: 0.48
            }]
        ];

        //Options for the Radar chart, other than default
        var mycfg = {
            w: w,
            h: h,
            ExtraWidthX: 200,
            maxValue: 1,
            levels: 10
        };

        //Call function to draw the Radar chart
        //Will expect that data is in %'s
        RadarChart.draw(element[0], d, mycfg);

        ////////////////////////////////////////////
        /////////// Initiate legend ////////////////
        ////////////////////////////////////////////

        var svg = d3.select('#body')
            .selectAll('svg')
            .append('svg')
            .attr("width", w + 300)
            .attr("height", h);

        //Create the title for the legend
        var text = svg.append("text")
            .attr("class", "title")
            .attr('transform', 'translate(90,0)')
            .attr("x", w - 70)
            .attr("y", 10)
            .attr("font-size", "12px")
            .attr("fill", "#404040")
            .text("What % of owners use a specific service in a week");

        //Initiate Legend
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 200)
            .attr('transform', 'translate(90,20)');
        //Create colour squares
        legend.selectAll('rect')
            .data(LegendOptions)
            .enter()
            .append("rect")
            .attr("x", w - 65)
            .attr("y", function(d, i) {
                return i * 20;
            })
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d, i) {
                return colorscale(i);
            });
        //Create text next to squares
        legend.selectAll('text')
            .data(LegendOptions)
            .enter()
            .append("text")
            .attr("x", w - 52)
            .attr("y", function(d, i) {
                return i * 20 + 9;
            })
            .attr("font-size", "11px")
            .attr("fill", "#737373")
            .text(function(d) {
                return d;
            });

    }

    profile
        .controller('ProfileCtrl', ProfileCtrl)
        .directive('radarChart', radarChart);

})(angular.module('Profile', [
    'Storage'
    ]));
