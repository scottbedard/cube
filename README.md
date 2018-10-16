# cube

[![Build](https://img.shields.io/circleci/project/github/scottbedard/cube.svg)](https://circleci.com/gh/scottbedard/cube)
[![Coverage](https://img.shields.io/codecov/c/github/scottbedard/cube.svg)](https://codecov.io/gh/scottbedard/cube)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/scottbedard/cube/blob/master/LICENSE)

A basic javascript class for modeling Rubik's cubes.

## Turn Notation

Turn notation has 3 basic parts.

**Depth**, defines how many layers from the outer face to turn. By default, this value is `1`.

**Face / Axis**, defines which face or axis is being turned. For face turns, this value may be `U`, `L`, `F`, `R`, `B`, or `D`, and if lower cased the turn will include all layers from the depth to the face being turned. For axis turns, this value may be `X`, `Y`, or `Z`.

**Direction**, defines which direction to turn the face. A value of `-` will turn the face/axis 90 degrees counter-clockwise, and a value of `2` will turn the face/axis 180 degrees. If omitted, the face/axis will be turned 90 degrees clockwise.

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

## API

To instantiate a cube, use the `Cube` constructor and define the `size` of the cube. The `size` parameter must be an integer greater than `1`.

```js
// create a new 3x3 cube
const cube = new Cube(3);
```

To perform a single turn, call the `turn` method. This returns a `turn` object.

```js
cube.turn('F');
```

To perform a series of turns, use the `applyTurns` method. This method accepts a comma-seperated or whitespace-seperated string of turns, or an array of strings. The turns that have been made can be accessed via the `history` property.

```js
cube.applyTurns('F R- U2');
```

To test if the cube is solved, use the `isSolved` method. This function returns `true` or `false`.

```js
cube.isSolved();
```

The cube can be returned to it's original state via the `reset` method.

```js
cube.reset();
```
