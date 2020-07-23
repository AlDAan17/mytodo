import React from "react";
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
export default class Task extends React.Component{

    editInput = React.createRef();

    state = {
        currentLabel: this.props.label,
        timeAgo: this.changeTime(),
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

    values = {
        prevNameOfClass: '',
        flag: true,
    };

    editFn = () => {
        const { label, id, edit, nameOfClass } = this.props;
        this.setState({
            currentLabel: label,
        });
        this.values.prevNameOfClass = nameOfClass;
        edit(id, { nameOfClass: ' editing' }, this.editInput.current);
    };

    editFnBlur = () => {
        const {id, label, edit} = this.props;
        let { flag, prevNameOfClass } = this.values;
        document.onkeydown = function(evt) {
            let isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            }
            if (isEscape) {
                const nameOfClass = prevNameOfClass;
                edit(id, {nameOfClass, label});
                flag = true;
            }
        };
        if(flag){
            const nameOfClass = prevNameOfClass;
            edit(id, {nameOfClass, label});
            flag = true;
        }
    };

    changeField = (e) => {
        console.log(e.target.value)
        this.setState({ currentLabel: e.target.value });
    };

    onSubmit = (e) =>{
      e.preventDefault();
      const { currentLabel } = this.state;
      const { id, edit } = this.props;
        // eslint-disable-next-line no-unused-vars
      let { prevNameOfClass, flag } = this.values;

      if(!currentLabel.trim()) return;
      flag = false;
      edit(id, { nameOfClass: prevNameOfClass, label: currentLabel.trim() });
    };

    changeTime() {
        const { time } = this.props;
        return formatDistanceToNow(time, { includeSeconds: true, addSuffix: true });
    }

    render(){
        let {  label, onDeleted, onToggleDone, done, id, nameOfClass} = this.props;
        const {currentLabel, timeAgo} = this.state;

        if(done){
            nameOfClass += ' completed';
        }

        return (
            <span>
              <li className={nameOfClass} id='inputItem'>
                <div className="view">
                  <input className="toggle" type="checkbox"
                         checked={done === true}
                         onChange={() => onToggleDone(id)}
                  />
                  <label>
                    <span className="description">{label}</span>
                    <span className="created">{timeAgo}</span>
                  </label>
                  <button className="icon icon-edit" onClick={this.editFn}/>
                  <button className="icon icon-destroy"
                  onClick={onDeleted}/>
                </div>
                  <form onSubmit={this.onSubmit}>
                    <input type="text" className="edit"
                           value={currentLabel}
                           onChange={this.changeField}
                           ref={this.editInput}
                           onBlur={this.editFnBlur}/>
                </form>
              </li>
            </span>
        );
    }
};