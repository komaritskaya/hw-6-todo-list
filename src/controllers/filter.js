import Form from "../components/form";
import {render, RenderPosition} from '../utils/render';

export default class FormController {
  constructor(container, addNewTask) {
    this._container = container;
    this._formComponent = null;
    
    this._addNewTask = addNewTask;
  }
  
  render() {
    this._formComponent = new Form();
    render(this._container, this._formComponent, RenderPosition.AFTERBEGIN);
    this._subscribeOnFormEvents();
  }

  _subscribeOnFormEvents() {
    this._formComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this._addNewTask(this._formComponent.getData());
    });
  }
}