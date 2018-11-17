import Cube from '../../src/cube';
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

        expect(cube.state.u.map(sticker => sticker.index)).to.deep.equal([
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

    it('exposes "history" showing what turns have been made', function(done) {
        const cube = new Cube(2);
        expect(cube.history.length).to.equal(0);
        expect(cube.getLastTurn()).to.be.undefined;

        setTimeout(() => {
            cube.turn('F');
            expect(cube.history.length).to.equal(1);            

            setTimeout(() => {
                cube.turn('R');
                expect(cube.history.length).to.equal(2);
                expect(cube.history[1].date > cube.history[0].date).to.be.true;

                done();
            }, 25);
        }, 50);
    })

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
        
        expect(cube.history[0].parsedTurn).to.deep.equal(f);
        expect(cube.history[1].parsedTurn).to.deep.equal(r);
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
        expect(cube.history.length).to.equal(0);

        const turn = scramble.pop();
        expect(typeof turn).to.equal('object');
        expect(typeof turn.depth).to.equal('number');
        expect(typeof turn.double).to.equal('boolean');
        expect(typeof turn.face).to.equal('string');
        expect(typeof turn.outer).to.equal('boolean');
        expect(typeof turn.prime).to.equal('boolean');
    });

    it('can scramble the cube', function() {
        const cube = new Cube(2);

        cube.scramble(5);

        // the currentScramble should be set, and no history should be
        // logged for the turns to scramble the cube
        expect(cube.isSolved()).to.be.false;
        expect(cube.currentScramble.length).to.equal(5);
        expect(cube.history.length).to.equal(0);
    });
});