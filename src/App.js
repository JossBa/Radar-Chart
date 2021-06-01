import './App.css';
import React, {Component} from "react";
import CarDetail from "./components/CarDetail";
import RadarChart from "./components/RadarChart";

class App extends Component {
    constructor() {
        super();
        this.state = {cars: []};
    }

    async componentDidMount() {
        const carsData = await fetch("cars.json")
        const cars = await carsData.json()
        this.setState({cars: cars})
    }

    render() {
        return (
            <div className="App">
                <RadarChart />
                <header className="App-header">
                    <p> Hellooooo { this.state.cars.map(c => c.car).join(",\n") || ""} </p>
                    <CarDetail carName="VW Käfer" />
                </header>
            </div>
        );
    }
}

export default App;
