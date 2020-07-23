import React from "react";

import Task from '../task'
import './task-list.css';

const TaskList = ({ todos, onDeleted, onToggleDone,onChangeEditMode, ...others }) =>{



    const elements = todos.map((item) =>{
        const {id} = item;
       return(
           <Task {...item}
                 label = {item.label}
                 key = {item.id}
                 onDeleted = {() => onDeleted(id)}
                 onToggleDone = {() => onToggleDone(id)}
                 onChangeEditMode={() => onChangeEditMode(id)}
               {...others}/>
       )
    });

    return(
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

export default TaskList;