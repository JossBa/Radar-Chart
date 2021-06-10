// Detail View of Car Model for Comparison
import {Component} from "react";

import {convertMPGToKm, round} from "../util/math-helpers";

class CarDetail extends Component {
    capitalize = (e) => {
        return e.substring(0,1).toUpperCase() + e.substring(1)
    }
    render() {
        const {carToDisplay} = this.props

        return(
            <div>
                <div className="carDetailHeader">
                    <img alt="manufacturer logo" src={`logos/${carToDisplay.manufacturer}.png`}/>
                    <h4 style={{ textTransform: "capitalize", paddingLeft: "10px" }}>{ carToDisplay.car }</h4>
                </div>
                <ul className="carDetailList">
                    <li><b>Hersteller:</b> { this.capitalize(carToDisplay.manufacturer) }</li>
                    <li><b>Herkunft:</b> { carToDisplay.origin }</li>
                    <li><b>Jahr:</b> 19{ carToDisplay.modelYear } </li>
                    <li><b>Verbrauch:</b> { convertMPGToKm(carToDisplay.mpg)} km/l</li>
                    <li><b>Zylinder:</b> { carToDisplay.cylinders }</li>
                    <li><b>Hubraum:</b> { round(carToDisplay.displacement * 16.387)} ccm</li>
                    <li><b>Pferdestärke:</b> { carToDisplay.horsepower } hp</li>
                    <li><b>Gewicht:</b> { round(carToDisplay.weight * 0.4536)} kg</li>
                    <li><b>Beschleunigung:</b> { carToDisplay.acceleration } seconds</li>
                </ul>
            </div>
        )
    }
}

export default CarDetail;