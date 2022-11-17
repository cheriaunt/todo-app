import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';
import './footer.css';

function Footer({ toDo, filter, onFilterChange, onDeletedAll }) {
  return (
    <footer className='footer'>
      <span className='todo-count'>{toDo} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type='button' className='clear-completed' onClick={() => onDeletedAll()}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  toDo: 0,
  onDeletedAll: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number,
  onDeletedAll: PropTypes.func,
};

export default Footer;
