import {tasks} from '../mocks';
import {getTasksByFilter, FilterType} from '../utils/filter';

export default class TasksModel {
  constructor() {
    this._tasks = tasks;
    this._activeFilterType = FilterType.ALL;
    
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }
  
  add(task) {
    this._tasks.push(task);
  }

  getAll() {
    return this._tasks;
  }
  
  getFilteredTasks() {
    return getTasksByFilter(this._tasks, this._activeFilterType);
  }

  get(id) {
    return this._tasks.find(task => task.id === id)
  }

  delete(id) {
    this._tasks = this._tasks.filter(task => task.id !== id);
    this._callHandlers(this._dataChangeHandlers);

  }

  changeStatus(id) {
    const taskToChange = this._tasks.find(task => task.id === id);
    if (taskToChange) {
      taskToChange.isFinished = !taskToChange.isFinished;
    }
  }
  
  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
    console.log(this.getFilteredTasks());
  }
  
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}