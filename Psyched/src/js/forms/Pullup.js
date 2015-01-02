(function(pullup) {
    'use strict';

    pullup
        .run(function(addTest) {
            addTest('pullup', {
                toBoulder: function(value) {
                    return '6A';
                },
                toLead: function(value) {
                    return '6a';
                },
                permanence: function(date) {
                    return 1;
                }
            });
        });

})(angular.module('Form.Pullup', [
    'Storage'
]));
