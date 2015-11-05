(function(storage) {
    'use strict';

    var
        testNames = [
            //'pullups'
        ],
        tests = {
            /*pullups: {
                    ...
                }
            }*/
        };

    function addTest(name, test) {
        testNames.push(name);
        var
            values = [5, 25],
            grades = ['6A', '8B'];
        test.points = {
            lead: {
                values: values,
                grades: grades
            },
            bouldering: {
                values: values,
                grades: grades
            }
        };
        tests[name] = test;
    }

    function getSavedDataArr(name) {
        //hold copy in memory?
        var stringOrNull = localStorage.getItem(name);

        if (stringOrNull === null)
            return [];

        return JSON.parse(stringOrNull);
    }

    function isDateOutside(date, from, to) {
        return date.isBefore(from) || date.isAfter(to); //TODO: check if incorrect after change
    }

    function listEntries(name, from, to) {
        //this can be done so much faster since array is ordered
        var entries = getSavedDataArr(name);
        return entries.filter(function(entry) {
            return !isDateOutside(moment(entry.date), from, to);
        })
    }

    function latestEntry(name) {
        var entries = getSavedDataArr(name);
        return entries[entries.length-1];
    }

    function saveEntry(name, entry) {

        var entries = getSavedDataArr(name);

        entries.push(entry);

        localStorage.setItem(name, JSON.stringify(entries));
    }

    function clearStorage() {
        localStorage.clear();
    }

    function journal(noOfEntries) {
        //just get all entries and sort? ineffective but easy

        var
            entriesIndices = [],
            entriesMatrix = [],
            entries,
            i;

        for (i = testNames.length - 1; i >= 0; --i) {

            var name = testNames[i];

            entries = getSavedDataArr(name);

            if (entries.length > 0) {
                entriesIndices.push(-1);
                entriesMatrix.push(entries);
            }
        }

        var journalEntries = [];

        for (var noOfEntriesLeft = noOfEntries; noOfEntriesLeft > 0; --noOfEntriesLeft) {

            var
                latestDate,
                latest;

            for (i = entriesMatrix.length - 1; i >= 0; --i) {

                entries = entriesMatrix[i];

                var index = entriesIndices[i] + 1;

                if (entries.length <= index) {
                    entriesIndices.splice(i, 1);
                    entriesMatrix.splice(i, 1);
                } else {
                    var entry = entries[index];

                    if (latestDate.isBefore(entry.date)) {
                        latestDate = entry.date;
                        latest = i;
                    }

                }

            }

            ++entriesIndices[latest];

            journalEntries.push(entriesMatrix[latest][entriesIndices[latest]]);

        }

        return journalEntries;
    }

    storage
        .value('testNames', testNames)
        .value('tests', tests)
        .value('addTest', addTest)
        .value('listEntries', listEntries)
        .value('latestEntry', latestEntry)
        .value('saveEntry', saveEntry)
        .value('clearStorage', clearStorage);

})(angular.module('Storage', []));
