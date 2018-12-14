/**
 * Parse a turn string.
 * 
 * @param  {string} turn
 * @return {Object}
 */
export function parseTurn(turn) {
    const find = (exp, def) => {
        const result = turn.match(exp);
        return Array.isArray(result) ? (result[1] || def) : def;
    }

    // wide
    const wide = turn.includes('w');

    // depth
    let depth = parseInt(find(/^([0-9]+)/, 1), 10);

    if (wide) {
        depth = Math.max(2, depth);
    }

    // target
    const target = find(/([ULFRBDXYZ])/i, '').toUpperCase();

    // rotation
    let rotation = 1;

    if (turn.endsWith('-') || turn.endsWith('\'')) {
        rotation = -1;
    } else if (turn.endsWith('2')) {
        rotation = 2;
    }
    
    return {
        depth,
        target,
        wide,
        rotation,
    };
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
