import React from "react";

import './task.css';
export default class Task extends React.Component{

    // let { todoData } = this.props;

    onLabelClick = () =>{
        console.log(`Done: ${this.props.label}`);
        let {nameOfClass} = this.props;
        console.log(nameOfClass);
    };

    // changeEditMode = () =>{
    //     // const idx = todoData.findIndex((el) => el.id === id);
    //     console.log('works')
    // };


    render(){
        const {  label, onDeleted, onToggleDone, onChangeEditMode, done, id, editMode} = this.props;
        let nameOfClass = '';
        if(editMode){
            nameOfClass += ' editing'
        } else nameOfClass = '';
        if(done){
            nameOfClass += ' completed';
        }

        return (
            <span>
              <li className={nameOfClass}>
                <div className="view">
                  <input className="toggle" type="checkbox"
                         checked={done === true}
                         onChange={() => onToggleDone(id)}
                  />
                  <label>
                    <span className="description">{label}</span>
                    <span className="created">created 5 minutes ago</span>
                  </label>
                  <button className="icon icon-edit" onClick={() => onChangeEditMode(id)}/>
                  <button className="icon icon-destroy"
                  onClick={onDeleted}/>
                </div>
                <input type="text" className="edit" defaultValue="Editing task"/>
              </li>
            </span>
        );
    }
};