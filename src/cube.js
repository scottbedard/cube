import {
    isInt,
    getOppositeFace,
    parseTurn,
    rotate,
    sliceCube,
    turnCubeX,
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
    constructor(size = 3) {
        // make sure the cube is being constructed with a valid size
        if (!isInt(size) || size < 2) {
            throw new Error('Cube size must be a whole number greater than 1');
        }

        this.size = size;

        this.reset();
    }

    /**
     * Reset the cube to it's initial state.
     * 
     * @return {void}
     */
    reset() {
        const stickers = this.size ** 2;
        
        this.state = {
            u: new Array(stickers).fill(0),
            l: new Array(stickers).fill(1),
            f: new Array(stickers).fill(2),
            r: new Array(stickers).fill(3),
            b: new Array(stickers).fill(4),
            d: new Array(stickers).fill(5),
        };
    }

    /**
     * Turn the cube
     * 
     * @param  {string} turn
     * @return {void}
     */
    turn(turn) {
        const parsedTurn = parseTurn(turn);
        const { depth, double, face, outer, prime, whole } = parsedTurn;

        // whole-cube turns
        if (whole) {
            if (face === 'x') {
                turnCubeX(this, parsedTurn);
            } else if (face === 'y') {

            } else if (face === 'z') {

            }

            return;
        }

        const slicedCube = sliceCube(this);

        // turn the outer face if necessary
        if (outer) {
            let deg = 90;

            if (prime) {
                deg = -90;
            } else if (double) {
                deg = 180;
            }

            this.state[face] = rotate(this.state[face], deg);
        }

        // turn the inner face if necessary. notice the
        // turn direction is reversed because it's being
        // turned from the context of the opposite face
        if (depth >= this.size) {
            let deg = -90;

            if (prime) {
                deg = 90;
            } else if (double) {
                deg = 180;
            }

            const oppositeFace = getOppositeFace(face);

            this.state[oppositeFace] = rotate(this.state[oppositeFace], deg);
        }

        // turn slices
        if (face === 'u') {
            turnSliceU(this, slicedCube, parsedTurn);
        } else if (face === 'l') {
            turnSliceL(this, slicedCube, parsedTurn);
        } else if (face === 'f') {
            turnSliceF(this, slicedCube, parsedTurn);
        } else if (face === 'r') {
            turnSliceR(this, slicedCube, parsedTurn);
        } else if (face === 'b') {
            turnSliceB(this, slicedCube, parsedTurn);
        } else if (face === 'd') {
            turnSliceD(this, slicedCube, parsedTurn);
        }
    }
}
