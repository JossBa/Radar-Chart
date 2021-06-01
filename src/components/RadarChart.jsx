import {Component} from "react";
import Chart from "../util/radar-chart";

export default class RadarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                labels: ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5", "Value 6"],
                datasets: [
                    {
                        data: [3, 5, 2, 4, 6, 2],
                        color: "#aa0000"
                    },
                    {
                        data: [3, 5, 2, 4, 6, 3],
                        color: "#00aa00"
                    }
                ]
            }
        };
    }

    componentDidMount() {
        const canvas = document.querySelector(".radar-chart > canvas");
        const ctx = canvas.getContext("2d");

        new Chart(ctx, 400, 400, this.state.chartData).draw();
    }

    render() {
        return (
            <div className="radar-chart">
                <canvas width="1000" height="1000" />
            </div>
        );
    }
}
