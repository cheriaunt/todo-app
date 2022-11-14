import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import "./task.css";

export default class Task extends Component {
  state = {
    label: this.props.label,
    date: formatDistanceToNow(this.props.date, {
      addSuffix: true,
    }),
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onKeyChange = (e) => {
    if (e.key === "Enter") {
      this.props.onToggleEditing(this.props.id, this.state.label);
    }
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: formatDistanceToNow(this.props.date, {
        addSuffix: true,
      }),
    });
  }

  render() {
    const {
      id,
      label,
      completed,
      editing,
      date,
      onDeleted,
      onToggleCompleted,
      onToggleEditing,
    } = this.props;
    // let dateDistance = formatDistanceToNow(date, {
    //   addSuffix: true,
    // });
    // let classNames = "view";
    let classNames = "v";
    // let status = "Active";
    if (completed) {
      classNames += " completed";
      // status = "Completed";
    }
    if (editing) {
      classNames += " editing";
      // status = "Editing";
    }

    return (
      <div className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleCompleted}
          />
          <label>
            <span className="description">{label} </span>
            <span className="created">created {this.state.date}</span>
          </label>

          <button
            className="icon icon-edit"
            onClick={() => onToggleEditing(id, this.state.label)}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input
          className="edit"
          type="text"
          value={this.state.label}
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyChange}
        ></input>
      </div>
    );
  }
}
