import {Component} from "react";
import CarDetail from "./CarDetail";
import deleteIcon from "../assets/mull.png";

class DropBox extends Component {
    constructor(props) {
        super(props);
        this.state = {cars: [],
        carToDisplay: null,
        };
    }

    async componentDidMount() {
        //const carsData = await fetch("cars.json")
        // const cars = await carsData.json()
        const cars = [
            {
                id: "1",
                model: "VW Käfer",
                manufacturer: "VW",
                year: "1989",
                mpg: "23",
                cylinders: "6",
                displacement: "305",
                horsepower: "130",
                weight: "3609",
                acceleration: "12",
                origin: "Europe"
            },
            {
                id: "2",
                model: "Ford Anglia",
                manufacturer: "Ford",
                year: "1970",
                mpg: "15",
                cylinders: "6",
                displacement: "400",
                horsepower: "150",
                weight: "4064",
                acceleration: "11.5",
                origin: "America"

            },
        ]
        this.setState({cars: cars})
        console.log("did set state")
    }

    handleOnDrop = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = "white"
        const data = e.dataTransfer.getData("car-model");

        console.log("data: " + data)
        const carToDisplay = this.state.cars.find(car => car.id === data)

        this.setState({carToDisplay: carToDisplay})
        console.log("car to display: " + carToDisplay)

        console.log("data: " + data)
        //let nodeCopy = document.getElementById(data).cloneNode(true);
        //nodeCopy.id = "some-id"
        //e.target.appendChild(nodeCopy);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.target.style.border = "4px"
        e.target.style.borderColor = "green"

    }

    handleDragLeave(e) {
        e.preventDefault()
        e.target.style.backgroundColor = "white"
    }

    handleDelete = () => {
        console.log("delete called")
        this.setState({carToDisplay: null})
    }

    render() {
        return (
            <div
                id="000"
                className="carComparisonBox"
                onDrop={this.handleOnDrop}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
            >
                <button className="deleteButton" onClick={this.handleDelete}><img src={{deleteIcon}}/></button>
                { (this.state.carToDisplay !== null) &&
                    (< CarDetail carToDisplay={this.state.carToDisplay}/>)
                }
            </div>

        )
    }
}

export default DropBox;