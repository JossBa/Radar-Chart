import {Component} from "react";
import Chart from "../util/radar-chart";

export default class RadarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartConfig: {
                axes: {
                    maxValue: 10
                }
            },
            chartData: {
                labels: ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5", "Value 6"],
                datasets: [
                    {
                        data: [6, 5, 8, 4, 3, 7],
                        color: "#ff0000"
                    },
                    {
                        data: [4, 7, 5, 6, 9, 6],
                        color: "#0000ff"
                    }
                ]
            }
        };
    }

    componentDidMount() {
        const canvas = document.querySelector(".radar-chart > canvas");
        const ctx = canvas.getContext("2d");

        new Chart(ctx, this.state.chartData, this.state.chartConfig).draw();
    }

    render() {
        return (
            <div className="radar-chart">
                <canvas width="1000" height="1000" />
            </div>
        );
    }
}
