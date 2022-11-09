import TaskFilter from "../task-filter";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter className="btn-group d-flex" />
      <button type="button" className="clear-completed btn btn-info">
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
