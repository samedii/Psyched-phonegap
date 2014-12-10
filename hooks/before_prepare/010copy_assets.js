#!/usr/bin/env node

console.log("=== Running copy required assets hook ===");

var fs = require('fs'),
    path = require('path');

var mkdirSync = function(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}

var mkdirpSync = function(dirpath) {
    var parts = dirpath.split(path.sep);
    for (var i = 1; i <= parts.length; i++) {
        mkdirSync(path.join.apply(null, parts.slice(0, i)));
    }
}

try {
    var ncp = require('ncp').ncp;

    var requirements = require('./../../JSCalendar/requirements.json');

    ncp.limit = 200;
    ncp.stopOnErr = true;

    requirements.forEach(function(requirement) {

        var source = './JSCalendar/' + requirement;
        var destination = './www/' + requirement;

        var folders = destination.split('/');
        folders.pop();

        mkdirpSync(path.normalize(folders.join('/')));

        ncp(source, destination, function(err) {
            if (err) {
                console.log('====== Error! Did not copy asset from ' + source + ' to ' + destination + ' ======');
                console.error(err);
                process.exit(1001);
            } else
                console.log('====== Copied asset from ' + source + ' to ' + destination + ' ======');
        });

    });

} catch (e) {
    console.error(e);
    console.error(e.stack);
    process.exit(1000);
}
