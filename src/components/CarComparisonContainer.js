import {Component} from "react";
import DropBox from "./DropBox";

class CarComparisonContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>{this.props.title}</h1>
                <DropBox/>
            </div>
        )
    }
}

export default CarComparisonContainer;