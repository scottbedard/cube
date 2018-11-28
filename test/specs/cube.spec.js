import Cube from '../../src/cube';
import { spy } from 'sinon';
import { expect } from 'chai';
import { parseTurn } from '../../src/utils';

//
// specs
//
describe('Cube', function() {
    it('creates a cube of a given size', function() {
        const cube = new Cube(2);
        expect(cube.size).to.equal(2);
        expect(cube.state.u).to.deep.equal([0, 0, 0, 0]);
        expect(cube.state.l).to.deep.equal([1, 1, 1, 1]);
        expect(cube.state.f).to.deep.equal([2, 2, 2, 2]);
        expect(cube.state.r).to.deep.equal([3, 3, 3, 3]);
        expect(cube.state.b).to.deep.equal([4, 4, 4, 4]);
        expect(cube.state.d).to.deep.equal([5, 5, 5, 5]);
    });

    it('can use objects as sticker values', function() {
        const cube = new Cube(2, { useObjects: true });

        expect(cube.state.u.map(sticker => sticker.originalIndex)).to.deep.equal([
            0, 1, 2, 3,
        ]);

        expect(cube.state.u.map(sticker => sticker.value)).to.deep.equal([
            0, 0, 0, 0,
        ]);
    });

    it('throws an error if constructed with an invalid size', function() {
        expect(() => new Cube('foo')).to.throw();
        expect(() => new Cube(1)).to.throw();
        expect(() => new Cube(2.5)).to.throw();
        expect(() => new Cube(Infinity)).to.throw();
        expect(() => new Cube(NaN)).to.throw();
    });

    it('tests for solved state using integer values', function() {
        const cube = new Cube(2);
        expect(cube.isSolved()).to.be.true;

        cube.turn('F');
        expect(cube.isSolved()).to.be.false;

        cube.turn('F-');
        expect(cube.isSolved()).to.be.true;
    });

    it('tests for solved state using object values', function() {
        const cube = new Cube(2, { useObjects: true });
        expect(cube.isSolved()).to.be.true;

        cube.turn('F');
        expect(cube.isSolved()).to.be.false;

        cube.turn('F-');
        expect(cube.isSolved()).to.be.true;
    });

    it('can be turned with an array of turn objects', function() {
        const cube = new Cube(2);
        const f = parseTurn('F');
        const r = parseTurn('R');

        cube.turn([f, r]);

        expect(cube.isSolved()).to.be.false;
    });

    it('generates scrambles at a default length', function() {
        const cube = new Cube(3);
        const scramble = cube.generateScramble();
        expect(scramble.length).to.equal(27);
    });

    it('can generate scrambles of a given length', function() {
        const cube = new Cube(3);
        const scramble = cube.generateScramble(5);
        expect(scramble.length).to.equal(5);

        const turn = scramble.pop();
        expect(typeof turn).to.equal('object');
        expect(typeof turn.depth).to.equal('number');
        expect(typeof turn.double).to.equal('boolean');
        expect(typeof turn.face).to.equal('string');
        expect(typeof turn.outer).to.equal('boolean');
        expect(typeof turn.prime).to.equal('boolean');
    });

    it('generates a scramble string', function() {
        const cube = new Cube(3);

        expect(typeof cube.generateScrambleString(5)).to.equal('string');
    });

    it('can scramble the cube', function() {
        const cube = new Cube(2);

        cube.scramble(5);
        
        expect(cube.isSolved()).to.be.false;
    });

    it('exposes a method to itterate over all stickers', function() {
        const fn = spy();
        const cube = new Cube(2);

        cube.stickers(fn);

        expect(fn.callCount).to.equal(24);
    });

    it('exposes a method to parse turn strings', function() {
        const cube = new Cube(2);
        const turn = cube.parseTurn('F');

        expect(typeof turn).to.be.equal('object');
    });
});