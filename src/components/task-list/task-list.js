import Task from "../task";
import './task-list.css'

const TaskList = ({ todos }) => {

  const elements = todos.map((item) =>{
    
    const {id, ...itemProps} = item;

    return(
      <li key = {id} className='list-group-item'>
        <Task {...itemProps}  />
      </li>
    );
  });
    return (
      <ul className='todo-list list-group'>
       { elements }
      </ul>
    );
  };

  export default TaskList;