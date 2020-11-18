import Board from "../components/board";
import TaskController from "./task";
import FilterController from "./filter";
import FormController from "./form";å
import {render} from '../utils/render';

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._onStatusChange = this._onStatusChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onAddNewTask = this._onAddNewTask.bind(this);
    
    this._boardComponent = new Board();
    this._shownTaskControllers = [];
  }
  
  init() {
    render(this._container, this._boardComponent);
    this._renderBoard();
  }
  
  _onStatusChange(task) {
    this._tasksModel.changeStatus(task.id);
    this._rerender();
  }
  
  _onFilterChange(filter) {
    this._tasksModel.setFilter(filter);
    this._rerender();
  }
  
  _onDelete(task) {
    this._tasksModel.delete(task.id);
    this._rerender();
  }

  _onAddNewTask(data) {
    this._tasksModel.add(data);
    this._rerender();
  }
  
  _renderTask(task) {
    const taskController = new TaskController(this._boardComponent, this._onStatusChange, this._onDelete);
    this._shownTaskControllers.push(taskController);
    taskController.render(task);
  }
  
  _renderTasks(tasks) {
    tasks.forEach((task) => this._renderTask(task));
  }
  
  _removeTasks() {
    this._shownTaskControllers.forEach((taskController) => taskController.destroy());
  }
  
  _renderForm() {
    const formController = new FormController(this._container, this._onAddNewTask);
    formController.render();
  }
  
  _renderFilters() {
    const filterController = new FilterController(this._container.querySelector(`.board__header`), this._tasksModel, this._onFilterChange);
    filterController.render();
  }
  
  _rerender() {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getFilteredTasks());
  }
  
  _renderBoard() {
    this._renderForm();
    this._renderFilters();
    this._renderTasks(this._tasksModel.getFilteredTasks());
  }
}