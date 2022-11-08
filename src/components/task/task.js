
import './task.css'

const Task= ({ label, completed = false, editing = false }) =>{
    
    const style = {
        color : editing ? 'steelblue' : 'black',
        fontWeight: completed ? 'bold' : "normal"
    };
    const intro = {
        decription : completed ? 'Completed task' : editing ? 'Editing task' : 'Active task'
    };
    
    return (
        <div className="view">
              <input className="toggle" type="checkbox"/>
              <label>
                    <span className="description">{intro.decription } </span>
                    <span className="created">created 5 minutes ago</span>
                </label>
              <span className="todo-list-item-label"
            style={style}>
            { label }
            </span>
              <button type="button"
                    className="btn btn-outline-success btn-sm float-right">
                <i className="fa fa-exclamation" />
            </button>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right">
                <i className="fa fa-trash-o" />
            </button>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
        </div>
    );
};

export default Task;