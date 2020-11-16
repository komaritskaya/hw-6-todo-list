import Task from "../components/task";
import {render, remove} from '../utils/render';

export default class TaskController {
  constructor(container, onDataChange, onDelete) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onDelete = onDelete;
    this._taskComponent = null;
  }
  
  render(task) {
    this._taskComponent = new Task(task);
    render(this._container.getElement(), this._taskComponent);
    this._subscribeOnTaskEvents(task);
  }
  
  destroy() {
    remove(this._taskComponent);
  }

  _markAsDone(task) {
    this._onDataChange(task);
  }
  
  _delete(task) {
    this._onDelete(task);
  }
  
  _subscribeOnTaskEvents(task) {
    this._taskComponent.setDoneButtonClickHandler((evt) => {
      evt.preventDefault();
      this._markAsDone(task);
    });

    this._taskComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._delete(task);
    });
  }
}