import {Component} from "react";
import DropBox from "./DropBox";

class CarComparisonContainer extends Component {

    render() {
        return(
            <div className="CarComparisonContainer">
                <h4>{this.props.title}</h4>
                <DropBox deleteHandler={this.props.handleDelete} updateCarHandler={this.props.updateCarHandler} cars={this.props.cars} />
            </div>
        )
    }
}

export default CarComparisonContainer;