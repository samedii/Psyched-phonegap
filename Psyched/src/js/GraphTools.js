(function(tools) {
    'strict';

    function firstEntryDate(list) {
        if(list.length === 0)
            return moment();

        var earliest = list[0].date;
        for (var i = list.length - 1; i > 0; i--) {
            earliest = list[i].date.isBefore(earliest) ? list[i].date : earliest;
        }
        return earliest;
    }

    tools
        .value('firstEntryDate', firstEntryDate);

})(angular.module('Graph.tools', []));



(function(test) {
    'strict';

    function r(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    function b(from, to) {
        var a = r(1, 3),
            d = from.clone().add(r(0, Math.ceil(to.diff(from, 'd', true))), 'd');

        return {
            type: a == 1 ? 'normal' : a == 2 ? 'diarrhoea' : 'bloody',
            pain: r(0, 1),
            date: d
        };
    }

    function s(date) {

        return {
            symptom: r(0, 100),
            effect: r(0, 100),
            worry: r(0, 100),
            wellbeing: r(0, 100),
            date: date
        };
    }

    function listBowel(from, to, onlyNight) {
        var l = [];
        for (var i = 0; i < to.diff(from, 'd')*2 && i < 100; ++i) {
            l.push(b(from, to));
        }

        return l;
    }

    function listSHS(from, to) {
        var l = [],
            last = s(from),
            weight = 0.6;

        for (var i = 0; i < to.diff(from, 'w')*2 && i < 100; ++i) {

            var
                date = from.clone().add(i*2, 'w'),
                n = s(date);

            n.symptom = n.symptom*(1-weight)+last.symptom*weight;
            n.effect = n.effect*(1-weight)+last.effect*weight;
            n.worry = n.worry*(1-weight)+last.worry*weight;
            n.wellbeing = n.wellbeing*(1-weight)+last.wellbeing*weight;

            l.push(n);
            last = n;
        }

        return l;
    }

    test
        .value('listSHS', listSHS)
        .value('listBowel', listBowel);

})(angular.module('Graph.tools.test', []));
