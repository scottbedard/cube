import Cube from '../../src/cube';
import { expect } from 'chai';

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

    it('exposes "isSolved" to test if cube is solved', function() {
        // the cube should be in an initial solved state
        const cube = new Cube(2);
        expect(cube.isSolved()).to.be.true;

        // making a turn should now show the cube as unsolved
        cube.turn('F');
        expect(cube.isSolved()).to.be.false;

        // and undoing the turn should return it to a solved state
        cube.turn('F-');
        expect(cube.isSolved()).to.be.true;
    });
});