import {Component} from 'react';
import Header from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';
// import SearchPanel from '../search-panel';
// import ItemStatusFilter from '../item-status-filter';

// import './app.css';

export default class App extends Component {
    state = {
      todoData :[
        {label: 'Drink Coffee', completed: true, editing: false, id: 1},
        {label: 'Make Awesome App', completed: false, editing: true, id: 2},
        {label: 'Have a lunch', completed: false, editing: false, id: 3}
      ]
    };
    
    render(){
      return (
        <section className='todoapp'>
          <Header />
          <section className="main">
            <TaskList todos={this.state.todoData}/>
          </section>
          <Footer />
        </section>
      );
    }
    
};