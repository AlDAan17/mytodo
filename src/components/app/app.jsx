import React from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends React.Component {
  maxId = 100;

  timersTime = {};

  state = {
    filter: 'all',
    term: '',
    todoData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
      // { nameOfClass: this.classNames, label: 'Completed task', id: 1},
      // { nameOfClass: 'editing', label: 'Editing task',editMode: false, id: 2},
      // { nameOfClass: this.classNames, label: 'Active task', id: 3}
    ],
    timerTime:{
      sec:0,
      min:0
    },
    interv: null,
  };

  startTimer = () =>{
    this.runTimer();
    this.setState({interv: setInterval(this.runTimer, 1000)});
  }

  stopTimer = () =>{
    const {interv} = this.state;
    clearInterval(interv);
  }

  runTimerTest = (id) =>{
    this.timersTime[id] = setInterval(() =>{
      const {todoData} = this.state;
      const idx = todoData.findIndex(el => el.id === id);
      const [min, sec] = todoData[idx].alreadyTime;
      this.onEditing(id, {alreadyTime: [min, sec + 1]})
    }, 1000);
  }

  runTimer = () =>{
    const {timerTime} = this.state;
    let updatedS = timerTime.sec;
    let updatedM = timerTime.min;

    if(updatedS === 59){
      // eslint-disable-next-line no-plusplus
      updatedM++;
      updatedS = -1;
    }
    // eslint-disable-next-line no-plusplus
    updatedS++;
    return this.setState( ({timerTime: {sec: updatedS, min: updatedM}}))
  }

  onEditing = (id, obj, elementDOM) => {
    this.setState(
        ({ todoData }) => {
          const index = todoData.findIndex((el) => el.id === id);
          const oldItem = todoData[index];
          const newItem = { ...oldItem, ...obj };
          const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
          return {
            todoData: newArray,
          };
        },
        () => {
          if (elementDOM) elementDOM.focus();
        }
    );
  };

  onDeleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => {
        const { done } = item;
        return done === false;
      });
      return {
        todoData: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onChangeEditMode = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editMode'),
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };



  search(items, term) {
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
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

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  createTodoItem(label, alreadyTime) {
    return {
      label,
      done: false,
      editMode: false,
      filter: 'all',
      nameOfClass: 'active',
      time: new Date(),
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      // eslint-disable-next-line no-undef
      alreadyTime,
    };
  }

  render() {
    const { todoData, term, filter, timerTime, interv } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const showTime = (
        <span className="created">
          <button type="button" aria-label="play" className="icon-play" onClick={this.startTimer}/>
          <button type="button" aria-label="pause" className="icon-pause" onClick={this.stopTimer}/>
          <span>{(timerTime.min >= 10) ? timerTime.min : `0${timerTime.min}`}&nbsp;:&nbsp;</span>
          <span>{(timerTime.sec >= 10) ? timerTime.sec : `0${timerTime.sec}`}&nbsp;</span>
        </span>
    );
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          todoData={todoData}
          onChangeEditMode={this.onChangeEditMode}
          onSubmitFormTask={this.onSubmitFormTask}
          edit={this.onEditing}
          timerTime={showTime}
          interv={interv}
        />
        <Footer
          done={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onDeleteCompleted={this.onDeleteCompleted}
        />
      </section>
    );
  }
}
