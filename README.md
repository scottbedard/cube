# cube

[![Build](https://img.shields.io/circleci/project/github/scottbedard/cube.svg)](https://circleci.com/gh/scottbedard/cube)
[![Coverage](https://img.shields.io/codecov/c/github/scottbedard/cube.svg)](https://codecov.io/gh/scottbedard/cube)
[![Dependencies](https://img.shields.io/david/scottbedard/cube.svg)](https://david-dm.org/scottbedard/cube)
[![NPM](https://img.shields.io/npm/v/bedard-cube.svg)](https://www.npmjs.com/package/bedard-cube)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/scottbedard/cube/blob/master/LICENSE)

This class models the state of Rubik's cubes. To get started, install the library through Yarn or NPM.

```bash
yarn add bedard-cube

# or

npm install bedard-cube
```

## API

To instantiate a cube, use the `Cube` constructor and define the `size` of the cube. The `size` parameter must be an integer greater than `1`.

```js
// create a new 3x3 cube
const cube = new Cube(3);
```

To perform one or more turns to the cube, use the `turn` method. To see what turns have already been made, check the `history` property.

```js
// accepts a whitespace or comma seperated list of turns
cube.turn('F R- L');
```

The cube can be scrambled via the `scramble` function. This function optionally accepts a number of turns to perform. If omitted, the scramble depth will be determined by the size of the cube. Additionally, a scramble may be generated using the `generateScramble` function. The only difference between these two functions is that `generateScramble` *does not* perform the turns.

```js
cube.scramble();
```

To test if the cube is solved, use the `isSolved` method. This function returns `true` or `false`.

```js
cube.isSolved();
```

The cube can be returned to it's original state via the `reset` method.

```js
cube.reset();
```

To itterate over all of the cube's stickers, use the `stickers` method.

```js
cube.stickers(function(sticker) {
    // ...
});
```

## State

To read the current state of the cube, access the `state` property. This property holds an object with properties for each face, each containing an array of sticker values. The face arrays start from the top left sticker and read sequentially to the bottom right. So for example, a newly instantiated 3x3 cube would have the following state.

```js
{
    u: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ],
    l: [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1,
    },
    f: [
        2, 2, 2,
        2, 2, 2,
        2, 2, 2,
    ],
    r: [
        3, 3, 3,
        3, 3, 3,
        3, 3, 3,
    ],
    b: [
        4, 4, 4,
        4, 4, 4,
        4, 4, 4,
    ],
    d: [
        5, 5, 5,
        5, 5, 5,
        5, 5, 5,
    ],
}
```

To picture how these values would map to an actual cube, imagine unfolding a cube while looking at the `F` face. Notice that the `B` face has the same orientation as the `L`, `F`, and `R` faces.

```
  U
L F R B
  D
```

To store additional data with the stickers, toggle the `useObjects` option. Setting this flag will store the sticker values as objects. These objects will contain a `value` key, and an `index` key containing the stickers original index.

```js
new Cube(size, { useObjects: true });
```

## Notation

Turn notation has 3 basic parts.

**Depth**, defines how many layers from the outer face to turn. By default, this value is `1`.

**Face / Axis**, defines which face or axis is being turned. For face turns, this value may be `U`, `L`, `F`, `R`, `B`, or `D`, and if lower cased the turn will include all layers from the depth to the face being turned. For axis turns, this value may be `X`, `Y`, or `Z`.

**Direction**, defines which direction to turn the face. A value of `-` will turn the face/axis 90 degrees counter-clockwise, and a value of `2` will turn the face/axis 180 degrees. If omitted, the face/axis will be turned 90 degrees clockwise. A single-quote may also be used to indicate a counter-clockwise turn.

```js
'F'   // turn the F face 90 degrees clockwise
'F-'  // turn the F face 90 degrees counter-clockwise
'F2'  // turn the F face 180 degrees

'2R'  // turn the second slice from the R face 90 degrees clockwise
'2R-' // turn the second slice from the R face 90 degrees counter-clockwise
'2R2' // turn the second slice from the R face 180 degrees

'2d'  // turn the first and second slices from the D face 90 degrees clockwise
'2d-' // turn the first and second slices from the D face 90 degrees counter-clockwise
'2d2' // turn the first and second slices from the D face 180 degrees

'X'   // turn the cube around the X axis 90 degrees clockwise
'X-'  // turn the cube around the X axis 90 degrees counter-clockwise
'X2'  // turn the cube around the X axis 180 degrees
```

### License

[MIT](https://github.com/scottbedard/cube/blob/master/LICENSE)

Copyright (c) 2018-present, Scott Bedard
