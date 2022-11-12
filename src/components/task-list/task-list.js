import Task from "../task";
import "./task-list.css";

const TaskList = ({ todos, onDeleted, onToggleCompleted, onToggleEditing }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEditing={() => onToggleEditing(id)}
        />
      </li>
    );
  });
  return <ul className="todo-list list-group">{elements}</ul>;
};

export default TaskList;
