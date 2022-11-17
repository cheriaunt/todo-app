import { Component } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
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
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
