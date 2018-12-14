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
    //         U: [
    //             'U0', 'U1', 'U2',
    //             'U3', 'U4', 'U5',
    //             'U6', 'U7', 'U8',
    //         ],
    //         L: [
    //             'L0', 'L1', 'L2',
    //             'L3', 'L4', 'L5',
    //             'L6', 'L7', 'L8',
    //         ],
    //         F: [
    //             'F0', 'F1', 'F2',
    //             'F3', 'F4', 'F5',
    //             'F6', 'F7', 'F8',
    //         ],
    //         R: [
    //             'R0', 'R1', 'R2',
    //             'R3', 'R4', 'R5',
    //             'R6', 'R7', 'R8',
    //         ],
    //         B: [
    //             'B0', 'B1', 'B2',
    //             'B3', 'B4', 'B5',
    //             'B6', 'B7', 'B8',
    //         ],
    //         D: [
    //             'D0', 'D1', 'D2',
    //             'D3', 'D4', 'D5',
    //             'D6', 'D7', 'D8',
    //         ],
    //     });
    // });

    it('U', function() {
        cube.turn('U');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U6', 'U3', 'U0',
                'U7', 'U4', 'U1',
                'U8', 'U5', 'U2',
            ],
            L: [
                'F0', 'F1', 'F2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            F: [
                'R0', 'R1', 'R2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            R: [
                'B0', 'B1', 'B2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            B: [
                'L0', 'L1', 'L2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            D: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
        });
    });

    it('U-', function() {
        cube.turn('U-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U2', 'U5', 'U8',
                'U1', 'U4', 'U7',
                'U0', 'U3', 'U6',
            ],
            L: [
                'B0', 'B1', 'B2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            F: [
                'L0', 'L1', 'L2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            R: [
                'F0', 'F1', 'F2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            B: [
                'R0', 'R1', 'R2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            D: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
        });
    });

    it('U2', function() {
        cube.turn('U2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U8', 'U7', 'U6',
                'U5', 'U4', 'U3',
                'U2', 'U1', 'U0',
            ],
            L: [
                'R0', 'R1', 'R2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            F: [
                'B0', 'B1', 'B2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            R: [
                'L0', 'L1', 'L2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            B: [
                'F0', 'F1', 'F2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            D: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
        });
    });

    // these tests only exists to make sure that the "inner" face
    // is turned when the depth is equal to the size of the cube.
    // in real solves, this would normally just be a D- turn.
    it('3U', function() {
        cube.turn('3U');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'F6', 'F7', 'F8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'R6', 'R7', 'R8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'B6', 'B7', 'B8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'L6', 'L7', 'L8',
            ],
            D: [
                'D2', 'D5', 'D8',
                'D1', 'D4', 'D7',
                'D0', 'D3', 'D6',
            ],
        });
    });

    it('3U-', function() {
        cube.turn('3U-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'B6', 'B7', 'B8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'L6', 'L7', 'L8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'F6', 'F7', 'F8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'R6', 'R7', 'R8',
            ],
            D: [
                'D6', 'D3', 'D0',
                'D7', 'D4', 'D1',
                'D8', 'D5', 'D2',
            ],
        });
    });

    it('3U2', function() {
        cube.turn('3U2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'R6', 'R7', 'R8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'B6', 'B7', 'B8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'L6', 'L7', 'L8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'F6', 'F7', 'F8',
            ],
            D: [
                'D8', 'D7', 'D6',
                'D5', 'D4', 'D3',
                'D2', 'D1', 'D0',
            ],
        });
    });
    // end "inner" face turn tests

    it('L', function() {
        cube.turn('L');
        
        expect(cube.state).to.deep.equal({
            U: [
                'B8', 'U1', 'U2',
                'B5', 'U4', 'U5',
                'B2', 'U7', 'U8',
            ],
            L: [
                'L6', 'L3', 'L0',
                'L7', 'L4', 'L1',
                'L8', 'L5', 'L2',
            ],
            F: [
                'U0', 'F1', 'F2',
                'U3', 'F4', 'F5',
                'U6', 'F7', 'F8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            B: [
                'B0', 'B1', 'D6',
                'B3', 'B4', 'D3',
                'B6', 'B7', 'D0',
            ],
            D: [
                'F0', 'D1', 'D2',
                'F3', 'D4', 'D5',
                'F6', 'D7', 'D8',
            ],
        });
    });

    it('L-', function() {
        cube.turn('L-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'F0', 'U1', 'U2',
                'F3', 'U4', 'U5',
                'F6', 'U7', 'U8',
            ],
            L: [
                'L2', 'L5', 'L8',
                'L1', 'L4', 'L7',
                'L0', 'L3', 'L6',
            ],
            F: [
                'D0', 'F1', 'F2',
                'D3', 'F4', 'F5',
                'D6', 'F7', 'F8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            B: [
                'B0', 'B1', 'U6',
                'B3', 'B4', 'U3',
                'B6', 'B7', 'U0',
            ],
            D: [
                'B8', 'D1', 'D2',
                'B5', 'D4', 'D5',
                'B2', 'D7', 'D8',
            ],
        });
    });

    it('L2', function() {
        cube.turn('L2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'D0', 'U1', 'U2',
                'D3', 'U4', 'U5',
                'D6', 'U7', 'U8',
            ],
            L: [
                'L8', 'L7', 'L6',
                'L5', 'L4', 'L3',
                'L2', 'L1', 'L0',
            ],
            F: [
                'B8', 'F1', 'F2',
                'B5', 'F4', 'F5',
                'B2', 'F7', 'F8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            B: [
                'B0', 'B1', 'F6',
                'B3', 'B4', 'F3',
                'B6', 'B7', 'F0',
            ],
            D: [
                'U0', 'D1', 'D2',
                'U3', 'D4', 'D5',
                'U6', 'D7', 'D8',
            ],
        });
    });

    it('F', function() {
        cube.turn('F');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'L8', 'L5', 'L2',
            ],
            L: [
                'L0', 'L1', 'D0',
                'L3', 'L4', 'D1',
                'L6', 'L7', 'D2',
            ],
            F: [
                'F6', 'F3', 'F0',
                'F7', 'F4', 'F1',
                'F8', 'F5', 'F2',
            ],
            R: [
                'U6', 'R1', 'R2',
                'U7', 'R4', 'R5',
                'U8', 'R7', 'R8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            D: [
                'R6', 'R3', 'R0',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
        });
    });

    it('F-', function() {
        cube.turn('F-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'R0', 'R3', 'R6',
            ],
            L: [
                'L0', 'L1', 'U8',
                'L3', 'L4', 'U7',
                'L6', 'L7', 'U6',
            ],
            F: [
                'F2', 'F5', 'F8',
                'F1', 'F4', 'F7',
                'F0', 'F3', 'F6',
            ],
            R: [
                'D2', 'R1', 'R2',
                'D1', 'R4', 'R5',
                'D0', 'R7', 'R8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            D: [
                'L2', 'L5', 'L8',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
        });
    });

    it('F2', function() {
        cube.turn('F2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'D2', 'D1', 'D0',
            ],
            L: [
                'L0', 'L1', 'R6',
                'L3', 'L4', 'R3',
                'L6', 'L7', 'R0',
            ],
            F: [
                'F8', 'F7', 'F6',
                'F5', 'F4', 'F3',
                'F2', 'F1', 'F0',
            ],
            R: [
                'L8', 'R1', 'R2',
                'L5', 'R4', 'R5',
                'L2', 'R7', 'R8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            D: [
                'U8', 'U7', 'U6',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
        });
    });

    it('R', function() {
        cube.turn('R');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'F2',
                'U3', 'U4', 'F5',
                'U6', 'U7', 'F8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            F: [
                'F0', 'F1', 'D2',
                'F3', 'F4', 'D5',
                'F6', 'F7', 'D8',
            ],
            R: [
                'R6', 'R3', 'R0',
                'R7', 'R4', 'R1',
                'R8', 'R5', 'R2',
            ],
            B: [
                'U8', 'B1', 'B2',
                'U5', 'B4', 'B5',
                'U2', 'B7', 'B8',
            ],
            D: [
                'D0', 'D1', 'B6',
                'D3', 'D4', 'B3',
                'D6', 'D7', 'B0',
            ],
        });
    });

    it('R-', function() {
        cube.turn('R-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'B6',
                'U3', 'U4', 'B3',
                'U6', 'U7', 'B0',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            F: [
                'F0', 'F1', 'U2',
                'F3', 'F4', 'U5',
                'F6', 'F7', 'U8',
            ],
            R: [
                'R2', 'R5', 'R8',
                'R1', 'R4', 'R7',
                'R0', 'R3', 'R6',
            ],
            B: [
                'D8', 'B1', 'B2',
                'D5', 'B4', 'B5',
                'D2', 'B7', 'B8',
            ],
            D: [
                'D0', 'D1', 'F2',
                'D3', 'D4', 'F5',
                'D6', 'D7', 'F8',
            ],
        });
    });

    it('R2', function() {
        cube.turn('R2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'D2',
                'U3', 'U4', 'D5',
                'U6', 'U7', 'D8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            F: [
                'F0', 'F1', 'B6',
                'F3', 'F4', 'B3',
                'F6', 'F7', 'B0',
            ],
            R: [
                'R8', 'R7', 'R6',
                'R5', 'R4', 'R3',
                'R2', 'R1', 'R0',
            ],
            B: [
                'F8', 'B1', 'B2',
                'F5', 'B4', 'B5',
                'F2', 'B7', 'B8',
            ],
            D: [
                'D0', 'D1', 'U2',
                'D3', 'D4', 'U5',
                'D6', 'D7', 'U8',
            ],
        });
    });

    it('B', function() {
        cube.turn('B');
        
        expect(cube.state).to.deep.equal({
            U: [
                'R2', 'R5', 'R8',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'U2', 'L1', 'L2',
                'U1', 'L4', 'L5',
                'U0', 'L7', 'L8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            R: [
                'R0', 'R1', 'D8',
                'R3', 'R4', 'D7',
                'R6', 'R7', 'D6',
            ],
            B: [
                'B6', 'B3', 'B0',
                'B7', 'B4', 'B1',
                'B8', 'B5', 'B2',
            ],
            D: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'L0', 'L3', 'L6',
            ],
        });
    });

    it('B-', function() {
        cube.turn('B-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'L6', 'L3', 'L0',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'D6', 'L1', 'L2',
                'D7', 'L4', 'L5',
                'D8', 'L7', 'L8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            R: [
                'R0', 'R1', 'U0',
                'R3', 'R4', 'U1',
                'R6', 'R7', 'U2',
            ],
            B: [
                'B2', 'B5', 'B8',
                'B1', 'B4', 'B7',
                'B0', 'B3', 'B6',
            ],
            D: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'R8', 'R5', 'R2',
            ],
        });
    });

    it('B2', function() {
        cube.turn('B2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'D8', 'D7', 'D6',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'R8', 'L1', 'L2',
                'R5', 'L4', 'L5',
                'R2', 'L7', 'L8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            R: [
                'R0', 'R1', 'L6',
                'R3', 'R4', 'L3',
                'R6', 'R7', 'L0',
            ],
            B: [
                'B8', 'B7', 'B6',
                'B5', 'B4', 'B3',
                'B2', 'B1', 'B0',
            ],
            D: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'U2', 'U1', 'U0',
            ],
        });
    });

    it('D', function() {
        cube.turn('D');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'B6', 'B7', 'B8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'L6', 'L7', 'L8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'F6', 'F7', 'F8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'R6', 'R7', 'R8',
            ],
            D: [
                'D6', 'D3', 'D0',
                'D7', 'D4', 'D1',
                'D8', 'D5', 'D2',
            ],
        });
    });

    it('D-', function() {
        cube.turn('D-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'F6', 'F7', 'F8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'R6', 'R7', 'R8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'B6', 'B7', 'B8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'L6', 'L7', 'L8',
            ],
            D: [
                'D2', 'D5', 'D8',
                'D1', 'D4', 'D7',
                'D0', 'D3', 'D6',
            ],
        });
    });

    it('D2', function() {
        cube.turn('D2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            L: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'R6', 'R7', 'R8',
            ],
            F: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'B6', 'B7', 'B8',
            ],
            R: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'L6', 'L7', 'L8',
            ],
            B: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'F6', 'F7', 'F8',
            ],
            D: [
                'D8', 'D7', 'D6',
                'D5', 'D4', 'D3',
                'D2', 'D1', 'D0',
            ],
        });
    });

    it('X', function() {
        cube.turn('X');
        
        expect(cube.state).to.deep.equal({
            U: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            L: [
                'L2', 'L5', 'L8',
                'L1', 'L4', 'L7',
                'L0', 'L3', 'L6',
            ],
            F: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
            R: [
                'R6', 'R3', 'R0',
                'R7', 'R4', 'R1',
                'R8', 'R5', 'R2',
            ],
            B: [
                'U8', 'U7', 'U6',
                'U5', 'U4', 'U3',
                'U2', 'U1', 'U0',
            ],
            D: [
                'B8', 'B7', 'B6',
                'B5', 'B4', 'B3',
                'B2', 'B1', 'B0',
            ],
        });
    });

    it('X-', function() {
        cube.turn('X-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'B8', 'B7', 'B6',
                'B5', 'B4', 'B3',
                'B2', 'B1', 'B0',
            ],
            L: [
                'L6', 'L3', 'L0',
                'L7', 'L4', 'L1',
                'L8', 'L5', 'L2',
            ],
            F: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
            R: [
                'R2', 'R5', 'R8',
                'R1', 'R4', 'R7',
                'R0', 'R3', 'R6',
            ],
            B: [
                'D8', 'D7', 'D6',
                'D5', 'D4', 'D3',
                'D2', 'D1', 'D0',
            ],
            D: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
        });
    });

    it('X2', function() {
        cube.turn('X2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'D0', 'D1', 'D2',
                'D3', 'D4', 'D5',
                'D6', 'D7', 'D8',
            ],
            L: [
                'L8', 'L7', 'L6',
                'L5', 'L4', 'L3',
                'L2', 'L1', 'L0',
            ],
            F: [
                'B8', 'B7', 'B6',
                'B5', 'B4', 'B3',
                'B2', 'B1', 'B0',
            ],
            R: [
                'R8', 'R7', 'R6',
                'R5', 'R4', 'R3',
                'R2', 'R1', 'R0',
            ],
            B: [
                'F8', 'F7', 'F6',
                'F5', 'F4', 'F3',
                'F2', 'F1', 'F0',
            ],
            D: [
                'U0', 'U1', 'U2',
                'U3', 'U4', 'U5',
                'U6', 'U7', 'U8',
            ],
        });
    });

    it('Y', function() {
        cube.turn('Y');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U6', 'U3', 'U0',
                'U7', 'U4', 'U1',
                'U8', 'U5', 'U2',
            ],
            L: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            F: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            R: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            B: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            D: [
                'D2', 'D5', 'D8',
                'D1', 'D4', 'D7',
                'D0', 'D3', 'D6',
            ],
        });
    });

    it('Y-', function() {
        cube.turn('Y-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U2', 'U5', 'U8',
                'U1', 'U4', 'U7',
                'U0', 'U3', 'U6',
            ],
            L: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            F: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            R: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            B: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            D: [
                'D6', 'D3', 'D0',
                'D7', 'D4', 'D1',
                'D8', 'D5', 'D2',
            ],
        });
    });

    it('Y2', function() {
        cube.turn('Y2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'U8', 'U7', 'U6',
                'U5', 'U4', 'U3',
                'U2', 'U1', 'U0',
            ],
            L: [
                'R0', 'R1', 'R2',
                'R3', 'R4', 'R5',
                'R6', 'R7', 'R8',
            ],
            F: [
                'B0', 'B1', 'B2',
                'B3', 'B4', 'B5',
                'B6', 'B7', 'B8',
            ],
            R: [
                'L0', 'L1', 'L2',
                'L3', 'L4', 'L5',
                'L6', 'L7', 'L8',
            ],
            B: [
                'F0', 'F1', 'F2',
                'F3', 'F4', 'F5',
                'F6', 'F7', 'F8',
            ],
            D: [
                'D8', 'D7', 'D6',
                'D5', 'D4', 'D3',
                'D2', 'D1', 'D0',
            ],
        });
    });

    it('Z', function() {
        cube.turn('Z');
        
        expect(cube.state).to.deep.equal({
            U: [
                'L6', 'L3', 'L0',
                'L7', 'L4', 'L1',
                'L8', 'L5', 'L2',
            ],
            L: [
                'D6', 'D3', 'D0',
                'D7', 'D4', 'D1',
                'D8', 'D5', 'D2',
            ],
            F: [
                'F6', 'F3', 'F0',
                'F7', 'F4', 'F1',
                'F8', 'F5', 'F2',
            ],
            R: [
                'U6', 'U3', 'U0',
                'U7', 'U4', 'U1',
                'U8', 'U5', 'U2',
            ],
            B: [
                'B2', 'B5', 'B8',
                'B1', 'B4', 'B7',
                'B0', 'B3', 'B6',
            ],
            D: [
                'R6', 'R3', 'R0',
                'R7', 'R4', 'R1',
                'R8', 'R5', 'R2',
            ],
        });
    });

    it('Z-', function() {
        cube.turn('Z-');
        
        expect(cube.state).to.deep.equal({
            U: [
                'R2', 'R5', 'R8',
                'R1', 'R4', 'R7',
                'R0', 'R3', 'R6',
            ],
            L: [
                'U2', 'U5', 'U8',
                'U1', 'U4', 'U7',
                'U0', 'U3', 'U6',
            ],
            F: [
                'F2', 'F5', 'F8',
                'F1', 'F4', 'F7',
                'F0', 'F3', 'F6',
            ],
            R: [
                'D2', 'D5', 'D8',
                'D1', 'D4', 'D7',
                'D0', 'D3', 'D6',
            ],
            B: [
                'B6', 'B3', 'B0',
                'B7', 'B4', 'B1',
                'B8', 'B5', 'B2',
            ],
            D: [
                'L2', 'L5', 'L8',
                'L1', 'L4', 'L7',
                'L0', 'L3', 'L6',
            ],
        });
    });

    it('Z2', function() {
        cube.turn('Z2');
        
        expect(cube.state).to.deep.equal({
            U: [
                'D8', 'D7', 'D6',
                'D5', 'D4', 'D3',
                'D2', 'D1', 'D0',
            ],
            L: [
                'R8', 'R7', 'R6',
                'R5', 'R4', 'R3',
                'R2', 'R1', 'R0',
            ],
            F: [
                'F8', 'F7', 'F6',
                'F5', 'F4', 'F3',
                'F2', 'F1', 'F0',
            ],
            R: [
                'L8', 'L7', 'L6',
                'L5', 'L4', 'L3',
                'L2', 'L1', 'L0',
            ],
            B: [
                'B8', 'B7', 'B6',
                'B5', 'B4', 'B3',
                'B2', 'B1', 'B0',
            ],
            D: [
                'U8', 'U7', 'U6',
                'U5', 'U4', 'U3',
                'U2', 'U1', 'U0',
            ],
        });
    });
});