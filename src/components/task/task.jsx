import React from "react";

import './task.css';
export default class Task extends React.Component{

    onLabelClick = () =>{
        console.log(`Done: ${this.props.label}`);
        let {nameOfClass} = this.props;
        console.log(nameOfClass);
    };



    render(){
        const {  label, onDeleted, onToggleDone, done, id} = this.props;
        let nameOfClass = '';
        if(done){
            nameOfClass += ' completed';
        }
        return (
            <span>
              <li className={nameOfClass}>
                <div className="view">
                  <input className="toggle" type="checkbox"
                         // onClick={onToggleDone}
                         checked={done === true}
                         onChange={() => onToggleDone(id)}
                  />
                  <label>
                    <span className="description">{label}</span>
                    <span className="created">created 5 minutes ago</span>
                  </label>
                  <button className="icon icon-edit"/>
                  <button className="icon icon-destroy"
                  onClick={onDeleted}/>
                </div>
                <input type="text" className="edit" defaultValue="Editing task"/>
              </li>
            </span>
        );
    }
};