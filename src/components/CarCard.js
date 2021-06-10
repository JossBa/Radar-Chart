// Card View for Search
import {Component} from "react";

class CarCard extends Component {

    drag = (e) => {
        e.dataTransfer.setData("car-model", this.props.id)
    }

    render() {
        return (
            <div
                className="carCard"
                draggable={true}
                onDragStart={this.drag}
            >
                <h5>{this.props.modelName}</h5>
                <img style={{ width: "80px", height: "80px" }} alt="manufacturer logo" src={`logos/${this.props.manufacturer}.png`}/>
                <p>{this.props.manufacturer}</p>
            </div>
        )
    }
}

export default CarCard;