import { expect } from 'chai';

//
// utils
//
import {
    chunkCols,
    chunkRows,
    flattenCols,
    flattenRows,
    flip,
    parseTurn,
    rotate,
} from '../../src/utils';

//
// specs
//
describe('utils', function() {
    it('chunkCols', function() {
        expect(chunkCols([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ])).to.deep.equal([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ]);
    });

    it('chunkRows', function() {
        expect(chunkRows([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ])).to.deep.equal([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });

    it('flattenCols', function() {
        expect(flattenCols([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ])).to.deep.equal([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ]);
    });

    it('flattenRows', function() {
        expect(flattenRows([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ])).to.deep.equal([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ]);
    });

    it('flip', function() {
        expect(flip([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ])).to.deep.equal([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ]);
    });

    it('parseTurn', function() {
        expect(parseTurn('F')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
        });

        expect(parseTurn('F-')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'f',
            outer: true,
            prime: true,
        });

        expect(parseTurn('F2')).to.deep.equal({
            depth: 1,
            double: true,
            face: 'f',
            outer: true,
            prime: false,
        });

        expect(parseTurn('2F')).to.deep.equal({
            depth: 2,
            double: false,
            face: 'f',
            outer: false,
            prime: false,
        });

        expect(parseTurn('2f')).to.deep.equal({
            depth: 2,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
        });
    });

    it('rotate', function() {
        expect(rotate([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ], 90)).to.deep.equal([
            7, 4, 1,
            8, 5, 2,
            9, 6, 3,
        ]);

        expect(rotate([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ], -90)).to.deep.equal([
            3, 6, 9,
            2, 5, 8,
            1, 4, 7,
        ]);

        expect(rotate([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ], 180)).to.deep.equal([
            9, 8, 7,
            6, 5, 4,
            3, 2, 1,
        ]);
    });
});