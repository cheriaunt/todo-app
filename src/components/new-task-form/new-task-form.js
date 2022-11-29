/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-autofocus */
import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdded } = this.props;
    const { label, minutes, seconds } = this.state;
    e.preventDefault();
    if (label !== '' && minutes !== '' && seconds !== '' && seconds <= 59){
      onAdded(label, minutes, seconds);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <button type={'submit'} alt='submit'/>
        <input
          className='new-todo'
          placeholder='Task'
          autoFocus
          
          onChange={this.onLabelChange}
          value={label}
        />
        <input 
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onMinutesChange}
          min='0'
          max='60'
          value={minutes} />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          min='0'
          max='60'
          onChange={this.onSecondsChange}
          value={seconds} />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};
