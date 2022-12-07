/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-autofocus */
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm= ({onAdded})=> {
  const [label, setLabel]=useState('');
  const [minutes, setMinutes]=useState('');
  const [seconds, setSeconds]=useState('');
  

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label !== '' && minutes !== '' && seconds !== '' && seconds <= 59){
      onAdded(label, minutes, seconds);
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  };
  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <button type={'submit'} alt='submit'/>
      <input
        className='new-todo'
        placeholder='Task'
        autoFocus
          
        onChange={onLabelChange}
        value={label}
      />
      <input 
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={onMinutesChange}
        min='0'
        max='60'
        value={minutes} />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        min='0'
        max='60'
        onChange={onSecondsChange}
        value={seconds} />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

export default NewTaskForm;