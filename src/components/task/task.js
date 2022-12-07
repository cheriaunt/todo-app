/* eslint-disable react-hooks/exhaustive-deps */
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';

import './task.css';

const Task = ({date, started, updateInterval, tickTimer, id, label, minutes, seconds, completed, editing, onDeleted, onToggleCompleted, onToggleEditing, getPlay, getPause}) => {
  
  const [dateTime, setDate] = useState(formatDistanceToNow(date, {includeSeconds: true,}));
  
  const timerRef = useRef();

  const  tick= ()=> {
    setDate(formatDistanceToNow(date, {
      addSuffix: true,
    }));
   
  };
  
  useEffect(()=> {
    timerRef.current = setInterval(() => tick(), updateInterval);
    return ()=>clearInterval(timerRef.current);
  });

  const [text, setText] = useState(label);

  const onKeyChange = (e) => {
    if (e.key === 'Enter') {
      if(text !== ''){
        onToggleEditing(id, text);
      } else {
        onToggleEditing(id, label); 
        setText(label);
      }
    }
  };

  const onLabelChange = (e) => {
    setText(e.target.value);
  }; 

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
          <Timer 
            id={id}
            tickTimer={tickTimer}
            seconds={seconds}
            minutes={minutes}
            isStarted={started}
            getPa={getPause}
            getPl={getPlay}/>
          <span className='description'>created {dateTime}</span>
        </label>
        <button
          type='button'
          aria-label='button edit'
          className='icon icon-edit'
          onClick={() => onToggleEditing(id, text)}
        />
        <button type='button' aria-label='button destroy' className='icon icon-destroy' onClick={onDeleted} />
      </div>
      <input className='edit' type='text' value={text} onChange={onLabelChange} onKeyDown={onKeyChange} />
    </div>
  );
  
};

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

export default Task;

const Timer = ({id,tickTimer, seconds, minutes, isStarted,getPa, getPl})=>{
  const s = seconds.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const [started, setStarted] = useState(isStarted);

  const intervalRef = useRef();
  const getPlay = (idx) => {
    setStarted(true);
    getPl(idx);

    return  ()=>clearInterval(intervalRef.current);
  };

  const getPause = (idx) => {
    setStarted(false);
    getPa(idx);
    return  ()=>clearInterval(intervalRef.current);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => (started && tickTimer()), 1000);
    
    return  ()=>clearInterval(intervalRef.current);
  }, [started]);
  return(
    <span className='description'>
      <button type='button' aria-label='button play' className="icon icon-play" onClick={()=>getPlay(id)} />
      <button type='button' aria-label='button pause' className="icon icon-pause" onClick={()=>getPause(id)}/>
      {m}:{s}
    </span>);
};