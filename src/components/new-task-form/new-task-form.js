import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdded } = this.props;
    const { label } = this.state;
    e.preventDefault();
    onAdded(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onLabelChange}
          value={label}
        />
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
