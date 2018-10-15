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
});