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
    .action(function(size, length = 0) {
        size = Number(size);
        length = Number(length);

        console.log(new Cube(size).generateScrambleString(length));
    });

//
// turn
//
program
    .command('turn [size] [turns]')
    .description('apply a series of turns to a cube of a given size')
    .action(function(size, turns) {
        size = Number(size);
        turns = String(turns);

        var cube = new Cube(size);

        cube.turn(turns);

        console.log(JSON.stringify(cube.state));
    });

program.parse(process.argv);
