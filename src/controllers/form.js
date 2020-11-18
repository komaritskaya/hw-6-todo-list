import Form from "../components/form";
import {render, RenderPosition} from '../utils/render';

export default class FormController {
  constructor(container, onAddNewTask) {
    this._container = container;
    this._formComponent = null;
    
    this._onAddNewTask = onAddNewTask;
  }

  render() {
    this._formComponent = new Form();
    render(this._container, this._formComponent, RenderPosition.AFTERBEGIN);
    this._subscribeOnFormEvents();
  }
  
  _subscribeOnFormEvents() {
    this._formComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this._onAddNewTask(this._formComponent.getData());
      this._formComponent.reset();
    });
  }
}