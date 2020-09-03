import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';
import Timer from "../../Services/timer";

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    min:'',
    sec:'',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const{label, min, sec} = this.state;
    const{onItemAdded}=this.props;
    if(!label.trim()) return;
    const alreadyTime = new Timer(min, sec).format().result();
    onItemAdded(label.trim(), alreadyTime);
    this.setState({
      label: '',
      min: '',
      sec:'',
    });
  };

  render() {
    const {label} = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            // autoFocus
            onChange={this.onLabelChange}
            value={label}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded:PropTypes.func.isRequired,
};
