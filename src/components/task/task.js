import { Component } from "react";
import "./task.css";

export default class Task extends Component {
  render() {
    const { label, onDeleted } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">Active task </span>
          <span className="created">created 5 minutes ago</span>
        </label>
        <span className="todo-list-item-label">{label}</span>
        <button
          type="button"
          className="icon icon-edit btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-pencil" />
        </button>

        <button
          type="button"
          className="icon icon-destroy btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}
