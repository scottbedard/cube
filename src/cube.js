import {
    intersectingFaces,
} from './constants';

import {
    parseTurn,
    printTurn,
} from './notation';

import {
    generateStickers,
    getOppositeFace,
    isInt,
    rand,
    rotate,
    sliceCube,
    turnCubeX,
    turnCubeY,
    turnCubeZ,
    turnSliceB,
    turnSliceD,
    turnSliceF,
    turnSliceL,
    turnSliceR,
    turnSliceU,
} from './utils';

export default class Cube {

    /**
     * Constructor
     * 
     * @param  {number} size
     */
    constructor(size = 3, options = {}) {
        // make sure the cube is being constructed with a valid size
        if (!isInt(size) || size < 2) {
            throw new Error('Cube size must be a whole number greater than 1');
        }

        this.size = size;
        this.options = options;

        this.reset();
    }

    /**
     * Generate a sequence to scramble the cube.
     *
     * @param  {number}         length  scramble depth
     * @return {Array<object} 
     */
    generateScramble(length = 0) {
        // set a default scramble length if none was provided
        if (length === 0) {
            length = this.size ** 3;
        }

        // in order to avoid poor scrambles, we need to prevent
        // turns from cancelling prior turns. for example, turning 
        // F then F- would not effect the cube and should be avoided.
        const scramble = [];
        
        // generate an array of the faces we'll be turning
        for (let i = 0, face; i < length; i++) {
            // pick a random direction and amount to turn
            const double = Boolean(rand(0, 2)) === 2;
            const outer = this.size > 3 && Boolean(rand(0, 1));
            const prime = !double && Boolean(rand(0, 1));

            // pick a random depth to turn
            const depth = this.size > 3 ? rand(0, Math.floor(this.size / 2)) : 0;

            // pick a random face
            face = i === 0
                ? ['u', 'l', 'f', 'r', 'b', 'd'][rand(0, 5)]
                : intersectingFaces[face][rand(0, 3)];

            scramble.push({ depth, double, face, outer, prime });
        }
        
        return scramble;
    }

    /**
     * Generate and stringify a scramble.
     *
     * @param  {number}         length  scramble depth
     * @return {Array<object} 
     */
    generateScrambleString(length = 0) {
        return this.generateScramble(length).map(printTurn).join(' ');
    }

    /**
     * Test if the cube is solved.
     * 
     * @return {boolean}
     */
    isSolved() {
        const stickerLength = this.state.u.length;
        const u = this.state.u[0];
        const l = this.state.l[0];
        const f = this.state.f[0];
        const r = this.state.r[0];
        const b = this.state.b[0];
        const d = this.state.d[0];

        if (this.options.useObjects) {
            for (let i = 1; i < stickerLength; i++) {
                if (
                    this.state.u[i].value !== u.value ||
                    this.state.l[i].value !== l.value ||
                    this.state.f[i].value !== f.value ||
                    this.state.r[i].value !== r.value ||
                    this.state.b[i].value !== b.value ||
                    this.state.d[i].value !== d.value
                ) {
                    return false;
                }
            }
        } else {
            for (let i = 1; i < stickerLength; i++) {
                if (
                    this.state.u[i] !== u ||
                    this.state.l[i] !== l ||
                    this.state.f[i] !== f ||
                    this.state.r[i] !== r ||
                    this.state.b[i] !== b ||
                    this.state.d[i] !== d
                ) {
                    return false;
                }
            } 
        }

        return true;
    }

    /**
     * Parse a turn string.
     *
     * @param  {string} turn
     * @return {Object}
     */
    parseTurn(turn) {
        return parseTurn(turn);
    }

    /**
     * Reset the cube to it's initial state.
     * 
     * @return {void}
     */
    reset() {
        // reset the cube using integer or object values
        const stickers = this.size ** 2;
        const useObjects = !!this.options.useObjects;

        this.state = {
            u: generateStickers(stickers, 0, useObjects),
            l: generateStickers(stickers, 1, useObjects),
            f: generateStickers(stickers, 2, useObjects),
            r: generateStickers(stickers, 3, useObjects),
            b: generateStickers(stickers, 4, useObjects),
            d: generateStickers(stickers, 5, useObjects),
        };
    }

    /**
     * Scramble the cube
     * 
     * @param  {numbed} length
     * @return {void} 
     */
    scramble(length = 0) {
        this.currentScramble = this.generateScramble(length);

        this.turn(this.currentScramble, false);
    }

    /**
     * Itterate over all stickers.
     * 
     * @param  {Function}   fn
     * @return {void}
     */
    stickers(fn) {
        const { u, l, f, r, b, d } = this.state;
        
        [].concat(u, l, f, r, b, d).forEach(fn);
    }

    /**
     * Turn the cube
     * 
     * @param  {Object[]|string}    turns   one or more turns to perform
     * @return {void}
     */
    turn(turns) {
        const turnsArray = Array.isArray(turns) 
            ? turns 
            : turns.split(/[ ,]+/);

        turnsArray.forEach(turn => {
            const parsedTurn = typeof turn === 'string' ? parseTurn(turn) : turn;
            const { depth, target, wide, rotation } = parsedTurn;
    
            // make a log of the turn
            const event = { date: Date.now(), parsedTurn };
    
            // cube rotations
            if (target === 'X') {
                turnCubeX(this, parsedTurn);
            } else if (target === 'Y') {
                turnCubeY(this, parsedTurn);
            } else if (target === 'Z') {
                turnCubeZ(this, parsedTurn);
            } 
            
            // face / slice turns
            else {
                // turn the outer face if necessary
                if (depth === 1 || wide) {
                    this.state[face] = rotate(this.state[face], rotation);
                }
        
                // turn the inner face if necessary
                if (depth >= this.size) {
                    let innerRotation = 2;

                    // if this isn't a double turn, reverse the direction because
                    // it's being turned from the context of the opposite face
                    if (rotation === 1 || rotation === -1) {
                        innerRotation *= -1
                    }
        
                    const oppositeFace = getOppositeFace(target);
        
                    this.state[oppositeFace] = rotate(this.state[oppositeFace], innerRotation);
                }
        
                // turn slices
                const slicedCube = sliceCube(this);
        
                if (face === 'U') {
                    turnSliceU(this, slicedCube, parsedTurn);
                } else if (face === 'L') {
                    turnSliceL(this, slicedCube, parsedTurn);
                } else if (face === 'F') {
                    turnSliceF(this, slicedCube, parsedTurn);
                } else if (face === 'R') {
                    turnSliceR(this, slicedCube, parsedTurn);
                } else if (face === 'B') {
                    turnSliceB(this, slicedCube, parsedTurn);
                } else if (face === 'D') {
                    turnSliceD(this, slicedCube, parsedTurn);
                }
            }

            return event;
        });
    }
}
