import {merge} from "lodash";
import ChartCanvas from "./chart-canvas";
import {getLineOffset, getPolygonRadius} from "./math-helpers";

export default class RadarChart extends ChartCanvas {
    #axesCount;
    #data;

    #angleStep;
    #axesLength;
    #angleOffset;
    #scaleFactor;

    #config = {
        position: {
            x: undefined,
            y: undefined
        },
        ticks: undefined,
        stepSize: undefined,
        labelOffset: 10,
        axes: {
            minValue: 0,
            maxValue: undefined
        }
    };

    constructor(context, data, config) {
        super(context);
        this.#config = merge(this.#config, config);

        this.#axesCount = Math.max(...data.datasets.map(set => set.data.length));
        this.#data = data;

        // Calculate missing config values
        const maxSize = Math.min(context.canvas.width - 200, context.canvas.height - 100);
        if (!this.#config.position.x)
            this.#config.position.x = Math.floor(context.canvas.width / 2);
        if (!this.#config.position.y)
            this.#config.position.y = Math.floor(context.canvas.height / 2);
        if (!this.#config.stepSize)
            this.#config.stepSize = Math.floor(maxSize / 10);
        if (!this.#config.axes.maxValue)
            this.#config.axes.maxValue = Math.max(...data.datasets.map(set => Math.max(...set.data)));
        if (!this.#config.ticks)
            this.#config.ticks = 5;

        // Calculate and store values that are used often
        this.#angleStep = 360 / this.#axesCount;
        this.#axesLength = getPolygonRadius(this.#axesCount, this.#config.ticks * this.#config.stepSize);
        this.#angleOffset = 270 - this.#angleStep / 2;
        this.#scaleFactor = 1 / (this.#config.axes.maxValue - this.#config.axes.minValue) * this.#axesLength;
    }

    /**
     * Draws the chart onto the canvas.
     */
    draw() {
        this.#drawTicks(this.#config.ticks, this.#config.stepSize);
        this.#drawAxes();
        this.#drawLabels(this.#config.labelOffset);

        for (const dataset of this.#data.datasets) {
            this.#drawDataset(dataset);
        }
    }

    /**
     * Draws the tick rings of the chart.
     * @param steps The number of ticks to draw
     * @param stepSize The spacing in between the ticks
     */
    #drawTicks(steps, stepSize) {
        this.beginPath();
        for (let i = 0; i < steps; i++) {
            this.drawPolygon(this.#config.position.x, this.#config.position.y, stepSize * (i + 1), this.#axesCount);
        }
        this.closePath();
    }

    /**
     * Draws the chart axes.
     */
    #drawAxes() {
        this.beginPath()
        for (let i = 0; i < this.#axesCount; i++) {
            const {x, y} = getLineOffset(this.#angleOffset + this.#angleStep * i, this.#axesLength);
            this.drawLine(this.#config.position.x, this.#config.position.y, this.#config.position.x + x, this.#config.position.y + y);
        }
        this.closePath();
    }

    /**
     * Draws the axis labels of the chart.
     * @param offset The spacing in between the axes' end and the labels
     */
    #drawLabels(offset) {
        for (let i = 0; i < this.#axesCount; i++) {
            const {x, y} = getLineOffset(this.#angleOffset + this.#angleStep * i, this.#axesLength + offset);

            let align = "left";
            if (i === 0 || i > this.#axesCount / 2)
                align = "right";
            if (this.#axesCount % 2 === 1 && i === Math.ceil(this.#axesCount / 2))
                align = "center";

            this.drawLabel(this.#config.position.x + x, this.#config.position.y + y, this.#data.labels[i] ?? "", align);
        }
    }

    /**
     * Draws a dataset onto the chart.
     * @param dataset The dataset to draw
     */
    #drawDataset(dataset) {
        this.setStrokeStyle(dataset.color);

        const {x: startX, y: startY} = getLineOffset(this.#angleOffset, dataset.data[0] * this.#scaleFactor);

        const region = new Path2D();
        region.moveTo(this.#config.position.x + startX, this.#config.position.y + startY);

        for (let i = 1; i < this.#axesCount; i++) {
            const displayValue = (dataset.data[i] ?? 0) * this.#scaleFactor;
            const {x, y} = getLineOffset(this.#angleOffset + this.#angleStep * i, displayValue);

            region.lineTo(this.#config.position.x + x, this.#config.position.y + y);
        }

        region.lineTo(this.#config.position.x + startX, this.#config.position.y + startY);
        region.closePath();
        this.drawShape(region, dataset.color + "55", 2, dataset.color);
    }
}
