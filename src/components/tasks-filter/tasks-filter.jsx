import React from "react";

import './tasks-filter.css';

export default class TaskFilter extends React.Component{

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name:'completed', label: 'Completed'}
    ];

    render() {

        const { filter, onFilterChange } = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? ' selected' : '';
            return(
                <li>
                    <button className={clazz}
                            type="button"
                            key={name}
                            onClick={() => onFilterChange(name)}>
                        {label}
                    </button>
                </li>
            );
        });

        return (
            <ul className="filters">
                {buttons}
                {/*<li>*/}
                {/*    <button className="selected">All</button>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <button>Active</button>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <button>Completed</button>*/}
                {/*</li>*/}
            </ul>
        );
    }
};