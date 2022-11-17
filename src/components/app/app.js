import { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 100;

  constructor(props) {
    super(props);

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ],
      filter: 'all', // all,active,done
      updateInterval: 1000,
    };
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArrDone = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return { todoData: newArrDone };
    });
  };

  onToggleEditing = (id, label) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label, editing: !oldItem.editing };
      const newArrEdit = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return { todoData: newArrEdit };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onfilter(filter) {
    const {todoData}= this.state;
    switch (filter) {
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

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const NewArrAdd = [...todoData, newItem];
      return { todoData: NewArrAdd };
    });
  };

  deleteAll = () => {
    this.setState(({ todoData }) => ({ todoData: [] }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArrDel = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArrDel };
    });
  };

  createTodoItem(label) {
    return {
      label,
      completed: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
    };
  }

  render() {
    const { todoData, filter, updateInterval } = this.state;
    const visibleItems = this.onfilter(filter);
    const completedCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>

        <section className='main'>
          <TaskList
            updateInterval={updateInterval}
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
          />
        </section>
        <Footer toDo={todoCount} filter={filter} onFilterChange={this.onFilterChange} onDeletedAll={this.deleteAll} />
      </section>
    );
  }
}
