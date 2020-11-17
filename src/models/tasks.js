import {tasks} from '../mocks';
import {getTasksByFilter, FilterType} from '../utils/filter';

export default class TasksModel {
  constructor() {
    this._tasks = tasks;
    this._activeFilterType = FilterType.ALL;
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

  delete(id) {
    this._tasks = this._tasks.filter(task => task.id !== id);
  }

  changeStatus(id) {
    const taskToChange = this._tasks.find(task => task.id === id);
    if (taskToChange) {
      taskToChange.isFinished = !taskToChange.isFinished;
    }
  }
  
  setFilter(filterType) {
    this._activeFilterType = filterType;
  }
}