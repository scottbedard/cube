/**
 * Parse a turn string.
 * 
 * @param  {string} turn
 * @return {Object}
 */
export function parseTurn(turn) {
    const rawDepth = turn.match(/^[0-9]+/) || 1;

    const depth = Array.isArray(rawDepth) ? Number(rawDepth[0]) : rawDepth;
    const face = turn.match(/[A-Za-z]/)[0].toLowerCase();
    const double = turn.endsWith('2');
    const outer = depth === 1 || turn.match(/[a-z]/) !== null;
    const prime = turn.endsWith('-') || turn.endsWith(`'`);
    const whole = ['x', 'y', 'z'].includes(face);

    return { depth, face, double, outer, prime, whole };
}

/**
 * Print a turn object.
 * 
 * @param {object} turn
 * @param {number} size
 */
export function printTurn(turn, size = 3) {
    let suffix = '';

    if (turn.prime) {
        suffix = '-';
    } else if (turn.double) {
        suffix = '2';
    }

    if (turn.whole) {
        return `${turn.face}${suffix}`
    }

    let prefix = '';

    if (turn.depth > 1) {
        prefix = turn.depth;
    }

    let content = turn.face.toUpperCase();

    if (size > 3 && turn.outer) {
        content = content.toLowerCase();
    }

    return `${prefix}${content}${suffix}`
}
