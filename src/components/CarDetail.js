// Detail View of Car Model for Comparison
import {Component} from "react";
import vw from "../assets/vw.png";

class CarDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <p>Hallo ich bin ein Car Detail { this.props.carName }</p>
                <img src={vw}/>
            </div>
        )
    }
}

export default CarDetail;
