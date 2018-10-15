import {
    isInt,
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
}
