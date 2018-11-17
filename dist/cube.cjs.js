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
    return arr.slice(start, start + size);
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
    return arr.map(function (v, index) {
      return {
        index: index,
        value: value
      };
    });
  }

  return arr;
}
/**
 * Get the opposite face.
 * 
 * @param  {string} face 
 * @return {string}
 */

function getOppositeFace(face) {
  return {
    u: 'd',
    l: 'r',
    f: 'b',
    r: 'l',
    b: 'f',
    d: 'u'
  }[face];
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
      outer = parsedTurn.outer;

  for (var i = depth, end = outer ? 0 : depth - 1; i > end; i--) {
    fn(i);
  }
}
/**
 * Parse a turn string.
 * 
 * @param  {string} turn
 * @return {Object}
 */

function parseTurn(turn) {
  var rawDepth = turn.match(/^[0-9]+/) || 1;
  var depth = Array.isArray(rawDepth) ? Number(rawDepth[0]) : rawDepth;
  var face = turn.match(/[A-Za-z]/)[0].toLowerCase();
  var double = turn.endsWith('2');
  var outer = depth === 1 || turn.match(/[a-z]/) !== null;
  var prime = turn.endsWith('-') || turn.endsWith("'");
  var whole = ['x', 'y', 'z'].includes(face);
  return {
    depth: depth,
    face: face,
    double: double,
    outer: outer,
    prime: prime,
    whole: whole
  };
}
/**
 * Print a turn object.
 * 
 * @param {object} turn
 * @param {number} size
 */

function printTurn(turn) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var suffix = '';

  if (turn.prime) {
    suffix = '-';
  } else if (turn.double) {
    suffix = '2';
  }

  if (turn.whole) {
    return "".concat(turn.face).concat(suffix);
  }

  var prefix = '';

  if (turn.depth) {
    prefix = turn.depth;
  }

  var content = turn.face.toUpperCase();

  if (size > 3 && turn.outer) {
    content = content.toLowerCase();
  }

  return "".concat(prefix).concat(content).concat(suffix);
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
  return arr.slice(0).reverse();
}
/**
 * Rotate a face array.
 * 
 * @param {Array}   arr 
 * @param {number}  degrees 
 */

function rotate(arr, degrees) {
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

function sliceCube(cube) {
  var _cube$state = cube.state,
      u = _cube$state.u,
      l = _cube$state.l,
      f = _cube$state.f,
      r = _cube$state.r,
      b = _cube$state.b,
      d = _cube$state.d;
  return {
    u: {
      rows: chunkRows(u),
      cols: chunkCols(u)
    },
    l: {
      rows: chunkRows(l),
      cols: chunkCols(l)
    },
    f: {
      rows: chunkRows(f),
      cols: chunkCols(f)
    },
    r: {
      rows: chunkRows(r),
      cols: chunkCols(r)
    },
    b: {
      rows: chunkRows(b),
      cols: chunkCols(b)
    },
    d: {
      rows: chunkRows(d),
      cols: chunkCols(d)
    }
  };
}
/**
 * Turn a cube along the X axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */

function turnCubeX(cube, parsedTurn) {
  var double = parsedTurn.double,
      prime = parsedTurn.prime;
  var newU, newL, newF, newR, newB, newD;

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
 * Turn a cube along the Y axis.
 * 
 * @param  {Cube}   cube 
 * @param  {object} parsedTurn
 * @return {void}
 */

function turnCubeY(cube, parsedTurn) {
  var double = parsedTurn.double,
      prime = parsedTurn.prime;
  var newU, newL, newF, newR, newB, newD;

  if (double) {
    // 180
    newU = rotate(cube.state.u, 180);
    newL = cube.state.r.slice();
    newF = cube.state.b.slice();
    newR = cube.state.l.slice();
    newB = cube.state.f.slice();
    newD = rotate(cube.state.d, 180);
  } else if (prime) {
    // 90 counter-clockwise
    newU = rotate(cube.state.u, -90);
    newL = cube.state.b.slice();
    newF = cube.state.l.slice();
    newR = cube.state.f.slice();
    newB = cube.state.r.slice();
    newD = rotate(cube.state.d, 90);
  } else {
    // 90 clockwise
    newU = rotate(cube.state.u, 90);
    newL = cube.state.f.slice();
    newF = cube.state.r.slice();
    newR = cube.state.b.slice();
    newB = cube.state.l.slice();
    newD = rotate(cube.state.d, -90);
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

function turnCubeZ(cube, parsedTurn) {
  var double = parsedTurn.double,
      prime = parsedTurn.prime;
  var newU, newL, newF, newR, newB, newD;

  if (double) {
    // 180
    newU = reverse(cube.state.d);
    newL = reverse(cube.state.r);
    newF = rotate(cube.state.f, 180);
    newR = reverse(cube.state.l);
    newB = rotate(cube.state.b, 180);
    newD = reverse(cube.state.u);
  } else if (prime) {
    // 90 counter-clockwise
    newU = rotate(cube.state.r, -90);
    newL = rotate(cube.state.u, -90);
    newF = rotate(cube.state.f, -90);
    newR = rotate(cube.state.d, -90);
    newB = rotate(cube.state.b, 90);
    newD = rotate(cube.state.l, -90);
  } else {
    // 90 clockwise
    newU = rotate(cube.state.l, 90);
    newL = rotate(cube.state.d, 90);
    newF = rotate(cube.state.f, 90);
    newR = rotate(cube.state.u, 90);
    newB = rotate(cube.state.b, -90);
    newD = rotate(cube.state.r, 90);
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

function turnSliceB(cube, slicedCube, parsedTurn) {
  var depth = parsedTurn.depth,
      double = parsedTurn.double,
      outer = parsedTurn.outer,
      prime = parsedTurn.prime;
  loopSlices(parsedTurn, function (i) {
    var oldU = slicedCube.u.rows.slice(i - 1).shift();
    var oldL = slicedCube.l.cols.slice(i - 1).shift();
    var oldD = slicedCube.d.rows.slice(-i).shift();
    var oldR = slicedCube.r.cols.slice(-i).shift();
    var newU, newL, newD, newR;

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

function turnSliceD(cube, slicedCube, parsedTurn) {
  var depth = parsedTurn.depth,
      double = parsedTurn.double,
      outer = parsedTurn.outer,
      prime = parsedTurn.prime;
  loopSlices(parsedTurn, function (i) {
    var oldF = slicedCube.f.rows.slice(-i).shift();
    var oldR = slicedCube.r.rows.slice(-i).shift();
    var oldB = slicedCube.b.rows.slice(-i).shift();
    var oldL = slicedCube.l.rows.slice(-i).shift();
    var newF, newR, newB, newL;

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

function turnSliceF(cube, slicedCube, parsedTurn) {
  var depth = parsedTurn.depth,
      double = parsedTurn.double,
      outer = parsedTurn.outer,
      prime = parsedTurn.prime;
  loopSlices(parsedTurn, function (i) {
    var oldU = slicedCube.u.rows.slice(-i).shift();
    var oldR = slicedCube.r.cols.slice(i - 1).shift();
    var oldD = slicedCube.d.rows.slice(i - 1).shift();
    var oldL = slicedCube.l.cols.slice(-i).shift();
    var newU, newR, newD, newL;

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

function turnSliceL(cube, slicedCube, parsedTurn) {
  var depth = parsedTurn.depth,
      double = parsedTurn.double,
      outer = parsedTurn.outer,
      prime = parsedTurn.prime;
  loopSlices(parsedTurn, function (i) {
    var oldU = slicedCube.u.cols.slice(i - 1).shift();
    var oldF = slicedCube.f.cols.slice(i - 1).shift();
    var oldD = slicedCube.d.cols.slice(i - 1).shift();
    var oldB = slicedCube.b.cols.slice(-i).shift();
    var newU, newF, newD, newB;

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

function turnSliceR(cube, slicedCube, parsedTurn) {
  var depth = parsedTurn.depth,
      double = parsedTurn.double,
      outer = parsedTurn.outer,
      prime = parsedTurn.prime;
  loopSlices(parsedTurn, function (i) {
    var oldU = slicedCube.u.cols.slice(-i).shift();
    var oldB = slicedCube.b.cols.slice(i - 1).shift();
    var oldD = slicedCube.d.cols.slice(-i).shift();
    var oldF = slicedCube.f.cols.slice(-i).shift();
    var newU, newB, newD, newF;

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

function turnSliceU(cube, slicedCube, parsedTurn) {
  var depth = parsedTurn.depth,
      double = parsedTurn.double,
      outer = parsedTurn.outer,
      prime = parsedTurn.prime;
  loopSlices(parsedTurn, function (i) {
    var oldB = slicedCube.b.rows.slice(i - 1).shift();
    var oldR = slicedCube.r.rows.slice(i - 1).shift();
    var oldF = slicedCube.f.rows.slice(i - 1).shift();
    var oldL = slicedCube.l.rows.slice(i - 1).shift();
    var newB, newR, newF, newL;

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
      } // in order to avoid poor scrambles, we need to prevent
      // turns from cancelling prior turns. for example, turning 
      // F then F- would not effect the cube and should be avoided.


      var scramble = []; // this holds the faces that are acceptable to turn with a
      // given face. anything intersecting the key is a valid option.

      var intersectingFaces = {
        u: ['l', 'f', 'r', 'b'],
        l: ['u', 'f', 'd', 'b'],
        f: ['l', 'u', 'r', 'd'],
        r: ['u', 'b', 'd', 'f'],
        b: ['u', 'l', 'd', 'r'],
        d: ['f', 'r', 'b', 'l']
      }; // generate an array of the faces we'll be turning

      for (var i = 0, face; i < length; i++) {
        // pick a random direction and amount to turn
        var double = Boolean(rand(0, 2)) === 2;
        var outer = this.size > 3 && Boolean(rand(0, 1));
        var prime = !double && Boolean(rand(0, 1)); // pick a random depth to turn

        var depth = this.size > 3 ? rand(0, Math.floor(this.size / 2)) : 0; // pick a random face

        face = i === 0 ? ['u', 'l', 'f', 'r', 'b', 'd'][rand(0, 5)] : intersectingFaces[face][rand(0, 3)];
        scramble.push({
          depth: depth,
          double: double,
          face: face,
          outer: outer,
          prime: prime
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
     * Get the last turn from history.
     * 
     * @return {object|undefined}
     */

  }, {
    key: "getLastTurn",
    value: function getLastTurn() {
      return this.history.slice(-1).pop();
    }
    /**
     * Test if the cube is solved.
     * 
     * @return {boolean}
     */

  }, {
    key: "isSolved",
    value: function isSolved() {
      var u = this.state.u[0];
      var l = this.state.l[0];
      var f = this.state.f[0];
      var r = this.state.r[0];
      var b = this.state.b[0];
      var d = this.state.d[0];

      if (this.options.useObjects) {
        for (var i = 1; i < this.size; i++) {
          if (this.state.u[i].value !== u.value || this.state.l[i].value !== l.value || this.state.f[i].value !== f.value || this.state.r[i].value !== r.value || this.state.b[i].value !== b.value || this.state.d[i].value !== d.value) {
            return false;
          }
        }
      } else {
        for (var _i = 1; _i < this.size; _i++) {
          if (this.state.u[_i] !== u || this.state.l[_i] !== l || this.state.f[_i] !== f || this.state.r[_i] !== r || this.state.b[_i] !== b || this.state.d[_i] !== d) {
            return false;
          }
        }
      }

      return true;
    }
    /**
     * Reset the cube to it's initial state.
     * 
     * @return {void}
     */

  }, {
    key: "reset",
    value: function reset() {
      // reset the current scramble and turn history
      this.currentScramble = [];
      this.history = []; // reset the cube using integer or object values

      var stickers = Math.pow(this.size, 2);
      var useObjects = !!this.options.useObjects;
      this.state = {
        u: generateStickers(stickers, 0, useObjects),
        l: generateStickers(stickers, 1, useObjects),
        f: generateStickers(stickers, 2, useObjects),
        r: generateStickers(stickers, 3, useObjects),
        b: generateStickers(stickers, 4, useObjects),
        d: generateStickers(stickers, 5, useObjects)
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
          u = _this$state.u,
          l = _this$state.l,
          f = _this$state.f,
          r = _this$state.r,
          b = _this$state.b,
          d = _this$state.d;
      [].concat(u, l, f, r, b, d).forEach(fn);
    }
    /**
     * Turn the cube
     * 
     * @param  {Object[]|string}    turns   one or more turns to perform
     * @param  {boolean}            history determines if history should be recorded
     * @return {void}
     */

  }, {
    key: "turn",
    value: function turn(turns) {
      var _this = this;

      var history = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var turnsArray = Array.isArray(turns) ? turns : turns.split(/[ ,]+/);
      turnsArray.forEach(function (turn) {
        var parsedTurn = typeof turn === 'string' ? parseTurn(turn) : turn;
        var depth = parsedTurn.depth,
            double = parsedTurn.double,
            face = parsedTurn.face,
            outer = parsedTurn.outer,
            prime = parsedTurn.prime,
            whole = parsedTurn.whole; // make a log of the turn

        var date = Date.now();
        var event = {
          date: date,
          parsedTurn: parsedTurn
        };

        if (history) {
          _this.history.push(event);
        } // whole-cube turns


        if (whole) {
          if (face === 'x') {
            turnCubeX(_this, parsedTurn);
          } else if (face === 'y') {
            turnCubeY(_this, parsedTurn);
          } else if (face === 'z') {
            turnCubeZ(_this, parsedTurn);
          }

          return event;
        } // turn the outer face if necessary


        if (outer) {
          var deg = 90;

          if (prime) {
            deg = -90;
          } else if (double) {
            deg = 180;
          }

          _this.state[face] = rotate(_this.state[face], deg);
        } // turn the inner face if necessary. notice the
        // turn direction is reversed because it's being
        // turned from the context of the opposite face


        if (depth >= _this.size) {
          var _deg = -90;

          if (prime) {
            _deg = 90;
          } else if (double) {
            _deg = 180;
          }

          var oppositeFace = getOppositeFace(face);
          _this.state[oppositeFace] = rotate(_this.state[oppositeFace], _deg);
        } // turn slices


        var slicedCube = sliceCube(_this);

        if (face === 'u') {
          turnSliceU(_this, slicedCube, parsedTurn);
        } else if (face === 'l') {
          turnSliceL(_this, slicedCube, parsedTurn);
        } else if (face === 'f') {
          turnSliceF(_this, slicedCube, parsedTurn);
        } else if (face === 'r') {
          turnSliceR(_this, slicedCube, parsedTurn);
        } else if (face === 'b') {
          turnSliceB(_this, slicedCube, parsedTurn);
        } else if (face === 'd') {
          turnSliceD(_this, slicedCube, parsedTurn);
        }

        return event;
      });
    }
  }]);

  return Cube;
}();

module.exports = Cube;
