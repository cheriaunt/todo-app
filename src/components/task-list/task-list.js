import Task from "../task";
import "./task-list.css";

const TaskList = ({
  todos,
  onDeleted,
  onToggleCompleted,
  onToggleEditing,
  setUpdate,
}) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <Task
          id={id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEditing={onToggleEditing}
          setUpdate={setUpdate}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
