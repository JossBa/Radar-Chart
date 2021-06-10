import {Component} from "react";
import CarDetail from "./CarDetail";
import deleteIcon from "../assets/mull.png";
import dragAndDrop from "../assets/dragDrop.png";

class DropBox extends Component {
    constructor(props) {
        super(props);
        this.state = {carToDisplay: null};
    }

    handleOnDrop = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = "#d8e1ff"
        const id = e.dataTransfer.getData("car-model");
        if(id === undefined || id === "") return
        this.setState({carToDisplay: this.props.cars[id]});
        this.props.updateCarHandler(id);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.target.style.backgroundColor = "lightgreen"
    }

    handleDragLeave(e) {
        e.preventDefault()
        e.target.style.backgroundColor = "transparent"
    }

    handleDelete = () => {
        if(this.state.carToDisplay === null) {
            window.alert("Nothing to delete.")
        }
        this.setState({carToDisplay: null})
        this.props.deleteHandler();
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
                <button className="deleteButton" onClick={this.handleDelete}><img src={deleteIcon} alt="delete icon"/></button>
                { (this.state.carToDisplay !== null) &&
                    (< CarDetail carToDisplay={this.state.carToDisplay}/>)
                }
                { (this.state.carToDisplay === null) &&
                (<div className="emptyDropBox">
                    <img className="dragAndDrop" src={dragAndDrop} alt="drag and drop icon" />
                    <p>Drag and Drop Car Models in here</p>
                </div>)
                }
            </div>

        )
    }
}

export default DropBox;