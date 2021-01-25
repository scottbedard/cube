# cube

This repository is no longer maintained, see https://github.com/scottbedard/twister

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

To perform one or more turns to the cube, use the `turn` method. To manually convert a turn string to an object, use the `parseTurn` method.

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
    U: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ],
    L: [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1,
    },
    F: [
        2, 2, 2,
        2, 2, 2,
        2, 2, 2,
    ],
    R: [
        3, 3, 3,
        3, 3, 3,
        3, 3, 3,
    ],
    B: [
        4, 4, 4,
        4, 4, 4,
        4, 4, 4,
    ],
    D: [
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

To store additional data with the stickers, toggle the `useObjects` option. Setting this flag will store the sticker values as `{ originalIndex, value }` objects. Note that the `originalIndex` key does not change as the cube is turned.

```js
new Cube(size, { useObjects: true });
```

## Notation

The notation system used by this library is a superset of [WCA notation](https://www.worldcubeassociation.org/regulations/#12a). Any algorithm produced by a WCA scrambler should be compatible with this library. There are however a couple of extensions we've made to the WCA syntax. The first of which being optional use of a `-` to indicate counter-clockwise turns. The second is the ability to annotate "slice turns" with a single move. To do this, simply omit the `wide` segment of a turn. For example, a `3F` in our notation system would be equal to `3Fw 2Fw-` in WCA notation.

### License

[MIT](https://github.com/scottbedard/cube/blob/master/LICENSE)

Copyright (c) 2018-present, Scott Bedard
