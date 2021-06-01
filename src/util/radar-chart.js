import ChartCanvas from "./drawing";
import {getLineOffset, getPolygonRadius} from "./math-helpers";

export default class RadarChart extends ChartCanvas {
    #posX;
    #posY;
    #axesCount;
    #data;

    #config = {
        ticks: 4,
        stepSize: 80,
        labelOffset: 10
    };

    constructor(context, x, y, data, config) {
        super(context);

        this.#posX = x;
        this.#posY = y;
        this.#axesCount = data.datasets[0].data.length;
        this.#data = data;
        this.#config = {...this.#config, ...config};
    }

    draw() {
        this.#drawTicks(this.#axesCount, this.#config.ticks, this.#config.stepSize);
        this.#drawAxes(this.#axesCount, this.#config.ticks * this.#config.stepSize);
        this.#drawLabels(this.#axesCount, this.#config.ticks * this.#config.stepSize);
    }

    #drawTicks(axesCount, steps, stepSize) {
        for (let i = 0; i < steps; i++) {
            this.drawPolygon(this.#posX, this.#posY, stepSize * (i + 1), axesCount);
        }
    }

    #drawAxes(count, edgeLength) {
        const angleStep = 360 / count;
        const lineLength = getPolygonRadius(count, edgeLength);
        const angleOffset = 270 - angleStep / 2;

        for (let i = 0; i < count; i++) {
            const {x, y} = getLineOffset(angleOffset + angleStep * i, lineLength);
            this.drawLine(this.#posX, this.#posY, this.#posX + x, this.#posY + y);
        }
    }

    #drawLabels(axesCount, edgeLength) {
        const angleStep = 360 / axesCount;
        const axesLength = getPolygonRadius(axesCount, edgeLength);
        const angleOffset = 270 - angleStep / 2;

        for (let i = 0; i < axesCount; i++) {
            const {x, y} = getLineOffset(angleOffset + angleStep * i, axesLength + this.#config.labelOffset);

            let align = "left";
            if (i === 0 || i > axesCount / 2)
                align = "right";
            if (axesCount % 2 === 1 && i === Math.ceil(axesCount / 2))
                align = "center";

            this.drawLabel(this.#posX + x, this.#posY + y, this.#data.labels[i] ?? "", align);
        }
    }
}
