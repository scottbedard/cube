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
            rows: chunkRows(U),
            cols: chunkCols(U),
        },
        L: {
            rows: chunkRows(L),
            cols: chunkCols(L),
        },
        F: {
            rows: chunkRows(F),
            cols: chunkCols(F),
        },
        R: {
            rows: chunkRows(R),
            cols: chunkCols(R),
        },
        B: {
            rows: chunkRows(B),
            cols: chunkCols(B),
        },
        D: {
            rows: chunkRows(D),
            cols: chunkCols(D),
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
    const prime = parsedTurn.rotation === -1;
    const double = parsedTurn.rotation === 2;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = slice(cube.state.D);
        newL = rotate(cube.state.L, 2);
        newF = reverse(cube.state.B);
        newR = rotate(cube.state.R, 2);
        newB = reverse(cube.state.F);
        newD = slice(cube.state.U);
    } else if (prime) {
        // 90 counter-clockwise
        newU = reverse(cube.state.B);
        newL = rotate(cube.state.L, 1);
        newF = slice(cube.state.U);
        newR = rotate(cube.state.R, -1);
        newB = reverse(cube.state.D);
        newD = slice(cube.state.F);
    } else {
        // 90 clockwise
        newU = slice(cube.state.F);
        newL = rotate(cube.state.L, -1);
        newF = slice(cube.state.D);
        newR = rotate(cube.state.R, 1);
        newB = reverse(cube.state.U);
        newD = reverse(cube.state.B);
    }

    cube.state.U = newU;
    cube.state.L = newL;
    cube.state.F = newF;
    cube.state.R = newR;
    cube.state.B = newB;
    cube.state.D = newD;
}

/**
 * Turn a cube along the Y axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnCubeY(cube, parsedTurn) {
    const prime = parsedTurn.rotation === -1;
    const double = parsedTurn.rotation === 2;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = rotate(cube.state.U, 2);
        newL = slice(cube.state.R);
        newF = slice(cube.state.B);
        newR = slice(cube.state.L);
        newB = slice(cube.state.F);
        newD = rotate(cube.state.D, 2);
    } else if (prime) {
        // 90 counter-clockwise
        newU = rotate(cube.state.U, -1);
        newL = slice(cube.state.B);
        newF = slice(cube.state.L);
        newR = slice(cube.state.F);
        newB = slice(cube.state.R);
        newD = rotate(cube.state.D, 1);
    } else {
        // 90 clockwise
        newU = rotate(cube.state.U, 1);
        newL = slice(cube.state.F);
        newF = slice(cube.state.R);
        newR = slice(cube.state.B);
        newB = slice(cube.state.L);
        newD = rotate(cube.state.D, -1);
    }

    cube.state.U = newU;
    cube.state.L = newL;
    cube.state.F = newF;
    cube.state.R = newR;
    cube.state.B = newB;
    cube.state.D = newD;
}

/**
 * Turn a cube along the Z axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */
export function turnCubeZ(cube, parsedTurn) {
    const prime = parsedTurn.rotation === -1;
    const double = parsedTurn.rotation === 2;

    let newU, newL, newF, newR, newB, newD;

    if (double) {
        // 180
        newU = reverse(cube.state.D);
        newL = reverse(cube.state.R);
        newF = rotate(cube.state.F, 2);
        newR = reverse(cube.state.L);
        newB = rotate(cube.state.B, 2);
        newD = reverse(cube.state.U);
    } else if (prime) {
        // 90 counter-clockwise
        newU = rotate(cube.state.R, -1);
        newL = rotate(cube.state.U, -1);
        newF = rotate(cube.state.F, -1);
        newR = rotate(cube.state.D, -1);
        newB = rotate(cube.state.B, 1);
        newD = rotate(cube.state.L, -1);
    } else {
        // 90 clockwise
        newU = rotate(cube.state.L, 1);
        newL = rotate(cube.state.D, 1);
        newF = rotate(cube.state.F, 1);
        newR = rotate(cube.state.U, 1);
        newB = rotate(cube.state.B, -1);
        newD = rotate(cube.state.R, 1);
    }

    cube.state.U = newU;
    cube.state.L = newL;
    cube.state.F = newF;
    cube.state.R = newR;
    cube.state.B = newB;
    cube.state.D = newD;
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
    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.rows, iSubOne);
        const oldL = first(slicedCube.L.cols, iSubOne);
        const oldD = first(slicedCube.D.rows, negI);
        const oldR = first(slicedCube.R.cols, negI);
        
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

        splice(slicedCube.U.rows, i - 1, 1, newU);
        splice(slicedCube.L.cols, i - 1, 1, newL);
        splice(slicedCube.D.rows, negI, 1, newD);
        splice(slicedCube.R.cols, negI, 1, newR);

        cube.state.U = flattenRows(slicedCube.U.rows);
        cube.state.L = flattenCols(slicedCube.L.cols);
        cube.state.D = flattenRows(slicedCube.D.rows);
        cube.state.R = flattenCols(slicedCube.R.cols);
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
    loopSlices(parsedTurn, (i, negI) => {
        const oldF = first(slicedCube.F.rows, negI);
        const oldR = first(slicedCube.R.rows, negI);
        const oldB = first(slicedCube.B.rows, negI);
        const oldL = first(slicedCube.L.rows, negI);
        
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

        splice(slicedCube.F.rows, negI, 1, newF);
        splice(slicedCube.R.rows, negI, 1, newR);
        splice(slicedCube.B.rows, negI, 1, newB);
        splice(slicedCube.L.rows, negI, 1, newL);

        cube.state.F = flattenRows(slicedCube.F.rows);
        cube.state.R = flattenRows(slicedCube.R.rows);
        cube.state.B = flattenRows(slicedCube.B.rows);
        cube.state.L = flattenRows(slicedCube.L.rows);
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
    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.rows, negI);
        const oldR = first(slicedCube.R.cols, iSubOne);
        const oldD = first(slicedCube.D.rows, iSubOne);
        const oldL = first(slicedCube.L.cols, negI);

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

        splice(slicedCube.U.rows, negI, 1, newU);
        splice(slicedCube.R.cols, iSubOne, 1, newR);
        splice(slicedCube.D.rows, iSubOne, 1, newD);
        splice(slicedCube.L.cols, negI, 1, newL);

        cube.state.U = flattenRows(slicedCube.U.rows);
        cube.state.R = flattenCols(slicedCube.R.cols);
        cube.state.D = flattenRows(slicedCube.D.rows);
        cube.state.L = flattenCols(slicedCube.L.cols);
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
    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.cols, iSubOne);
        const oldF = first(slicedCube.F.cols, iSubOne);
        const oldD = first(slicedCube.D.cols, iSubOne);
        const oldB = first(slicedCube.B.cols, negI);

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

        splice(slicedCube.U.cols, iSubOne, 1, newU);
        splice(slicedCube.F.cols, iSubOne, 1, newF);
        splice(slicedCube.D.cols, iSubOne, 1, newD);
        splice(slicedCube.B.cols, negI, 1, newB);

        cube.state.U = flattenCols(slicedCube.U.cols);
        cube.state.F = flattenCols(slicedCube.F.cols);
        cube.state.D = flattenCols(slicedCube.D.cols);
        cube.state.B = flattenCols(slicedCube.B.cols);
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
    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.U.cols, negI);
        const oldB = first(slicedCube.B.cols, iSubOne);
        const oldD = first(slicedCube.D.cols, negI);
        const oldF = first(slicedCube.F.cols, negI);
        
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

        splice(slicedCube.U.cols, negI, 1, newU);
        splice(slicedCube.B.cols, iSubOne, 1, newB);
        splice(slicedCube.D.cols, negI, 1, newD);
        splice(slicedCube.F.cols, negI, 1, newF);

        cube.state.U = flattenCols(slicedCube.U.cols);
        cube.state.B = flattenCols(slicedCube.B.cols);
        cube.state.D = flattenCols(slicedCube.D.cols);
        cube.state.F = flattenCols(slicedCube.F.cols);
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
    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldB = first(slicedCube.B.rows, iSubOne);
        const oldR = first(slicedCube.R.rows, iSubOne);
        const oldF = first(slicedCube.F.rows, iSubOne);
        const oldL = first(slicedCube.L.rows, iSubOne);

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

        splice(slicedCube.B.rows, iSubOne, 1, newB);
        splice(slicedCube.R.rows, iSubOne, 1, newR);
        splice(slicedCube.F.rows, iSubOne, 1, newF);
        splice(slicedCube.L.rows, iSubOne, 1, newL);

        cube.state.B = flattenRows(slicedCube.B.rows);
        cube.state.R = flattenRows(slicedCube.R.rows);
        cube.state.F = flattenRows(slicedCube.F.rows);
        cube.state.L = flattenRows(slicedCube.L.rows);
    });
}
