import React from "react";

import './footer.css';
import TasksFilter from './../tasks-filter'

const Footer = ({ done, filter, onFilterChange, onDeleteCompleted }) =>{
    return(
        <footer className="footer">
            <span className="todo-count">{done} items left</span>
            <TasksFilter filter = {filter}
            onFilterChange={onFilterChange}/>
            <button className="clear-completed"
            onClick={onDeleteCompleted}>Clear completed</button>
        </footer>
    );
};

export default Footer;