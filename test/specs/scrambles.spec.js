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
            u: [
                w, g,
                b, g,
            ],
            l: [
                g, r,
                o, b,
            ],
            f: [
                y, o,
                r, o,
            ],
            r: [
                y, y,
                b, g,
            ],
            b: [
                r, o,
                w, b,
            ],
            d: [
                w, w,
                y, r,
            ],
        })
    });

    it('3x3', function() {
        const cube = new Cube(3);
        
        cube.turn(`R U' L' B2 F2 L' R' U2 R D' L R' D' L D B' L B D' B2 F' L R D2 B' R' F2 L B2 D2`);

        expect(cube.state).to.deep.equal({
            u: [
                o, r, b,
                w, w, o,
                b, y, g,
            ],
            l: [
                g, o, o,
                y, o, r,
                o, b, b,
            ],
            f: [
                w, g, y,
                g, g, r,
                y, w, y,
            ],
            r: [
                r, g, w,
                w, r, r,
                b, y, g,
            ],
            b: [
                r, y, y,
                b, b, b,
                w, w, g,
            ],
            d: [
                r, b, o,
                o, y, o,
                w, g, r,
            ],
        });
    });
});
