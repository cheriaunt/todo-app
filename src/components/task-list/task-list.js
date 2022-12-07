import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

const TaskList = ({ todos,  onDeleted, onToggleCompleted, onToggleEditing, tickTimer, getPause, getPlay }) => {
  
  
  const elements = todos.map((item) => {
    const { id, label, date, started, ...itemProps } = item;
   
    return (
      <li key={id} className='list-group-item'>
        <Task
          id={id}
          label={label}
          date={date}
          started={started}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEditing={onToggleEditing}
          tickTimer={() => tickTimer(id)}
          getPlay={getPlay}
          getPause={getPause}
        />
      </li>
    );
  });
  return <ul className='todo-list'>{elements}</ul>;
};

export default TaskList;
TaskList.defaultProps = {
  todos: [
    {
      label: 'Перезагрузите приложение',
      completed: false,
      editing: false,
      id: '4',
    },
  ],
  onToggleCompleted: () => {},
  onDeleted: () => {},
};
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf),
  onToggleCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
};
