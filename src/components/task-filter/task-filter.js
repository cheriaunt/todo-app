import PropTypes from 'prop-types';
import './task-filter.css';

const TaskFilter = ({ filter, onFilterChange }) => {
  const buttonz = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = buttonz.map(({ name, label }) => {
    const isSelect = filter === name;
    const clazz = isSelect ? '' : 'selected';
    return (
      <li key={name}>
        <button
          type='button'
          className={clazz}
          onClick={() => {
            onFilterChange(name);
          }}
        >
          {label}
        </button>
      </li>
    );
  });
  return <ul className='filters'>{buttons}</ul>;
};
TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
export default TaskFilter;
