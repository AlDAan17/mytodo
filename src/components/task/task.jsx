import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import Timer from "../../Services/timer";

export default class Task extends React.Component {
  editInput = React.createRef();

  state = {
    currentLabel:'',
    timeAgo: this.changeTime(),
  };

  values = {
    prevNameOfClass: '',
    flag: true,
    timerId: null,
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

  componentWillUnmount(){
    clearTimeout(this.values.timerId)
  }

  editFn = () => {
    const { label, id, edit, nameOfClass } = this.props;
    this.setState({
      currentLabel: label,
    });
    this.values.prevNameOfClass = nameOfClass;
    edit(id, { nameOfClass: ' editing' }, this.editInput.current);
  };

  editFnBlur = () => {
    const { id, label, edit } = this.props;
    let { flag } = this.values;
    const {prevNameOfClass} = this.values;
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
    const { id, edit } = this.props;
    const { prevNameOfClass } = this.values;

    if (!currentLabel.trim()) return;
    edit(id, { nameOfClass: prevNameOfClass, label: currentLabel.trim() });
  };

  changeTime() {
    const { time } = this.props;
    return formatDistanceToNow(time, { includeSeconds: true, addSuffix: true });
  }

  render() {
    const { label, onDeleted, onToggleDone, done, id, alreadyTime, timerOn, timerOff } = this.props;
    let { nameOfClass } = this.props;
    const { currentLabel, timeAgo } = this.state;
    const alreadyTimeFormat = new Timer(...alreadyTime).recountTime().transformToText().result();
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
              <div className="created">
                <button type="button" aria-label="play" className="icon-play" onClick={() => timerOn(id)}/>
                 <button type="button" aria-label="pause" className="icon-pause" onClick={() => timerOff(id)}/>
                {alreadyTimeFormat}
              </div>
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
  time: PropTypes.instanceOf(Date).isRequired,
  edit:PropTypes.func.isRequired,
  timerOn:PropTypes.func.isRequired,
  timerOff:PropTypes.func.isRequired,
  alreadyTime:PropTypes.arrayOf(Object).isRequired,
};
