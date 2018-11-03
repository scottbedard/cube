#!/usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var Cube = require('./dist/cube.cjs.js');

program.version(pkg.version, '-v, --version');

//
// scramble
//
program
    .command('scramble [size] [length]')
    .description('generate a scramble for a cube of a given size')
    .action(function(size, length) {
        size = Number(size) || 3;
        length = Number(length) || 0;
        
        console.log(new Cube(size).generateScrambleString(length));
    });

program.parse(process.argv);
