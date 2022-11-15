import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import "./task.css";

export default class Task extends Component {
  static defaultProps = {
    label: "Пример",
    completed: false,
    editing: false,
    id: "4",
    updateInterval: 10000,
    onToggleEditing: () => {},
    onLabelChange: () => {},
    onKeyChange: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    id: PropTypes.number,
    updateInterval: PropTypes.number,
    onToggleEditing: PropTypes.func,
    onLabelChange: PropTypes.func,
    onKeyChange: PropTypes.func,
  };

  state = {
    label: this.props.label,
    date: formatDistanceToNow(this.props.date, {
      includeSeconds: true,
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
    const { updateInterval } = this.props;
    this.timerID = setInterval(() => this.tick(), updateInterval);
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
      onDeleted,
      onToggleCompleted,
      onToggleEditing,
    } = this.props;

    let classNames = "v";
    if (completed) {
      classNames += " completed";
    }
    if (editing) {
      classNames += " editing";
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
