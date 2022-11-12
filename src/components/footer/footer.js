import TaskFilter from "../task-filter";
import "./footer.css";

const Footer = ({ toDo, filter, onFilterChange, onDeletedAll }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={() => onDeletedAll()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
