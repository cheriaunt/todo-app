import { Component } from "react";
import "./task.css";

export default class Task extends Component {
  // state = {
  //   completed: false,
  // };
  // onLabelClick = () => {
  //   this.setState((state) => {
  //     return { completed: !state.completed };
  //   });
  // };
  render() {
    const {
      label,
      completed,
      editing,
      onDeleted,
      onToggleCompleted,
      onToggleEditing,
    } = this.props;
    // const { completed } = this.state;

    let classNames = "view";
    let status = "Active";
    if (completed) {
      classNames += " completed";
      status = "Completed";
    }
    if (editing) {
      classNames += " editing";
      status = "Editing";
    }
    return (
      <div className={classNames}>
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
        <label className="todo-list-item-label">
          {label}
          <span className="description"> {status} task </span>
          <span className="created">created 5 minutes ago</span>
        </label>
        <button class="icon icon-edit" onClick={onToggleEditing}></button>
        <button class="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
