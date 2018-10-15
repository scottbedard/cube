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

	describe('turn', function() {
		let cube;

		beforeEach(function() {
			cube = new Cube(3);

			// index all the stickers so we can make better assertions on them
			Object.keys(cube.state).forEach(face => {
				cube.state[face] = cube.state[face].map((val, i) => face + i);
			});
		});

		// it.only('', function() {
		// 	cube.turn('');
			
		// 	expect(cube.state).to.deep.equal({
		// 		u: [
		// 			'u0', 'u1', 'u2',
		// 			'u3', 'u4', 'u5',
		// 			'u6', 'u7', 'u8',
		// 		],
		// 		l: [
		// 			'l0', 'l1', 'l2',
		// 			'l3', 'l4', 'l5',
		// 			'l6', 'l7', 'l8',
		// 		],
		// 		f: [
		// 			'f0', 'f1', 'f2',
		// 			'f3', 'f4', 'f5',
		// 			'f6', 'f7', 'f8',
		// 		],
		// 		r: [
		// 			'r0', 'r1', 'r2',
		// 			'r3', 'r4', 'r5',
		// 			'r6', 'r7', 'r8',
		// 		],
		// 		b: [
		// 			'b0', 'b1', 'b2',
		// 			'b3', 'b4', 'b5',
		// 			'b6', 'b7', 'b8',
		// 		],
		// 		d: [
		// 			'd0', 'd1', 'd2',
		// 			'd3', 'd4', 'd5',
		// 			'd6', 'd7', 'd8',
		// 		],
		// 	});
		// });

		it('U', function() {
			cube.turn('U');
			
			expect(cube.state).to.deep.equal({
				u: [
					'u6', 'u3', 'u0',
					'u7', 'u4', 'u1',
					'u8', 'u5', 'u2',
				],
				l: [
					'f0', 'f1', 'f2',
					'l3', 'l4', 'l5',
					'l6', 'l7', 'l8',
				],
				f: [
					'r0', 'r1', 'r2',
					'f3', 'f4', 'f5',
					'f6', 'f7', 'f8',
				],
				r: [
					'b0', 'b1', 'b2',
					'r3', 'r4', 'r5',
					'r6', 'r7', 'r8',
				],
				b: [
					'l0', 'l1', 'l2',
					'b3', 'b4', 'b5',
					'b6', 'b7', 'b8',
				],
				d: [
					'd0', 'd1', 'd2',
					'd3', 'd4', 'd5',
					'd6', 'd7', 'd8',
				],
			});
		});

		it('U-', function() {
			cube.turn('U-');
			
			expect(cube.state).to.deep.equal({
				u: [
					'u2', 'u5', 'u8',
					'u1', 'u4', 'u7',
					'u0', 'u3', 'u6',
				],
				l: [
					'b0', 'b1', 'b2',
					'l3', 'l4', 'l5',
					'l6', 'l7', 'l8',
				],
				f: [
					'l0', 'l1', 'l2',
					'f3', 'f4', 'f5',
					'f6', 'f7', 'f8',
				],
				r: [
					'f0', 'f1', 'f2',
					'r3', 'r4', 'r5',
					'r6', 'r7', 'r8',
				],
				b: [
					'r0', 'r1', 'r2',
					'b3', 'b4', 'b5',
					'b6', 'b7', 'b8',
				],
				d: [
					'd0', 'd1', 'd2',
					'd3', 'd4', 'd5',
					'd6', 'd7', 'd8',
				],
			});
		});

		it('U2', function() {
			cube.turn('U2');
			
			expect(cube.state).to.deep.equal({
				u: [
					'u8', 'u7', 'u6',
					'u5', 'u4', 'u3',
					'u2', 'u1', 'u0',
				],
				l: [
					'r0', 'r1', 'r2',
					'l3', 'l4', 'l5',
					'l6', 'l7', 'l8',
				],
				f: [
					'b0', 'b1', 'b2',
					'f3', 'f4', 'f5',
					'f6', 'f7', 'f8',
				],
				r: [
					'l0', 'l1', 'l2',
					'r3', 'r4', 'r5',
					'r6', 'r7', 'r8',
				],
				b: [
					'f0', 'f1', 'f2',
					'b3', 'b4', 'b5',
					'b6', 'b7', 'b8',
				],
				d: [
					'd0', 'd1', 'd2',
					'd3', 'd4', 'd5',
					'd6', 'd7', 'd8',
				],
			});
		});
	});
});