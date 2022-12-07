import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';
import './footer.css';

const Footer = ({ toDo, filter, onFilterChange,onDeleteCompleted }) => (
  <footer className='footer'>
    <span className='todo-count'>{toDo} items left</span>
    <TaskFilter filter={filter} onFilterChange={onFilterChange} />
    <button type='button' className='clear-completed' onClick={() => onDeleteCompleted()}>
        Clear completed
    </button>
  </footer>
);
Footer.defaultProps = {
  toDo: 0,
  onDeleteCompleted: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number,
  onDeleteCompleted: PropTypes.func,
};

export default Footer;
