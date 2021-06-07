// Detail View of Car Model for Comparison
import {Component} from "react";
import vw from "../assets/vw.png";

class CarDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {carToDisplay} = this.props

        return(
            <div>
                <div className="carDetailHeader">
                    <img src={vw}/>
                    <h2>{ carToDisplay.model }</h2>
                </div>
                <ul className="carDetailList">
                    <li>Manufacturer: { carToDisplay.manufacturer }</li>
                    <li>Year: { carToDisplay.year } </li>
                    <li>MPG: { carToDisplay.mpg }</li>
                    <li>Cylinders: { carToDisplay.cylinders }</li>
                    <li>Displacement: { carToDisplay.displacement }</li>
                    <li>Horsepower: { carToDisplay.horsepower }</li>
                    <li>Weight: { carToDisplay.weight }</li>
                    <li>Acceleration: { carToDisplay.acceleration }</li>
                    <li>Origin: { carToDisplay.origin }</li>
                </ul>
            </div>
        )
    }
}

export default CarDetail;