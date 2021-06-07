import './App.css';
import React, {Component} from "react";
import CarCardContainer from "./components/CarCardContainer";
import CarComparisonContainer from "./components/CarComparisonContainer";

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
                <header className="App-header">
                    <div className="carBoxContainer">
                        <CarComparisonContainer title="Car Model A"/>
                        <CarComparisonContainer title="Car Model B"/>
                    </div>
                    <CarCardContainer/>
                </header>
            </div>
        );
    }
}

export default App;
