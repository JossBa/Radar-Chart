import {Component} from "react";
import Chart from "../util/radar-chart";

export default class RadarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config: props.config,
            data: props.data
        };
    }

    componentDidMount() {
        const canvas = document.querySelector(".radar-chart > canvas");
        const ctx = canvas.getContext("2d");

        new Chart(ctx, this.state.data, this.state.config).draw();
    }

    render() {
        return (
            <div className="radar-chart">
                <canvas width={this.props.width} height={this.props.height} />
            </div>
        );
    }
}
