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
 * @param  {Object} turnObj
 * @return {string}
 */
export function printTurn(turnObj) {
    let { depth, target, wide, rotation } = turnObj;

    // prefix
    let prefix = '';

    if (depth > 1 && !wide) {
        prefix = 2;
    } else if (depth > 2) {
        prefix = depth;
    }

    // modifier
    let modifier = wide ? 'w' : '';

    // suffix
    let suffix = '';
    
    if (rotation === -1) {
        suffix = '-';
    } else if (rotation === 2) {
        suffix = 2;
    }

    return `${prefix}${target}${modifier}${suffix}`;
}
