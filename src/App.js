import './App.css';
import React, {Component} from "react";
import CarDetail from "./components/CarDetail";
import RadarChart from "./components/RadarChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
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

    async componentDidMount() {
        const carsData = await fetch("cars.json")
        const cars = await carsData.json()
        this.setState({cars: cars})
    }

    render() {
        return (
            <div className="App">
                <RadarChart width={500} height={500} config={this.state.chartConfig} data={this.state.chartData} />
                <header className="App-header">
                    <p> Hellooooo { this.state.cars.map(c => c.car).join(",\n") || ""} </p>
                    <CarDetail carName="VW Käfer" />
                </header>
            </div>
        );
    }
}

export default App;
