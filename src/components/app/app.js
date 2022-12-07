/* eslint-disable no-param-reassign */
import { useState, useRef } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';


const App =()=>  {
  const useMaxId = useRef(100);
  const updateInterval = 1000;
  const createTodoItem=(label, min, sec)=>({
    label,
    completed: false,
    editing: false,
    id: useMaxId.current++,
    date: new Date(),
    minutes: min,
    seconds: sec,
    started:true,
  });
  const [todoData, setTodoData] = useState([createTodoItem('Drink Coffee', 15 , 15),
    createTodoItem('Make Awesome App', 10 , 10),
    createTodoItem('Have a lunch', 5 , 5)

  ] );
  const [filter, setFilter] = useState('all'); // all,active,done
  

  const onToggleCompleted = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, completed: !oldItem.completed };
    setTodoData ([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const onToggleEditing = (id, label) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label, editing: !oldItem.editing, started: false, };
    setTodoData( [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const onFilterChange = (filterTodo) => {
    setFilter(filterTodo);
  };

  const onfilter = (filterTodo) => {
    switch (filterTodo) {
    case 'all':
      return todoData;
    case 'active':
      return todoData.filter((item) => !item.completed);
    case 'completed':
      return todoData.filter((item) => item.completed);
    default:
      return todoData;
    }
  };

  const addItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(text, minutes, seconds);
    setTodoData([...todoData, newItem]);
  };

  const deleteCompleted = () => {
    setTodoData( [...todoData.filter((item) => !item.completed)]
    );
  };

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData([...todoData.slice(0, idx), ...todoData.slice(idx + 1)]);
  };
  const tickTimer = (id) => {
    setTodoData((todos)=>
      todos.map((el) => {
        if (el.id === id ) {
          el.isStarted = true;
          if (el.seconds > 0) {
            el.seconds -= 1;
          } else if (el.minutes > 0) {
            el.minutes -= 1;
            el.seconds += 59;
          } else if (Number(el.minutes) === 0 && Number(el.seconds) === 0) {
            el.isStarted = false;
          }
        };
        return el;
      })
    );
  };

  const getPlay = (id) => {
    setTodoData(
      todoData.map((el) => {
        if (el.id === id) {
          el.started = true;
        }
        return el;
      })
    );
  };

  const getPause = (id) => {
    setTodoData(
      todoData.map((el) => {
        if (el.id === id) {
          el.started = false;
        }
        return el;
      })
    );
  };

  const visibleItems = onfilter(filter);
  const completedCount = todoData.filter((el) => el.completed).length;
  const todoCount = todoData.length - completedCount;
  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm onAdded={addItem} />
      </header>

      <section className='main'>
        <TaskList
          updateInterval={updateInterval}
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
          tickTimer={tickTimer}
          getPlay={getPlay}
          getPause={getPause}
        />
        <Footer
          toDo={todoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          onDeleteCompleted={deleteCompleted}
        />
      </section>
    </section>
  );
  
};

export default App;
