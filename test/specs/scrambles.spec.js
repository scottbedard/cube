import Cube from '../../src/cube';
import { expect } from 'chai';

// these tests exist just as a safety net to make sure
// that turning works correctly. if any of these fail,
// there should also be a failing turn test as well.

// scrambles are generated from old WCA scrambler at
// https://www.worldcubeassociation.org/regulations/history/files/scrambles/scramble_cube.htm
describe('scrambles', function() {
    const w = 0, o = 1, g = 2, r = 3, b = 4, y = 5;
    
    it('2x2', function() {
        const cube = new Cube(2);
        
        cube.turn(`F2 U2 F2 U' F' R F2 U2 F' U2`);

        expect(cube.state).to.deep.equal({
            U: [
                w, g,
                b, g,
            ],
            L: [
                g, r,
                o, b,
            ],
            F: [
                y, o,
                r, o,
            ],
            R: [
                y, y,
                b, g,
            ],
            B: [
                r, o,
                w, b,
            ],
            D: [
                w, w,
                y, r,
            ],
        })
    });

    it('3x3', function() {
        const cube = new Cube(3);
        
        cube.turn(`R U' L' B2 F2 L' R' U2 R D' L R' D' L D B' L B D' B2 F' L R D2 B' R' F2 L B2 D2`);

        expect(cube.state).to.deep.equal({
            U: [
                o, r, b,
                w, w, o,
                b, y, g,
            ],
            L: [
                g, o, o,
                y, o, r,
                o, b, b,
            ],
            F: [
                w, g, y,
                g, g, r,
                y, w, y,
            ],
            R: [
                r, g, w,
                w, r, r,
                b, y, g,
            ],
            B: [
                r, y, y,
                b, b, b,
                w, w, g,
            ],
            D: [
                r, b, o,
                o, y, o,
                w, g, r,
            ],
        });
    });
});
