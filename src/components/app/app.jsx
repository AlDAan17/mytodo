import React from "react";

import './app.css'
import NewTaskForm from './../new-task-form';
import Task from './../task';
import TasksFilter from './../tasks-filter';
import TaskList from './../task-list';
import Footer from './../footer'

export default  class App extends React.Component {

    maxId = 100;

    state = {
        done: false,
        // classNames: '',
        filter: 'all',
        term: '',
        todoData: [
            this.createTodoItem('Completed task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task'),
            // { nameOfClass: this.classNames, label: 'Completed task', id: 1},
            // { nameOfClass: 'editing', label: 'Editing task', id: 2},
            // { nameOfClass: this.classNames, label: 'Active task', id: 3}
        ]
    };

     createTodoItem(label){
         return{
             label,
             done:false,
             id: this.maxId++
         }
     }

    onToggleDone = (id) =>{
        this.setState(({ todoData }) =>{
            const idx = todoData.findIndex((el) => el.id === id);

            const oldItem = todoData[idx];
            const newItem = {...oldItem, done: !oldItem.done};

            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ];

            return{
                todoData: newArray
            };
        });
    };

    deleteItem = (id) =>{
        this.setState(({todoData}) =>{
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return{
                todoData: newArray
            };
        });
    };

    addItem = (text) =>{
      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) =>{
          const newArr = [
              ...todoData,
              newItem
          ];
          return{
              todoData: newArr
          };
      });
    };

    filter(items, filter){
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'completed':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    search(items, term){

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onFilterChange = (filter) =>{
        this.setState({filter})
    };

    onDeleteCompleted = () =>{
        this.setState(({todoData}) =>{
            // eslint-disable-next-line array-callback-return
            const newArray = todoData.filter((item) => {
                const {done} = item;
                // if (done === true)
                    return done === false;
            });
            return{
                todoData: newArray
            }
        });
    };

    render() {
        let { todoData, term, filter } = this.state;
        // console.log(classNames);
        const visibleItems = this.filter(
            this.search(todoData, term), filter);
        const doneCount = todoData.filter( el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <section className="todoapp">
                <NewTaskForm onItemAdded={this.addItem}/>
                <TaskList todos={visibleItems}
                onDeleted = {this.deleteItem}
                onToggleDone={this.onToggleDone}/>
                <Footer done={todoCount}
                    filter = {filter}
                    onFilterChange={this.onFilterChange}
                    onDeleteCompleted={this.onDeleteCompleted}/>
            </section>
        );
    }
};