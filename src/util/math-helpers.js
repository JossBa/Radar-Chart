/**
 * Calculates the cosecant of a number x.
 * @param x A number (given in radians)
 * @returns {number} The cosecant of the given number
 */
function csc(x) {
    return 1 / Math.sin(x);
}

/**
 * Calculates the outer radius of a polygon.
 * @param edgeCount The number of edges of the polygon
 * @param edgeLength The length of the polygon's edges
 * @returns {number} The radius of the polygon
 */
export function getPolygonRadius(edgeCount, edgeLength) {
    return edgeLength / 2 * csc(Math.PI / edgeCount);
}

/**
 * Calculates the offset that needs to be applied to a point to receive a line with the given angle and length.
 * @param angle The angle of the line, zero representing a line pointing straight to the right
 * @param length The length of the line
 * @returns {{x: number, y: number}} The offset x and y factors
 */
export function getLineOffset(angle, length) {
    angle %= 360;

    const slope = Math.tan(angle * Math.PI / 180);
    const norm = Math.sqrt(1 + slope * slope);

    const xDirection = angle > 270 || angle <= 90 ? 1 : -1;
    const yDirection = angle > 270 || angle <= 90 ? 1 : -1;

    return {
        x: 1 / norm * length * xDirection,
        y: slope / norm * length * yDirection
    };
}

export function convertMPGToKm(value) {
    return round(value *  0.425144)
}

export function round(value) {
    return Math.round(value * 100)/ 100
}