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

        return slice(arr, start, start + size);
    });
}

/**
 * Helper function to slice then shift an array.
 * 
 * @param  {Array} arr
 * @param  {number} begin
 * @return {any}
 */
export function first(arr, begin) {
    return slice(arr, begin).shift();
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
 * Generate an array of sticker values or objects.
 * 
 * @param  {number}         stickers        the number of stickers to generate
 * @param  {number|string}  value           the value (color) of the stickers
 * @param  {boolean}        useObjects      toggles sticker object types
 * @return {Array}
 */
export function generateStickers(stickers, value, useObjects) {
    const arr = new Array(stickers).fill(value);

    if (useObjects) {
        return arr.map((v, originalIndex) => ({ originalIndex, value }));
    }

    return arr;
}

/**
 * Get the opposite face.
 * 
 * @param  {string} TARGET 
 * @return {string}
 */
export function getOppositeFace(target) {
    return {
        U: 'D',
        L: 'R',
        F: 'B',
        R: 'L',
        B: 'F',
        D: 'D',
    }[target];
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
    const { depth, wide } = parsedTurn;

    for (let i = depth, end = wide ? 0 : depth - 1; i > end; i--) {
        fn(i, -i, i - 1);
    }
}

/**
 * Generate random integer.
 *
 * @param {number} min 
 * @param {number} max 
 */
export function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a reversed array without mutating the source.
 * 
 * @param  {Array} arr 
 * @return {Array}
 */
export function reverse(arr) {
    return slice(arr).reverse();
}

/**
 * Rotate a face array.
 * 
 * @param {Array}   arr 
 * @param {number}  degrees 
 */
export function rotate(arr, degrees) {
    if (degrees === 1) {
        return flattenCols(reverse(chunkRows(arr)));
    } else if (degrees === -1) {
        return flattenRows(reverse(chunkCols(arr)));
    } else if (degrees === 2) {
        return reverse(arr);
    }
}

/**
 * Slice a cube into each face's rows and columns.
 * 
 * @param  {Cube}   cube 
 * @return {object}
 */
export function sliceCube(cube) {
    const { U, L, F, R, B, D } = cube.state;

    return {
        U: {
            r: chunkRows(U),
            c: chunkCols(U),
        },
        L: {
            r: chunkRows(L),
            c: chunkCols(L),
        },
        F: {
            r: chunkRows(F),
            c: chunkCols(F),
        },
        R: {
            r: chunkRows(R),
            c: chunkCols(R),
        },
        B: {
            r: chunkRows(B),
            c: chunkCols(B),
        },
        D: {
            r: chunkRows(D),
            c: chunkCols(D),
        },
    };
}

/**
 * Slice an array. This function exists to make
 * our output more compressable by minifiers.
 * 
 * @param  {Array}  arr
 * @return {Array}
 */
export function slice(arr, begin, end) {
    return arr.slice(begin, end);
}

/**
 * Splice an array. This function exists to make
 * our output more compressable by minifiers.
 * 
 * @param  {Array}  arr
 * @return {Array}
 */
export function splice(arr, start, deleteCount, item) {
    return arr.splice(start, deleteCount, item);
}

/**
 * Turn a cube along the X axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnCubeX(cube, parsedTurn) {
    const state = cube.state;
    const prime = parsedTurn.rotation === -1;
    const double = parsedTurn.rotation === 2;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = slice(state.D);
        newL = rotate(state.L, 2);
        newF = reverse(state.B);
        newR = rotate(state.R, 2);
        newB = reverse(state.F);
        newD = slice(state.U);
    } else if (prime) {
        // 90 counter-clockwise
        newU = reverse(state.B);
        newL = rotate(state.L, 1);
        newF = slice(state.U);
        newR = rotate(state.R, -1);
        newB = reverse(state.D);
        newD = slice(state.F);
    } else {
        // 90 clockwise
        newU = slice(state.F);
        newL = rotate(state.L, -1);
        newF = slice(state.D);
        newR = rotate(state.R, 1);
        newB = reverse(state.U);
        newD = reverse(state.B);
    }

    state.U = newU;
    state.L = newL;
    state.F = newF;
    state.R = newR;
    state.B = newB;
    state.D = newD;
}

/**
 * Turn a cube along the Y axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnCubeY(cube, parsedTurn) {
    const state = cube.state;
    const prime = parsedTurn.rotation === -1;
    const double = parsedTurn.rotation === 2;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = rotate(state.U, 2);
        newL = slice(state.R);
        newF = slice(state.B);
        newR = slice(state.L);
        newB = slice(state.F);
        newD = rotate(state.D, 2);
    } else if (prime) {
        // 90 counter-clockwise
        newU = rotate(state.U, -1);
        newL = slice(state.B);
        newF = slice(state.L);
        newR = slice(state.F);
        newB = slice(state.R);
        newD = rotate(state.D, 1);
    } else {
        // 90 clockwise
        newU = rotate(state.U, 1);
        newL = slice(state.F);
        newF = slice(state.R);
        newR = slice(state.B);
        newB = slice(state.L);
        newD = rotate(state.D, -1);
    }

    state.U = newU;
    state.L = newL;
    state.F = newF;
    state.R = newR;
    state.B = newB;
    state.D = newD;
}

/**
 * Turn a cube along the Z axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnCubeZ(cube, parsedTurn) {
    const state = cube.state;
    const prime = parsedTurn.rotation === -1;
    const double = parsedTurn.rotation === 2;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = reverse(state.D);
        newL = reverse(state.R);
        newF = rotate(state.F, 2);
        newR = reverse(state.L);
        newB = rotate(state.B, 2);
        newD = reverse(state.U);
    } else if (prime) {
        // 90 counter-clockwise
        newU = rotate(state.R, -1);
        newL = rotate(state.U, -1);
        newF = rotate(state.F, -1);
        newR = rotate(state.D, -1);
        newB = rotate(state.B, 1);
        newD = rotate(state.L, -1);
    } else {
        // 90 clockwise
        newU = rotate(state.L, 1);
        newL = rotate(state.D, 1);
        newF = rotate(state.F, 1);
        newR = rotate(state.U, 1);
        newB = rotate(state.B, -1);
        newD = rotate(state.R, 1);
    }

    state.U = newU;
    state.L = newL;
    state.F = newF;
    state.R = newR;
    state.B = newB;
    state.D = newD;
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
    const state = cube.state;

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.r, iSubOne);
        const oldL = first(slicedCube.L.c, iSubOne);
        const oldD = first(slicedCube.D.r, negI);
        const oldR = first(slicedCube.R.c, negI);
        
        let newU, newL, newD, newR;

        if (parsedTurn.rotation === 2) {
            // 180
            newU = reverse(oldD);
            newL = reverse(oldR);
            newD = reverse(oldU);
            newR = reverse(oldL);
        } else if (parsedTurn.rotation === -1) {
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

        splice(slicedCube.U.r, i - 1, 1, newU);
        splice(slicedCube.L.c, i - 1, 1, newL);
        splice(slicedCube.D.r, negI, 1, newD);
        splice(slicedCube.R.c, negI, 1, newR);

        state.U = flattenRows(slicedCube.U.r);
        state.L = flattenCols(slicedCube.L.c);
        state.D = flattenRows(slicedCube.D.r);
        state.R = flattenCols(slicedCube.R.c);
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
    const state = cube.state;

    loopSlices(parsedTurn, (i, negI) => {
        const oldF = first(slicedCube.F.r, negI);
        const oldR = first(slicedCube.R.r, negI);
        const oldB = first(slicedCube.B.r, negI);
        const oldL = first(slicedCube.L.r, negI);
        
        let newF, newR, newB, newL;

        if (parsedTurn.rotation === 2) {
            // 180
            newF = oldB;
            newR = oldL;
            newB = oldF;
            newL = oldR;
        } else if (parsedTurn.rotation === -1) {
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

        splice(slicedCube.F.r, negI, 1, newF);
        splice(slicedCube.R.r, negI, 1, newR);
        splice(slicedCube.B.r, negI, 1, newB);
        splice(slicedCube.L.r, negI, 1, newL);

        state.F = flattenRows(slicedCube.F.r);
        state.R = flattenRows(slicedCube.R.r);
        state.B = flattenRows(slicedCube.B.r);
        state.L = flattenRows(slicedCube.L.r);
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
    const state = cube.state;

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.r, negI);
        const oldR = first(slicedCube.R.c, iSubOne);
        const oldD = first(slicedCube.D.r, iSubOne);
        const oldL = first(slicedCube.L.c, negI);

        let newU, newR, newD, newL;

        if (parsedTurn.rotation === 2) {
            // 180
            newU = reverse(oldD);
            newR = reverse(oldL);
            newD = reverse(oldU);
            newL = reverse(oldR);
        } else if (parsedTurn.rotation === -1) {
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

        splice(slicedCube.U.r, negI, 1, newU);
        splice(slicedCube.R.c, iSubOne, 1, newR);
        splice(slicedCube.D.r, iSubOne, 1, newD);
        splice(slicedCube.L.c, negI, 1, newL);

        state.U = flattenRows(slicedCube.U.r);
        state.R = flattenCols(slicedCube.R.c);
        state.D = flattenRows(slicedCube.D.r);
        state.L = flattenCols(slicedCube.L.c);
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
    const state = cube.state;

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.c, iSubOne);
        const oldF = first(slicedCube.F.c, iSubOne);
        const oldD = first(slicedCube.D.c, iSubOne);
        const oldB = first(slicedCube.B.c, negI);

        let newU, newF, newD, newB;

        if (parsedTurn.rotation === 2) {
            // 180
            newU = oldD;
            newF = reverse(oldB);
            newD = oldU;
            newB = reverse(oldF);
        } else if (parsedTurn.rotation === -1) {
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

        splice(slicedCube.U.c, iSubOne, 1, newU);
        splice(slicedCube.F.c, iSubOne, 1, newF);
        splice(slicedCube.D.c, iSubOne, 1, newD);
        splice(slicedCube.B.c, negI, 1, newB);

        state.U = flattenCols(slicedCube.U.c);
        state.F = flattenCols(slicedCube.F.c);
        state.D = flattenCols(slicedCube.D.c);
        state.B = flattenCols(slicedCube.B.c);
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
    const state = cube.state;

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.c, negI);
        const oldB = first(slicedCube.B.c, iSubOne);
        const oldD = first(slicedCube.D.c, negI);
        const oldF = first(slicedCube.F.c, negI);
        
        let newU, newB, newD, newF;

        if (parsedTurn.rotation === 2) {
            // 180
            newU = oldD;
            newB = reverse(oldF);
            newD = oldU;
            newF = reverse(oldB);
        } else if (parsedTurn.rotation === -1) {
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

        splice(slicedCube.U.c, negI, 1, newU);
        splice(slicedCube.B.c, iSubOne, 1, newB);
        splice(slicedCube.D.c, negI, 1, newD);
        splice(slicedCube.F.c, negI, 1, newF);

        state.U = flattenCols(slicedCube.U.c);
        state.B = flattenCols(slicedCube.B.c);
        state.D = flattenCols(slicedCube.D.c);
        state.F = flattenCols(slicedCube.F.c);
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
    const state = cube.state;

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldB = first(slicedCube.B.r, iSubOne);
        const oldR = first(slicedCube.R.r, iSubOne);
        const oldF = first(slicedCube.F.r, iSubOne);
        const oldL = first(slicedCube.L.r, iSubOne);

        let newB, newR, newF, newL;

        if (parsedTurn.rotation === 2) {
            // 180
            newB = oldF;
            newR = oldL;
            newF = oldB;
            newL = oldR;
        } else if (parsedTurn.rotation === -1) {
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

        splice(slicedCube.B.r, iSubOne, 1, newB);
        splice(slicedCube.R.r, iSubOne, 1, newR);
        splice(slicedCube.F.r, iSubOne, 1, newF);
        splice(slicedCube.L.r, iSubOne, 1, newL);

        state.B = flattenRows(slicedCube.B.r);
        state.R = flattenRows(slicedCube.R.r);
        state.F = flattenRows(slicedCube.F.r);
        state.L = flattenRows(slicedCube.L.r);
    });
}
