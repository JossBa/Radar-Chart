import React, {Component} from "react";
import CarCard from "./CarCard";

class CarCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { originFilter: []}
    }

    componentDidMount() {
        console.log("cars: " , this.props.cars)
        this.setState({ cars: this.props.cars } )
    }


    selectFilter = (e) => {
        const filterValue = e.target.value
        const selectedFilter = e.target.dataset.filter
        const filters = this.state[selectedFilter]

        if(e.target.classList.contains("selected") !== true) {
            filters.push(filterValue)
            e.target.classList.add("selected")
        }
        else {
            filters.splice(filters.indexOf(filterValue), 1)
            e.target.classList.remove("selected")
        }
        this.setState({ originFilter: filters})
    }

    getFilteredCars() {
        let filteredCars = this.props.cars
        if(this.state.originFilter.length > 0) {
            filteredCars = filteredCars.filter(car => this.state.originFilter.includes(car.origin))
        }
        console.log(filteredCars.length)
        return filteredCars
    }

    render() {
        return (
            <div className="carCardsContainer">
                <h4 className="CarModelsHeader">Car Models</h4>
                <div className="filters">
                    <h6>Filter by Origin: </h6>
                    <button data-filter={"originFilter"} value={"American"} onClick={this.selectFilter}>American</button>
                    <button data-filter={"originFilter"} value={"European"} onClick={this.selectFilter}>European</button>
                    <button data-filter={"originFilter"} value={"Japanese"} onClick={this.selectFilter}>Japanese</button>
                </div>
                <div className="carList">
                    {this.getFilteredCars().map((car, index) =>
                        <CarCard  key={ index } id={index} modelName={car.car} manufacturer={car.manufacturer}/>
                    )}
                </div>

            </div>
        )
    }
}

export default CarCardContainer;