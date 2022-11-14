import { Component } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    filter: "all", // all,active,done
  };
  createTodoItem(label) {
    return { label, completed: false, editing: false, id: this.maxId++ };
  }

  deleteItem = (id) => {
    this.setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id);
      const newArrDel = [
        ...state.todoData.slice(0, idx),
        ...state.todoData.slice(idx + 1),
      ];
      return (state.todoData = newArrDel);
    });
  };
  deleteAll = () => {
    this.setState(({ todoData }) => {
      return { todoData: [] };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const NewArrAdd = [...todoData, newItem];
      return { todoData: NewArrAdd };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArrDone = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newArrDone };
    });
  };

  setUpdate = (text, id) => {
    this.setState({
      todoData: this.state.todoData.map((todo) => {
        if (todo.id === id) {
          todo.label = text;
        }
        return todo;
      }),
    });
  };

  onToggleEditing = (id, label) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label, editing: !oldItem.editing };
      const newArrEdit = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newArrEdit };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const completedCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>

        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            setUpdate={this.setUpdate}
          />
        </section>
        <Footer
          toDo={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onDeletedAll={this.deleteAll}
        />
      </section>
    );
  }
}
