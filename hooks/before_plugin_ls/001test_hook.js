#!/usr/bin/env node

console.log("=== Before plugin list test hook running ===");

var fs = require('fs'),
    path = require('path'),
    ncp = require('ncp').ncp;