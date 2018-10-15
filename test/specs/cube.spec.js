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

		it('L', function() {
			cube.turn('L');
			
			expect(cube.state).to.deep.equal({
				u: [
					'b8', 'u1', 'u2',
					'b5', 'u4', 'u5',
					'b2', 'u7', 'u8',
				],
				l: [
					'l6', 'l3', 'l0',
					'l7', 'l4', 'l1',
					'l8', 'l5', 'l2',
				],
				f: [
					'u0', 'f1', 'f2',
					'u3', 'f4', 'f5',
					'u6', 'f7', 'f8',
				],
				r: [
					'r0', 'r1', 'r2',
					'r3', 'r4', 'r5',
					'r6', 'r7', 'r8',
				],
				b: [
					'b0', 'b1', 'd6',
					'b3', 'b4', 'd3',
					'b6', 'b7', 'd0',
				],
				d: [
					'f0', 'd1', 'd2',
					'f3', 'd4', 'd5',
					'f6', 'd7', 'd8',
				],
			});
		});

		it('L-', function() {
			cube.turn('L-');
			
			expect(cube.state).to.deep.equal({
				u: [
					'f0', 'u1', 'u2',
					'f3', 'u4', 'u5',
					'f6', 'u7', 'u8',
				],
				l: [
					'l2', 'l5', 'l8',
					'l1', 'l4', 'l7',
					'l0', 'l3', 'l6',
				],
				f: [
					'd0', 'f1', 'f2',
					'd3', 'f4', 'f5',
					'd6', 'f7', 'f8',
				],
				r: [
					'r0', 'r1', 'r2',
					'r3', 'r4', 'r5',
					'r6', 'r7', 'r8',
				],
				b: [
					'b0', 'b1', 'u6',
					'b3', 'b4', 'u3',
					'b6', 'b7', 'u0',
				],
				d: [
					'b8', 'd1', 'd2',
					'b5', 'd4', 'd5',
					'b2', 'd7', 'd8',
				],
			});
		});

		it('L2', function() {
			cube.turn('L2');
			
			expect(cube.state).to.deep.equal({
				u: [
					'd0', 'u1', 'u2',
					'd3', 'u4', 'u5',
					'd6', 'u7', 'u8',
				],
				l: [
					'l8', 'l7', 'l6',
					'l5', 'l4', 'l3',
					'l2', 'l1', 'l0',
				],
				f: [
					'b8', 'f1', 'f2',
					'b5', 'f4', 'f5',
					'b2', 'f7', 'f8',
				],
				r: [
					'r0', 'r1', 'r2',
					'r3', 'r4', 'r5',
					'r6', 'r7', 'r8',
				],
				b: [
					'b0', 'b1', 'f6',
					'b3', 'b4', 'f3',
					'b6', 'b7', 'f0',
				],
				d: [
					'u0', 'd1', 'd2',
					'u3', 'd4', 'd5',
					'u6', 'd7', 'd8',
				],
			});
		});

		it('F', function() {
			cube.turn('F');
			
			expect(cube.state).to.deep.equal({
				u: [
					'u0', 'u1', 'u2',
					'u3', 'u4', 'u5',
					'l8', 'l5', 'l2',
				],
				l: [
					'l0', 'l1', 'd0',
					'l3', 'l4', 'd1',
					'l6', 'l7', 'd2',
				],
				f: [
					'f6', 'f3', 'f0',
					'f7', 'f4', 'f1',
					'f8', 'f5', 'f2',
				],
				r: [
					'u6', 'r1', 'r2',
					'u7', 'r4', 'r5',
					'u8', 'r7', 'r8',
				],
				b: [
					'b0', 'b1', 'b2',
					'b3', 'b4', 'b5',
					'b6', 'b7', 'b8',
				],
				d: [
					'r6', 'r3', 'r0',
					'd3', 'd4', 'd5',
					'd6', 'd7', 'd8',
				],
			});
		});

		it('F-', function() {
			cube.turn('F-');
			
			expect(cube.state).to.deep.equal({
				u: [
					'u0', 'u1', 'u2',
					'u3', 'u4', 'u5',
					'r0', 'r3', 'r6',
				],
				l: [
					'l0', 'l1', 'u8',
					'l3', 'l4', 'u7',
					'l6', 'l7', 'u6',
				],
				f: [
					'f2', 'f5', 'f8',
					'f1', 'f4', 'f7',
					'f0', 'f3', 'f6',
				],
				r: [
					'd2', 'r1', 'r2',
					'd1', 'r4', 'r5',
					'd0', 'r7', 'r8',
				],
				b: [
					'b0', 'b1', 'b2',
					'b3', 'b4', 'b5',
					'b6', 'b7', 'b8',
				],
				d: [
					'l2', 'l5', 'l8',
					'd3', 'd4', 'd5',
					'd6', 'd7', 'd8',
				],
			});
		});

		it('F2', function() {
			cube.turn('F2');
			
			expect(cube.state).to.deep.equal({
				u: [
					'u0', 'u1', 'u2',
					'u3', 'u4', 'u5',
					'd2', 'd1', 'd0',
				],
				l: [
					'l0', 'l1', 'r6',
					'l3', 'l4', 'r3',
					'l6', 'l7', 'r0',
				],
				f: [
					'f8', 'f7', 'f6',
					'f5', 'f4', 'f3',
					'f2', 'f1', 'f0',
				],
				r: [
					'l8', 'r1', 'r2',
					'l5', 'r4', 'r5',
					'l2', 'r7', 'r8',
				],
				b: [
					'b0', 'b1', 'b2',
					'b3', 'b4', 'b5',
					'b6', 'b7', 'b8',
				],
				d: [
					'u8', 'u7', 'u6',
					'd3', 'd4', 'd5',
					'd6', 'd7', 'd8',
				],
			});
		});
	});
});