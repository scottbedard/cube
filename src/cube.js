import {
    isInt,
    getOppositeFace,
    parseTurn,
    printTurn,
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
    constructor(size = 3) {
        // make sure the cube is being constructed with a valid size
        if (!isInt(size) || size < 2) {
            throw new Error('Cube size must be a whole number greater than 1');
        }

        this.size = size;

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
        // turns from cancelling prior turns]. for example, turning 
        // F then F- would not effect the cube and should be avoided.
        const scramble = [];

        // this holds the faces that are acceptable to turn with a
        // given face. anything intersecting the key is a valid option.
        const intersections = {
            u: ['l', 'f', 'r', 'b'],
            l: ['u', 'f', 'd', 'b'],
            f: ['l', 'u', 'r', 'd'],
            r: ['u', 'b', 'd', 'f'],
            b: ['u', 'l', 'd', 'r'],
            d: ['f', 'r', 'b', 'l'],
        };
        
        // generate an array of the faces we'll be turning
        for (let i = 0, face; i < length; i++) {
            // pick a random direction and amount to turn
            const double = Boolean(rand(0, 1));
            const outer = this.size > 3 && Boolean(rand(0, 1));
            const prime = Boolean(rand(0, 1));

            // pick a random depth to turn
            const depth = this.size > 3 ? rand(0, Math.floor(this.size / 2)) : 0;

            // pick a random face
            face = i === 0
                ? ['u', 'l', 'f', 'r', 'b', 'd'][rand(0, 5)]
                : intersections[face][rand(0, 3)];

            scramble.push({
                depth,
                double,
                face,
                outer,
                prime,
            });
        }
        
        return scramble;
    }

    /**
     * Get the last turn from history.
     * 
     * @return {object|undefined}
     */
    getLastTurn() {
        return this.history.slice(-1).pop();
    }

    /**
     * Test if the cube is solved.
     * 
     * @return {boolean}
     */
    isSolved() {
        const u = this.state.u[0];
        const l = this.state.l[0];
        const f = this.state.f[0];
        const r = this.state.r[0];
        const b = this.state.b[0];
        const d = this.state.d[0];

        for (let i = 1; i < this.size; i++) {
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

        return true;
    }

    /**
     * Reset the cube to it's initial state.
     * 
     * @return {void}
     */
    reset() {
        const stickers = this.size ** 2;

        this.history = [];
        
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
     * Scramble the cube
     * 
     * @param  {numbed} depth
     * @return {void} 
     */
    scramble(depth = 0) {
        this.turn(this.generateScramble(depth));
    }

    /**
     * Turn the cube
     * 
     * @param  {Object[]|string} turns
     * @return {void}
     */
    turn(turns) {
        const turnsArray = Array.isArray(turns) 
            ? turns 
            : turns.split(/[ ,]+/);

        turnsArray.forEach(turn => {
            const parsedTurn = typeof turn === 'string' ? parseTurn(turn) : turn;
            const { depth, double, face, outer, prime, whole } = parsedTurn;
    
            // make a log of the turn
            const date = Date.now();
            const event = { date, parsedTurn };
    
            this.history.push(event);
    
            // whole-cube turns
            if (whole) {
                if (face === 'x') {
                    turnCubeX(this, parsedTurn);
                } else if (face === 'y') {
                    turnCubeY(this, parsedTurn);
                } else if (face === 'z') {
                    turnCubeZ(this, parsedTurn);
                }
    
                return event;
            }
    
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
            const slicedCube = sliceCube(this);
    
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
    
            return event;
        });
    }
}
