import Cube from '../../src/cube';
import { spy } from 'sinon';
import { expect } from 'chai';
import { parseTurn } from '../../src/notation';

//
// specs
//
describe('Cube', function() {
    it('creates a cube of a given size', function() {
        const cube = new Cube(2);
        expect(cube.size).to.equal(2);
        expect(cube.state.U).to.deep.equal([0, 0, 0, 0]);
        expect(cube.state.L).to.deep.equal([1, 1, 1, 1]);
        expect(cube.state.F).to.deep.equal([2, 2, 2, 2]);
        expect(cube.state.R).to.deep.equal([3, 3, 3, 3]);
        expect(cube.state.B).to.deep.equal([4, 4, 4, 4]);
        expect(cube.state.D).to.deep.equal([5, 5, 5, 5]);
    });

    it('can use objects as sticker values', function() {
        const cube = new Cube(2, { useObjects: true });

        expect(cube.state.U.map(sticker => sticker.originalIndex)).to.deep.equal([
            0, 1, 2, 3,
        ]);

        expect(cube.state.U.map(sticker => sticker.value)).to.deep.equal([
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
        const u = new Cube(2);
        const l = new Cube(2);
        const f = new Cube(2);
        const r = new Cube(2);
        const b = new Cube(2);
        const d = new Cube(2);

        u.turn('U');
        l.turn('L');
        f.turn('F');
        r.turn('R');
        b.turn('B');
        d.turn('D');
        expect(u.isSolved()).to.be.false;
        expect(l.isSolved()).to.be.false;
        expect(f.isSolved()).to.be.false;
        expect(r.isSolved()).to.be.false;
        expect(b.isSolved()).to.be.false;
        expect(d.isSolved()).to.be.false;

        u.turn('U-');
        l.turn('L-');
        f.turn('F-');
        r.turn('R-');
        b.turn('B-');
        d.turn('D-');
        expect(u.isSolved()).to.be.true;
        expect(l.isSolved()).to.be.true;
        expect(f.isSolved()).to.be.true;
        expect(r.isSolved()).to.be.true;
        expect(b.isSolved()).to.be.true;
        expect(d.isSolved()).to.be.true;
    });

    it('tests for solved state using object values', function() {
        const u = new Cube(2, { useObjects: true });
        const l = new Cube(2, { useObjects: true });
        const f = new Cube(2, { useObjects: true });
        const r = new Cube(2, { useObjects: true });
        const b = new Cube(2, { useObjects: true });
        const d = new Cube(2, { useObjects: true });

        u.turn('U');
        l.turn('L');
        f.turn('F');
        r.turn('R');
        b.turn('B');
        d.turn('D');
        expect(u.isSolved()).to.be.false;
        expect(l.isSolved()).to.be.false;
        expect(f.isSolved()).to.be.false;
        expect(r.isSolved()).to.be.false;
        expect(b.isSolved()).to.be.false;
        expect(d.isSolved()).to.be.false;

        u.turn('U-');
        l.turn('L-');
        f.turn('F-');
        r.turn('R-');
        b.turn('B-');
        d.turn('D-');
        expect(u.isSolved()).to.be.true;
        expect(l.isSolved()).to.be.true;
        expect(f.isSolved()).to.be.true;
        expect(r.isSolved()).to.be.true;
        expect(b.isSolved()).to.be.true;
        expect(d.isSolved()).to.be.true;
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