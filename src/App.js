import './App.css';
import React, {Component} from "react";
import CarCardContainer from "./components/CarCardContainer";
import CarComparisonContainer from "./components/CarComparisonContainer";
import RadarChart from "./components/RadarChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            normalizedCars: [],
            selectedCarA: null,
            selectedCarB: null,
            carAData: null,
            carBData: null,
            labels: ["mpg", "cylinders", "displacement", "horsepower", "weight", "acceleration"],
            colorCarA: "#0000ff",
            colorCarB: "#ff0000",
            chartData: {}
        };
    }

    async componentDidMount() {
        const carsData = await fetch("cars.json");
        const cars = await carsData.json();
        let index = 0;
        for(const car of cars) {
            car.carId = index;
            index++;
        }
        this.setState({cars: cars});

        this.setState({normalizedCars: this.normalizeCarData(cars)});
    }

    // mpg, cylinders, displacement, horsepower, weight, acceleration
    normalizeCarData(data) {
        const minMaxValues = {mpg: {}, cylinders: {}, displacement: {}, horsepower: {}, weight: {}, acceleration: {}};

        const getMinMax = (property, car) => {
            if (car[property] === null)
                return;

            if (!minMaxValues[property].min || car[property] < minMaxValues[property].min)
                minMaxValues[property].min = car[property];
            if (!minMaxValues[property].max || car[property] > minMaxValues[property].max)
                minMaxValues[property].max = car[property];
        }

        for (const car of data) {
            for (const prop of this.state.labels) {
                getMinMax(prop, car);
            }
        }

        const cars = [];
        let index = 0;
        for (const car of data) {
            const normalizedCar = {
                carId: index,
                car: car.car,
                manufacturer: car.manufacturer,
                modelYear: car.modelYear,
                origin: car.origin
            };
            index++;
            for (const prop of this.state.labels) {
                if (car[prop] === null)
                    normalizedCar[prop] = 0;
                else
                    normalizedCar[prop] = (car[prop] - minMaxValues[prop].min) / (minMaxValues[prop].max - minMaxValues[prop].min);
            }

            cars.push(normalizedCar);
        }
        return cars;
    }

    updateSelectedCarA = (id) => {
        const data = [
            this.state.normalizedCars[id].mpg,
            this.state.normalizedCars[id].cylinders,
            this.state.normalizedCars[id].displacement,
            this.state.normalizedCars[id].horsepower,
            this.state.normalizedCars[id].weight,
            this.state.normalizedCars[id].acceleration
        ];
        this.setState({
            carAData: data
        }, () => {
            this.updateChartData();
        });
    }

    updateSelectedCarB = (id) => {
        const data = [
            this.state.normalizedCars[id].mpg,
            this.state.normalizedCars[id].cylinders,
            this.state.normalizedCars[id].displacement,
            this.state.normalizedCars[id].horsepower,
            this.state.normalizedCars[id].weight,
            this.state.normalizedCars[id].acceleration
        ];
        this.setState({
            carBData: data
        }, () => {
            this.updateChartData();
        });
    }

    updateChartData = () => {
        const datasets = [];

        if (this.state.carAData)
            datasets.push({
                data: this.state.carAData,
                color: this.state.colorCarA
            });

        if (this.state.carBData)
            datasets.push({
                data: this.state.carBData,
                color: this.state.colorCarB
            });

        this.setState({
            chartData: {
                labels: this.state.labels,
                datasets: datasets
            }
        });
    }

    handleDeleteCarA = () => {
        this.setState({carAData: null}, () => this.updateChartData())
    }

    handleDeleteCarB = () => {
        this.setState({carBData: null}, () => this.updateChartData())
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="visHeader">
                        <h3>Visual Computing - Übung 4</h3>
                        <p>Luis Hankel, Josephine Battiston</p>
                    </div>
                    <div className="carBoxContainer">
                        <CarComparisonContainer handleDelete={this.handleDeleteCarA} title="Car Model A" updateCarHandler={this.updateSelectedCarA}
                                                cars={this.state.cars}/>
                        <RadarChart width="500" height="500" data={this.state.chartData}/>
                        <CarComparisonContainer handleDelete={this.handleDeleteCarB} title="Car Model B" updateCarHandler={this.updateSelectedCarB}
                                                cars={this.state.cars}/>
                    </div>
                    <CarCardContainer cars={this.state.cars}/>
                    <div className="visHeader">
                        <p>Luis Hankel, Josephine Battiston</p>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
