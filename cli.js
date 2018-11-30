#!/usr/bin/env node
var Cube = require('./dist/cube.cjs.js');
var pkg = require('./package.json');
var program = require('commander');

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
// test
//
program.command('test [size] [state] [turns]')
    .description('test a solution')
    .action(function(size, state, turns) {
        size = Number(size);
        state = JSON.parse(String(state));
        turns = String(turns);

        var cube = new Cube(size);

        cube.state = state;

        cube.turn(turns);

        console.log(cube.isSolved() ? 1 : 0);
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
