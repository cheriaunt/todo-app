import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);

    const { label, date } = props;

    this.state = {
      text: label,
      date: formatDistanceToNow(date, {
        includeSeconds: true,
      }),
    };
  }

  // state = {
  //   label: this.props.label,
  //   date: formatDistanceToNow(this.props.date, {
  //     includeSeconds: true,
  //   }),
  // };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.timerID = setInterval(() => this.tick(), updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onKeyChange = (e) => {
    const { id, onToggleEditing } = this.props;
    const { text } = this.state;
    if (e.key === 'Enter') {
      onToggleEditing(id, text);
    }
  };

  onLabelChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  tick() {
    const { date } = this.props;
    this.setState({
      date: formatDistanceToNow(date, {
        addSuffix: true,
      }),
    });
  }

  render() {
    const { id, label, completed, editing, onDeleted, onToggleCompleted, onToggleEditing } = this.props;
    const { text, date } = this.state;

    let classNames = 'v';
    if (completed) {
      classNames += ' completed';
    }
    if (editing) {
      classNames += ' editing';
    }

    return (
      <div className={classNames}>
        <div className='view'>
          <input className='toggle' type='checkbox' onChange={onToggleCompleted} checked={completed}/>
          <label>
            <span className='description'>{label} </span>
            <span className='created'>created {date}</span>
          </label>
          <button
            type='button'
            aria-label='button edit'
            className='icon icon-edit'
            onClick={() => onToggleEditing(id, text)}
          />
          <button type='button' aria-label='button destroy' className='icon icon-destroy' onClick={onDeleted} />
        </div>
        <input className='edit' type='text' value={text} onChange={this.onLabelChange} onKeyDown={this.onKeyChange} />
      </div>
    );
  }
}

Task.defaultProps = {
  label: 'Пример',
  completed: false,
  editing: false,
  id: '4',
  updateInterval: 1000,
  onToggleEditing: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  id: PropTypes.number,
  updateInterval: PropTypes.number,
  onToggleEditing: PropTypes.func,
};
