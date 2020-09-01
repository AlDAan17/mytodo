import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  editInput = React.createRef();

  state = {
    currentLabel:'',
    timeAgo: this.changeTime(),
  };

  values = {
    prevNameOfClass: '',
    flag: true,
  };

  componentDidMount() {
    this.values.timerId = setTimeout(
        function run() {
          const time = this.changeTime();
          this.setState({ timeAgo: time });
          if (time.includes('second')) {
            this.values.timerId = setTimeout(run.bind(this), 5000);
          } else {
            this.values.timerId = setTimeout(run.bind(this), 30000);
          }
        }.bind(this),
        5000
    );
  }

  editFn = () => {
    // eslint-disable-next-line react/prop-types
    const { label, id, edit, nameOfClass } = this.props;
    this.setState({
      currentLabel: label,
    });
    this.values.prevNameOfClass = nameOfClass;
    edit(id, { nameOfClass: ' editing' }, this.editInput.current);
  };

  editFnBlur = () => {
    // eslint-disable-next-line react/prop-types
    const { id, label, edit } = this.props;
    // eslint-disable-next-line prefer-const
    let { flag, prevNameOfClass } = this.values;
    document.onkeydown = (evt) => {
      let isEscape = false;
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc';
      }
      if (isEscape) {
        const nameOfClass = prevNameOfClass;
        edit(id, { nameOfClass, label });
        flag = true;
      }
    };
    if (flag) {
      const nameOfClass = prevNameOfClass;
      edit(id, { nameOfClass, label });
      flag = true;
    }
  };

  changeField = (event) => {
    this.setState({ currentLabel: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { currentLabel } = this.state;
    // eslint-disable-next-line react/prop-types
    const { id, edit } = this.props;
    let { flag } = this.values;
    const { prevNameOfClass } = this.values;

    if (!currentLabel.trim()) return;
    // eslint-disable-next-line no-unused-vars
    flag = false;
    edit(id, { nameOfClass: prevNameOfClass, label: currentLabel.trim() });
  };

  changeTime() {
    // eslint-disable-next-line react/prop-types
    const { time } = this.props;
    return formatDistanceToNow(time, { includeSeconds: true, addSuffix: true });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { label, onDeleted, onToggleDone, done, id, timerTime } = this.props;
    let { nameOfClass } = this.props;
    const { currentLabel, timeAgo } = this.state;
    if (done) {
      nameOfClass += ' completed';
    }

    return (
      <span>
        <li className={nameOfClass} id="inputItem">
          <div className="view">
            <input className="toggle" type="checkbox" checked={done === true} onChange={() => onToggleDone(id)} />
            <label>
              <span className="description">{label}</span>
              <span>{timerTime}</span>
              <span className="created">{timeAgo}</span>
            </label>
            <button type="button" className="icon icon-edit" aria-label="Save" onClick={this.editFn} />
            <button type="button" className="icon icon-destroy" aria-label="Save" onClick={onDeleted} />
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              value={currentLabel}
              onChange={this.changeField}
              ref={this.editInput}
              onBlur={this.editFnBlur}
            />
          </form>
        </li>
      </span>
    );
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  nameOfClass: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  currentLabel: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  timeAgo: PropTypes.string,
};
