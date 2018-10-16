import Cube from '../../src/cube';
import { expect } from 'chai';

//
// specs
//
describe('turns', function() {
    let cube;

    beforeEach(function() {
        cube = new Cube(3);

        // index all the stickers so we can make better assertions on them
        Object.keys(cube.state).forEach(face => {
            cube.state[face] = cube.state[face].map((val, i) => face + i);
        });
    });

    // it.only('', function() {
    //     cube.turn('');
        
    //     expect(cube.state).to.deep.equal({
    //         u: [
    //             'u0', 'u1', 'u2',
    //             'u3', 'u4', 'u5',
    //             'u6', 'u7', 'u8',
    //         ],
    //         l: [
    //             'l0', 'l1', 'l2',
    //             'l3', 'l4', 'l5',
    //             'l6', 'l7', 'l8',
    //         ],
    //         f: [
    //             'f0', 'f1', 'f2',
    //             'f3', 'f4', 'f5',
    //             'f6', 'f7', 'f8',
    //         ],
    //         r: [
    //             'r0', 'r1', 'r2',
    //             'r3', 'r4', 'r5',
    //             'r6', 'r7', 'r8',
    //         ],
    //         b: [
    //             'b0', 'b1', 'b2',
    //             'b3', 'b4', 'b5',
    //             'b6', 'b7', 'b8',
    //         ],
    //         d: [
    //             'd0', 'd1', 'd2',
    //             'd3', 'd4', 'd5',
    //             'd6', 'd7', 'd8',
    //         ],
    //     });
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

    it('3U', function() {
        // this test only exists to make sure that the "inner" face
        // is turned when the depth is equal to the size of the cube.
        // in real solves, this would normally just be a D- turn.
        cube.turn('3U');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'u2',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'f6', 'f7', 'f8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'r6', 'r7', 'r8',
            ],
            r: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'b6', 'b7', 'b8',
            ],
            b: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'l6', 'l7', 'l8',
            ],
            d: [
                'd2', 'd5', 'd8',
                'd1', 'd4', 'd7',
                'd0', 'd3', 'd6',
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

    it('R', function() {
        cube.turn('R');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'f2',
                'u3', 'u4', 'f5',
                'u6', 'u7', 'f8',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'l6', 'l7', 'l8',
            ],
            f: [
                'f0', 'f1', 'd2',
                'f3', 'f4', 'd5',
                'f6', 'f7', 'd8',
            ],
            r: [
                'r6', 'r3', 'r0',
                'r7', 'r4', 'r1',
                'r8', 'r5', 'r2',
            ],
            b: [
                'u8', 'b1', 'b2',
                'u5', 'b4', 'b5',
                'u2', 'b7', 'b8',
            ],
            d: [
                'd0', 'd1', 'b6',
                'd3', 'd4', 'b3',
                'd6', 'd7', 'b0',
            ],
        });
    });

    it('R-', function() {
        cube.turn('R-');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'b6',
                'u3', 'u4', 'b3',
                'u6', 'u7', 'b0',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'l6', 'l7', 'l8',
            ],
            f: [
                'f0', 'f1', 'u2',
                'f3', 'f4', 'u5',
                'f6', 'f7', 'u8',
            ],
            r: [
                'r2', 'r5', 'r8',
                'r1', 'r4', 'r7',
                'r0', 'r3', 'r6',
            ],
            b: [
                'd8', 'b1', 'b2',
                'd5', 'b4', 'b5',
                'd2', 'b7', 'b8',
            ],
            d: [
                'd0', 'd1', 'f2',
                'd3', 'd4', 'f5',
                'd6', 'd7', 'f8',
            ],
        });
    });

    it('R2', function() {
        cube.turn('R2');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'd2',
                'u3', 'u4', 'd5',
                'u6', 'u7', 'd8',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'l6', 'l7', 'l8',
            ],
            f: [
                'f0', 'f1', 'b6',
                'f3', 'f4', 'b3',
                'f6', 'f7', 'b0',
            ],
            r: [
                'r8', 'r7', 'r6',
                'r5', 'r4', 'r3',
                'r2', 'r1', 'r0',
            ],
            b: [
                'f8', 'b1', 'b2',
                'f5', 'b4', 'b5',
                'f2', 'b7', 'b8',
            ],
            d: [
                'd0', 'd1', 'u2',
                'd3', 'd4', 'u5',
                'd6', 'd7', 'u8',
            ],
        });
    });

    it('B', function() {
        cube.turn('B');
        
        expect(cube.state).to.deep.equal({
            u: [
                'r2', 'r5', 'r8',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'u2', 'l1', 'l2',
                'u1', 'l4', 'l5',
                'u0', 'l7', 'l8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            r: [
                'r0', 'r1', 'd8',
                'r3', 'r4', 'd7',
                'r6', 'r7', 'd6',
            ],
            b: [
                'b6', 'b3', 'b0',
                'b7', 'b4', 'b1',
                'b8', 'b5', 'b2',
            ],
            d: [
                'd0', 'd1', 'd2',
                'd3', 'd4', 'd5',
                'l0', 'l3', 'l6',
            ],
        });
    });

    it('B-', function() {
        cube.turn('B-');
        
        expect(cube.state).to.deep.equal({
            u: [
                'l6', 'l3', 'l0',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'd6', 'l1', 'l2',
                'd7', 'l4', 'l5',
                'd8', 'l7', 'l8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            r: [
                'r0', 'r1', 'u0',
                'r3', 'r4', 'u1',
                'r6', 'r7', 'u2',
            ],
            b: [
                'b2', 'b5', 'b8',
                'b1', 'b4', 'b7',
                'b0', 'b3', 'b6',
            ],
            d: [
                'd0', 'd1', 'd2',
                'd3', 'd4', 'd5',
                'r8', 'r5', 'r2',
            ],
        });
    });

    it('B2', function() {
        cube.turn('B2');
        
        expect(cube.state).to.deep.equal({
            u: [
                'd8', 'd7', 'd6',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'r8', 'l1', 'l2',
                'r5', 'l4', 'l5',
                'r2', 'l7', 'l8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            r: [
                'r0', 'r1', 'l6',
                'r3', 'r4', 'l3',
                'r6', 'r7', 'l0',
            ],
            b: [
                'b8', 'b7', 'b6',
                'b5', 'b4', 'b3',
                'b2', 'b1', 'b0',
            ],
            d: [
                'd0', 'd1', 'd2',
                'd3', 'd4', 'd5',
                'u2', 'u1', 'u0',
            ],
        });
    });

    it('D', function() {
        cube.turn('D');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'u2',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'b6', 'b7', 'b8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'l6', 'l7', 'l8',
            ],
            r: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'f6', 'f7', 'f8',
            ],
            b: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'r6', 'r7', 'r8',
            ],
            d: [
                'd6', 'd3', 'd0',
                'd7', 'd4', 'd1',
                'd8', 'd5', 'd2',
            ],
        });
    });

    it('D-', function() {
        cube.turn('D-');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'u2',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'f6', 'f7', 'f8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'r6', 'r7', 'r8',
            ],
            r: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'b6', 'b7', 'b8',
            ],
            b: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'l6', 'l7', 'l8',
            ],
            d: [
                'd2', 'd5', 'd8',
                'd1', 'd4', 'd7',
                'd0', 'd3', 'd6',
            ],
        });
    });

    it('D2', function() {
        cube.turn('D2');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u0', 'u1', 'u2',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            l: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'r6', 'r7', 'r8',
            ],
            f: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'b6', 'b7', 'b8',
            ],
            r: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'l6', 'l7', 'l8',
            ],
            b: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'f6', 'f7', 'f8',
            ],
            d: [
                'd8', 'd7', 'd6',
                'd5', 'd4', 'd3',
                'd2', 'd1', 'd0',
            ],
        });
    });

    it('X', function() {
        cube.turn('X');
        
        expect(cube.state).to.deep.equal({
            u: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            l: [
                'l2', 'l5', 'l8',
                'l1', 'l4', 'l7',
                'l0', 'l3', 'l6',
            ],
            f: [
                'd0', 'd1', 'd2',
                'd3', 'd4', 'd5',
                'd6', 'd7', 'd8',
            ],
            r: [
                'r6', 'r3', 'r0',
                'r7', 'r4', 'r1',
                'r8', 'r5', 'r2',
            ],
            b: [
                'u8', 'u7', 'u6',
                'u5', 'u4', 'u3',
                'u2', 'u1', 'u0',
            ],
            d: [
                'b8', 'b7', 'b6',
                'b5', 'b4', 'b3',
                'b2', 'b1', 'b0',
            ],
        });
    });

    it('X-', function() {
        cube.turn('X-');
        
        expect(cube.state).to.deep.equal({
            u: [
                'b8', 'b7', 'b6',
                'b5', 'b4', 'b3',
                'b2', 'b1', 'b0',
            ],
            l: [
                'l6', 'l3', 'l0',
                'l7', 'l4', 'l1',
                'l8', 'l5', 'l2',
            ],
            f: [
                'u0', 'u1', 'u2',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
            r: [
                'r2', 'r5', 'r8',
                'r1', 'r4', 'r7',
                'r0', 'r3', 'r6',
            ],
            b: [
                'd8', 'd7', 'd6',
                'd5', 'd4', 'd3',
                'd2', 'd1', 'd0',
            ],
            d: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
        });
    });

    it('X2', function() {
        cube.turn('X2');
        
        expect(cube.state).to.deep.equal({
            u: [
                'd0', 'd1', 'd2',
                'd3', 'd4', 'd5',
                'd6', 'd7', 'd8',
            ],
            l: [
                'l8', 'l7', 'l6',
                'l5', 'l4', 'l3',
                'l2', 'l1', 'l0',
            ],
            f: [
                'b8', 'b7', 'b6',
                'b5', 'b4', 'b3',
                'b2', 'b1', 'b0',
            ],
            r: [
                'r8', 'r7', 'r6',
                'r5', 'r4', 'r3',
                'r2', 'r1', 'r0',
            ],
            b: [
                'f8', 'f7', 'f6',
                'f5', 'f4', 'f3',
                'f2', 'f1', 'f0',
            ],
            d: [
                'u0', 'u1', 'u2',
                'u3', 'u4', 'u5',
                'u6', 'u7', 'u8',
            ],
        });
    });

    it('Y', function() {
        cube.turn('Y');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u6', 'u3', 'u0',
                'u7', 'u4', 'u1',
                'u8', 'u5', 'u2',
            ],
            l: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            f: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'r6', 'r7', 'r8',
            ],
            r: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'b6', 'b7', 'b8',
            ],
            b: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'l6', 'l7', 'l8',
            ],
            d: [
                'd2', 'd5', 'd8',
                'd1', 'd4', 'd7',
                'd0', 'd3', 'd6',
            ],
        });
    });

    it('Y-', function() {
        cube.turn('Y-');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u2', 'u5', 'u8',
                'u1', 'u4', 'u7',
                'u0', 'u3', 'u6',
            ],
            l: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'b6', 'b7', 'b8',
            ],
            f: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'l6', 'l7', 'l8',
            ],
            r: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            b: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'r6', 'r7', 'r8',
            ],
            d: [
                'd6', 'd3', 'd0',
                'd7', 'd4', 'd1',
                'd8', 'd5', 'd2',
            ],
        });
    });

    it('Y2', function() {
        cube.turn('Y2');
        
        expect(cube.state).to.deep.equal({
            u: [
                'u8', 'u7', 'u6',
                'u5', 'u4', 'u3',
                'u2', 'u1', 'u0',
            ],
            l: [
                'r0', 'r1', 'r2',
                'r3', 'r4', 'r5',
                'r6', 'r7', 'r8',
            ],
            f: [
                'b0', 'b1', 'b2',
                'b3', 'b4', 'b5',
                'b6', 'b7', 'b8',
            ],
            r: [
                'l0', 'l1', 'l2',
                'l3', 'l4', 'l5',
                'l6', 'l7', 'l8',
            ],
            b: [
                'f0', 'f1', 'f2',
                'f3', 'f4', 'f5',
                'f6', 'f7', 'f8',
            ],
            d: [
                'd8', 'd7', 'd6',
                'd5', 'd4', 'd3',
                'd2', 'd1', 'd0',
            ],
        });
    });

    it('Z', function() {
        cube.turn('Z');
        
        expect(cube.state).to.deep.equal({
            u: [
                'l6', 'l3', 'l0',
                'l7', 'l4', 'l1',
                'l8', 'l5', 'l2',
            ],
            l: [
                'd6', 'd3', 'd0',
                'd7', 'd4', 'd1',
                'd8', 'd5', 'd2',
            ],
            f: [
                'f6', 'f3', 'f0',
                'f7', 'f4', 'f1',
                'f8', 'f5', 'f2',
            ],
            r: [
                'u6', 'u3', 'u0',
                'u7', 'u4', 'u1',
                'u8', 'u5', 'u2',
            ],
            b: [
                'b2', 'b5', 'b8',
                'b1', 'b4', 'b7',
                'b0', 'b3', 'b6',
            ],
            d: [
                'r6', 'r3', 'r0',
                'r7', 'r4', 'r1',
                'r8', 'r5', 'r2',
            ],
        });
    });

    it('Z-', function() {
        cube.turn('Z-');
        
        expect(cube.state).to.deep.equal({
            u: [
                'r2', 'r5', 'r8',
                'r1', 'r4', 'r7',
                'r0', 'r3', 'r6',
            ],
            l: [
                'u2', 'u5', 'u8',
                'u1', 'u4', 'u7',
                'u0', 'u3', 'u6',
            ],
            f: [
                'f2', 'f5', 'f8',
                'f1', 'f4', 'f7',
                'f0', 'f3', 'f6',
            ],
            r: [
                'd2', 'd5', 'd8',
                'd1', 'd4', 'd7',
                'd0', 'd3', 'd6',
            ],
            b: [
                'b6', 'b3', 'b0',
                'b7', 'b4', 'b1',
                'b8', 'b5', 'b2',
            ],
            d: [
                'l2', 'l5', 'l8',
                'l1', 'l4', 'l7',
                'l0', 'l3', 'l6',
            ],
        });
    });

    it('Z2', function() {
        cube.turn('Z2');
        
        expect(cube.state).to.deep.equal({
            u: [
                'd8', 'd7', 'd6',
                'd5', 'd4', 'd3',
                'd2', 'd1', 'd0',
            ],
            l: [
                'r8', 'r7', 'r6',
                'r5', 'r4', 'r3',
                'r2', 'r1', 'r0',
            ],
            f: [
                'f8', 'f7', 'f6',
                'f5', 'f4', 'f3',
                'f2', 'f1', 'f0',
            ],
            r: [
                'l8', 'l7', 'l6',
                'l5', 'l4', 'l3',
                'l2', 'l1', 'l0',
            ],
            b: [
                'b8', 'b7', 'b6',
                'b5', 'b4', 'b3',
                'b2', 'b1', 'b0',
            ],
            d: [
                'u8', 'u7', 'u6',
                'u5', 'u4', 'u3',
                'u2', 'u1', 'u0',
            ],
        });
    });
});