# cube

A basic javascript class for modeling Rubik's cubes.

> **Note:** This is a work in progress, and is not ready for use by anyone.

## Basic usage

```js
// create a new 3x3 cube
const cube = new Cube(3);

// perform a turn
cube.turn('F');

// test if the cube is solved
cube.isSolved();
```

## Notation

Turn notation has 3 basic parts.

**Depth**, this defines how many layers from the outer face to turn. By default, this value is `1`.

**Face**, this defines which face is being turned. This is the only required part of a turn, and may be `U`, `L`, `F`, `R`, `B`, `D`. If lower cased, the turn will include all layers from the depth to the face being turned.

**Direction**, this defines how to turn the face. A value of `-` will turn the face 90 degrees counter-clockwise, a value of `2` will turn the face 180 degrees, and if omitted the face will be turned 90 degrees clockwise.

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
```