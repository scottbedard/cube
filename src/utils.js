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
 * Get the opposite face.
 * 
 * @param  {string} face 
 * @return {string}
 */
export function getOppositeFace(face) {
    switch(face) {
        case 'u': return 'd';
        case 'l': return 'r';
        case 'f': return 'b';
        case 'r': return 'l';
        case 'b': return 'f';
        case 'd': return 'u';
    }
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
    const whole = ['x', 'y', 'z'].includes(face);

    return { depth, face, double, outer, prime, whole };
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
 * Turn a cube along it's X axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnCubeX(cube, parsedTurn) {
    const { double, prime } = parsedTurn;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = cube.state.d.slice();
        newL = rotate(cube.state.l, 180);
        newF = reverse(cube.state.b);
        newR = rotate(cube.state.r, 180);
        newB = reverse(cube.state.f);
        newD = cube.state.u.slice();
    } else if (prime) {
        // 90 counter-clockwise
        newU = reverse(cube.state.b);
        newL = rotate(cube.state.l, 90);
        newF = cube.state.u.slice();
        newR = rotate(cube.state.r, -90);
        newB = reverse(cube.state.d);
        newD = cube.state.f.slice();
    } else {
        // 90 clockwise
        newU = cube.state.f.slice();
        newL = rotate(cube.state.l, -90);
        newF = cube.state.d.slice();
        newR = rotate(cube.state.r, 90);
        newB = reverse(cube.state.u);
        newD = reverse(cube.state.b);
    }

    cube.state.u = newU;
    cube.state.l = newL;
    cube.state.f = newF;
    cube.state.r = newR;
    cube.state.b = newB;
    cube.state.d = newD;
}

/**
 * Turn slices for a B turn.
 *
 * @param  {Cube}   cube 
 * @param  {object} slicedCube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnSliceB(cube, slicedCube, parsedTurn) {
    const { depth, double, outer, prime } = parsedTurn;

    loopSlices(parsedTurn, i => {
        const oldU = slicedCube.u.rows.slice(i - 1).shift();
        const oldL = slicedCube.l.cols.slice(i - 1).shift();
        const oldD = slicedCube.d.rows.slice(-i).shift();
        const oldR = slicedCube.r.cols.slice(-i).shift();
        
        let newU, newL, newD, newR;

        if (double) {
            // 180
            newU = reverse(oldD);
            newL = reverse(oldR);
            newD = reverse(oldU);
            newR = reverse(oldL);
        } else if (prime) {
            // 90 counter-clockwise
            newU = reverse(oldL);
            newL = oldD;
            newD = reverse(oldR);
            newR = oldU;
        } else {
            // 90 clockwise
            newU = oldR;
            newL = reverse(oldU);
            newD = oldL;
            newR = reverse(oldD);
        }

        slicedCube.u.rows.splice(i - 1, 1, newU);
        slicedCube.l.cols.splice(i - 1, 1, newL);
        slicedCube.d.rows.splice(-i, 1, newD);
        slicedCube.r.cols.splice(-i, 1, newR);

        cube.state.u = flattenRows(slicedCube.u.rows);
        cube.state.l = flattenCols(slicedCube.l.cols);
        cube.state.d = flattenRows(slicedCube.d.rows);
        cube.state.r = flattenCols(slicedCube.r.cols);
    });
}

/**
 * Turn slices for a D turn.
 *
 * @param  {Cube}   cube 
 * @param  {object} slicedCube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnSliceD(cube, slicedCube, parsedTurn) {
    const { depth, double, outer, prime } = parsedTurn;

    loopSlices(parsedTurn, i => {
        const oldF = slicedCube.f.rows.slice(-i).shift();
        const oldR = slicedCube.r.rows.slice(-i).shift();
        const oldB = slicedCube.b.rows.slice(-i).shift();
        const oldL = slicedCube.l.rows.slice(-i).shift();
        
        let newF, newR, newB, newL;

        if (double) {
            // 180
            newF = oldB;
            newR = oldL;
            newB = oldF;
            newL = oldR;
        } else if (prime) {
            // 90 counter-clockwise
            newF = oldR;
            newR = oldB;
            newB = oldL;
            newL = oldF;
        } else {
            // 90 clockwise
            newF = oldL;
            newR = oldF;
            newB = oldR;
            newL = oldB;
        }

        slicedCube.f.rows.splice(-i, 1, newF);
        slicedCube.r.rows.splice(-i, 1, newR);
        slicedCube.b.rows.splice(-i, 1, newB);
        slicedCube.l.rows.splice(-i, 1, newL);

        cube.state.f = flattenRows(slicedCube.f.rows);
        cube.state.r = flattenRows(slicedCube.r.rows);
        cube.state.b = flattenRows(slicedCube.b.rows);
        cube.state.l = flattenRows(slicedCube.l.rows);
    });
}

/**
 * Turn slices for a F turn.
 *
 * @param  {Cube}   cube 
 * @param  {object} slicedCube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnSliceF(cube, slicedCube, parsedTurn) {
    const { depth, double, outer, prime } = parsedTurn;

    loopSlices(parsedTurn, i => {
        const oldU = slicedCube.u.rows.slice(-i).shift();
        const oldR = slicedCube.r.cols.slice(i - 1).shift();
        const oldD = slicedCube.d.rows.slice(i - 1).shift();
        const oldL = slicedCube.l.cols.slice(-i).shift();

        let newU, newR, newD, newL;

        if (double) {
            // 180
            newU = reverse(oldD);
            newR = reverse(oldL);
            newD = reverse(oldU);
            newL = reverse(oldR);
        } else if (prime) {
            // 90 counter-clockwise
            newU = oldR;
            newR = reverse(oldD);
            newD = oldL;
            newL = reverse(oldU);
        } else {
            // 90 clockwise
            newU = reverse(oldL);
            newR = oldU;
            newD = reverse(oldR);
            newL = oldD;
        }

        slicedCube.u.rows.splice(-i, 1, newU);
        slicedCube.r.cols.splice(i - 1, 1, newR);
        slicedCube.d.rows.splice(i - 1, 1, newD);
        slicedCube.l.cols.splice(-i, 1, newL);

        cube.state.u = flattenRows(slicedCube.u.rows);
        cube.state.r = flattenCols(slicedCube.r.cols);
        cube.state.d = flattenRows(slicedCube.d.rows);
        cube.state.l = flattenCols(slicedCube.l.cols);
    });
}

/**
 * Turn slices for a L turn.
 *
 * @param  {Cube}   cube 
 * @param  {object} slicedCube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnSliceL(cube, slicedCube, parsedTurn) {
    const { depth, double, outer, prime } = parsedTurn;

    loopSlices(parsedTurn, i => {
        const oldU = slicedCube.u.cols.slice(i - 1).shift();
        const oldF = slicedCube.f.cols.slice(i - 1).shift();
        const oldD = slicedCube.d.cols.slice(i - 1).shift();
        const oldB = slicedCube.b.cols.slice(-i).shift();

        let newU, newF, newD, newB;

        if (double) {
            // 180
            newU = oldD;
            newF = reverse(oldB);
            newD = oldU;
            newB = reverse(oldF);
        } else if (prime) {
            // 90 counter-clockwise
            newU = oldF;
            newF = oldD;
            newD = reverse(oldB);
            newB = reverse(oldU);
        } else {
            // 90 clockwise
            newU = reverse(oldB);
            newF = oldU;
            newD = oldF;
            newB = reverse(oldD);
        }

        slicedCube.u.cols.splice(i - 1, 1, newU);
        slicedCube.f.cols.splice(i - 1, 1, newF);
        slicedCube.d.cols.splice(i - 1, 1, newD);
        slicedCube.b.cols.splice(-i, 1, newB);

        cube.state.u = flattenCols(slicedCube.u.cols);
        cube.state.f = flattenCols(slicedCube.f.cols);
        cube.state.d = flattenCols(slicedCube.d.cols);
        cube.state.b = flattenCols(slicedCube.b.cols);
    });
}

/**
 * Turn slices for a R turn.
 *
 * @param  {Cube}   cube 
 * @param  {object} slicedCube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnSliceR(cube, slicedCube, parsedTurn) {
    const { depth, double, outer, prime } = parsedTurn;

    loopSlices(parsedTurn, i => {
        const oldU = slicedCube.u.cols.slice(-i).shift();
        const oldB = slicedCube.b.cols.slice(i - 1).shift();
        const oldD = slicedCube.d.cols.slice(-i).shift();
        const oldF = slicedCube.f.cols.slice(-i).shift();
        
        let newU, newB, newD, newF;

        if (double) {
            // 180
            newU = oldD;
            newB = reverse(oldF);
            newD = oldU;
            newF = reverse(oldB);
        } else if (prime) {
            // 90 counter-clockwise
            newU = reverse(oldB);
            newB = reverse(oldD);
            newD = oldF;
            newF = oldU;
        } else {
            // 90 clockwise
            newU = oldF;
            newB = reverse(oldU);
            newD = reverse(oldB);
            newF = oldD;
        }

        slicedCube.u.cols.splice(-i, 1, newU);
        slicedCube.b.cols.splice(i - 1, 1, newB);
        slicedCube.d.cols.splice(-i, 1, newD);
        slicedCube.f.cols.splice(-i, 1, newF);

        cube.state.u = flattenCols(slicedCube.u.cols);
        cube.state.b = flattenCols(slicedCube.b.cols);
        cube.state.d = flattenCols(slicedCube.d.cols);
        cube.state.f = flattenCols(slicedCube.f.cols);
    });
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