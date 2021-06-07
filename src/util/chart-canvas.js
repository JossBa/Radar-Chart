import {getLineOffset, getPolygonRadius} from "./math-helpers";

export default class ChartCanvas {
    #context = null;

    /**
     * Creates a new instance of the ChartCanvas class. The class wraps a 2d canvas rendering context and provides
     * additional helper methods for drawing shapes on the canvas.
     * @param context The 2d canvas rendering context to draw on
     */
    constructor(context) {
        this.#context = context;

        // Set font settings for drawing text
        this.#context.font = "18px sans-serif";
    }

    /**
     * Draws a polygon.
     * @param x The x-coordinate of the polygon's center point
     * @param y The y-coordinate of the polygon's center point
     * @param edgeLength The length of the polygon's edges
     * @param numberOfEdges The number of edges the polygon should have (6 = hexagon, 5 = pentagon, etc.)
     */
    drawPolygon(x, y, edgeLength, numberOfEdges) {
        const angleStep = 360 / numberOfEdges;

        // Get offset from center to first corner point
        const offset = getPolygonRadius(numberOfEdges, edgeLength);
        const {x: xOffset, y: yOffset} = getLineOffset(270 - angleStep / 2, offset);
        x += xOffset;
        y += yOffset;

        this.#context.moveTo(x, y);

        // Create edges
        for (let i = 0; i < numberOfEdges; i++) {
            const {x: xOffset, y: yOffset} = getLineOffset(angleStep * i, edgeLength);

            x += xOffset;
            y += yOffset;

            this.#context.lineTo(x, y);
        }

        // Draw the shape outline
        this.#context.stroke();
    }

    /**
     * Draws a line from the first point (x1, y1) to the second point (x2, y2)
     * @param x1 The x-coordinate of the first point
     * @param y1 The y-coordinate of the first point
     * @param x2 The x-coordinate of the second point
     * @param y2 The y-coordinate of the second point
     */
    drawLine(x1, y1, x2, y2) {
        this.#context.moveTo(x1, y1);
        this.#context.lineTo(x2, y2);
        this.#context.stroke();
    }

    /**
     * Draws text at the given position of the canvas.
     * @param x The x-coordinate of the text
     * @param y The y-coordinate of the text
     * @param text The text to draw
     * @param align The alignment of the text (may be left, center, right, start or end)
     */
    drawLabel(x, y, text, align) {
        this.#context.textAlign = align;
        this.#context.fillText(text, x, y);
    }

    /**
     * Sets the stroke style of the canvas.
     * @param color The color to use (may be any CSS color string, a CanvasGradient or a CanvasPattern)
     */
    setStrokeStyle(color) {
        this.#context.strokeStyle = color;
    }

    /**
     * Creates a new path on the canvas.
     */
    beginPath() {
        this.#context.beginPath();
    }

    /**
     * Closes the active path on the canvas.
     */
    closePath() {
        this.#context.closePath();
    }

    /**
     * Draws a shape based on the path provided.
     * @param path The path of the shape's outline
     * @param color The fill color of the shape
     * @param strokeWeight The stroke weight of the shape's outline. Leave undefined for no outline.
     * @param strokeColor The color of the shape's outline
     */
    drawShape(path, color, strokeWeight, strokeColor) {
        this.#context.fillStyle = color;
        this.#context.fill(path);

        if (!strokeWeight) return;

        this.#context.lineWidth = strokeWeight;
        this.#context.strokeStyle = strokeColor;
        this.#context.stroke(path);
    }
}
