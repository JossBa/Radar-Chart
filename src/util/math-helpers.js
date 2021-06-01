/**
 * Calculates an approximation of the outer radius of a polygon.
 * @param edgeCount The number of edges of the polygon
 * @param edgeLength The length of the polygon's edges
 * @returns {number} The radius of the polygon
 */
export function getPolygonRadius(edgeCount, edgeLength) {
    return (0.2997 * edgeCount + 0.2108) / 2 * edgeLength;
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