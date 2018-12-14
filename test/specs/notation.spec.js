import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';

chai.use(chaiSubset);

import {
    parseTurn,
    printTurn,
} from '../../src/notation';

//
// specs
//
describe('notation', function() {

    //
    // parseTurn
    //
    describe('parseTurn', function() {
        it('depth', function() {
            Object.entries({
                'F': 1,
                'F-': 1,
                'F2': 1,
                'Fw': 2,
                'Fw-': 2,
                'Fw2': 2,
                '3F': 3,
                '3F-': 3,
                '3F2': 3,
                '100F': 100,
                '100F-': 100,
                '100F2': 100,
                '100Fw': 100,
                '100Fw-': 100,
                '100Fw2': 100,
            }).forEach(([turn, depth]) => {
                expect(parseTurn(turn), turn).to.containSubset({ depth });
            });
        });

        it('target', function () {
            const target = 'F';

            [
                'F',
                'F-',
                'F2',
                '2F',
                '2F-',
                '2F2',
                'Fw',
                'Fw-',
                'Fw2',
                '3Fw',
                '3Fw-',
                '3Fw2',
            ].forEach(turn => {
                expect(parseTurn(turn), turn).to.containSubset({ target });
            });
        });

        it('wide', function () {
            Object.entries({
                'F': false,
                '2F': false,
                '2F-': false,
                '2F2': false,
                'Fw': true,
                'Fw-': true,
                'Fw2': true,
                '3Fw': true,
                '3Fw-': true,
                '3Fw2': true,
            }).forEach(([turn, wide]) => {
                expect(parseTurn(turn), turn).to.containSubset({ wide });
            });
        });

        it('rotation', function() {
            Object.entries({
                'F': 1,
                'F-': -1,
                'F2': 2,

            }).forEach(([turn, rotation]) => {
                expect(parseTurn(turn), turn).to.containSubset({ rotation });
            });
        });
    });

    //
    // printTurn
    //
    it('printTurn', function() {
        [
            'F',
            'F-',
            'F2',
            'Fw',
            'Fw-',
            'Fw2',
            '2F',
            '2F-',
            '2F2',
            '3Fw',
            '3Fw-',
            '3Fw2',
        ].forEach(turn => {
            const turnObj = parseTurn(turn);

            expect(turn, turn).to.equal(printTurn(turnObj));
        });
    });
});