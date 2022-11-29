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

  componentDidMount() {
    const { updateInterval } = this.props;
    const { started, seconds, tickTimer } = this.props;
    this.timerID = setInterval(() => this.tick(), updateInterval);
    if (started) {
      this.interval = setInterval(() => tickTimer(), 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  componentDidUpdate(prevProps) {
    const { started, tickTimer } = this.props;
    if (!started){
      clearInterval(this.interval);
    } 
    if (started !== prevProps.started ) {
      this.interval = setInterval(() => tickTimer(), 1000);
    }
    
    
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.interval);
  }

  onKeyChange = (e) => {
    const { id, label , onToggleEditing } = this.props;
    const { text } = this.state;
    if (e.key === 'Enter') {
      if(text !== ''){
        onToggleEditing(id, text);
      } else {
        onToggleEditing(id, label); 
        this.setState({
          text: label,
        });
      }
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
    const { id, label, minutes, seconds, completed, editing, onDeleted, onToggleCompleted, onToggleEditing, getPlay, getPause } = this.props;
    const { text, date } = this.state;
    const s = seconds.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');

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
            <span className="title">{label}</span>
            <span className='description'>
              <button type='button' aria-label='button play' className="icon icon-play" onClick={getPlay} />
              <button type='button' aria-label='button pause' className="icon icon-pause" onClick={getPause}/>
              {m}:{s}
            </span>
            <span className='description'>created {date}</span>
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
  label: 'Ошибка',
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
