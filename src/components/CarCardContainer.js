import React, {Component} from "react";
import CarCard from "./CarCard";

class CarCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data
    }

    render() {
        return (
            <div className="carCardsContainer">
                <CarCard number="1" color="green"/>
                <CarCard number="2" color="blue"/>
            </div>
        )
    }
}

export default CarCardContainer;