import {Component} from "react";
import Chart from "../util/radar-chart";

export default class RadarChart extends Component {
    componentDidUpdate() {
        console.log("updated chart", this.props.data);
        const canvas = document.querySelector(".radar-chart > canvas");
        const ctx = canvas.getContext("2d");

        new Chart(ctx, this.props.data, this.props.config).draw();
    }

    render() {
        return (
            <div className="radar-chart">
                <h4>Comparison Chart</h4>
                <canvas width={this.props.width} height={this.props.height} />
            </div>
        );
    }
}
