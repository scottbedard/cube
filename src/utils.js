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
 * @param  {string} face 
 * @return {string}
 */
export function getOppositeFace(face) {
    return {
        u: 'd',
        l: 'r',
        f: 'b',
        r: 'l',
        b: 'f',
        d: 'u',
    }[face];
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
        newU = slice(cube.state.d);
        newL = rotate(cube.state.l, 2);
        newF = reverse(cube.state.b);
        newR = rotate(cube.state.r, 2);
        newB = reverse(cube.state.f);
        newD = slice(cube.state.u);
    } else if (prime) {
        // 90 counter-clockwise
        newU = reverse(cube.state.b);
        newL = rotate(cube.state.l, 1);
        newF = slice(cube.state.u);
        newR = rotate(cube.state.r, -1);
        newB = reverse(cube.state.d);
        newD = slice(cube.state.f);
    } else {
        // 90 clockwise
        newU = slice(cube.state.f);
        newL = rotate(cube.state.l, -1);
        newF = slice(cube.state.d);
        newR = rotate(cube.state.r, 1);
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
        newU = rotate(cube.state.u, 2);
        newL = slice(cube.state.r);
        newF = slice(cube.state.b);
        newR = slice(cube.state.l);
        newB = slice(cube.state.f);
        newD = rotate(cube.state.d, 2);
    } else if (prime) {
        // 90 counter-clockwise
        newU = rotate(cube.state.u, -1);
        newL = slice(cube.state.b);
        newF = slice(cube.state.l);
        newR = slice(cube.state.f);
        newB = slice(cube.state.r);
        newD = rotate(cube.state.d, 1);
    } else {
        // 90 clockwise
        newU = rotate(cube.state.u, 1);
        newL = slice(cube.state.f);
        newF = slice(cube.state.r);
        newR = slice(cube.state.b);
        newB = slice(cube.state.l);
        newD = rotate(cube.state.d, -1);
    }

    cube.state.u = newU;
    cube.state.l = newL;
    cube.state.f = newF;
    cube.state.r = newR;
    cube.state.b = newB;
    cube.state.d = newD;
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
        newU = reverse(cube.state.d);
        newL = reverse(cube.state.r);
        newF = rotate(cube.state.f, 2);
        newR = reverse(cube.state.l);
        newB = rotate(cube.state.b, 2);
        newD = reverse(cube.state.u);
    } else if (prime) {
        // 90 counter-clockwise
        newU = rotate(cube.state.r, -1);
        newL = rotate(cube.state.u, -1);
        newF = rotate(cube.state.f, -1);
        newR = rotate(cube.state.d, -1);
        newB = rotate(cube.state.b, 1);
        newD = rotate(cube.state.l, -1);
    } else {
        // 90 clockwise
        newU = rotate(cube.state.l, 1);
        newL = rotate(cube.state.d, 1);
        newF = rotate(cube.state.f, 1);
        newR = rotate(cube.state.u, 1);
        newB = rotate(cube.state.b, -1);
        newD = rotate(cube.state.r, 1);
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

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.u.rows, iSubOne);
        const oldL = first(slicedCube.l.cols, iSubOne);
        const oldD = first(slicedCube.d.rows, negI);
        const oldR = first(slicedCube.r.cols, negI);
        
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

        splice(slicedCube.u.rows, i - 1, 1, newU);
        splice(slicedCube.l.cols, i - 1, 1, newL);
        splice(slicedCube.d.rows, negI, 1, newD);
        splice(slicedCube.r.cols, negI, 1, newR);

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

    loopSlices(parsedTurn, (i, negI) => {
        const oldF = first(slicedCube.f.rows, negI);
        const oldR = first(slicedCube.r.rows, negI);
        const oldB = first(slicedCube.b.rows, negI);
        const oldL = first(slicedCube.l.rows, negI);
        
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

        splice(slicedCube.f.rows, negI, 1, newF);
        splice(slicedCube.r.rows, negI, 1, newR);
        splice(slicedCube.b.rows, negI, 1, newB);
        splice(slicedCube.l.rows, negI, 1, newL);

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

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.u.rows, negI);
        const oldR = first(slicedCube.r.cols, iSubOne);
        const oldD = first(slicedCube.d.rows, iSubOne);
        const oldL = first(slicedCube.l.cols, negI);

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

        splice(slicedCube.u.rows, negI, 1, newU);
        splice(slicedCube.r.cols, iSubOne, 1, newR);
        splice(slicedCube.d.rows, iSubOne, 1, newD);
        splice(slicedCube.l.cols, negI, 1, newL);

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

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.u.cols, iSubOne);
        const oldF = first(slicedCube.f.cols, iSubOne);
        const oldD = first(slicedCube.d.cols, iSubOne);
        const oldB = first(slicedCube.b.cols, negI);

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

        splice(slicedCube.u.cols, iSubOne, 1, newU);
        splice(slicedCube.f.cols, iSubOne, 1, newF);
        splice(slicedCube.d.cols, iSubOne, 1, newD);
        splice(slicedCube.b.cols, negI, 1, newB);

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

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldU = first(slicedCube.u.cols, negI);
        const oldB = first(slicedCube.b.cols, iSubOne);
        const oldD = first(slicedCube.d.cols, negI);
        const oldF = first(slicedCube.f.cols, negI);
        
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

        splice(slicedCube.u.cols, negI, 1, newU);
        splice(slicedCube.b.cols, iSubOne, 1, newB);
        splice(slicedCube.d.cols, negI, 1, newD);
        splice(slicedCube.f.cols, negI, 1, newF);

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

    loopSlices(parsedTurn, (i, negI, iSubOne) => {
        const oldB = first(slicedCube.b.rows, iSubOne);
        const oldR = first(slicedCube.r.rows, iSubOne);
        const oldF = first(slicedCube.f.rows, iSubOne);
        const oldL = first(slicedCube.l.rows, iSubOne);

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

        splice(slicedCube.b.rows, iSubOne, 1, newB);
        splice(slicedCube.r.rows, iSubOne, 1, newR);
        splice(slicedCube.f.rows, iSubOne, 1, newF);
        splice(slicedCube.l.rows, iSubOne, 1, newL);

        cube.state.b = flattenRows(slicedCube.b.rows);
        cube.state.r = flattenRows(slicedCube.r.rows);
        cube.state.f = flattenRows(slicedCube.f.rows);
        cube.state.l = flattenRows(slicedCube.l.rows);
    });
}