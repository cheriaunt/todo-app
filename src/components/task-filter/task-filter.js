import "./task-filter.css";

const TaskFilter = () => {
  return (
    <ul className="filters d-flex">
      <li className="filter">
        <button type="button" className="selected btn btn-info">
          All
        </button>
      </li>
      <li>
        <button type="button" className="btn btn-outline-secondary">
          Active
        </button>
      </li>
      <li>
        <button type="button" className="btn btn-outline-secondary">
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TaskFilter;
