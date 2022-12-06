import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

function TaskList({ todos, onDeleted, onToggleCompleted, onToggleEditing, getPlay, getPause, tickTimer }) {
  const elements = todos.map((item) => {
    const { id, label, started, ...itemProps } = item;

    return (
      <li key={id} className='list-group-item'>
        <Task
          id={id}
          label={label}
          started={started}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEditing={onToggleEditing}
          getPlay={() => getPlay(id)}
          getPause={() => getPause(id)}
          tickTimer={() => tickTimer(id)}
        />
      </li>
    );
  });
  return <ul className='todo-list'>{elements}</ul>;
}

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
