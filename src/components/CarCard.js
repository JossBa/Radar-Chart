// Card View for Search
import {Component} from "react";

class CarCard extends Component {
    constructor(props) {
        super(props);
    }

    drag(e) {
        console.log("started Dragging")
        console.log(e.target)
        e.dataTransfer.setData("car-model", e.target.id)
        console.log("target id: " + e.target.id)
    }

    render() {
        return (
            <div
                id={this.props.number}
                style={{backgroundColor: this.props.color}}
                draggable={true}
                onDragStart={this.drag}
            >
                <p>Car Model: {this.props.number}</p>
            </div>
        )
    }
}

export default CarCard;