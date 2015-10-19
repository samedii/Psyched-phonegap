(function(storage) {
    'use strict';

    var
        testTypes = [
            //'pullup'
        ],
        tests = {
            /*pullup: {
                    ...
                }
            }*/
        };

    function addTest(type, test) {
        testTypes.push(type);
        tests[type] = test;
    }

    function getSavedDataArr(type) {
        //hold copy in memory?
        var stringOrNull = localStorage.getItem(type);

        if (stringOrNull === null)
            return [];

        return JSON.parse(stringOrNull);
    }

    function isDateOutside(date, from, to) {
        return date.isBefore(from) || date.isAfter(to); //TODO: check if incorrect after change
    }

    function listEntries(type, from, to) {
        //this can be done so much faster since array is ordered
        var entries = getSavedDataArr(type);
        return entries.filter(function(entry) {
            return !isDateOutside(moment(entry.date), from, to);
        })
    }

    function latestEntry(type) {
        var entries = getSavedDataArr(type);
        return entries[entries.length-1];
    }

    function saveEntry(type, entry) {

        var entries = getSavedDataArr(type);

        entries.push(entry);

        localStorage.setItem(type, JSON.stringify(entries));
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

        for (i = testTypes.length - 1; i >= 0; --i) {

            var type = testTypes[i];

            entries = getSavedDataArr(type);

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
        .value('testTypes', testTypes)
        .value('tests', tests)
        .value('addTest', addTest)
        .value('listEntries', listEntries)
        .value('latestEntry', latestEntry)
        .value('saveEntry', saveEntry)
        .value('clearStorage', clearStorage);

})(angular.module('Storage', []));
