import { expect } from 'chai';

import {
    parseTurn,
    printTurn,
} from '../../src/notation';

//
// specs
//
describe('notation', function() {
    it('parseTurn', function() {
        expect(parseTurn('F')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        });

        expect(parseTurn('F-')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'f',
            outer: true,
            prime: true,
            whole: false,
        });

        expect(parseTurn(`F'`)).to.deep.equal({
            depth: 1,
            double: false,
            face: 'f',
            outer: true,
            prime: true,
            whole: false,
        });

        expect(parseTurn('F2')).to.deep.equal({
            depth: 1,
            double: true,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        });

        expect(parseTurn('2F')).to.deep.equal({
            depth: 2,
            double: false,
            face: 'f',
            outer: false,
            prime: false,
            whole: false,
        });

        expect(parseTurn('2f')).to.deep.equal({
            depth: 2,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        });

        expect(parseTurn('X')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'x',
            outer: true,
            prime: false,
            whole: true,
        });

        expect(parseTurn('y')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'y',
            outer: true,
            prime: false,
            whole: true,
        });

        expect(parseTurn('z')).to.deep.equal({
            depth: 1,
            double: false,
            face: 'z',
            outer: true,
            prime: false,
            whole: true,
        });
    });

    it('printTurn', function() {
        expect(printTurn({
            depth: 0,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        })).to.equal('F');

        expect(printTurn({
            depth: 0,
            double: true,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        })).to.equal('F2');

        expect(printTurn({
            depth: 0,
            double: false,
            face: 'f',
            outer: true,
            prime: true,
            whole: false,
        })).to.equal('F-');
        
        expect(printTurn({
            depth: 2,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        })).to.equal('2F');

        expect(printTurn({
            depth: 2,
            double: false,
            face: 'f',
            outer: true,
            prime: false,
            whole: false,
        }, 4)).to.equal('2f');

        expect(printTurn({
            depth: 0,
            double: false,
            face: 'X',
            outer: true,
            prime: false,
            whole: true,
        })).to.equal('X');

        expect(printTurn({
            depth: 1,
            double: false,
            face: 'F',
            outer: true,
            prime: false,
            whole: false,
        })).to.equal('F');
    });
});