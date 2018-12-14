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

        // always turn intersecting faces so we can produce quality scrambles
        const intersectingFaces = {
            U: ['L', 'F', 'R', 'B'],
            L: ['U', 'F', 'D', 'B'],
            F: ['L', 'U', 'R', 'D'],
            R: ['U', 'B', 'D', 'F'],
            B: ['U', 'L', 'D', 'R'],
            D: ['F', 'R', 'B', 'L'],
        }

        // in order to avoid poor scrambles, we need to prevent
        // turns from cancelling prior turns. for example, turning 
        // F then F- would not effect the cube and should be avoided.
        const scramble = [];

        // generate an array of the faces we'll be turning
        for (let i = 0, target; i < length; i++) {

            const depth = this.size > 3 ? rand(0, Math.floor(this.size / 2)) : 1;
            const rotation = [-1, 1, 2][rand(0, 2)];
            const wide = this.size > 3 && !!rand(0, 1);

            // pick a random face
            target = i < 1
                ? ['U', 'L', 'F', 'R', 'B', 'D'][rand(0, 5)]
                : intersectingFaces[target][rand(0, 3)];

            scramble.push({
                depth,
                wide,
                target,
                rotation,
            });
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
        const stickerLength = this.state.U.length;
        const U = this.state.U[0];
        const L = this.state.L[0];
        const F = this.state.F[0];
        const R = this.state.R[0];
        const B = this.state.B[0];
        const D = this.state.D[0];

        if (this.options.useObjects) {
            for (let i = 1; i < stickerLength; i++) {
                if (
                    this.state.U[i].value !== U.value ||
                    this.state.L[i].value !== L.value ||
                    this.state.F[i].value !== F.value ||
                    this.state.R[i].value !== R.value ||
                    this.state.B[i].value !== B.value ||
                    this.state.D[i].value !== D.value
                ) {
                    return false;
                }
            }
        } else {
            for (let i = 1; i < stickerLength; i++) {
                if (
                    this.state.U[i] !== U ||
                    this.state.L[i] !== L ||
                    this.state.F[i] !== F ||
                    this.state.R[i] !== R ||
                    this.state.B[i] !== B ||
                    this.state.D[i] !== D
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
            U: generateStickers(stickers, 0, useObjects),
            L: generateStickers(stickers, 1, useObjects),
            F: generateStickers(stickers, 2, useObjects),
            R: generateStickers(stickers, 3, useObjects),
            B: generateStickers(stickers, 4, useObjects),
            D: generateStickers(stickers, 5, useObjects),
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
        const { U, L, F, R, B, D } = this.state;
        
        [].concat(U, L, F, R, B, D).forEach(fn);
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
                    this.state[target] = rotate(this.state[target], rotation);
                }
        
                // turn the inner face if necessary
                if (depth >= this.size) {
                    let innerRotation = 2;

                    // if this isn't a double turn, reverse the direction because
                    // it's being turned from the context of the opposite face
                    if (rotation === 1 || rotation === -1) {
                        innerRotation = rotation * -1;
                    }
        
                    const oppositeFace = getOppositeFace(target);

                    this.state[oppositeFace] = rotate(this.state[oppositeFace], innerRotation);
                }

                // turn slices
                const slicedCube = sliceCube(this);
        
                if (target === 'U') {
                    turnSliceU(this, slicedCube, parsedTurn);
                } else if (target === 'L') {
                    turnSliceL(this, slicedCube, parsedTurn);
                } else if (target === 'F') {
                    turnSliceF(this, slicedCube, parsedTurn);
                } else if (target === 'R') {
                    turnSliceR(this, slicedCube, parsedTurn);
                } else if (target === 'B') {
                    turnSliceB(this, slicedCube, parsedTurn);
                } else if (target === 'D') {
                    turnSliceD(this, slicedCube, parsedTurn);
                }
            }

            return event;
        });
    }
}
