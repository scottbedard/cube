/**
 * Chunk a face array into columns.
 * 
 * [                [
 *     1, 2, 3,         [1, 4, 7],
 *     4, 5, 6,  ->     [2, 5, 8],
 *     7, 8, 9,         [3, 6, 9],
 * ]                ]
 * 
 * @param  {Array} arr
 * @return {Array}
 */
export function chunkCols(arr) {
    return flip(chunkRows(arr));
}

/**
 * Chunk a face array into rows.
 * 
 * [                [
 *     1, 2, 3,         [1, 2, 3],
 *     4, 5, 6,  ->     [4, 5, 6], 
 *     7, 8, 9,         [7, 8, 9],
 * ]                ]
 * 
 * @param  {Array} arr
 * @return {Array}
 */
export function chunkRows(arr) {
    const size = Math.sqrt(arr.length);

    return new Array(size).fill().map((val, i) => {
        const start = i * size;

        return arr.slice(start, start + size)
    });
}

/**
 * Flatten an array of columns.
 * 
 * [                    [
 *     [1, 4, 7],           1, 2, 3,
 *     [2, 5, 8],  ->       4, 5, 6,
 *     [3, 6, 9],           7, 8, 9,
 * ]                    ]
 * 
 * @param  {Array} cols
 * @return {Array}
 */
export function flattenCols(cols) {
    return flattenRows(flip(cols));
}

/**
 * Flatten an array of rows.
 * 
 * [                    [
 *     [1, 2, 3],           1, 2, 3,
 *     [4, 5, 6],  ->       4, 5, 6,
 *     [7, 8, 9],           7, 8, 9,
 * ]                    ]
 * 
 * @param  {Array} arr 
 * @return {Array}
 */
export function flattenRows(arr) {
   return arr.reduce((acc, row) => acc.concat(row), []);
}

/**
 * Convert row and column chunks. A good way to visualize
 * this operation is to imagine holding a card by the
 * top-left / bottom-right corners, and flipping it over.
 * 
 * [                    [
 *     [1, 2, 3],           [1, 4, 7],
 *     [4, 5, 6],  ->       [2, 5, 8],    
 *     [7, 8, 9],           [3, 6, 9],
 * ]                    ]
 * 
 * @param  {Array} arr 
 * @return {Array}
 */
export function flip(arr) {
    return arr[0].map((val, i) => arr.map(chunk => chunk[i]));
}

/**
 * Test if a value an integer.
 * 
 * @param {any} val
 */
export function isInt(val) {
    return Number(val) === val && val % 1 === 0;
}

/**
 * Itterate over the slices of a turn.
 * 
 * @param  {object}     parsedTurn 
 * @param  {Function}   fn 
 * @return {void}
 */
export function loopSlices(parsedTurn, fn) {
    const { depth, outer } = parsedTurn;

    for (let i = depth, end = outer ? 0 : depth - 1; i > end; i--) {
        fn(i);
    }
}

/**
 * Parse a turn string.
 * 
 * @param  {string} turn
 * @return {Object}
 */
export function parseTurn(turn) {
    const rawDepth = turn.match(/^[0-9]+/) || 1;

    const depth = Array.isArray(rawDepth) ? Number(rawDepth[0]) : rawDepth;
    const face = turn.match(/[A-Za-z]/)[0].toLowerCase();
    const double = turn.endsWith('2');
    const outer = depth === 1 || turn.match(/[a-z]/) !== null;
    const prime = turn.endsWith('-');

    return { depth, face, double, outer, prime };
}

/**
 * Returns a reversed array without mutating the source.
 * 
 * @param  {Array} arr 
 * @return {Array}
 */
export function reverse(arr) {
    return arr.slice(0).reverse();
}

/**
 * Rotate a face array.
 * 
 * @param {Array}   arr 
 * @param {number}  degrees 
 */
export function rotate(arr, degrees) {
    if (degrees === 90) {
        return flattenCols(reverse(chunkRows(arr)));
    } else if (degrees === -90) {
        return flattenRows(reverse(chunkCols(arr)));
    } else if (degrees === 180) {
        return reverse(arr);
    }
    
    throw new Error('Invalid rotation degrees, must be 90, -90, or 180');
}

/**
 * Slice a cube into each face's rows and columns.
 * 
 * @param  {Cube}   cube 
 * @return {object}
 */
export function sliceCube(cube) {
    const { u, l, f, r, b, d } = cube.state;

    return {
        u: {
            rows: chunkRows(u),
            cols: chunkCols(u),
        },
        l: {
            rows: chunkRows(l),
            cols: chunkCols(l),
        },
        f: {
            rows: chunkRows(f),
            cols: chunkCols(f),
        },
        r: {
            rows: chunkRows(r),
            cols: chunkCols(r),
        },
        b: {
            rows: chunkRows(b),
            cols: chunkCols(b),
        },
        d: {
            rows: chunkRows(d),
            cols: chunkCols(d),
        },
    };
}

/**
 * Turn slices for a U turn.
 *
 * @param  {Cube}   cube 
 * @param  {object} slicedCube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnSliceU(cube, slicedCube, parsedTurn) {
    const { depth, double, outer, prime } = parsedTurn;

    loopSlices(parsedTurn, i => {
        const oldB = slicedCube.b.rows.slice(i - 1).shift();
        const oldR = slicedCube.r.rows.slice(i - 1).shift();
        const oldF = slicedCube.f.rows.slice(i - 1).shift();
        const oldL = slicedCube.l.rows.slice(i - 1).shift();

        let newB, newR, newF, newL;

        if (double) {
            // 180
            newB = oldF;
            newR = oldL;
            newF = oldB;
            newL = oldR;
        } else if (prime) {
            // 90 counter-clockwise
            newB = oldR;
            newR = oldF;
            newF = oldL;
            newL = oldB;
        } else {
            // 90 clockwise
            newB = oldL;
            newR = oldB;
            newF = oldR;
            newL = oldF;
        }

        slicedCube.b.rows.splice(i - 1, 1, newB);
        slicedCube.r.rows.splice(i - 1, 1, newR);
        slicedCube.f.rows.splice(i - 1, 1, newF);
        slicedCube.l.rows.splice(i - 1, 1, newL);

        cube.state.b = flattenRows(slicedCube.b.rows);
        cube.state.r = flattenRows(slicedCube.r.rows);
        cube.state.f = flattenRows(slicedCube.f.rows);
        cube.state.l = flattenRows(slicedCube.l.rows);
    });
}