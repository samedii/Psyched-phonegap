(function(pullup) {
    'use strict';

    var
        values = [5, 25],
        grades = ['6A', '8B'],
        percentages;


    function getPercentage(value) {

        //assumes values are sorted

        var geq; //greater than or equal
        for (geq = values.length - 1; geq > 0 && value < values[geq]; --geq);

        if (value === values[geq])
            return percentages[geq];

        if (value < values[geq])
            ++geq; //smaller than smallest value

        //between grades or past
        var
            slope = (percentages[geq] - percentages[geq - 1]) / (values[geq] - values[geq - 1]),
            p = slope * (value - values[geq - 1]) + values[geq - 1];

        return p;
    }

    pullup
        .run(function(addTest) {

            //prep percentages
            percentages = [0.1, 0.90];


            addTest('pullup', {
                min: 0,
                boulderPercentages: percentages,
                leadPercentages: percentages,
                permanence: function(date) {
                    return 1;
                }
            });
        });

})(angular.module('Form.Pullup', [
    'Storage'
]));
