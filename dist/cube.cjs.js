'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * Parse a turn string.
 * 
 * @param  {string} turn
 * @return {Object}
 */
function parseTurn(turn) {
  var find = function find(exp, def) {
    var result = turn.match(exp);
    return Array.isArray(result) ? result[1] || def : def;
  }; // wide


  var wide = turn.includes('w'); // depth

  var depth = parseInt(find(/^([0-9]+)/, 1), 10);

  if (wide) {
    depth = Math.max(2, depth);
  } // target


  var target = find(/([ULFRBDXYZ])/i, '').toUpperCase(); // rotation

  var rotation = 1;

  if (turn.endsWith('-') || turn.endsWith('\'')) {
    rotation = -1;
  } else if (turn.endsWith('2')) {
    rotation = 2;
  }

  return {
    depth: depth,
    target: target,
    wide: wide,
    rotation: rotation
  };
}
/**
 * Print a turn object.
 * 
 * @param  {Object} turnObj
 * @return {string}
 */

function printTurn(turnObj) {
  var depth = turnObj.depth,
      target = turnObj.target,
      wide = turnObj.wide,
      rotation = turnObj.rotation; // prefix

  var prefix = '';

  if (depth > 1 && !wide) {
    prefix = 2;
  } else if (depth > 2) {
    prefix = depth;
  } // modifier


  var modifier = wide ? 'w' : ''; // suffix

  var suffix = '';

  if (rotation === -1) {
    suffix = '-';
  } else if (rotation === 2) {
    suffix = 2;
  }

  return "".concat(prefix).concat(target).concat(modifier).concat(suffix);
}

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
function chunkCols(arr) {
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

function chunkRows(arr) {
  var size = Math.sqrt(arr.length);
  return new Array(size).fill().map(function (val, i) {
    var start = i * size;
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

function first(arr, begin) {
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

function flattenCols(cols) {
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

function flattenRows(arr) {
  return arr.reduce(function (acc, row) {
    return acc.concat(row);
  }, []);
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

function flip(arr) {
  return arr[0].map(function (val, i) {
    return arr.map(function (chunk) {
      return chunk[i];
    });
  });
}
/**
 * Generate an array of sticker values or objects.
 * 
 * @param  {number}         stickers        the number of stickers to generate
 * @param  {number|string}  value           the value (color) of the stickers
 * @param  {boolean}        useObjects      toggles sticker object types
 * @return {Array}
 */

function generateStickers(stickers, value, useObjects) {
  var arr = new Array(stickers).fill(value);

  if (useObjects) {
    return arr.map(function (v, originalIndex) {
      return {
        originalIndex: originalIndex,
        value: value
      };
    });
  }

  return arr;
}
/**
 * Get the opposite face.
 * 
 * @param  {string} TARGET 
 * @return {string}
 */

function getOppositeFace(target) {
  return {
    U: 'D',
    L: 'R',
    F: 'B',
    R: 'L',
    B: 'F',
    D: 'D'
  }[target];
}
/**
 * Test if a value an integer.
 * 
 * @param {any} val
 */

function isInt(val) {
  return Number(val) === val && val % 1 === 0;
}
/**
 * Itterate over the slices of a turn.
 * 
 * @param  {object}     parsedTurn 
 * @param  {Function}   fn 
 * @return {void}
 */

function loopSlices(parsedTurn, fn) {
  var depth = parsedTurn.depth,
      wide = parsedTurn.wide;

  for (var i = depth, end = wide ? 0 : depth - 1; i > end; i--) {
    fn(i, -i, i - 1);
  }
}
/**
 * Generate random integer.
 *
 * @param {number} min 
 * @param {number} max 
 */

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Returns a reversed array without mutating the source.
 * 
 * @param  {Array} arr 
 * @return {Array}
 */

function reverse(arr) {
  return slice(arr).reverse();
}
/**
 * Rotate a face array.
 * 
 * @param {Array}   arr 
 * @param {number}  degrees 
 */

function rotate(arr, degrees) {
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

function sliceCube(cube) {
  var _cube$state = cube.state,
      U = _cube$state.U,
      L = _cube$state.L,
      F = _cube$state.F,
      R = _cube$state.R,
      B = _cube$state.B,
      D = _cube$state.D;
  return {
    U: {
      r: chunkRows(U),
      c: chunkCols(U)
    },
    L: {
      r: chunkRows(L),
      c: chunkCols(L)
    },
    F: {
      r: chunkRows(F),
      c: chunkCols(F)
    },
    R: {
      r: chunkRows(R),
      c: chunkCols(R)
    },
    B: {
      r: chunkRows(B),
      c: chunkCols(B)
    },
    D: {
      r: chunkRows(D),
      c: chunkCols(D)
    }
  };
}
/**
 * Slice an array. This function exists to make
 * our output more compressable by minifiers.
 * 
 * @param  {Array}  arr
 * @return {Array}
 */

function slice(arr, begin, end) {
  return arr.slice(begin, end);
}
/**
 * Splice an array. This function exists to make
 * our output more compressable by minifiers.
 * 
 * @param  {Array}  arr
 * @return {Array}
 */

function splice(arr, start, deleteCount, item) {
  return arr.splice(start, deleteCount, item);
}
/**
 * Turn a cube along the X axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */

function turnCubeX(cube, parsedTurn) {
  var state = cube.state;
  var prime = parsedTurn.rotation === -1;
  var double = parsedTurn.rotation === 2;
  var newU, newL, newF, newR, newB, newD;

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

function turnCubeY(cube, parsedTurn) {
  var state = cube.state;
  var prime = parsedTurn.rotation === -1;
  var double = parsedTurn.rotation === 2;
  var newU, newL, newF, newR, newB, newD;

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

function turnCubeZ(cube, parsedTurn) {
  var state = cube.state;
  var prime = parsedTurn.rotation === -1;
  var double = parsedTurn.rotation === 2;
  var newU, newL, newF, newR, newB, newD;

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

function turnSliceB(cube, slicedCube, parsedTurn) {
  var state = cube.state;
  loopSlices(parsedTurn, function (i, negI, iSubOne) {
    var oldU = first(slicedCube.U.r, iSubOne);
    var oldL = first(slicedCube.L.c, iSubOne);
    var oldD = first(slicedCube.D.r, negI);
    var oldR = first(slicedCube.R.c, negI);
    var newU, newL, newD, newR;

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

function turnSliceD(cube, slicedCube, parsedTurn) {
  var state = cube.state;
  loopSlices(parsedTurn, function (i, negI) {
    var oldF = first(slicedCube.F.r, negI);
    var oldR = first(slicedCube.R.r, negI);
    var oldB = first(slicedCube.B.r, negI);
    var oldL = first(slicedCube.L.r, negI);
    var newF, newR, newB, newL;

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

function turnSliceF(cube, slicedCube, parsedTurn) {
  var state = cube.state;
  loopSlices(parsedTurn, function (i, negI, iSubOne) {
    var oldU = first(slicedCube.U.r, negI);
    var oldR = first(slicedCube.R.c, iSubOne);
    var oldD = first(slicedCube.D.r, iSubOne);
    var oldL = first(slicedCube.L.c, negI);
    var newU, newR, newD, newL;

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

function turnSliceL(cube, slicedCube, parsedTurn) {
  var state = cube.state;
  loopSlices(parsedTurn, function (i, negI, iSubOne) {
    var oldU = first(slicedCube.U.c, iSubOne);
    var oldF = first(slicedCube.F.c, iSubOne);
    var oldD = first(slicedCube.D.c, iSubOne);
    var oldB = first(slicedCube.B.c, negI);
    var newU, newF, newD, newB;

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

function turnSliceR(cube, slicedCube, parsedTurn) {
  var state = cube.state;
  loopSlices(parsedTurn, function (i, negI, iSubOne) {
    var oldU = first(slicedCube.U.c, negI);
    var oldB = first(slicedCube.B.c, iSubOne);
    var oldD = first(slicedCube.D.c, negI);
    var oldF = first(slicedCube.F.c, negI);
    var newU, newB, newD, newF;

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

function turnSliceU(cube, slicedCube, parsedTurn) {
  var state = cube.state;
  loopSlices(parsedTurn, function (i, negI, iSubOne) {
    var oldB = first(slicedCube.B.r, iSubOne);
    var oldR = first(slicedCube.R.r, iSubOne);
    var oldF = first(slicedCube.F.r, iSubOne);
    var oldL = first(slicedCube.L.r, iSubOne);
    var newB, newR, newF, newL;

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

var Cube =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * 
   * @param  {number} size
   */
  function Cube() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Cube);

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


  _createClass(Cube, [{
    key: "generateScramble",
    value: function generateScramble() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // set a default scramble length if none was provided
      if (length === 0) {
        length = Math.pow(this.size, 3);
      } // always turn intersecting faces so we can produce quality scrambles


      var intersectingFaces = {
        U: ['L', 'F', 'R', 'B'],
        L: ['U', 'F', 'D', 'B'],
        F: ['L', 'U', 'R', 'D'],
        R: ['U', 'B', 'D', 'F'],
        B: ['U', 'L', 'D', 'R'],
        D: ['F', 'R', 'B', 'L'] // in order to avoid poor scrambles, we need to prevent
        // turns from cancelling prior turns. for example, turning 
        // F then F- would not effect the cube and should be avoided.

      };
      var scramble = []; // generate an array of the faces we'll be turning

      for (var i = 0, target; i < length; i++) {
        var depth = this.size > 3 ? rand(0, Math.floor(this.size / 2)) : 1;
        var rotation = [-1, 1, 2][rand(0, 2)];
        var wide = this.size > 3 && !!rand(0, 1); // pick a random face

        target = i < 1 ? ['U', 'L', 'F', 'R', 'B', 'D'][rand(0, 5)] : intersectingFaces[target][rand(0, 3)];
        scramble.push({
          depth: depth,
          wide: wide,
          target: target,
          rotation: rotation
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

  }, {
    key: "generateScrambleString",
    value: function generateScrambleString() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.generateScramble(length).map(printTurn).join(' ');
    }
    /**
     * Test if the cube is solved.
     * 
     * @return {boolean}
     */

  }, {
    key: "isSolved",
    value: function isSolved() {
      var stickerLength = this.state.U.length;
      var U = this.state.U[0];
      var L = this.state.L[0];
      var F = this.state.F[0];
      var R = this.state.R[0];
      var B = this.state.B[0];
      var D = this.state.D[0];

      if (this.options.useObjects) {
        for (var i = 1; i < stickerLength; i++) {
          if (this.state.U[i].value !== U.value || this.state.L[i].value !== L.value || this.state.F[i].value !== F.value || this.state.R[i].value !== R.value || this.state.B[i].value !== B.value || this.state.D[i].value !== D.value) {
            return false;
          }
        }
      } else {
        for (var _i = 1; _i < stickerLength; _i++) {
          if (this.state.U[_i] !== U || this.state.L[_i] !== L || this.state.F[_i] !== F || this.state.R[_i] !== R || this.state.B[_i] !== B || this.state.D[_i] !== D) {
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

  }, {
    key: "parseTurn",
    value: function parseTurn$$1(turn) {
      return parseTurn(turn);
    }
    /**
     * Reset the cube to it's initial state.
     * 
     * @return {void}
     */

  }, {
    key: "reset",
    value: function reset() {
      // reset the cube using integer or object values
      var stickers = Math.pow(this.size, 2);
      var useObjects = !!this.options.useObjects;
      this.state = {
        U: generateStickers(stickers, 0, useObjects),
        L: generateStickers(stickers, 1, useObjects),
        F: generateStickers(stickers, 2, useObjects),
        R: generateStickers(stickers, 3, useObjects),
        B: generateStickers(stickers, 4, useObjects),
        D: generateStickers(stickers, 5, useObjects)
      };
    }
    /**
     * Scramble the cube
     * 
     * @param  {numbed} length
     * @return {void} 
     */

  }, {
    key: "scramble",
    value: function scramble() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.currentScramble = this.generateScramble(length);
      this.turn(this.currentScramble, false);
    }
    /**
     * Itterate over all stickers.
     * 
     * @param  {Function}   fn
     * @return {void}
     */

  }, {
    key: "stickers",
    value: function stickers(fn) {
      var _this$state = this.state,
          U = _this$state.U,
          L = _this$state.L,
          F = _this$state.F,
          R = _this$state.R,
          B = _this$state.B,
          D = _this$state.D;
      [].concat(U, L, F, R, B, D).forEach(fn);
    }
    /**
     * Turn the cube
     * 
     * @param  {Object[]|string}    turns   one or more turns to perform
     * @return {void}
     */

  }, {
    key: "turn",
    value: function turn(turns) {
      var _this = this;

      var turnsArray = Array.isArray(turns) ? turns : turns.split(/[ ,]+/);
      turnsArray.forEach(function (turn) {
        var parsedTurn = typeof turn === 'string' ? parseTurn(turn) : turn;
        var depth = parsedTurn.depth,
            target = parsedTurn.target,
            wide = parsedTurn.wide,
            rotation = parsedTurn.rotation; // make a log of the turn

        var event = {
          date: Date.now(),
          parsedTurn: parsedTurn
        }; // cube rotations

        if (target === 'X') {
          turnCubeX(_this, parsedTurn);
        } else if (target === 'Y') {
          turnCubeY(_this, parsedTurn);
        } else if (target === 'Z') {
          turnCubeZ(_this, parsedTurn);
        } // face / slice turns
        else {
            // turn the outer face if necessary
            if (depth === 1 || wide) {
              _this.state[target] = rotate(_this.state[target], rotation);
            } // turn the inner face if necessary


            if (depth >= _this.size) {
              var innerRotation = 2; // if this isn't a double turn, reverse the direction because
              // it's being turned from the context of the opposite face

              if (rotation === 1 || rotation === -1) {
                innerRotation = rotation * -1;
              }

              var oppositeFace = getOppositeFace(target);
              _this.state[oppositeFace] = rotate(_this.state[oppositeFace], innerRotation);
            } // turn slices


            var slicedCube = sliceCube(_this);

            if (target === 'U') {
              turnSliceU(_this, slicedCube, parsedTurn);
            } else if (target === 'L') {
              turnSliceL(_this, slicedCube, parsedTurn);
            } else if (target === 'F') {
              turnSliceF(_this, slicedCube, parsedTurn);
            } else if (target === 'R') {
              turnSliceR(_this, slicedCube, parsedTurn);
            } else if (target === 'B') {
              turnSliceB(_this, slicedCube, parsedTurn);
            } else if (target === 'D') {
              turnSliceD(_this, slicedCube, parsedTurn);
            }
          }

        return event;
      });
    }
  }]);

  return Cube;
}();

module.exports = Cube;
