import React from 'react';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
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
