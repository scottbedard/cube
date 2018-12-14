// faces that intersect
export const intersectingFaces = {
    u: ['l', 'f', 'r', 'b'],
    l: ['u', 'f', 'd', 'b'],
    f: ['l', 'u', 'r', 'd'],
    r: ['u', 'b', 'd', 'f'],
    b: ['u', 'l', 'd', 'r'],
    d: ['f', 'r', 'b', 'l'],
};
