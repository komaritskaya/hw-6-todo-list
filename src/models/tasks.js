import {tasks} from '../mocks';

export default class TasksModel {
  constructor() {
    this._tasks = tasks;
  }
  
  add(task) {
    this._tasks.push(task);
  }

  getAll() {
    return this._tasks;
  }

  get(id) {
    return this._tasks.find(task => task.id === id)
  }

  delete(id) {
    this._tasks = this._tasks.filter(task => task.id !== id);
  }

  changeStatus(id) {
    console.log(id);
    const taskToChange = this._tasks.find(task => task.id === id);
    if (taskToChange) {
      taskToChange.isFinished = !taskToChange.isFinished;
    }
  }
}