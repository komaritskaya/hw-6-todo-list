import Page from "../components/page";
import TaskList from "../components/task-list";
import TaskController from "./task";
import FilterController from "./filter";
import {render} from '../utils/render';
import FormController from "./form";

export default class PageController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._addNewTask = this._addNewTask.bind(this);
    
    this._pageComponent = new Page();
    this._taskListComponent = new TaskList();

    this._showedTaskControllers = [];
  }
  
  init() {
    render(this._container, this._pageComponent);
    render(this._pageComponent.getElement(), this._taskListComponent);

    this._renderPage();
  }
  
  _onDataChange(task) {
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

  _renderTask(task) {
    const taskController = new TaskController(this._taskListComponent, this._onDataChange, this._onDelete);
    this._showedTaskControllers.push(taskController);
    taskController.render(task);
  }

  _addNewTask(data) {
    this._tasksModel.add(data);
    this._rerender();
  }
  
  _renderTasks(tasks) {
    tasks.forEach((task) => this._renderTask(task));
  }
  
  _renderForm() {
    const formController = new FormController(this._pageComponent.getElement(), this._addNewTask);
    formController.render();
  }
  
  _renderFilters() {
    const filterController = new FilterController(this._pageComponent.getElement().querySelector(`.todo__current-header`), this._tasksModel, this._onFilterChange);
    filterController.render();
  }
  
  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
  }
  
  _rerender() {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getFilteredTasks());
  }
  
  _renderPage() {
    this._renderForm();
    this._renderFilters();
    this._renderTasks(this._tasksModel.getFilteredTasks());
  }
}